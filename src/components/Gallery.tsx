'use client'

import Image from 'next/image'
import { useState } from 'react'

// ============================================================================
// COMPOSANT GALERIE - Version de base sans dépendances externes
// ============================================================================

type Photo = {
  src: string
  width: number
  height: number
  alt?: string
  caption?: string
}

type GalleryProps = {
  photos: Photo[]
  layout?: 'grid' | 'masonry'
  columns?: number
}

export function Gallery({ 
  photos, 
  layout = 'grid',
  columns = 3
}: GalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo)
  }

  const closeLightbox = () => {
    setSelectedPhoto(null)
  }

  const renderGridLayout = () => (
    <div className={`grid gap-4 ${columns === 2 ? 'grid-cols-2' : columns === 3 ? 'grid-cols-3' : 'grid-cols-4'}`}>
      {photos.map((photo, index) => (
        <div
          key={index}
          className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
          onClick={() => handlePhotoClick(photo)}
        >
          <Image
            src={photo.src}
            alt={photo.alt || ''}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
          {photo.caption && (
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-end p-4">
              <p className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {photo.caption}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  )

  const renderMasonryLayout = () => (
    <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
      {photos.map((photo, index) => (
        <div
          key={index}
          className="relative break-inside-avoid cursor-pointer group"
          onClick={() => handlePhotoClick(photo)}
        >
          <div className="relative overflow-hidden rounded-lg">
            <Image
              src={photo.src}
              alt={photo.alt || ''}
              width={photo.width}
              height={photo.height}
              className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {photo.caption && (
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-end p-4">
                <p className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {photo.caption}
                </p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <>
      {/* Galerie principale */}
      <div className="w-full">
        {layout === 'grid' ? renderGridLayout() : renderMasonryLayout()}
      </div>

      {/* Lightbox simple */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white text-2xl z-10 hover:text-gray-300"
            >
              ×
            </button>
            
            <Image
              src={selectedPhoto.src}
              alt={selectedPhoto.alt || ''}
              width={selectedPhoto.width}
              height={selectedPhoto.height}
              className="max-w-full max-h-full object-contain"
              priority
            />
            
            {selectedPhoto.caption && (
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <p className="text-white bg-black bg-opacity-50 rounded px-4 py-2">
                  {selectedPhoto.caption}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

// ============================================================================
// COMPOSANT GALERIE AVEC SKELETON
// ============================================================================

export function GallerySkeleton({ columns = 3 }: { columns?: number }) {
  return (
    <div className={`grid gap-4 ${columns === 2 ? 'grid-cols-2' : columns === 3 ? 'grid-cols-3' : 'grid-cols-4'}`}>
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="aspect-square bg-gray-200 rounded-lg animate-pulse"
        />
      ))}
    </div>
  )
}

// ============================================================================
// COMPOSANT GALERIE LAZY
// ============================================================================

import { Suspense } from 'react'

export function LazyGallery(props: GalleryProps) {
  return (
    <Suspense fallback={<GallerySkeleton columns={props.columns} />}>
      <Gallery {...props} />
    </Suspense>
  )
}
