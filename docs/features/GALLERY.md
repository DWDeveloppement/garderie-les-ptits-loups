# 🖼️ Système de Galeries - React Photo Album

## 📋 Vue d'Ensemble

Implémentation de galeries d'images responsive avec [React Photo Album](https://react-photo-album.com/) pour les pages secteurs de la garderie. La librairie offre SSR, Zero CLS et 3 layouts optimisés.

---

## 🎯 Pourquoi React Photo Album ?

### Avantages

| Fonctionnalité | Description |
|----------------|-------------|
| **SSR friendly** | Markup pixel-perfect côté serveur avant hydration |
| **Zero CLS** | Pas de layout shift grâce aux dimensions pré-calculées |
| **3 Layouts** | Rows, Columns, Masonry avec algorithmes optimisés |
| **Responsive** | `srcset` et `sizes` automatiques |
| **TypeScript** | Types built-in dans le package |
| **Performance** | Conçu pour de gros albums photos |
| **React 18+** | Compatible avec Next.js 15 App Router |

### Bundle Size

```bash
Bundle Size: ~15KB (gzippé)
```

Source : [React Photo Album](https://react-photo-album.com/)

---

## 🏗️ Architecture des Layouts

### 1. Rows Layout (Recommandé)

**Algorithme :** Knuth & Plass line-breaking + Dijkstra's shortest path

```tsx
import { RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";

<RowsPhotoAlbum
  photos={photos}
  targetRowHeight={300}
  spacing={8}
  padding={4}
/>
```

**Comportement :**
- Lignes de hauteur similaire
- Hauteur proche de `targetRowHeight`
- Pas de photos étirées ou shrinkées anormalement
- Résout le problème des panoramas et stragglers

### 2. Columns Layout

**Algorithme :** Dynamic programming pour shortest path de longueur N

```tsx
import { ColumnsPhotoAlbum } from "react-photo-album";
import "react-photo-album/columns.css";

<ColumnsPhotoAlbum
  photos={photos}
  columns={3}
  spacing={8}
  padding={4}
/>
```

**Comportement :**
- Nombre de colonnes prédéfini
- Répartition optimale des photos
- Colonnes de hauteur équilibrée

### 3. Masonry Layout

**Algorithme :** Placement dans la colonne la plus courte

```tsx
import { MasonryPhotoAlbum } from "react-photo-album";
import "react-photo-album/masonry.css";

<MasonryPhotoAlbum
  photos={photos}
  columns={3}
  spacing={8}
  padding={4}
/>
```

**Comportement :**
- Style Pinterest
- Colonnes de largeur égale
- Hauteurs variées (pas flush au bottom)

---

## ⚡ SSR & Zero CLS

### Configuration SSR

Pour un rendu serveur pixel-perfect :

```tsx
<RowsPhotoAlbum
  photos={photos}
  defaultContainerWidth={1200}
  sizes={{
    size: "1168px",
    sizes: [
      { viewport: "(max-width: 1200px)", size: "calc(100vw - 32px)" },
      { viewport: "(max-width: 768px)", size: "calc(100vw - 16px)" },
    ],
  }}
/>
```

### Comment ça fonctionne ?

- **CSS flexbox + `calc()`** : Calcul des dimensions côté client
- **Markup identique** : Server et client produisent le même HTML
- **Zero Layout Shift** : Dimensions connues avant hydration
- **Skeleton fallback** : Option pour placeholder pendant hydration

Source : [React Photo Album - SSR](https://react-photo-album.com/)

---

## 🖼️ Images Responsives

### Automatic Resolution Switching

React Photo Album génère automatiquement `srcset` et `sizes` :

```tsx
const photos = [
  {
    src: "/image1_1200x800.jpg",
    width: 1200,
    height: 800,
    srcSet: [
      { src: "/image1_400x267.jpg", width: 400, height: 267 },
      { src: "/image1_800x533.jpg", width: 800, height: 533 },
      { src: "/image1_1200x800.jpg", width: 1200, height: 800 },
    ],
  },
];
```

### Intégration avec Sanity CDN

```tsx
// lib/sanity/helpers/galleryProps.ts
import { urlFor } from '../image-url'

export function getSanityGalleryPhotos(sanityImages: SanityGalleryImage[]) {
  return sanityImages.map(item => ({
    src: urlFor(item.image.asset)
      .width(1200)
      .height(800)
      .quality(85)
      .url(),
    width: item.image.asset.metadata.dimensions.width,
    height: item.image.asset.metadata.dimensions.height,
    alt: item.image.alt,
    title: item.label,
    srcSet: [
      {
        src: urlFor(item.image.asset).width(400).quality(80).url(),
        width: 400,
        height: Math.round((item.image.asset.metadata.dimensions.height * 400) / item.image.asset.metadata.dimensions.width),
      },
      {
        src: urlFor(item.image.asset).width(800).quality(85).url(),
        width: 800,
        height: Math.round((item.image.asset.metadata.dimensions.height * 800) / item.image.asset.metadata.dimensions.width),
      },
      {
        src: urlFor(item.image.asset).width(1200).quality(85).url(),
        width: 1200,
        height: Math.round((item.image.asset.metadata.dimensions.height * 1200) / item.image.asset.metadata.dimensions.width),
      },
    ],
  }))
}
```

---

## 💡 Implémentation Next.js

### Installation

```bash
npm install react-photo-album
```

**Requirements:**
- React 18+
- Node 18+
- ESM-compatible bundler

### Composant Gallery de Base

```tsx
// components/Gallery.tsx
'use client'

import { RowsPhotoAlbum } from "react-photo-album"
import "react-photo-album/rows.css"

type Photo = {
  src: string
  width: number
  height: number
  alt?: string
  title?: string
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
  return (
    <RowsPhotoAlbum
      photos={photos}
      targetRowHeight={targetRowHeight}
      spacing={spacing}
      padding={4}
      sizes={{
        size: "calc(100vw - 32px)",
        sizes: [
          { viewport: "(max-width: 768px)", size: "calc(100vw - 16px)" },
          { viewport: "(max-width: 1200px)", size: "calc(100vw - 32px)" },
        ],
      }}
    />
  )
}
```

### Page Secteur avec Galerie

```tsx
// app/la-structure/[slug]/page.tsx
import { fetchSectorPage } from '@/lib/sanity/queries/sectors'
import { getSanityGalleryPhotos } from '@/lib/sanity/helpers/galleryProps'
import { Gallery } from '@/components/Gallery'

export default async function SectorPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const data = await fetchSectorPage(params.slug)
  
  // Transformer les images Sanity → React Photo Album
  const photos = getSanityGalleryPhotos(data.gallery)
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1>{data.title}</h1>
      
      {/* Galerie */}
      <section className="mt-8">
        <h2>Galerie Photos</h2>
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

## 🚀 Performance & Optimisation

### Lazy Loading (Futur)

```tsx
import { Suspense } from 'react'

export function LazyGallery({ photos }: { photos: Photo[] }) {
  return (
    <Suspense fallback={<GallerySkeleton />}>
      <Gallery photos={photos} />
    </Suspense>
  )
}

function GallerySkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="aspect-[4/3] bg-gray-200 rounded" />
        ))}
      </div>
    </div>
  )
}
```

### Preload Images Above the Fold

```tsx
// components/Gallery.tsx
export function Gallery({ photos }: GalleryProps) {
  return (
    <>
      {/* Preload première image pour LCP */}
      <link
        rel="preload"
        as="image"
        href={photos[0]?.src}
        imageSrcSet={photos[0]?.srcSet?.map(s => `${s.src} ${s.width}w`).join(', ')}
      />
      
      <RowsPhotoAlbum photos={photos} {...config} />
    </>
  )
}
```

---

## 📱 Responsive Design

### Breakpoints Adaptatifs

```tsx
// hooks/useGalleryConfig.ts
import { useMediaQuery } from '@/hooks/useMediaQuery'

