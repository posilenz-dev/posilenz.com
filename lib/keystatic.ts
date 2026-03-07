import { createReader } from '@keystatic/core/reader';
import config from '../keystatic.config';

const isGitHubMode = config.storage.kind === 'github';

console.log(`[Keystatic Reader] Initializing... Mode: ${config.storage.kind}, cwd: ${process.cwd()}`);
console.log(`[Keystatic Reader] KEYSTATIC_GITHUB_TOKEN: ${process.env.KEYSTATIC_GITHUB_TOKEN ? 'Present' : 'Missing'}`);

export const reader = isGitHubMode
    ? (() => {
        const { createGitHubReader } = require('@keystatic/core/reader/github');
        const repo = `${(config.storage as any).repo.owner}/${(config.storage as any).repo.name}` as const;
        console.log(`[Keystatic Reader] Creating GitHub reader for ${repo} (branch: main)`);
        return createGitHubReader(config, {
            repo,
            token: process.env.KEYSTATIC_GITHUB_TOKEN,
            ref: 'main', // Explicitly use main branch
        });
    })()
    : createReader(process.cwd(), config);

// Career type definition
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
    roleOverview: any;
    keyResponsibilities: readonly string[];
    skillsExperience: readonly string[];
    whatYoullBring: readonly string[];
    whyJoin: any;
    content: any;
}

// Get all active careers sorted by display order
export async function getCareers(): Promise<Career[]> {
    console.log(`[Keystatic getCareers] Calling reader.collections.careers.all()...`);
    console.log(`[Keystatic getCareers] Storage kind: ${config.storage.kind}`);
    const careers = await reader.collections.careers.all();
    console.log(`[Keystatic getCareers] Found ${careers.length} careers:`, careers.map((c: any) => c.slug));

    const activeCareers = careers
        .filter((career: any) => career.entry.isActive && career.entry.title) // Filter out careers without titles
        .sort((a: any, b: any) => (a.entry.displayOrder || 0) - (b.entry.displayOrder || 0));

    // Read document content for each career
    const careersWithContent = await Promise.all(
        activeCareers.map(async (career: any) => {
            const [roleOverview, whyJoin, content] = await Promise.all([
                career.entry.roleOverview(),
                career.entry.whyJoin(),
                career.entry.content(),
            ]);

            return {
                slug: career.entry.slug || career.slug,
                title: career.entry.title as string, // Safe assertion since we filtered nulls
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

    return careersWithContent;
}

// Get a single career by slug
export async function getCareerBySlug(slug: string): Promise<Career | null> {
    try {
        const career = await reader.collections.careers.read(slug);
        if (!career || !career.title) return null; // Return null if no career or no title

        const [roleOverview, whyJoin, content] = await Promise.all([
            career.roleOverview(),
            career.whyJoin(),
            career.content(),
        ]);

        return {
            slug: career.slug || slug,
            title: career.title as string, // Safe assertion since we checked for null above
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

// Helper to format location display
export function formatWorkMode(location: string): string {
    const locationMap: Record<string, string> = {
        remote: 'Remote',
        hybrid: 'Hybrid',
        onsite: 'On-site',
    };
    return locationMap[location] || location;
}

// Helper to format employment type display
export function formatEmploymentType(type: string): string {
    const typeMap: Record<string, string> = {
        'full-time': 'Full-time',
        'part-time': 'Part-time',
        contract: 'Contract',
    };
    return typeMap[type] || type;
}

