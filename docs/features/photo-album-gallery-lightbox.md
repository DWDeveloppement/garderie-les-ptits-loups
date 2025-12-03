# 🖼️ React Photo Album + Lightbox - Guide Complet

## 📋 Vue d'Ensemble

Documentation complète pour l'implémentation de **react-photo-album** avec **yet-another-react-lightbox** dans Next.js 15 avec Sanity CMS.

**Sources :**
- [react-photo-album.com](https://react-photo-album.com/)
- [yet-another-react-lightbox.com](https://yet-another-react-lightbox.com/)

---

## 🎯 Pourquoi React Photo Album ?

### Caractéristiques Clés

| Feature | Description |
|---------|-------------|
| **Built for React 18+** | Compatible Next.js 15 |
| **SSR friendly** | Markup pixel-perfect avant hydration |
| **Zero CLS** | Pas de layout shift grâce au pré-calcul |
| **3 Layouts** | Rows, Columns, Masonry |
| **Responsive images** | Srcset et sizes automatiques |
| **TypeScript** | Types built-in |
| **Performance** | Optimisé pour gros albums |
| **Bundle size** | ~15KB (gzippé) |

Source : [react-photo-album.com](https://react-photo-album.com/)

---

## 🏗️ Les 3 Layouts Disponibles

### 1. Rows Layout (Recommandé pour nous)

**Algorithme :** Knuth & Plass line-breaking + Dijkstra's shortest path

```tsx
import { RowsPhotoAlbum } from "react-photo-album"
import "react-photo-album/rows.css"

<RowsPhotoAlbum
  photos={photos}
  targetRowHeight={300}  // Hauteur cible des lignes
  spacing={8}            // Espace entre images
  padding={4}            // Padding interne
/>
```

**Avantages :**
- ✅ Lignes de hauteur similaire
- ✅ Photos pas étirées/shrinkées anormalement
- ✅ Résout le problème des panoramas
- ✅ Pas de stragglers dans la dernière ligne

**Comment ça marche :**
- Calcule le coût de chaque ligne (déviation au carré du targetRowHeight)
- Utilise Dijkstra pour trouver le chemin optimal
- Produit des lignes équilibrées sans déformation

### 2. Columns Layout

**Algorithme :** Dynamic programming pour shortest path de longueur N

```tsx
import { ColumnsPhotoAlbum } from "react-photo-album"
import "react-photo-album/columns.css"

<ColumnsPhotoAlbum
  photos={photos}
  columns={3}      // Nombre de colonnes fixes
  spacing={8}
  padding={4}
/>
```

**Avantages :**
- ✅ Colonnes fixes prédéfinies
- ✅ Répartition optimale des photos
- ✅ Colonnes de hauteur équilibrée

### 3. Masonry Layout

**Algorithme :** Placement dans la colonne la plus courte (style Pinterest)

```tsx
import { MasonryPhotoAlbum } from "react-photo-album"
import "react-photo-album/masonry.css"

<MasonryPhotoAlbum
  photos={photos}
  columns={3}
  spacing={8}
  padding={4}
/>
```

**Caractéristiques :**
- ✅ Style Pinterest
- ✅ Colonnes de largeur égale
- ⚠️ Hauteurs variées (pas flush au bottom)

---

## ⚡ Zero CLS & SSR

### Principe

React Photo Album utilise **CSS flexbox** et **CSS calc()** pour calculer les dimensions côté client, permettant un markup **pixel-perfect** avant hydration.

### Configuration SSR

```tsx
<RowsPhotoAlbum
  photos={photos}
  defaultContainerWidth={1200}  // ← Important pour SSR
  sizes={{
    size: "1168px",
    sizes: [
      { viewport: "(max-width: 1200px)", size: "calc(100vw - 32px)" },
      { viewport: "(max-width: 768px)", size: "calc(100vw - 16px)" },
    ],
  }}
/>
```

**Sans defaultContainerWidth :**
- ❌ Markup vide côté serveur
- ❌ Render seulement après hydration
- ❌ Layout shift visible

**Avec defaultContainerWidth :**
- ✅ Markup complet côté serveur
- ✅ Rendu immédiat avant hydration
- ⚠️ Léger shift si largeur réelle ≠ defaultContainerWidth

**Solution optimale :**
```tsx
// Option 1: Skeleton fallback
<RowsPhotoAlbum
  photos={photos}
  skeleton={<GallerySkeleton />}  // Rendu pendant SSR
/>

// Option 2: defaultContainerWidth fixe
// Si la galerie a toujours la même largeur
<RowsPhotoAlbum
  photos={photos}
  defaultContainerWidth={1168}  // Largeur constante
/>
```

Source : [React Photo Album - SSR](https://react-photo-album.com/examples/zero-cls-ssr)

---

## 🖼️ Images Responsives avec Srcset

### Format des Photos

```typescript
type Photo = {
  src: string      // URL image principale
  width: number    // Largeur originale
  height: number   // Hauteur originale
  alt?: string     // Alt text (SEO)
  title?: string   // Titre/caption
  srcSet?: Array<{
    src: string
    width: number
    height: number
  }>
}
```

### Génération Automatique Srcset

```tsx
const photos = [
  {
    src: "/image1_1200x800.jpg",
    width: 1200,
    height: 800,
    alt: "Enfants jouant",
    srcSet: [
      { src: "/image1_400x267.jpg", width: 400, height: 267 },
      { src: "/image1_800x533.jpg", width: 800, height: 533 },
      { src: "/image1_1200x800.jpg", width: 1200, height: 800 },
    ],
  },
]

<RowsPhotoAlbum
  photos={photos}
  sizes={{
    size: "1168px",
    sizes: [
      { viewport: "(max-width: 1200px)", size: "calc(100vw - 32px)" },
    ],
  }}
/>
```

**React Photo Album génère automatiquement :**
```html
<img
  src="/image1_1200x800.jpg"
  srcset="
    /image1_400x267.jpg 400w,
    /image1_800x533.jpg 800w,
    /image1_1200x800.jpg 1200w
  "
  sizes="(max-width: 1200px) calc(100vw - 32px), 1168px"
  alt="Enfants jouant"
/>
```

Le navigateur choisit automatiquement la meilleure résolution selon le viewport ! 🎯

Source : [React Photo Album - Responsive Images](https://react-photo-album.com/)

---

## 💡 Intégration avec Next.js Image

### Render Prop avec Next/Image

```tsx
import { RowsPhotoAlbum } from "react-photo-album"
import Image from "next/image"

<RowsPhotoAlbum
  photos={photos}
  render={{
    image: (props, { photo, index }) => (
      <Image
        src={photo.src}
        alt={photo.alt || ''}
        width={photo.width}
        height={photo.height}
        placeholder={photo.blurDataURL ? "blur" : "empty"}
        blurDataURL={photo.blurDataURL}
        quality={85}
        loading={index === 0 ? "eager" : "lazy"}
        {...props}
      />
    ),
  }}
/>
```

**Avantages Next/Image :**
- ✅ Optimisation automatique
- ✅ LQIP avec blur
- ✅ Lazy loading natif
- ✅ Priority pour première image

Source : [React Photo Album - Next.js](https://react-photo-album.com/examples/nextjs)

---

## 🔦 Lightbox : Yet Another React Lightbox

### Installation

```bash
npm install yet-another-react-lightbox
```

### Plugins Disponibles

| Plugin | Description | Bundle Size |
|--------|-------------|-------------|
| **Captions** | Légendes sous images | ~2KB |
| **Counter** | Compteur (1/10) | ~1KB |
| **Download** | Bouton téléchargement | ~1KB |
| **Fullscreen** | Mode plein écran | ~2KB |
| **Share** | Partage réseaux sociaux | ~3KB |
| **Slideshow** | Diaporama automatique | ~2KB |
| **Thumbnails** | Miniatures navigation | ~4KB |
| **Zoom** | Zoom in/out | ~5KB |

**Total avec tous les plugins :** ~20-25KB

### Intégration Complète

```tsx
'use client'

import { useState } from 'react'
import { RowsPhotoAlbum } from "react-photo-album"
import Lightbox from "yet-another-react-lightbox"
import Captions from "yet-another-react-lightbox/plugins/captions"
import Counter from "yet-another-react-lightbox/plugins/counter"
import Download from "yet-another-react-lightbox/plugins/download"
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen"
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails"
import Zoom from "yet-another-react-lightbox/plugins/zoom"

import "react-photo-album/rows.css"
import "yet-another-react-lightbox/styles.css"
import "yet-another-react-lightbox/plugins/captions.css"
import "yet-another-react-lightbox/plugins/counter.css"
import "yet-another-react-lightbox/plugins/thumbnails.css"

export function Gallery({ photos }) {
  const [index, setIndex] = useState(-1)
  
  return (
    <>
      <RowsPhotoAlbum
        photos={photos}
        targetRowHeight={300}
        onClick={({ index }) => setIndex(index)}
      />
      
      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={photos}
        plugins={[Captions, Counter, Download, Fullscreen, Thumbnails, Zoom]}
        captions={{
          showToggle: true,
          descriptionTextAlign: 'center',
        }}
        thumbnails={{
          position: 'bottom',
          width: 120,
          height: 80,
        }}
        zoom={{
          maxZoomPixelRatio: 3,
          scrollToZoom: true,
        }}
      />
    </>
  )
}
```

Source : [React Photo Album - Lightbox](https://react-photo-album.com/examples/lightbox)

---

## 🎨 Intégration avec Sanity CMS

### Helper pour Transformer les Données

```typescript
// lib/sanity/helpers/galleryProps.ts
import imageUrlBuilder from '@sanity/image-url'
import { client } from '../client'

const builder = imageUrlBuilder(client)

function urlFor(source: any) {
  return builder.image(source)
}

export function transformSanityGalleryToPhotos(
  sanityGallery: SanityGalleryImage[]
) {
  return sanityGallery.map((item) => {
    const { image, label } = item
    const { asset, alt } = image
    const { width, height } = asset.metadata.dimensions
    
    return {
      // Image principale
      src: urlFor(asset).width(1200).quality(85).url(),
      width,
      height,
      alt: alt || '',
      title: label || '',
      
      // Srcset pour responsive
      srcSet: [
        {
          src: urlFor(asset).width(400).quality(80).url(),
          width: 400,
          height: Math.round((height * 400) / width),
        },
        {
          src: urlFor(asset).width(800).quality(85).url(),
          width: 800,
          height: Math.round((height * 800) / width),
        },
        {
          src: urlFor(asset).width(1200).quality(85).url(),
          width: 1200,
          height: Math.round((height * 1200) / width),
        },
      ],
      
      // LQIP pour blur placeholder (Zero CLS)
      blurDataURL: asset.metadata.lqip,
    }
  })
}
```

### Query GROQ pour Gallery

```typescript
// lib/sanity/queries/sectors.ts
export const SECTOR_PAGE_QUERY = groq`
  *[_type == "sectorPage" && _id == $sectorId][0] {
    title,
    gallery[] {
      image {
        asset-> {
          _id,
          url,
          metadata {
            dimensions { width, height, aspectRatio },
            lqip,
            blurhash
          }
        },
        alt,
        credit,
        enableCustomTooltip,
        tooltipText
      },
      label
    }
  }
`
```

### Page Secteur avec Gallery

```tsx
// app/la-structure/[slug]/page.tsx
import { fetchSectorPage } from '@/lib/sanity/queries/sectors'
import { transformSanityGalleryToPhotos } from '@/lib/sanity/helpers/galleryProps'
import { Gallery } from '@/components/Gallery'

export default async function SectorPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const data = await fetchSectorPage(params.slug)
  
  // Transformer données Sanity → React Photo Album format
  const photos = transformSanityGalleryToPhotos(data.gallery)
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">{data.title}</h1>
      
      {/* Hero Section */}
      <section>...</section>
      
      {/* Galerie */}
      <section className="mt-16">
        <h2 className="text-3xl font-bold mb-6">Galerie Photos</h2>
        <Gallery photos={photos} />
      </section>
    </div>
  )
}

// SSG - Génération statique
export async function generateStaticParams() {
  return [
    { slug: 'nurserie' },
    { slug: 'trotteurs' },
    { slug: 'grands' },
    { slug: 'autres-espaces' },
  ]
}
```

---

## 📱 Configuration Responsive

### Adaptive Layout par Breakpoint

```tsx
'use client'

import { useEffect, useState } from 'react'
import { RowsPhotoAlbum, ColumnsPhotoAlbum } from "react-photo-album"

export function ResponsiveGallery({ photos }) {
  const [windowWidth, setWindowWidth] = useState(1200)
  
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  // Mobile : 2 colonnes
  if (windowWidth < 768) {
    return (
      <ColumnsPhotoAlbum
        photos={photos}
        columns={2}
        spacing={4}
      />
    )
  }
  
  // Tablet : 3 colonnes
  if (windowWidth < 1024) {
    return (
      <ColumnsPhotoAlbum
        photos={photos}
        columns={3}
        spacing={6}
      />
    )
  }
  
  // Desktop : Rows layout
  return (
    <RowsPhotoAlbum
      photos={photos}
      targetRowHeight={300}
      spacing={8}
    />
  )
}
```

### Sizes pour Images Responsives

```tsx
<RowsPhotoAlbum
  photos={photos}
  sizes={{
    size: "1168px",  // Largeur par défaut
    sizes: [
      { viewport: "(max-width: 768px)", size: "calc(100vw - 16px)" },
      { viewport: "(max-width: 1200px)", size: "calc(100vw - 32px)" },
      { viewport: "(max-width: 1536px)", size: "1168px" },
    ],
  }}
/>
```

---

## 🚀 Optimisation Performance

### 1. Lazy Loading

```tsx
import { Suspense } from 'react'

export function LazyGallery({ photos }) {
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
        {Array.from({ length: 9 }).map((_, i) => (
          <div 
            key={i} 
            className="aspect-[4/3] bg-gray-200 rounded-lg" 
          />
        ))}
      </div>
    </div>
  )
}
```

### 2. Preload Première Image (LCP)

```tsx
export function Gallery({ photos }) {
  return (
    <>
      {/* Preload première image pour LCP */}
      {photos[0] && (
        <link
          rel="preload"
          as="image"
          href={photos[0].src}
          imageSrcSet={photos[0].srcSet?.map(s => `${s.src} ${s.width}w`).join(', ')}
        />
      )}
      
      <RowsPhotoAlbum photos={photos} />
    </>
  )
}
```

### 3. Optimisation Sanity CDN

```typescript
// Générer srcSet optimisé avec Sanity CDN
export function getSanityImageSrcSet(asset: any) {
  const baseWidth = asset.metadata.dimensions.width
  const baseHeight = asset.metadata.dimensions.height
  
  const breakpoints = [400, 800, 1200, 1600]
  
  return breakpoints.map(width => ({
    src: urlFor(asset)
      .width(width)
      .quality(85)
      .format('webp')
      .url(),
    width,
    height: Math.round((baseHeight * width) / baseWidth),
  }))
}
```

---

## 🎨 Personnalisation CSS

### Styles de Base

```css
/* styles/gallery.css */

/* Variables globales */
.react-photo-album {
  --photo-album-spacing: 8px;
  --photo-album-padding: 4px;
}

/* Images avec hover */
.react-photo-album img {
  border-radius: 8px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
}

.react-photo-album img:hover {
  transform: scale(1.02);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

/* Responsive spacing */
@media (max-width: 768px) {
  .react-photo-album {
    --photo-album-spacing: 4px;
    --photo-album-padding: 2px;
  }
}
```

### Lightbox Personnalisé

```css
/* styles/lightbox.css */

/* Background */
.yarl__container {
  background-color: rgba(0, 0, 0, 0.95);
}

/* Boutons */
.yarl__button {
  color: white;
  background-color: rgba(255, 255, 255, 0.1);
}

.yarl__button:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

/* Thumbnails */
.yarl__thumbnails_thumbnail {
  border-radius: 4px;
  border: 2px solid transparent;
}

.yarl__thumbnails_thumbnail_active {
  border-color: var(--purple-9);
}
```

---

## 🎨 Intégration Radix UI pour Design Avancé

### AspectRatio pour Images Consistentes

```tsx
import * as AspectRatio from '@radix-ui/react-aspect-ratio'
import Image from 'next/image'

// Wrapper d'image avec ratio fixe
export function GalleryImageWithRatio({ photo }) {
  return (
    <AspectRatio.Root ratio={4 / 3}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        className="object-cover rounded-lg"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </AspectRatio.Root>
  )
}

// Utilisation dans react-photo-album
<RowsPhotoAlbum
  photos={photos}
  render={{
    image: (props, { photo }) => (
      <GalleryImageWithRatio photo={photo} {...props} />
    ),
  }}
/>
```

**Avantages AspectRatio :**
- ✅ Ratio préservé même si image non chargée
- ✅ Zero CLS garanti
- ✅ Compatible avec Next/Image fill

### Dialog comme Lightbox Alternative

Alternative à yet-another-react-lightbox avec Radix UI Dialog :

```tsx
import * as Dialog from '@radix-ui/react-dialog'
import Image from 'next/image'

export function CustomLightbox({ 
  photo, 
  open, 
  onClose 
}: { 
  photo: Photo | null
  open: boolean
  onClose: () => void
}) {
  if (!photo) return null
  
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/95 backdrop-blur-sm" />
        <Dialog.Content className="fixed inset-0 flex items-center justify-center p-4">
          {/* Image principale */}
          <div className="relative w-full h-full max-w-7xl max-h-screen">
            <Image
              src={photo.src}
              alt={photo.alt || ''}
              fill
              className="object-contain"
              quality={95}
              priority
            />
          </div>
          
          {/* Caption */}
          {photo.title && (
            <Dialog.Description className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white text-center bg-black/50 px-4 py-2 rounded-lg backdrop-blur-sm">
              {photo.title}
            </Dialog.Description>
          )}
          
          {/* Bouton fermer */}
          <Dialog.Close className="absolute top-4 right-4 text-white hover:text-purple-9 transition-colors">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
```

### HoverCard pour Métadonnées Images

Afficher crédit, date, etc. au survol :

```tsx
import * as HoverCard from '@radix-ui/react-hover-card'

export function GalleryImageWithInfo({ photo, credit }) {
  return (
    <HoverCard.Root openDelay={200}>
      <HoverCard.Trigger asChild>
        <div className="relative cursor-pointer">
          <Image
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            className="rounded-lg"
          />
        </div>
      </HoverCard.Trigger>
      
      <HoverCard.Portal>
        <HoverCard.Content
          side="top"
          className="bg-white p-3 rounded-lg shadow-lg border border-gray-200"
        >
          <div className="text-sm">
            <p className="font-semibold text-orange-12">{photo.title}</p>
            {credit && (
              <p className="text-orange-11 mt-1">
                📸 {credit}
              </p>
            )}
          </div>
          <HoverCard.Arrow className="fill-white" />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  )
}
```

### ScrollArea pour Thumbnails

Barre de miniatures avec scroll personnalisé :

```tsx
import * as ScrollArea from '@radix-ui/react-scroll-area'

export function ThumbnailsBar({ photos, currentIndex, onSelect }) {
  return (
    <ScrollArea.Root className="h-24 bg-black/50 backdrop-blur">
      <ScrollArea.Viewport className="h-full px-4">
        <div className="flex gap-2 items-center h-full">
          {photos.map((photo, index) => (
            <button
              key={index}
              onClick={() => onSelect(index)}
              className={`
                relative shrink-0 w-20 h-20 rounded overflow-hidden
                ${index === currentIndex ? 'ring-2 ring-purple-9' : 'opacity-60'}
              `}
            >
              <Image
                src={photo.src}
                alt={photo.alt || ''}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar orientation="horizontal" className="h-2">
        <ScrollArea.Thumb className="bg-purple-9 rounded" />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  )
}
```

### Separator entre Sections

```tsx
import * as Separator from '@radix-ui/react-separator'

export function GalleryWithSections({ galleries }) {
  return (
    <div className="space-y-12">
      {galleries.map((gallery, index) => (
        <div key={gallery.id}>
          <h2 className="text-2xl font-bold mb-6">{gallery.title}</h2>
          <Gallery photos={gallery.photos} />
          
          {index < galleries.length - 1 && (
            <Separator.Root className="my-12 h-px bg-orange-6" />
          )}
        </div>
      ))}
    </div>
  )
}
```

### Tooltip pour Crédits Images

```tsx
import * as Tooltip from '@radix-ui/react-tooltip'

export function ImageWithCredit({ photo, credit }) {
  return (
    <Tooltip.Provider delayDuration={200}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <div className="relative group">
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              className="rounded-lg transition-transform group-hover:scale-[1.02]"
            />
            
            {/* Badge crédit */}
            {credit && (
              <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                📸 {credit}
              </div>
            )}
          </div>
        </Tooltip.Trigger>
        
        <Tooltip.Portal>
          <Tooltip.Content
            side="top"
            className="bg-orange-12 text-white px-3 py-2 rounded text-sm shadow-lg"
          >
            Photo : {credit}
            <Tooltip.Arrow className="fill-orange-12" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}
```

### Visually Hidden pour Accessibilité

```tsx
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'

export function Gallery({ photos }) {
  return (
    <div>
      {/* Description cachée pour lecteurs d'écran */}
      <VisuallyHidden.Root>
        <p>Galerie de {photos.length} photos. Cliquez sur une photo pour l'agrandir.</p>
      </VisuallyHidden.Root>
      
      <RowsPhotoAlbum
        photos={photos}
        onClick={({ index }) => setIndex(index)}
      />
    </div>
  )
}
```

### Composant Gallery Complet avec Radix UI

```tsx
'use client'

import { useState } from 'react'
import { RowsPhotoAlbum } from "react-photo-album"
import * as Dialog from '@radix-ui/react-dialog'
import * as AspectRatio from '@radix-ui/react-aspect-ratio'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import Image from "next/image"

export function GalleryWithRadixUI({ photos }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const selectedPhoto = selectedIndex !== null ? photos[selectedIndex] : null
  
  return (
    <>
      {/* Description accessible */}
      <VisuallyHidden.Root>
        <p>Galerie de {photos.length} photos. Cliquez pour agrandir.</p>
      </VisuallyHidden.Root>
      
      {/* Galerie principale */}
      <RowsPhotoAlbum
        photos={photos}
        targetRowHeight={300}
        spacing={8}
        onClick={({ index }) => setSelectedIndex(index)}
        render={{
          image: (props, { photo }) => (
            <AspectRatio.Root ratio={photo.width / photo.height}>
              <Image
                {...props}
                src={photo.src}
                alt={photo.alt || ''}
                fill
                className="object-cover rounded-lg transition-transform hover:scale-[1.02]"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </AspectRatio.Root>
          ),
        }}
      />
      
      {/* Lightbox avec Radix Dialog */}
      <Dialog.Root 
        open={selectedPhoto !== null} 
        onOpenChange={(open) => !open && setSelectedIndex(null)}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50" />
          
          <Dialog.Content className="fixed inset-0 z-50 flex flex-col">
            {/* Image principale */}
            <div className="flex-1 flex items-center justify-center p-4">
              {selectedPhoto && (
                <div className="relative w-full h-full max-w-7xl">
                  <Image
                    src={selectedPhoto.src}
                    alt={selectedPhoto.alt || ''}
                    fill
                    className="object-contain"
                    quality={95}
                    priority
                  />
                </div>
              )}
            </div>
            
            {/* Caption */}
            {selectedPhoto?.title && (
              <Dialog.Description className="text-white text-center py-4 px-8 bg-black/50 backdrop-blur-sm">
                {selectedPhoto.title}
              </Dialog.Description>
            )}
            
            {/* Thumbnails bar */}
            <ScrollArea.Root className="h-24 bg-black/50 backdrop-blur">
              <ScrollArea.Viewport className="h-full px-4">
                <div className="flex gap-2 items-center h-full">
                  {photos.map((photo, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedIndex(index)}
                      className={`
                        relative shrink-0 w-20 h-20 rounded overflow-hidden
                        transition-all
                        ${index === selectedIndex 
                          ? 'ring-2 ring-purple-9 scale-110' 
                          : 'opacity-60 hover:opacity-100'
                        }
                      `}
                    >
                      <Image
                        src={photo.src}
                        alt={photo.alt || ''}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </button>
                  ))}
                </div>
              </ScrollArea.Viewport>
              <ScrollArea.Scrollbar orientation="horizontal" className="h-2">
                <ScrollArea.Thumb className="bg-purple-9 rounded" />
              </ScrollArea.Scrollbar>
            </ScrollArea.Root>
            
            {/* Boutons navigation */}
            <div className="absolute inset-y-0 left-4 flex items-center">
              <button
                onClick={() => setSelectedIndex(i => i > 0 ? i - 1 : photos.length - 1)}
                className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-sm transition-colors"
                aria-label="Photo précédente"
              >
                ←
              </button>
            </div>
            
            <div className="absolute inset-y-0 right-4 flex items-center">
              <button
                onClick={() => setSelectedIndex(i => i < photos.length - 1 ? i + 1 : 0)}
                className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-sm transition-colors"
                aria-label="Photo suivante"
              >
                →
              </button>
            </div>
            
            {/* Bouton fermer */}
            <Dialog.Close className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full backdrop-blur-sm transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  )
}
```

### HoverCard pour Informations Images

Afficher métadonnées au survol :

```tsx
import * as HoverCard from '@radix-ui/react-hover-card'

export function GalleryImageWithMetadata({ photo }) {
  return (
    <HoverCard.Root openDelay={300}>
      <HoverCard.Trigger asChild>
        <div className="relative group cursor-pointer">
          <Image
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            className="rounded-lg transition-all group-hover:brightness-110"
          />
          
          {/* Badge compteur */}
          <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
            {photo.width} × {photo.height}
          </div>
        </div>
      </HoverCard.Trigger>
      
      <HoverCard.Portal>
        <HoverCard.Content
          side="top"
          sideOffset={5}
          className="bg-white p-4 rounded-lg shadow-xl border border-orange-6 w-80 z-50"
        >
          <div className="space-y-2">
            <h4 className="font-semibold text-orange-12">{photo.title || 'Sans titre'}</h4>
            
            {photo.credit && (
              <p className="text-sm text-orange-11">
                <span className="font-medium">Crédit :</span> {photo.credit}
              </p>
            )}
            
            <div className="text-xs text-orange-10 flex gap-4">
              <span>{photo.width} × {photo.height}px</span>
              <span>Ratio {(photo.width / photo.height).toFixed(2)}</span>
            </div>
          </div>
          
          <HoverCard.Arrow className="fill-white" />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  )
}
```

### Separator entre Groupes de Photos

```tsx
import * as Separator from '@radix-ui/react-separator'

export function MultiGallery({ sections }) {
  return (
    <div className="space-y-16">
      {sections.map((section, index) => (
        <div key={section.id}>
          {/* Titre section */}
          <h2 className="text-3xl font-bold text-orange-12 mb-6">
            {section.title}
          </h2>
          
          {/* Description */}
          {section.description && (
            <p className="text-orange-11 mb-8">
              {section.description}
            </p>
          )}
          
          {/* Galerie */}
          <Gallery photos={section.photos} />
          
          {/* Séparateur */}
          {index < sections.length - 1 && (
            <Separator.Root className="my-16 h-px bg-gradient-to-r from-transparent via-orange-6 to-transparent" />
          )}
        </div>
      ))}
    </div>
  )
}
```

### Tabs pour Filtres de Galerie

```tsx
import * as Tabs from '@radix-ui/react-tabs'

export function FilterableGallery({ allPhotos }) {
  return (
    <Tabs.Root defaultValue="all">
      <Tabs.List className="flex gap-2 mb-8 border-b border-orange-6">
        <Tabs.Trigger 
          value="all"
          className="px-4 py-2 text-orange-11 hover:text-orange-12 data-[state=active]:text-purple-11 data-[state=active]:border-b-2 data-[state=active]:border-purple-9"
        >
          Toutes ({allPhotos.length})
        </Tabs.Trigger>
        <Tabs.Trigger 
          value="activities"
          className="px-4 py-2 text-orange-11 hover:text-orange-12 data-[state=active]:text-purple-11 data-[state=active]:border-b-2 data-[state=active]:border-purple-9"
        >
          Activités
        </Tabs.Trigger>
        <Tabs.Trigger 
          value="spaces"
          className="px-4 py-2 text-orange-11 hover:text-orange-12 data-[state=active]:text-purple-11 data-[state=active]:border-b-2 data-[state=active]:border-purple-9"
        >
          Espaces
        </Tabs.Trigger>
      </Tabs.List>
      
      <Tabs.Content value="all">
        <Gallery photos={allPhotos} />
      </Tabs.Content>
      
      <Tabs.Content value="activities">
        <Gallery photos={allPhotos.filter(p => p.category === 'activity')} />
      </Tabs.Content>
      
      <Tabs.Content value="spaces">
        <Gallery photos={allPhotos.filter(p => p.category === 'space')} />
      </Tabs.Content>
    </Tabs.Root>
  )
}
```

### Avatar pour Images Circulaires (Équipe)

```tsx
import * as Avatar from '@radix-ui/react-avatar'

export function TeamGallery({ members }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {members.map(member => (
        <div key={member.id} className="text-center">
          <Avatar.Root className="inline-flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-orange-3">
            <Avatar.Image
              src={member.photo}
              alt={member.name}
              className="h-full w-full object-cover"
            />
            <Avatar.Fallback className="text-2xl font-medium text-orange-11">
              {member.name.substring(0, 2).toUpperCase()}
            </Avatar.Fallback>
          </Avatar.Root>
          
          <h3 className="mt-4 font-semibold text-orange-12">{member.name}</h3>
          <p className="text-sm text-orange-11">{member.role}</p>
        </div>
      ))}
    </div>
  )
}
```

---

## 🔧 Composant Gallery Complet

### Version Production-Ready

```tsx
// components/Gallery.tsx
'use client'

import { useState } from 'react'
import { RowsPhotoAlbum } from "react-photo-album"
import Lightbox from "yet-another-react-lightbox"
import Captions from "yet-another-react-lightbox/plugins/captions"
import Counter from "yet-another-react-lightbox/plugins/counter"
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen"
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails"
import Zoom from "yet-another-react-lightbox/plugins/zoom"
import Image from "next/image"

import "react-photo-album/rows.css"
import "yet-another-react-lightbox/styles.css"
import "yet-another-react-lightbox/plugins/captions.css"
import "yet-another-react-lightbox/plugins/counter.css"
import "yet-another-react-lightbox/plugins/thumbnails.css"

type Photo = {
  src: string
  width: number
  height: number
  alt?: string
  title?: string
  blurDataURL?: string
  srcSet?: Array<{ src: string; width: number; height: number }>
}

type GalleryProps = {
  photos: Photo[]
  targetRowHeight?: number
  spacing?: number
}

export function Gallery({ 
  photos, 
  targetRowHeight = 300,
  spacing = 8 
}: GalleryProps) {
  const [index, setIndex] = useState(-1)
  
  return (
    <>
      <RowsPhotoAlbum
        photos={photos}
        targetRowHeight={targetRowHeight}
        spacing={spacing}
        padding={4}
        onClick={({ index }) => setIndex(index)}
        defaultContainerWidth={1200}
        sizes={{
          size: "calc(100vw - 32px)",
          sizes: [
            { viewport: "(max-width: 768px)", size: "calc(100vw - 16px)" },
            { viewport: "(max-width: 1200px)", size: "calc(100vw - 32px)" },
          ],
        }}
        render={{
          image: (props, { photo, index: idx }) => (
            <Image
              {...props}
              src={photo.src}
              alt={photo.alt || ''}
              width={photo.width}
              height={photo.height}
              placeholder={photo.blurDataURL ? "blur" : "empty"}
              blurDataURL={photo.blurDataURL}
              quality={85}
              loading={idx < 3 ? "eager" : "lazy"}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ),
        }}
      />
      
      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={photos.map(photo => ({
          src: photo.src,
          alt: photo.alt,
          title: photo.title,
          description: photo.title,
          width: photo.width,
          height: photo.height,
        }))}
        plugins={[Captions, Counter, Fullscreen, Thumbnails, Zoom]}
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
          gap: 16,
        }}
        zoom={{
          maxZoomPixelRatio: 3,
          zoomInMultiplier: 2,
          scrollToZoom: true,
        }}
      />
    </>
  )
}
```

---

## 📊 Performance Checklist

### Avant Déploiement

```bash
✅ Images
  ✓ Dimensions width/height fournies (Zero CLS)
  ✓ LQIP généré (blurhash ou lqip)
  ✓ Srcset avec 3-4 breakpoints
  ✓ Format WebP via Sanity CDN
  ✓ Quality 85% pour galeries

✅ React Photo Album
  ✓ defaultContainerWidth configuré (SSR)
  ✓ sizes configurées (responsive)
  ✓ targetRowHeight optimisé (300px)
  ✓ spacing approprié (8px desktop, 4px mobile)

✅ Lightbox
  ✓ Plugins nécessaires uniquement
  ✓ CSS importés
  ✓ Index state géré correctement
  ✓ Slides avec dimensions

✅ Performance
  ✓ Lazy loading (index > 2)
  ✓ Preload première image
  ✓ Bundle size vérifié
  ✓ Lighthouse score > 90
```

---

## 🚧 Plan d'Implémentation

### Phase 1 : Setup de Base
- [ ] Installer `react-photo-album`
- [ ] Installer `yet-another-react-lightbox`
- [ ] Créer helper `transformSanityGalleryToPhotos`
- [ ] Créer composant `Gallery.tsx`

### Phase 2 : Intégration Sanity
- [ ] Query GROQ avec metadata images
- [ ] Transformation données Sanity
- [ ] Test avec données réelles
- [ ] Vérification LQIP

### Phase 3 : Lightbox
- [ ] Installer plugins nécessaires
- [ ] Configuration plugins
- [ ] Styles personnalisés
- [ ] Tests navigation (clavier, touch)

### Phase 4 : Optimisation
- [ ] SSR avec defaultContainerWidth
- [ ] Lazy loading images
- [ ] Preload première image
- [ ] Tests Lighthouse

### Phase 5 : Tests
- [ ] Tests responsive (mobile, tablet, desktop)
- [ ] Tests SSR/hydration
- [ ] Tests performance (LCP, CLS)
- [ ] Tests accessibilité

---

## 📚 Ressources

### Documentation Officielle
- [React Photo Album](https://react-photo-album.com/)
- [Documentation](https://react-photo-album.com/documentation)
- [Examples](https://react-photo-album.com/examples)
- [Next.js Integration](https://react-photo-album.com/examples/nextjs)
- [Zero CLS SSR](https://react-photo-album.com/examples/zero-cls-ssr)
- [Server Component](https://react-photo-album.com/examples/server-component)
- [Lightbox Integration](https://react-photo-album.com/examples/lightbox)

### Yet Another React Lightbox
- [Documentation](https://yet-another-react-lightbox.com/)
- [Plugins](https://yet-another-react-lightbox.com/plugins)

### GitHub
- [react-photo-album](https://github.com/igordanchenko/react-photo-album)
- [yet-another-react-lightbox](https://github.com/igordanchenko/yet-another-react-lightbox)

---

## 🎯 Résumé Technique

### Pour Notre Projet

**Configuration recommandée :**
- ✅ **Layout** : Rows (meilleur pour photos variées)
- ✅ **Target Row Height** : 300px (desktop), 200px (mobile)
- ✅ **Spacing** : 8px (desktop), 4px (mobile)
- ✅ **SSR** : defaultContainerWidth={1200}
- ✅ **Images** : Next/Image avec LQIP de Sanity
- ✅ **Lightbox** : Plugins essentiels (Captions, Thumbnails, Zoom, Fullscreen)

**Bundle estimé :**
- react-photo-album : ~15KB
- yet-another-react-lightbox : ~25KB
- Total : ~40KB (acceptable)

**Performance attendue :**
- LCP : <2.5s (première image avec priority)
- CLS : 0 (dimensions + LQIP)
- Bundle : +40KB sur pages secteurs uniquement

---

**Status :** 📚 Recherche terminée - Prêt pour implémentation

**Dernière mise à jour :** Octobre 2024

