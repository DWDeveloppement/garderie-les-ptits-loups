// ============================================================================
// EXPORTS SANITY - Point d'entrée unique
// ============================================================================

// Client et configuration
export { client, sanityFetch } from './client'

// Queries modulaires (toutes les pages)
export * from './queries'

// Images et optimisation
export {
	getBasicImageProps,
	getGalleryImageProps,
	getGalleryImagePropsOptimized,
	getHeroImageFillProps,
	getHeroImageProps,
	getHeroImagePropsOptimized,
	getSeoImageProps,
	getSeoShareImageProps,
} from './helpers/imageProps'

// Gallery transformation
export {
	DEFAULT_GALLERY_CONFIG,
	GALLERY_BREAKPOINTS,
	getOptimalGalleryLayout,
	transformSanityGalleryToPhotos,
	transformSanityImageToPhoto,
} from './helpers/galleryTransform'

// Types
export type { NextImageProps, NextImagePropsWithPriority } from './helpers/imageProps'

// Query fragments (pour queries custom)
export { BASIC_IMAGE_QUERY, GALLERY_IMAGE_QUERY, HERO_IMAGE_QUERY, IMAGE_QUERY_FRAGMENT, SEO_IMAGE_QUERY } from './helpers/imageProps'
