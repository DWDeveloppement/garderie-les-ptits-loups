// Composant Parallax Image réutilisable
import { type SchemaTypeDefinition } from 'sanity'

export const paralaxImage: SchemaTypeDefinition = {
	name: 'paralaxImage',
	title: 'Parallax Image',
	type: 'object',
	options: {
		collapsible: true,
		collapsed: true,
	},
	fields: [
		{
			name: 'image',
			title: 'Image',
			type: 'basicImage',
		},
	],
}
