'use client'
// 📂 src/hooks/a11y/useFocusA11y.ts
// 👉 Hook pour la gestion du focus et de la navigation clavier

import { useCallback, useEffect, useRef } from 'react'

export interface FocusA11yOptions {
	trapFocus?: boolean
	restoreFocus?: boolean
	initialFocus?: boolean
	onEscape?: () => void
}

export interface FocusA11yReturn {
	containerRef: React.RefObject<HTMLElement | null>
	focusFirst: () => void
	focusLast: () => void
	focusNext: () => void
	focusPrevious: () => void
	handleKeyDown: (event: React.KeyboardEvent) => void
}

/**
 * Hook pour gérer le focus et la navigation clavier
 * - Piège le focus dans un conteneur
 * - Gère la navigation avec Tab/Shift+Tab
 * - Gère les touches fléchées
 * - Restaure le focus après fermeture
 */
export function useFocusA11y({
	trapFocus = false,
	restoreFocus = false,
	initialFocus = false,
	onEscape,
}: FocusA11yOptions = {}): FocusA11yReturn {
	const containerRef = useRef<HTMLElement>(null)
	const previousActiveElement = useRef<HTMLElement | null>(null)

	// Sauvegarde de l'élément actif avant ouverture
	useEffect(() => {
		if (restoreFocus) {
			previousActiveElement.current = document.activeElement as HTMLElement
		}
	}, [restoreFocus])

	// Récupération des éléments focusables
	const getFocusableElements = useCallback((): HTMLElement[] => {
		if (!containerRef.current) return []

		const focusableSelectors = [
			'button:not([disabled])',
			'input:not([disabled])',
			'select:not([disabled])',
			'textarea:not([disabled])',
			'a[href]',
			'[tabindex]:not([tabindex="-1"])',
		].join(', ')

		return Array.from(containerRef.current.querySelectorAll(focusableSelectors))
	}, [])

	const getFirstFocusableElement = useCallback((): HTMLElement | null => {
		const elements = getFocusableElements()
		return elements[0] || null
	}, [getFocusableElements])

	// Focus initial
	useEffect(() => {
		if (initialFocus && containerRef.current) {
			const firstFocusable = getFirstFocusableElement()
			firstFocusable?.focus()
		}
	}, [initialFocus, getFirstFocusableElement])

	// Restauration du focus
	useEffect(() => {
		return () => {
			if (restoreFocus && previousActiveElement.current) {
				previousActiveElement.current.focus()
			}
		}
	}, [restoreFocus])

	const getLastFocusableElement = useCallback((): HTMLElement | null => {
		const elements = getFocusableElements()
		return elements[elements.length - 1] || null
	}, [getFocusableElements])

	// Navigation du focus
	const focusFirst = useCallback(() => {
		const first = getFirstFocusableElement()
		first?.focus()
	}, [getFirstFocusableElement])

	const focusLast = useCallback(() => {
		const last = getLastFocusableElement()
		last?.focus()
	}, [getLastFocusableElement])

	const focusNext = useCallback(() => {
		const elements = getFocusableElements()
		const currentIndex = elements.indexOf(document.activeElement as HTMLElement)
		const nextIndex = currentIndex < elements.length - 1 ? currentIndex + 1 : 0
		elements[nextIndex]?.focus()
	}, [getFocusableElements])

	const focusPrevious = useCallback(() => {
		const elements = getFocusableElements()
		const currentIndex = elements.indexOf(document.activeElement as HTMLElement)
		const prevIndex = currentIndex > 0 ? currentIndex - 1 : elements.length - 1
		elements[prevIndex]?.focus()
	}, [getFocusableElements])

	// Gestion des événements clavier
	const handleKeyDown = useCallback(
		(event: React.KeyboardEvent) => {
			switch (event.key) {
				case 'Tab':
					if (trapFocus) {
						event.preventDefault()
						if (event.shiftKey) {
							focusPrevious()
						} else {
							focusNext()
						}
					}
					break

				case 'Escape':
					onEscape?.()
					break

				case 'Home':
					event.preventDefault()
					focusFirst()
					break

				case 'End':
					event.preventDefault()
					focusLast()
					break
			}
		},
		[trapFocus, focusNext, focusPrevious, focusFirst, focusLast, onEscape]
	)

	return {
		containerRef,
		focusFirst,
		focusLast,
		focusNext,
		focusPrevious,
		handleKeyDown,
	}
}
