/**
 * Utilitaires d'optimisation d'images
 * Approche simple et organisée
 */

import { imageBuilder } from 'lib/sanity/client'

type SanityImageAsset = {
	_id: string
	url: string
	metadata: {
		dimensions: {
			width: number
			height: number
			aspectRatio: number
		}
		lqip?: string
		blurhash?: string | null
	}
}

/**
 * Génère une URL d'image optimisée avec Sanity
 */
export function getOptimizedImageUrl(asset: SanityImageAsset, width: number, quality: number = 85, format: 'webp' = 'webp'): string {
	return imageBuilder
		.image(asset)
		.width(Math.min(width, 1920)) // Limite à 1920px max
		.quality(quality)
		.format(format)
		.url()
}

/**
 * Sizes optimisés selon le contexte
 */
export const IMAGE_SIZES = {
	hero: '(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1920px',
	gallery: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
	card: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw',
	thumbnail: '(max-width: 768px) 50vw, 25vw',
} as const

/**
 * Props optimisées pour les images Hero
 */
export function getHeroImageProps() {
	return {
		priority: true,
		quality: 90,
		sizes: IMAGE_SIZES.hero,
		loading: 'eager' as const,
	}
}

/**
 * Props optimisées pour les images de galerie
 */
export function getGalleryImageProps() {
	return {
		priority: false,
		quality: 85,
		sizes: IMAGE_SIZES.gallery,
		loading: 'lazy' as const,
	}
}

/**
 * Props optimisées pour les images de carte
 */
export function getCardImageProps() {
	return {
		priority: false,
		quality: 85,
		sizes: IMAGE_SIZES.card,
		loading: 'lazy' as const,
	}
}
