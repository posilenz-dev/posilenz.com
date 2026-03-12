---
title: 'Migrate Blog to Keystatic CMS'
slug: 'migrate-blog-to-keystatic-cms'
created: '2026-03-10T23:23:25+05:30'
status: 'ready-for-dev'
stepsCompleted: [1, 2, 3, 4]
tech_stack:
  - 'Next.js 16 App Router'
  - 'React 19'
  - 'TypeScript'
  - 'Keystatic'
  - '@keystatic/core/renderer'
  - 'Tailwind CSS v4'
  - 'Swiper'
  - 'Zod'
files_to_modify:
  - 'package.json'
  - 'keystatic.config.ts'
  - 'lib/keystatic.ts'
  - 'lib/blogData.ts'
  - 'app/blog/page.tsx'
  - 'app/blog/[slug]/page.tsx'
  - 'components/blog/FeaturedPost.tsx'
  - 'components/blog/BlogList.tsx'
  - 'components/blog/BlogDetailClient.tsx'
  - 'components/landing/Insights.tsx'
  - 'components/landing/InsightsClient.tsx'
  - 'components/careers/CurrentOpenings.tsx'
  - 'components/careers/CurrentOpeningsClient.tsx'
  - 'test-reader.ts'
  - 'test-keystatic.ts'
  - 'content/blog/*'
code_patterns:
  - 'Keystatic collection definitions live in keystatic.config.ts'
  - 'Keystatic reader helpers live in lib/keystatic.ts'
  - 'App Router pages fetch CMS data in server components and pass results into presentational/client components'
  - 'Keystatic document fields are rendered in client components with DocumentRenderer'
  - 'Blog detail route currently uses generateMetadata and generateStaticParams from a static source and must be migrated to reader-backed dynamic data'
  - 'Homepage Insights is currently a client-only Swiper implementation and should likely be split into server data loading plus client presentation'
test_patterns:
  - 'Project validation is primarily pnpm lint plus manual browser verification'
  - 'Ad hoc Keystatic reader scripts exist in test-reader.ts and test-keystatic.ts'
---

# Tech-Spec: Migrate Blog to Keystatic CMS

**Created:** 2026-03-10T23:23:25+05:30

## Overview

### Problem Statement

The blog is currently hard-coded in `lib/blogData.ts` and in blog-related UI components, which prevents editors from managing posts through Keystatic and keeps blog content and media outside the CMS-backed Git content workflow.

### Solution

Add a `blog` collection to Keystatic, migrate the existing hard-coded posts into CMS-managed content, and update the homepage Insights section plus the `/blog` listing and `/blog/[slug]` detail route to read from Keystatic. Blog entries will support Markdoc body content, publish-date sorting, draft state, and an optional cover image committed into repository-managed CMS content/assets.

### Scope

**In Scope:**
- Add a Keystatic `blog` collection
- Store blog body in a Keystatic Markdoc field
- Add `slug`, `title`, `excerpt`, `publishDate`, `isDraft`, and optional `coverImage` fields
- Sort public blog content latest first by publish date
- Migrate current hard-coded blog entries into CMS content files
- Update `/blog` listing page to render from Keystatic data
- Update `/blog/[slug]` page, metadata, and static params to render from Keystatic data
- Update homepage Insights carousel/cards to render from Keystatic data
- Ensure cover images are managed in Keystatic and committed to Git with the rest of CMS content
- Keep navbar `Insights` linked to `/blog`

**Out of Scope:**
- Categories, tags, search, or pagination
- External asset storage or CDN migration beyond the existing Next.js setup
- Major redesign of existing blog or homepage Insights UI
- Non-blog CMS changes unrelated to this migration

## Context for Development

### Codebase Patterns

- Keystatic collections are defined centrally in `keystatic.config.ts`, with local/GitHub storage mode already handled there.
- CMS read helpers are centralized in `lib/keystatic.ts`, where careers already use reader-based server helpers.
- The careers path is the best existing integration reference: `app/careers/page.tsx` fetches server data via `getCareers()`, then passes that data into a client renderer where needed.
- Keystatic rich document content is currently rendered with `DocumentRenderer` in `components/careers/CurrentOpeningsClient.tsx`.
- The blog listing page composes static components in `app/blog/page.tsx`.
- The blog detail page in `app/blog/[slug]/page.tsx` currently derives metadata and static params from `lib/blogData.ts`.
- The homepage `components/landing/Insights.tsx` is currently a client component with hard-coded slides and no server data hook.
- The blog detail rendering currently assumes HTML-string content, which will need to change for Keystatic Markdoc content.
- No existing committed Keystatic asset/image-field pattern was found in the repo, so blog cover-image handling will establish the first explicit asset convention unless hidden in remote-only CMS content.

