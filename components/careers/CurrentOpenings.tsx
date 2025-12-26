"use client";

import { useState } from "react";
import Image from "next/image";

export default function CurrentOpenings() {
    const [activeJobId, setActiveJobId] = useState<number | null>(null);

    const toggleJob = (id: number) => {
        setActiveJobId(activeJobId === id ? null : id);
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
            // Small timeout to allow potential render/scroll
            setTimeout(() => {
                const options = Array.from(select.options);
                const option = options.find((opt) => opt.text === jobTitle);
                if (option) {
                    select.value = option.value;
                }
            }, 500);
        }
    };

    return (
        <section className="openings-section">
            <div className="openings-container">
                <h2 className="openings-title">Current Openings</h2>

                {/* Job Listing 1 */}
                <div
                    className={`job-listing ${activeJobId === 1 ? "active" : ""}`}
                    id="job-1"
                >
                    <div
                        className="job-header"
                        onClick={() => toggleJob(1)}
                        role="button"
                        tabIndex={0}
                    >
                        <h3 className="job-title">Senior Developer</h3>
                        <div className="job-header-left">
                            <p className="job-intro">
                                We're looking for an experienced Senior Developer who can build
                                smart, scalable digital systems, turning complex requirements
                                into high-performing, elegant solutions.
                            </p>
                            <div className="job-meta-row">
                                <div className="job-meta-item">
                                    <Image
                                        src="/images/location.svg"
                                        alt=""
                                        width={14}
                                        height={14}
                                    />
                                    <span>Remote</span>
                                </div>
                                <div className="job-meta-item">
                                    <Image
                                        src="/images/clock.svg"
                                        alt=""
                                        width={14}
                                        height={14}
                                    />
                                    <span>Full-time</span>
                                </div>
                                <div className="job-meta-item">
                                    <Image
                                        src="/images/breefcase.svg"
                                        alt=""
                                        width={14}
                                        height={14}
                                    />
                                    <span>6+ Years</span>
                                </div>
                            </div>
                        </div>
                        <button
                            className="job-expand-btn"
                            aria-label="Expand job details"
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleJob(1);
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
                            <div className="job-section">
                                <h4 className="job-section-title">Who You Are</h4>
                                <p className="job-section-text">
                                    We're looking for an experienced Senior Developer who can
                                    build intelligent, scalable systems while elevating the
                                    product quality and user experience of our ERP platforms. You
                                    thrive in terms of clean architecture, seamless flow, and
                                    performance, translating business logic into code that's both
                                    elegant and maintainable.
                                </p>
                            </div>

                            <div className="job-section">
                                <h4 className="job-section-title">Role Overview</h4>
                                <p className="job-section-text">
                                    As a Senior Developer at Posilenz, you will lead the
                                    modernization of our ERP systems, ensuring they are robust,
                                    scalable, and future-ready. You'll be architecting every
                                    module performs with reliability and intelligence. You'll
                                    collaborate closely with design, product, and engineering
                                    teams to bring clarity to complexity.
                                </p>
                            </div>

                            <div className="job-section">
                                <h4 className="job-section-title">Key Responsibilities</h4>
                                <ul className="job-list">
                                    <li>Lead development of UI revamp for existing ERP modules</li>
                                    <li>
                                        Architect and implement scalable backend systems using
                                        modern frameworks
                                    </li>
                                    <li>Build clean, reusable components for long-term growth</li>
                                    <li>Implement improvements and system optimizations</li>
                                    <li>
                                        Collaborate with designers to transform UX into pixel-perfect
                                        UI
                                    </li>
                                    <li>
                                        Ensure database security, performance, and code quality
                                        standards
                                    </li>
                                    <li>Mentor junior developers and conduct code reviews</li>
                                    <li>
                                        Contribute to automation, CI/CD pipelines, and deployment
                                        workflows
                                    </li>
                                </ul>
                            </div>

                            <div className="job-section">
                                <h4 className="job-section-title">Skills & Experience</h4>
                                <ul className="job-list">
                                    <li>Strong proficiency in JavaScript/TypeScript, React / Angular / Vue</li>
                                    <li>Backend experience with Node.js, .NET Core or Java</li>
                                    <li>Solid understanding of SQL and NoSQL databases</li>
                                    <li>
                                        API integration experience (RESTful services, microservices)
                                    </li>
                                    <li>
                                        Experience with code reviews, Git workflows, testing
                                        frameworks
                                    </li>
                                    <li>Familiarity with cloud platforms (AWS / Azure)</li>
                                    <li>
                                        ERP or large enterprise system exposure is a huge plus
                                    </li>
                                </ul>
                            </div>

                            <div className="job-section">
                                <h4 className="job-section-title">What You'll Bring</h4>
                                <ul className="job-list">
                                    <li>Ownership mindset</li>
                                    <li>Ability to think like a system architect</li>
                                    <li>A passion for clean workflow, speed, and UI quality</li>
                                    <li>
                                        Curiosity toward automation and intelligent system design
                                    </li>
                                </ul>
                            </div>

                            <div className="job-section">
                                <h4 className="job-section-title">Why Join Posilenz</h4>
                                <p className="job-section-text">
                                    Work with a high-growth technology brand shaping intelligent
                                    enterprise systems. Own what you build and grow with evolving
                                    technology, in a culture that values innovation, flexibility,
                                    and autonomy.
                                </p>
                            </div>
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
                                    onClick={() => scrollToApplication("Senior Developer")}
                                >
                                    Apply Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Job Listing 3 */}
                <div
                    className={`job-listing ${activeJobId === 3 ? "active" : ""}`}
                    id="job-3"
                >
                    <div
                        className="job-header"
                        onClick={() => toggleJob(3)}
                        role="button"
                        tabIndex={0}
                    >
                        <h3 className="job-title">Social Media Expert</h3>
                        <div className="job-header-left">
                            <p className="job-intro">
                                We're looking for a Social Media Expert who can craft and drive
                                digital conversations, growing our presence with smart strategy,
                                content, and engagement.
                            </p>
                            <div className="job-meta-row">
                                <div className="job-meta-item">
                                    <Image
                                        src="/images/location.svg"
                                        alt=""
                                        width={14}
                                        height={14}
                                    />
                                    <span>Remote</span>
                                </div>
                                <div className="job-meta-item">
                                    <Image
                                        src="/images/clock.svg"
                                        alt=""
                                        width={14}
                                        height={14}
                                    />
                                    <span>Full-time</span>
                                </div>
                                <div className="job-meta-item">
                                    <Image
                                        src="/images/breefcase.svg"
                                        alt=""
                                        width={14}
                                        height={14}
                                    />
                                    <span>6+ Years</span>
                                </div>
                            </div>
                        </div>
                        <button
                            className="job-expand-btn"
                            aria-label="Expand job details"
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleJob(3);
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
                            {/* Similar content structure to Senior Developer, omitted for brevity, adding placeholder logic */}
                            <div className="job-section">
                                <h4 className="job-section-title">Who You Are</h4>
                                <p className="job-section-text">
                                    We’re looking for a creative and strategic Social Media Expert who understands how to build brand presence, spark conversations, and drive engagement across digital platforms. You have a strong eye for content, trends, and storytelling—turning ideas into posts that feel relevant, human, and impactful.
                                </p>
                            </div>

                            <div className="job-section">
                                <h4 className="job-section-title">Role Overview</h4>
                                <p className="job-section-text">As a Social Media Expert at Posilenz, you will shape and manage our digital voice across platforms. You’ll plan, create, and execute content that reflects our brand values while supporting marketing, recruitment, and product storytelling. You’ll work closely with design, marketing, and leadership teams to ensure consistency, clarity, and growth across all social channels.</p>
                            </div>

                            <div className="job-section">
                                <h4 className="job-section-title">Key Responsibilities</h4>
                                <ul className="job-list">
                                    <li>Plan and manage content calendars across all social media platforms</li>
                                    <li>Create engaging posts, captions, reels, and stories aligned with brand tone</li>
                                    <li>Collaborate with designers and video teams to deliver high-quality visuals</li>
                                    <li>Monitor trends, audience behavior, and platform updates</li>
                                    <li>Drive community engagement through comments, messages, and interactions</li>
                                    <li>Analyze performance metrics and optimize content for reach and engagement</li>
                                    <li>Support campaigns, launches, hiring, and brand storytelling initiatives</li>
                                    <li>Maintain consistency in voice, messaging, and visual identity</li>
                                    <li>Manage basic paid promotions and boosts when required</li>
                                </ul>
                            </div>

                            <div className="job-section">
                                <h4 className="job-section-title">Skills & Experience</h4>
                                <ul className="job-list">
                                    <li>
                                        Proven experience managing brand social media accounts</li>
                                    <li>Strong writing skills with an understanding of brand tone and storytelling</li>
                                    <li>Hands-on experience with Instagram, LinkedIn, Facebook, and X</li>
                                    <li>Familiarity with content scheduling and analytics tools</li>
                                    <li>Basic understanding of performance metrics and reporting</li>
                                    <li>Ability to work with design tools and creative teams</li>
                                    <li>Knowledge of trends, hashtags, formats, and platform best practices</li>
                                    <li>B2B or tech brand experience is a plus
                                    </li>
                                </ul>
                            </div>

                            <div className="job-section">
                                <h4 className="job-section-title">What You'll Bring</h4>
                                <ul className="job-list">
                                    <li>A strong sense of ownership and accountability</li>
                                    <li>Creative thinking backed by data-driven decisions</li>
                                    <li>Consistency, attention to detail, and reliability</li>
                                    <li>Curiosity to experiment with formats and trends</li>
                                    <li>Passion for building meaningful brand presence online</li>
                                </ul>
                            </div>

                            <div className="job-section">
                                <h4 className="job-section-title">Why Join Posilenz</h4>
                                <p className="job-section-text">Work with a fast-growing technology brand shaping intelligent enterprise solutions. Be the voice of the brand, experiment creatively, and grow in a culture that values innovation, autonomy, and impact.</p>
                            </div>

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
                                    onClick={() => scrollToApplication("Social Media Expert")}
                                >
                                    Apply Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
