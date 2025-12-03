# Features - Galerie Photos

## 📊 Vue d'ensemble

Galerie photos responsive avec lightbox, lazy loading et optimisation d'images Sanity.

**Stack** : react-photo-album · yet-another-react-lightbox · Next/Image · Sanity Image Pipeline

---

## 🎯 Fonctionnalités

- **Masonry Layout** : Grille responsive multi-colonnes
- **Lightbox** : Visualisation plein écran avec navigation
- **Lazy Loading** : Chargement progressif
- **LQIP/Blurhash** : Placeholders durant chargement
- **Optimisation** : WebP automatique via Sanity
- **Accessibilité** : ARIA labels, navigation clavier

---

## 🧩 Composants

### `GallerySection.tsx`

**Chemin** : `src/components/pages/sector/GallerySection.tsx`

```tsx
'use client'

import { useState } from 'react'
import PhotoAlbum from 'react-photo-album'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

import { getOptimizedImageUrl } from '@/sanity/helpers/imageProps'
import type { GalleryItem } from '@/sanity/types'

type GallerySectionProps = {
  gallery: GalleryItem[]
}

export function GallerySection({ gallery }: GallerySectionProps) {
  const [index, setIndex] = useState(-1)

  const photos = gallery.map((item) => ({
    src: getOptimizedImageUrl(item.image, 1200),
    width: item.image.asset.metadata.dimensions.width,
    height: item.image.asset.metadata.dimensions.height,
    alt: item.image.alt || item.label,
    title: item.label
  }))

  return (
    <>
      <PhotoAlbum
        photos={photos}
        layout="masonry"
        columns={(containerWidth) => {
          if (containerWidth < 640) return 1
          if (containerWidth < 1024) return 2
          return 3
        }}
        onClick={({ index }) => setIndex(index)}
      />

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={photos}
      />
    </>
  )
}
```

---

## 🖼️ Optimisation Images

### Helper Sanity

**Fichier** : `sanity/helpers/imageProps.ts`

```typescript
import imageUrlBuilder from '@sanity/image-url'
import { client } from '../client'

const builder = imageUrlBuilder(client)

export function getOptimizedImageUrl(
  image: SanityImage,
  width?: number,
  height?: number
): string {
  let url = builder.image(image.asset)

  if (width) url = url.width(width)
  if (height) url = url.height(height)

  return url
    .format('webp')
    .quality(85)
    .fit('max')
    .auto('format')
    .url()
}
```

**Paramètres** :
- `format('webp')` : WebP automatique (fallback JPEG)
- `quality(85)` : Balance qualité/poids
- `fit('max')` : Respecte ratio
- `auto('format')` : Format optimal selon navigateur

---

### Responsive Breakpoints

```typescript
export function getResponsiveImageUrls(image: SanityImage) {
  return {
    src: getOptimizedImageUrl(image, 1200),
    srcSet: `
      ${getOptimizedImageUrl(image, 640)} 640w,
      ${getOptimizedImageUrl(image, 768)} 768w,
      ${getOptimizedImageUrl(image, 1024)} 1024w,
      ${getOptimizedImageUrl(image, 1200)} 1200w
    `,
    sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
  }
}
```

---

## 📐 Layouts

### Masonry (par défaut)

```tsx
<PhotoAlbum
  photos={photos}
  layout="masonry"
  columns={(containerWidth) => {
    if (containerWidth < 640) return 1
    if (containerWidth < 1024) return 2
    return 3
  }}
/>
```

**Avantages** :
- Pas d'espaces vides
- Pinterest-like
- Responsive

---

### Rows

```tsx
<PhotoAlbum
  photos={photos}
  layout="rows"
  targetRowHeight={300}
/>
```

**Avantages** :
- Hauteurs uniformes
- Lecture horizontale

---

### Columns

```tsx
<PhotoAlbum
  photos={photos}
  layout="columns"
  columns={3}
/>
```

**Avantages** :
- Largeurs uniformes
- Grille stricte

---

## 🔍 Lightbox

### Configuration

```tsx
import Lightbox from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen'
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow'

<Lightbox
  open={index >= 0}
  index={index}
  close={() => setIndex(-1)}
  slides={photos}
  plugins={[Zoom, Fullscreen, Slideshow]}
  zoom={{
    maxZoomPixelRatio: 3,
    scrollToZoom: true
  }}
/>
```

**Plugins** :
- **Zoom** : Zoom in/out (scroll ou double-clic)
- **Fullscreen** : Mode plein écran
- **Slideshow** : Défilement automatique

