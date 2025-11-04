// 📂 src/components/pages/sector/GallerySection.tsx
// 👉 Section galerie pour les pages secteurs

import { GalleryWithLightbox } from '@/components/gallery'
import type { Photo } from 'react-photo-album'

export type GallerySectionProps = {
	photos: Photo[]
	title?: string
}

export function GallerySection({ photos, title = 'Galerie' }: GallerySectionProps) {
	if (!photos || photos.length === 0) return null

	return (
		<section className='w-full py-16 px-4 sm:px-6 lg:px-8 bg-muted'>
			<div className='max-w-7xl mx-auto'>
				<h2 className='font-bold mb-8 text-center'>{title}</h2>
				<GalleryWithLightbox photos={photos} layout='rows' targetRowHeight={280} />
			</div>
		</section>
	)
}
