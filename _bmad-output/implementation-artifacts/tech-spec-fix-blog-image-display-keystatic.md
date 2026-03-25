---
title: 'Fix Blog Image Display and Keystatic Asset Workflow'
slug: 'fix-blog-image-display-keystatic'
created: '2026-03-12T10:30:00Z'
status: 'Implementation Complete'
stepsCompleted: [1, 2, 3, 4]
tech_stack:
  - 'Next.js 16 (App Router)'
  - 'Keystatic (@keystatic/core)'
  - 'GitHub API (Octokit/Rest)'
files_to_modify:
  - 'keystatic.config.ts'
  - 'lib/keystatic.ts'
  - 'app/api/assets/[...path]/route.ts'
code_patterns:
  - 'GitHub-backed Keystatic storage with external CMS repo'
  - 'Server-side data fetching with Keystatic GitHub Reader'
  - 'Custom API route for asset proxying'
test_patterns:
  - 'Manual verification of image rendering'
  - 'GitHub API response validation'
---

# Tech-Spec: Fix Blog Image Display and Keystatic Asset Workflow

**Created:** 2026-03-12T10:30:00Z

## Overview

### Problem Statement

Images uploaded via Keystatic Admin are not being displayed in blog articles (404) and appear missing from the configured Git repository. Specifically, paths like `/images/blog/test/coverImage.png` are failing, likely due to a mismatch between where Keystatic commits images and where the Next.js application expects them.

### Solution

Implement a **GitHub Asset Proxy** route (`/api/assets/[...path]`) in the main application. This route will fetch raw image files from the `posilenz.com-cms-stg` repository using the server's `KEYSTATIC_GITHUB_TOKEN`. Keystatic's configuration will be updated to point to this proxy for its `publicPath`, ensuring images are served correctly without requiring them to be in the main repository's `public/` folder.

### Scope

**In Scope:**
- Investigating `keystatic.config.ts` image field properties.
- Implementing `app/api/assets/[...path]/route.ts` as a server-side proxy.
- Configuring Keystatic to use the proxy for blog cover images.
- Verifying slug-based subfolder creation in the CMS-stg repository.
- Ensuring the proxy handles authentication with the CMS-stg private repository.

**Out of Scope:**
- Merging the CMS repo back into the main repo.
- Client-side fetching of GitHub assets (always through the proxy).

## Context for Development

### Codebase Patterns

- **Keystatic Configuration**: Collections are defined in `keystatic.config.ts`. The `blog` collection uses `public/images/blog` for its image directory.
- **Data Loading**: `lib/keystatic.ts` contains readers and normalization logic for blog and careers data.
- **Asset Serving**: Next.js serves from `public/`. Cross-repo assets require a proxy route.
- **GitHub Auth**: The project already has helpers for generating GitHub App JWTs and resolving installation tokens in `lib/keystatic.ts`.

### Files to Reference

| File | Purpose |
| ---- | ------- |
| `keystatic.config.ts` | Collection and asset configuration |
| `lib/keystatic.ts` | Data loading and normalization helpers |
| `app/api/keystatic/[...params]/route.ts` | Existing Keystatic API route structure |
| `.env.local` | GitHub repo and token configuration |

### Technical Decisions

- **Architecture Decision Record (ADR): GitHub Asset Proxy**
  - **Context**: The Next.js application (main repo) needs to serve images stored in a separate private/staging GitHub repository (`posilenz.com-cms-stg`).
  - **Decision**: Implement `/api/assets/[...path]` as a server-side proxy to fetch and stream assets from the CMS repo.
  - **Rationale**: 
    - **Security**: Keeps the `KEYSTATIC_GITHUB_TOKEN` on the server; supports private repository access without exposing tokens to the client.
    - **Performance**: Implements `Cache-Control: public, s-maxage=3600, stale-while-revalidate=86400` to minimize GitHub API overhead and latency.
    - **DX**: Eliminates the need for build-time sync scripts or manual image management across repositories.
- **Path Mapping**: `/api/assets/blog/test/image.png` will map directly to `public/images/blog/test/image.png` in the `cms-stg` repository.
- **Content-Type Passthrough**: The proxy will automatically detect and set the correct `Content-Type` (image/png, image/jpeg, image/svg+xml, etc.) based on file extension.
- **Slug-based subfolders**: Images will be organized in folders named after the post slug (e.g., `public/images/blog/[slug]/`).

## Implementation Plan

### Tasks

- [x] Task 1: Create the GitHub Asset Proxy Route
  - File: `app/api/assets/[...path]/route.ts`
  - Action: Implement a `GET` handler that:
    1. Extracts the path from `params.path`.
    2. Resolves the GitHub Installation Token using `resolveGitHubReadToken` from `lib/keystatic.ts`.
    3. Fetches the raw file content from `posilenz-dev/posilenz.com-cms-stg` via the GitHub API (`/repos/{owner}/{repo}/contents/{path}`).
    4. Detects the `Content-Type` based on the file extension.
    5. Returns the file buffer with appropriate `Cache-Control` headers.
  - Notes: Handle 404s gracefully; ensure the `path` correctly points to the `public/` directory in the CMS repo if needed.

- [x] Task 2: Update Keystatic Blog Collection Configuration
  - File: `keystatic.config.ts`
  - Action: Update the `blog` collection's `coverImage` field:
    - Set `publicPath: '/api/assets/public/images/blog/'`.
  - Notes: This ensures that when a blog post is rendered, the image URL points to our new proxy.

- [x] Task 3: Refine Blog Data Normalization
  - File: `lib/keystatic.ts`
  - Action: Ensure the `coverImage` field in the blog schema is correctly handled during normalization. If the stored path is relative or lacks the proxy prefix, ensure it's prepended correctly.
  - Notes: Double-check that `normalizeBlogBase` and `normalizeBlogPost` don't accidentally strip the proxy prefix.

- [x] Task 4: Verify Asset Proxy and Keystatic Workflow
  - Action: 
    1. Upload a new test image via Keystatic Admin.
    2. Verify it's committed to the `cms-stg` repo.
    3. Access the image directly via `/api/assets/public/images/blog/[slug]/[filename]`.
    4. Verify the image renders on the blog list and detail pages.

### Acceptance Criteria

- [ ] AC 1: Given a blog post with a cover image in the CMS-stg repo, when the proxy route is requested, then the image is returned with a 200 OK and correct `Content-Type`.
- [ ] AC 2: Given a missing image path, when the proxy route is requested, then a 404 Not Found is returned.
- [ ] AC 3: Given an image is fetched through the proxy, when the response is received, then it contains `Cache-Control` headers for `stale-while-revalidate`.
- [ ] AC 4: Given a blog post is rendered in the UI, when the cover image is displayed, then the `src` attribute correctly points to the `/api/assets/` proxy.
- [ ] AC 5: Given a new blog post is created in Keystatic, when an image is uploaded, then it is saved in a subfolder named after the slug in the CMS-stg repository.

## Additional Context

### Dependencies

- `@keystatic/core`
- GitHub API access (configured in `.env.local`)
- `lib/keystatic.ts` (for auth helpers)

### Testing Strategy

- **Manual**: Create a post named "Proxy Test" in Keystatic Admin, upload an image, and verify rendering.
- **Direct API Check**: Use `curl` or browser to hit `/api/assets/public/images/blog/cloud-erp-implementation/cover.png` and check headers.

### Notes

- The `cms-stg` repo path for images is likely `public/images/blog/`. The proxy must account for this base path if it's not part of the `publicPath` config.
- Performance: Initial fetch from GitHub may take 200-500ms; caching is critical.
