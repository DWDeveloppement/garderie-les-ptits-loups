// 📂 hooks/a11y/useButtonA11yProps.ts
// 👉 Hook unifié pour la gestion de l'accessibilité du composant Button
// Responsabilité unique : Fusionner toutes les props a11y selon le mode du Button

import type { ButtonMode } from '@ui/types/button'

export type ButtonA11yProps = {
	mode: ButtonMode
	href?: string
	disabled?: boolean
	loading?: boolean
	external?: boolean
}

/**
 * Détecte si un lien est externe basé sur son href
 */
function isExternalLink(href: string): boolean {
	if (!href) return false
	return href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('//')
}

/**
 * Hook unifié pour toutes les props d'accessibilité du Button
 * Responsabilité unique : Retourner les props a11y appropriées selon le mode
 */
export function useButtonA11yProps({ mode, href, disabled, loading, external }: ButtonA11yProps) {
	// Mode decorative : pas d'interaction
	if (mode === 'decorative') {
		return {
			role: 'presentation' as const,
			'aria-hidden': 'true' as const,
		}
	}

	// Mode button : props de bouton
	if (mode === 'button') {
		return {
			role: 'button' as const,
			'aria-disabled': disabled || loading ? true : undefined,
			'aria-busy': loading ? true : undefined,
			tabIndex: disabled || loading ? -1 : 0,
		}
	}

	// Mode link ou next-link : props de lien
	if (mode === 'link' || mode === 'next-link') {
		if (!href) {
			// Si pas de href, traiter comme un bouton
			return {
				role: 'button' as const,
				'aria-disabled': disabled || loading ? true : undefined,
				tabIndex: disabled || loading ? -1 : 0,
			}
		}

		const isExternal = external ?? isExternalLink(href)

		return {
			role: 'link' as const,
			href,
			target: isExternal ? '_blank' : undefined,
			rel: isExternal ? 'noopener noreferrer' : undefined,
			'aria-disabled': disabled || loading ? true : undefined,
		}
	}

	// Fallback par défaut
	return {}
}
