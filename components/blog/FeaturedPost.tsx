import Image from "next/image";
import Link from "next/link";

export default function FeaturedPost() {
    return (
        <section className="featured-post-section">
            <div className="featured-post-container">
                <div className="featured-post">
                    <div className="featured-post-image">
                        <Image
                            src="/images/blog-dtls.png"
                            alt="Edge Computing"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="featured-post-content">
                        <div className="blog-post-meta">
                            <span className="blog-post-number">27</span>
                            <span className="blog-post-date white">Nov 2025</span>
                        </div>

                        <h2 className="featured-post-title">
                            The Rise of Edge Computing:
                            <br />
                            Why Your Data Strategy Needs a 2026 Reboot
                        </h2>
                        <p className="featured-post-excerpt">
                            The way we process, store, and analyse data is undergoing a
                            fundamental transformation. For years, cloud computing has been
                            the backbone of digital infrastructure, centralising data
                            processing in massive data centers.
                        </p>
                        <Link href="/blog/the-rise-of-edge-computing" className="featured-post-link">
                            Read more
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
