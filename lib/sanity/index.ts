// ============================================================================
// EXPORTS SANITY - Point d'entrée unique
// ============================================================================

// Client et configuration
export { cachedFetch, clearCache, client, getCacheSize, sanityClient } from './client'

// Queries modulaires
export * as prices from './queries/prices'
export * as sectors from './queries/sectors'

// Images et optimisation
export { getBasicImageProps, getGalleryImageProps, getHeroImageProps, getSeoImageProps, getSeoShareImageProps } from './helpers/imageProps'
export type { NextImageProps } from './helpers/imageProps'
