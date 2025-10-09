// Composant Galerie: image + label
import { type Rule, type SchemaTypeDefinition } from 'sanity'

export const galleryImage: SchemaTypeDefinition = {
	name: 'galleryImage',
	title: 'Gallery Image',
	type: 'object',
	fields: [
		{
			name: 'image',
			title: 'Image',
			type: 'basicImage',
		},
		{
			name: 'label',
			title: 'Label',
			type: 'string',
			validation: (Rule: Rule) => Rule.required().max(100),
			description: "Texte affiché sous l'image dans la galerie",
		},
	],
	preview: {
		select: {
			title: 'label',
			subtitle: 'image.alt',
			media: 'image',
		},
		prepare(selection) {
			return {
				title: selection.title || 'Sans label',
				subtitle: selection.subtitle || 'Sans alt',
				media: selection.media,
			}
		},
	},
}
