// Composant Hero: image + description
import { type SchemaTypeDefinition } from 'sanity'

export const heroImage: SchemaTypeDefinition = {
	name: 'heroImage',
	title: 'Hero Image',
	type: 'object',
	options: {
		collapsible: true,
		collapsed: false,
	},
	fields: [
		{
			name: 'image',
			title: 'Image',
			type: 'basicImage',
		},
		{
			name: 'description',
			title: 'Description',
			type: 'text',
			rows: 3,
		},
	],
	preview: {
		select: {
			title: 'description',
			media: 'image',
		},
		prepare(selection) {
			return {
				title: selection.title || 'Hero sans description',
				media: selection.media,
			}
		},
	},
}
