/**
 * Standards de qualité pour les images Sanity
 * Configuration centralisée pour la génération automatique des variantes
 */

export type ImageUsage = 'hero' | 'gallery' | 'section' | 'thumbnail' | 'article' | 'other'

export type ImageConfig = {
	width: number
	height: number
	quality: number
	format: 'webp' | 'jpg' | 'png'
	description: string
	useCase: string
}

/**
 * Configuration des variantes d'images par usage
 */
export const IMAGE_STANDARDS: Record<ImageUsage, ImageConfig> = {
	hero: {
		width: 1200,
		height: 630,
		quality: 90,
		format: 'webp',
		description: 'Images hero pour pages principales',
		useCase: 'Bannières principales, images de couverture',
	},

	gallery: {
		width: 800,
		height: 600,
		quality: 85,
		format: 'webp',
		description: 'Images pour galeries et carrousels',
		useCase: "Galerie photos, carrousels, grilles d'images",
	},

	section: {
		width: 600,
		height: 400,
		quality: 80,
		format: 'webp',
		description: 'Images pour sections de contenu',
		useCase: 'Sections de contenu, articles, présentations',
	},

	thumbnail: {
		width: 300,
		height: 200,
		quality: 75,
		format: 'webp',
		description: 'Miniatures et aperçus',
		useCase: "Miniatures, aperçus, listes d'images",
	},

	article: {
		width: 800,
		height: 500,
		quality: 80,
		format: 'webp',
		description: 'Images pour articles et actualités',
		useCase: 'Articles de blog, actualités, nouvelles',
	},

	other: {
		width: 600,
		height: 400,
		quality: 80,
		format: 'webp',
		description: 'Images pour autres usages',
		useCase: 'Usage non spécifique, images diverses',
	},
}

/**
 * Configuration du cache pour les variantes
 */
export const CACHE_CONFIG = {
	// TTL en secondes
	ttl: {
		short: 3600, // 1 heure
		medium: 86400, // 1 jour
		long: 604800, // 1 semaine
		permanent: 31536000, // 1 an
	},

	// Stratégies de cache
	strategy: {
		// Cache côté Sanity
		sanity: {
			enabled: true,
			ttl: 3600,
		},

		// Cache côté Next.js
		nextjs: {
			enabled: true,
			revalidate: 3600,
		},

		// Cache CDN
		cdn: {
			enabled: true,
			maxAge: 31536000,
			immutable: true,
		},
	},
}

/**
 * Limites et contraintes
 */
export const IMAGE_LIMITS = {
	// Taille maximale des fichiers
	maxFileSize: 5 * 1024 * 1024, // 5MB

	// Dimensions minimales
	minWidth: 1200,
	minHeight: 800,

	// Formats acceptés
	acceptedFormats: ['image/jpeg', 'image/png', 'image/webp', 'image/avif'],

	// Qualité minimale
	minQuality: 60,

	// Qualité maximale
	maxQuality: 95,
}

/**
 * Configuration des métadonnées automatiques
 */
export const METADATA_CONFIG = {
	// Métadonnées à extraire automatiquement
	extract: ['lqip', 'palette', 'exif', 'location'],

	// Génération automatique de LQIP
	lqip: {
		enabled: true,
		quality: 20,
		blur: 50,
	},

	// Génération automatique de palette
	palette: {
		enabled: true,
		colors: 6,
	},
}

/**
 * Fonction utilitaire pour obtenir la configuration d'un usage
 */
export function getImageConfig(usage: ImageUsage): ImageConfig {
	return IMAGE_STANDARDS[usage] || IMAGE_STANDARDS.other
}

/**
 * Fonction utilitaire pour valider un usage
 */
export function isValidUsage(usage: string): usage is ImageUsage {
	return Object.keys(IMAGE_STANDARDS).includes(usage)
}

/**
 * Fonction utilitaire pour obtenir tous les usages disponibles
 */
export function getAvailableUsages(): ImageUsage[] {
	return Object.keys(IMAGE_STANDARDS) as ImageUsage[]
}

/**
 * Configuration des breakpoints pour le responsive
 * Alignés avec les breakpoints Tailwind CSS définis dans src/types/breakpoints.ts
 *
 * Breakpoints Tailwind :
 * - xs: 0px (portrait phones)
 * - sm: 640px (landscape phones)
 * - md: 768px (tablets)
 * - lg: 1024px (desktops)
 * - xl: 1280px (large desktops)
 * - 2xl: 1536px (larger desktops)
 */
export const RESPONSIVE_BREAKPOINTS = {
	xs: { width: 320, height: 240 }, // Extra small (portrait phones)
	sm: { width: 640, height: 480 }, // Small (landscape phones)
	md: { width: 768, height: 576 }, // Medium (tablets)
	lg: { width: 1024, height: 768 }, // Large (desktops)
	xl: { width: 1280, height: 960 }, // Extra large (large desktops)
	'2xl': { width: 1536, height: 1152 }, // 2X large (larger desktops)
} as const

/**
 * Fonction utilitaire pour obtenir les breakpoints d'image selon le breakpoint Tailwind
 */
export function getImageBreakpoint(tailwindBreakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl') {
	return RESPONSIVE_BREAKPOINTS[tailwindBreakpoint]
}

/**
 * Fonction utilitaire pour obtenir tous les breakpoints d'image sous forme de tableau
 */
export function getAllImageBreakpoints(): Array<{ width: number; height: number; breakpoint: string }> {
	return Object.entries(RESPONSIVE_BREAKPOINTS).map(([breakpoint, dimensions]) => ({
		...dimensions,
		breakpoint,
	}))
}

/**
 * Configuration des formats de sortie
 */
export const OUTPUT_FORMATS = {
	// Format principal (WebP)
	primary: 'webp',

	// Formats de fallback
	fallback: ['jpeg', 'png'],

	// Formats modernes
	modern: ['avif', 'webp'],

	// Formats legacy
	legacy: ['jpeg', 'png'],
}
