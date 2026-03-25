# Project Memory

This document contains essential context for AI agents working on the Posilenz website codebase. **All AI agents should read this file before making modifications.**

## Project Overview

Corporate website for Posilenz - Intelligent Systems & AI Solutions.

## Technology Stack

*   **Framework**: Next.js 16.1 (App Router)
*   **UI Library**: React 19
*   **Styling**: Tailwind CSS v4 (using PostCSS)
*   **Animations**: GSAP (`@gsap/react`)
*   **Carousels**: Swiper
*   **Components**: shadcn/ui (Lucide icons, Radix UI)
*   **CMS**: Keystatic (`@keystatic/next`, `@keystatic/core`) - configured for both local and GitHub modes.
*   **Content Rendering**: Markdoc (`@markdoc/markdoc`) for Keystatic blog body rendering
*   **Email**: Nodemailer and Resend for transactional forms
*   **Language**: TypeScript
*   **Validation**: Zod
*   **Package Manager**: pnpm

## Architecture & Structure

*   `app/`: Using Next.js App Router for all routing.
    *   `/`: Main Landing Page.
    *   `/blog`: Blog overview and detail pages. Powered by the Keystatic `blog` collection with dynamic metadata and sitemap support.
    *   `/careers`: Career listings. Powered by Keystatic CMS.
    *   `/api`: API routes (like Keystatic API).
    *   `/keystatic`: Admin UI for the Keystatic CMS.
    *   `actions.ts`: Core server actions for forms (Contact, Careers, Newsletter).
*   `components/`: Segregated logically by domain (`landing`, `blog`, `careers`, `ui`).
    *   Always reuse shared `ui` components (shadcn based) when possible.
*   `content/`: File-based content managed by Keystatic.
    *   `content/blog/`: Blog posts stored as `index.md` content files with frontmatter and Markdoc body content.
    *   `content/careers/`: Career listings.
*   `lib/`: Core utilities.
    *   `keystatic.ts`: Shared Keystatic reader plus validated blog/career retrieval helpers, date formatting, CMS normalization, and GitHub App installation-token based reader auth in GitHub mode.
    *   `mailer.ts`: SMTP and Resend setup for emails.
*   `public/images/blog/`: CMS-managed cover-image assets for blog posts.

## Key Design Principles

1.  **Aesthetics**: The design utilizes dynamic micro-animations via GSAP, tailored color palettes, and modern typography (Inter and Sora fonts).
2.  **Responsiveness**: Always build mobile-first with Tailwind utility classes.
3.  **CMS Content Development**: When defining schemas in Keystatic, verify `keystatic.config.ts`. Ensure environment variables are respected. Explicit `NEXT_PUBLIC_KEYSTATIC_MODE=github` must take precedence even during development. In `lib/keystatic.ts`, `getReader()` uses `createGitHubReader` in GitHub mode and prefers short-lived GitHub App installation tokens (using integer `iss` for JWT), falling back to `KEYSTATIC_GITHUB_TOKEN` gracefully.
4.  **Blog Data Flow**: Blog list, detail, homepage Insights, metadata, and sitemap all read from the same Keystatic-backed blog helpers in `lib/keystatic.ts`. Invalid blog entries are expected to fail closed via Zod validation instead of leaking malformed CMS data into the UI.

## Environment Variables

*   **Email Configuration**: Ensure `SMTP_*` variables are set for nodemailer.
*   **Keystatic Integration**: Production requires the GitHub repo plus server-side reader auth. Prefer `KEYSTATIC_GITHUB_APP_ID` and `KEYSTATIC_GITHUB_PRIVATE_KEY` for GitHub App installation-token reads; `KEYSTATIC_GITHUB_TOKEN` is only a fallback. Read `keystatic.config.ts` and `lib/keystatic.ts` for exact requirements.
*   **Keystatic Mode Control**: `NEXT_PUBLIC_KEYSTATIC_MODE` explicitly controls whether local or GitHub storage is used. If set to `github`, the app should use GitHub mode even in development.

## Troubleshooting

*   **Keystatic Build/Runtime Errors**: If GitHub-mode content reads fail, verify the GitHub App credentials first (`KEYSTATIC_GITHUB_APP_ID`, `KEYSTATIC_GITHUB_PRIVATE_KEY`, repo installation). If those are not configured, verify the fallback `KEYSTATIC_GITHUB_TOKEN` still has valid access to the configured repository.
*   **Blog Rendering Issues**: Blog detail pages render Markdoc content transformed server-side. If blog body styling regresses, check `app/styles/blog-detail.css` descendant selectors rather than looking for legacy `article-paragraph` HTML classes.
*   **Styling Issues**: Tailwind v4 is used with CSS layer definitions in `app/globals.css`. Ensure `@tailwindcss/postcss` is functioning if styles fail to apply.
