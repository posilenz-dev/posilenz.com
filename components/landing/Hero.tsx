"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useState } from "react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(useGSAP);
}

export default function Hero() {
    const [hasAnimated, setHasAnimated] = useState(false);

    useGSAP(() => {
        // Hero subtitle animation
        gsap.from(".hero-subtitle", {
            duration: 1,
            opacity: 0,
            y: 30,
            ease: "power2.out",
            delay: 0.5,
        });

        // Play the hover animation once on page load
        const tl = gsap.timeline({
            delay: 0.8,
            onComplete: () => setHasAnimated(true),
        });

        tl.to(".hero-loader-text", {
            opacity: 0,
            filter: "blur(3px)",
            duration: 0.6,
            ease: "power2.out",
        }).to(".hero-clear-text", {
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
        }, "-=0.4");
    });

    return (
        <section id="hero" className="hero-container section flex items-center justify-center">
            <div className="container mx-auto flex flex-col items-center justify-center">
                <div className="hero-content w-full">
                    <div className={`hero-interactive ${hasAnimated ? "animation-complete" : ""}`}>
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
                                width={800}
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
