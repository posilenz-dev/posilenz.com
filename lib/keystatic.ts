import { createReader } from '@keystatic/core/reader';
import config from '../keystatic.config';

// Create reader instance
export const reader = createReader('', config);

// Career type definition
export interface Career {
    slug: string;
    title: string;
    intro: string;
    workmode: 'remote' | 'hybrid' | 'onsite';
    location: string;
    employmentType: 'full-time' | 'part-time' | 'contract';
    experience: string;
    displayOrder: number;
    isActive: boolean;
    roleOverview: any;
    keyResponsibilities: readonly string[];
    skillsExperience: readonly string[];
    whatYoullBring: readonly string[];
    whyJoin: any;
    content: any;
}

// Get all active careers sorted by display order
export async function getCareers(): Promise<Career[]> {
    const careers = await reader.collections.careers.all();

    const activeCareers = careers
        .filter((career) => career.entry.isActive && career.entry.title) // Filter out careers without titles
        .sort((a, b) => (a.entry.displayOrder || 0) - (b.entry.displayOrder || 0));

    // Read document content for each career
    const careersWithContent = await Promise.all(
        activeCareers.map(async (career) => {
            const [ roleOverview, whyJoin, content] = await Promise.all([
                career.entry.roleOverview(),
                career.entry.whyJoin(),
                career.entry.content(),
            ]);

            return {
                slug: career.entry.slug || career.slug,
                title: career.entry.title as string, // Safe assertion since we filtered nulls
                intro: career.entry.intro,
                workmode: career.entry.workmode,
                location: career.entry.location,
                employmentType: career.entry.employmentType,
                experience: career.entry.experience,
                displayOrder: career.entry.displayOrder || 0,
                isActive: career.entry.isActive,
                roleOverview,
                keyResponsibilities: career.entry.keyResponsibilities,
                skillsExperience: career.entry.skillsExperience,
                whatYoullBring: career.entry.whatYoullBring,
                whyJoin,
                content,
            };
        })
    );

    return careersWithContent;
}

// Get a single career by slug
export async function getCareerBySlug(slug: string): Promise<Career | null> {
    try {
        const career = await reader.collections.careers.read(slug);
        if (!career || !career.title) return null; // Return null if no career or no title

        const [ roleOverview, whyJoin, content] = await Promise.all([
            career.roleOverview(),
            career.whyJoin(),
            career.content(),
        ]);

        return {
            slug: career.slug || slug,
            title: career.title as string, // Safe assertion since we checked for null above
            intro: career.intro,
            location: career.location,
            workmode: career.workmode,
            employmentType: career.employmentType,
            experience: career.experience,
            displayOrder: career.displayOrder || 0,
            isActive: career.isActive,
            roleOverview,
            keyResponsibilities: career.keyResponsibilities,
            skillsExperience: career.skillsExperience,
            whatYoullBring: career.whatYoullBring,
            whyJoin,
            content,
        };
    } catch (error) {
        console.error(`Error fetching career with slug "${slug}":`, error);
        return null;
    }
}

// Helper to format location display
export function formatWorkMode(location: string): string {
    const locationMap: Record<string, string> = {
        remote: 'Remote',
        hybrid: 'Hybrid',
        onsite: 'On-site',
    };
    return locationMap[location] || location;
}

// Helper to format employment type display
export function formatEmploymentType(type: string): string {
    const typeMap: Record<string, string> = {
        'full-time': 'Full-time',
        'part-time': 'Part-time',
        contract: 'Contract',
    };
    return typeMap[type] || type;
}

