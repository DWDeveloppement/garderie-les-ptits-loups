// Composant Gallery réutilisable
import { type SchemaTypeDefinition } from 'sanity'

export const gallery: SchemaTypeDefinition = {
	name: 'gallery',
	title: 'Gallery',
	type: 'object',
	fields: [
		{
			name: 'title',
			title: 'Titre de la galerie',
			type: 'string',
		},
		{
			name: 'images',
			title: 'Images',
			type: 'array',
			of: [
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
						{
							name: 'caption',
							title: 'Légende',
							type: 'string',
						},
					],
				},
			],
		},
	],
}
