// 📂 src/components/pages/sector/GallerySection.tsx
// 👉 Section galerie pour les pages secteurs

import { GallerySkeleton } from '@/components/lazy'
import dynamic from 'next/dynamic'
import type { Photo } from 'react-photo-album'

// Chargement dynamique de GalleryWithLightbox (composant lourd avec lightbox)
const GalleryWithLightbox = dynamic(() => import('@/components/gallery').then((mod) => ({ default: mod.GalleryWithLightbox })), {
	loading: () => <GallerySkeleton />,
	ssr: true, // SSR activé pour le SEO
})

export type GallerySectionProps = {
	photos: Photo[]
	title?: string
}

export function GallerySection({ photos, title = 'Galerie' }: GallerySectionProps) {
	if (!photos || photos.length === 0) return null

	return (
		<section className='w-full py-16 px-8 md:px-16 gradient-section-a'>
			<div className='max-w-7xl mx-auto'>
				<h2 className='font-bold mb-16 text-center'>{title}</h2>
				<GalleryWithLightbox photos={photos} layout='rows' targetRowHeight={280} />
			</div>
		</section>
	)
}
