/**
 * Utilitaires pour l'optimisation automatique des images Sanity
 * Génération des variantes selon les standards définis
 */

import { getImageConfig, type ImageUsage } from '../../sanity/config/imageStandards'
import { urlFor } from './image-url'

// Réexporter ImageUsage pour les composants
export type { ImageUsage }

/**
 * Type pour les images Sanity
 * Type simple compatible avec urlFor
 */
export type SanityImage = {
	asset: {
		_ref: string
		_type: string
		_id: string
		url: string
		[key: string]: unknown
	}
	alt?: string
	caption?: string
	credit?: string
	hotspot?: {
		x: number
		y: number
		height: number
		width: number
	}
	crop?: {
		top: number
		bottom: number
		left: number
		right: number
	}
}

/**
 * Type pour les options d'optimisation
 */
export type ImageOptimizationOptions = {
	usage: ImageUsage
	width?: number
	height?: number
	quality?: number
	format?: 'webp' | 'jpg' | 'png'
	hotspot?: boolean
	fit?: 'clip' | 'crop' | 'fill' | 'fillmax' | 'max' | 'scale' | 'min'
}

/**
 * Génère une URL d'image optimisée selon l'usage
 */
export function getOptimizedImageUrl(image: SanityImage, options: ImageOptimizationOptions): string {
	const config = getImageConfig(options.usage)

	// Utiliser les paramètres fournis ou les valeurs par défaut
	const width = options.width || config.width
	const height = options.height || config.height
	const quality = options.quality || config.quality
	const format = options.format || config.format
	const fit = options.fit || 'crop'

	// Cast nécessaire pour la compatibilité avec urlFor
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let builder = urlFor(image as any)
		.width(width)
		.height(height)
		.quality(quality)
		.format(format)
		.fit(fit)

	// Ajouter hotspot si spécifié
	if (options.hotspot && image.hotspot) {
		builder = builder.crop('focalpoint')
	}

	return builder.url()
}

/**
 * Génère un srcset responsive pour une image
 */
export function getResponsiveImageSrcSet(
	image: SanityImage,
	usage: ImageUsage,
	breakpoints?: Array<{ width: number; height: number }>
): string {
	// Breakpoints alignés avec Tailwind CSS (src/types/breakpoints.ts)
	// Utilise les breakpoints définis dans RESPONSIVE_BREAKPOINTS
	const defaultBreakpoints = [
		{ width: 320, height: 240 }, // xs: Extra small (portrait phones)
		{ width: 640, height: 480 }, // sm: Small (landscape phones)
		{ width: 768, height: 576 }, // md: Medium (tablets)
		{ width: 1024, height: 768 }, // lg: Large (desktops)
		{ width: 1280, height: 960 }, // xl: Extra large (large desktops)
		{ width: 1536, height: 1152 }, // 2xl: 2X large (larger desktops)
	]

	const points = breakpoints || defaultBreakpoints

	return points
		.map((point) => {
			const url = getOptimizedImageUrl(image, {
				usage,
				width: point.width,
				height: point.height,
			})
			return `${url} ${point.width}w`
		})
		.join(', ')
}

/**
 * Génère les métadonnées d'image pour le SEO
 */
export function getImageMetadata(image: SanityImage, usage: ImageUsage) {
	const config = getImageConfig(usage)

	return {
		url: getOptimizedImageUrl(image, { usage }),
		width: config.width,
		height: config.height,
		format: config.format,
		quality: config.quality,
		alt: image.alt || '',
		caption: image.caption || '',
		credit: image.credit || '',
		usage: usage,
		description: config.description,
	}
}

/**
 * Génère une image avec lazy loading
 */
export function getLazyImageProps(image: SanityImage, usage: ImageUsage) {
	const metadata = getImageMetadata(image, usage)
	const srcset = getResponsiveImageSrcSet(image, usage)

	return {
		src: metadata.url,
		srcSet: srcset,
		alt: metadata.alt,
		width: metadata.width,
		height: metadata.height,
		loading: 'lazy' as const,
		decoding: 'async' as const,
		style: {
			objectFit: 'cover' as const,
		},
		aspectRatio: metadata.width / metadata.height,
	}
}

/**
 * Génère une image hero avec preload
 */
export function getHeroImageProps(image: SanityImage) {
	const metadata = getImageMetadata(image, 'hero')
	const srcset = getResponsiveImageSrcSet(image, 'hero')

	return {
		src: metadata.url,
		srcSet: srcset,
		alt: metadata.alt,
		width: metadata.width,
		height: metadata.height,
		loading: 'eager' as const,
		decoding: 'sync' as const,
		priority: true,
		style: {
			objectFit: 'cover' as const,
		},
		aspectRatio: metadata.width / metadata.height,
	}
}

/**
 * Génère une image de galerie
 */
export function getGalleryImageProps(image: SanityImage, index: number) {
	const metadata = getImageMetadata(image, 'gallery')
	const srcset = getResponsiveImageSrcSet(image, 'gallery')

	return {
		src: metadata.url,
		srcSet: srcset,
		alt: metadata.alt,
		width: metadata.width,
		height: metadata.height,
		loading: index < 3 ? ('eager' as const) : ('lazy' as const),
		decoding: 'async' as const,
		style: {
			objectFit: 'cover' as const,
		},
		aspectRatio: metadata.width / metadata.height,
	}
}

/**
 * Génère une miniature
 */
export function getThumbnailImageProps(image: SanityImage) {
	const metadata = getImageMetadata(image, 'thumbnail')

	return {
		src: metadata.url,
		alt: metadata.alt,
		width: metadata.width,
		height: metadata.height,
		loading: 'lazy' as const,
		decoding: 'async' as const,
		style: {
			objectFit: 'cover' as const,
		},
		aspectRatio: metadata.width / metadata.height,
	}
}

/**
 * Génère une image d'article
 */
export function getArticleImageProps(image: SanityImage) {
	const metadata = getImageMetadata(image, 'article')
	const srcset = getResponsiveImageSrcSet(image, 'article')

	return {
		src: metadata.url,
		srcSet: srcset,
		alt: metadata.alt,
		width: metadata.width,
		height: metadata.height,
		loading: 'lazy' as const,
		decoding: 'async' as const,
		style: {
			objectFit: 'cover' as const,
		},
		aspectRatio: metadata.width / metadata.height,
	}
}

/**
 * Génère une image de section
 */
export function getSectionImageProps(image: SanityImage) {
	const metadata = getImageMetadata(image, 'section')
	const srcset = getResponsiveImageSrcSet(image, 'section')

	return {
		src: metadata.url,
		srcSet: srcset,
		alt: metadata.alt,
		width: metadata.width,
		height: metadata.height,
		loading: 'lazy' as const,
		decoding: 'async' as const,
		style: {
			objectFit: 'cover' as const,
		},
		aspectRatio: metadata.width / metadata.height,
	}
}

/**
 * Fonction utilitaire pour obtenir les props d'image selon l'usage
 */
export function getImagePropsByUsage(image: SanityImage, usage: ImageUsage) {
	switch (usage) {
		case 'hero':
			return getHeroImageProps(image)
		case 'gallery':
			return getGalleryImageProps(image, 0)
		case 'thumbnail':
			return getThumbnailImageProps(image)
		case 'article':
			return getArticleImageProps(image)
		case 'section':
			return getSectionImageProps(image)
		default:
			return getSectionImageProps(image)
	}
}
