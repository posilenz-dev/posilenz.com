import { notFound } from "next/navigation";
import { Metadata } from "next";
import { blogPosts } from "@/lib/blogData";
import BlogDetailClient from "@/components/blog/BlogDetailClient";

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = blogPosts.find((p) => p.slug === slug);

    if (!post) {
        return {
            title: "Article Not Found - Posilenz",
        };
    }

    return {
        title: `${post.title} - Posilenz Insights`,
        description: post.excerpt || post.title,
        openGraph: {
            title: post.title,
            description: post.excerpt || post.title,
            images: [post.image],
        },
    };
}

export async function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function BlogDetailPage({ params }: Props) {
    const { slug } = await params;
    const post = blogPosts.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    return <BlogDetailClient post={post} />;
}
