import { defineField, defineType } from 'sanity'

export const campaignType = defineType({
    name: 'campaign',
    title: 'Campaign',
    type: 'document',

    fieldsets: [
        {
            name: 'basic',
            title: 'Basic Information',
            options: {
                collapsible: true,
                collapsed: false,
            },
        },
        {
            name: 'summary',
            title: 'Executive Summary',
            options: {
                collapsible: true,
                collapsed: true,
            },
        },
        {
            name: 'challenge',
            title: 'Business Context',
            options: {
                collapsible: true,
                collapsed: true,
            },
        },
        {
            name: 'audience',
            title: 'Audience',
            options: {
                collapsible: true,
                collapsed: true,
            },
        },
        {
            name: 'strategy',
            title: 'Marketing Strategy',
            options: {
                collapsible: true,
                collapsed: true,
            },
        },
        {
            name: 'execution',
            title: 'Campaign Execution',
            options: {
                collapsible: true,
                collapsed: true,
            },
        },
        {
            name: 'results',
            title: 'Results & Impact',
            options: {
                collapsible: true,
                collapsed: true,
            },
        },
        {
            name: 'assets',
            title: 'Assets',
            options: {
                collapsible: true,
                collapsed: true,
            },
        },
        {
            name: 'sources',
            title: 'Sources',
            options: {
                collapsible: true,
                collapsed: true,
            },
        },
        {
            name: 'relatedCampaigns',
            title: 'Related Campaigns',
            options: {
                collapsible: true,
                collapsed: true,
            },
        },
        {
            name: 'seo',
            title: 'SEO',
            options: {
                collapsible: true,
                collapsed: true,
            },
        },
    ],

    fields: [
        defineField({
            name: 'title',
            title: 'Campaign Title',
            description: 'The official name of the marketing campaign',
            type: 'string',
            fieldset: 'basic',
            validation: Rule => Rule.required(),
        }),

        defineField({
            name: 'slug',
            title: 'Slug',
            description: 'The URL path identifier, auto-generated from the campaign title',
            type: 'slug',
            fieldset: 'basic',
            options: {
                source: 'title',
            },
            validation: Rule => Rule.required(),
        }),

        defineField({
            name: 'brand',
            title: 'Brand',
            description: 'The brand that ran this campaign',
            type: 'reference',
            to: [{ type: 'brand' }],
            fieldset: 'basic',
            validation: Rule => Rule.required(),
        }),

        defineField({
            name: 'campaignType',
            title: 'Campaign Type',
            description: 'The primary marketing objective of the campaign',
            type: 'string',
            fieldset: 'basic',
            options: {
                list: [
                    { title: 'Brand Awareness', value: 'brand-awareness' },
                    { title: 'Product Launch', value: 'product-launch' },
                    { title: 'Sales Promotion', value: 'sales-promotion' },
                    { title: 'Seasonal', value: 'seasonal' },
                    { title: 'CSR', value: 'csr' },
                    { title: 'Experiential', value: 'experiential' },
                    { title: 'Retail Activation', value: 'retail-activation' },
                    { title: 'OOH', value: 'ooh' },
                    { title: 'Print', value: 'print' },
                    { title: 'Integrated', value: 'integrated' },
                    { title: 'Other', value: 'other' },
                ],
            },
        }),

        defineField({
            name: 'launchYear',
            title: 'Launch Year',
            description: 'The year when this campaign was launched',
            type: 'number',
            fieldset: 'basic',
            validation: Rule => Rule.min(1900).max(new Date().getFullYear() + 10),
        }),

        defineField({
            name: 'campaignStartDate',
            title: 'Campaign Start Date',
            description: 'The date when the campaign started',
            type: 'date',
            fieldset: 'basic',
        }),

        defineField({
            name: 'campaignEndDate',
            title: 'Campaign End Date',
            description: 'The date when the campaign concluded (leave blank if ongoing)',
            type: 'date',
            fieldset: 'basic',
            validation: Rule => Rule.custom((endDate, context) => {
                const startDate = (context.parent as any)?.campaignStartDate
                if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
                    return 'Campaign end date must be after or equal to the start date'
                }
                return true
            }),
        }),

        defineField({
            name: 'country',
            title: 'Country',
            description: 'The primary country of target audience (e.g. India, USA, Global)',
            type: 'string',
            fieldset: 'basic',
        }),

        defineField({
            name: 'status',
            title: 'Status',
            description: 'Current stage of this campaign case study',
            type: 'string',
            fieldset: 'basic',
            options: {
                list: [
                    { title: 'Draft', value: 'draft' },
                    { title: 'Active', value: 'active' },
                    { title: 'Completed', value: 'completed' },
                ],
            },
            initialValue: 'draft',
        }),

        defineField({
            name: 'campaignSummary',
            title: 'Campaign Summary',
            description: 'High-level editorial summary of the campaign execution and success',
            type: 'array',
            of: [{ type: 'block' }],
            fieldset: 'summary',
            validation: Rule => Rule.required(),
        }),

        defineField({
            name: 'campaignBackground',
            title: 'Campaign Background',
            description: 'Contextual and historic background of the brand or previous campaigns',
            type: 'array',
            of: [{ type: 'block' }],
            fieldset: 'summary',
        }),

        defineField({
            name: 'campaignPurpose',
            title: 'Campaign Purpose',
            description: 'The primary motivation or core rationale behind the campaign',
            type: 'array',
            of: [{ type: 'block' }],
            fieldset: 'summary',
        }),

        defineField({
            name: 'businessProblem',
            title: 'Business Problem',
            description: 'The specific market or consumer issue targeted',
            type: 'array',
            of: [{ type: 'block' }],
            fieldset: 'challenge',
        }),

        defineField({
            name: 'marketSituation',
            title: 'Market Situation',
            description: 'Competitive landscape and market positioning at launch',
            type: 'array',
            of: [{ type: 'block' }],
            fieldset: 'challenge',
        }),

        defineField({
            name: 'marketingObjective',
            title: 'Marketing Objective',
            description: 'Defined quantitative/qualitative goals for the campaign',
            type: 'array',
            of: [{ type: 'block' }],
            fieldset: 'challenge',
        }),

        defineField({
            name: 'successCriteria',
            title: 'Success Criteria',
            description: 'How the campaign success was originally quantified',
            type: 'array',
            of: [{ type: 'block' }],
            fieldset: 'challenge',
        }),

        // =========================
        // Audience
        // =========================

        defineField({
            name: 'targetAudience',
            title: 'Target Audience',
            description: 'Detailed demographics of targeted user groups',
            type: 'array',
            of: [{ type: 'block' }],
            fieldset: 'audience',
        }),

        defineField({
            name: 'customerPersona',
            title: 'Customer Persona',
            description: 'Archetypes representing the core consumers targeted',
            type: 'array',
            of: [{ type: 'block' }],
            fieldset: 'audience',
        }),

        defineField({
            name: 'demographics',
            title: 'Demographics',
            description: 'Statistical details of the target audience (age, income, education, etc.)',
            type: 'array',
            of: [{ type: 'block' }],
            fieldset: 'audience',
        }),

        defineField({
            name: 'geographicCoverage',
            title: 'Geographic Coverage',
            description: 'The regional scope of campaign activities (local, national, global)',
            type: 'array',
            of: [{ type: 'block' }],
            fieldset: 'audience',
        }),

        defineField({
            name: 'consumerInsights',
            title: 'Consumer Insights',
            description: 'Unspoken needs or behaviors discovered about consumers that drove the campaign',
            type: 'array',
            of: [{ type: 'block' }],
            fieldset: 'audience',
        }),

        // =========================
        // Marketing Strategy
        // =========================

        defineField({
            name: 'marketingStrategy',
            title: 'Marketing Strategy',
            description: 'The overarching strategy used to execute the campaign',
            type: 'array',
            of: [{ type: 'block' }],
            fieldset: 'strategy',
        }),

        defineField({
            name: 'positioning',
            title: 'Brand Positioning',
            description: 'How the brand sought to position itself relative to alternatives during the campaign',
            type: 'array',
            of: [{ type: 'block' }],
            fieldset: 'strategy',
        }),

        defineField({
            name: 'keyMessaging',
            title: 'Key Messaging',
            description: 'The core tagline, slogan, or primary copywriting hooks',
            type: 'array',
            of: [{ type: 'block' }],
            fieldset: 'strategy',
        }),

        defineField({
            name: 'consumerPsychology',
            title: 'Consumer Psychology',
            description: 'References to psychological principles utilized in the copy/design',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'psychology' }],
                },
            ],
            fieldset: 'strategy',
        }),

        defineField({
            name: 'callToAction',
            title: 'Call To Action',
            description: 'The instruction given to prompt consumer conversion',
            type: 'array',
            of: [{ type: 'block' }],
            fieldset: 'strategy',
        }),

        // =========================
        // Campaign Execution
        // =========================

        defineField({
            name: 'executionProcess',
            title: 'Execution Process',
            description: 'The implementation steps, timeline flow, and creative mechanics',
            type: 'array',
            of: [{ type: 'block' }],
            fieldset: 'execution',
        }),

        defineField({
            name: 'creativeApproach',
            title: 'Creative Approach',
            description: 'The visual theme, design language, tone, and character designs',
            type: 'array',
            of: [{ type: 'block' }],
            fieldset: 'execution',
        }),

        defineField({
            name: 'communicationChannels',
            title: 'Communication Channels',
            description: 'Mediums utilized during execution',
            type: 'array',
            of: [{ type: 'string' }],
            fieldset: 'execution',
        }),

        defineField({
            name: 'timeline',
            title: 'Campaign Timeline',
            description: 'Key calendar milestones or historical phases of the campaign',
            type: 'array',
            of: [{ type: 'timelineEvent' }],
            fieldset: 'execution',
        }),

        defineField({
            name: 'mediaMix',
            title: 'Media Mix',
            description: 'Specific budget distribution across primary channels',
            type: 'array',
            of: [{ type: 'mediaMix' }],
            fieldset: 'execution',
        }),

        // =========================
        // Results & Impact
        // =========================

        defineField({
            name: 'businessResults',
            title: 'Business Results',
            description: 'Detailed analysis of performance outcome, sales lift, or brand metrics',
            type: 'array',
            of: [{ type: 'block' }],
            fieldset: 'results',
        }),

        defineField({
            name: 'resultMetrics',
            title: 'Result Metrics',
            description: 'Vetted data points (e.g. 50% increase, 12K impressions)',
            type: 'array',
            of: [{ type: 'resultMetric' }],
            fieldset: 'results',
        }),

        defineField({
            name: 'roi',
            title: 'Return on Investment (ROI)',
            description: 'Return multiplier or financial efficiency description',
            type: 'string',
            fieldset: 'results',
        }),

        defineField({
            name: 'keyPerformanceIndicators',
            title: 'Key Performance Indicators (KPIs)',
            description: 'List of metrics defined as success indicators',
            type: 'array',
            of: [{ type: 'string' }],
            fieldset: 'results',
        }),

        defineField({
            name: 'awards',
            title: 'Awards & Recognition',
            description: 'Industry awards or certificates earned by the campaign',
            type: 'array',
            of: [{ type: 'string' }],
            fieldset: 'results',
        }),

        defineField({
            name: 'successHighlights',
            title: 'Success Highlights',
            description: 'Core accomplishments or memorable breakthroughs',
            type: 'array',
            of: [{ type: 'block' }],
            fieldset: 'results',
        }),

        defineField({
            name: 'keyLearnings',
            title: 'Key Learnings',
            description: 'Core takeaways and lessons learned for future implementations',
            type: 'array',
            of: [{ type: 'block' }],
            fieldset: 'results',
        }),

        // =========================
        // Assets
        // =========================

        defineField({
            name: 'featuredImage',
            title: 'Featured Image',
            description: 'Main display graphic used on listing cards and article headers',
            type: 'image',
            fieldset: 'assets',
            options: {
                hotspot: true,
            },
        }),

        defineField({
            name: 'gallery',
            title: 'Campaign Gallery',
            description: 'Collateral images, photographs, or prints from the campaign',
            type: 'array',
            of: [{ type: 'image' }],
            fieldset: 'assets',
        }),

        defineField({
            name: 'videos',
            title: 'Videos',
            description: 'URLs to case films, commercial ads, or documentaries',
            type: 'array',
            of: [{ type: 'url' }],
            fieldset: 'assets',
        }),

        defineField({
            name: 'documents',
            title: 'Documents',
            description: 'Downloadable PDF reports, analysis papers, or award submissions',
            type: 'array',
            of: [{ type: 'file' }],
            fieldset: 'assets',
        }),

        // =========================
        // Sources
        // =========================

        defineField({
            name: 'sources',
            title: 'Sources',
            description: 'Literary sources, news articles, websites, and reference documents cited',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'source' }],
                },
            ],
            fieldset: 'sources',
        }),

        // =========================
        // Related Campaigns
        // =========================

        defineField({
            name: 'relatedCampaigns',
            title: 'Related Campaigns',
            description: 'Other campaigns with similar strategies, brands, or principles',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'campaign' }],
                },
            ],
            fieldset: 'relatedCampaigns',
        }),

        defineField({
            name: 'tags',
            title: 'Tags',
            description: 'Keywords to filter and index this campaign',
            type: 'array',
            of: [{ type: 'string' }],
        }),

        // =========================
        // SEO
        // =========================

        defineField({
            name: 'seoTitle',
            title: 'SEO Title',
            description: 'Title tag optimized for search engines (50-60 characters)',
            type: 'string',
            fieldset: 'seo',
        }),

        defineField({
            name: 'seoDescription',
            title: 'SEO Description',
            description: 'Brief meta description for search snippets (120-160 characters)',
            type: 'text',
            rows: 3,
            fieldset: 'seo',
        }),

        defineField({
            name: 'canonicalUrl',
            title: 'Canonical URL',
            description: 'The preferred URL to prevent duplicate content indexing issues',
            type: 'url',
            fieldset: 'seo',
        }),
    ],

    preview: {
        select: {
            title: 'title',
            brandName: 'brand.name',
            launchYear: 'launchYear',
            media: 'featuredImage',
        },
        prepare(selection) {
            const { title, brandName, launchYear, media } = selection
            return {
                title: title,
                subtitle: `${brandName || 'No Brand'} (${launchYear || 'N/A'})`,
                media: media,
            }
        }
    },
})