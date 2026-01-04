"use client";

import { useState, useRef } from "react";
import { submitContactForm } from "@/app/actions";

export default function Contact() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const formData = new FormData(e.currentTarget);
            await submitContactForm(formData);
            setShowSuccess(true);
        } catch (error) {
            console.error(error);
            alert("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const closeSuccessModal = () => {
        setShowSuccess(false);
        formRef.current?.reset();
    };

    return (
        <>
            {/* Success Modal */}
            {showSuccess && (
                <div className="success-modal-overlay" onClick={closeSuccessModal}>
                    <div className="success-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="success-icon">
                            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="32" cy="32" r="32" fill="#1D54DD" />
                                <path d="M20 32L28 40L44 24" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <h3 className="success-title">Thank You!</h3>
                        <p className="success-message">
                            Your message has been sent successfully.
                        </p>
                        <p className="success-submessage">
                            We&apos;ll get back to you shortly.
                        </p>
                        <button className="success-btn" onClick={closeSuccessModal}>
                            Got it
                        </button>
                    </div>
                </div>
            )}

            <section id="contact" className="contact-section section">
                <div className="contact-container">
                    <div className="contact-content">
                        <h2 className="contact-title">
                            Let&apos;s Build Intelligent
                            <br className="none" /> Systems Together
                        </h2>
                    </div>

                    <div className="contact-form-wrapper">
                        <form className="contact-form" onSubmit={handleSubmit} ref={formRef}>
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
        </>
    );
}
