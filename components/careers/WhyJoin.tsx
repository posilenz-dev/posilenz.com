import Image from "next/image";

export default function WhyJoin() {
    return (
        <section className="why-join-section">
            <div className="why-join-container">
                <div className="why-join-grid">
                    <div className="why-join-card">
                        <div className="why-join-icon">
                            <Image
                                src="/images/career-icon-1.svg"
                                alt=""
                                width={50}
                                height={50}
                            />
                        </div>
                        <h3 className="why-join-title">
                            Shape Intelligent
                            <br />
                            Technology
                        </h3>
                        <p className="why-join-description">
                            Work at the forefront of digital transformation, solving real
                            business problems with adaptive systems and high-growth product
                            opportunities.
                        </p>
                    </div>

                    <div className="why-join-card">
                        <div className="why-join-icon">
                            <Image
                                src="/images/career-icon-2.svg"
                                alt=""
                                width={50}
                                height={50}
                            />
                        </div>
                        <h3 className="why-join-title">
                            Innovate with
                            <br />
                            Freedom
                        </h3>
                        <p className="why-join-description">
                            A culture powered by design thinking, creativity, and autonomy.
                            You’ll lead what you build, and learn every day.
                        </p>
                    </div>

                    <div className="why-join-card">
                        <div className="why-join-icon">
                            <Image
                                src="/images/career-icon-3.svg"
                                alt=""
                                width={50}
                                height={50}
                            />
                        </div>
                        <h3 className="why-join-title">
                            Grow with
                            <br />
                            Possibility
                        </h3>
                        <p className="why-join-description">
                            Flexible working, diverse challenges, and exposure to evolving
                            technologies that accelerate both your career and capabilities.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
