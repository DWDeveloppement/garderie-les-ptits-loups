// Composant ImageParalax réutilisable
import { type SchemaTypeDefinition } from 'sanity'

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
				},
			],
		},
		{
			name: 'overlay',
			title: 'Overlay',
			type: 'boolean',
		},
		{
			name: 'overlayText',
			title: 'Texte overlay',
			type: 'string',
		},
	],
}
