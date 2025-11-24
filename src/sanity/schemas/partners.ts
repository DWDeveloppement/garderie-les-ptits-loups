import { type Rule, type SchemaTypeDefinition } from 'sanity'

export const partners: SchemaTypeDefinition = {
	name: 'partners',
	title: 'Partenaires',
	type: 'document',
	icon: () => '🤝',
	fields: [
		{
			name: 'name',
			title: 'Nom',
			type: 'string',
			validation: (Rule: Rule) => Rule.required(),
		},
		{
			name: 'website',
			title: 'Site web',
			type: 'url',
			validation: (Rule: Rule) => Rule.required(),
		},
		{
			name: 'logo',
			title: 'Logo',
			type: 'basicImage',
			validation: (Rule: Rule) => Rule.required(),
		},
	],
	preview: {
		select: {
			title: 'name',
			media: 'logo',
		},
		prepare(selection) {
			return {
				title: selection.title,
				media: selection.media,
			}
		},
	},
}
