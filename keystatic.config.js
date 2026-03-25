"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@keystatic/core");
var isLocal = process.env.NODE_ENV === 'development';
var configuredMode = process.env.NEXT_PUBLIC_KEYSTATIC_MODE;
var isGitHubMode = configuredMode === 'github' ||
    (configuredMode !== 'local' && !isLocal);
var keystaticRepo = (process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO || '').replace(/\.git$/, '');
var _a = keystaticRepo.split('/'), repoOwner = _a[0], repoName = _a[1];
console.log("[Keystatic Config] Mode: ".concat(isGitHubMode ? 'GitHub' : 'Local', " (NODE_ENV: ").concat(process.env.NODE_ENV, ", Mode Var: ").concat(process.env.NEXT_PUBLIC_KEYSTATIC_MODE, ")"));
console.log("[Keystatic Config] Repo: ".concat(repoOwner, "/").concat(repoName));
if (isGitHubMode && (!repoOwner || !repoName)) {
    throw new Error('Missing or invalid NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO (expected "owner/repo") for Keystatic GitHub storage.');
}
var keystaticConfig = (0, core_1.config)({
    storage: isGitHubMode
        ? {
            kind: 'github',
            repo: {
                owner: repoOwner,
                name: repoName,
            },
        }
        : { kind: 'local' },
    collections: {
        careers: (0, core_1.collection)({
            label: 'Careers',
            slugField: 'slug',
            path: 'content/careers/*/',
            schema: {
                slug: core_1.fields.slug({
                    name: {
                        label: 'Job Slug',
                        description: 'URL-friendly identifier (e.g., senior-developer)'
                    }
                }),
                title: core_1.fields.text({ label: 'Job Title', validation: { isRequired: true } }),
                intro: core_1.fields.text({
                    label: 'Short Introduction',
                    description: 'Brief description shown in the collapsed view',
                    multiline: true,
                }),
                workmode: core_1.fields.select({
                    label: 'Work Mode',
                    options: [
                        { label: 'Remote', value: 'remote' },
                        { label: 'Hybrid', value: 'hybrid' },
                        { label: 'On-site', value: 'onsite' },
                    ],
                    defaultValue: 'remote',
                }),
                location: core_1.fields.text({
                    label: 'Location',
                    description: 'City and country where the job is located (e.g., "Dubai, UAE")',
                    validation: { isRequired: false },
                }),
                employmentType: core_1.fields.select({
                    label: 'Employment Type',
                    options: [
                        { label: 'Full-time', value: 'full-time' },
                        { label: 'Part-time', value: 'part-time' },
                        { label: 'Contract', value: 'contract' },
                    ],
                    defaultValue: 'full-time',
                }),
                experience: core_1.fields.text({
                    label: 'Experience Required',
                    description: 'e.g., "6+ Years", "3-5 Years"',
                }),
                displayOrder: core_1.fields.number({
                    label: 'Display Order',
                    description: 'Lower numbers appear first',
                    defaultValue: 1,
                }),
                isActive: core_1.fields.checkbox({
                    label: 'Active',
                    description: 'Show this job opening on the website',
                    defaultValue: true,
                }),
                roleOverview: core_1.fields.document({
                    label: 'Role Overview',
                    formatting: true,
                    dividers: true,
                    links: true,
                }),
                keyResponsibilities: core_1.fields.array(core_1.fields.text({ label: 'Responsibility' }), {
                    label: 'Key Responsibilities',
                    itemLabel: function (props) { return props.value || 'Responsibility'; },
                }),
                skillsExperience: core_1.fields.array(core_1.fields.text({ label: 'Skill/Experience' }), {
                    label: 'Skills & Experience',
                    itemLabel: function (props) { return props.value || 'Skill'; },
                }),
                whatYoullBring: core_1.fields.array(core_1.fields.text({ label: 'Quality/Trait' }), {
                    label: "What You'll Bring",
                    itemLabel: function (props) { return props.value || 'Quality'; },
                }),
                whyJoin: core_1.fields.document({
                    label: 'Why Join Posilenz',
                    formatting: true,
                    dividers: true,
                    links: true,
                }),
                content: core_1.fields.document({
                    label: 'Additional Content',
                    description: 'Any additional job details (optional)',
                    formatting: true,
                    dividers: true,
                    links: true,
                }),
            },
        }),
        blog: (0, core_1.collection)({
            label: 'Blog',
            slugField: 'slug',
            path: 'content/blog/*/',
            entryLayout: 'content',
            format: {
                contentField: 'content',
            },
            columns: ['title', 'publishDate', 'isDraft'],
            schema: {
                slug: core_1.fields.slug({
                    name: {
                        label: 'Post Slug',
                        description: 'URL-friendly identifier for the blog post',
                    },
                }),
                title: core_1.fields.text({
                    label: 'Title',
                    validation: { isRequired: true },
                }),
                excerpt: core_1.fields.text({
                    label: 'Excerpt',
                    description: 'Short summary used for list and SEO description output',
                    multiline: true,
                    validation: { isRequired: true },
                }),
                publishDate: core_1.fields.date({
                    label: 'Publish Date',
                    validation: { isRequired: true },
                }),
                isDraft: core_1.fields.checkbox({
                    label: 'Draft',
                    description: 'Hide this post from the public website until it is ready',
                    defaultValue: true,
                }),
                coverImage: core_1.fields.image({
                    label: 'Cover Image',
                    description: 'Optional cover image used on the blog list, homepage insights, detail page, and social metadata',
                    directory: 'public/images/blog',
                    publicPath: '/images/blog/',
                }),
                content: core_1.fields.markdoc({
                    label: 'Content',
                    description: 'Main article content in Markdown/Markdoc format',
                    extension: 'md',
                }),
            },
        }),
    },
});
exports.default = keystaticConfig;
