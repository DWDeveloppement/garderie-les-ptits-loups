import { type Rule, type SchemaTypeDefinition } from 'sanity'
import { ReadOnlySlug } from '../../components/ReadOnlySlug'
import { hero, paralaxImage, portableTextBlockConfig, seo } from '../components'

export const schedulePage: SchemaTypeDefinition = {
	name: 'schedulePage',
	title: 'Tarifs',
	type: 'document',
	fields: [
		{
			name: 'title',
			title: 'Titre',
			type: 'string',
			initialValue: 'Tarifs',
			validation: (Rule: Rule) => Rule.required(),
		},
		// === CONTENU DE LA PAGE ===
		{
			name: 'sectionHero',
			title: 'Section Hero',
			type: hero.name,
		},
		// ===== SECTIONS TARIFS =====
		// Section tarifs Nurserie (titre + références vers documents de tarifs)
		{
			name: 'tarifsSectionNurserie',
			title: 'Tarifs Nurserie',
			type: 'object',
			description: 'Section des tarifs mensuels et journaliers pour la Nurserie',
			fields: [
				{ name: 'title', title: 'Titre de la section', type: 'string', validation: (Rule: Rule) => Rule.required() },
				{
					name: 'priceRefs',
					title: 'Tableaux des tarifs',
					type: 'array',
					description: 'Sélectionnez les documents de tarifs pour la Nurserie (mensuels + journaliers)',
					of: [
						{
							type: 'reference',
							to: [{ type: 'prices' }],
							options: {
								filter: 'documentType == "accordion" && (frequentationType == "monthly-nursery" || frequentationType == "daily-nursery")',
								disableNew: true,
							},
						},
					],
					validation: (Rule: Rule) => Rule.required().min(1),
				},
			],
		},
		{
			name: 'tarifsSectionTG',
			title: 'Tarifs Trotteurs & Grands',
			type: 'object',
			description: 'Section des tarifs mensuels et journaliers pour les Trotteurs et les Grands',
			fields: [
				{ name: 'title', title: 'Titre de la section', type: 'string', validation: (Rule: Rule) => Rule.required() },
				{
					name: 'priceRefs',
					title: 'Tableaux des tarifs',
					type: 'array',
					description: 'Sélectionnez les documents de tarifs pour Trotteurs & Grands (mensuels + journaliers)',
					of: [
						{
							type: 'reference',
							to: [{ type: 'prices' }],
							options: {
								filter:
									'documentType == "accordion" && (frequentationType == "monthly-trotteurs-grands" || frequentationType == "daily-trotteurs-grands")',
								disableNew: true,
							},
						},
					],
					validation: (Rule: Rule) => Rule.required().min(1),
				},
			],
		},
		// Image Parallaxe (séparation visuelle)
		{
			name: 'parallax',
			title: 'Image Parallaxe',
			type: paralaxImage.name,
		},

		// ===== SECTION SUBVENTIONS =====
		{
			name: 'subsidiesTable',
			title: 'Tableau des Subventions',
			type: 'object',
			description: 'Section explicative sur les subventions avec tableau détaillé',
			fields: [
				{ name: 'title', title: 'Titre de la section', type: 'string', validation: (Rule: Rule) => Rule.required() },
				{
					name: 'body',
					type: 'array',
					title: 'Conditions pour bénéficier des subventions',
					of: [portableTextBlockConfig],
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
		// === SEO & CONFIGURATION ===
		{
			name: 'seo',
			title: 'SEO',
			type: seo.name,
			options: {
				collapsible: true,
				collapsed: true,
			},
		},
		// Configuration développeur (slug, paramètres techniques)
		{
			name: 'devConfig',
			title: '⚙️ Configuration développeur',
			type: 'object',
			description: "Paramètres techniques - Uniquement à l'usage du développeur",
			options: {
				collapsible: true,
				collapsed: true,
			},
			fields: [
				{
					name: 'slug',
					title: 'Slug (URL de la page)',
					type: 'slug',
					initialValue: { current: 'tarifs' },
					validation: (Rule: Rule) => Rule.required(),
					components: {
						input: ReadOnlySlug,
					},
				},
			],
		},
	],
	preview: {
		select: {
			title: 'title',
			media: 'sectionHero.image',
		},
	},
}
