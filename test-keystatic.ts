import { createReader } from '@keystatic/core/reader';
import config from './keystatic.config';

async function testReader() {
    console.log("Initializing reader...");
    try {
        const reader = createReader('', config);
        console.log("Fetching careers...");
        const careers = await reader.collections.careers.all();
        console.log(`Found ${careers.length} careers in GitHub storage!`);
        for (const c of careers) {
            console.log(`- ${c.slug}: ${c.entry.title}`);
        }
    } catch (err) {
        console.error("Reader Error:", err);
    }
}

testReader();
