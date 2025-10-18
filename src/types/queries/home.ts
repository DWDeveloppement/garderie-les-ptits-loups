// Types pour la page d'accueil depuis Sanity

import type { PortableTextBlock, SanityImage } from '../sanity/sectorPage'

/**
 * Secteur lié sur la page d'accueil
 */
export type LinkedSector = {
	_id: string
	title: string
	slug: string
	sectionHero: {
		description: string
		image: SanityImage
	}
}

/**
 * Espace lié sur la page d'accueil
 */
export type LinkedOtherSpace = {
	_id: string
	title: string
	sector: string
	image: SanityImage
	description?: PortableTextBlock[]
}

/**
 * Structure complète de la page d'accueil
 */
export type HomePageData = {
	title: string
	sectionHero: {
		description: string
		image: SanityImage
	}
	linkedSectors: LinkedSector[]
	linkedOtherSpaces: LinkedOtherSpace[]
	contentPage?: PortableTextBlock[]
	parallax?: {
		image: SanityImage
	}
	seo?: {
		metaTitle?: string
		metaDescription?: string
		keywords?: string[]
		shareImage?: SanityImage
	}
}
