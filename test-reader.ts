import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

import { reader } from './lib/keystatic';

async function testReader() {
    console.log('--- Keystatic Reader Test ---');
    console.log('NODE_ENV:', process.env.NODE_ENV);
    console.log('NEXT_PUBLIC_KEYSTATIC_MODE:', process.env.NEXT_PUBLIC_KEYSTATIC_MODE);
    console.log('KEYSTATIC_GITHUB_TOKEN exists:', !!process.env.KEYSTATIC_GITHUB_TOKEN);

    try {
        const careers = await reader.collections.careers.all();
        console.log('Found careers:', careers.map(c => c.slug));

        if (careers.some(c => c.slug === 'asd-asd-asd')) {
            console.log('SUCCESS: Read "asd-asd-asd" from GitHub!');
        } else {
            console.log('FAILURE: Still reading from local (only local slugs found).');
        }
    } catch (error) {
        console.error('Error during reader test:', error);
    }
}

testReader();
