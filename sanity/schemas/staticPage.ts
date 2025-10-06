// Schema pour les pages statiques / fixes
/*
 * Ce shema définit les pages éléments communs à toutes les pages statiques / fixes comme le nom de la page, le slug, le titre, la description, un hero de page un blocde contenu variable en fonction de la page. Un bloc poour gérer le SEO. de chaque page.
 */
import { type Rule, type SchemaTypeDefinition } from 'sanity'

export const staticPage: SchemaTypeDefinition = {
	name: 'staticPage',
	title: 'Page Statique',
	type: 'document',
	fields: [
		{
			name: 'title',
			title: 'Titre',
			type: 'string',
			validation: (Rule: Rule) => Rule.required(),
		},
		{
			name: 'heroImage',
			title: 'Image Hero',
			description: 'Image affichée en haut de la page',
			type: 'image',
			options: {
				hotspot: true,
			},
			validation: (Rule: Rule) => Rule.required(),
		},
		{
			name: 'content',
			title: 'Contenu',
			type: 'array',
			of: [{ type: 'block' }],
			validation: (Rule: Rule) => Rule.required(),
		},
		{
			name: 'seo',
			title: 'SEO',
			type: 'object',
			fields: [
				{
					name: 'metaTitle',
					title: 'Meta Title',
					type: 'string',
					validation: (Rule: Rule) => Rule.required(),
				},
				{
					name: 'ogTitle',
					title: 'Meta Title',
					type: 'string',
					validation: (Rule: Rule) => Rule.required(),
				},
				{
					name: 'ogDescription',
					title: 'Meta Description',
					type: 'text',
					rows: 3,
					validation: (Rule: Rule) => Rule.required(),
				},
				{
					name: 'keywords',
					title: 'Mots-clés (séparés par des virgules)	',
					type: 'array',
					of: [{ type: 'string' }],
					validation: (Rule: Rule) => Rule.required(),
				},
				{
					name: 'metaDescription',
					title: 'Meta Description',
					type: 'text',
					rows: 3,
					validation: (Rule: Rule) => Rule.required(),
				},
			],
		},
	],
	preview: {
		select: {
			title: 'title',
			media: 'heroImage',
		},
	},
}
