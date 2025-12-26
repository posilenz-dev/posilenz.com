"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ServicesIntro() {
    useGSAP(() => {
        gsap.from(".services-title", {
            duration: 1,
            opacity: 0,
            y: 50,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".services-section",
                start: "top 80%",
            },
        });

        gsap.from(".services-description", {
            duration: 1,
            opacity: 0,
            y: 30,
            ease: "power2.out",
            delay: 0.3,
            scrollTrigger: {
                trigger: ".services-section",
                start: "top 80%",
            },
        });
    }, []);

    return (
        <section id="services" className="services-section section">
            <div className="services-container">
                <div className="services-content">
                    <h2 className="services-title">
                        Unified Solutions Built for
                        <br className="none" />
                        Predictable Growth
                    </h2>
                    <p className="services-description">
                        At Posilenz, we recognise that true digital transformation requires
                        system unification. We engineer intelligent architectures across
                        your core business functions, integrating IT strategy, Enterprise
                        Resource Planning (ERP), and expert Knowledge & Process Management.
                        Our unified approach ensures purposeful data flow and operational
                        synergy, providing the exceptional clarity and limitless scalability
                        required for modern growth.
                    </p>
                </div>
            </div>
            <div className="services-background"></div>
        </section>
    );
}
