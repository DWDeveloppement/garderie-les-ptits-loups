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
			type: 'seoImage',
		},
	],
}
