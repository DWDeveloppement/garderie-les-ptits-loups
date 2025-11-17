// Composant Image SEO réutilisable
import { type Rule, type SchemaTypeDefinition } from 'sanity'

export const seoImage: SchemaTypeDefinition = {
	name: 'seoImage',
	title: 'Image SEO',
	type: 'image',
	options: {
		hotspot: true,
		metadata: ['blurhash', 'lqip', 'palette'], // Performance: placeholder
	},
	fields: [
		{
			name: 'alt',
			title: 'Texte alternatif',
			type: 'string',
			validation: (Rule: Rule) => Rule.required().max(125),
			description: "Description de l'image pour SEO et accessibilité",
		},
		// Options avancées (collapsible): champs optionnels pour SEO et UX
		// - title: info-bulle au survol (si vide, le frontend utilisera alt par défaut)
		// - credits: photographe/source (si vide, le frontend affichera "Garderie Les P'tits Loups")
		// - keywords: mots-clés spécifiques à l'image pour le référencement
		{
			name: 'advancedOptions',
			title: 'Options avancées',
			type: 'object',
			options: {
				collapsible: true,
				collapsed: true,
			},
			fields: [
				{
					name: 'title',
					title: 'Titre (info-bulle)',
					type: 'string',
					description: 'Texte affiché au survol (optionnel, par défaut = alt)',
				},
				{
					name: 'credits',
					title: 'Crédits',
					type: 'string',
					description: "Photographe ou source (optionnel, par défaut = Garderie Les P'tits Loups)",
				},
				{
					name: 'keywords',
					title: "Mots-clés de l'image",
					type: 'array',
					of: [{ type: 'string' }],
					description: 'Mots-clés spécifiques pour le référencement de cette image',
				},
			],
		},
	],
}
