import type { Metadata } from "next";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import BlogHero from "@/components/blog/BlogHero";
import FeaturedPost from "@/components/blog/FeaturedPost";
import BlogList from "@/components/blog/BlogList";
import { getPublishedBlogPosts } from "@/lib/keystatic";

export const revalidate = 60;

export const metadata: Metadata = {
    title: "Insights - Posilenz",
    description: "Explore Posilenz insights on intelligent systems, enterprise platforms, and AI-led transformation.",
    alternates: {
        canonical: "/blog",
    },
};

export default async function BlogPage() {
    const posts = await getPublishedBlogPosts();
    const [featuredPost, ...remainingPosts] = posts;

    return (
        <main>
            <Navbar />
            <BlogHero />
            <FeaturedPost post={featuredPost || null} />
            <BlogList posts={remainingPosts} />
            <Footer />
        </main>
    );
}
