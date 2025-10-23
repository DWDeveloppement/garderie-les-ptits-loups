'use client'
// 📂 src/hooks/a11y/useLinkA11y.ts
// 👉 Hook pour la gestion de l'accessibilité des liens

import { useEffect } from 'react'

export interface LinkA11yOptions {
	href: string
	children: React.ReactNode
	ariaLabel?: string
	target?: string
	rel?: string
	external?: boolean
}

export interface LinkA11yReturn {
	ariaLabel: string
	role: string
	tabIndex: number
	target: string
	rel: string
}

/**
 * Hook pour gérer l'accessibilité des liens
 * - Génère des avertissements en développement
 * - Gère les liens externes automatiquement
 * - Fournit des fallbacks pour l'aria-label
 */
export function useLinkA11y({ href, children, ariaLabel, target, rel, external = false }: LinkA11yOptions): LinkA11yReturn {
	// Détection automatique des liens externes
	const isExternal = external || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')

	// Avertissement en développement si ariaLabel manque
	useEffect(() => {
		if (process.env.NODE_ENV === 'development' && !ariaLabel) {
			const linkText = typeof children === 'string' ? children : 'Lien sans texte'
			console.warn(`[useLinkA11y] aria-label manquant pour le lien "${linkText}". Ajoutez un aria-label explicite pour l'accessibilité.`)
		}
	}, [ariaLabel, children])

	// Génération automatique de l'aria-label
	const generateAriaLabel = (): string => {
		if (ariaLabel) return ariaLabel

		// Fallback basé sur le contenu
		if (typeof children === 'string') {
			return children
		}

		// Fallback basé sur le type de lien
		if (href.startsWith('mailto:')) {
			return `Envoyer un email à ${href.replace('mailto:', '')}`
		}

		if (href.startsWith('tel:')) {
			return `Appeler au ${href.replace('tel:', '')}`
		}

		if (isExternal) {
			return 'Ouvrir le lien externe'
		}

		return 'Aller à la page'
	}

	// Gestion des attributs de sécurité pour les liens externes
	const getSecurityAttributes = () => {
		if (isExternal) {
			return {
				target: target || '_blank',
				rel: rel || 'noopener noreferrer',
			}
		}

		return {
			target: target || '_self',
			rel: rel || '',
		}
	}

	const securityAttrs = getSecurityAttributes()

	return {
		ariaLabel: generateAriaLabel(),
		role: 'link',
		tabIndex: 0,
		target: securityAttrs.target,
		rel: securityAttrs.rel,
	}
}
