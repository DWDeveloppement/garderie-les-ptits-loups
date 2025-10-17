// 📂 src/components/gallery/Lightbox.tsx
// 👉 Composant lightbox avec yet-another-react-lightbox

'use client';

import * as React from 'react';
import YetAnotherLightbox from 'yet-another-react-lightbox';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import type { Photo } from 'react-photo-album';

export interface LightboxProps {
  /** Index de l'image active */
  index: number;
  /** Photos à afficher */
  photos: Photo[];
  /** Ouvert/Fermé */
  open: boolean;
  /** Callback à la fermeture */
  onClose: () => void;
}

/**
 * Transform Photo to Lightbox Slide
 * Ajoute srcHigh pour haute résolution et caption/description pour le plugin Captions
 */
function photoToSlide(photo: Photo) {
  const customPhoto = photo as Photo & { srcHigh?: string; caption?: string };
  return {
    src: customPhoto.srcHigh || photo.src,
    alt: photo.alt,
    title: customPhoto.caption || photo.title,
    description: customPhoto.caption || photo.title,
    width: photo.width,
    height: photo.height
  };
}

/**
 * Composant Lightbox avec yet-another-react-lightbox
 * 
 * **Features :**
 * - Navigation clavier (←/→, Esc)
 * - Swipe sur mobile
 * - Zoom
 * - Captions
 * - Accessible (ARIA)
 * - Custom controls avec CVA variants
 * 
 * @example
 * ```tsx
 * const [index, setIndex] = useState(-1);
 * 
 * <Lightbox
 *   open={index >= 0}
 *   index={index}
 *   photos={photos}
 *   onClose={() => setIndex(-1)}
 * />
 * ```
 */
export function Lightbox({
  index,
  photos,
  open,
  onClose
}: LightboxProps) {
  const slides = React.useMemo(
    () => photos.map(photoToSlide),
    [photos]
  );

  return (
    <YetAnotherLightbox
      open={open}
      index={index}
      slides={slides}
      close={onClose}
      plugins={[Captions]}
      animation={{ fade: 300, swipe: 250 }}
      controller={{ closeOnBackdropClick: true }}
      carousel={{ finite: false, preload: 2 }}
      captions={{
        showToggle: true,
        descriptionTextAlign: 'center',
        descriptionMaxLines: 3
      }}
      styles={{
        container: { backgroundColor: 'rgba(0, 0, 0, 0.9)' }
      }}
    />
  );
}

