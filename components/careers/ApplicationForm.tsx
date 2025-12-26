"use client";

import { useState } from "react";
import { submitApplication } from "@/app/actions";

export default function ApplicationForm() {
    const [fileName, setFileName] = useState("Resume / CV Upload (PDF only, 5-10MB max)");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFileName(e.target.files[0].name);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const formData = new FormData(e.currentTarget);
            await submitApplication(formData);
            alert("Thank you for your application! We will review it and get back to you soon.");
            (e.target as HTMLFormElement).reset();
            setFileName("Resume / CV Upload (PDF only, 5-10MB max)");
        } catch (error) {
            console.error(error);
            alert("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="application-section">
            <div className="application-container">
                <h2 className="application-title">Start Your Application</h2>

                <form className="application-form" onSubmit={handleSubmit}>
                    {/* Personal Information */}
                    <div className="form-group">
                        <h3 className="form-group-title">Personal Information</h3>
                        <div className="form-fields">
                            <input name="name" type="text" className="form-input" placeholder="Full Name*" required disabled={isSubmitting} />
                            <input name="email" type="email" className="form-input" placeholder="Email Address*" required disabled={isSubmitting} />
                            <input name="phone" type="tel" className="form-input" placeholder="Phone Number *" required disabled={isSubmitting} />
                            <input name="location" type="text" className="form-input" placeholder="Current Location (City, Country)" disabled={isSubmitting} />
                        </div>
                    </div>

                    {/* Role Details */}
                    <div className="form-group">
                        <h3 className="form-group-title">Role Details</h3>
                        <div className="form-fields">
                            <select name="position" className="form-input" required defaultValue="" disabled={isSubmitting}>
                                <option value="" disabled>Position Applying For *</option>
                                <option value="senior-developer">Senior Developer</option>
                                <option value="graphic-designer">Graphic Designer</option>
                                <option value="social-media-expert">Social Media Expert</option>
                            </select>
                            <input name="noticePeriod" type="text" className="form-input" placeholder="Notice Period / Availability *" required disabled={isSubmitting} />
                            <input name="salary" type="text" className="form-input" placeholder="Expected Salary Range (Optional)" disabled={isSubmitting} />
                        </div>
                    </div>

                    {/* Experience & Skills */}
                    <div className="form-group">
                        <h3 className="form-group-title">Experience & Skills</h3>
                        <div className="form-fields">
                            <input name="experience" type="text" className="form-input" placeholder="Years of Experience *" required disabled={isSubmitting} />
                            <input name="portfolio" type="url" className="form-input" placeholder="Portfolio / GitHub / Behance / LinkedIn URL *" required disabled={isSubmitting} />
                            <textarea name="skills" className="form-input form-textarea" placeholder="Specialisation / Key Skills" rows={3} disabled={isSubmitting}></textarea>
                        </div>
                    </div>

                    {/* Resume Upload */}
                    <div className="form-group">
                        <h3 className="form-group-title">Resume Upload</h3>
                        <div className="form-fields">
                            <div className="file-upload-box">
                                <input name="resume" type="file" id="resume" accept=".pdf" required onChange={handleFileChange} disabled={isSubmitting} />
                                <label htmlFor="resume" className="file-upload-label">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10 13V4M10 4L7 7M10 4L13 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M3 13V15C3 15.5304 3.21071 16.0391 3.58579 16.4142C3.96086 16.7893 4.46957 17 5 17H15C15.5304 17 16.0391 16.7893 16.4142 16.4142C16.7893 16.0391 17 15.5304 17 15V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span className="file-upload-text">{fileName}</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Short Qualification */}
                    <div className="form-group">
                        <h3 className="form-group-title">Short Qualification</h3>
                        <div className="form-fields">
                            <textarea name="qualification" className="form-input form-textarea" placeholder="Why do you want to join Posilenz? (100-150 chars)" rows={3} maxLength={150} disabled={isSubmitting}></textarea>
                        </div>
                    </div>

                    {/* Consent */}
                    <div className="form-consent">
                        <label className="consent-label">
                            <input type="checkbox" className="consent-checkbox" required disabled={isSubmitting} />
                            <span className="consent-text">I confirm that the information provided is accurate and give consent to contact me.</span>
                        </label>
                    </div>

                    <button type="submit" className="form-submit-btn" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                </form>
            </div>
        </section>
    );
}
