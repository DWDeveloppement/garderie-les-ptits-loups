# 🖼️ Galeries et Lightbox - Système d'Images

## 📋 **Vue d'Ensemble**

Système de galeries d'images avec lightbox pour les pages dynamiques (slug) du site de la garderie "Les P'tits Loups". Le système supporte les albums d'activités, photos d'événements et contenu visuel riche.

## 🏗️ **Architecture Technique**

### **Stack Technologique**
- **React Photo Album** : [react-photo-album.com](https://react-photo-album.com/) - Layouts responsives
- **Yet Another React Lightbox** : [yet-another-react-lightbox.com](https://yet-another-react-lightbox.com/) - Lightbox avancé
- **Next.js Image** : Optimisation automatique des images
- **Sanity Assets** : Gestion des images via Sanity CMS

### **Bundle Size**
- **React Photo Album** : ~15KB
- **Yet Another React Lightbox** : ~25KB
- **Total** : ~40KB (optimisé avec tree-shaking)

## 🎯 **Fonctionnalités**

### **Layouts Disponibles**
- **Rows** : Arrangement en lignes avec hauteur cible
- **Columns** : Colonnes fixes avec répartition optimale
- **Masonry** : Layout Pinterest avec colonnes de hauteur égale

### **Lightbox Features**
- **Navigation** : Précédent/Suivant avec clavier
- **Zoom** : Zoom in/out avec molette
- **Fullscreen** : Mode plein écran
- **Thumbnails** : Miniatures de navigation
- **Captions** : Légendes et descriptions
- **Download** : Téléchargement des images
- **Share** : Partage sur réseaux sociaux
- **Slideshow** : Diaporama automatique

## 🔧 **Implémentation**

### **1. Installation des Dépendances**
```bash
npm install react-photo-album yet-another-react-lightbox
npm install yet-another-react-lightbox/plugins/captions
npm install yet-another-react-lightbox/plugins/counter
npm install yet-another-react-lightbox/plugins/download
npm install yet-another-react-lightbox/plugins/fullscreen
npm install yet-another-react-lightbox/plugins/share
npm install yet-another-react-lightbox/plugins/slideshow
npm install yet-another-react-lightbox/plugins/thumbnails
npm install yet-another-react-lightbox/plugins/zoom
```

### **2. Composant Gallery Principal**
```typescript
// components/Gallery.tsx
'use client'

import { useState } from 'react'
import { RowsPhotoAlbum } from 'react-photo-album'
import { Lightbox } from 'yet-another-react-lightbox'
import Captions from 'yet-another-react-lightbox/plugins/captions'
import Counter from 'yet-another-react-lightbox/plugins/counter'
import Download from 'yet-another-react-lightbox/plugins/download'
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen'
import Share from 'yet-another-react-lightbox/plugins/share'
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow'
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import 'react-photo-album/rows.css'
import 'yet-another-react-lightbox/styles.css'

type Photo = {
  src: string
  width: number
  height: number
  alt?: string
  caption?: string
}

type GalleryProps = {
  photos: Photo[]
  layout?: 'rows' | 'columns' | 'masonry'
  targetRowHeight?: number
  columns?: number
}

export function Gallery({ 
  photos, 
  layout = 'rows',
  targetRowHeight = 300,
  columns = 3
}: GalleryProps) {
  const [index, setIndex] = useState(-1)

  const handlePhotoClick = ({ index }: { index: number }) => {
    setIndex(index)
  }

  const renderLayout = () => {
    switch (layout) {
      case 'rows':
        return (
          <RowsPhotoAlbum
            photos={photos}
            onClick={handlePhotoClick}
            targetRowHeight={targetRowHeight}
            spacing={8}
            padding={4}
          />
        )
      case 'columns':
        return (
          <ColumnsPhotoAlbum
            photos={photos}
            onClick={handlePhotoClick}
            columns={columns}
            spacing={8}
            padding={4}
          />
        )
      case 'masonry':
        return (
          <MasonryPhotoAlbum
            photos={photos}
            onClick={handlePhotoClick}
            columns={columns}
            spacing={8}
            padding={4}
          />
        )
      default:
        return null
    }
  }

  return (
    <>
      {renderLayout()}
      
      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={photos.map(photo => ({
          src: photo.src,
          alt: photo.alt,
          title: photo.caption,
        }))}
        plugins={[
          Captions,
          Counter,
          Download,
          Fullscreen,
          Share,
          Slideshow,
          Thumbnails,
          Zoom,
        ]}
        captions={{
          showToggle: true,
          descriptionTextAlign: 'center',
        }}
        counter={{
          container: { style: { top: 'unset', bottom: 0 } },
        }}
        thumbnails={{
          position: 'bottom',
          width: 120,
          height: 80,
        }}
        zoom={{
          maxZoomPixelRatio: 3,
          zoomInMultiplier: 2,
          doubleTapDelay: 300,
          doubleClickDelay: 300,
          doubleClickMaxStops: 2,
          keyboardMoveDistance: 50,
          wheelZoomDistanceFactor: 100,
          pinchZoomDistanceFactor: 100,
          scrollToZoom: true,
        }}
      />
    </>
  )
}
```

### **3. Intégration avec Sanity**
```typescript
// lib/sanity/gallery.ts
import { client } from './client'
import { urlFor } from './image-url'

export async function getGalleryBySlug(slug: string) {
  const gallery = await client.fetch(`
    *[_type == "gallery" && slug.current == $slug][0] {
      _id,
      title,
      description,
      photos[] {
        _key,
        asset-> {
          _id,
          url,
          metadata {
            dimensions
          }
        },
        alt,
        caption
      }
    }
  `, { slug })

  if (!gallery) return null

  // Transformation des données Sanity vers le format React Photo Album
  const photos = gallery.photos.map((photo: any) => ({
    src: urlFor(photo.asset).width(1200).height(800).quality(85).url(),
    width: photo.asset.metadata.dimensions.width,
    height: photo.asset.metadata.dimensions.height,
    alt: photo.alt || '',
    caption: photo.caption || '',
    srcSet: [
      {
        src: urlFor(photo.asset).width(400).height(300).quality(85).url(),
        width: 400,
        height: 300,
      },
      {
        src: urlFor(photo.asset).width(800).height(600).quality(85).url(),
        width: 800,
        height: 600,
      },
      {
        src: urlFor(photo.asset).width(1200).height(800).quality(85).url(),
        width: 1200,
        height: 800,
      },
    ],
  }))

  return {
    ...gallery,
    photos,
  }
}
```

### **4. Page Dynamique avec Galerie**
```typescript
// app/galerie/[slug]/page.tsx
import { getGalleryBySlug } from '@/lib/sanity/gallery'
import { Gallery } from '@/components/Gallery'
import { notFound } from 'next/navigation'

type PageProps = {
  params: { slug: string }
}

export default async function GalleryPage({ params }: PageProps) {
  const gallery = await getGalleryBySlug(params.slug)

  if (!gallery) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-purple-12 mb-4">
          {gallery.title}
        </h1>
        {gallery.description && (
          <p className="text-lg text-purple-11">
            {gallery.description}
          </p>
        )}
      </header>

      <Gallery 
        photos={gallery.photos}
        layout="rows"
        targetRowHeight={300}
      />
    </div>
  )
}

// Génération statique des pages
export async function generateStaticParams() {
  const galleries = await client.fetch(`
    *[_type == "gallery"] { "slug": slug.current }
  `)
  
  return galleries.map((gallery: any) => ({
    slug: gallery.slug,
  }))
}
```

## 🎨 **Personnalisation**

### **Styles CSS Personnalisés**
```css
/* styles/gallery.css */
.photo-album {
  --photo-album-spacing: 8px;
  --photo-album-padding: 4px;
}

.photo-album img {
  border-radius: 8px;
  transition: transform 0.2s ease;
}

.photo-album img:hover {
  transform: scale(1.02);
}

/* Lightbox personnalisé */
.yarl__container {
  background-color: rgba(0, 0, 0, 0.9);
}

.yarl__slide {
  background-color: transparent;
}

.yarl__button {
  color: white;
}

.yarl__button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
```

### **Configuration Avancée**
```typescript
// components/GalleryAdvanced.tsx
export function GalleryAdvanced({ photos }: { photos: Photo[] }) {
  const [index, setIndex] = useState(-1)
  const [layout, setLayout] = useState<'rows' | 'columns' | 'masonry'>('rows')

  return (
    <div>
      {/* Contrôles de layout */}
      <div className="mb-4 flex gap-2">
        <button 
          onClick={() => setLayout('rows')}
          className={`px-3 py-1 rounded ${layout === 'rows' ? 'bg-purple-9 text-white' : 'bg-gray-200'}`}
        >
          Lignes
        </button>
        <button 
          onClick={() => setLayout('columns')}
          className={`px-3 py-1 rounded ${layout === 'columns' ? 'bg-purple-9 text-white' : 'bg-gray-200'}`}
        >
          Colonnes
        </button>
        <button 
          onClick={() => setLayout('masonry')}
          className={`px-3 py-1 rounded ${layout === 'masonry' ? 'bg-purple-9 text-white' : 'bg-gray-200'}`}
        >
          Masonry
        </button>
      </div>

      <Gallery 
        photos={photos}
        layout={layout}
        targetRowHeight={300}
        columns={3}
      />
    </div>
  )
}
```

## 🚀 **Performance**

### **Optimisations Images**
```typescript
// lib/sanity/image-optimization.ts
import { urlFor } from './image-url'

export function getOptimizedImageUrl(asset: any, width: number, height?: number) {
  let builder = urlFor(asset).width(width).quality(85)
  
  if (height) {
    builder = builder.height(height)
  }
  
  return builder.url()
}

export function getResponsiveImageSrcSet(asset: any, baseWidth: number) {
  const sizes = [400, 800, 1200, 1600]
  
  return sizes.map(size => ({
    src: getOptimizedImageUrl(asset, size),
    width: size,
    height: Math.round((asset.metadata.dimensions.height * size) / asset.metadata.dimensions.width),
  }))
}
```

### **Lazy Loading**
```typescript
// components/LazyGallery.tsx
import { Suspense } from 'react'
import { Gallery } from './Gallery'

export function LazyGallery({ photos }: { photos: Photo[] }) {
  return (
    <Suspense fallback={<GallerySkeleton />}>
      <Gallery photos={photos} />
    </Suspense>
  )
}

function GallerySkeleton() {
  return (
    <div className="animate-pulse">
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="aspect-square bg-gray-200 rounded-lg" />
        ))}
      </div>
    </div>
  )
}
```

## 📱 **Responsive Design**

### **Breakpoints Adaptatifs**
```typescript
// hooks/useGalleryLayout.ts
import { useBreakpoint } from '@/hooks/useWindowSize'

export function useGalleryLayout() {
  const { isMobile, isTablet, isDesktop } = useBreakpoint()

  const getLayoutConfig = () => {
    if (isMobile) {
      return {
        layout: 'columns' as const,
        columns: 2,
        targetRowHeight: 200,
        spacing: 4,
      }
    }
    
    if (isTablet) {
      return {
        layout: 'columns' as const,
        columns: 3,
        targetRowHeight: 250,
        spacing: 6,
      }
    }
    
    return {
      layout: 'rows' as const,
      targetRowHeight: 300,
      spacing: 8,
    }
  }

  return getLayoutConfig()
}
```

## 🔧 **Configuration Sanity**

### **Schéma Galerie**
```typescript
// sanity/schemas/gallery.ts
export default {
  name: 'gallery',
  title: 'Galerie',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: Rule => Rule.required().max(100)
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3
    },
    {
      name: 'photos',
      title: 'Photos',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'asset',
              title: 'Image',
              type: 'reference',
              to: [{ type: 'sanity.imageAsset' }],
              validation: Rule => Rule.required()
            },
            {
              name: 'alt',
              title: 'Texte alternatif',
              type: 'string',
              validation: Rule => Rule.required().max(125)
            },
            {
              name: 'caption',
              title: 'Légende',
              type: 'string',
              validation: Rule => Rule.max(200)
            }
          ],
          preview: {
            select: {
              title: 'alt',
              media: 'asset',
              subtitle: 'caption'
            }
          }
        }
      ],
      validation: Rule => Rule.min(1).max(50)
    },
    {
      name: 'layout',
      title: 'Layout par défaut',
      type: 'string',
      options: {
        list: [
          { title: 'Lignes', value: 'rows' },
          { title: 'Colonnes', value: 'columns' },
          { title: 'Masonry', value: 'masonry' }
        ]
      },
      initialValue: 'rows'
    },
    {
      name: 'publishedAt',
      title: 'Date de publication',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'photos.0.asset',
      subtitle: 'description'
    }
  }
}
```

## 📚 **Ressources**

- [React Photo Album Documentation](https://react-photo-album.com/documentation)
- [Yet Another React Lightbox Documentation](https://yet-another-react-lightbox.com/)
- [Zero CLS SSR Example](https://react-photo-album.com/examples/zero-cls-ssr)
- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)

## 🔧 **Commandes Utiles**

```bash
# Installation des dépendances
npm install react-photo-album yet-another-react-lightbox

# Installation des plugins lightbox
npm install yet-another-react-lightbox/plugins/captions
npm install yet-another-react-lightbox/plugins/counter
npm install yet-another-react-lightbox/plugins/download
npm install yet-another-react-lightbox/plugins/fullscreen
npm install yet-another-react-lightbox/plugins/share
npm install yet-another-react-lightbox/plugins/slideshow
npm install yet-another-react-lightbox/plugins/thumbnails
npm install yet-another-react-lightbox/plugins/zoom

# Build avec optimisations
npm run build
npm run start
```

---

**Dernière mise à jour :** Décembre 2024  
**Version :** React Photo Album v3 + Yet Another React Lightbox v3
