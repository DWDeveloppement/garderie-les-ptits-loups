// Schema pour les secteurs
/*
 * Ce shema définit les secteurs de la garderie et les relations avec les différents espaces de la garderie.
 * Il permet de créer des secteurs avec une image, un titre, un contenu en RichText et une galerie.
 * un toggle pour activer le Card.
 * Dans ce shema, on y insère les champs communs à tous les secteurs.
 * on emporte du seo, un hero de page un espace gallerie et un contener pour insérer les espaces du secteur.
 */
import { type Rule, type SchemaTypeDefinition } from 'sanity'

export const sectors: SchemaTypeDefinition = {
	name: 'sectors',
	title: 'La Structure',
	type: 'document',
	fields: [
		// Titre du secteur
		{
			name: 'title',
			title: 'Titre du secteur',
			type: 'string',
			validation: (Rule: Rule) => Rule.required().max(100),
		},
	// Slug du secteur (auto-généré avec préfixe "la-structure/")
	{
		name: 'slug',
		title: 'Slug',
		type: 'slug',
		options: {
			source: 'title',
			slugify: (input: string) => {
				const base = input
					.toLowerCase()
					.normalize('NFD')
					.replace(/[\u0300-\u036f]/g, '') // Retire accents
					.replace(/[^a-z0-9]+/g, '-') // Remplace espaces et caractères spéciaux par -
					.replace(/^-+|-+$/g, '') // Retire - en début/fin
				return `la-structure/${base}`
			},
			maxLength: 96,
		},
		validation: (Rule: Rule) => Rule.required(),
	},
		// Tranche d'âge du secteur (format card)
		{
			name: 'ageRange',
			title: "Tranche d'âge",
			type: 'string',
			description: 'Ex: 0-24 mois, 24-36 mois, etc.',
			validation: (Rule: Rule) => Rule.required(),
		},
		// Courte Description du secteur (format card)
		{
			name: 'description',
			title: 'Description',
			type: 'text',
			rows: 4,
			validation: (Rule: Rule) => Rule.required().max(200),
		},
		// Toggle pour activer le Card
		{
			name: 'isActive',
			title: "Activer le Card sur la page d'accueil",
			type: 'boolean',
			initialValue: false,
		},
		// Image hero du secteur
		{
			name: 'heroImage',
			title: 'Image hero',
			type: 'image',
			options: {
				hotspot: true,
			},
			validation: (Rule: Rule) => Rule.required(),
		},

		// Contenu du secteur en RichText
		{
			name: 'content',
			title: 'Contenu',
			type: 'array',
			of: [{ type: 'block' }],
		},
		// Relationnel avec les espaces du secteur
		{
			name: 'spaces',
			title: 'Espaces',
			type: 'array',
			of: [
				{
					type: 'reference',
					to: [{ type: 'spaces' }],
					options: {
						disableNew: true,
					},
				},
			],
		},
		// Galerie du secteur
		{
			name: 'gallery',
			title: 'Galerie',
			type: 'array',
			of: [
				{
					type: 'image',
					options: {
						hotspot: true,
					},
				},
			],
		},
		//
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'description',
			media: 'heroImage',
		},
	},
}