### Files to Reference

| File | Purpose |
| ---- | ------- |
| `keystatic.config.ts` | Existing Keystatic storage config and `careers` collection pattern |
| `lib/keystatic.ts` | Existing reader setup and server-side CMS fetch helpers |
| `lib/blogData.ts` | Current hard-coded blog source to be migrated and then removed or deprecated |
| `app/blog/page.tsx` | Blog index route composition |
| `app/blog/[slug]/page.tsx` | Blog detail page, metadata, and static params |
| `components/blog/FeaturedPost.tsx` | Hard-coded featured post section on `/blog` |
| `components/blog/BlogList.tsx` | Hard-coded post list on `/blog` |
| `components/blog/BlogDetailClient.tsx` | Blog article rendering surface that must receive CMS-backed data |
| `components/landing/Insights.tsx` | Homepage Insights cards/swiper currently hard-coded |
| `components/landing/InsightsClient.tsx` | New client-only swiper/presentation component to create if homepage data moves server-side |
| `components/landing/Navbar.tsx` | Navbar already routes `Insights` to `/blog`; preserve behavior |
| `app/careers/page.tsx` | Existing server-component route pattern for Keystatic-backed content |
| `components/careers/CurrentOpenings.tsx` | Existing server wrapper that fetches Keystatic data and passes it down |
| `components/careers/CurrentOpeningsClient.tsx` | Existing client renderer using `DocumentRenderer` for Keystatic rich content |
| `test-reader.ts` | Ad hoc script for testing the configured reader behavior |
| `test-keystatic.ts` | Ad hoc script for verifying GitHub-backed reader access |

### Technical Decisions

- Use Keystatic Markdoc for blog body content.
- Add draft support so unpublished posts do not appear in public lists or routes.
- Make cover image optional; public UI should tolerate missing images gracefully.
- Sort published posts by publish date descending, with latest first.
- Homepage Insights section should use the same Keystatic-backed blog source as `/blog`.
- Cover images should be stored in repo-managed CMS content/assets so they travel through Git along with other content.
- Blog content and assets must be stored in the configured GitHub repository via Keystatic GitHub mode.
- Keystatic mode selection must honor explicit environment configuration first; if GitHub mode is set in env, the app must use GitHub mode even during development.
- Existing Keystatic-managed assets and storage conventions must be audited and the blog asset implementation must follow the same repo/storage pattern.
- Markdoc content requires structured rendering; blog detail rendering must move away from raw HTML string injection.
- Blog CMS data should be normalized and validated with Zod in the server-side reader layer before being consumed by routes or components.
- Invalid blog CMS entries that fail Zod validation should fail closed in a controlled way for public surfaces rather than causing unpredictable rendering failures.
- Blog display date formatting should be derived in one shared normalization/utility layer so homepage, list, featured, and detail views stay consistent with the current visible format.
- Blog SEO metadata should be generated from CMS data without requiring a rebuild for newly added posts.
- Blog discovery for new posts must not depend on build-time-only `generateStaticParams`.
- The implementation should support SEO fundamentals for ranking: metadata, canonical URLs, social previews, server-rendered structured data, and sitemap inclusion for published posts.
- SEO title/description should be derived from `title` and `excerpt` in this scope rather than introducing separate editor-managed SEO fields.
- Use `content/blog/*/` as the collection storage path for blog entries.
- Remove `lib/blogData.ts` after successful content migration rather than maintaining a fallback source.
- Current repo state suggests no committed Keystatic asset field usage exists yet, so the spec must define the initial blog cover-image pattern carefully and verify it works in GitHub mode.
- Existing env configuration files indicate GitHub mode and GitHub repo configuration are already part of the project setup; implementation should align with that configured path rather than introducing a separate storage convention.

## Implementation Plan

### Tasks

- [ ] Task 1: Tighten Keystatic mode selection to prioritize explicit environment configuration
  - File: `keystatic.config.ts`
  - Action: Update storage-mode resolution so `NEXT_PUBLIC_KEYSTATIC_MODE=github` always forces GitHub storage, even during development.
  - Notes: Preserve current support for local mode when explicitly configured; do not let `NODE_ENV=development` override an explicit GitHub-mode env value.

