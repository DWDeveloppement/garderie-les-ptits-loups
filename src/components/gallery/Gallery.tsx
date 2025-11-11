// 📂 src/components/gallery/Gallery.tsx
// 👉 Gallery basé sur l'exemple officiel react-photo-album Next.js

'use client'

import { Icon } from '@/components/icons'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import * as React from 'react'
import PhotoAlbum, { type Photo, type RenderImageContext, type RenderImageProps } from 'react-photo-album'
import 'react-photo-album/rows.css'

export type GalleryProps = {
	/** Photos à afficher */
	photos: Photo[]
	/** Layout de la galerie */
	layout?: 'rows' | 'columns' | 'masonry'
	/** Hauteur cible pour rows */
	targetRowHeight?: number
	/** Callback au clic sur une photo */
	onPhotoClick?: (index: number) => void
	/** Classe CSS custom */
	className?: string
}

/**
 * Render function pour Next/Image basé sur l'exemple officiel
 */
function renderNextImage({ alt = '', title, sizes }: RenderImageProps, { photo, width, height, index }: RenderImageContext) {
	const customPhoto = photo as Photo & { blurDataURL?: string }
	const accessibleLabel = alt || title || `Ouvrir la photo ${index + 1}`

	const dispatchPhotoClick = () => {
		const event = new CustomEvent('photoClick', { detail: index })
		window.dispatchEvent(event)
	}

	return (
		<div
			style={{
				width: '100%',
				position: 'relative',
				aspectRatio: `${width} / ${height}`,
			}}
			className='group'>
			<button
				type='button'
				onClick={dispatchPhotoClick}
				className='relative block h-full w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-lg'
				aria-label={accessibleLabel}>
				<Card variant='primary' interactive className='relative h-full w-full rounded-lg overflow-hidden p-4'>
					<CardContent>
						<Image
							fill
							src={photo}
							alt={alt}
							title={title}
							sizes={sizes}
							placeholder={customPhoto.blurDataURL ? 'blur' : undefined}
							blurDataURL={customPhoto.blurDataURL}
							className='object-cover h-full w-full'
						/>

						{/* Overlay hover */}
						<div className='absolute inset-0 bg-purple-2/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg'>
							<Icon name='zoomIn' size='xl' className='text-purple-10' aria-hidden />
						</div>
					</CardContent>
				</Card>
			</button>
		</div>
	)
}

/**
 * Gallery 3-in-1 basé sur PhotoAlbum
 */
export function Gallery({ photos, layout = 'rows', targetRowHeight = 280, onPhotoClick, className }: GalleryProps) {
	// Écouter les clics sur les images
	React.useEffect(() => {
		const handlePhotoClick = (event: CustomEvent) => {
			onPhotoClick?.(event.detail)
		}

		window.addEventListener('photoClick', handlePhotoClick as EventListener)
		return () => window.removeEventListener('photoClick', handlePhotoClick as EventListener)
	}, [onPhotoClick])

	if (photos.length === 0) return null

	return (
		<div className={cn('w-full', className)}>
			<PhotoAlbum
				layout={layout}
				photos={photos}
				targetRowHeight={targetRowHeight}
				render={{ image: renderNextImage }}
				defaultContainerWidth={1200}
				sizes={{
					size: '1168px',
					sizes: [{ viewport: '(max-width: 1200px)', size: 'calc(100vw - 32px)' }],
				}}
			/>
		</div>
	)
}
