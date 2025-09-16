'use client'
import { BREAKPOINTS, BreakpointSize, getCurrentBreakpoint, isDesktop, isMobile, isSmallScreen, isTablet } from '@/types/breakpoints'
import { useEffect, useState } from 'react'

type WindowSize = {
	width: number
	height: number
}

type DeviceInfo = {
	currentBreakpoint: BreakpointSize
	isMobile: boolean
	isTablet: boolean
	isDesktop: boolean
	isSmallScreen: boolean
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

// Hook amélioré avec informations sur les breakpoints
export function useBreakpoint() {
	const { width, height } = useWindowSize()

	const deviceInfo: DeviceInfo = {
		currentBreakpoint: getCurrentBreakpoint(width),
		isMobile: isMobile(width),
		isTablet: isTablet(width),
		isDesktop: isDesktop(width),
		isSmallScreen: isSmallScreen(width),
	}

	return {
		width,
		height,
		...deviceInfo,
		// Fonctions utilitaires
		isBreakpoint: (breakpoint: BreakpointSize) => width >= BREAKPOINTS[breakpoint],
		isBelowBreakpoint: (breakpoint: BreakpointSize) => width < BREAKPOINTS[breakpoint],
		isAboveBreakpoint: (breakpoint: BreakpointSize) => width >= BREAKPOINTS[breakpoint],
	}
}

// Hook spécialisé pour le menu mobile
export function useMobileMenuControl(isMenuOpen: boolean, breakpointSize: BreakpointSize, closeMenu: () => void) {
	const { width, isMobile, isBreakpoint } = useBreakpoint()

	useEffect(() => {
		// Si on passe au breakpoint spécifié et que le menu est ouvert
		if (isBreakpoint(breakpointSize) && isMenuOpen) {
			closeMenu()
		}
	}, [isMenuOpen, closeMenu, isBreakpoint, breakpointSize])

	return { width, isMobile, isBreakpoint }
}
