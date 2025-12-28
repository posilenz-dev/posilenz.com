# Posilenz Website

Modern Next.js website for Posilenz - Intelligent Systems & AI Solutions

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS, GSAP, Keystatic CMS, Nodemailer

---

## 🚀 Quick Start

```bash
pnpm install
cp .env.local.template .env.local
# Edit .env.local with your SMTP credentials
pnpm dev
```

Visit `http://localhost:3000`

---

## ✨ Features

- **Landing Page** - GSAP animations, responsive design
- **Blog System** - Static generation with dynamic routing
- **Careers CMS** - Keystatic-powered job management
- **Contact Form** - SMTP email with HTML formatting
- **Job Applications** - PDF resume attachment support
- **Type-Safe** - Full TypeScript coverage

---

## 📧 Email Setup

### Environment Variables

Create `.env.local`:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
EMAIL_FROM=your-email@gmail.com
EMAIL_TO=info@posilenz.com
```

### Gmail (Recommended for Development)

1. Enable 2FA: [Google Account Security](https://myaccount.google.com/security)
2. Generate App Password: [App Passwords](https://myaccount.google.com/apppasswords)
3. Use 16-character password in `.env.local`

### SendGrid (Production)

```env
SMTP_HOST=smtp.sendgrid.net
SMTP_USER=apikey
SMTP_PASSWORD=<your-sendgrid-api-key>
```

Free tier: 100 emails/day. Sign up: [SendGrid](https://sendgrid.com)

### Test Configuration

```bash
pnpm test:email
```

---

## 🎯 Keystatic CMS

### Access Admin

```
http://localhost:3000/keystatic
```

### Managing Jobs

1. **Create:** `/keystatic` → Careers → Create Entry → Fill fields → Create
2. **Edit:** Click job → Edit → Update
3. **Hide:** Uncheck "Active" → Update

### Job Fields

- **Basic:** Title, intro, location, employment type, experience
- **Rich Text:** Who You Are, Role Overview, Why Join (supports formatting)
- **Lists:** Key Responsibilities, Skills & Experience, What You'll Bring
- **Meta:** Display order, active toggle, slug

### Auto-Sync Locations

Jobs automatically appear on:
- Homepage (`/#team`) - Job list with links
- Careers page (`/careers`) - Full listings
- Application form - Position dropdown

### Storage

```
/content/careers/[slug]/
  ├── index.yaml           # Metadata + lists
  ├── whoYouAre.mdoc       # Rich content
  ├── roleOverview.mdoc    # Rich content
  ├── whyJoin.mdoc         # Rich content
  └── content.mdoc         # Additional content
```

---

## 🛠️ Development

### Scripts

```bash
pnpm dev          # Dev server (localhost:3000)
pnpm build        # Production build
pnpm start        # Production server
pnpm lint         # ESLint
pnpm test:email   # Test SMTP
```

### Project Structure

```
posilenz.com/
├── app/
│   ├── actions.ts            # Server actions
│   ├── api/keystatic/        # CMS API
│   ├── blog/                 # Blog pages
│   ├── careers/              # Careers page
│   ├── keystatic/            # CMS admin
│   └── styles/               # CSS
├── components/
│   ├── blog/                 # Blog components
│   ├── careers/              # Career components
│   └── landing/              # Landing sections
├── content/careers/          # Job data (YAML/MDOC)
├── lib/
│   ├── blogData.ts           # Blog posts (hardcoded)
│   ├── keystatic.ts          # CMS reader
│   ├── mailer.ts             # Email config
│   └── utils.ts              # Utilities
└── public/images/            # Static assets
```

---

## 📝 Content Management

### Blog Posts

Edit `/lib/blogData.ts`:

```typescript
{
  id: "4",
  slug: "your-post-slug",
  number: "28",
  date: "Dec 2025",
  title: "Your Post Title",
  excerpt: "Brief description...",
  image: "/images/your-image.png",
  content: `<p class="article-paragraph">Your HTML content...</p>`
}
```

### Careers

Use Keystatic admin at `/keystatic` (recommended) or edit YAML in `/content/careers/`

---

## 🚢 Deployment

### Vercel

1. Push to GitHub
2. Import in Vercel
3. Add environment variables (SMTP_*)
4. Deploy

### Environment Variables

Required:
```env
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=
EMAIL_FROM=
EMAIL_TO=
```

---

## 🐛 Troubleshooting

### Email Issues

**Error sending email**
- Verify `.env.local` exists
- Run `pnpm test:email`
- Check SMTP credentials

**Gmail invalid credentials**
- Use App Password (not regular password)
- Enable 2FA first

**Resume not attaching**
- Must be PDF, max 10MB
- Form field: `name="resume"`

### Keystatic Issues

**Blank admin panel**
- Hard refresh: `Cmd+Shift+R`
- Check browser console
- Verify `/content/careers/` exists

**Jobs not showing**
- Check "Active" status
- Verify YAML files exist
- Clear cache: `rm -rf .next && pnpm dev`

### Build Issues

**TypeScript errors**
```bash
pnpm build  # Check error messages
```

**Cache issues**
```bash
rm -rf .next node_modules && pnpm install && pnpm build
```

---

## 📦 Key Dependencies

- `next` - React framework
- `react` / `react-dom` - UI library
- `typescript` - Type safety
- `@keystatic/core` / `@keystatic/next` - CMS
- `nodemailer` - Email
- `gsap` / `@gsap/react` - Animations
- `tailwindcss` - Styling
- `lucide-react` - Icons

---

## 🔒 Security

- `.env.local` in `.gitignore`
- Server actions (no exposed APIs)
- PDF validation (10MB max)
- SMTP authentication required

### Production Checklist

- [ ] Use production SMTP (SendGrid/AWS SES)
- [ ] Configure SPF/DKIM records
- [ ] Set up error monitoring
- [ ] Enable rate limiting on forms
- [ ] Review CSP headers

---

**Built with Next.js and modern web technologies**
