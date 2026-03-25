"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import type { BlogListItem } from "@/lib/keystatic";

import "swiper/css";
import "swiper/css/navigation";

const fallbackInsightImages = [
    "/images/news-1.png",
    "/images/news-2.png",
    "/images/news-3.png",
    "/images/news-4.png",
];

interface InsightsClientProps {
    posts: BlogListItem[];
}

export default function InsightsClient({ posts }: InsightsClientProps) {
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
                        {posts.map((post, index) => (
                            <SwiperSlide key={post.slug}>
                                <Link href={`/blog/${post.slug}`} className="insight-card-link">
                                    <article
                                        className="insight-card"
                                        style={{
                                            ['--insight-card-image' as string]: `url(${post.coverImage || fallbackInsightImages[index % fallbackInsightImages.length]})`,
                                        }}
                                    >
                                        <div className="insight-content">
                                            <p className="insight-category">{post.titleEyebrow}</p>
                                            <h3 className="insight-title-text">{post.titleBody}</h3>
                                        </div>
                                        <div className="insight-footer">
                                            <span className="insight-date-number">{post.displayDay}</span>
                                            <span className="insight-date-text">{post.displayMonthYear}</span>
                                        </div>
                                    </article>
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
}
