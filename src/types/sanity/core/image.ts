// 📂 sanity/types/core/image.ts
// 👉 Types centralisés pour les images Sanity

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

