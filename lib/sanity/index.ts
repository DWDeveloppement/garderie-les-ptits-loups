// ============================================================================
// EXPORTS SANITY - Point d'entrée unique
// ============================================================================

// Client et configuration
export { cachedFetch, clearCache, client, getCacheSize } from './client'

// Queries et fonctions de récupération
export {
	getActivities,
	getAllGalleries,
	// Utilitaires
	getAllPages,
	getGalleryBySlug,
	getNews,
	// Pages dynamiques
	getPageBySlug,
	// Données stables
	getPrices,
	getRecentNews,
	// Données fréquentes
	getSchedules,
	getStructure,
	getSubsidies,
	getTeam,
	queries,
	type Activity,
	type Gallery,
	type GalleryPhoto,
	type News,
	type Page,
	type Price,
	type PriceItem,
	type PricingBlock,
	type PricingData,
	// Types
	type Schedule,
	type Structure,
	type Subsidy,
	type SubsidyItem,
	type TeamMember,
} from './queries'

// Images et optimisation
export {
	getGalleryImageUrl,
	getOptimizedImageUrl,
	getResponsiveImageSrcSet,
	getThumbnailUrl,
	transformToPhotoAlbumFormat,
	urlFor,
} from './image-url'
