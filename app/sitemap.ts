import type { MetadataRoute } from "next";
import {
    SITE_URL,
    getBlogPostsForSitemap,
} from "@/lib/keystatic";

export const revalidate = 60;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const posts = await getBlogPostsForSitemap();

    return [
        {
            url: SITE_URL,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: `${SITE_URL}/blog`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${SITE_URL}/careers`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.7,
        },
        ...posts.map((post) => ({
            url: `${SITE_URL}/blog/${post.slug}`,
            lastModified: new Date(`${post.publishDate}T00:00:00.000Z`),
            changeFrequency: "monthly" as const,
            priority: 0.8,
        })),
    ];
}
