import { type Rule } from 'sanity'

/**
 * Champs d'image avec SEO et métadonnées
 * Réutilisables dans tous les schémas
 */

export const mediaSEOField = {
	type: 'image',
	options: {
		hotspot: true,
	},
	fields: [
		{
			name: 'alt',
			title: 'Texte alternatif',
			type: 'string',
			description: "Description de l'image pour l'accessibilité et le SEO",
			validation: (Rule: Rule) => Rule.required().max(125).error("Le texte alternatif est obligatoire pour l'accessibilité et le SEO"),
		},
		{
			name: 'caption',
			title: 'Légende',
			type: 'string',
			description: "Légende optionnelle de l'image",
			validation: (Rule: Rule) => Rule.max(200),
		},
		{
			name: 'credit',
			title: 'Crédit photo',
			type: 'string',
			description: "Photographe ou source de l'image",
			validation: (Rule: Rule) => Rule.max(100),
		},
		{
			name: 'usage',
			title: "Usage de l'image",
			type: 'string',
			description: "Contexte d'utilisation prévu",
			options: {
				list: [
					{ title: 'Hero', value: 'hero' },
					{ title: 'Gallery', value: 'gallery' },
					{ title: 'Section', value: 'section' },
					{ title: 'Thumbnail', value: 'thumbnail' },
					{ title: 'Article', value: 'article' },
					{ title: 'Autre', value: 'other' },
				],
			},
			validation: (Rule: Rule) => Rule.required().error("L'usage de l'image est obligatoire"),
		},
	],
}

export const simpleImageField = {
	type: 'image',
	options: {
		hotspot: true,
	},
	fields: [
		{
			name: 'alt',
			title: 'Texte alternatif',
			type: 'string',
			description: "Description de l'image pour l'accessibilité et le SEO",
			validation: (Rule: Rule) => Rule.required().max(125).error("Le texte alternatif est obligatoire pour l'accessibilité et le SEO"),
		},
	],
}
