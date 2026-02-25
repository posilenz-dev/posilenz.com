import { Resend } from 'resend';

// Initialize the Resend client with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailOptions {
    to: string | string[];
    subject: string;
    html: string;
    replyTo?: string;
    from?: string;
    attachments?: {
        filename: string;
        content: Buffer | string;
        contentType?: string;
    }[];
}

export async function sendEmail(options: SendEmailOptions) {
    try {
        // If EMAIL_FROM is not set, Resend will require a verified domain.
        // During testing, you can use 'onboarding@resend.dev' if testing to your personal email,
        // but for production, this should be an email address at your verified domain (e.g., info@posilenz.com)
        const fromEmail = options.from || process.env.EMAIL_FROM || 'onboarding@resend.dev';

        // Parse the 'to' field: if it's a comma-separated string (e.g., from env vars), split it into an array
        let toEmails: string[];
        if (Array.isArray(options.to)) {
            toEmails = options.to;
        } else {
            // Split by comma, trim whitespace, and filter out any empty strings
            toEmails = options.to.split(',').map(e => e.trim()).filter(Boolean);
        }

        // DEVELOPMENT ONLY: If you are using an unverified domain to test with Resend
        // Restrict sending only to your registered account to avoid validation errors.
        if (fromEmail === 'onboarding@resend.dev') {
            // For testing Resend, it must ONLY be your registered email address.
            // You can hardcode your address here for testing, or rely on .env values.
            // But it MUST be only your address.
            const registeredEmailAddress = 'posilenzdev@gmail.com';
            toEmails = toEmails.filter(email => email === registeredEmailAddress);
            if (toEmails.length === 0) {
                toEmails = [registeredEmailAddress]; // default to testing address if the 'to' array completely failed the filter
            }
        }

        const { data, error } = await resend.emails.send({
            from: fromEmail,
            to: toEmails,
            subject: options.subject,
            html: options.html,
            replyTo: options.replyTo,
            attachments: options.attachments,
        });

        if (error) {
            console.error('Resend API Error:', error);
            throw new Error(error.message);
        }

        console.log('Email sent successfully via Resend, ID:', data?.id);
        return { success: true, messageId: data?.id };
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}

