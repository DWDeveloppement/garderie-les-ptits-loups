// Composant Gallery réutilisable
import { type Rule, type SchemaTypeDefinition } from 'sanity'

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
					type: 'object',
					fields: [
						{
							name: 'image',
							title: 'Image',
							type: 'seoImage',
						},
						{
							name: 'caption',
							title: 'Légende',
							type: 'string',
							validation: (Rule: Rule) => Rule.required(),
							description: "Texte affiché sous l'image",
						},
					],
					preview: {
						select: {
							title: 'caption',
							media: 'image',
						},
					},
				},
			],
		},
	],
}