export function useGalleryConfig() {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const isTablet = useMediaQuery('(max-width: 1024px)')
  
  if (isMobile) {
    return {
      targetRowHeight: 200,
      spacing: 4,
      columns: 2, // Pour columns layout
    }
  }
  
  if (isTablet) {
    return {
      targetRowHeight: 250,
      spacing: 6,
      columns: 3,
    }
  }
  
  return {
    targetRowHeight: 300,
    spacing: 8,
    columns: 4,
  }
}
```

---

## 🎨 Personnalisation CSS

### Styles de Base

```css
/* styles/gallery.css */

/* Variables globales */
:root {
  --gallery-spacing: 8px;
  --gallery-padding: 4px;
  --gallery-border-radius: 8px;
}

/* Container */
.react-photo-album {
  --photo-album-spacing: var(--gallery-spacing);
  --photo-album-padding: var(--gallery-padding);
}

/* Images */
.react-photo-album img {
  border-radius: var(--gallery-border-radius);
  transition: transform 0.2s ease;
}

.react-photo-album img:hover {
  transform: scale(1.02);
  cursor: pointer;
}

/* Responsive */
@media (max-width: 768px) {
  :root {
    --gallery-spacing: 4px;
    --gallery-padding: 2px;
  }
}
```

---

## 🔧 Configuration Avancée

### Multiple Layouts (Futur)

```tsx
'use client'