---

### Navigation Clavier

| Touche | Action |
|--------|--------|
| `←` / `→` | Image précédente/suivante |
| `Esc` | Fermer lightbox |
| `F` | Plein écran |
| `Space` | Play/Pause slideshow |
| `+` / `-` | Zoom in/out |

---

## 🎨 Accessibilité

### ARIA Labels

```tsx
<PhotoAlbum
  photos={photos}
  renderPhoto={({ photo, wrapperStyle, renderDefaultPhoto }) => (
    <button
      onClick={() => setIndex(photo.index)}
      style={wrapperStyle}
      aria-label={`Ouvrir ${photo.alt} en plein écran`}
    >
      {renderDefaultPhoto()}
    </button>
  )}
/>
```

---

### Focus Management

```tsx
useEffect(() => {
  if (index >= 0) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}, [index])
```

---

## 🚀 Performance

### Lazy Loading

**react-photo-album** gère automatiquement le lazy loading avec Intersection Observer.

```tsx
<img
  src={photo.src}
  alt={photo.alt}
  loading="lazy"
  decoding="async"
/>
```

---

### Placeholders

#### LQIP (Low Quality Image Placeholder)

```tsx
<img
  src={image.asset.metadata.lqip}
  alt={image.alt}
  style={{ filter: 'blur(20px)' }}
/>
```

#### Blurhash

```tsx
import { Blurhash } from 'react-blurhash'

<Blurhash
  hash={image.asset.metadata.blurhash}
  width="100%"
  height="100%"
  resolutionX={32}
  resolutionY={32}
  punch={1}
/>
```

---

### Préchargement Images Adjacentes

```tsx
useEffect(() => {
  if (index >= 0) {
    // Précharger image suivante
    if (index < photos.length - 1) {
      const nextImage = new Image()
      nextImage.src = photos[index + 1].src
    }
    // Précharger image précédente
    if (index > 0) {
      const prevImage = new Image()
      prevImage.src = photos[index - 1].src
    }
  }
}, [index, photos])
```

---

## 📊 Exemple Complet

```tsx
'use client'

import { useState, useEffect } from 'react'
import PhotoAlbum from 'react-photo-album'
import Lightbox from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen'
import 'yet-another-react-lightbox/styles.css'

import type { GalleryItem } from '@/sanity/types'
import { getOptimizedImageUrl } from '@/sanity/helpers/imageProps'

export function GallerySection({ gallery }: { gallery: GalleryItem[] }) {
  const [index, setIndex] = useState(-1)

  const photos = gallery.map((item) => ({
    src: getOptimizedImageUrl(item.image, 1200),
    width: item.image.asset.metadata.dimensions.width,
    height: item.image.asset.metadata.dimensions.height,
    alt: item.image.alt || item.label,
    title: item.label,
    blurhash: item.image.asset.metadata.blurhash
  }))

  // Lock scroll when lightbox open
  useEffect(() => {
    if (index >= 0) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [index])

  return (
    <section className="py-16">
      <div className="container">
        <h2 className="text-3xl font-bold mb-8">Galerie Photos</h2>

        <PhotoAlbum
          photos={photos}
          layout="masonry"
          columns={(containerWidth) => {
            if (containerWidth < 640) return 1
            if (containerWidth < 1024) return 2
            return 3
          }}
          onClick={({ index }) => setIndex(index)}
          renderPhoto={({ photo, wrapperStyle, renderDefaultPhoto }) => (
            <button
              onClick={() => setIndex(photo.index)}
              style={wrapperStyle}
              className="cursor-pointer transition-transform hover:scale-105"
              aria-label={`Ouvrir ${photo.alt} en plein écran`}
            >
              {renderDefaultPhoto()}
            </button>
          )}
        />

        <Lightbox
          open={index >= 0}
          index={index}
          close={() => setIndex(-1)}
          slides={photos}
          plugins={[Zoom, Fullscreen]}
          zoom={{
            maxZoomPixelRatio: 3,
            scrollToZoom: true
          }}
        />
      </div>
    </section>
  )
}
```

---

## 📚 Références

- **react-photo-album** : https://react-photo-album.com/
- **yet-another-react-lightbox** : https://yet-another-react-lightbox.com/
- **Sanity Image URLs** : https://www.sanity.io/docs/image-urls

---

**Dernière mise à jour** : 2025-12-03
**Version** : 1.0.0
