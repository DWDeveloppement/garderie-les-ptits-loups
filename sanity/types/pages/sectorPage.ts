// 📂 sanity/types/pages/sectorPage.ts
// 👉 Types TypeScript pour les pages secteur Sanity

import type { PortableTextBlock } from '../core/portableText'
import type { SanityImage } from '../core/image'

/**
 * Item de galerie
 */
export type GalleryItem = {
	image: SanityImage
	label: string
}

/**
 * Espace lié (linked space)
 */
export type LinkedSpace = {
	_id: string
	title: string
	description: PortableTextBlock[]
	image: SanityImage
}

/**
 * Section Hero
 */
export type SectionHero = {
	description: string
	image: SanityImage
}

/**
 * Image parallaxe
 */
export type Parallax = {
	image: SanityImage
}

/**
 * SEO Metadata
 */
export type SeoMetadata = {
	metaTitle: string
	metaDescription: string
	keywords: string[]
	shareImage?: SanityImage
}

/**
 * Données complètes d'une page secteur
 * Structure EXACTE depuis Vision (sanity/queries/json-response/sectorPage.json)
 */
export type SectorPageData = {
	_id: string
	title: string
	slug: string | null
	content: PortableTextBlock[]
	gallery: GalleryItem[]
	linkedSpaces: LinkedSpace[]
	parallax: Parallax
	sectionHero: SectionHero
	seo: SeoMetadata | null
}

