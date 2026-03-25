import { createReader } from '@keystatic/core/reader';
import config from './keystatic.config';

async function testReader() {
    console.log('--- Local Keystatic Reader Test ---');

    try {
        const reader = createReader(process.cwd(), config);
        const careers = await reader.collections.careers.all();
        const blogPosts = await reader.collections.blog.all();

        console.log(`Found ${careers.length} careers.`);
        console.log(`Found ${blogPosts.length} blog posts.`);
        console.log('Blog slugs:', blogPosts.map((post: { slug: string }) => post.slug));
    } catch (error) {
        console.error('Reader Error:', error);
    }
}

testReader();
