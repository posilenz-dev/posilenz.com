This is a [Next.js](https://nextjs.org) project for Posilenz, featuring intelligent systems and AI solutions.

## Features

- 🏠 Modern landing page with GSAP animations
- 📝 Blog system with dynamic routing
- 💼 Careers page with job application form
- 📧 Contact form with SMTP email functionality
- 📎 File attachment support for job applications

## Getting Started

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Configure Email (Required for Contact & Application Forms)

Create a `.env.local` file in the root directory:

```env
SMTP_HOST=smtp.your-provider.com
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASSWORD=your-password
EMAIL_FROM=noreply@posilenz.com
EMAIL_TO=info@posilenz.com
```

For detailed SMTP setup instructions for various providers (Gmail, SendGrid, AWS SES, etc.), see [SMTP_SETUP.md](./SMTP_SETUP.md).

### 3. Test Email Configuration (Optional)

```bash
pnpm test:email
```

This will send a test email to verify your SMTP configuration is working correctly.

### 4. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
