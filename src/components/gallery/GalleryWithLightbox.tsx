// 📂 src/components/gallery/GalleryWithLightbox.tsx
// 👉 Wrapper qui combine Gallery + Lightbox

'use client';

import * as React from 'react'
import type { Photo } from 'react-photo-album'
import { Gallery } from './Gallery'
import { LightboxCustom } from './LightboxCustom'

export interface GalleryWithLightboxProps {
  /** Photos à afficher */
  photos: Photo[];
  /** Layout de la galerie */
  layout?: 'rows' | 'columns' | 'masonry';
  /** Hauteur cible pour rows */
  targetRowHeight?: number;
  /** Classe CSS custom */
  className?: string;
}

/**
 * Composant Gallery avec Lightbox intégré
 * 
 * **Features :**
 * - Clic sur photo → ouvre lightbox
 * - Navigation clavier (←/→, Esc)
 * - Swipe sur mobile
 * - State management automatique
 * - Zero configuration
 * 
 * @example
 * ```tsx
 * <GalleryWithLightbox
 *   photos={photos}
 *   layout="masonry"
 *   spacing="md"
 * />
 * ```
 */
export function GalleryWithLightbox({
  photos,
  layout = 'rows',
  targetRowHeight = 280,
  className
}: GalleryWithLightboxProps) {
  const [lightboxIndex, setLightboxIndex] = React.useState(-1);

  return (
    <>
      <Gallery
        photos={photos}
        layout={layout}
        targetRowHeight={targetRowHeight}
        onPhotoClick={setLightboxIndex}
        className={className}
      />

      {/* Lightbox avec custom render */}
      <LightboxCustom
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        photos={photos}
        onClose={() => setLightboxIndex(-1)}
      />
    </>
  );
}

