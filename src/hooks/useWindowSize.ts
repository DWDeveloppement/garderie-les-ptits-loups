'use client'
import { useEffect, useState } from 'react'

interface WindowSize {
	width: number
	height: number
}

export function useWindowSize() {
	const [windowSize, setWindowSize] = useState<WindowSize>({
		width: 0,
		height: 0,
	})

	useEffect(() => {
		// Fonction pour mettre à jour la taille
		function handleResize() {
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			})
		}

		// Définir la taille initiale
		handleResize()

		// Écouter les changements de taille
		window.addEventListener('resize', handleResize)

		// Nettoyer l'écouteur d'événement
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	return windowSize
}

// Hook spécialisé pour le menu mobile
export function useMobileMenuControl(
	isMenuOpen: boolean,
	closeMenu: () => void,
	breakpoint: number = 768 // md breakpoint par défaut
) {
	const { width } = useWindowSize()

	useEffect(() => {
		// Si on passe au desktop (width >= breakpoint) et que le menu est ouvert
		if (width >= breakpoint && isMenuOpen) {
			closeMenu()
		}
	}, [width, breakpoint, isMenuOpen, closeMenu])

	return { width, isMobile: width < breakpoint }
}
