# Posilenz Website

> Modern Next.js website for Posilenz - Intelligent Systems & AI Solutions

Built with Next.js 16, React 19, TypeScript, Tailwind CSS, GSAP animations, Keystatic CMS, and Nodemailer.

---

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Configure email (see Email Setup below)
cp .env.local.template .env.local
# Edit .env.local with your SMTP credentials

# Run development server
pnpm dev
```

Visit `http://localhost:3000`

---

## ✨ Features

- 🎨 **Modern Landing Page** - GSAP-powered animations, responsive design
- 📝 **Blog System** - Dynamic routing with static generation
- 💼 **Careers System** - Managed via Keystatic CMS, syncs across pages
- 📧 **Contact Form** - SMTP email with HTML formatting
- 📎 **Job Applications** - PDF resume attachment support
- 🔐 **Type-Safe** - Full TypeScript coverage
- ⚡ **Performance** - Optimized builds, image optimization

---

## 📧 Email Configuration

### Quick Setup

1. **Create `.env.local`:**
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
EMAIL_FROM=your-email@gmail.com
EMAIL_TO=info@posilenz.com
```

2. **Test Email:**
```bash
pnpm test:email
```

### Supported Providers

| Provider | Port | Best For | Free Tier |
|----------|------|----------|-----------|
| Gmail | 587 | Testing | 500/day |
| SendGrid | 587 | Production | 100/day |
| AWS SES | 587 | Scale | $0.10/1000 |
| Mailgun | 587 | Enterprise | 5,000/month |

### Gmail Setup (Fastest)

1. Enable 2FA: [Google Account Security](https://myaccount.google.com/security)
2. Generate App Password: [App Passwords](https://myaccount.google.com/apppasswords)
3. Use the 16-character password in `.env.local`

### SendGrid Setup (Production)

1. Sign up: [SendGrid](https://sendgrid.com)
2. Create API key
3. Configuration:
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_USER=apikey
SMTP_PASSWORD=<your-api-key>
```

### Email Features

**Contact Form** (`/`)
- Sends to `EMAIL_TO` with reply-to set to sender
- HTML formatted with contact details

**Job Application** (`/careers`)
- Comprehensive application data
- PDF resume attachment (up to 10MB)
- Professional multi-section HTML format

---

## 🎯 Keystatic CMS

### Access Admin Panel

```
http://localhost:3000/keystatic
```

### Managing Careers

**Create Job:**
1. Go to `/keystatic` → Careers → Create Entry
2. Fill in all fields (title, intro, location, etc.)
3. Add responsibilities, skills, and qualification sections
4. Set display order and active status
5. Click Create

**Edit Job:**
- Click on job → Edit → Update

**Hide Job:**
- Uncheck "Active" → Update (preserves data)

### Job Schema

Each job posting includes:

- **Basic Info**: Title, intro, location, employment type, experience
- **Rich Content**: Who You Are, Role Overview, Why Join (with formatting)
- **Lists**: Key Responsibilities, Skills & Experience, What You'll Bring
- **Metadata**: Display order, active/inactive toggle, slug

### Content Storage

Jobs stored in `/content/careers/[slug]/`:
```
/content/careers/senior-developer/
  ├── index.yaml           # Metadata + lists
  ├── whoYouAre.mdoc       # Rich text
  ├── roleOverview.mdoc    # Rich text
  ├── whyJoin.mdoc         # Rich text
  └── content.mdoc         # Additional content
```

### Auto-Sync

Jobs automatically appear on:
- **Homepage** (`/#team-section`) - Job titles with links
- **Careers Page** (`/careers`) - Full expandable listings
- **Application Form** - Position dropdown

---

## 🛠️ Development

### Scripts

```bash
pnpm dev          # Start dev server (localhost:3000)
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm test:email   # Test SMTP configuration
```

### Project Structure

```
posilenz.com/
├── app/
│   ├── actions.ts                 # Server actions (forms)
│   ├── api/keystatic/            # Keystatic API routes
│   ├── blog/                     # Blog pages
│   ├── careers/                  # Careers page
│   ├── keystatic/                # CMS admin UI
│   └── styles/                   # Page-specific CSS
├── components/
│   ├── blog/                     # Blog components
│   ├── careers/                  # Career components
│   └── landing/                  # Landing page sections
├── content/
│   └── careers/                  # Keystatic career data
├── lib/
│   ├── blogData.ts               # Blog posts data
│   ├── keystatic.ts              # Keystatic reader
│   ├── mailer.ts                 # Email configuration
│   └── utils.ts                  # Utilities
├── public/images/                # Static assets
├── keystatic.config.ts           # CMS configuration
└── .env.local                    # Environment variables
```

