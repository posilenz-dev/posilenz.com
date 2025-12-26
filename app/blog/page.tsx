import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import BlogHero from "@/components/blog/BlogHero";
import FeaturedPost from "@/components/blog/FeaturedPost";
import BlogList from "@/components/blog/BlogList";

export default function BlogPage() {
    return (
        <main>
            <Navbar />
            <BlogHero />
            <FeaturedPost />
            <BlogList />
            <Footer />
        </main>
    );
}
