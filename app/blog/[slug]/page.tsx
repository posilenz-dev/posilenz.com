"use client";

import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import SharePopup from "@/components/blog/SharePopup";
import { blogPosts } from "@/lib/blogData";

export default function BlogDetailPage() {
    const { slug } = useParams();
    const [isShareOpen, setIsShareOpen] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    const post = blogPosts.find((p) => p.slug === slug);

    useEffect(() => {
        const handleScroll = () => {
            const article = document.querySelector(".article-content-section");
            if (article) {
                // @ts-ignore
                const articleTop = article.offsetTop;
                const articleHeight = (article as HTMLElement).offsetHeight;
                const windowHeight = window.innerHeight;
                const scrollTop = window.scrollY;

                const progress = Math.min(
                    Math.max(
                        (scrollTop - articleTop + windowHeight) / articleHeight,
                        0
                    ),
                    1
                );
                setScrollProgress(progress * 100);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (!post) {
        // You might want to handle this better, maybe with a loading state or notFound() 
        // but in client component strict notFound() usage has caveats. 
        // For now rendering minimal "Not Found" if check fails immediately.
        // However since params are async in Next 15+ sometimes, checking slug existence:
        if (typeof slug === "string") return notFound();
        return <div>Loading...</div>;
    }

    return (
        <>
            <div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: `${scrollProgress}%`,
                    height: "3px",
                    backgroundColor: "#0047FF",
                    zIndex: 1000,
                    transition: "width 0.1s ease",
                }}
            />
            <Navbar />

            <section className="article-header-section">
                <div className="article-header-container">
                    {/* Breadcrumb */}
                    <nav className="breadcrumb">
                        <Link href="/blog" className="breadcrumb-link">
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M10 12L6 8L10 4"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            All News
                        </Link>
                    </nav>

                    <div className="article-header-content">
                        <div className="article-header-left">
                            {/* Article Meta */}
                            <div className="article-meta">
                                <span className="article-number">{post.number}</span>
                                <span className="article-date">{post.date}</span>
                            </div>

                            {/* Article Title */}
                            <h1 className="article-title">{post.title}</h1>

                            {/* Share Button */}
                            <button
                                className="share-btn"
                                aria-label="Share article"
                                onClick={() => setIsShareOpen(true)}
                            >
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M15 6.66667C16.3807 6.66667 17.5 5.54738 17.5 4.16667C17.5 2.78595 16.3807 1.66667 15 1.66667C13.6193 1.66667 12.5 2.78595 12.5 4.16667C12.5 5.54738 13.6193 6.66667 15 6.66667Z"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M5 12.5C6.38071 12.5 7.5 11.3807 7.5 10C7.5 8.61929 6.38071 7.5 5 7.5C3.61929 7.5 2.5 8.61929 2.5 10C2.5 11.3807 3.61929 12.5 5 12.5Z"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M15 18.3333C16.3807 18.3333 17.5 17.214 17.5 15.8333C17.5 14.4526 16.3807 13.3333 15 13.3333C13.6193 13.3333 12.5 14.4526 12.5 15.8333C12.5 17.214 13.6193 18.3333 15 18.3333Z"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M7.15833 11.175L12.85 14.6583"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M12.8417 5.34167L7.15833 8.825"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                        </div>

                        <div className="article-header-right">
                            <div className="article-hero-image">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    width={800}
                                    height={400} // Approximate aspect ratio
                                    priority
                                />
                            </div>

                            <div
                                className="article-content"
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Wrapper div for content section targeting by progress bar script mainly */}
            <div className="article-content-section" style={{ height: 0, padding: 0 }}></div>

            <Footer />
            <SharePopup
                isOpen={isShareOpen}
                onClose={() => setIsShareOpen(false)}
                title={post.title}
            />
        </>
    );
}
