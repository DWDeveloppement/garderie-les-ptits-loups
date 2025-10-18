// 📂 src/components/gallery/Gallery.tsx
// 👉 Gallery basé sur l'exemple officiel react-photo-album Next.js

'use client';

import { Icon } from '@/components/icons'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import * as React from 'react'
import PhotoAlbum, { type Photo, type RenderImageContext, type RenderImageProps } from 'react-photo-album'
import 'react-photo-album/rows.css'

export interface GalleryProps {
  /** Photos à afficher */
  photos: Photo[];
  /** Layout de la galerie */
  layout?: 'rows' | 'columns' | 'masonry';
  /** Hauteur cible pour rows */
  targetRowHeight?: number;
  /** Callback au clic sur une photo */
  onPhotoClick?: (index: number) => void;
  /** Classe CSS custom */
  className?: string;
}

/**
 * Render function pour Next/Image basé sur l'exemple officiel
 */
function renderNextImage(
  { alt = "", title, sizes }: RenderImageProps,
  { photo, width, height, index }: RenderImageContext
) {
  const customPhoto = photo as Photo & { blurDataURL?: string };
  
  return (
    <div
      style={{
        width: "100%",
        position: "relative",
        aspectRatio: `${width} / ${height}`,
      }}
      className="group cursor-pointer"
      onClick={() => {
        // Le clic sera géré par le parent
        const event = new CustomEvent('photoClick', { detail: index });
        window.dispatchEvent(event);
      }}
    >
      <Card className="overflow-hidden h-full w-full hover:scale-[1.02] transition-transform">
        <Image
          fill
          src={photo}
          alt={alt}
          title={title}
          sizes={sizes}
          placeholder={customPhoto.blurDataURL ? "blur" : undefined}
          blurDataURL={customPhoto.blurDataURL}
          className="object-cover"
        />
        
        {/* Overlay hover */}
        <div className="absolute inset-0 bg-purple-2/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Icon name="zoomIn" size="xl" className="text-purple-10" aria-hidden />
        </div>
      </Card>
    </div>
  );
}

/**
 * Gallery 3-in-1 basé sur PhotoAlbum
 */
export function Gallery({ 
  photos, 
  layout = 'rows', 
  targetRowHeight = 280, 
  onPhotoClick, 
  className 
}: GalleryProps) {
  // Écouter les clics sur les images
  React.useEffect(() => {
    const handlePhotoClick = (event: CustomEvent) => {
      onPhotoClick?.(event.detail);
    };
    
    window.addEventListener('photoClick', handlePhotoClick as EventListener);
    return () => window.removeEventListener('photoClick', handlePhotoClick as EventListener);
  }, [onPhotoClick]);

  if (photos.length === 0) return null;

  return (
    <div className={cn('w-full', className)}>
      <PhotoAlbum
        layout={layout}
        photos={photos}
        targetRowHeight={targetRowHeight}
        render={{ image: renderNextImage }}
        defaultContainerWidth={1200}
        sizes={{
          size: "1168px",
          sizes: [
            { viewport: "(max-width: 1200px)", size: "calc(100vw - 32px)" },
          ],
        }}
      />
    </div>
  );
}

