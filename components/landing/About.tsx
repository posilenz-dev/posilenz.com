"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
    useGSAP(() => {
        // About section animations
        gsap.from(".about-title .title-line", {
            duration: 1,
            opacity: 0,
            y: 50,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".about-section",
                start: "top 80%",
            },
        });

        gsap.from(".about-description", {
            duration: 1,
            opacity: 0,
            x: 50,
            ease: "power2.out",
            delay: 0.3,
            scrollTrigger: {
                trigger: ".about-section",
                start: "top 80%",
            },
        });
    }, []);

    return (
        <section id="about" className="about-section section">
            <div className="about-container">
                <div className="about-content">
                    <div className="about-text">
                        <h2 className="about-title">
                            <span className="title-line">
                                Built for Clarity. Engineered for Scalable Impact.
                            </span>
                        </h2>
                    </div>
                    <div className="about-description">
                        <h3 className="about-heading">About Posilenz</h3>
                        <p className="about-paragraph">
                            Posilenz Technologies is your strategic IT partner for end-to-end
                            digital transformation, helping businesses scale and perform with
                            agility. We orchestrate the entire digital journey, from strategic
                            IT Consulting and core ERP solution to advanced Data Analytics and
                            comprehensive Digital Services, ensuring every layer of your
                            business operates with structure, intelligence, and clarity. This
                            is where complexity yields confidence, transforming every digital
                            step into predictable, accelerated progress.
                        </p>
                        <Link 
                            href="#team-section" 
                            className="about-tagline"
                            onClick={(e) => {
                                e.preventDefault();
                                const element = document.getElementById('team-section');
                                if (element) {
                                    // Update URL hash
                                    window.history.pushState(null, '', '#team-section');
                                    // Scroll to element
                                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                } else {
                                    window.location.href = '#team-section';
                                }
                            }}
                        >
                            Team Posilenz
                            <svg
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
                                ></path>
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
