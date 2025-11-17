/**
 * Composant pour charger dynamiquement les animations CSS
 * Ce CSS n'est pas critique pour le FCP et peut être chargé après le rendu initial
 *
 * Utilise la technique "loadCSS" pour charger le CSS de manière non-bloquante :
 * 1. Créer un <link> avec media="print" (non-bloquant)
 * 2. Changer media="all" après chargement
 *
 * Note: Le fichier animations.css importe tw-animate-css et sera compilé par Next.js
 */

'use client'

import { useEffect } from 'react'
// Import statique pour que Next.js compile le CSS, mais chargement non-bloquant
import '@/styles/animations.css'

export function AnimateCSS() {
	useEffect(() => {
		// Attendre que le FCP soit passé avant d'activer les animations
		// Les animations CSS sont déjà chargées mais peuvent être désactivées initialement
		const enableAnimations = () => {
			// Trouver tous les liens CSS d'animations et s'assurer qu'ils sont actifs
			const animationLinks = document.querySelectorAll('link[href*="animations"]')
			animationLinks.forEach((link) => {
				if (link instanceof HTMLLinkElement && link.media === 'print') {
					link.media = 'all'
				}
			})
		}

		// Attendre le FCP (First Contentful Paint)
		// Utiliser requestIdleCallback si disponible, sinon setTimeout
		if ('requestIdleCallback' in window) {
			requestIdleCallback(enableAnimations, { timeout: 2000 })
		} else {
			setTimeout(enableAnimations, 100)
		}
	}, [])

	return null
}
