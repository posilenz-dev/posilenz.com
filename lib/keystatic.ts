import { createReader } from '@keystatic/core/reader';
import config from '../keystatic.config';

// Create reader instance
export const reader = createReader('', config);

// Career type definition
export interface Career {
    slug: string;
    title: string | null;
    intro: string;
    location: 'remote' | 'hybrid' | 'onsite';
    employmentType: 'full-time' | 'part-time' | 'contract';
    experience: string;
    displayOrder: number;
    isActive: boolean;
    whoYouAre: any;
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
        .filter((career) => career.entry.isActive)
        .sort((a, b) => (a.entry.displayOrder || 0) - (b.entry.displayOrder || 0));

    // Read document content for each career
    const careersWithContent = await Promise.all(
        activeCareers.map(async (career) => {
            const [whoYouAre, roleOverview, whyJoin, content] = await Promise.all([
                career.entry.whoYouAre(),
                career.entry.roleOverview(),
                career.entry.whyJoin(),
                career.entry.content(),
            ]);

            return {
                slug: career.entry.slug || career.slug,
                title: career.entry.title || career.entry.slug || career.slug,
                intro: career.entry.intro,
                location: career.entry.location,
                employmentType: career.entry.employmentType,
                experience: career.entry.experience,
                displayOrder: career.entry.displayOrder || 0,
                isActive: career.entry.isActive,
                whoYouAre,
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
        if (!career) return null;

        const [whoYouAre, roleOverview, whyJoin, content] = await Promise.all([
            career.whoYouAre(),
            career.roleOverview(),
            career.whyJoin(),
            career.content(),
        ]);

        return {
            slug: career.slug || slug,
            title: career.title || career.slug || slug,
            intro: career.intro,
            location: career.location,
            employmentType: career.employmentType,
            experience: career.experience,
            displayOrder: career.displayOrder || 0,
            isActive: career.isActive,
            whoYouAre,
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
export function formatLocation(location: string): string {
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

