// 📂 src/components/gallery/Lightbox.tsx
// 👉 Composant lightbox avec yet-another-react-lightbox

'use client';

import * as React from 'react';
import Yarl from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import type { Photo } from 'react-photo-album';
import { Icon } from '@/components/icons';
import { cn } from '@/lib/utils';
import {
  lightboxControlVariants,
  type LightboxControlVariants
} from '@/components/ui/variants';

export interface LightboxProps {
  /** Index de l'image active */
  index: number;
  /** Photos à afficher */
  photos: Photo[];
  /** Ouvert/Fermé */
  open: boolean;
  /** Callback à la fermeture */
  onClose: () => void;
  /** Variants pour les contrôles */
  controlVariants?: LightboxControlVariants;
}

/**
 * Transform Photo to Lightbox Slide
 */
function photoToSlide(photo: Photo) {
  const customPhoto = photo as Photo & { srcHigh?: string; caption?: string };
  return {
    src: customPhoto.srcHigh || photo.src,
    alt: photo.alt,
    title: customPhoto.caption || photo.title,
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
  onClose,
  controlVariants
}: LightboxProps) {
  const slides = React.useMemo(
    () => photos.map(photoToSlide),
    [photos]
  );

  // Custom render pour les boutons de contrôle
  const renderPrevButton = React.useCallback(
    () => (
      <button
        type="button"
        aria-label="Image précédente"
        className={cn(
          lightboxControlVariants({
            position: 'center-left',
            variant: controlVariants?.variant || 'ghost',
            size: controlVariants?.size || 'lg'
          })
        )}
      >
        <Icon name="chevronLeft" size="lg" aria-hidden />
      </button>
    ),
    [controlVariants]
  );

  const renderNextButton = React.useCallback(
    () => (
      <button
        type="button"
        aria-label="Image suivante"
        className={cn(
          lightboxControlVariants({
            position: 'center-right',
            variant: controlVariants?.variant || 'ghost',
            size: controlVariants?.size || 'lg'
          })
        )}
      >
        <Icon name="chevronRight" size="lg" aria-hidden />
      </button>
    ),
    [controlVariants]
  );

  const renderCloseButton = React.useCallback(
    () => (
      <button
        type="button"
        aria-label="Fermer"
        className={cn(
          lightboxControlVariants({
            position: 'top-right',
            variant: controlVariants?.variant || 'ghost',
            size: controlVariants?.size || 'md'
          })
        )}
      >
        <Icon name="close" size="md" aria-hidden />
      </button>
    ),
    [controlVariants]
  );

  return (
    <Yarl
      open={open}
      index={index}
      slides={slides}
      close={onClose}
      animation={{ fade: 300, swipe: 250, easing: { fade: 'ease', swipe: 'ease-out' } }}
      controller={{ closeOnBackdropClick: true, closeOnPullDown: true, closeOnPullUp: true }}
      carousel={{ finite: false, preload: 2, padding: '16px', spacing: '16px', imageFit: 'contain' }}
      render={{
        buttonPrev: renderPrevButton,
        buttonNext: renderNextButton,
        buttonClose: renderCloseButton
      }}
      styles={{
        container: { backgroundColor: 'rgba(0, 0, 0, 0.9)' },
        slide: { padding: 0 }
      }}
    />
  );
}

