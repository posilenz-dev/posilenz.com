import Link from "next/link";

export default function Team() {
    return (
        <div className="team-wrapper" id="team-section">
            <section className="team-section section">
                <div className="team-container">
                    <div className="team-content">
                        <p className="team-label">Team Posilenz</p>
                        <h2 className="team-title">
                            People Who Shape
                            <br className="none" />
                            Intelligent Systems
                        </h2>
                        <p className="team-description">
                            Our team brings together strategists, engineers, designers, and
                            problem- solvers who believe in building technology with purpose.
                            Every member contributes deep expertise, industry experience, and
                            a commitment to creating systems that deliver absolute clarity and
                            operate flawlessly.
                        </p>
                        <p className="team-description">
                            At Posilenz, collaboration drives insight, and insight drives
                            innovation. Together, we transform complex challenges into
                            structured, intelligent solutions that elevate businesses and
                            create predictable progress.
                        </p>
                    </div>
                </div>
            </section>

            {/* Join Network Section (Overlaps on scroll) */}
            <section className="join-section section">
                <div className="join-container">
                    <div className="join-content">
                        <h2 className="join-title">
                            Join the Posilenz
                            <br className="none" />
                            Network
                        </h2>

                        <div className="join-description">
                            <p>
                                If you’re passionate about designing smarter systems, solving
                                real problems, and shaping the future of digital transformation,
                                we’d love to hear from you. Explore opportunities, collaborate
                                with experts, and grow with a team that values clarity,
                                creativity, and progress.{" "}
                            </p>
                            <p className="join-cta-text">
                                Discover how you can impact the future by exploring our current
                                openings.
                            </p>
                        </div>

                        <div className="job-listings">
                            <Link
                                href="/careers#job-1"
                                className="job-item"
                                data-job-id="1"
                            >
                                <span className="job-title-name">Senior Developer</span>
                                <svg
                                    className="job-arrow"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M5 12H19M19 12L12 5M19 12L12 19"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </Link>

                            <Link
                                href="/careers#job-3"
                                className="job-item"
                                data-job-id="3"
                            >
                                <span className="job-title-name">Social Media Expert</span>
                                <svg
                                    className="job-arrow"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M5 12H19M19 12L12 5M19 12L12 19"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
