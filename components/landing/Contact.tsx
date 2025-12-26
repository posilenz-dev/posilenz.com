"use client";

import { useState } from "react";
import { submitContactForm } from "@/app/actions";

export default function Contact() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const formData = new FormData(e.currentTarget);
            await submitContactForm(formData);
            alert("Thank you! Your message has been sent.");
            (e.target as HTMLFormElement).reset();
        } catch (error) {
            console.error(error);
            alert("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="contact-section section">
            <div className="contact-container">
                <div className="contact-content">
                    <h2 className="contact-title">
                        Let's Build Intelligent
                        <br className="none" /> Systems Together
                    </h2>
                </div>

                <div className="contact-form-wrapper">
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                name="name"
                                type="text"
                                className="form-input"
                                placeholder="Name"
                                required
                                disabled={isSubmitting}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                name="email"
                                type="email"
                                className="form-input"
                                placeholder="Email"
                                required
                                disabled={isSubmitting}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                name="phone"
                                type="tel"
                                className="form-input"
                                placeholder="Phone"
                                required
                                disabled={isSubmitting}
                            />
                        </div>
                        <div className="form-group">
                            <textarea
                                name="message"
                                className="form-input form-textarea"
                                placeholder="Message"
                                rows={1}
                                required
                                disabled={isSubmitting}
                            ></textarea>
                        </div>
                        <button type="submit" className="form-submit" disabled={isSubmitting}>
                            {isSubmitting ? "Sending..." : "Start the Conversation"}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
