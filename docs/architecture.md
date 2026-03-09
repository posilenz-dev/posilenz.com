# Architecture

## Executive Summary

Posilenz.com is a modern web application built using the Next.js App Router framework. It serves as a platform for showcasing Posilenzs services, blog posts, and career opportunities. The architecture leverages a server-centric approach with integrated CMS capabilities for content management.

## Technology Stack

- **Framework**: Next.js 16.1.1 (App Router)
- **UI Library**: React 19.2.3
- **Language**: TypeScript 5
- **Styling**: TailwindCSS 4
- **Animation**: GSAP 3.14.2
- **CMS**: Keystatic 0.5.48 (GitHub Storage Mode)
- **Email**: Nodemailer 7.0.12, Resend 6.9.2
- **Runtime**: Node.js 24.x
- **Package Manager**: pnpm 10.8.0

## Architecture Pattern

The project follows the **Layered/Component-based** architecture provided by Next.js:

- **Routing Layer**: `app/` directory defines the file-based routing and page layouts.
- **Server Layer**: Server Actions (`app/actions.ts`) handle data mutations and form submissions.
- **UI Layer**: `components/` directory contains reusable React components organized by feature areas.
- **Data Access Layer**: `lib/` directory provides utilities for fetching content from Keystatic and handling static data.

## Data Architecture

The application uses two primary sources of data:

1. **Keystatic CMS**: Manage "Careers" collection through a GitHub-backed storage model. Content is stored as Markdown/YAML files in `content/careers/`.
2. **Static Data**: "Blog" posts are managed through a static array in `lib/blogData.ts`.

## API Design

- **GitHub OAuth**: Integrated for secure access to the Keystatic administration interface.
- **Keystatic API**: Route handlers in `app/api/keystatic/` provide the backend for the CMS dashboard.
- **Server Actions**: Native Next.js actions used for handling application forms and email dispatching.

## Testing Strategy

- **Email Testing**: Dedicated script `scripts/test-email.ts` for verifying SMTP and Resend integration.
- **Linting**: ESLint configured for code quality and consistency.

## Deployment Architecture

- **Static Assets**: Hosted and served via Vercels edge network.
- **Serverless Functions**: API routes and Server Actions run as serverless functions.
- **Content Updates**: Updates made through the CMS are committed directly to the GitHub repository, triggering new deployments.

