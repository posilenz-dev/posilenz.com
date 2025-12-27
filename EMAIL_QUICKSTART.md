# 📧 Email Setup - Quick Start Guide

## What Was Implemented

✅ **Contact Form Email** (`/components/landing/Contact.tsx`)
- Sends formatted HTML emails with contact details
- Includes name, email, phone, and message
- Reply-to set to sender's email

✅ **Job Application Form Email** (`/components/careers/ApplicationForm.tsx`)
- Sends comprehensive application details
- **Includes PDF resume as attachment**
- All form fields organized in sections
- Professional HTML formatting

✅ **Newsletter Subscription Email**
- Simple subscription notification

## Quick Setup (5 minutes)

### Step 1: Copy Environment Template

```bash
cp .env.local.template .env.local
```

### Step 2: Choose Your Email Provider

#### Option A: Gmail (Easiest for Testing)

1. Enable 2-Factor Authentication in Google Account
2. Go to https://myaccount.google.com/apppasswords
3. Create an app password for "Mail"
4. Update `.env.local`:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-16-char-app-password
EMAIL_FROM=your-email@gmail.com
EMAIL_TO=info@posilenz.com
```

#### Option B: SendGrid (Best for Production)

1. Sign up at https://sendgrid.com (free tier: 100 emails/day)
2. Create API key
3. Update `.env.local`:

```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASSWORD=your-sendgrid-api-key
EMAIL_FROM=noreply@posilenz.com
EMAIL_TO=info@posilenz.com
```

### Step 3: Test Your Configuration

```bash
pnpm test:email
```

If successful, you'll see: ✅ Test email sent successfully!

### Step 4: Test the Forms

1. Start dev server: `pnpm dev`
2. Test contact form: http://localhost:3000/#contact
3. Test application form: http://localhost:3000/careers

## File Structure

```
/lib/mailer.ts              - Email transporter configuration
/app/actions.ts             - Form submission handlers
/scripts/test-email.ts      - Email testing script
/.env.local                 - Your SMTP credentials (not in git)
/.env.local.template        - Template to copy from
```

## What Each Form Does

### Contact Form
```
User fills form → Server action → Email sent to EMAIL_TO
```

The email includes:
- Contact person's name, email, phone
- Their message
- Professional HTML formatting
- Reply-to set to contact's email

### Application Form
```
User fills form + uploads resume → Server action → Email sent with attachment
```

The email includes:
- Personal information section
- Role details (position, availability, salary)
- Experience & skills section
- Portfolio/GitHub link
- **PDF resume attached to email**
- Professional HTML formatting with sections

## Troubleshooting

### "Error sending email"
- ❌ Check `.env.local` exists and has correct values
- ❌ Verify SMTP credentials are valid
- ❌ Check if port 587 is blocked by firewall
- ✅ Run `pnpm test:email` to diagnose

### Gmail: "Invalid credentials"
- Must use App Password, not regular password
- Enable 2FA first
- Generate app password from Google Account settings

### "Resume not attached"
- Check file is PDF format
- Verify file size is under 10MB
- Ensure form field name is "resume"

### Email goes to spam
- Add SPF/DKIM records for your domain
- Use reputable SMTP provider (SendGrid, AWS SES)
- Ask recipient to whitelist your email

## Production Deployment

### Vercel
1. Go to Project Settings → Environment Variables
2. Add all SMTP_ and EMAIL_ variables
3. Redeploy

### Netlify
1. Site Settings → Build & Deploy → Environment
2. Add all SMTP_ and EMAIL_ variables
3. Redeploy

### Docker/VPS
Add variables to your environment configuration or Docker Compose file.

## Email Provider Limits

| Provider | Free Tier | Best For |
|----------|-----------|----------|
| Gmail | 500/day | Testing |
| SendGrid | 100/day | Small sites |
| Mailgun | 5,000/month | Growing sites |
| AWS SES | $0.10/1000 | Large scale |
| Resend | 3,000/month | Modern API |

## Support

For detailed configuration for each provider, see [SMTP_SETUP.md](./SMTP_SETUP.md)

---

**Ready to test?** Run `pnpm test:email` now! 🚀

