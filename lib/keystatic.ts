import Markdoc from '@markdoc/markdoc';
import { createReader } from '@keystatic/core/reader';
import { createGitHubReader } from '@keystatic/core/reader/github';
import type { DocumentRendererProps } from '@keystatic/core/renderer';
import { createSign } from 'crypto';
import { z } from 'zod';
import config from '../keystatic.config';

const isGitHubMode = config.storage.kind === 'github';
const githubStorage = isGitHubMode ? (config.storage as { repo: { owner: string; name: string } }) : null;
const githubRepo = githubStorage ? `${githubStorage.repo.owner}/${githubStorage.repo.name}` as const : null;
const githubRef = 'main';
export const githubApiBaseUrl = 'https://api.github.com';
export const githubUserAgent = 'posilenz-keystatic-reader';

export const BLOG_REVALIDATE_SECONDS = 60;
export const SITE_URL = 'https://posilenz.com';
export const DEFAULT_OG_IMAGE = '/images/og-image.png';
export type KeystaticDocument = DocumentRendererProps['document'];

type GitHubReadToken = {
    token?: string;
    expiresAt?: number;
};

const localReader = createReader(process.cwd(), config);
type ReaderInstance = Pick<typeof localReader, 'collections' | 'singletons' | 'config'>;

let cachedReader: ReaderInstance | null = isGitHubMode ? null : localReader;
let cachedReaderExpiresAt = 0;
let pendingReaderPromise: Promise<ReaderInstance> | null = null;

function toBase64Url(value: string | Buffer) {
    return Buffer.from(value).toString('base64url');
}

function normalizePrivateKey(privateKey: string) {
    return privateKey
        .trim()
        .replace(/^"|"$/g, '')
        .replace(/\\n/g, '\n');
}

function isDynamicServerUsageError(error: unknown) {
    return Boolean(
        error &&
        typeof error === 'object' &&
        'digest' in error &&
        (error as { digest?: string }).digest === 'DYNAMIC_SERVER_USAGE'
    );
}

function createGitHubAppJwt(appId: string, privateKey: string) {
    const nowInSeconds = Math.floor(Date.now() / 1000);
    const header = toBase64Url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
    const payload = toBase64Url(
        JSON.stringify({
            iat: nowInSeconds - 60,
            exp: nowInSeconds + 9 * 60,
            iss: parseInt(appId, 10),
        })
    );
    const unsignedToken = `${header}.${payload}`;
    const signer = createSign('RSA-SHA256');
    signer.update(unsignedToken);
    signer.end();
    const signature = signer.sign(normalizePrivateKey(privateKey), 'base64url');

    return `${unsignedToken}.${signature}`;
}

async function fetchGitHubJson<T>(path: string, token: string): Promise<T> {
    const response = await fetch(`${githubApiBaseUrl}${path}`, {
        headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${token}`,
            'User-Agent': githubUserAgent,
            'X-GitHub-Api-Version': '2022-11-28',
        },
        cache: 'no-store',
    });

    if (!response.ok) {
        throw new Error(`GitHub API ${path} failed: ${response.status} ${await response.text()}`);
    }

    return response.json() as Promise<T>;
}

async function fetchGitHubInstallationToken(): Promise<GitHubReadToken | null> {
    if (!githubStorage) {
        return null;
    }

    const appId = process.env.KEYSTATIC_GITHUB_APP_ID;
    const privateKey = process.env.KEYSTATIC_GITHUB_PRIVATE_KEY;

    if (!appId || !privateKey) {
        return null;
    }

    const appJwt = createGitHubAppJwt(appId, privateKey);
    const installation = await fetchGitHubJson<{ id: number }>(
        `/repos/${githubStorage.repo.owner}/${githubStorage.repo.name}/installation`,
        appJwt
    );
    const accessTokenResponse = await fetch(`${githubApiBaseUrl}/app/installations/${installation.id}/access_tokens`, {
        method: 'POST',
        headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${appJwt}`,
            'User-Agent': githubUserAgent,
            'X-GitHub-Api-Version': '2022-11-28',
        },
        cache: 'no-store',
    });

    if (!accessTokenResponse.ok) {
        throw new Error(
            `GitHub installation token request failed: ${accessTokenResponse.status} ${await accessTokenResponse.text()}`
        );
    }

    const payload = await accessTokenResponse.json() as {
        token: string;
        expires_at: string;
    };

    return {
        token: payload.token,
        expiresAt: new Date(payload.expires_at).getTime(),
    };
}

