"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";

if (typeof window !== "undefined") {
    gsap.registerPlugin(useGSAP);
}

export default function Hero() {
    useGSAP(() => {
        // Hero subtitle animation
        gsap.from(".hero-subtitle", {
            duration: 1,
            opacity: 0,
            y: 30,
            ease: "power2.out",
            delay: 0.5,
        });
    });

    return (
        <section id="hero" className="hero-container section">
            <div className="container">
                <div className="hero-content">
                    <div className="hero-interactive">
                        {/* SVG Loader Pattern Text (shown by default) */}
                        <div className="hero-loader-text">
                            <Image
                                src="/images/hero-text.svg"
                                alt="Posilenz Text"
                                width={800}
                                height={200}
                                className="desktop w-full h-auto"
                                priority
                            />
                            <Image
                                src="/images/mob-hero-text.png"
                                alt="Posilenz Text"
                                width={400}
                                height={100}
                                className="mob w-full h-auto"
                                priority
                            />
                        </div>

                        {/* Clear Text (shown on hover) */}
                        <div className="hero-clear-text">
                            <Image
                                src="/images/hero-text-hover.svg"
                                alt="Posilenz Text Hover"
                                width={800}
                                height={200}
                                className="desktop w-full h-auto"
                                priority
                            />
                            <Image
                                src="/images/mob-hero-text.png"
                                alt="Posilenz Text Hover"
                                width={400}
                                height={100}
                                className="mob w-full h-auto"
                                priority
                            />
                        </div>
                    </div>

                    <p className="hero-subtitle">
                        Posilenz integrates systems, unifies disparate data, and builds
                        predictable workflows so your organisation operates with structured
                        certainty, confidence and clarity.
                    </p>
                </div>
            </div>
        </section>
    );
}
