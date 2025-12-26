"use client";

import { useState } from "react";

export default function BlogHero() {
    const [activeCategory, setActiveCategory] = useState("news");

    return (
        <section className="blog-hero-section">
            <div className="blog-hero-container">
                <h1 className="blog-hero-title">Insights</h1>

                <div className="blog-tabs">
                    <button
                        className={`blog-tab ${activeCategory === "news" ? "active" : ""}`}
                        onClick={() => setActiveCategory("news")}
                        data-category="news"
                    >
                        News
                    </button>
                    {/*           <button
            className={`blog-tab ${activeCategory === "in-the-media" ? "active" : ""}`}
            onClick={() => setActiveCategory("in-the-media")}
            data-category="in-the-media"
          >
            In the Media
          </button>
          <button
            className={`blog-tab ${activeCategory === "video" ? "active" : ""}`}
            onClick={() => setActiveCategory("video")}
            data-category="video"
          >
            Video
          </button>
          <button
            className={`blog-tab ${activeCategory === "photos" ? "active" : ""}`}
            onClick={() => setActiveCategory("photos")}
            data-category="photos"
          >
            Photos
          </button> */}
                </div>
            </div>
        </section>
    );
}
