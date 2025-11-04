'use client'
// 📂 src/hooks/a11y/useGalleryA11y.ts
// 👉 Hook d'accessibilité pour la galerie photo

import { useCallback } from 'react'

export type GalleryA11yOptions = {
	/** Nombre total de photos */
	totalPhotos: number
	/** Callback au clic sur une photo */
	onPhotoClick?: (index: number) => void
	/** Callback de navigation */
	onNavigate?: (direction: 'prev' | 'next', currentIndex: number) => void
	/** Callback de fermeture */
	onClose?: () => void
}

export type GalleryA11yActions = {
	/** Gérer le clic sur une photo */
	handlePhotoClick: (index: number) => void
	/** Gérer la navigation clavier */
	handleKeyDown: (event: React.KeyboardEvent, index: number) => void
	/** Gérer le clic souris */
	handleClick: (index: number) => void
	/** Gérer le focus */
	handleFocus: (index: number) => void
}

/**
 * Hook d'accessibilité pour la galerie photo
 * Gère tous les événements clavier et souris de manière centralisée
 */
export function useGalleryA11y({ totalPhotos, onPhotoClick, onNavigate, onClose }: GalleryA11yOptions): GalleryA11yActions {
	// Gestion du clic sur une photo
	const handlePhotoClick = useCallback(
		(index: number) => {
			onPhotoClick?.(index)
		},
		[onPhotoClick]
	)

	// Gestion de la navigation clavier
	const handleKeyDown = useCallback(
		(event: React.KeyboardEvent, index: number) => {
			switch (event.key) {
				case 'Enter':
				case ' ':
					event.preventDefault()
					handlePhotoClick(index)
					break

				case 'ArrowLeft':
					event.preventDefault()
					const prevIndex = index > 0 ? index - 1 : totalPhotos - 1
					onNavigate?.('prev', prevIndex)
					break

				case 'ArrowRight':
					event.preventDefault()
					const nextIndex = index < totalPhotos - 1 ? index + 1 : 0
					onNavigate?.('next', nextIndex)
					break

				case 'Escape':
					event.preventDefault()
					onClose?.()
					break

				case 'Home':
					event.preventDefault()
					onNavigate?.('prev', 0)
					break

				case 'End':
					event.preventDefault()
					onNavigate?.('next', totalPhotos - 1)
					break
			}
		},
		[handlePhotoClick, onNavigate, onClose, totalPhotos]
	)

	// Gestion du clic souris
	const handleClick = useCallback(
		(index: number) => {
			handlePhotoClick(index)
		},
		[handlePhotoClick]
	)

	// Gestion du focus (pour les lecteurs d'écran)
	const handleFocus = useCallback(() => {
		// Optionnel : annoncer la position dans la galerie
		// const announcement = `Image ${index + 1} sur ${totalPhotos}`
		// L'annonce sera gérée par le composant parent si nécessaire
	}, [])

	return {
		handlePhotoClick,
		handleKeyDown,
		handleClick,
		handleFocus,
	}
}
