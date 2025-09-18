import { type Rule, type SchemaTypeDefinition } from 'sanity'

/**
 * Schéma d'asset personnalisé qui remplace l'asset par défaut
 * Ajoute les champs manquants : credit, usage, category, isPublic
 */

export const customAsset: SchemaTypeDefinition = {
	name: 'customAsset',
	title: 'Asset Personnalisé',
	type: 'document',
	fields: [
		{
			name: 'asset',
			title: 'Asset Sanity',
			type: 'image',
			description: 'Asset de base de Sanity',
		},
		{
			name: 'credit',
			title: 'Crédit photo',
			type: 'string',
			description: "Photographe, créateur ou source de l'image",
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
					{ title: 'Autre', value: 'other' },
				],
			},
		},
		{
			name: 'category',
			title: 'Catégorie',
			type: 'string',
			description: "Catégorie du média pour l'organisation et l'optimisation des formats",
			options: {
				list: [
					{ title: 'Images - Hero', value: 'hero' },
					{ title: 'Images - Galerie', value: 'gallery' },
					{ title: 'Images - Équipe', value: 'team' },
					{ title: 'Images - Espaces', value: 'spaces' },
					{ title: 'Images - Activités', value: 'activities' },
					{ title: 'Vidéos', value: 'videos' },
					{ title: 'Documents', value: 'documents' },
					{ title: 'Autres', value: 'other' },
				],
			},
		},
		{
			name: 'isPublic',
			title: 'Public',
			type: 'boolean',
			description: 'Ce média peut-il être utilisé publiquement ?',
			initialValue: true,
		},
	],
}
