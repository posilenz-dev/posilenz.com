import Image from "next/image";
import Link from "next/link";
import type { BlogListItem } from "@/lib/keystatic";

interface FeaturedPostProps {
    post: BlogListItem | null;
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
    if (!post) {
        return null;
    }

    return (
        <section className="featured-post-section">
            <div className="featured-post-container">
                <div className="featured-post">
                    <div className="featured-post-image">
                        <Image
                            src={post.coverImage || "/images/og-image.png"}
                            alt={post.title}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="featured-post-content">
                        <div className="blog-post-meta">
                            <span className="blog-post-number">{post.displayDay}</span>
                            <span className="blog-post-date white">{post.displayMonthYear}</span>
                        </div>

                        <h2 className="featured-post-title">{post.title}</h2>
                        <p className="featured-post-excerpt">{post.excerpt}</p>
                        <Link href={`/blog/${post.slug}`} className="featured-post-link">
                            Read more
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
