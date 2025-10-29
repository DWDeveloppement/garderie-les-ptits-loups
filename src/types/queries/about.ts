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
	// Introduction (rich-text avec images)
	introduction?: PortableTextBlock[]
	// Parallax 1
	parallaxOne?: {
		image: SanityImage
	}
	// Histoire
	history?: PortableTextBlock[]
	// Parallax 2
	parallaxTwo?: {
		image: SanityImage
	}
	// Pédagogie
	pedagogy?: PortableTextBlock[]
	// SEO
	seo?: {
		metaTitle?: string
		metaDescription?: string
		keywords?: string[]
		shareImage?: SanityImage
	}
}
