// 📂 src/types/sanity/sectorPage.ts
// 👉 Types TypeScript générés depuis sanity/queries/json-response/sectorPage.json

import type { PortableTextBlock } from './portableText'

/**
 * Metadata des dimensions d'image Sanity
 */
export type SanityImageDimensions = {
	_type: 'sanity.imageDimensions'
	aspectRatio: number
	height: number
	width: number
}

/**
 * Metadata complète d'une image Sanity
 */
export type SanityImageMetadata = {
	dimensions: SanityImageDimensions
	lqip: string
	blurhash?: string | null
}

/**
 * Asset d'une image Sanity (référence)
 */
export type SanityImageAssetRef = {
	_id: string
	url: string
	metadata: SanityImageMetadata
}

/**
 * Image Sanity complète (avec asset, alt, crop, hotspot)
 */
export type SanityImage = {
	alt: string
	asset: SanityImageAssetRef
	crop: null | {
		bottom?: number
		left?: number
		right?: number
		top?: number
	}
	hotspot: null | {
		height?: number
		width?: number
		x?: number
		y?: number
	}
}

/**
 * Block de Portable Text (Sanity rich text)
 * @deprecated Utilisez PortableTextBlock depuis './portableText' à la place
 */
export type { PortableTextBlock }

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
