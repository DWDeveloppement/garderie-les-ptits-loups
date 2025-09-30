// Schema pour les espaces
/*
 * Ce shema définit les espaces de la garderie et les relations avec les différents secteurs de la garderie. Un espace n'est associé qu'à un seul secteur via le champ selecteur de secteur.
 * Il permet de créer des espaces avec une image, un titre, un secteur et un contenu en RichText.
 */
import { type Rule, type SchemaTypeDefinition } from 'sanity'

export const spaces: SchemaTypeDefinition = {
	name: 'spaces',
	title: 'Espaces',
	type: 'document',
	fields: [
		{
			name: 'title',
			title: 'Titre',
			type: 'string',
			validation: (Rule: Rule) => Rule.required().max(100),
		},
		// selecteur de secteur en relation avec sectors.ts au format input type select avec le titre du secteur mais suppression du bouggon add new
		{
			name: 'sector',
			title: 'Secteur',
			type: 'reference',
			to: [{ type: 'sectors' }],
			options: {
				disableNew: true,
			},
		},
		// Image de l'espace featured avec SEO automatique
		{
			name: 'featuredImage',
			title: 'Image featured',
			type: 'image',
			options: {
				hotspot: true,
			},
			fields: [
				{
					name: 'alt',
					title: 'Texte alternatif',
					type: 'string',
					validation: (Rule: Rule) => Rule.required(),
				},
			],
			validation: (Rule: Rule) => Rule.required(),
		},
		// Contenu de l'espace en RichText
		{
			name: 'content',
			title: 'Contenu',
			// Bloc de RichText
			type: 'array',
			of: [{ type: 'block' }],
			validation: (Rule: Rule) => Rule.required(),
		},
	],
	preview: {
		select: {
			title: 'title',
			media: 'featuredImage',
		},
	},
}
