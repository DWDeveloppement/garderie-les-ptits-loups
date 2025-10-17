// 📂 src/components/gallery/GalleryWithLightbox.tsx
// 👉 Wrapper qui combine Gallery + Lightbox

'use client';

import * as React from 'react';
import type { Photo } from 'react-photo-album';
import { Gallery, type GalleryProps } from './Gallery';
import { Lightbox } from './Lightbox';

export interface GalleryWithLightboxProps extends Omit<GalleryProps, 'onPhotoClick'> {
  /** Photos à afficher */
  photos: Photo[];
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
  ...galleryProps
}: GalleryWithLightboxProps) {
  const [lightboxIndex, setLightboxIndex] = React.useState(-1);

  return (
    <>
      <Gallery
        photos={photos}
        onPhotoClick={setLightboxIndex}
        {...galleryProps}
      />

      <Lightbox
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        photos={photos}
        onClose={() => setLightboxIndex(-1)}
      />
    </>
  );
}

