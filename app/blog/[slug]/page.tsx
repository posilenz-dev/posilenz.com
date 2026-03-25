import { notFound } from "next/navigation";
import { Metadata } from "next";
import BlogDetailClient from "@/components/blog/BlogDetailClient";
import {
    DEFAULT_OG_IMAGE,
    SITE_URL,
    getBlogPostBySlug,
} from "@/lib/keystatic";

type Props = {
    params: Promise<{ slug: string }>;
};

export const revalidate = 60;
export const dynamicParams = true;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = await getBlogPostBySlug(slug);

    if (!post) {
        return {
            title: "Article Not Found - Posilenz",
        };
    }

    return {
        title: `${post.title} - Posilenz Insights`,
        description: post.excerpt || post.title,
        alternates: {
            canonical: `/blog/${post.slug}`,
        },
        openGraph: {
            title: post.title,
            description: post.excerpt || post.title,
            url: `${SITE_URL}/blog/${post.slug}`,
            type: "article",
            images: [post.coverImage || DEFAULT_OG_IMAGE],
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.excerpt || post.title,
            images: [post.coverImage || DEFAULT_OG_IMAGE],
        },
    };
}

export default async function BlogDetailPage({ params }: Props) {
    const { slug } = await params;
    const post = await getBlogPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        description: post.excerpt,
        datePublished: post.publishDate,
        image: [post.coverImage ? `${SITE_URL}${post.coverImage}` : `${SITE_URL}${DEFAULT_OG_IMAGE}`],
        mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
        publisher: {
            "@type": "Organization",
            name: "Posilenz",
            logo: {
                "@type": "ImageObject",
                url: `${SITE_URL}/images/og-image.png`,
            },
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
            <BlogDetailClient post={post} />
        </>
    );
}
