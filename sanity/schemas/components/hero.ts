// Composant Hero réutilisable
import { type SchemaTypeDefinition } from 'sanity'

export const hero: SchemaTypeDefinition = {
	name: 'hero',
	title: 'Hero',
	type: 'object',
	fields: [
		{
			name: 'title',
			title: 'Titre',
			type: 'string',
		},
		{
			name: 'subtitle',
			title: 'Sous-titre',
			type: 'string',
		},
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
				},
			],
		},
		{
			name: 'description',
			title: 'Description',
			type: 'text',
			rows: 3,
		},
	],
}
