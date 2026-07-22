import { defineField, defineType } from 'sanity'

export const timelineEventType = defineType({
    name: 'timelineEvent',
    title: 'Timeline Event',
    type: 'object',

    fields: [
        defineField({
            name: 'date',
            title: 'Date',
            type: 'date',
        }),

        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: Rule => Rule.required(),
        }),

        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 3,
        }),
    ],

    preview: {
        select: {
            title: 'title',
            subtitle: 'date',
        },
    },
})