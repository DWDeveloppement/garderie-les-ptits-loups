// 📂 src/components/gallery/Gallery.tsx
// 👉 Composant galerie avec react-photo-album

'use client';

import {
  galleryContainerVariants,
  galleryItemVariants,
  type GalleryContainerVariants,
  type GalleryItemVariants
} from '@/components/ui/variants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import * as React from 'react'
import {
  ColumnsPhotoAlbum,
  MasonryPhotoAlbum,
  RowsPhotoAlbum,
  type Photo,
  type RenderPhoto
} from 'react-photo-album'

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
  // Custom render pour images avec Next/Image + variants
  const renderImage: RenderPhoto = React.useCallback(
    ({ onClick }, { photo, index, width, height }) => {
      const { src, alt, title } = photo;
      const customPhoto = photo as Photo & { blurDataURL?: string };

      return (
        <button
          type="button"
          onClick={(e) => {
            onClick?.(e);
            onPhotoClick?.(index);
          }}
          className={cn(
            galleryItemVariants({
              hover: itemVariants?.hover || 'scale-opacity',
              shadow: itemVariants?.shadow || 'md',
              border: itemVariants?.border || 'none',
              transition: itemVariants?.transition || 'smooth'
            }),
            onPhotoClick && 'cursor-pointer group'
          )}
          style={{ position: 'relative', width, height }}
          aria-label={`Ouvrir ${alt || title || 'image'} en grand`}
        >
          <Image
            src={src}
            alt={alt || title || ''}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            quality={85}
            placeholder={customPhoto.blurDataURL ? 'blur' : 'empty'}
            blurDataURL={customPhoto.blurDataURL}
            className="object-cover w-full h-full"
            loading="lazy"
          />
        </button>
      );
    },
    [onPhotoClick, itemVariants]
  );

  if (photos.length === 0) {
    return null;
  }

  const spacingValue = spacing === 'none' ? 0 : spacing === 'xs' ? 4 : spacing === 'sm' ? 8 : spacing === 'md' ? 16 : spacing === 'lg' ? 24 : 32;

  // Sélection du composant selon le layout
  const PhotoAlbumComponent = layout === 'rows' ? RowsPhotoAlbum : layout === 'columns' ? ColumnsPhotoAlbum : MasonryPhotoAlbum;

  return (
    <div
      className={cn(
        galleryContainerVariants({ layout, spacing, rounded }),
        'photo-album',
        className
      )}
    >
      <PhotoAlbumComponent
        photos={photos}
        spacing={spacingValue}
        padding={0}
        render={{ photo: renderImage }}
        {...(layout === 'rows' ? { targetRowHeight } : {})}
      />
    </div>
  );
}

