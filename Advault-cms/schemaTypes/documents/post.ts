import { defineField, defineType } from 'sanity'

export const postType = defineType({
    name: 'post',
    title: 'Blog Post',
    type: 'document',

    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: Rule => Rule.required(),
        }),

        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: Rule => Rule.required(),
        }),

        defineField({
            name: 'date',
            title: 'Publish Date',
            type: 'date',
            validation: Rule => Rule.required(),
        }),

        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Tactile Marketing', value: 'Tactile Marketing' },
                    { title: 'Out of Home', value: 'Out of Home' },
                    { title: 'Economics', value: 'Economics' },
                ]
            },
            validation: Rule => Rule.required(),
        }),

        defineField({
            name: 'excerpt',
            title: 'Excerpt',
            type: 'text',
            rows: 3,
            validation: Rule => Rule.required(),
        }),

        defineField({
            name: 'content',
            title: 'Content',
            type: 'array',
            of: [{ type: 'block' }],
            validation: Rule => Rule.required(),
        }),

        defineField({
            name: 'readTime',
            title: 'Read Time',
            description: 'e.g. 4 min read',
            type: 'string',
            validation: Rule => Rule.required(),
        }),

        defineField({
            name: 'thumbnail',
            title: 'Thumbnail Image',
            description: 'An cover or preview image for the blog post card',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
    ],

    preview: {
        select: {
            title: 'title',
            subtitle: 'category',
        }
    }
})
