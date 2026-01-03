import { config, fields, collection } from '@keystatic/core';

const keystaticConfig = config({
    storage: {
        kind: 'github',
        repo: {
            owner: 'sarath-ps',
            name: 'posilenz.com'
        }
    },
    collections: {
        careers: collection({
            label: 'Careers',
            slugField: 'slug',
            path: 'content/careers/*/',
            schema: {
                slug: fields.slug({
                    name: {
                        label: 'Job Slug',
                        description: 'URL-friendly identifier (e.g., senior-developer)'
                    }
                }),
                title: fields.text({ label: 'Job Title', validation: { isRequired: true } }),
                intro: fields.text({
                    label: 'Short Introduction',
                    description: 'Brief description shown in the collapsed view',
                    multiline: true,
                }),
                location: fields.select({
                    label: 'Location',
                    options: [
                        { label: 'Remote', value: 'remote' },
                        { label: 'Hybrid', value: 'hybrid' },
                        { label: 'On-site', value: 'onsite' },
                    ],
                    defaultValue: 'remote',
                }),
                employmentType: fields.select({
                    label: 'Employment Type',
                    options: [
                        { label: 'Full-time', value: 'full-time' },
                        { label: 'Part-time', value: 'part-time' },
                        { label: 'Contract', value: 'contract' },
                    ],
                    defaultValue: 'full-time',
                }),
                experience: fields.text({
                    label: 'Experience Required',
                    description: 'e.g., "6+ Years", "3-5 Years"',
                }),
                displayOrder: fields.number({
                    label: 'Display Order',
                    description: 'Lower numbers appear first',
                    defaultValue: 1,
                }),
                isActive: fields.checkbox({
                    label: 'Active',
                    description: 'Show this job opening on the website',
                    defaultValue: true,
                }),
                whoYouAre: fields.document({
                    label: 'Who You Are',
                    formatting: true,
                    dividers: true,
                    links: true,
                }),
                roleOverview: fields.document({
                    label: 'Role Overview',
                    formatting: true,
                    dividers: true,
                    links: true,
                }),
                keyResponsibilities: fields.array(
                    fields.text({ label: 'Responsibility' }),
                    {
                        label: 'Key Responsibilities',
                        itemLabel: (props) => props.value || 'Responsibility',
                    }
                ),
                skillsExperience: fields.array(
                    fields.text({ label: 'Skill/Experience' }),
                    {
                        label: 'Skills & Experience',
                        itemLabel: (props) => props.value || 'Skill',
                    }
                ),
                whatYoullBring: fields.array(
                    fields.text({ label: 'Quality/Trait' }),
                    {
                        label: "What You'll Bring",
                        itemLabel: (props) => props.value || 'Quality',
                    }
                ),
                whyJoin: fields.document({
                    label: 'Why Join Posilenz',
                    formatting: true,
                    dividers: true,
                    links: true,
                }),
                content: fields.document({
                    label: 'Additional Content',
                    description: 'Any additional job details (optional)',
                    formatting: true,
                    dividers: true,
                    links: true,
                }),
            },
        }),
    },
});

export default keystaticConfig;

