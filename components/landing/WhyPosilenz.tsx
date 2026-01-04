"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useState, useRef, useEffect } from "react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function WhyPosilenz() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const gridRef = useRef<HTMLDivElement>(null);
    const touchStart = useRef<number>(0);
    const touchEnd = useRef<number>(0);

    // GSAP Animation for title and cards
    useGSAP(() => {
        // Why section animations
        gsap.from(".why-title", {
            duration: 1,
            opacity: 0,
            y: 50,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".why-section",
                start: "top 80%",
            },
        });

        // Card scroll animations
        const cards = document.querySelectorAll(".why-card");
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("animate-in");
                        // Add initial-hover class to trigger icon animation on first view
                        entry.target.classList.add("initial-hover");
                        // Remove initial-hover after animation completes so hover can work
                        setTimeout(() => {
                            entry.target.classList.remove("initial-hover");
                        }, 1000);
                    }
                });
            },
            { threshold: 0.2, rootMargin: "0px 0px -100px 0px" }
        );

        cards.forEach((card) => observer.observe(card));

        return () => observer.disconnect();
    }, []);

    // Sync carousel with state (Mobile only logic essentially via CSS transform)
    useEffect(() => {
        const updateCarousel = () => {
            if (window.innerWidth <= 768 && gridRef.current) {
                const translateX = -currentIndex * 100;
                gridRef.current.style.transform = `translateX(${translateX}%)`;
            } else if (gridRef.current) {
                gridRef.current.style.transform = "none";
            }
        };

        updateCarousel();
        window.addEventListener("resize", updateCarousel);
        return () => window.removeEventListener("resize", updateCarousel);
    }, [currentIndex]);

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStart.current = e.targetTouches[0].clientX;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEnd.current = e.targetTouches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (window.innerWidth > 768) return;

        if (!touchStart.current || !touchEnd.current) return;

        const distance = touchStart.current - touchEnd.current;

        // Threshold for swipe
        if (Math.abs(distance) > 50) {
            if (distance > 0 && currentIndex < 2) {
                setCurrentIndex((prev) => prev + 1);
            } else if (distance < 0 && currentIndex > 0) {
                setCurrentIndex((prev) => prev - 1);
            }
        }

        // Reset
        touchStart.current = 0;
        touchEnd.current = 0;
    };

    return (
        <section className="why-section section">
            <div className="why-container">
                <h2 className="why-title">Why Posilenz</h2>

                <div
                    className="why-grid"
                    ref={gridRef}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    {/* Feature 1: Multi-Domain Expertise */}
                    <div className="why-card multi-domain">
                        <div className="why-icon-container">
                            <div className="why-icon multi-domain-icon">
                                <svg viewBox="0 0 300 150" xmlns="http://www.w3.org/2000/svg">
                                    <circle
                                        className="circle-1"
                                        cx="100"
                                        cy="75"
                                        r="65"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1"
                                    />
                                    <circle
                                        className="circle-4"
                                        cx="120"
                                        cy="75"
                                        r="65"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1"
                                    />
                                    <circle
                                        className="circle-2"
                                        cx="140"
                                        cy="75"
                                        r="65"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1"
                                    />
                                    <circle
                                        className="circle-3"
                                        cx="180"
                                        cy="75"
                                        r="65"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1"
                                    />
                                    <circle
                                        className="circle-5"
                                        cx="160"
                                        cy="75"
                                        r="65"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1"
                                    />
                                </svg>
                            </div>
                        </div>
                        <div className="why-card-content">
                            <h3 className="why-card-title">Multi-Domain Expertise</h3>
                            <p className="why-card-description">
                                Expertise in IT consulting, enterprise solutions, branding, &
                                design – global talents managed through one integrated
                                structure.
                            </p>
                        </div>
                    </div>

                    {/* Feature 2: Intelligent, Efficient Systems */}
                    <div className="why-card atomic-card">
                        <div className="why-icon-container">
                            <div className="why-icon atomic-icon">
                                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                                    {/* Center nucleus */}
                                    <circle
                                        cx="100"
                                        cy="100"
                                        r="15"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1"
                                        className="nucleus"
                                    />

                                    {/* Outer boundary circle */}
                                    <circle
                                        cx="100"
                                        cy="100"
                                        r="65"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1"
                                        className="orbit orbit-boundary"
                                    />

                                    {/* Six main intersecting ellipses forming the sacred geometry pattern */}
                                    <ellipse
                                        cx="100"
                                        cy="100"
                                        rx="30"
                                        ry="65"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1"
                                        className="orbit orbit-1"
                                    />
                                    <ellipse
                                        cx="100"
                                        cy="100"
                                        rx="30"
                                        ry="65"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1"
                                        className="orbit orbit-2"
                                        transform="rotate(90 100 100)"
                                    />
                                    <ellipse
                                        cx="100"
                                        cy="100"
                                        rx="30"
                                        ry="65"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1"
                                        className="orbit orbit-3"
                                        transform="rotate(130 100 100)"
                                    />
                                    <ellipse
                                        cx="100"
                                        cy="100"
                                        rx="30"
                                        ry="65"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1"
                                        className="orbit orbit-5"
                                        transform="rotate(230 100 100)"
                                    />
                                </svg>
                            </div>
                        </div>
                        <div className="why-card-content">
                            <h3 className="why-card-title">
                                Intelligent, Efficient Systems
                            </h3>
                            <p className="why-card-description">
                                Every solution is engineered for absolute clarity, precise
                                performance, and verifiable, measurable business outcomes.
                            </p>
                        </div>
                    </div>

                    {/* Feature 3: Future-Ready Approach */}
                    <div className="why-card sphere-card">
                        <div className="why-icon-container">
                            <div className="why-icon sphere-icon">
                                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                                    {/* Outer sphere circle */}
                                    <circle
                                        cx="100"
                                        cy="100"
                                        r="65"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1"
                                        className="sphere-outline"
                                    />

                                    {/* Main vertical meridian lines (always visible - blue) */}
                                    <ellipse
                                        cx="100"
                                        cy="100"
                                        rx="45"
                                        ry="65"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1"
                                        className="meridian meridian-main-1"
                                    />
                                    <ellipse
                                        cx="100"
                                        cy="100"
                                        rx="23"
                                        ry="65"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1"
                                        className="meridian meridian-main-2"
                                    />

                                    {/* Central vertical line (always visible) */}
                                    <line
                                        x1="100"
                                        y1="35"
                                        x2="100"
                                        y2="165"
                                        stroke="currentColor"
                                        strokeWidth="1"
                                        className="meridian meridian-center"
                                    />

                                    {/* Additional meridian lines (appear on hover - white) */}
                                    <ellipse
                                        cx="100"
                                        cy="100"
                                        rx="55"
                                        ry="65"
                                        fill="none"
                                        stroke="rgba(255, 255, 255, 0.8)"
                                        strokeWidth="1"
                                        className="meridian meridian-hover-1"
                                    />
                                    <ellipse
                                        cx="100"
                                        cy="100"
                                        rx="35"
                                        ry="65"
                                        fill="none"
                                        stroke="rgba(255, 255, 255, 0.8)"
                                        strokeWidth="1"
                                        className="meridian meridian-hover-4"
                                    />
                                    <ellipse
                                        cx="100"
                                        cy="100"
                                        rx="15"
                                        ry="65"
                                        fill="none"
                                        stroke="rgba(255, 255, 255, 0.8)"
                                        strokeWidth="1"
                                        className="meridian meridian-hover-6"
                                    />
                                </svg>
                            </div>
                        </div>
                        <div className="why-card-content">
                            <h3 className="why-card-title">Future-Ready Approach</h3>
                            <p className="why-card-description">
                                AI-integrated solutions and structured methodologies built to
                                perpetually evolve with your accelerating business needs.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Carousel Indicators (Mobile Only) */}
                <div className="why-carousel-indicators">
                    {[0, 1, 2].map((index) => (
                        <span
                            key={index}
                            className={`why-indicator ${currentIndex === index ? "active" : ""}`}
                            onClick={() => setCurrentIndex(index)}
                        ></span>
                    ))}
                </div>
            </div>
        </section>
    );
}
