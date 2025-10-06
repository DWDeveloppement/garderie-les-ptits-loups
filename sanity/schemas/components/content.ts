// Composant Content réutilisable
import { type SchemaTypeDefinition } from 'sanity'

export const content: SchemaTypeDefinition = {
	name: 'content',
	title: 'Content',
	type: 'object',
	fields: [
		{
			name: 'title',
			title: 'Titre',
			type: 'string',
		},
		{
			name: 'body',
			title: 'Contenu',
			type: 'array',
			of: [
				{
					type: 'block',
				},
				{
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
			],
		},
	],
}
