'use client'
// 📂 src/hooks/a11y/useGalleryState.ts
// 👉 Hook de gestion d'état pour la galerie photo

import { useCallback, useEffect, useState } from 'react'

export interface GalleryState {
	/** Index de la photo actuellement sélectionnée */
	currentIndex: number
	/** Galerie ouverte/fermée */
	isOpen: boolean
	/** Photo en cours de chargement */
	isLoading: boolean
}

export interface GalleryStateActions {
	/** Ouvrir la galerie à un index spécifique */
	openGallery: (index: number) => void
	/** Fermer la galerie */
	closeGallery: () => void
	/** Naviguer vers la photo suivante */
	goToNext: () => void
	/** Naviguer vers la photo précédente */
	goToPrev: () => void
	/** Aller à une photo spécifique */
	goToPhoto: (index: number) => void
	/** Basculer l'état de chargement */
	setLoading: (loading: boolean) => void
}

/**
 * Hook de gestion d'état pour la galerie photo
 * Centralise la logique d'état et les transitions
 */
export function useGalleryState(totalPhotos: number, initialIndex: number = 0): [GalleryState, GalleryStateActions] {
	const [state, setState] = useState<GalleryState>({
		currentIndex: initialIndex,
		isOpen: false,
		isLoading: false,
	})

	// const previousIndexRef = useRef<number>(initialIndex)

	// Ouvrir la galerie
	const openGallery = useCallback(
		(index: number) => {
			setState((prev) => ({
				...prev,
				currentIndex: Math.max(0, Math.min(index, totalPhotos - 1)),
				isOpen: true,
				isLoading: false,
			}))
		},
		[totalPhotos]
	)

	// Fermer la galerie
	const closeGallery = useCallback(() => {
		setState((prev) => ({
			...prev,
			isOpen: false,
			isLoading: false,
		}))
	}, [])

	// Navigation vers la photo suivante
	const goToNext = useCallback(() => {
		setState((prev) => {
			const nextIndex = prev.currentIndex < totalPhotos - 1 ? prev.currentIndex + 1 : 0
			return {
				...prev,
				currentIndex: nextIndex,
				isLoading: true,
			}
		})
	}, [totalPhotos])

	// Navigation vers la photo précédente
	const goToPrev = useCallback(() => {
		setState((prev) => {
			const prevIndex = prev.currentIndex > 0 ? prev.currentIndex - 1 : totalPhotos - 1
			return {
				...prev,
				currentIndex: prevIndex,
				isLoading: true,
			}
		})
	}, [totalPhotos])

	// Aller à une photo spécifique
	const goToPhoto = useCallback(
		(index: number) => {
			setState((prev) => ({
				...prev,
				currentIndex: Math.max(0, Math.min(index, totalPhotos - 1)),
				isLoading: true,
			}))
		},
		[totalPhotos]
	)

	// Basculer l'état de chargement
	const setLoading = useCallback((loading: boolean) => {
		setState((prev) => ({
			...prev,
			isLoading: loading,
		}))
	}, [])

	// Gestion des événements globaux
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (!state.isOpen) return

			switch (event.key) {
				case 'Escape':
					closeGallery()
					break
				case 'ArrowLeft':
					goToPrev()
					break
				case 'ArrowRight':
					goToNext()
					break
			}
		}

		if (state.isOpen) {
			document.addEventListener('keydown', handleKeyDown)
			// Empêcher le scroll de la page
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'unset'
		}

		return () => {
			document.removeEventListener('keydown', handleKeyDown)
			document.body.style.overflow = 'unset'
		}
	}, [state.isOpen, closeGallery, goToPrev, goToNext])

	// Auto-reset du loading après un délai
	useEffect(() => {
		if (state.isLoading) {
			const timer = setTimeout(() => {
				setLoading(false)
			}, 300) // Délai pour l'animation de transition

			return () => clearTimeout(timer)
		}
	}, [state.isLoading, setLoading])

	const actions: GalleryStateActions = {
		openGallery,
		closeGallery,
		goToNext,
		goToPrev,
		goToPhoto,
		setLoading,
	}

	return [state, actions]
}
