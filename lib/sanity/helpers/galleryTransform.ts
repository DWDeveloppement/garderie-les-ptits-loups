// 📂 lib/sanity/helpers/galleryTransform.ts
// 👉 Transformation des images Sanity pour react-photo-album

import type { Photo } from 'react-photo-album'
import { imageBuilder } from '../client'
import type { SanityGalleryImage } from './imageProps'

/**
 * Configuration pour les tailles d'images de galerie
 * Utilisé pour générer le srcset et optimiser le chargement
 */
export const GALLERY_BREAKPOINTS = [400, 600, 800, 1200, 1600] as const

/**
 * Transforme une image Sanity en Photo compatible react-photo-album
 *
 * @example
 * ```ts
 * const photo = transformSanityImageToPhoto(sanityImage);
 * <PhotoAlbum photos={[photo]} />
 * ```
 */
export function transformSanityImageToPhoto(galleryItem: SanityGalleryImage, index: number): Photo {
	const { image, label } = galleryItem

	if (!image?.asset) {
		throw new Error('Image asset is required')
	}

	const { metadata } = image.asset
	const width = metadata?.dimensions?.width || 800
	const height = metadata?.dimensions?.height || 600

	// Générer srcset pour images responsives
	const srcSet = GALLERY_BREAKPOINTS.map((breakpoint) => {
		const imageUrl = imageBuilder.image(image.asset).width(breakpoint).quality(85).format('webp').url()

		return {
			src: imageUrl,
			width: breakpoint,
			height: Math.round((height / width) * breakpoint),
		}
	})

	// Image principale (taille medium pour performance)
	const src = imageBuilder.image(image.asset).width(800).quality(85).format('webp').url()

	// Image haute résolution pour le lightbox
	const srcHigh = imageBuilder.image(image.asset).width(1920).quality(90).format('webp').url()

	return {
		src,
		width,
		height,
		alt: image.alt || label || `Image ${index + 1}`,
		title: label,
		// Données custom pour le lightbox
		srcSet,
		// @ts-expect-error - Custom properties for lightbox
		srcHigh,
		caption: label,
		blurDataURL: metadata?.lqip,
	}
}

/**
 * Transforme un tableau d'images Sanity en Photos
 *
 * @example
 * ```ts
 * const photos = transformSanityGalleryToPhotos(sectorPage.gallery);
 * <PhotoAlbum photos={photos} />
 * ```
 */
export function transformSanityGalleryToPhotos(gallery: SanityGalleryImage[] | null | undefined): Photo[] {
	if (!gallery || gallery.length === 0) {
		return []
	}

	return gallery
		.filter((item) => item.image?.asset) // Ne garder que les images valides
		.map((item, index) => transformSanityImageToPhoto(item, index))
}

/**
 * Calcule le layout optimal pour react-photo-album
 * Basé sur le nombre d'images et le type de layout souhaité
 */
export function getOptimalGalleryLayout(photoCount: number): 'rows' | 'columns' | 'masonry' {
	if (photoCount <= 3) return 'rows'
	if (photoCount <= 9) return 'columns'
	return 'masonry'
}

/**
 * Configuration par défaut pour react-photo-album
 * Optimisée pour performance et accessibilité
 */
export const DEFAULT_GALLERY_CONFIG = {
	spacing: 8,
	padding: 0,
	targetRowHeight: 300,
	rowConstraints: {
		minPhotos: 1,
		maxPhotos: 5,
	},
} as const
