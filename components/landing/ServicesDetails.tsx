"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useRef, useState, useCallback } from "react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

export default function ServicesDetails() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeService, setActiveService] = useState(0);
    const touchStartX = useRef<number>(0);
    const touchEndX = useRef<number>(0);
    const totalServices = 4;

    useGSAP(
        () => {
            const isDesktop = window.innerWidth > 1000;
            const serviceItems = gsap.utils.toArray<HTMLElement>(".service-detail-item");

            // Initial state
            serviceItems.forEach((item, index) => {
                if (index === 0) item.classList.add("active");
                else item.classList.remove("active");
            });

            // Track the last active index to prevent unnecessary updates
            let lastActiveIndex = 0;

            // Scroll Trigger Config
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top top",
                end: isDesktop ? "+=400%" : "+=300%",
                pin: true,
                scrub: 0.5, // Smoother scrolling with lower scrub value
                onUpdate: (self) => {
                    const progress = self.progress;
                    let activeIndex = 0;

                    // Adjusted thresholds for better distribution and edge case handling
                    if (progress <= 0.2) activeIndex = 0;
                    else if (progress <= 0.45) activeIndex = 1;
                    else if (progress <= 0.7) activeIndex = 2;
                    else activeIndex = 3;

                    if (activeIndex !== lastActiveIndex) {
                        lastActiveIndex = activeIndex;
                        setActiveService(activeIndex);

                        serviceItems.forEach((item, i) => {
                            if (i === activeIndex) {
                                item.classList.add("active");
                            } else {
                                item.classList.remove("active");
                            }
                        });
                    }
                },
            });
        },
        { scope: containerRef, dependencies: [] } // Careful with state dependencies to avoid resetting animation
    );

    const updateActiveService = useCallback((index: number) => {
        setActiveService(index);
        const serviceItems = document.querySelectorAll(".service-detail-item");
        serviceItems.forEach((item, i) => {
            if (i === index) item.classList.add("active");
            else item.classList.remove("active");
        });
    }, []);

    const handleThumbClick = (index: number) => {
        const isDesktop = window.innerWidth > 1000;
        // Only allow click navigation on mobile
        if (!isDesktop && containerRef.current) {
            updateActiveService(index);

            // Calculate scroll position based on service index
            const scrollTriggerInstance = ScrollTrigger.getAll().find(
                (st) => st.trigger === containerRef.current
            );

            if (scrollTriggerInstance) {
                // Calculate the target progress for each service
                const progressMap = [0.1, 0.35, 0.6, 0.85];
                const targetProgress = progressMap[index];

                // Calculate the scroll position
                const start = scrollTriggerInstance.start;
                const end = scrollTriggerInstance.end;
                const targetScroll = start + (end - start) * targetProgress;

                // Scroll to the calculated position
                gsap.to(window, {
                    scrollTo: { y: targetScroll, autoKill: false },
                    duration: 0.5,
                    ease: "power2.out"
                });
            }
        }
    };

    // Touch handlers for swipe navigation on mobile
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.targetTouches[0].clientX;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.targetTouches[0].clientX;
    };

    const handleTouchEnd = () => {
        const isDesktop = window.innerWidth > 1000;
        if (isDesktop) return;

        const distance = touchStartX.current - touchEndX.current;
        const minSwipeDistance = 50;

        if (Math.abs(distance) > minSwipeDistance) {
            if (distance > 0 && activeService < totalServices - 1) {
                // Swipe left - next service
                updateActiveService(activeService + 1);
            } else if (distance < 0 && activeService > 0) {
                // Swipe right - previous service
                updateActiveService(activeService - 1);
            }
        }

        touchStartX.current = 0;
        touchEndX.current = 0;
    };

    return (
        <section id="services" ref={containerRef} className="service-details-section section">
            {/* Service Navigation Thumbnails */}
            <div className="service-nav-thumbs">
                {[
                    "IT Consulting Services",
                    "ERP Solutions",
                    "Knowledge Management",
                    "Creative Technology",
                ].map((label, index) => (
                    <div
                        key={index}
                        className={`service-thumb ${activeService === index ? "active" : ""}`}
                        onClick={() => handleThumbClick(index)}
                    >
                        <span className="thumb-number">0{index + 1}</span>
                        <span className="thumb-label">{label}</span>
                    </div>
                ))}
            </div>

            <div
                className="service-details-wrapper"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {/* Service 1: IT Consulting */}
                <div className={`service-detail-item ${activeService === 0 ? "active" : ""}`}>
                    <div className="service-detail-content">
                        <h3 className="service-detail-title">
                            IT Consulting
                            <br />
                            Services
                        </h3>
                        <h4 className="service-detail-subtitle">
                            From Strategy to Scalable Execution
                        </h4>
                        <p className="service-detail-description">
                            Posilenz provides end-to-end IT consulting to help businesses
                            modernize, scale and optimize operations with absolute clarity. We
                            move beyond planning to build and implement intelligent,
                            future-ready systems across three critical areas: Digital
                            Transformation Roadmaps, Core Technology Modernization (Cloud
                            Migration, Application Development), and Intelligent Automation
                            (AI Integration and Advanced Data Analytics). We streamline
                            operations, improve performance, and enable predictable enterprise
                            growth by delivering structured, future-ready solutions.
                        </p>
                    </div>
                </div>

                {/* Service 2: ERP Solutions */}
                <div className={`service-detail-item ${activeService === 1 ? "active" : ""}`}>
                    <div className="service-detail-content">
                        <h3 className="service-detail-title">ERP Solutions</h3>
                        <h4 className="service-detail-subtitle">
                            Powering Transformation for Intelligent Operations
                        </h4>
                        <p className="service-detail-description">
                            An ERP system is the central nervous system of your business.
                            Posilenz designs, modernises, and manages ERP ecosystems that
                            infuse operations with AI-driven intelligence and scalable
                            reliability. We enable seamless integration, complex automation,
                            and refined crossfunctional workflows, turning ERP from a static
                            system of record into an agile engine of growth.
                        </p>
                        <h4 className="service-detail-sub">
                            Posilenz offers two ERP platforms tailored to different
                            organisational needs.
                        </h4>
                        <ul className="service-detail-list">
                            <li>BEX® – On-premise ERP</li>
                            <li>Unyton® – SaaS ERP (Cloud-based)</li>
                        </ul>
                    </div>
                </div>

                {/* Service 3: Knowledge Management */}
                <div className={`service-detail-item ${activeService === 2 ? "active" : ""}`}>
                    <div className="service-detail-content">
                        <h3 className="service-detail-title">Knowledge Management</h3>
                        <h4 className="service-detail-subtitle">
                            Strategic Talent Augmentation & Outsourcing
                        </h4>
                        <p className="service-detail-description">
                            Your digital roadmap needs specialised skills and flexible
                            capacity across technical and commercial roles. Posilenz provides
                            Talent Augmentation and Knowledge Process Management so you can
                            scale quickly while staying aligned with business goals. We give
                            you fast access to vetted experts—AI specialists, enterprise
                            architects, IT consultants, market data analysts, and brand
                            consultants through flexible, well-governed models that accelerate
                            delivery, maintain quality, and increase capacity without adding
                            permanent headcount.
                        </p>
                    </div>
                </div>

                {/* Service 4: Creative Technology */}
                <div className={`service-detail-item ${activeService === 3 ? "active" : ""}`}>
                    <div className="service-detail-content">
                        <h3 className="service-detail-title">Creative Technology</h3>
                        <h4 className="service-detail-subtitle">
                            Brand Thinking to Measurable Results
                        </h4>
                        <p className="service-detail-description">
                            We bring brand strategy, design, technology, and digital marketing
                            into one integrated practice. The team takes you from brand
                            foundations and positioning through UX/UI and product design to
                            websites, apps, portals, and e-commerce experiences.
                            Performance-driven campaigns ensure your digital marketing closes
                            the loop and are designed to be found, used, and measured, giving
                            you one expert partner across your entire digital journey.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
