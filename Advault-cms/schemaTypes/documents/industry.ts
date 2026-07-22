import { defineField, defineType } from 'sanity'

export const industryType = defineType({
    name: 'industry',
    title: 'Industry',
    type: 'document',

    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: Rule => Rule.required()
        }),

        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96
            },
            validation: Rule => Rule.required()
        }),

        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 4,
            validation: Rule => Rule.required()
        }),

        defineField({
            name: 'icon',
            title: 'Icon',
            type: 'image'
        }),

        defineField({
            name: 'featuredImage',
            title: 'Featured Image',
            type: 'image'
        })
    ]
})