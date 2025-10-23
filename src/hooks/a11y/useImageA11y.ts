'use client'
// 📂 src/hooks/a11y/useImageA11y.ts
// 👉 Hook pour la gestion de l'accessibilité des images

import { useEffect } from 'react'

export interface ImageA11yOptions {
	src: string
	alt?: string
	title?: string
	loading?: 'lazy' | 'eager'
	decorative?: boolean
	ariaLabel?: string
}

export interface ImageA11yReturn {
	alt: string
	title?: string
	role?: string
	loading: 'lazy' | 'eager'
	'aria-hidden'?: boolean
}

/**
 * Hook pour gérer l'accessibilité des images
 * - Génère des avertissements en développement
 * - Gère les images décoratives
 * - Fournit des fallbacks pour l'alt
 */
export function useImageA11y({ src, alt, title, loading = 'lazy', decorative = false, ariaLabel }: ImageA11yOptions): ImageA11yReturn {
	// Avertissement en développement si alt manque
	useEffect(() => {
		if (process.env.NODE_ENV === 'development' && !alt && !decorative) {
			console.warn(`[useImageA11y] Attribut alt manquant pour l'image "${src}". Ajoutez un alt explicite pour l'accessibilité.`)
		}
	}, [alt, src, decorative])

	// Génération automatique de l'alt
	const generateAlt = (): string => {
		if (decorative) return ''

		if (alt) return alt

		if (ariaLabel) return ariaLabel

		// Fallback basé sur le nom du fichier
		const filename = src.split('/').pop()?.split('.')[0] || 'Image'
		return `Image ${filename}`
	}

	// Gestion des images décoratives
	if (decorative) {
		return {
			alt: '',
			role: 'presentation',
			loading,
			'aria-hidden': true,
		}
	}

	return {
		alt: generateAlt(),
		title,
		loading,
		'aria-hidden': false,
	}
}
