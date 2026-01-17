# Posilenz Website!

Corporate website for Posilenz - Intelligent Systems & AI Solutions

## Tech Stack

- Next.js 16 + React 19
- TypeScript
- Tailwind CSS
- GSAP (animations)
- Keystatic CMS
- Nodemailer

## Quick Start

```bash
pnpm install
cp .env.local.template .env.local  # Configure SMTP
pnpm dev
```

Open http://localhost:3000

## Project Structure

```
posilenz.com/
├── app/
│   ├── page.tsx              # Homepage
│   ├── blog/                 # Blog pages
│   ├── careers/              # Careers page
│   ├── actions.ts            # Server actions (forms)
│   ├── api/keystatic/        # CMS API routes
│   ├── keystatic/            # CMS admin UI
│   └── styles/               # CSS files
│       ├── landing.css
│       ├── blog.css
│       ├── blog-detail.css
│       └── careers.css
├── components/
│   ├── landing/              # Homepage sections
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── ServicesIntro.tsx
│   │   ├── ServicesDetails.tsx
│   │   ├── WhyPosilenz.tsx
│   │   ├── About.tsx
│   │   ├── Insights.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   ├── blog/                 # Blog components
│   └── careers/              # Career components
├── content/
│   └── careers/              # Job listings (Keystatic)
├── lib/
│   ├── blogData.ts           # Blog content
│   ├── keystatic.ts          # CMS config
│   └── mailer.ts             # Email setup
└── public/
    └── images/               # Static assets
```

## Environment Variables

Create `.env.local`:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
EMAIL_FROM=your-email@gmail.com
EMAIL_TO=recipient1@example.com,recipient2@example.com
```

### Keystatic GitHub Storage

This project now expects Keystatic to use GitHub storage. Set these in `.env.local`
for local dev and in your deployment environment for production.

```env
KEYSTATIC_GITHUB_REPO=owner/repo
KEYSTATIC_GITHUB_CLIENT_ID=...
KEYSTATIC_GITHUB_CLIENT_SECRET=...
KEYSTATIC_SECRET=...
NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG=...
```

These values come from the GitHub App you create for Keystatic. Follow the Keystatic
GitHub mode docs to create/install the app and copy the credentials.

## Scripts

```bash
pnpm dev        # Development server
pnpm build      # Production build
pnpm start      # Start production
pnpm lint       # Run linter
```

## CMS Admin

Access Keystatic at `/keystatic` to manage job listings.

## Deployment

1. Push to GitHub
2. Import in Vercel
3. Add environment variables
4. Deploy
