import { defineField, defineType } from 'sanity'

export const resultMetricType = defineType({
    name: 'resultMetric',
    title: 'Result Metric',
    type: 'object',

    fields: [
        defineField({
            name: 'metric',
            title: 'Metric Name',
            type: 'string',
            validation: Rule => Rule.required(),
        }),

        defineField({
            name: 'value',
            title: 'Value',
            type: 'string',
            validation: Rule => Rule.required(),
        }),

        defineField({
            name: 'unit',
            title: 'Unit',
            type: 'string',
            options: {
                list: [
                    '%',
                    '₹',
                    '$',
                    'Users',
                    'People',
                    'Stores',
                    'Views',
                    'Leads',
                    'Awards',
                    'Other',
                ],
            },
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
            title: 'metric',
            subtitle: 'value',
        },
        prepare({ title, subtitle }) {
            return {
                title,
                subtitle,
            }
        },
    },
})