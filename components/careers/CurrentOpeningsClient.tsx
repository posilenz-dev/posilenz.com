"use client";

import { useState } from "react";
import Image from "next/image";
import { DocumentRenderer } from "@keystatic/core/renderer";

export interface Career {
    slug: string;
    title: string;
    intro: string;
    location: 'remote' | 'hybrid' | 'onsite';
    employmentType: 'full-time' | 'part-time' | 'contract';
    experience: string;
    displayOrder: number;
    isActive: boolean;
    whoYouAre: any;
    roleOverview: any;
    keyResponsibilities: readonly string[];
    skillsExperience: readonly string[];
    whatYoullBring: readonly string[];
    whyJoin: any;
    content: any;
}

// Helper to format location display
function formatLocation(location: string): string {
    const locationMap: Record<string, string> = {
        remote: 'Remote',
        hybrid: 'Hybrid',
        onsite: 'On-site',
    };
    return locationMap[location] || location;
}

// Helper to format employment type display
function formatEmploymentType(type: string): string {
    const typeMap: Record<string, string> = {
        'full-time': 'Full-time',
        'part-time': 'Part-time',
        contract: 'Contract',
    };
    return typeMap[type] || type;
}

interface CurrentOpeningsClientProps {
    careers: Career[];
}

export default function CurrentOpeningsClient({ careers }: CurrentOpeningsClientProps) {
    const [activeJobId, setActiveJobId] = useState<string | null>(null);

    const toggleJob = (slug: string) => {
        setActiveJobId(activeJobId === slug ? null : slug);
    };

    const scrollToApplication = (jobTitle: string) => {
        const formSection = document.querySelector(".application-section");
        const select = document.querySelector(
            ".application-form select"
        ) as HTMLSelectElement;

        if (formSection) {
            formSection.scrollIntoView({ behavior: "smooth" });
        }

        if (select) {
            setTimeout(() => {
                const options = Array.from(select.options);
                const option = options.find((opt) => opt.text === jobTitle);
                if (option) {
                    select.value = option.value;
                }
            }, 500);
        }
    };

    if (careers.length === 0) {
        return (
            <section className="openings-section">
                <div className="openings-container">
                    <h2 className="openings-title">Current Openings</h2>
                    <p style={{ textAlign: 'center', padding: '40px 0', color: '#666' }}>
                        No open positions at the moment. Check back soon!
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section className="openings-section">
            <div className="openings-container">
                <h2 className="openings-title">Current Openings</h2>

                {careers.map((career) => (
                    <div
                        key={career.slug}
                        className={`job-listing ${activeJobId === career.slug ? "active" : ""}`}
                        id={`job-${career.slug}`}
                    >
                        <div
                            className="job-header"
                            onClick={() => toggleJob(career.slug)}
                            role="button"
                            tabIndex={0}
                        >
                            <h3 className="job-title">{career.title}</h3>
                            <div className="job-header-left">
                                <p className="job-intro">{career.intro}</p>
                                <div className="job-meta-row">
                                    <div className="job-meta-item">
                                        <Image
                                            src="/images/location.svg"
                                            alt=""
                                            width={14}
                                            height={14}
                                        />
                                        <span>{formatLocation(career.location)}</span>
                                    </div>
                                    <div className="job-meta-item">
                                        <Image
                                            src="/images/clock.svg"
                                            alt=""
                                            width={14}
                                            height={14}
                                        />
                                        <span>{formatEmploymentType(career.employmentType)}</span>
                                    </div>
                                    <div className="job-meta-item">
                                        <Image
                                            src="/images/breefcase.svg"
                                            alt=""
                                            width={14}
                                            height={14}
                                        />
                                        <span>{career.experience}</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                className="job-expand-btn"
                                aria-label="Expand job details"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleJob(career.slug);
                                }}
                            >
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M12 5V19M5 12H19"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </button>
                        </div>

                        <div className="job-details">
                            <div className="job-dtls-content">
                                {career.whoYouAre && (
                                    <div className="job-section">
                                        <h4 className="job-section-title">Who You Are</h4>
                                        <div className="job-section-text">
                                            <DocumentRenderer document={career.whoYouAre} />
                                        </div>
                                    </div>
                                )}

                                {career.roleOverview && (
                                    <div className="job-section">
                                        <h4 className="job-section-title">Role Overview</h4>
                                        <div className="job-section-text">
                                            <DocumentRenderer document={career.roleOverview} />
                                        </div>
                                    </div>
                                )}

                                {career.keyResponsibilities && career.keyResponsibilities.length > 0 && (
                                    <div className="job-section">
                                        <h4 className="job-section-title">Key Responsibilities</h4>
                                        <ul className="job-list">
                                            {career.keyResponsibilities.map((item, idx) => (
                                                <li key={idx}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {career.skillsExperience && career.skillsExperience.length > 0 && (
                                    <div className="job-section">
                                        <h4 className="job-section-title">Skills & Experience</h4>
                                        <ul className="job-list">
                                            {career.skillsExperience.map((item, idx) => (
                                                <li key={idx}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {career.whatYoullBring && career.whatYoullBring.length > 0 && (
                                    <div className="job-section">
                                        <h4 className="job-section-title">What You'll Bring</h4>
                                        <ul className="job-list">
                                            {career.whatYoullBring.map((item, idx) => (
                                                <li key={idx}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {career.whyJoin && (
                                    <div className="job-section">
                                        <h4 className="job-section-title">Why Join Posilenz</h4>
                                        <div className="job-section-text">
                                            <DocumentRenderer document={career.whyJoin} />
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="job-apply-section">
                                <h5>
                                    Ready to Build the
                                    <br />
                                    Future of ERP?
                                </h5>

                                <div className="jobleft">
                                    <p className="job-apply-text">
                                        Apply now at:{" "}
                                        <a href="mailto:careers@posilenz.com">
                                            careers@posilenz.com
                                        </a>{" "}
                                        or click Apply now below
                                    </p>
                                    <button
                                        className="job-apply-btn"
                                        onClick={() => scrollToApplication(career.title)}
                                    >
                                        Apply Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

