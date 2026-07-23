import { defineField, defineType } from 'sanity'

export const sourceType = defineType({
    name: 'source',
    title: 'Source',
    type: 'document',

    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            description: 'The title of the referenced source material',
            type: 'string',
            validation: Rule => Rule.required(),
        }),

        defineField({
            name: 'slug',
            title: 'Slug',
            description: 'The path identifier, auto-generated from title',
            type: 'slug',
            options: {
                source: 'title',
            },
            validation: Rule => Rule.required(),
        }),

        defineField({
            name: 'sourceName',
            title: 'Source Name',
            description: 'Where this source resides (e.g. Forbes, HBR, Award Entry)',
            type: 'string',
            validation: Rule => Rule.required(),
        }),

        defineField({
            name: 'sourceType',
            title: 'Source Type',
            description: 'Format or medium of the source information',
            type: 'string',
            options: {
                list: [
                    { title: 'Brand Website', value: 'brand-website' },
                    { title: 'News Article', value: 'news' },
                    { title: 'Case Study', value: 'case-study' },
                    { title: 'Research Paper', value: 'research-paper' },
                    { title: 'Award Entry', value: 'award-entry' },
                    { title: 'Interview', value: 'interview' },
                    { title: 'Magazine', value: 'magazine' },
                    { title: 'Blog', value: 'blog' },
                    { title: 'YouTube', value: 'youtube' },
                    { title: 'Podcast', value: 'podcast' },
                    { title: 'Annual Report', value: 'annual-report' },
                    { title: 'LinkedIn', value: 'linkedin' },
                    { title: 'Other', value: 'other' },
                ],
            },
            validation: Rule => Rule.required(),
        }),

        defineField({
            name: 'url',
            title: 'URL',
            description: 'Direct link to access the source online',
            type: 'url',
            validation: Rule => Rule.uri({ scheme: ['http', 'https'] }),
        }),

        defineField({
            name: 'file',
            title: 'File Attachment',
            description: 'Upload the PDF/Document of the entire case study or research paper',
            type: 'file',
            options: {
                accept: '.pdf,.doc,.docx,.txt',
            },
        }),

        defineField({
            name: 'author',
            title: 'Author',
            description: 'The creator or writer of the source',
            type: 'string',
        }),

        defineField({
            name: 'publisher',
            title: 'Publisher',
            description: 'Company or body publishing the literature',
            type: 'string',
        }),

        defineField({
            name: 'publishedDate',
            title: 'Published Date',
            description: 'When the reference material was first published',
            type: 'date',
        }),

        defineField({
            name: 'accessedDate',
            title: 'Accessed Date',
            description: 'The date when this source was retrieved for research',
            type: 'date',
            validation: Rule => Rule.custom((accessedDate, context) => {
                const publishedDate = (context?.parent as any)?.publishedDate
                if (publishedDate && accessedDate && new Date(accessedDate) < new Date(publishedDate)) {
                     return 'Accessed date cannot be earlier than the published date'
                }
                return true
            }),
        }),

        defineField({
            name: 'notes',
            title: 'Notes',
            description: 'Relevant quotes, key points, or excerpts from the source document',
            type: 'array',
            of: [{ type: 'block' }],
        }),
    ],

    preview: {
        select: {
            title: 'title',
            sourceName: 'sourceName',
            sourceType: 'sourceType',
        },
        prepare(selection) {
            const { title, sourceName, sourceType } = selection
            const typeLabel = sourceType ? sourceType.replace('-', ' ') : 'source'
            return {
                title,
                subtitle: `${sourceName || 'Unknown publisher'} (${typeLabel})`,
            }
        }
    },
})