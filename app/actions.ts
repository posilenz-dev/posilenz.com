"use server";

import { sendEmail } from "@/lib/mailer";

export async function submitContactForm(formData: FormData) {
    const data = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        message: formData.get("message") as string,
    };

    console.log("Contact Form Submitted:", data);

    // Prepare email HTML
    const emailHtml = `
        <!DOCTYPE html>
        <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .logo { text-align: center; padding: 30px 20px; background-color: #ffffff; }
                    .logo img { max-width: 180px; height: auto; }
                    .header { background-color: #1D54DD; color: white; padding: 40px 20px; text-align: center; }
                    .header h2 { margin: 0; font-size: 24px; }
                    .content { background-color: #f9f9f9; padding: 30px 20px; }
                    .field { margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #e0e0e0; }
                    .field:last-child { border-bottom: none; }
                    .label { font-weight: bold; color: #1D54DD; font-size: 14px; }
                    .value { margin-top: 5px; color: #333; }
                    .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
                    .footer a { color: #1D54DD; text-decoration: none; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="logo">
                        <img src="https://posilenz.com/images/image.png" alt="Posilenz" />
                    </div>
                    <div class="header">
                        <h2>New Contact Form Submission</h2>
                    </div>
                    <div class="content">
                        <div class="field">
                            <div class="label">Name:</div>
                            <div class="value">${data.name}</div>
                        </div>
                        <div class="field">
                            <div class="label">Email:</div>
                            <div class="value">${data.email}</div>
                        </div>
                        <div class="field">
                            <div class="label">Phone:</div>
                            <div class="value">${data.phone}</div>
                        </div>
                        <div class="field">
                            <div class="label">Message:</div>
                            <div class="value">${data.message}</div>
                        </div>
                    </div>
                    <div class="footer">
                        <p>&copy; ${new Date().getFullYear()} Posilenz. All rights reserved.</p>
                        <p><a href="https://posilenz.com">posilenz.com</a></p>
                    </div>
                </div>
            </body>
        </html>
    `;

    try {
        await sendEmail({
            to: process.env.EMAIL_TO || 'info@posilenz.com',
            subject: `New Contact Form Submission from ${data.name}`,
            html: emailHtml,
            replyTo: data.email,
        });

        return { success: true, message: "Message sent successfully!" };
    } catch (error) {
        console.error("Error sending contact email:", error);
        throw new Error("Failed to send message. Please try again later.");
    }
}