import { useState } from 'react'
import { 
  RowsPhotoAlbum, 
  ColumnsPhotoAlbum, 
  MasonryPhotoAlbum 
} from "react-photo-album"

type LayoutType = 'rows' | 'columns' | 'masonry'

export function GalleryAdvanced({ photos }: { photos: Photo[] }) {
  const [layout, setLayout] = useState<LayoutType>('rows')
  
  const renderGallery = () => {
    switch (layout) {
      case 'rows':
        return <RowsPhotoAlbum photos={photos} targetRowHeight={300} />
      case 'columns':
        return <ColumnsPhotoAlbum photos={photos} columns={3} />
      case 'masonry':
        return <MasonryPhotoAlbum photos={photos} columns={3} />
    }
  }
  
  return (
    <div>
      {/* Layout Switcher */}
      <div className="mb-4 flex gap-2">
        <button onClick={() => setLayout('rows')}>Lignes</button>
        <button onClick={() => setLayout('columns')}>Colonnes</button>
        <button onClick={() => setLayout('masonry')}>Masonry</button>
      </div>
      
      {renderGallery()}
    </div>
  )
}
```

---

## 📚 Prochaines Étapes (TODO)

### Phase 2 : Lightbox Integration

- [ ] Installer `yet-another-react-lightbox`
- [ ] Ajouter plugins (Zoom, Thumbnails, Captions)
- [ ] Intégrer avec React Photo Album
- [ ] Tests navigation clavier

### Phase 3 : Performance

- [ ] Lazy loading des images
- [ ] Intersection Observer pour load on scroll
- [ ] Preload images critiques
- [ ] Monitoring Lighthouse (LCP, CLS)

### Phase 4 : UX

- [ ] Loading skeleton
- [ ] Error boundaries
- [ ] Image fallback
- [ ] Loading states

### Phase 5 : Tests

- [ ] Tests composants Gallery
- [ ] Tests responsive
- [ ] Tests SSR/hydration
- [ ] Tests performance

---

## 📚 Ressources

### Documentation Officielle
- [React Photo Album](https://react-photo-album.com/)
- [Documentation](https://react-photo-album.com/documentation)
- [Examples](https://react-photo-album.com/examples)
- [Zero CLS SSR](https://react-photo-album.com/examples/zero-cls-ssr)
- [Next.js Integration](https://react-photo-album.com/examples/nextjs)
- [Server Components](https://react-photo-album.com/examples/server-component)

### GitHub
- [Repository](https://github.com/igordanchenko/react-photo-album)
- [Releases](https://github.com/igordanchenko/react-photo-album/releases)

---

## 🆘 Troubleshooting

### Layout Shift après Hydration

**Problème :** La galerie shift après hydration

**Solution :**
```tsx
<RowsPhotoAlbum
  photos={photos}
  defaultContainerWidth={1200} // Largeur fixe pour SSR
  sizes={{
    size: "1168px",
    sizes: [
      { viewport: "(max-width: 1200px)", size: "calc(100vw - 32px)" },
    ],
  }}
/>
```

### Images ne se chargent pas

**Vérifier :**
1. Dimensions (`width`, `height`) sont correctes
2. URL des images sont valides
3. CORS configuré pour Sanity CDN
4. `srcSet` a des URLs valides

### Performance Lente

**Optimisations :**
1. Limiter le nombre de photos par page
2. Utiliser des images optimisées (WebP)
3. Lazy loading
4. Preload images critiques
5. Compression Sanity CDN (quality: 85)

---

**Status :** 🟡 Documentation initiale - À compléter avec développement

**Dernière mise à jour :** Octobre 2024  
**Version :** React Photo Album v2 + Next.js 15

