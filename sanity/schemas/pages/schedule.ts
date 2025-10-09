import { type Rule, type SchemaTypeDefinition } from 'sanity'
import { hero, paralaxImage } from '../components'

export const schedulePage: SchemaTypeDefinition = {
	name: 'schedulePage',
	title: 'Horaires & Tarifs',
	type: 'document',
	fields: [
		{
			name: 'title',
			title: 'Titre',
			type: 'string',
			initialValue: 'Horaires & Tarifs',
			validation: (Rule: Rule) => Rule.required(),
		},
		{
			name: 'slug',
			title: 'Slug (non modifiable)',
			type: 'slug',
			readOnly: true,
			initialValue: { current: 'horaires-tarifs' },
			validation: (Rule: Rule) => Rule.required(),
		},
		// Tab Contenu de Page (ouvert par défaut)
		{
			name: 'sectionHero',
			title: 'Section Hero',
			type: hero.name,
		},
		// ===== NOUVELLES SECTIONS =====
		// 1) Section tarifs (titre + référence vers document de tarifs)
		{
			name: 'tarifsSectionNurserie',
			title: 'Section Tarifs Nurserie',
			type: 'object',
			fields: [
				{ name: 'title', title: 'Titre', type: 'string', validation: (Rule: Rule) => Rule.required() },
				{
					name: 'priceRef',
					title: 'Document de tarifs',
					type: 'reference',
					to: [{ type: 'prices' }],
					options: {
						filter: 'documentType == "accordion" && (frequentationType == "monthly-nursery" || frequentationType == "daily-nursery")',
						disableNew: true,
					},
					// juste choisir dans la liste, pas de add new item
					validation: (Rule: Rule) => Rule.required(),
				},
			],
		},
		{
			name: 'tarifsSectionTG',
			title: 'Section Tarifs Trotteurs et Grands',
			type: 'object',
			fields: [
				{ name: 'title', title: 'Titre', type: 'string', validation: (Rule: Rule) => Rule.required() },
				{
					name: 'priceRef',
					title: 'Document de tarifs',
					type: 'reference',
					to: [{ type: 'prices' }],
					options: {
						filter:
							'documentType == "accordion" && (frequentationType == "monthly-trotteurs-grands" || frequentationType == "daily-trotteurs-grands")',
						disableNew: true,
					},
					// juste choisir dans la liste, pas de add new item
					validation: (Rule: Rule) => Rule.required(),
				},
			],
		},
		// 2) Image Parallaxe
		{
			name: 'parallax',
			title: 'Image Parallaxe',
			type: paralaxImage.name,
		},

		// 3) Section tarifs avec description (titre + description multiline + référence)
		{
			name: 'subsidiesTable',
			title: 'tableau des subventions',
			type: 'object',
			fields: [
				{ name: 'title', title: 'Titre', type: 'string', validation: (Rule: Rule) => Rule.required() },
				{
					name: 'body',
					type: 'array',
					title: 'Saisir le texte des coditions de subsides',
					of: [
						{
							type: 'block', // This enables rich text editing with block content
						},
					],
				},

				{
					name: 'tableauSubsidies',
					title: 'Tableau des subventions',
					type: 'reference',
					to: [{ type: 'prices' }],
					options: {
						filter: 'documentType == "table"',
						disableNew: true,
					},
					// juste choisir dans la liste, pas de add new item
					validation: (Rule: Rule) => Rule.required(),
				},
			],
		},
		{
			name: 'seo',
			title: 'SEO',
			type: 'object',
			options: {
				collapsible: true,
				collapsed: true,
			},
			fields: [
				{
					name: 'metaTitle',
					title: 'Meta Title',
					type: 'string',
					initialValue: "Horaires & Tarifs - Garderie Les P'tits Loups",
					validation: (Rule: Rule) => Rule.max(60),
				},
				{
					name: 'metaDescription',
					title: 'Meta Description',
					type: 'text',
					rows: 3,
					initialValue: "Découvrez nos horaires, tarifs et subventions pour la garderie Les P'tits Loups.",
					validation: (Rule: Rule) => Rule.max(160),
				},
				{
					name: 'keywords',
					title: 'Mots-clés',
					type: 'array',
					of: [{ type: 'string' }],
					initialValue: ['horaires', 'tarifs', 'subventions', 'garderie', 'crèche'],
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