export async function submitApplication(formData: FormData) {
    const data = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        location: formData.get("location") as string,
        position: formData.get("position") as string,
        noticePeriod: formData.get("noticePeriod") as string,
        salary: formData.get("salary") as string,
        experience: formData.get("experience") as string,
        portfolio: formData.get("portfolio") as string,
        skills: formData.get("skills") as string,
        qualification: formData.get("qualification") as string,
        resume: formData.get("resume") as File | null,
    };

    console.log("Application Submitted:", {
        ...data,
        resumeName: data.resume?.name,
    });

    // Prepare email HTML
    const emailHtml = `
        <!DOCTYPE html>
        <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .logo { text-align: center; padding: 30px 20px; background-color: #ffffff; }
                    .logo img { max-width: 180px; height: auto; }
                    .header { background-color: #1D54DD; color: white; padding: 40px 20px; text-align: center; }
                    .header h2 { margin: 0; font-size: 24px; }
                    .header p { margin: 10px 0 0; opacity: 0.9; }
                    .content { background-color: #f9f9f9; padding: 30px 20px; }
                    .section { margin-bottom: 25px; background: white; padding: 20px; border-radius: 8px; }
                    .section-title { font-size: 16px; font-weight: bold; color: #1D54DD; margin-bottom: 15px; border-bottom: 2px solid #1D54DD; padding-bottom: 8px; }
                    .field { margin-bottom: 12px; }
                    .label { font-weight: bold; color: #666; font-size: 13px; }
                    .value { margin-top: 3px; color: #333; }
                    .value a { color: #1D54DD; }
                    .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
                    .footer a { color: #1D54DD; text-decoration: none; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="logo">
                        <img src="https://posilenz.com/images/image.png" alt="Posilenz" />
                    </div>
                    <div class="header">
                        <h2>New Job Application</h2>
                        <p>Position: ${data.position}</p>
                    </div>
                    <div class="content">
                        <div class="section">
                            <div class="section-title">Personal Information</div>
                            <div class="field">
                                <div class="label">Full Name:</div>
                                <div class="value">${data.name}</div>
                            </div>
                            <div class="field">
                                <div class="label">Email:</div>
                                <div class="value">${data.email}</div>
                            </div>
                            <div class="field">
                                <div class="label">Phone:</div>
                                <div class="value">${data.phone}</div>
                            </div>
                            <div class="field">
                                <div class="label">Location:</div>
                                <div class="value">${data.location || 'Not provided'}</div>
                            </div>
                        </div>

                        <div class="section">
                            <div class="section-title">Role Details</div>
                            <div class="field">
                                <div class="label">Position:</div>
                                <div class="value">${data.position}</div>
                            </div>
                            <div class="field">
                                <div class="label">Notice Period / Availability:</div>
                                <div class="value">${data.noticePeriod}</div>
                            </div>
                            <div class="field">
                                <div class="label">Expected Salary Range:</div>
                                <div class="value">${data.salary || 'Not provided'}</div>
                            </div>
                        </div>

                        <div class="section">
                            <div class="section-title">Experience & Skills</div>
                            <div class="field">
                                <div class="label">Years of Experience:</div>
                                <div class="value">${data.experience}</div>
                            </div>
                            <div class="field">
                                <div class="label">Portfolio / GitHub / LinkedIn:</div>
                                <div class="value"><a href="${data.portfolio}">${data.portfolio}</a></div>
                            </div>
                            <div class="field">
                                <div class="label">Key Skills:</div>
                                <div class="value">${data.skills || 'Not provided'}</div>
                            </div>
                        </div>

                        <div class="section">
                            <div class="section-title">Qualification</div>
                            <div class="field">
                                <div class="label">Why join Posilenz:</div>
                                <div class="value">${data.qualification || 'Not provided'}</div>
                            </div>
                        </div>

                        <div class="section">
                            <div class="label">Resume:</div>
                            <div class="value">${data.resume ? 'Attached' : 'Not provided'}</div>
                        </div>
                    </div>
                    <div class="footer">
                        <p>&copy; ${new Date().getFullYear()} Posilenz. All rights reserved.</p>
                        <p><a href="https://posilenz.com">posilenz.com</a></p>
                    </div>
                </div>
            </body>
        </html>
    `;

    try {
        // Prepare email options
        const emailOptions: any = {
            to: process.env.EMAIL_TO || 'info@posilenz.com',
            subject: `New Job Application: ${data.position} - ${data.name}`,
            html: emailHtml,
            replyTo: data.email,
        };

        // Attach resume if present
        if (data.resume && data.resume.size > 0) {
            const buffer = Buffer.from(await data.resume.arrayBuffer());
            emailOptions.attachments = [
                {
                    filename: data.resume.name,
                    content: buffer,
                    contentType: data.resume.type,
                },
            ];
        }

        await sendEmail(emailOptions);

        // Send confirmation email to applicant
        const applicantFirstName = data.name.split(" ")[0];
        const confirmationEmailHtml = `
            <!DOCTYPE html>
            <html>
                <head>
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                        .logo { text-align: center; padding: 30px 20px; background-color: #ffffff; }
                        .logo img { max-width: 180px; height: auto; }
                        .header { background-color: #1D54DD; color: white; padding: 40px 20px; text-align: center; }
                        .header h1 { margin: 0; font-size: 28px; }
                        .content { background-color: #f9f9f9; padding: 30px 20px; }
                        .greeting { font-size: 18px; margin-bottom: 20px; }
                        .message { margin-bottom: 20px; }
                        .details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
                        .details-title { font-weight: bold; color: #1D54DD; margin-bottom: 10px; }
                        .details-item { margin-bottom: 8px; }
                        .next-steps { background: #E8F0FE; padding: 20px; border-radius: 8px; margin: 20px 0; }
                        .next-steps-title { font-weight: bold; color: #1D54DD; margin-bottom: 10px; }
                        .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
                        .footer a { color: #1D54DD; text-decoration: none; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="logo">
                            <img src="https://posilenz.com/images/image.png" alt="Posilenz" />
                        </div>
                        <div class="header">
                            <h1>Application Received</h1>
                        </div>
                        <div class="content">
                            <p class="greeting">Dear ${applicantFirstName},</p>
                            <p class="message">
                                Thank you for applying for the <strong>${data.position}</strong> position at Posilenz.
                                We're excited to have received your application and appreciate your interest in joining our team.
                            </p>

                            <div class="details">
                                <div class="details-title">Application Summary</div>
                                <div class="details-item"><strong>Position:</strong> ${data.position}</div>
                                <div class="details-item"><strong>Experience:</strong> ${data.experience}</div>
                                <div class="details-item"><strong>Availability:</strong> ${data.noticePeriod}</div>
                            </div>

                            <div class="next-steps">
                                <div class="next-steps-title">What happens next?</div>
                                <p>Our recruitment team will carefully review your application. If your profile matches our requirements, we'll reach out to schedule an initial conversation within 5-7 business days.</p>
                            </div>

                            <p class="message">
                                In the meantime, feel free to explore more about us at <a href="https://posilenz.com" style="color: #1D54DD;">posilenz.com</a>.
                            </p>

                            <p>Best regards,<br><strong>The Posilenz Talent Team</strong></p>
                        </div>
                        <div class="footer">
                            <p>&copy; ${new Date().getFullYear()} Posilenz. All rights reserved.</p>
                            <p><a href="https://posilenz.com">posilenz.com</a></p>
                        </div>
                    </div>
                </body>
            </html>
        `;

        // Send confirmation to applicant (don't fail the whole submission if this fails)
        try {
            await sendEmail({
                to: data.email,
                subject: `Application Received - ${data.position} at Posilenz`,
                html: confirmationEmailHtml,
            });
        } catch (confirmError) {
            console.error("Error sending confirmation email to applicant:", confirmError);
            // Don't throw - the main application was already submitted successfully
        }

        return { success: true, message: "Application submitted successfully!" };
    } catch (error) {
        console.error("Error sending application email:", error);
        throw new Error("Failed to submit application. Please try again later.");
    }
}

