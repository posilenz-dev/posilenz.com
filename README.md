# Posilenz - Intelligent Systems & AI Solutions

Welcome to the corporate website and landing platform for **Posilenz**. This project serves as the digital front door for the organization, showcasing services, insights, team details, and career openings.

## Quick Links for AI Agents
If you are an AI assistant working on this repository, please review the following files before making changes:
- [MEMORY.md](MEMORY.md): Crucial context about the architecture, tech stack, and design guidelines.
- [AGENTS.md](AGENTS.md): Operational rules and instructions for AI agents.

## Tech Stack Overview

- **Framework**: Next.js 16 (App Router) + React 19
- **Typing**: TypeScript
- **Styling**: Tailwind CSS v4 (with PostCSS)
- **UI Components**: shadcn/ui (Radix + Lucide icons)
- **Animations**: GSAP (`@gsap/react`)
- **Carousels**: Swiper
- **CMS**: Keystatic (`@keystatic/next`)
- **Emails**: Nodemailer
- **Package Manager**: pnpm

## Prerequisites

- Node.js >= 24.x
- pnpm >= 10.x

## Getting Started

1. **Install Dependencies**
   ```bash
   pnpm install
   ```

2. **Environment Configuration**
   Copy the example environment file and configure it:
   ```bash
   cp .env.example .env.local
   ```
   **Required Variables**:
   *   `SMTP_*`: Email configuration for contact forms.
   *   `KEYSTATIC_*`: For production (or if testing GitHub mode locally), supply the Keystatic GitHub App credentials. Defaults to local file system storage in development.

3. **Run Development Server**
   ```bash
   pnpm dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the website.

## Project Structure

```text
posilenz.com/
├── app/                  # Next.js App Router (pages: /, /blog, /careers)
│   ├── api/keystatic/    # Keystatic CMS API routes
│   └── keystatic/        # Keystatic CMS Admin Interface
├── components/           # Reusable UI components segmented logically
│   ├── landing/          # Homepage sections (Hero, About, Services, etc.)
│   ├── blog/             # Blog components
│   ├── careers/          # Careers components
│   └── ui/               # shadcn/ui components
├── content/              # File-based content managed by Keystatic (Careers)
├── lib/                  # Utilities (NodeMailer, Keystatic config, constants)
└── public/               # Static assets & images
```

## CMS / Content Management

The project uses [Keystatic](https://keystatic.com) for managing career listings and structured data.
- **Local Dev**: Content is read/written to `content/careers` locally.
- **Production**: Content interacts with the configured GitHub repository.
- **Access Admin UI**: Navigate to `/keystatic` when the app is running.

## Deployment

1. Ensure all `NEXT_PUBLIC_KEYSTATIC_*` and `KEYSTATIC_*` environment variables are configured in your deployment platform (e.g., Vercel).
2. The default build command is `pnpm build`.
3. Push to the `main` branch to trigger your CI/CD pipeline.
