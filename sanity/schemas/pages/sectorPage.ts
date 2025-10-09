import { type Rule, type SchemaTypeDefinition } from 'sanity'
import { GalleryInput } from '../../components/GalleryInput'
import { hero, imageParalax, seo } from '../components'

export const sectorPage: SchemaTypeDefinition = {
	name: 'sectorPage',
	title: 'Page Secteur',
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
			title: 'Slug (calculé automatiquement)',
			type: 'slug',
			hidden: true, // Masqué pour éviter toute modification
			readOnly: true,
			// Calculé depuis l'_id: la-structure/{documentId}
			initialValue: (doc: { _id?: string }) => {
				return doc._id ? { current: `la-structure/${doc._id}` } : undefined
			},
		},
		// Hero
		{
			name: 'sectionHero',
			title: 'Section Hero',
			type: hero.name,
		},
		// Espaces liés (références vers les pages espaces)
		{
			name: 'linkedSpaces',
			title: 'Espaces liés',
			type: 'array',
			of: [
				{
					type: 'reference',
					to: [{ type: 'spacePage' }],
					options: {
						disableNew: true,
					},
				},
			],
		},
		// Image parallaxe
		{
			name: 'parallax',
			title: 'Image Parallaxe',
			type: imageParalax.name,
		},
		// Contenu en rich-text
		{
			name: 'content',
			title: 'Contenu',
			type: 'array',
			of: [{ type: 'block' }],
		},
		// Galerie
		{
			name: 'gallery',
			title: 'Galerie',
			type: 'array',
			options: {
				layout: 'grid',
			},
			of: [
				{
					type: 'seoImage',
				},
			],
			components: {
				input: GalleryInput,
			},
		},
		// SEO
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
			subtitle: 'slug.current',
			media: 'sectionHero.image',
		},
	},
}
