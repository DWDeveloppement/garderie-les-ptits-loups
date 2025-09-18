import { type FieldDefinition, type PreviewValue, type Rule } from 'sanity'

/**
 * Plugin personnalisé pour combiner la gestion des médias avec l'optimisation SEO
 * Utilise sanity-plugin-media + champs SEO automatiques
 */

// Type personnalisé créé car Sanity ne fournit pas de type spécifique pour les previews d'images
type MediaPreviewSelection = {
	title?: string
	subtitle?: string
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	media?: any // Type générique pour les assets Sanity (any nécessaire pour compatibilité PreviewValue)
}

/**
 * Configuration pour les champs image avec SEO automatique
 * Compatible avec sanity-plugin-media
 */
export const mediaSEOField: FieldDefinition<'image'> = {
	name: 'image',
	title: 'Image',
	type: 'image',
	options: {
		hotspot: true,
		// Intégration avec sanity-plugin-media
		metadata: ['lqip', 'palette', 'exif', 'location'],
	},
	fields: [
		{
			name: 'alt',
			title: 'Texte alternatif (Alt)',
			type: 'string',
			description: "Description de l'image pour l'accessibilité et le SEO (obligatoire)",
			validation: (Rule: Rule) => Rule.required().max(125),
			options: {
				isHighlighted: true, // Affiche directement sous l'image
			},
		},
		{
			name: 'caption',
			title: 'Légende',
			type: 'string',
			description: "Légende optionnelle sous l'image",
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
			description: "Contexte d'utilisation (hero, galerie, article, etc.)",
			options: {
				list: [
					{ title: 'Hero (bannière principale)', value: 'hero' },
					{ title: 'Galerie', value: 'gallery' },
					{ title: 'Article/Blog', value: 'article' },
					{ title: 'Section', value: 'section' },
					{ title: 'Thumbnail', value: 'thumbnail' },
					{ title: 'Autre', value: 'other' },
				],
			},
		},
	],
	preview: {
		select: {
			title: 'alt',
			subtitle: 'caption',
			media: 'asset',
		},
		prepare(selection: MediaPreviewSelection): PreviewValue {
			const { title, subtitle, media } = selection
			return {
				title: title || 'Image sans alt text',
				subtitle: subtitle || 'Légende manquante',
				media,
			}
		},
	},
}

/**
 * Configuration pour les champs image simples (sans SEO avancé)
 * Pour les cas où on veut juste l'alt text obligatoire
 */
export const simpleImageField: FieldDefinition<'image'> = {
	name: 'image',
	title: 'Image',
	type: 'image',
	options: {
		hotspot: true,
		metadata: ['lqip', 'palette'],
	},
	fields: [
		{
			name: 'alt',
			title: 'Texte alternatif (Alt)',
			type: 'string',
			description: "Description de l'image pour l'accessibilité (obligatoire)",
			validation: (Rule: Rule) => Rule.required().max(125),
			options: {
				isHighlighted: true,
			},
		},
	],
	preview: {
		select: {
			title: 'alt',
			media: 'asset',
		},
		prepare(selection: Omit<MediaPreviewSelection, 'subtitle'>): PreviewValue {
			const { title, media } = selection
			return {
				title: title || 'Image sans alt text',
				media,
			}
		},
	},
}
