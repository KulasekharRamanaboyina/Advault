import { defineField, defineType } from 'sanity'

export const brandType = defineType({
    name: 'brand',
    title: 'Brand',
    type: 'document',

    fields: [
        defineField({
            name: 'name',
            title: 'Brand Name',
            description: 'The official name of the brand or company',
            type: 'string',
            validation: Rule => Rule.required(),
        }),

        defineField({
            name: 'slug',
            title: 'Slug',
            description: 'The URL path identifier, auto-generated from name',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
            validation: Rule => Rule.required(),
        }),

        defineField({
            name: 'logo',
            title: 'Logo',
            description: 'SVG or high-res brand trademark mark',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),

        defineField({
            name: 'industry',
            title: 'Industry',
            description: 'The primary industry sector of this brand',
            type: 'reference',
            to: [{ type: 'industry' }],
            validation: Rule => Rule.required(),
        }),

        defineField({
            name: 'description',
            title: 'Description',
            description: 'Brief overview of the brand history and identity',
            type: 'text',
            rows: 5,
        }),

        defineField({
            name: 'founded',
            title: 'Founded',
            description: 'The year the brand was established (e.g. 1966)',
            type: 'number',
            validation: Rule => Rule.integer().min(1000).max(new Date().getFullYear()),
        }),

        defineField({
            name: 'headquarters',
            title: 'Headquarters',
            description: 'City and Country where corporate HQ is located',
            type: 'string',
        }),

        defineField({
            name: 'website',
            title: 'Website',
            description: 'The official corporate website URL',
            type: 'url',
            validation: Rule => Rule.uri({ scheme: ['http', 'https'] }),
        }),

        defineField({
            name: 'featuredImage',
            title: 'Featured Image',
            description: 'A highlight or hero image representing the brand brand workspace',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
    ],

    preview: {
        select: {
            title: 'name',
            media: 'logo',
            industryName: 'industry.title',
            headquarters: 'headquarters',
        },
        prepare(selection) {
            const { title, media, industryName, headquarters } = selection
            return {
                title,
                subtitle: `${industryName || 'No Industry'} | ${headquarters || 'No HQ Location'}`,
                media,
            }
        }
    },
})