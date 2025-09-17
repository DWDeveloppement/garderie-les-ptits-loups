import imageUrlBuilder from '@sanity/image-url'
import { client } from './client'

// ============================================================================
// TYPES SANITY
// ============================================================================

type SanityImageAsset = {
	_id: string
	url: string
	metadata: {
		dimensions: {
			width: number
			height: number
		}
	}
}

type SanityImageSource = {
	asset: SanityImageAsset
	alt?: string
	caption?: string
}

// ============================================================================
// BUILDER D'IMAGES SANITY
// ============================================================================

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource | SanityImageAsset) {
	return builder.image(source)
}

// ============================================================================
// FONCTIONS D'OPTIMISATION D'IMAGES
// ============================================================================

export function getOptimizedImageUrl(
	asset: SanityImageAsset,
	width: number,
	height?: number,
	quality = 85,
	format: 'webp' | 'jpg' | 'png' = 'webp'
) {
	let imageBuilder = urlFor(asset).width(width).quality(quality).format(format)

	if (height) {
		imageBuilder = imageBuilder.height(height)
	}

	return imageBuilder.url()
}

export function getResponsiveImageSrcSet(asset: SanityImageAsset, baseWidth: number, quality = 85) {
	const sizes = [400, 800, 1200, 1600, 2000]

	return sizes.map((size) => ({
		src: getOptimizedImageUrl(asset, size, undefined, quality),
		width: size,
		height: Math.round((asset.metadata.dimensions.height * size) / asset.metadata.dimensions.width),
	}))
}

export function getThumbnailUrl(asset: SanityImageAsset, size = 300) {
	return getOptimizedImageUrl(asset, size, size, 80, 'webp')
}

export function getGalleryImageUrl(asset: SanityImageAsset, width = 1200, height = 800) {
	return getOptimizedImageUrl(asset, width, height, 85, 'webp')
}

// ============================================================================
// TRANSFORMATION POUR REACT PHOTO ALBUM
// ============================================================================

export function transformToPhotoAlbumFormat(photos: SanityImageSource[]) {
	return photos.map((photo) => ({
		src: getGalleryImageUrl(photo.asset),
		width: photo.asset.metadata.dimensions.width,
		height: photo.asset.metadata.dimensions.height,
		alt: photo.alt || '',
		caption: photo.caption || '',
		srcSet: getResponsiveImageSrcSet(photo.asset, photo.asset.metadata.dimensions.width),
	}))
}

// ============================================================================
// EXPORTS
// ============================================================================

export default urlFor
