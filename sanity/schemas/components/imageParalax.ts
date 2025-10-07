// Composant ImageParalax réutilisable
import { type Rule, type SchemaTypeDefinition } from 'sanity'

export const imageParalax: SchemaTypeDefinition = {
	name: 'imageParalax',
	title: 'Image Paralax',
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
	],
}
