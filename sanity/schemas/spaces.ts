import { type Rule, type SchemaTypeDefinition } from 'sanity'
import { seo } from './components'

export const spacePage: SchemaTypeDefinition = {
	name: 'spacePage',
	title: 'Page Espace',
	type: 'document',
	fields: [
		{
			name: 'title',
			title: 'Titre',
			type: 'string',
			validation: (Rule: Rule) => Rule.required().max(100),
		},
		// Pas de slug: ce sont des relations, pas des pages de navigation
		// Image principale
		{
			name: 'image',
			title: 'Image',
			type: 'basicImage',
			validation: (Rule: Rule) => Rule.required(),
		},
		// Description en rich-text
		{
			name: 'description',
			title: 'Description',
			type: 'array',
			of: [{ type: 'block' }],
			validation: (Rule: Rule) => Rule.required(),
		},
		// SEO
		{
			name: 'seo',
			title: 'SEO',
			type: seo.name,
			options: {
				collapsible: true,
				collapsed: true,
			},
		},
	],
	preview: {
		select: {
			title: 'title',
			media: 'image',
		},
	},
}
