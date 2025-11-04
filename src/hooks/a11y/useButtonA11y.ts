'use client'
// 📂 src/hooks/a11y/useButtonA11y.ts
// 👉 Hook pour la gestion de l'accessibilité des boutons

import { useEffect } from 'react'

export type ButtonA11yOptions = {
	ariaLabel?: string
	children: React.ReactNode
	disabled?: boolean
	loading?: boolean
}

export type ButtonA11yReturn = {
	ariaLabel: string
	role?: string
	tabIndex?: number
	disabled: boolean
}

/**
 * Hook pour gérer l'accessibilité des boutons
 * - Génère des avertissements en développement
 * - Fournit des fallbacks automatiques
 * - Gère les états spéciaux (loading, disabled)
 */
export function useButtonA11y({ ariaLabel, children, disabled = false, loading = false }: ButtonA11yOptions): ButtonA11yReturn {
	// Avertissement en développement si ariaLabel manque
	useEffect(() => {
		if (process.env.NODE_ENV === 'development' && !ariaLabel) {
			const buttonText = typeof children === 'string' ? children : 'Bouton sans texte'
			console.warn(
				`[useButtonA11y] aria-label manquant pour le bouton "${buttonText}". Ajoutez un aria-label explicite pour l'accessibilité.`
			)
		}
	}, [ariaLabel, children])

	// Génération automatique de l'aria-label
	const generateAriaLabel = (): string => {
		if (ariaLabel) return ariaLabel

		// Fallback basé sur le contenu
		if (typeof children === 'string') {
			return children
		}

		// Fallback générique
		return 'Bouton'
	}

	// Gestion des états spéciaux
	const getAriaLabel = (): string => {
		const baseLabel = generateAriaLabel()

		if (loading) {
			return `${baseLabel} - Chargement en cours`
		}

		if (disabled) {
			return `${baseLabel} - Désactivé`
		}

		return baseLabel
	}

	return {
		ariaLabel: getAriaLabel(),
		role: 'button',
		tabIndex: disabled ? -1 : 0,
		disabled: disabled || loading,
	}
}
