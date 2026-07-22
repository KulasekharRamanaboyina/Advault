import { defineField, defineType } from 'sanity'

export const psychologyType = defineType({
    name: 'psychology',
    title: 'Psychology',
    type: 'document',

    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            description: 'The name of the marketing psychology principle (e.g. Mere Exposure Effect)',
            type: 'string',
            validation: Rule => Rule.required(),
        }),

        defineField({
            name: 'slug',
            title: 'Slug',
            description: 'The URL path identifier, auto-generated from title',
            type: 'slug',
            options: {
                source: 'title',
            },
            validation: Rule => Rule.required(),
        }),

        defineField({
            name: 'description',
            title: 'Description',
            description: 'Detailed explanation of how this psychological mechanism works in advertising',
            type: 'text',
            rows: 5,
        }),

        defineField({
            name: 'example',
            title: 'Example',
            description: 'A concrete example of this principle applied in a marketing context',
            type: 'text',
            rows: 3,
        }),
    ],

    preview: {
        select: {
            title: 'title',
            subtitle: 'description',
        },
    },
})