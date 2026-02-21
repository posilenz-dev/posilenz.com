# Project Memory

This document contains essential context for AI agents working on the Posilenz website codebase. **All AI agents should read this file before making modifications.**

## Project Overview

Corporate website for Posilenz - Intelligent Systems & AI Solutions.

## Technology Stack

*   **Framework**: Next.js 16.1 (App Router)
*   **UI Library**: React 19
*   **Styling**: Vanilla CSS / Tailwind CSS v4 (using PostCSS)
*   **Animations**: GSAP (`@gsap/react`)
*   **Carousels**: Swiper
*   **Components**: shadcn/ui (Lucide icons, Radix UI)
*   **CMS**: Keystatic (`@keystatic/next`, `@keystatic/core`) - configured for both local and GitHub modes.
*   **Email**: Nodemailer for transactional forms
*   **Language**: TypeScript
*   **Package Manager**: pnpm

## Architecture & Structure

*   `app/`: Using Next.js App Router for all routing.
    *   `/`: Main Landing Page.
    *   `/blog`: Blog overview and detail pages.
    *   `/careers`: Career listings.
    *   `/api`: API routes (like Keystatic API).
    *   `/keystatic`: Admin UI for the Keystatic CMS.
*   `components/`: Segregated logically by domain (`landing`, `blog`, `careers`, `ui`).
    *   Always reuse shared `ui` components (shadcn based) when possible.
*   `content/`: File-based content managed by Keystatic (e.g., job listings in `content/careers/`).
*   `lib/`: Core utilities, including Mailer setup, Keystatic configurations, and mocked Blog data.

## Key Design Principles

1.  **Aesthetics**: The design utilizes dynamic micro-animations via GSAP, tailored color palettes, and modern typography (Inter and Sora fonts).
2.  **Responsiveness**: Always build mobile-first with Tailwind utility classes.
3.  **CMS Content Development**: When defining schemas in Keystatic, verify `keystatic.config.ts`. Ensure environment variables are respected. The CMS runs in "local" mode during development and "github" mode in production.

## Environment Variables

*   **Email Configuration**: Ensure `SMTP_*` variables are set for nodemailer.
*   **Keystatic Integration**: Production requires GitHub App details (`NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO`, `KEYSTATIC_GITHUB_CLIENT_ID`, etc.). Read `keystatic.config.ts` for exact requirements.

## Troubleshooting

*   **Keystatic Build Errors**: If building for production fails due to Keystatic, it is invariably due to missing GitHub App environment variables. Verify they are correctly supplied.
*   **Styling Issues**: Tailwind v4 is used with CSS layer definitions in `app/globals.css`. Ensure `@tailwindcss/postcss` is functioning if styles fail to apply.