export async function resolveGitHubReadToken(): Promise<GitHubReadToken> {
    try {
        const installationToken = await fetchGitHubInstallationToken();

        if (installationToken?.token) {
            return installationToken;
        }
    } catch (error) {
        if (isDynamicServerUsageError(error)) {
            throw error;
        }

        if (process.env.KEYSTATIC_GITHUB_TOKEN) {
            console.info('[Keystatic reader] Using KEYSTATIC_GITHUB_TOKEN as primary or fallback reader auth.');
            return { token: process.env.KEYSTATIC_GITHUB_TOKEN };
        }

        throw error;
    }

    if (process.env.KEYSTATIC_GITHUB_TOKEN) {
        return { token: process.env.KEYSTATIC_GITHUB_TOKEN };
    }

    return {};
}

export async function getReader(): Promise<ReaderInstance> {
    if (!isGitHubMode) {
        return cachedReader || localReader;
    }

    const now = Date.now();
    if (cachedReader && (cachedReaderExpiresAt === 0 || now < cachedReaderExpiresAt - 60_000)) {
        return cachedReader;
    }

    if (!pendingReaderPromise) {
        pendingReaderPromise = (async () => {
            const token = await resolveGitHubReadToken();
            const reader: ReaderInstance = createGitHubReader(config, {
                repo: githubRepo!,
                token: token.token,
                ref: githubRef,
            });

            cachedReader = reader;
            cachedReaderExpiresAt = token.expiresAt ?? 0;

            return reader;
        })().finally(() => {
            pendingReaderPromise = null;
        });
    }

    return pendingReaderPromise;
}

const publishDateSchema = z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Expected YYYY-MM-DD publishDate');

const blogEntrySchema = z.object({
    slug: z.string().min(1),
    title: z.string().min(1),
    excerpt: z.string().min(1),
    publishDate: publishDateSchema,
    isDraft: z.boolean().default(false),
    coverImage: z.string().trim().min(1).nullable().optional(),
});

const blogListItemSchema = z.object({
    slug: z.string().min(1),
    title: z.string().min(1),
    excerpt: z.string().min(1),
    publishDate: publishDateSchema,
    displayDay: z.string().min(1),
    displayMonthYear: z.string().min(1),
    coverImage: z.string().nullable(),
    titleEyebrow: z.string().min(1),
    titleBody: z.string().min(1),
});

const blogPostSchema = blogListItemSchema.extend({
    contentHtml: z.string().min(1),
});

export interface Career {
    slug: string;
    title: string;
    intro: string;
    workmode: 'remote' | 'hybrid' | 'onsite';
    location: string;
    employmentType: 'full-time' | 'part-time' | 'contract';
    experience: string;
    displayOrder: number;
    isActive: boolean;
    roleOverview: KeystaticDocument;
    keyResponsibilities: readonly string[];
    skillsExperience: readonly string[];
    whatYoullBring: readonly string[];
    whyJoin: KeystaticDocument;
    content: KeystaticDocument;
}

export type BlogListItem = z.infer<typeof blogListItemSchema>;
export type BlogPost = z.infer<typeof blogPostSchema>;

type RawBlogEntry = {
    slug: string;
    title: string;
    excerpt: string;
    publishDate: string;
    isDraft?: boolean;
    coverImage?: string | null;
};

