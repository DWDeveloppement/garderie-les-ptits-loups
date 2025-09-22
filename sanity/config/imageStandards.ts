/**
 * Standards d'images pour l'optimisation selon l'usage
 * Définit les dimensions, qualité et formats pour chaque contexte
 */

export const IMAGE_STANDARDS = {
	hero: {
		width: 1920,
		height: 1080,
		quality: 85,
		format: 'webp' as const,
	},
	gallery: {
		width: 1200,
		height: 800,
		quality: 80,
		format: 'webp' as const,
	},
	section: {
		width: 800,
		height: 600,
		quality: 75,
		format: 'webp' as const,
	},
	thumbnail: {
		width: 400,
		height: 300,
		quality: 70,
		format: 'webp' as const,
	},
	article: {
		width: 600,
		height: 400,
		quality: 75,
		format: 'webp' as const,
	},
	other: {
		width: 800,
		height: 600,
		quality: 75,
		format: 'webp' as const,
	},
} as const

export const RESPONSIVE_BREAKPOINTS = {
	sm: 640,
	md: 768,
	lg: 1024,
	xl: 1280,
	'2xl': 1536,
} as const

/**
 * Obtient la configuration d'image pour un usage donné
 */
export function getImageConfig(usage: keyof typeof IMAGE_STANDARDS) {
	return IMAGE_STANDARDS[usage] || IMAGE_STANDARDS.other
}

/**
 * Vérifie si un usage est valide
 */
export function isValidUsage(usage: string): usage is keyof typeof IMAGE_STANDARDS {
	return usage in IMAGE_STANDARDS
}

/**
 * Obtient tous les usages disponibles
 */
export function getAvailableUsages(): (keyof typeof IMAGE_STANDARDS)[] {
	return Object.keys(IMAGE_STANDARDS) as (keyof typeof IMAGE_STANDARDS)[]
}

/**
 * Obtient le breakpoint pour une largeur donnée
 */
export function getImageBreakpoint(width: number): keyof typeof RESPONSIVE_BREAKPOINTS | null {
	const breakpoints = Object.entries(RESPONSIVE_BREAKPOINTS).sort(([, a], [, b]) => b - a)

	for (const [breakpoint, minWidth] of breakpoints) {
		if (width >= minWidth) {
			return breakpoint as keyof typeof RESPONSIVE_BREAKPOINTS
		}
	}

	return null
}

/**
 * Obtient tous les breakpoints d'images
 */
export function getAllImageBreakpoints(): number[] {
	return Object.values(RESPONSIVE_BREAKPOINTS).sort((a, b) => a - b)
}
