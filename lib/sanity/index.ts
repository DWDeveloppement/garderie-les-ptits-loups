// ============================================================================
// EXPORTS SANITY - Point d'entrée unique
// ============================================================================

// Client et configuration
export { cachedFetch, clearCache, client, getCacheSize } from './client'

// Queries et fonctions de récupération
export { getPrices, getSubsidies } from './queries'

// Images et optimisation
export {
	getGalleryImageUrl,
	getOptimizedImageUrl,
	getResponsiveImageSrcSet,
	getThumbnailUrl,
	transformToPhotoAlbumFormat,
	urlFor,
} from './image-url'
