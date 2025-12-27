# SMTP Email Configuration Guide

This guide explains how to set up SMTP email functionality for the Posilenz website.

## Setup Instructions

### 1. Create Environment Variables File

Create a `.env.local` file in the root directory of your project with the following variables:

```env
# SMTP Configuration
SMTP_HOST=smtp.your-provider.com
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASSWORD=your-password

# Email addresses
EMAIL_FROM=noreply@posilenz.com
EMAIL_TO=info@posilenz.com
```

### 2. Configure for Different Email Providers

#### Gmail Configuration

1. Enable 2-Factor Authentication in your Google Account
2. Generate an App Password: https://myaccount.google.com/apppasswords
3. Use these settings:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
EMAIL_FROM=your-email@gmail.com
EMAIL_TO=info@posilenz.com
```

#### SendGrid Configuration

1. Sign up at https://sendgrid.com
2. Create an API key
3. Use these settings:

```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASSWORD=your-sendgrid-api-key
EMAIL_FROM=noreply@posilenz.com
EMAIL_TO=info@posilenz.com
```

#### Mailgun Configuration

1. Sign up at https://mailgun.com
2. Get your SMTP credentials from the dashboard
3. Use these settings:

```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=postmaster@your-domain.mailgun.org
SMTP_PASSWORD=your-mailgun-password
EMAIL_FROM=noreply@posilenz.com
EMAIL_TO=info@posilenz.com
```

#### AWS SES Configuration

1. Set up AWS SES in your AWS account
2. Verify your domain or email addresses
3. Create SMTP credentials
4. Use these settings:

```env
SMTP_HOST=email-smtp.us-east-1.amazonaws.com
SMTP_PORT=587
SMTP_USER=your-aws-smtp-username
SMTP_PASSWORD=your-aws-smtp-password
EMAIL_FROM=noreply@posilenz.com
EMAIL_TO=info@posilenz.com
```

#### Other Providers (Office 365, Outlook, Yahoo, etc.)

**Office 365:**
```env
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
```

**Outlook.com:**
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
```

**Yahoo Mail:**
```env
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
```

## Features Implemented

### 1. Contact Form Email (`/components/landing/Contact.tsx`)

Sends an email with:
- Name
- Email
- Phone
- Message

The email is formatted with HTML styling and includes the sender's email as reply-to.

### 2. Job Application Form Email (`/components/careers/ApplicationForm.tsx`)

Sends an email with:
- Personal Information (name, email, phone, location)
- Role Details (position, notice period, salary expectations)
- Experience & Skills (years of experience, portfolio link, key skills)
- Qualification statement
- **Resume/CV attachment (PDF)**

The resume file is attached to the email as a PDF attachment.

## File Structure

```
/lib/mailer.ts         - Email configuration and transporter setup
/app/actions.ts        - Server actions for form submissions
/.env.local            - Environment variables (create this file)
```

## Testing

1. Set up your SMTP credentials in `.env.local`
2. Run the development server: `pnpm dev`
3. Test the contact form at: http://localhost:3000/#contact
4. Test the application form at: http://localhost:3000/careers
5. Check your email inbox for the test emails

## Troubleshooting

### Email not sending

1. **Check environment variables**: Ensure `.env.local` exists and has correct values
2. **Verify SMTP credentials**: Test your SMTP credentials using an email client
3. **Check spam folder**: Emails might be filtered as spam
4. **Firewall issues**: Ensure port 587 is not blocked
5. **Check console logs**: Look for error messages in the terminal

### Gmail-specific issues

- Make sure 2FA is enabled
- Use an App Password, not your regular password
- Enable "Less secure app access" if not using App Password (not recommended)

### Attachment issues

- Ensure the file is a valid PDF
- Check file size (max 5-10MB as configured in the form)
- Verify the form field name is "resume"

## Security Notes

- ⚠️ **Never commit `.env.local` to version control**
- Add `.env.local` to your `.gitignore` file
- Use strong passwords for SMTP credentials
- Consider using environment-specific API keys for production
- For production, use environment variables from your hosting platform (Vercel, Netlify, etc.)

## Production Deployment

### Vercel / Netlify

1. Go to your project settings
2. Navigate to Environment Variables
3. Add all the SMTP variables:
   - `SMTP_HOST`
   - `SMTP_PORT`
   - `SMTP_USER`
   - `SMTP_PASSWORD`
   - `EMAIL_FROM`
   - `EMAIL_TO`
4. Redeploy your application

### Docker / VPS

Add the environment variables to your Docker Compose file or system environment.

## Email Service Recommendations

For production use, we recommend:

1. **SendGrid** - Free tier: 100 emails/day
2. **Mailgun** - Free tier: 5,000 emails/month
3. **AWS SES** - Very affordable, $0.10 per 1,000 emails
4. **Resend** - Modern API, 3,000 emails/month free

Avoid using Gmail for production as it has strict sending limits.

