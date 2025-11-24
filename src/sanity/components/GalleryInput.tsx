import { Box } from '@sanity/ui'
import { useEffect } from 'react'
import { ArrayOfObjectsInputProps } from 'sanity'

export function GalleryInput(props: ArrayOfObjectsInputProps) {
	const { renderDefault } = props

	// Injecter CSS pour élargir le container et restreindre les champs sauf gallery
	useEffect(() => {
		const styleId = 'custom-gallery-layout'
		if (!document.getElementById(styleId)) {
			const style = document.createElement('style')
			style.id = styleId
			style.textContent = `
			/* Élargir le Container principal à 1500px */
			[data-ui="Container"] {
				max-width: 1500px !important;
				width: 100% !important;
				margin: 0 auto !important;
			}
				
				/* TOUS les champs SAUF gallery restent à 40rem */
				[data-ui="Stack"][data-comments-field-id]:not([data-comments-field-id="gallery"]) {
					max-width: 40rem !important;
					margin: 0 auto !important;
					width: 100% !important;
				}
				
				/* Gallery prend toute la largeur du container (1500px) */
				[data-ui="Stack"][data-comments-field-id="gallery"] {
					max-width: 100% !important;
				}

			/* Grille optimisée pour les images (mobile-first) */
			[data-comments-field-id="gallery"] [data-ui="ArrayInput__content"] [data-ui="Card"] [data-ui="Grid"] {
				gap: 1rem !important;
				grid-template-columns: repeat(1, 1fr) !important;
			}
			
			/* Media queries responsive pour la grille */
			@media (min-width: 480px) {
				[data-comments-field-id="gallery"] [data-ui="ArrayInput__content"] [data-ui="Card"] [data-ui="Grid"] {
					grid-template-columns: repeat(2, 1fr) !important;
				}
			}
			
			@media (min-width: 768px) {
				[data-comments-field-id="gallery"] [data-ui="ArrayInput__content"] [data-ui="Card"] [data-ui="Grid"] {
					grid-template-columns: repeat(3, 1fr) !important;
				}
			}
			
			@media (min-width: 1200px) {
				[data-comments-field-id="gallery"] [data-ui="ArrayInput__content"] [data-ui="Card"] [data-ui="Grid"] {
					grid-template-columns: repeat(4, 1fr) !important;
				}
			}
			`
			document.head.appendChild(style)
		}
	}, [])

	return <Box>{renderDefault(props)}</Box>
}

