'use client'

import { createLazyComponent } from '@/components/lazy/createLazyComponent'
import { FormSkeleton, GallerySkeleton, HeroSkeleton, MapSkeleton, SectionSkeleton } from '@/components/lazy/skeletons'

export const LazyContactForm = createLazyComponent(
	() => import('@/components/forms/ContactForm').then((m) => ({ default: m.ContactForm })),
	<FormSkeleton />
)

export const LazyGallery = createLazyComponent(
	() => import('@/components/gallery/GalleryWithLightbox').then((m) => ({ default: m.GalleryWithLightbox })),
	<GallerySkeleton />
)

export const LazyHeroGlobal = createLazyComponent(
	() => import('@/components/shared/HeroGlobal').then((m) => ({ default: m.HeroGlobal })),
	<HeroSkeleton />
)

export const LazyHeroSection = createLazyComponent(
	() => import('@/components/pages/home/HeroSection').then((m) => ({ default: m.HeroSection })),
	<HeroSkeleton />
)

export const LazyParallaxSection = createLazyComponent(
	() => import('@/components/shared/ParalaxImage').then((m) => ({ default: m.ParalaxImage })),
	<SectionSkeleton />
)

export const LazyMapSection = createLazyComponent(
	() => import('@/components/pages/contact/MapSection').then((m) => ({ default: m.MapSection })),
	<MapSkeleton />
)
// Export de tous les skeletons pour utilisation directe
export { FormSkeleton, GallerySkeleton, HeroSkeleton, MapSkeleton, SectionSkeleton }
