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

        // Play the animation on page load, then reverse back to original state
        const tl = gsap.timeline({
            delay: 0.8,
        });

        // Animate to clear text (only show/hide clear text)
        tl.to(".hero-clear-text", {
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
        })
        // Hold for a moment
        .to({}, { duration: 0.5 })
        // Reverse back to loader text
        .to(".hero-clear-text", {
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            onComplete: () => {
                // Clear GSAP inline styles so CSS hover can take over
                gsap.set(".hero-loader-text", { clearProps: "all" });
                gsap.set(".hero-clear-text", { clearProps: "all" });
                setHasAnimated(true);
            },
        });
    });

    return (
        <section id="hero" className="hero-container section flex items-center justify-center">
            <div className="container mx-auto flex flex-col items-center justify-center">
                <div className="hero-content w-full">
                    <div className="hero-animate">
                    <div className={`hero-interactive ${hasAnimated ? "animation-complete" : ""}`}>
                        {/* SVG Loader Pattern Text (shown by default) */}
                        <div className="hero-loader-text">
                            <Image
                                src="/images/hero-text.svg"
                                alt="Posilenz Text"
                                width={800}
                                height={200}
                                className="desktop h-auto"
                                priority
                            />
                            <Image
                                src="/images/mob-hero-text.png"
                                alt="Posilenz Text"
                                width={600}
                                height={100}
                                className="mob w-full h-auto !p-[30px]"
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
                                className="desktop h-auto"
                                priority
                            />
                            <Image
                                src="/images/mob-hero-text.png"
                                alt="Posilenz Text Hover"
                                width={600}
                                height={100}
                                className="mob w-full h-auto !p-[30px]"
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
            </div>
        </section>
    );
}
