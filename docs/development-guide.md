# Development Guide

## Prerequisites

- **Node.js**: 24.x (configured in `engines`)
- **Package Manager**: pnpm 10.8.0+

## Local Development Setup

1. **Install Dependencies**:
   ```bash
   pnpm install
   ```

2. **Environment Variables**:
   Copy `.env.example` to `.env.local` and fill in the required values:
   - **SMTP_HOST**: e.g., `smtp.gmail.com`
   - **SMTP_PORT**: e.g., `587`
   - **SMTP_USER**: Your Gmail email address.
   - **SMTP_PASSWORD**: Your App Password.
   - **EMAIL_FROM**: Sender email address.
   - **EMAIL_TO**: Recipient email address.
   - **NEXTAUTH_SECRET**: A secure random string.
   - **KEYSTATIC_GITHUB_REPO**: Your GitHub repo (e.g., `owner/repo`).
   - **KEYSTATIC_GITHUB_CLIENT_ID**: GitHub App client ID.
   - **KEYSTATIC_GITHUB_CLIENT_SECRET**: GitHub App client secret.
   - **KEYSTATIC_GITHUB_APP_ID**: GitHub App ID for server-side content reads.
   - **KEYSTATIC_GITHUB_PRIVATE_KEY**: GitHub App private key for server-side content reads.
   - **KEYSTATIC_SECRET**: Secret for Keystatic.
   - **KEYSTATIC_GITHUB_TOKEN**: Optional fallback PAT for private repository access if GitHub App reader auth is not configured.

3. **Run Development Server**:
   ```bash
   pnpm dev
   ```
   Access the site at `http://localhost:3000`.

4. **CMS Administration**:
   Access the Keystatic admin interface at `http://localhost:3000/keystatic`.

## Common Commands

- **Build for Production**: `pnpm build` (generates the optimized Next.js build).
- **Start Production Server**: `pnpm start` (runs the built application).
- **Lint Code**: `pnpm lint` (checks for linting errors using ESLint).
- **Test Email Service**: `pnpm test:email` (executes the `scripts/test-email.ts` to verify the mailing configuration).
- **Type Checking**: `pnpm exec tsc --noEmit` (runs TypeScript compiler check).

## Deployment

- **Platform**: Vercel (recommended for Next.js)
- **CI/CD**: GitHub Actions workflow at `.github/workflows/deploy-vercel.yml.1`
- **CMS Storage**: Configured for GitHub mode in production, allowing content updates to be committed directly to the repository.

## Troubleshooting

- **Keystatic Auth**: Ensure `NEXT_PUBLIC_KEYSTATIC_MODE` is set correctly for your environment (local or github). In GitHub mode, prefer valid GitHub App server credentials (`KEYSTATIC_GITHUB_APP_ID` and `KEYSTATIC_GITHUB_PRIVATE_KEY`) over a long-lived PAT.
- **Email Dispatch**: Check the `SMTP_PORT` and `SMTP_HOST` if emails are not sending correctly. Use the `test:email` script for debugging.
- **Vercel Builds**: Verify all environment variables from `.env.example` are added to the Vercel dashboard.
