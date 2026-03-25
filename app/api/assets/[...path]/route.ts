import { NextRequest, NextResponse } from 'next/server';
import { resolveGitHubReadToken, githubApiBaseUrl, githubUserAgent } from '@/lib/keystatic';

// Use environment variables or fall back to the configured staging repo
const CMS_REPO_OWNER = process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO?.split('/')[0] || 'posilenz-dev';
const CMS_REPO_NAME = process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO?.split('/')[1] || 'posilenz.com-cms-stg';
const GITHUB_REF = process.env.KEYSTATIC_GITHUB_BRANCH || 'main';

// Regex to allow only safe characters in the file path
const SAFE_PATH_REGEX = /^[a-zA-Z0-9\/\-_\.]+$/;

// F6: Simple in-memory token cache to reduce auth overhead
let cachedToken: { token: string; expiresAt: number } | null = null;

async function getCachedToken() {
    const now = Date.now();
    if (cachedToken && cachedToken.expiresAt > now + 60000) {
        return cachedToken.token;
    }

    const { token, expiresAt } = await resolveGitHubReadToken();
    if (token) {
        cachedToken = { token, expiresAt: expiresAt || now + 3600000 };
    }
    return token;
}

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    try {
        const { path } = await params;
        const filePath = path.join('/');

        // F9 Security: Strictly enforce the blog images directory and prevent path traversal
        if (!filePath || !filePath.startsWith('public/images/blog/') || !SAFE_PATH_REGEX.test(filePath)) {
            console.warn(`[Asset Proxy] Blocked potentially unsafe or invalid path: ${filePath}`);
            return new NextResponse('Forbidden: Access restricted to blog assets', { status: 403 });
        }

        const token = await getCachedToken();

        if (!token) {
            console.error('[Asset Proxy] No GitHub token found');
            return new NextResponse('Unauthorized', { status: 401 });
        }

        // Fetch from GitHub Contents API
        const githubUrl = `${githubApiBaseUrl}/repos/${CMS_REPO_OWNER}/${CMS_REPO_NAME}/contents/${filePath}?ref=${GITHUB_REF}`;
        
        const response = await fetch(githubUrl, {
            headers: {
                Accept: 'application/vnd.github.raw+json',
                Authorization: `Bearer ${token}`,
                'User-Agent': githubUserAgent,
                'X-GitHub-Api-Version': '2022-11-28',
            },
            // F1: Use Next.js data cache with 15-minute revalidation
            next: { revalidate: 900, tags: ['cms-assets'] } 
        });

        if (!response.ok) {
            if (response.status === 404) {
                // F7: Cache 404s for a short time to prevent spamming the GitHub API
                return new NextResponse('Asset not found', { 
                    status: 404,
                    headers: { 'Cache-Control': 'public, s-maxage=60' }
                });
            }
            const errorText = await response.text();
            console.error(`[Asset Proxy] GitHub fetch failed: ${response.status} for ${filePath}`, errorText);
            return new NextResponse('Failed to fetch asset from GitHub', { status: 502 });
        }

        // F5: Use the body directly (ReadableStream) for memory-efficient streaming
        if (!response.body) {
            console.error('[Asset Proxy] Response body is empty');
            return new NextResponse('Failed to read asset from GitHub', { status: 502 });
        }

        // F8: Prioritize GitHub's content-type if available, fallback to extension detection
        const contentType = response.headers.get('content-type') || getContentType(filePath);
        const contentLength = response.headers.get('content-length');

        const headers: Record<string, string> = {
            'Content-Type': contentType,
            // F1: Edge cache for 15 mins (900s), background revalidation up to 24h
            'Cache-Control': 'public, s-maxage=900, stale-while-revalidate=86400',
        };

        if (contentLength) {
            headers['Content-Length'] = contentLength;
        }

        return new NextResponse(response.body, { headers });
    } catch (error) {
        console.error('[Asset Proxy] Internal Error:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}

function getContentType(filePath: string): string {
    const ext = filePath.split('.').pop()?.toLowerCase();
    switch (ext) {
        case 'png': return 'image/png';
        case 'jpg':
        case 'jpeg': return 'image/jpeg';
        case 'gif': return 'image/gif';
        case 'svg': return 'image/svg+xml';
        case 'webp': return 'image/webp';
        case 'avif': return 'image/avif';
        default: return 'application/octet-stream';
    }
}
