// Composant SEO réutilisable
import { type Rule, type SchemaTypeDefinition } from 'sanity'

export const seo: SchemaTypeDefinition = {
	name: 'seo',
	title: 'SEO',
	type: 'object',
	fields: [
		{
			name: 'metaTitle',
			title: 'Meta Title',
			type: 'string',
			validation: (Rule: Rule) => Rule.max(60),
			description: 'Titre pour les moteurs de recherche (60 caractères max)',
		},
		{
			name: 'metaDescription',
			title: 'Meta Description',
			type: 'text',
			rows: 3,
			validation: (Rule: Rule) => Rule.max(160),
			description: 'Description pour les moteurs de recherche (160 caractères max)',
		},
		{
			name: 'keywords',
			title: 'Mots-clés',
			type: 'array',
			of: [{ type: 'string' }],
			description: 'Mots-clés pour le référencement',
		},
		// Image de partage unique (Open Graph + Twitter)
		{
			name: 'shareImage',
			title: 'Image de partage (réseaux sociaux)',
			type: 'basicImage',
			description: 'Image pour le partage sur Facebook, LinkedIn, Twitter (dimensions optimisées automatiquement)',
		},
	],
}
