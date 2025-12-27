/**
 * Test script to verify SMTP configuration
 *
 * Run with: npx tsx scripts/test-email.ts
 *
 * Make sure to install tsx first: pnpm add -D tsx
 */

import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function testEmail() {
    console.log('🔍 Testing SMTP Configuration...\n');

    // Check environment variables
    const requiredVars = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASSWORD', 'EMAIL_FROM', 'EMAIL_TO'];
    const missingVars = requiredVars.filter(varName => !process.env[varName]);

    if (missingVars.length > 0) {
        console.error('❌ Missing environment variables:');
        missingVars.forEach(varName => console.error(`   - ${varName}`));
        console.error('\nPlease create a .env.local file with all required variables.');
        console.error('See SMTP_SETUP.md for more information.\n');
        process.exit(1);
    }

    console.log('✅ All environment variables found');
    console.log(`📧 SMTP Host: ${process.env.SMTP_HOST}`);
    console.log(`📧 SMTP Port: ${process.env.SMTP_PORT}`);
    console.log(`📧 SMTP User: ${process.env.SMTP_USER}`);
    console.log(`📧 From: ${process.env.EMAIL_FROM}`);
    console.log(`📧 To: ${process.env.EMAIL_TO}\n`);

    try {
        // Import the mailer
        const { sendEmail } = await import('../lib/mailer');

        console.log('📨 Sending test email...\n');

        await sendEmail({
            to: process.env.EMAIL_TO!,
            subject: 'Test Email from Posilenz - SMTP Configuration',
            html: `
                <!DOCTYPE html>
                <html>
                    <head>
                        <style>
                            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                            .header { background-color: #1a1a1a; color: white; padding: 20px; text-align: center; }
                            .content { background-color: #f9f9f9; padding: 20px; margin: 20px 0; border-radius: 5px; }
                            .success { color: #4CAF50; font-weight: bold; }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <div class="header">
                                <h2>🎉 SMTP Configuration Test</h2>
                            </div>
                            <div class="content">
                                <p class="success">✅ Congratulations!</p>
                                <p>Your SMTP email configuration is working correctly.</p>
                                <p><strong>Configuration Details:</strong></p>
                                <ul>
                                    <li>SMTP Host: ${process.env.SMTP_HOST}</li>
                                    <li>SMTP Port: ${process.env.SMTP_PORT}</li>
                                    <li>From Address: ${process.env.EMAIL_FROM}</li>
                                </ul>
                                <p>Your contact form and job application emails should now work properly.</p>
                                <hr>
                                <p style="font-size: 12px; color: #666;">
                                    This is a test email sent at ${new Date().toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </body>
                </html>
            `,
        });

        console.log('✅ Test email sent successfully!');
        console.log('📬 Check your inbox at:', process.env.EMAIL_TO);
        console.log('\n✨ Your SMTP configuration is working correctly!\n');
    } catch (error) {
        console.error('❌ Failed to send test email:');
        console.error(error);
        console.error('\n💡 Common issues:');
        console.error('   - Incorrect SMTP credentials');
        console.error('   - Firewall blocking port 587/465');
        console.error('   - Need to enable "Less secure apps" for Gmail');
        console.error('   - Wrong SMTP host or port\n');
        process.exit(1);
    }
}

testEmail();

