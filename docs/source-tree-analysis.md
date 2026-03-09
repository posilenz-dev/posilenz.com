# Source Tree Analysis

## Project Structure

This project follows the Next.js App Router architecture.

```
posilenz.com/
├── app/                # App Router root
│   ├── api/            # API Route handlers
│   │   ├── auth/       # Authentication endpoints (GitHub OAuth)
│   │   └── keystatic/  # Keystatic CMS API handlers
│   ├── blog/           # Blog page and detail ([slug])
│   ├── careers/        # Careers listing page
│   ├── keystatic/      # Keystatic admin interface
│   ├── styles/         # Page-specific CSS files
│   ├── layout.tsx      # Root layout (fonts, metadata)
│   ├── page.tsx        # Landing page (Home)
│   ├── actions.ts      # Server actions for forms and mutations
│   └── globals.css     # Global styles and Tailwind directives
├── components/         # Reusable UI components
│   ├── blog/           # Blog-specific components
│   ├── careers/        # Careers-specific components
│   ├── landing/        # Landing page sections (Hero, About, etc.)
│   └── ui/             # Core UI primitives (Shadcn-like)
├── content/            # CMS content storage (Markdown/YAML)
│   └── careers/        # Job opening details
├── lib/                # Shared utilities and data logic
│   ├── blogData.ts     # Blog post static data and interfaces
│   ├── keystatic.ts    # Keystatic reader and client helpers
│   ├── mailer.ts       # Nodemailer/Resend email configuration
│   └── utils.ts        # Tailwind merge and common helpers
├── public/             # Static assets (images, icons)
│   └── images/         # SVG and PNG assets for the site
├── _bmad/              # AI-assisted development (BMM/TEA/CIS)
├── _bmad-output/       # Generated implementation/planning artifacts
├── docs/               # Project documentation (Project Knowledge)
├── keystatic.config.ts # Keystatic CMS schema and storage configuration
├── next.config.ts      # Next.js configuration
├── package.json        # Dependencies and scripts
├── pnpm-workspace.yaml # pnpm workspace definition (Monolith)
├── postcss.config.mjs  # PostCSS configuration
├── tsconfig.json       # TypeScript configuration
└── README.md           # Project overview
```

## Critical Folders

- **app/**: Contains the core application logic and routing.
- **components/**: Houses the component library organized by feature area.
- **content/**: Storage for CMS-driven content, allowing for easy updates.
- **lib/**: Centralized logic for data fetching, mailing, and utility functions.
- **public/images/**: Critical visual assets used across the landing and blog pages.

## Entry Points

- **app/page.tsx**: Main entry for the landing page.
- **app/layout.tsx**: Global layout and metadata configuration.
- **app/api/**: Entry points for server-side logic and CMS integration.
- **keystatic.config.ts**: Entry point for CMS schema definitions.

