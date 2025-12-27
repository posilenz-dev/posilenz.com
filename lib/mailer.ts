import nodemailer from 'nodemailer';
import type Mail from 'nodemailer/lib/mailer';

export const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});

export async function sendEmail(options: Mail.Options) {
    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL_FROM || options.from,
            ...options,
        });
        console.log('Email sent:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}

