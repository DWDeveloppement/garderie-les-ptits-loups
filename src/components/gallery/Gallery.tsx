// 📂 src/components/gallery/Gallery.tsx
// 👉 Composant galerie avec react-photo-album

'use client';

import * as React from 'react';
import { PhotoAlbum, type Photo, type RenderPhoto } from 'react-photo-album';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import {
  galleryContainerVariants,
  galleryItemVariants,
  type GalleryContainerVariants,
  type GalleryItemVariants
} from '@/components/ui/variants';

export interface GalleryProps extends GalleryContainerVariants {
  /** Photos à afficher */
  photos: Photo[];
  /** Layout de la galerie */
  layout?: 'rows' | 'columns' | 'masonry';
  /** Hauteur cible pour le layout rows */
  targetRowHeight?: number;
  /** Callback au clic sur une photo */
  onPhotoClick?: (index: number) => void;
  /** Variants pour les items */
  itemVariants?: GalleryItemVariants;
  /** Classe CSS custom pour le conteneur */
  className?: string;
}

/**
 * Composant Gallery avec react-photo-album
 * 
 * **Features :**
 * - 3 layouts : rows, columns, masonry
 * - Images optimisées Next/Image (WebP, LQIP, responsive)
 * - Variants CVA pour styling
 * - Zero CLS (dimensions connues)
 * - Accessible (keyboard navigation)
 * 
 * @example
 * ```tsx
 * <Gallery
 *   photos={photos}
 *   layout="masonry"
 *   spacing="md"
 *   onPhotoClick={(index) => openLightbox(index)}
 * />
 * ```
 */
export function Gallery({
  photos,
  layout = 'rows',
  spacing = 'md',
  rounded = 'md',
  targetRowHeight = 300,
  onPhotoClick,
  itemVariants,
  className
}: GalleryProps) {
  // Render photo custom avec Next/Image + variants
  const renderPhoto: RenderPhoto = React.useCallback(
    ({ photo, imageProps, wrapperStyle }) => {
      const { src, alt, title } = photo;
      const { style, ...restImageProps } = imageProps;

      return (
        <button
          type="button"
          onClick={() => onPhotoClick?.(photos.indexOf(photo))}
          className={cn(
            galleryItemVariants({
              hover: itemVariants?.hover || 'scale-opacity',
              shadow: itemVariants?.shadow || 'md',
              border: itemVariants?.border || 'none',
              transition: itemVariants?.transition || 'smooth'
            }),
            onPhotoClick && 'cursor-pointer group'
          )}
          style={wrapperStyle}
          aria-label={`Ouvrir ${alt || title || 'image'} en grand`}
        >
          <Image
            {...restImageProps}
            src={src}
            alt={alt || title || ''}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            quality={85}
            placeholder={(photo as Photo & { blurDataURL?: string }).blurDataURL ? 'blur' : 'empty'}
            blurDataURL={(photo as Photo & { blurDataURL?: string }).blurDataURL}
            className="object-cover w-full h-full"
            loading="lazy"
          />
        </button>
      );
    },
    [photos, onPhotoClick, itemVariants]
  );

  if (photos.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        galleryContainerVariants({ layout, spacing, rounded }),
        className
      )}
    >
      <PhotoAlbum
        photos={photos}
        layout={layout}
        targetRowHeight={targetRowHeight}
        spacing={spacing === 'none' ? 0 : spacing === 'xs' ? 4 : spacing === 'sm' ? 8 : spacing === 'md' ? 16 : spacing === 'lg' ? 24 : 32}
        padding={0}
        renderPhoto={renderPhoto}
        componentsProps={{
          containerProps: {
            className: 'photo-album'
          }
        }}
      />
    </div>
  );
}