- [ ] Task 2: Add schema-validation dependency support for the blog domain
  - File: `package.json`
  - Action: Add `zod` as a project dependency for blog data validation and normalization.
  - Notes: Validation should happen at the CMS reader boundary, not inside UI components.

- [ ] Task 3: Define the blog collection and asset model in Keystatic
  - File: `keystatic.config.ts`
  - Action: Add a `blog` collection at `content/blog/*/` with fields for `slug`, `title`, `excerpt`, `publishDate`, `isDraft`, optional `coverImage`, and Markdoc body content.
  - Notes: Choose a Keystatic image/file field pattern that stores content and assets in the configured GitHub repo and works with existing Next.js image rendering expectations; keep SEO fields derived rather than adding separate CMS SEO inputs.

- [ ] Task 4: Create a CMS-backed validated blog domain model and reader helpers
  - File: `lib/keystatic.ts`
  - Action: Add Zod-backed blog schemas, normalized blog types, shared date-formatting helpers, and reader functions for published blog listing, homepage/latest listing, and single-post lookup by slug.
  - Notes: Follow the careers pattern: centralize reader access here, filter drafts out of public helpers, sort published posts by publish date descending, derive featured/list consumers from the same ordered query, and expose only validated blog objects to routes/components.

- [ ] Task 5: Audit and verify GitHub-mode reader behavior for the new blog collection
  - File: `lib/keystatic.ts`
  - File: `test-reader.ts`
  - File: `test-keystatic.ts`
  - Action: Ensure the blog collection follows the same reader strategy as careers and update lightweight verification scripts if needed to confirm GitHub-backed reads.
  - Notes: This task is specifically to confirm the new collection and any image references resolve correctly when GitHub mode is active from env configuration.

- [ ] Task 6: Migrate the existing hard-coded blog posts into CMS content and assets
  - File: `content/blog/*`
  - File: `lib/blogData.ts`
  - Action: Create blog entry content files and associated cover-image assets in CMS-managed storage using the existing public slugs and matching article content.
  - Notes: Preserve current public URLs and parity for title, excerpt, `publishDate`, slug, and article body; once migration is complete and consumers are switched over, remove the static source file rather than leaving it as fallback.

- [ ] Task 7: Refactor the blog index page to use CMS-backed data
  - File: `app/blog/page.tsx`
  - File: `components/blog/FeaturedPost.tsx`
  - File: `components/blog/BlogList.tsx`
  - Action: Fetch blog data server-side and pass the featured/latest post plus remaining posts into prop-driven components.
  - Notes: Keep the existing visual structure; derive the featured post from the first published item in the shared ordered query rather than maintaining a separate content source.

- [ ] Task 8: Refactor homepage Insights to use CMS-backed data without losing client-side Swiper behavior
  - File: `components/landing/Insights.tsx`
  - File: `components/landing/InsightsClient.tsx`
  - Action: Convert the current hard-coded homepage Insights section into a server data wrapper plus a new client presentation component for Swiper interactions.
  - Notes: Reuse the same published-post query used by the blog page, limit the homepage selection as needed, exclude drafts, and keep display date formatting aligned with other blog surfaces.

- [ ] Task 9: Refactor the blog detail page to render CMS content dynamically
  - File: `app/blog/[slug]/page.tsx`
  - File: `components/blog/BlogDetailClient.tsx`
  - Action: Replace `lib/blogData.ts` usage with CMS-backed slug lookup and render Markdoc content instead of injecting HTML strings.
  - Notes: The route should support new published slugs without rebuild-only path generation; draft slugs must return `notFound()`.

- [ ] Task 10: Implement SEO-ready metadata and structured article output
  - File: `app/blog/[slug]/page.tsx`
  - Action: Generate canonical, Open Graph, and Twitter metadata from current CMS content and emit article structured data for published posts from the server route layer.
  - Notes: Metadata must work for newly added posts without a rebuild dependency; optional cover images should be used when present and fall back safely when absent; SEO title and description should be derived from `title` and `excerpt`.

- [ ] Task 11: Add blog-aware sitemap support for published posts
  - File: `app/sitemap.ts`
  - File: `lib/keystatic.ts`
  - Action: Add or extend sitemap generation so published blog URLs are included and drafts are excluded.
  - Notes: The repo does not currently have an `app/sitemap.ts`; keep the implementation aligned with the site metadata base and current routing, and do not regress indexing coverage for existing non-blog routes if a new sitemap file is introduced.

