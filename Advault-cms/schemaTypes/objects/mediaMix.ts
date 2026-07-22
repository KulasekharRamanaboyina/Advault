import { defineField, defineType } from 'sanity'

export const mediaMixType = defineType({
    name: 'mediaMix',
    title: 'Media Mix',
    type: 'object',

    fields: [
        defineField({
            name: 'channel',
            title: 'Channel',
            type: 'string',
            options: {
                list: [
                    'Outdoor',
                    'Print',
                    'Transit',
                    'Cinema',
                    'Radio',
                    'Retail',
                    'Events',
                    'Sampling',
                    'Experiential',
                    'Direct Mail',
                    'Other',
                ],
            },
            validation: Rule => Rule.required(),
        }),

        defineField({
            name: 'percentage',
            title: 'Percentage',
            type: 'number',
            validation: Rule => Rule.min(0).max(100),
        }),

        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 2,
        }),
    ],

    preview: {
        select: {
            title: 'channel',
            subtitle: 'percentage',
        },
        prepare({ title, subtitle }) {
            return {
                title,
                subtitle: subtitle ? `${subtitle}%` : '',
            }
        },
    },
})