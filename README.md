# Posilenz Website

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
