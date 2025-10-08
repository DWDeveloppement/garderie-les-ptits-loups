// Composant Hero réutilisable
import { type SchemaTypeDefinition } from 'sanity'

export const hero: SchemaTypeDefinition = {
	name: 'hero',
	title: 'Hero',
	type: 'object',
	fields: [
		{
			name: 'image',
			title: 'Image',
			type: 'seoImage',
		},
		// Small description pour un texte d'introduction dans un composant card.
		{
			name: 'description',
			title: "Texte d'introduction des pages.",
			type: 'text',
			rows: 4,
		},
	],
}
