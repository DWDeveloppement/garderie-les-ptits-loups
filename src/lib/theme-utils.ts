/**
 * Utilitaires pour la configuration du thème Radix
 * Permet d'ajouter Orange comme grayColor personnalisé
 *
 * NOTE: Radix Theme ne supporte que accentColor et grayColor
 * Pas de secondaryColor possible - limitation de l'API
 */

export const createOrangeGrayScale = () => {
	return {
		'--gray-1': 'oklch(0.994 0.0198 66.57)',
		'--gray-2': 'oklch(0.982 0.0264 66.57)',
		'--gray-3': 'oklch(0.956 0.0404 66.57)',
		'--gray-4': 'oklch(0.932 0.0605 66.57)',
		'--gray-5': 'oklch(0.91 0.0684 66.57)',
		'--gray-6': 'oklch(0.886 0.0889 66.57)',
		'--gray-7': 'oklch(0.853 0.111 66.57)',
		'--gray-8': 'oklch(0.792 0.1484 66.57)',
		'--gray-9': 'oklch(0.641 0.1836 66.57)',
		'--gray-10': 'oklch(0.606 0.1713 66.57)',
		'--gray-11': 'oklch(0.498 0.1408 66.57)',
		'--gray-12': 'oklch(0.243 0.1418 66.57)',
	}
}

/**
 * Applique l'échelle Orange comme grayColor
 * À utiliser dans un useEffect ou dans le CSS
 */
export const applyOrangeGrayScale = () => {
	const orangeScale = createOrangeGrayScale()
	const root = document.documentElement

	Object.entries(orangeScale).forEach(([property, value]) => {
		root.style.setProperty(property, value)
	})
}

/**
 * Configuration du thème pour la garderie
 *
 * LIMITATIONS Radix Theme:
 * - accentColor: purple (couleur d'accent)
 * - grayColor: gray (couleur neutre - notre Orange custom)
 * - Pas de secondaryColor disponible
 */
export const garderieThemeConfig = {
	appearance: 'light' as const,
	accentColor: 'purple' as const,
	grayColor: 'gray' as const, // Utilise notre échelle Orange custom
	radius: 'medium' as const,
	scaling: '100%' as const,
}

/**
 * Props disponibles pour le composant Theme de Radix UI
 * Source: https://www.radix-ui.com/themes/docs/theme/color
 */
export type RadixThemeProps = {
	appearance?: 'light' | 'dark' | 'inherit'
	accentColor?:
		| 'tomato'
		| 'red'
		| 'ruby'
		| 'crimson'
		| 'pink'
		| 'plum'
		| 'purple'
		| 'violet'
		| 'iris'
		| 'indigo'
		| 'blue'
		| 'cyan'
		| 'teal'
		| 'jade'
		| 'green'
		| 'grass'
		| 'brown'
		| 'orange'
		| 'sky'
		| 'mint'
		| 'lime'
		| 'yellow'
		| 'amber'
		| 'gold'
		| 'bronze'
		| 'gray'
	grayColor?: 'gray' | 'mauve' | 'slate' | 'sage' | 'olive' | 'sand' | 'auto'
	radius?: 'none' | 'small' | 'medium' | 'large' | 'full'
	scaling?: '90%' | '95%' | '100%' | '105%' | '110%'
	hasBackground?: boolean
}
