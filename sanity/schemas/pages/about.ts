import { type Rule, type SchemaTypeDefinition } from 'sanity'
import { ReadOnlySlug } from '../../components/ReadOnlySlug'
import { hero, paralaxImage, portableTextWithBlockquotes, seo } from '../components'

// Désactivé: page fixe gérée dans le code Next
export const aboutPage: SchemaTypeDefinition = {
	name: 'aboutPage',
	title: 'À Propos',
	type: 'document',
	fields: [
		{
			name: 'title',
			title: 'Titre',
			type: 'string',
			initialValue: 'À Propos',
			validation: (Rule: Rule) => Rule.required(),
		},
		// === CONTENU DE LA PAGE ===
		// === SECTION HERO ===
		{
			name: 'sectionHero',
			title: 'Section Hero',
			type: hero.name,
		},
		{
			name: 'introduction',
			title: 'Introduction',
			type: 'array',
			of: portableTextWithBlockquotes,
			validation: (Rule: Rule) => Rule.required(),
		},
		// 2) Image Parallaxe
		{
			name: 'parallaxOne',
			title: 'Image Parallaxe',
			type: paralaxImage.name,
		},
		// Histoire
		{
			name: 'historyCollapse',
			title: 'Historique',
			type: 'object',
			description: 'Historique de la garderie',
			fields: [
				{
					name: 'content',
					title: 'Contenu',
					type: 'array',
					of: portableTextWithBlockquotes,
				},
				{
					name: 'historyImage',
					title: 'Image',
					type: 'basicImage',
					options: {
						hotspot: true,
					},
				},
			],
			validation: (Rule: Rule) => Rule.required(),
		},
		// Image Parallaxe
		{
			name: 'parallaxTwo',
			title: 'Image Parallaxe',
			type: paralaxImage.name,
		},
		// équipe
		{
			name: 'team',
			title: 'Équipe',
			type: 'array',
			of: portableTextWithBlockquotes,
		},
		// valeurs
		{
			name: 'values',
			title: 'Valeurs',
			type: 'array',
			of: portableTextWithBlockquotes,
		},
		// pédagogie
		{
			name: 'pedagogy',
			title: 'Pédagogie',
			type: 'array',
			of: portableTextWithBlockquotes,
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
					initialValue: { current: 'a-propos' },
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
