'use client'

import { GallerySkeleton } from '@/components/lazy'
import { LazyComponent } from '../shared/LazyComponent'

/**
 * Galerie lazy avec skeleton spécialisé
 */
export function LazyGallery(props: any) {
  return (
    <LazyComponent
      component={() => import('@/components/gallery/GalleryWithLightbox').then(module => ({ default: module.GalleryWithLightbox }))}
      fallback={<GallerySkeleton />}
      {...props}
    />
  )
}
