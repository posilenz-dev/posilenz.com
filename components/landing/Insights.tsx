import { getHomepageBlogPosts } from "@/lib/keystatic";
import InsightsClient from "./InsightsClient";

export default async function Insights() {
    const posts = await getHomepageBlogPosts(3);

    if (posts.length === 0) {
        return null;
    }

    return <InsightsClient posts={posts} />;
}
