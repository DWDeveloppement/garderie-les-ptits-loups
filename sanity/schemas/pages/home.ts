import { type Rule, type SchemaTypeDefinition } from 'sanity'
import { hero, paralaxImage, seo } from '../components'

// Désactivé: page fixe gérée dans le code Next
export const home: SchemaTypeDefinition = {
	name: 'home',
	title: "Page d'accueil",
	type: 'document',
	fields: [
		{
			name: 'title',
			title: 'Titre',
			type: 'string',
			validation: (Rule: Rule) => Rule.required().max(100),
		},
		{
			name: 'slug',
			title: 'Slug (non modifiable)',
			type: 'slug',
			readOnly: true,
			initialValue: { current: '/' },
			validation: (Rule: Rule) => Rule.required(),
		},
		// Tab Contenu de Page (ouvert par défaut)
		{
			name: 'sectionHero',
			title: 'Section Hero',
			type: hero.name,
		},
		// 2) Image Parallaxe
		{
			name: 'parallax',
			title: 'Image Parallaxe',
			type: paralaxImage.name,
		},
		// Tab SEO (fermé par défaut)
		{
			name: 'seo',
			title: 'SEO',
			type: seo.name,
			options: {
				collapsible: true,
				collapsed: true,
			},
		},
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'sectionHero.subtitle',
			media: 'sectionHero.image',
		},
	},
}
