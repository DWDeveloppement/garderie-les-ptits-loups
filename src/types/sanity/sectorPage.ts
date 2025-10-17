// 📂 src/types/sanity/sectorPage.ts
// 👉 Types TypeScript générés depuis sanity/queries/json-response/sectorPage.json

/**
 * Metadata des dimensions d'image Sanity
 */
export interface SanityImageDimensions {
	_type: 'sanity.imageDimensions'
	aspectRatio: number
	height: number
	width: number
}

/**
 * Metadata complète d'une image Sanity
 */
export interface SanityImageMetadata {
	dimensions: SanityImageDimensions
	lqip: string
	blurhash?: string | null
}

/**
 * Asset d'une image Sanity (référence)
 */
export interface SanityImageAssetRef {
	_id: string
	url: string
	metadata: SanityImageMetadata
}

/**
 * Image Sanity complète (avec asset, alt, crop, hotspot)
 */
export interface SanityImage {
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
 */
export interface PortableTextBlock {
	_key: string
	_type: 'block'
	children: Array<{
		_key: string
		_type: 'span'
		marks: string[]
		text: string
	}>
	markDefs: unknown[]
	style: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'blockquote'
}

/**
 * Item de galerie
 */
export interface GalleryItem {
	image: SanityImage
	label: string
}

/**
 * Espace lié (linked space)
 */
export interface LinkedSpace {
	_id: string
	title: string
	description: PortableTextBlock[]
	image: SanityImage
}

/**
 * Section Hero
 */
export interface SectionHero {
	description: string
	image: SanityImage
}

/**
 * Image parallaxe
 */
export interface Parallax {
	image: SanityImage
}

/**
 * SEO Metadata
 */
export interface SeoMetadata {
	metaTitle: string
	metaDescription: string
	keywords: string[]
	shareImage?: SanityImage
}

/**
 * Données complètes d'une page secteur
 * Structure EXACTE depuis Vision (sanity/queries/json-response/sectorPage.json)
 */
export interface SectorPageData {
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
