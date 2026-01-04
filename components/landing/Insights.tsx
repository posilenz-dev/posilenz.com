"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

export default function Insights() {
    const [activeTab, setActiveTab] = useState("News");
    const swiperRef = useRef<SwiperType | null>(null);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    const handlePrev = () => {
        swiperRef.current?.slidePrev();
    };

    const handleNext = () => {
        swiperRef.current?.slideNext();
    };

    const handleSlideChange = (swiper: SwiperType) => {
        setIsBeginning(swiper.isBeginning);
        setIsEnd(swiper.isEnd);
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
                    </div>

                    <div className="insights-nav">
                        <button
                            className="insights-nav-btn insights-prev"
                            onClick={handlePrev}
                            style={{ opacity: isBeginning ? 0.3 : 1 }}
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
                            onClick={handleNext}
                            style={{ opacity: isEnd ? 0.3 : 1 }}
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

                <div className="insights-swiper-wrapper">
                    <Swiper
                        modules={[Navigation]}
                        spaceBetween={24}
                        slidesPerView={1}
                        onSwiper={(swiper) => {
                            swiperRef.current = swiper;
                            setIsEnd(swiper.isEnd);
                        }}
                        onSlideChange={handleSlideChange}
                        breakpoints={{
                            480: {
                                slidesPerView: 1.2,
                                spaceBetween: 16,
                            },
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 24,
                            },
                        }}
                    >
                        {/* Article 1 - The Rise of Edge Computing */}
                        <SwiperSlide>
                            <Link href="/blog/the-rise-of-edge-computing" className="insight-card-link">
                                <article className="insight-card card-img-1">
                                    <div className="insight-content">
                                        <p className="insight-category">The Rise of Edge Computing:</p>
                                        <h3 className="insight-title-text">
                                            Why Your Data Strategy Needs a 2026 Reboot
                                        </h3>
                                    </div>
                                    <div className="insight-footer">
                                        <span className="insight-date-number">27</span>
                                        <span className="insight-date-text">Nov 2025</span>
                                    </div>
                                </article>
                            </Link>
                        </SwiperSlide>

                        {/* Article 2 - Cloud ERP Implementation */}
                        <SwiperSlide>
                            <Link href="/blog/cloud-erp-implementation" className="insight-card-link">
                                <article className="insight-card card-img-2">
                                    <div className="insight-content">
                                        <p className="insight-category">Cloud ERP Implementation:</p>
                                        <h3 className="insight-title-text">
                                            Avoiding the Three Most Common Integration Pitfalls
                                        </h3>
                                    </div>
                                    <div className="insight-footer">
                                        <span className="insight-date-number">26</span>
                                        <span className="insight-date-text">Nov 2025</span>
                                    </div>
                                </article>
                            </Link>
                        </SwiperSlide>

                        {/* Article 3 - Human-Centric UI/UX */}
                        <SwiperSlide>
                            <Link href="/blog/human-centric-ui-ux" className="insight-card-link">
                                <article className="insight-card card-img-3">
                                    <div className="insight-content">
                                        <p className="insight-category">How &apos;Human-Centric&apos; UI/UX</p>
                                        <h3 className="insight-title-text">
                                            Design Drives Adoption in Enterprise Software
                                        </h3>
                                    </div>
                                    <div className="insight-footer">
                                        <span className="insight-date-number">25</span>
                                        <span className="insight-date-text">Nov 2025</span>
                                    </div>
                                </article>
                            </Link>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </section>
    );
}
