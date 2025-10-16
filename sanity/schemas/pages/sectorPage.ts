import { type Rule, type SchemaTypeDefinition } from 'sanity'
import { GalleryInput } from '../../components/GalleryInput'
import { ReadOnlySlug } from '../../components/ReadOnlySlug'
import { hero, paralaxImage, seo } from '../components'

export const sectorPage: SchemaTypeDefinition = {
	name: 'sectorPage',
	title: 'Page Secteur',
	type: 'document',
	fields: [
		{
			name: 'title',
			title: 'Titre',
			type: 'string',
			// Calculé automatiquement depuis l'_id du document
			initialValue: (doc: { _id?: string }) => {
				if (!doc._id) return undefined
				const id = doc._id.toLowerCase()
				if (id.includes('nurserie')) return 'La Nurserie'
				if (id.includes('trotteurs')) return 'Les Trotteurs'
				if (id.includes('grands')) return 'Les Grands'
				if (id.includes('autres-espaces')) return 'Les Autres Espaces'
				return undefined
			},
			validation: (Rule: Rule) => Rule.required().max(100),
		},
		// === CONTENU DE LA PAGE ===
		// Hero
		{
			name: 'sectionHero',
			title: 'Section Hero',
			type: hero.name,
		},
		// Espaces liés (références vers les pages espaces)
		// Filtre automatique selon le secteur basé sur l'_id du document
		{
			name: 'linkedSpaces',
			title: 'Espaces liés',
			type: 'array',
			description: 'Les espaces sont automatiquement filtrés selon le secteur de cette page',
			of: [
				{
					type: 'reference',
					to: [{ type: 'spacePage' }],
					options: {
						filter: ({ document }) => {
							// Détecter le secteur depuis l'_id du document sectorPage
							const docId = document._id?.toLowerCase() || ''

							if (docId.includes('nurserie')) {
								return {
									filter: 'sector == $sector',
									params: { sector: 'nursery' },
								}
							}
							if (docId.includes('trotteurs')) {
								return {
									filter: 'sector == $sector',
									params: { sector: 'trotteurs' },
								}
							}
							if (docId.includes('grands')) {
								return {
									filter: 'sector == $sector',
									params: { sector: 'grands' },
								}
							}
							if (docId.includes('autres-espaces')) {
								return {
									filter: 'sector == $sector',
									params: { sector: 'other' },
								}
							}

							// Par défaut, afficher tous les espaces
							return { filter: '*' }
						},
						disableNew: true,
					},
				},
			],
		},
		// Image parallaxe (séparation visuelle)
		{
			name: 'parallax',
			title: 'Image Parallaxe',
			type: paralaxImage.name,
		},
		// Contenu en rich-text
		{
			name: 'content',
			title: 'Contenu',
			type: 'array',
			of: [{ type: 'block' }],
			description: 'Texte descriptif du secteur (histoire, approche pédagogique, etc.)',
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
					type: 'galleryImage',
				},
			],
			components: {
				input: GalleryInput,
			},
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
					// Calculé depuis l'_id: la-structure/{documentId}
					initialValue: (doc: { _id?: string }) => {
						return doc._id ? { current: `la-structure/${doc._id}` } : undefined
					},
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
			subtitle: 'devConfig.slug.current',
			media: 'sectionHero.image',
		},
	},
}