### Tech Stack

**Framework:** Next.js 16.1 (App Router, Turbopack)
**UI:** React 19, TypeScript, Tailwind CSS
**Animations:** GSAP 3.14
**CMS:** Keystatic (file-based)
**Email:** Nodemailer
**Icons:** Lucide React

---

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables:
   - `SMTP_HOST`
   - `SMTP_PORT`
   - `SMTP_USER`
   - `SMTP_PASSWORD`
   - `EMAIL_FROM`
   - `EMAIL_TO`
4. Deploy

### Netlify

1. Connect repository
2. Build command: `pnpm build`
3. Publish directory: `.next`
4. Add environment variables in Site Settings
5. Deploy

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile
COPY . .
RUN pnpm build
EXPOSE 3000
CMD ["pnpm", "start"]
```

### Environment Variables (Production)

Required:
```env
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=
EMAIL_FROM=
EMAIL_TO=
```

Optional:
```env
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

---

## 🐛 Troubleshooting

### Email Issues

**"Error sending email"**
- ✅ Verify `.env.local` exists and has correct values
- ✅ Test with: `pnpm test:email`
- ✅ Check SMTP credentials
- ✅ Ensure port 587 is not blocked

**Gmail "Invalid credentials"**
- Must use App Password (not regular password)
- Enable 2FA first
- Generate new app password

**Resume not attaching**
- File must be PDF format
- Max size: 10MB
- Form field name must be "resume"

**Emails go to spam**
- Use authenticated SMTP provider
- Add SPF/DKIM records for domain
- Ask recipients to whitelist

### Keystatic Issues

**Admin panel blank**
- Hard refresh: `Cmd+Shift+R` or `Ctrl+Shift+R`
- Check browser console for errors
- Verify `/content/careers/` folder exists

**Jobs not appearing**
- Check job "Active" status in Keystatic
- Verify YAML files in `/content/careers/[slug]/`
- Clear Next.js cache: `rm -rf .next && pnpm dev`

**Cannot edit job**
- Ensure slug field is set
- Check file permissions on `/content/` folder

### Build Issues

**TypeScript errors**
```bash
pnpm build
```
Check error messages and fix type issues

**Cache issues**
```bash
rm -rf .next node_modules
pnpm install
pnpm build
```

---

## 📝 Content Management

### Adding a Blog Post

Edit `/lib/blogData.ts` and add:

```typescript
{
  slug: "your-post-slug",
  title: "Your Post Title",
  excerpt: "Brief description...",
  content: "Full content...",
  author: "Author Name",
  date: "Dec 15, 2024",
  readTime: "5 min read",
  category: "Technology"
}
```

### Managing Careers

Use Keystatic admin at `/keystatic` (recommended) or edit YAML files directly in `/content/careers/`.

### Updating Contact Email

Change `EMAIL_TO` in `.env.local` to receive form submissions at different address.

---

## 🔒 Security

- ✅ `.env.local` in `.gitignore` (never commit credentials)
- ✅ Server actions for form handling (no API exposure)
- ✅ File upload validation (PDF only, 10MB max)
- ✅ SMTP authentication required
- ✅ Type-safe with TypeScript

### Production Checklist

- [ ] Set strong SMTP password
- [ ] Use production-grade SMTP provider (SendGrid/AWS SES)
- [ ] Configure SPF/DKIM records
- [ ] Set up error monitoring
- [ ] Enable rate limiting on forms
- [ ] Review and update CSP headers

---

## 📦 Dependencies

### Core
- `next` - React framework
- `react`, `react-dom` - UI library
- `typescript` - Type safety

### Features
- `@keystatic/core`, `@keystatic/next` - CMS
- `nodemailer` - Email functionality
- `gsap`, `@gsap/react` - Animations
- `lucide-react` - Icons

### Styling
- `tailwindcss` - Utility-first CSS
- `clsx`, `tailwind-merge` - Class management
- `tw-animate-css` - Animation utilities

---

## 📄 License

Private project for Posilenz.

---

## 🤝 Support

For issues or questions:
1. Check troubleshooting section above
2. Review error messages in browser console
3. Test SMTP with `pnpm test:email`
4. Check Keystatic admin for content issues

---

**Built with ❤️ using Next.js and modern web technologies**
