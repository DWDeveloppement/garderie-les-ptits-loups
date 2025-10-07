// Composant Hero réutilisable
import { type Rule, type SchemaTypeDefinition } from 'sanity'

export const hero: SchemaTypeDefinition = {
	name: 'hero',
	title: 'Hero',
	type: 'object',
	fields: [
		{
			name: 'image',
			title: 'Image',
			type: 'image',
			options: {
				hotspot: true,
			},
			fields: [
				{
					name: 'alt',
					title: 'Texte alternatif',
					type: 'string',
					validation: (Rule: Rule) => Rule.required(),
				},
			],
			validation: (Rule: Rule) => Rule.required(),
		},
		{
			name: 'description',
			title: 'Small description',
			type: 'text',
			rows: 3,
		},
	],
}
