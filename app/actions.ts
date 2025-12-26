"use server";

export async function submitContactForm(formData: FormData) {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const data = {
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
    };

    console.log("Contact Form Submitted:", data);

    // In a real app, you would send email or save to DB here
    return { success: true, message: "Message sent successfully!" };
}

export async function submitApplication(formData: FormData) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const data = {
        name: formData.get("name"),
        email: formData.get("email"),
        linkedin: formData.get("linkedin"),
        portfolio: formData.get("portfolio"),
        position: formData.get("position"),
        resume: formData.get("resume") as File | null,
    };

    console.log("Application Submitted:", {
        ...data,
        resumeName: data.resume?.name,
    });

    return { success: true, message: "Application submitted successfully!" };
}

export async function subscribeNewsletter(formData: FormData) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const email = formData.get("email");
    console.log("Newsletter Subscription:", email);

    return { success: true, message: "Subscribed successfully!" };
}
