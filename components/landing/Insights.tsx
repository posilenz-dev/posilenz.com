"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";

export default function Insights() {
    const [activeTab, setActiveTab] = useState("News");
    const gridRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [currentScroll, setCurrentScroll] = useState(0);
    const touchStart = useRef<number>(0);
    const touchEnd = useRef<number>(0);

    // Carousel Logic
    const gap = 24;

    const scrollTo = (scroll: number) => {
        if (gridRef.current) {
            gridRef.current.style.transform = `translateX(-${scroll}px)`;
        }
        setCurrentScroll(scroll);
    };

    const getMaxScroll = () => {
        if (!gridRef.current || !wrapperRef.current) return 0;
        const card = gridRef.current.querySelector('.insight-card') as HTMLElement;
        if (!card) return 0;

        // Assuming 3 cards for now based on static content
        const cards = gridRef.current.querySelectorAll('.insight-card');
        const cardWidth = card.offsetWidth;
        const totalWidth = (cardWidth * cards.length) + (gap * (cards.length - 1));
        const wrapperWidth = wrapperRef.current.offsetWidth;
        return Math.max(0, totalWidth - wrapperWidth);
    };

    const getScrollStep = () => {
        if (!gridRef.current) return 0;
        const card = gridRef.current.querySelector('.insight-card') as HTMLElement;
        return card ? card.offsetWidth + gap : 0;
    };

    const nextSlide = () => {
        const maxScroll = getMaxScroll();
        const scrollStep = getScrollStep();
        scrollTo(Math.min(currentScroll + scrollStep, maxScroll));
    };

    const prevSlide = () => {
        const scrollStep = getScrollStep();
        scrollTo(Math.max(currentScroll - scrollStep, 0));
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStart.current = e.targetTouches[0].clientX;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEnd.current = e.targetTouches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (!touchStart.current || !touchEnd.current) return;

        const distance = touchStart.current - touchEnd.current;

        if (Math.abs(distance) > 50) {
            if (distance > 0) nextSlide();
            else prevSlide();
        }

        touchStart.current = 0;
        touchEnd.current = 0;
    };

    return (
        <section id="insights" className="insights-section section">
            <div className="insights-container">
                <h2 className="insights-title">Insights That Drive Progress</h2>

                <div className="insights-tab-head">
                    <div className="insights-tabs">
                        <button
                            className={`insights-tab ${activeTab === "News" ? "active" : ""}`}
                            onClick={() => setActiveTab("News")}
                        >
                            News
                        </button>
                        {/* <button class="insights-tab">In the Media</button> */}
                    </div>

                    <div className="insights-nav">
                        <button
                            className="insights-nav-btn insights-prev"
                            onClick={prevSlide}
                            style={{ opacity: currentScroll <= 0 ? 0.3 : 1 }}
                        >
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M19 12H5M5 12L12 19M5 12L12 5"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                        <button
                            className="insights-nav-btn insights-next"
                            onClick={nextSlide}
                            style={{ opacity: currentScroll >= getMaxScroll() && getMaxScroll() > 0 ? 0.3 : 1 }}
                        >
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
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                <div
                    className="insights-carousel-wrapper"
                    ref={wrapperRef}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    <div className="insights-grid" ref={gridRef}>
                        {/* Article 1 */}
                        <Link href="/blog-detail" className="insight-card-link">
                            <article className="insight-card card-img-1">
                                <div className="insight-content">
                                    <p className="insight-category">The Rise of Edge Computing:</p>
                                    <h3 className="insight-title-text">
                                        Why Your Data Strategy Needs a 2026 Reboot
                                    </h3>
                                </div>
                                <div className="insight-footer">
                                    <span className="insight-date-number">10</span>
                                    <span className="insight-date-text">Dec 2025</span>
                                </div>
                            </article>
                        </Link>

                        {/* Article 2 */}
                        <Link href="/cloud-erp-implementation" className="insight-card-link">
                            <article className="insight-card card-img-2">
                                <div className="insight-content">
                                    <p className="insight-category">Cloud ERP Implementation:</p>
                                    <h3 className="insight-title-text">
                                        Avoiding the Three Most Common Integration Pitfalls
                                    </h3>
                                </div>
                                <div className="insight-footer">
                                    <span className="insight-date-number">27</span>
                                    <span className="insight-date-text">Nov 2025</span>
                                </div>
                            </article>
                        </Link>

                        {/* Article 3 */}
                        <Link href="/human-centric-ui-ux" className="insight-card-link">
                            <article className="insight-card card-img-3">
                                <div className="insight-content">
                                    <p className="insight-category">How 'Human-Centric' UI/</p>
                                    <h3 className="insight-title-text">
                                        UX Design Drives Adoption in Enterprise Software
                                    </h3>
                                </div>
                                <div className="insight-footer">
                                    <span className="insight-date-number">12</span>
                                    <span className="insight-date-text">Sep 2025</span>
                                </div>
                            </article>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