- [ ] Task 12: Remove the legacy static blog source and verify all consumers are migrated
  - File: `lib/blogData.ts`
  - File: `app/blog/page.tsx`
  - File: `app/blog/[slug]/page.tsx`
  - File: `components/blog/FeaturedPost.tsx`
  - File: `components/blog/BlogList.tsx`
  - File: `components/blog/BlogDetailClient.tsx`
  - File: `components/landing/Insights.tsx`
  - File: `components/landing/InsightsClient.tsx`
  - Action: Remove `lib/blogData.ts` and any imports or types tied to it after all blog surfaces are confirmed to use CMS data.
  - Notes: This cleanup should happen last so migration work is verifiable before the static source is deleted.

### Acceptance Criteria

- [ ] AC 1: Given multiple published blog entries exist in Keystatic, when a user visits `/blog`, then posts render in descending `publishDate` order with the latest post used as the featured entry.
- [ ] AC 2: Given a blog entry is marked draft, when a user visits `/blog` or the homepage Insights section, then that entry is not shown publicly.
- [ ] AC 3: Given a published blog entry exists in Keystatic, when a user visits `/blog/[slug]`, then the page renders the CMS-backed content instead of data from `lib/blogData.ts`.
- [ ] AC 4: Given a draft blog entry slug is requested directly, when the blog detail route resolves that slug, then the route returns `notFound()` publicly.
- [ ] AC 5: Given a published blog entry has an optional cover image configured, when the listing page, homepage Insights section, or detail page renders, then the image is displayed using the CMS-managed asset path.
- [ ] AC 6: Given a published blog entry has no cover image, when the listing page, homepage Insights section, or detail page renders, then the UI still renders cleanly without broken media.
- [ ] AC 7: Given an editor creates or updates a blog post and cover image in Keystatic admin, when the content is saved, then the entry and asset are persisted in the configured GitHub repo through Keystatic GitHub mode.
- [ ] AC 8: Given `NEXT_PUBLIC_KEYSTATIC_MODE=github` is set in environment configuration, when the app initializes Keystatic storage and reader access, then GitHub mode is used even during development.
- [ ] AC 9: Given current public blog URLs are already in use, when existing posts are migrated into CMS content, then their slugs remain unchanged.
- [ ] AC 10: Given a newly added published blog post exists in Keystatic, when its slug is requested for the first time, then the page renders without requiring a full rebuild or redeploy.
- [ ] AC 11: Given blog metadata is generated for a published post, when the detail page is requested, then title, description, canonical URL, and Open Graph/Twitter image values are derived from current CMS data.
- [ ] AC 12: Given a published blog post has no cover image, when metadata is generated, then social metadata falls back safely without broken image output.
- [ ] AC 13: Given a published blog post is rendered publicly, when search engines crawl the page, then article structured data is present in the output.
- [ ] AC 14: Given sitemap support is enabled for the site, when blog posts are published or drafted, then published blog URLs are included in the sitemap and drafts are excluded.
- [ ] AC 15: Given homepage Insights renders blog cards from CMS content, when content is loaded, then only the latest published posts are shown in publish-date order.
- [ ] AC 16: Given blog data is loaded from Keystatic, when public routes or components consume that data, then they receive validated and normalized blog objects produced by the Zod-backed reader layer.
- [ ] AC 17: Given a published blog post is displayed on homepage, listing, featured, or detail surfaces, when the publish date is shown, then the visible date formatting remains consistent with the current UI style.
- [ ] AC 18: Given a blog entry in CMS fails Zod validation, when public blog queries are resolved, then that invalid entry is excluded or handled in a controlled fail-closed manner instead of causing unstable rendering.

## Additional Context

### Dependencies

- `zod` for blog schema validation and normalization
- Existing Keystatic setup in local and GitHub storage modes
- Keystatic GitHub mode must be the supported CMS persistence mode for blog content and cover images
- Existing Next.js image handling for repo-hosted assets
- Existing blog UI components and styles
- Existing careers implementation as the closest server/data/render integration pattern
- Next.js App Router metadata and sitemap file conventions for SEO output

### Testing Strategy

