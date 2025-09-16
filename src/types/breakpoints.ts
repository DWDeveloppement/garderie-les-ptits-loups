// Types pour les breakpoints Tailwind CSS
export type BreakpointSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

// Valeurs des breakpoints Tailwind (en pixels)
export const BREAKPOINTS = {
	xs: 0, // Extra small devices (portrait phones)
	sm: 640, // Small devices (landscape phones)
	md: 768, // Medium devices (tablets)
	lg: 1024, // Large devices (desktops)
	xl: 1280, // Extra large devices (large desktops)
	'2xl': 1536, // 2X large devices (larger desktops)
} as const

// Type pour les valeurs de breakpoints
export type BreakpointValues = typeof BREAKPOINTS

// Fonction utilitaire pour vérifier si une taille correspond à un breakpoint
export function isBreakpoint(width: number, breakpoint: BreakpointSize): boolean {
	return width >= BREAKPOINTS[breakpoint]
}

// Fonction pour obtenir le breakpoint actuel basé sur la largeur
export function getCurrentBreakpoint(width: number): BreakpointSize {
	if (width >= BREAKPOINTS['2xl']) return '2xl'
	if (width >= BREAKPOINTS.xl) return 'xl'
	if (width >= BREAKPOINTS.lg) return 'lg'
	if (width >= BREAKPOINTS.md) return 'md'
	if (width >= BREAKPOINTS.sm) return 'sm'
	return 'xs'
}

// Fonction pour vérifier si on est mobile (xs + sm)
export function isMobile(width: number): boolean {
	return width < BREAKPOINTS.md
}

// Fonction pour vérifier si on est tablet (md)
export function isTablet(width: number): boolean {
	return width >= BREAKPOINTS.md && width < BREAKPOINTS.lg
}

// Fonction pour vérifier si on est desktop (lg+)
export function isDesktop(width: number): boolean {
	return width >= BREAKPOINTS.lg
}

// Fonction pour vérifier si on est petit écran (xs + sm + md)
export function isSmallScreen(width: number): boolean {
	return width < BREAKPOINTS.lg
}