export async function subscribeNewsletter(formData: FormData) {
    const email = formData.get("email") as string;
    console.log("Newsletter Subscription:", email);

    const emailHtml = `
        <!DOCTYPE html>
        <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .logo { text-align: center; padding: 30px 20px; background-color: #ffffff; }
                    .logo img { max-width: 180px; height: auto; }
                    .header { background-color: #1D54DD; color: white; padding: 40px 20px; text-align: center; }
                    .header h2 { margin: 0; font-size: 24px; }
                    .content { background-color: #f9f9f9; padding: 30px 20px; }
                    .field { background: white; padding: 20px; border-radius: 8px; }
                    .label { font-weight: bold; color: #1D54DD; font-size: 14px; }
                    .value { margin-top: 5px; color: #333; }
                    .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
                    .footer a { color: #1D54DD; text-decoration: none; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="logo">
                        <img src="https://posilenz.com/images/image.png" alt="Posilenz" />
                    </div>
                    <div class="header">
                        <h2>New Newsletter Subscription</h2>
                    </div>
                    <div class="content">
                        <div class="field">
                            <div class="label">Email:</div>
                            <div class="value">${email}</div>
                        </div>
                    </div>
                    <div class="footer">
                        <p>&copy; ${new Date().getFullYear()} Posilenz. All rights reserved.</p>
                        <p><a href="https://posilenz.com">posilenz.com</a></p>
                    </div>
                </div>
            </body>
        </html>
    `;

    try {
        await sendEmail({
            to: process.env.EMAIL_TO || 'info@posilenz.com',
            subject: 'New Newsletter Subscription',
            html: emailHtml,
        });

        return { success: true, message: "Subscribed successfully!" };
    } catch (error) {
        console.error("Error sending newsletter subscription:", error);
        throw new Error("Failed to subscribe. Please try again later.");
    }
}
