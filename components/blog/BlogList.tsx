import Image from "next/image";
import Link from "next/link";
import type { BlogListItem } from "@/lib/keystatic";

const fallbackBlogImages = [
    "/images/blog-1.png",
    "/images/blog-2.png",
    "/images/blog-3.png",
];

interface BlogListProps {
    posts: BlogListItem[];
}

export default function BlogList({ posts }: BlogListProps) {
    if (posts.length === 0) {
        return (
            <section className="blog-list-section">
                <div className="blog-list-container">
                    <p className="blog-post-excerpt">No published insights are available right now.</p>
                </div>
            </section>
        );
    }

    return (
        <section className="blog-list-section">
            <div className="blog-list-container">
                {posts.map((post, index) => (
                    <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-post-link">
                        <article className="blog-post">
                            <div className="blog-post-image relative">
                                <Image
                                    src={post.coverImage || fallbackBlogImages[index % fallbackBlogImages.length]}
                                    alt={post.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="blog-post-content">
                                <div className="blog-post-meta">
                                    <span className="blog-post-number">{post.displayDay}</span>
                                    <span className="blog-post-date">{post.displayMonthYear}</span>
                                </div>
                                <h3 className="blog-post-title">{post.title}</h3>
                                <p className="blog-post-excerpt">{post.excerpt}</p>
                            </div>
                        </article>
                    </Link>
                ))}
            </div>
        </section>
    );
}