- Validate blog CRUD assumptions against existing Keystatic reader patterns.
- Validate Zod schema parsing and normalization behavior for required fields, optional cover images, and draft/published blog entries.
- Validate the chosen Keystatic image/file field output against `next/image` usage and GitHub-mode asset resolution.
- Verify published-only filtering on homepage Insights, `/blog`, and `/blog/[slug]`.
- Verify draft entries are excluded from public routes and return not found if accessed directly.
- Verify metadata generation still works with CMS-backed values and optional images.
- Verify GitHub-mode Keystatic reads still resolve correctly with the configured repo environment.
- Verify newly added published posts can resolve and produce current metadata without a rebuild-dependent path-generation step.
- Verify draft posts are excluded from any public SEO surfaces, including structured data and sitemap output.
- Manually verify sitemap output includes only published blog URLs after implementation.
- Use `test-reader.ts` and `test-keystatic.ts` as reference points if lightweight reader verification is needed, but note there is no formal unit/integration test harness in the repo today.
- Run project checks after implementation, at minimum `pnpm lint` and any relevant build validation.

### Test Cases

- TC 1 (AC 1, AC 15): Seed multiple published blog entries with different `publishDate` values, load `/blog` and the homepage, and verify the latest post is featured while remaining published posts render in descending date order.
- TC 2 (AC 2): Mark one blog entry as draft in Keystatic, then verify it does not appear on `/blog` or the homepage Insights section.
- TC 3 (AC 3): Open an existing migrated blog slug and verify the detail page renders CMS-backed content instead of static `lib/blogData.ts` data.
- TC 4 (AC 4): Request a draft blog slug directly and verify the app returns `notFound()` / 404 behavior.
- TC 5 (AC 5): Create a published post with a cover image and verify that image appears correctly on homepage, blog list, featured card, and detail page.
- TC 6 (AC 6, AC 12): Create a published post without a cover image and verify public UI still renders cleanly and metadata falls back without broken social-preview output.
- TC 7 (AC 7, AC 8): With `NEXT_PUBLIC_KEYSTATIC_MODE=github` configured, create or edit a blog post in Keystatic admin and verify content/assets persist to the configured GitHub repo and are read back through GitHub mode.
- TC 8 (AC 9): Compare the migrated CMS entries against the current hard-coded dataset and verify each migrated post preserves title, excerpt, slug, `publishDate`, and article body parity.
- TC 9 (AC 10): Add a new published blog post in Keystatic admin after deployment/dev startup, request its slug, and verify the page resolves without a rebuild or redeploy.
- TC 10 (AC 11): Inspect the metadata generated for a published post and verify title, description, canonical URL, and OG/Twitter values are derived from current CMS data.
- TC 11 (AC 13): Inspect the server-rendered blog detail HTML and verify article structured data is present for a published post.
- TC 12 (AC 14): Inspect sitemap output and verify published blog URLs are included, draft blog URLs are excluded, and existing core site routes are not dropped.
- TC 13 (AC 16, AC 18): Introduce malformed CMS blog data that violates the Zod schema, resolve the public blog list/detail queries, and verify invalid entries fail closed in a controlled way rather than causing unstable page rendering.
- TC 14 (AC 17): Compare the visible publish-date display on homepage, featured card, blog list, and detail page and verify the formatting remains consistent with the current UI style.

### Notes

- The navbar `Insights` link already points to `/blog`; this is a data-source migration and CMS extension rather than a navigation change.
- The current homepage Insights section and `/blog` index are partially hard-coded independently, so migration must consolidate them onto a shared blog data source.
- The intended CMS persistence target is the GitHub repository configured by `NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO`; blog content should not rely on local-only storage as the target behavior.
- Keystatic configuration behavior should be tightened so explicit env mode wins over inferred `NODE_ENV` behavior.
- Step 2 should explicitly verify whether the current repo already has Keystatic-managed assets and document the observed pattern before finalizing the implementation plan.
- There is currently no `app/sitemap.ts` or `app/robots.ts` in the repo, so blog SEO support may require adding sitemap support rather than only updating page metadata.
- Because no committed Keystatic asset-field pattern was found locally, the image-field decision should be validated against actual generated content paths before implementation is considered done.
- Keep structured article data in the server route layer rather than the client component unless a concrete implementation constraint forces otherwise.
- Derived SEO fields are an intentional simplicity choice in this scope to reduce CMS authoring burden while still supporting ranking-oriented metadata.
- The implementation should prefer keeping existing UI structure and styling while making the components prop-driven and CMS-backed.