type MarkdocContent = {
    node?: unknown;
};

function parsePublishDate(value: string): Date {
    return new Date(`${value}T00:00:00.000Z`);
}

export function formatBlogDisplayDate(publishDate: string) {
    const parsedDate = parsePublishDate(publishDate);

    return {
        displayDay: String(parsedDate.getUTCDate()),
        displayMonthYear: new Intl.DateTimeFormat('en-US', {
            month: 'short',
            year: 'numeric',
            timeZone: 'UTC',
        }).format(parsedDate),
    };
}

function splitBlogTitle(title: string) {
    const colonIndex = title.indexOf(':');

    if (colonIndex >= 0) {
        return {
            titleEyebrow: `${title.slice(0, colonIndex).trim()}:`,
            titleBody: title.slice(colonIndex + 1).trim(),
        };
    }

    const words = title.split(/\s+/).filter(Boolean);
    const splitIndex = words.length > 6 ? 4 : Math.max(1, Math.ceil(words.length / 2));

    return {
        titleEyebrow: words.slice(0, splitIndex).join(' '),
        titleBody: words.slice(splitIndex).join(' ') || title,
    };
}

function extractMarkdocNode(content: unknown) {
    if (content && typeof content === 'object' && 'node' in (content as MarkdocContent)) {
        return (content as MarkdocContent).node;
    }

    return content;
}

function renderMarkdocToHtml(content: unknown) {
    const transformed = Markdoc.transform(extractMarkdocNode(content) as Parameters<typeof Markdoc.transform>[0]);
    return Markdoc.renderers.html(transformed);
}

function parseBlogEntry(rawEntry: RawBlogEntry) {
    return blogEntrySchema.parse({
        ...rawEntry,
        coverImage: rawEntry.coverImage || null,
    });
}

function normalizeBlogBase(rawEntry: RawBlogEntry) {
    const parsedEntry = parseBlogEntry(rawEntry);

    const { displayDay, displayMonthYear } = formatBlogDisplayDate(parsedEntry.publishDate);
    const { titleEyebrow, titleBody } = splitBlogTitle(parsedEntry.title);

    return blogListItemSchema.parse({
        ...parsedEntry,
        coverImage: parsedEntry.coverImage ?? null,
        displayDay,
        displayMonthYear,
        titleEyebrow,
        titleBody,
    });
}

function normalizeBlogPost(rawEntry: RawBlogEntry, content: unknown) {
    const base = normalizeBlogBase(rawEntry);
    const contentHtml = renderMarkdocToHtml(content).trim();

    return blogPostSchema.parse({
        ...base,
        contentHtml,
    });
}

async function readBlogContent(entry: { content: () => Promise<unknown> }) {
    return entry.content();
}

function logInvalidBlogEntry(slug: string, error: unknown) {
    console.error(`[Keystatic blog] Invalid entry "${slug}" skipped`, error);
}

export async function getCareers(): Promise<Career[]> {
    const reader = await getReader();
    const careers = await reader.collections.careers.all();

    const activeCareers = careers
        .filter((career) => Boolean(career.entry.isActive && career.entry.title))
        .sort((a, b) => (a.entry.displayOrder || 0) - (b.entry.displayOrder || 0));

    return Promise.all(
        activeCareers.map(async (career) => {
            const [roleOverview, whyJoin, content] = await Promise.all([
                career.entry.roleOverview(),
                career.entry.whyJoin(),
                career.entry.content(),
            ]);

            return {
                slug: career.entry.slug || career.slug,
                title: career.entry.title,
                intro: career.entry.intro,
                workmode: career.entry.workmode,
                location: career.entry.location,
                employmentType: career.entry.employmentType,
                experience: career.entry.experience,
                displayOrder: career.entry.displayOrder || 0,
                isActive: career.entry.isActive,
                roleOverview,
                keyResponsibilities: career.entry.keyResponsibilities,
                skillsExperience: career.entry.skillsExperience,
                whatYoullBring: career.entry.whatYoullBring,
                whyJoin,
                content,
            };
        })
    );
}

