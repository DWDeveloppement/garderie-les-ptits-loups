// 📂 sanity/types/pages/home.ts
// 👉 Types pour la page d'accueil depuis Sanity

import type { PortableTextBlock } from '../core/portableText'
import type { SanityImage } from '../core/image'

/**
 * Secteur lié sur la page d'accueil
 */
export type LinkedSector = {
	_id: string
	title: string
	ageRange: string
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
	title?: string
	sectionHero: {
		title: string
		garderieName: string
		logo: SanityImage
		description: string
		buttonText: string
		buttonLink: string
	}
	sectionStructure?: {
		title?: string
		description?: string
		linkedSectors: LinkedSector[]
	}
	sectionOtherSpaces?: {
		title?: string
		introductionOtherSpaces?: string
		linkedOtherSpaces: LinkedOtherSpace[]
	}
	contentComplement?: PortableTextBlock[]
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

