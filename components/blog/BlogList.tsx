import Image from "next/image";
import Link from "next/link";

export default function BlogList() {
    return (
        <section className="blog-list-section">
            <div className="blog-list-container">
                {/* Blog Post 1 - Cloud ERP Implementation */}
                <Link href="/blog/cloud-erp-implementation" className="blog-post-link">
                    <article className="blog-post">
                        <div className="blog-post-image relative">
                            <Image
                                src="/images/blog-1.png"
                                alt="Cloud ERP Implementation"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="blog-post-content">
                            <div className="blog-post-meta">
                                <span className="blog-post-number">26</span>
                                <span className="blog-post-date">Nov 2025</span>
                            </div>
                            <h3 className="blog-post-title">
                                Cloud ERP Implementation: Avoiding the Three Most Common
                                Integration Pitfalls
                            </h3>
                            <p className="blog-post-excerpt">
                                Enterprise Resource Planning systems have migrated to the cloud,
                                promising unprecedented flexibility, scalability, and cost
                                efficiency.
                            </p>
                        </div>
                    </article>
                </Link>

                {/* Blog Post 2 - Human-Centric UI/UX */}
                <Link href="/blog/human-centric-ui-ux" className="blog-post-link">
                    <article className="blog-post">
                        <div className="blog-post-image relative">
                            <Image
                                src="/images/blog-2.png"
                                alt="UI/UX Design"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="blog-post-content">
                            <div className="blog-post-meta">
                                <span className="blog-post-number">25</span>
                                <span className="blog-post-date">Nov 2025</span>
                            </div>
                            <h3 className="blog-post-title">
                                How 'Human-Centric' UI/UX Design Drives Adoption in Enterprise
                                Software
                            </h3>
                            <p className="blog-post-excerpt">
                                Enterprise software has long suffered from a reputation problem:
                                powerful functionality buried beneath frustrating interfaces
                                that users actively resist.
                            </p>
                        </div>
                    </article>
                </Link>
            </div>
        </section>
    );
}