export async function getCareerBySlug(slug: string): Promise<Career | null> {
    try {
        const reader = await getReader();
        const career = await reader.collections.careers.read(slug);

        if (!career || !career.title || !career.isActive) {
            return null;
        }

        const [roleOverview, whyJoin, content] = await Promise.all([
            career.roleOverview(),
            career.whyJoin(),
            career.content(),
        ]);

        return {
            slug: career.slug || slug,
            title: career.title,
            intro: career.intro,
            location: career.location,
            workmode: career.workmode,
            employmentType: career.employmentType,
            experience: career.experience,
            displayOrder: career.displayOrder || 0,
            isActive: career.isActive,
            roleOverview,
            keyResponsibilities: career.keyResponsibilities,
            skillsExperience: career.skillsExperience,
            whatYoullBring: career.whatYoullBring,
            whyJoin,
            content,
        };
    } catch (error) {
        console.error(`Error fetching career with slug "${slug}":`, error);
        return null;
    }
}

export async function getPublishedBlogPosts(limit?: number): Promise<BlogListItem[]> {
    const reader = await getReader();
    const entries = await reader.collections.blog.all();
    const normalizedPosts = await Promise.all(
        entries.map(async (entry: {
            slug: string;
            entry: {
                slug?: string;
                title?: string;
                excerpt?: string;
                publishDate?: string;
                isDraft?: boolean;
                coverImage?: string | null;
            };
        }) => {
            try {
                const rawEntry = {
                    slug: entry.entry.slug || entry.slug,
                    title: entry.entry.title || '',
                    excerpt: entry.entry.excerpt || '',
                    publishDate: entry.entry.publishDate || '',
                    isDraft: entry.entry.isDraft,
                    coverImage: entry.entry.coverImage,
                };
                const parsedEntry = parseBlogEntry(rawEntry);

                if (parsedEntry.isDraft) {
                    return null;
                }

                return normalizeBlogBase(rawEntry);
            } catch (error) {
                logInvalidBlogEntry(entry.slug, error);
                return null;
            }
        })
    );

    const publishedPosts = normalizedPosts
        .filter((entry): entry is BlogListItem => entry !== null)
        .sort((a, b) => b.publishDate.localeCompare(a.publishDate));

    return typeof limit === 'number' ? publishedPosts.slice(0, limit) : publishedPosts;
}

export async function getHomepageBlogPosts(limit = 3) {
    return getPublishedBlogPosts(limit);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
        const reader = await getReader();
        const entry = await reader.collections.blog.read(slug);

        if (!entry) {
            return null;
        }

        const [content] = await Promise.all([readBlogContent(entry as { content: () => Promise<unknown> })]);

        const rawEntry = {
            slug: entry.slug || slug,
            title: entry.title || '',
            excerpt: entry.excerpt || '',
            publishDate: entry.publishDate || '',
            isDraft: entry.isDraft,
            coverImage: entry.coverImage,
        };
        const parsedEntry = parseBlogEntry(rawEntry);

        if (parsedEntry.isDraft) {
            return null;
        }

        return normalizeBlogPost(rawEntry, content);
    } catch (error) {
        logInvalidBlogEntry(slug, error);
        return null;
    }
}

export async function getBlogPostsForSitemap() {
    return getPublishedBlogPosts();
}

export function formatWorkMode(location: string): string {
    const locationMap: Record<string, string> = {
        remote: 'Remote',
        hybrid: 'Hybrid',
        onsite: 'On-site',
    };

    return locationMap[location] || location;
}

export function formatEmploymentType(type: string): string {
    const typeMap: Record<string, string> = {
        'full-time': 'Full-time',
        'part-time': 'Part-time',
        contract: 'Contract',
    };

    return typeMap[type] || type;
}
