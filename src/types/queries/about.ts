// Types pour la page À propos depuis Sanity

import type { PortableTextBlock, SanityImage } from '../sanity/sectorPage'

/**
 * Structure complète de la page À propos
 */
export type AboutPageData = {
	title: string
	sectionHero: {
		description: string
		image: SanityImage
	}
	// Contenu de la page (Portable Text)
	contentPage?: PortableTextBlock[]
	// Parallax
	parallax?: {
		image: SanityImage
	}
	// SEO
	seo?: {
		metaTitle?: string
		metaDescription?: string
		keywords?: string[]
		shareImage?: SanityImage
	}
}
