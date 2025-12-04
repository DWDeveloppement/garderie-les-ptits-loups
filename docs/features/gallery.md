# Features - Galerie Photos

## 📊 Vue d'ensemble

Galerie photos responsive avec lightbox personnalisé, lazy loading et optimisation d'images Sanity.

**Stack** :
- `react-photo-album` v3.0.2 - Grid layouts avec algorithmes optimisés
- `yet-another-react-lightbox` v3.25.0 - Lightbox avec plugins
- Next/Image - Optimisation images
- Sanity Image Pipeline - WebP, LQIP, Blurhash

**Fichiers principaux** :
- `src/components/pages/sector/GallerySection.tsx` - Composant galerie
- `src/components/gallery/LightboxCustom.tsx` - Lightbox personnalisé
- `src/components/gallery/GalleryWithLightbox.tsx` - Wrapper
- `src/styles/lightbox-override.css` - Styles lightbox
- `sanity/helpers/imageProps.ts` - Optimisation images

---

## 🎯 Fonctionnalités

- ✅ **3 Layouts** : Masonry, Rows, Columns avec algorithmes optimisés
- ✅ **Lightbox Custom** : Navigation complète, icônes personnalisées, captions
- ✅ **Lazy Loading** : Chargement progressif avec Intersection Observer
- ✅ **LQIP/Blurhash** : Placeholders durant chargement
- ✅ **Optimisation** : WebP automatique, srcset responsive, preload intelligent
- ✅ **Accessibilité** : ARIA labels, navigation clavier, focus trap
- ✅ **Zero CLS** : SSR avec dimensions précises
- ✅ **Performance** : Préchargement 2 images avant/après, qualité optimale

---

## 🏗️ React Photo Album - Layouts & Algorithmes

### Pourquoi React Photo Album ?

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

### 1. Rows Layout (Lignes Optimales)

**Algorithme** : Knuth & Plass line-breaking + Dijkstra's shortest path

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

**Comment ça marche** :
1. Calcule le coût de chaque ligne (déviation au carré du targetRowHeight)
2. Utilise l'algorithme de Dijkstra pour trouver le chemin optimal
3. Produit des lignes équilibrées sans déformation excessive
4. Résout le problème des panoramas et des stragglers

**Avantages** :
- ✅ Lignes de hauteur similaire
- ✅ Photos pas étirées/shrinkées anormalement
- ✅ Résout le problème des panoramas
- ✅ Pas de photos isolées dans la dernière ligne

---

### 2. Columns Layout (Colonnes Optimales)

**Algorithme** : Dynamic programming pour shortest path de longueur N

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

**Avantages** :
- ✅ Colonnes fixes prédéfinies
- ✅ Répartition optimale des photos
- ✅ Colonnes de hauteur équilibrée

---

### 3. Masonry Layout (Style Pinterest)

**Algorithme** : Placement dans la colonne la plus courte

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

**Caractéristiques** :
- ✅ Style Pinterest
- ✅ Colonnes de largeur égale
- ⚠️ Hauteurs variées (pas flush au bottom)

---

## 📐 Configuration Actuelle du Projet

### Composant Principal : `GallerySection.tsx`

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

**Configuration** :
- Layout : Masonry (Pinterest-like)
- Colonnes responsive : 1 (mobile) → 2 (tablet) → 3 (desktop)
- Click handler : Ouvre le lightbox à l'index cliqué

---

## 🔦 Lightbox Personnalisé (Configuration Actuelle)

### Vue d'ensemble

**Version** : `yet-another-react-lightbox@3.25.0`
**Plugin actif** : Captions
**Styling** : CSS override (`lightbox-override.css`)
**Integration** : Next.js 15 + Sanity CMS + React Photo Album

---

### Features Implémentées

**Navigation complète** :
- ✅ Clavier : ← → (prev/next), Esc (close), Home/End
- ✅ Souris : Click sur boutons custom, click sur overlay
- ✅ Tactile : Swipe left/right, pull down to close
- ✅ Boutons custom avec Icon.tsx (chevronLeft, chevronRight, close)

**Plugins activés** :
- ✅ **Captions** : Labels en bas uniquement (toolbar masquée)

**Performance** :
- ✅ Preload intelligent (2 images avant/après)
- ✅ Images haute résolution (1920px, quality 90, WebP)
- ✅ Transitions fluides (fade 300ms, swipe 250ms)
- ✅ Tests réseau : 3G ~3s, 4G/5G < 1s

**UX & Design** :
- ✅ Close on backdrop click
- ✅ Pull down to close (mobile)
- ✅ Responsive (boutons ←/→ masqués < 768px)
- ✅ Accessible (ARIA labels, keyboard, focus trap)
- ✅ Styling cohérent avec BackToTop (purple-9/10, shadow)
- ✅ Toolbar transparente (pas de barre noire)
- ✅ Captions transparent avec texte purple-10

---

### Fichier : `LightboxCustom.tsx`

**Chemin** : `src/components/gallery/LightboxCustom.tsx`

```tsx
'use client';

import { Icon } from '@/components/icons'
import type { Photo } from 'react-photo-album'
import YetAnotherLightbox from 'yet-another-react-lightbox'
import Captions from 'yet-another-react-lightbox/plugins/captions'
import 'yet-another-react-lightbox/plugins/captions.css'
import 'yet-another-react-lightbox/styles.css'
import '@/styles/lightbox-override.css'

// Custom Icons avec Icon.tsx
function CustomIconPrev() {
  return <Icon name="chevronLeft" size="lg" className="text-white" />
}

function CustomIconNext() {
  return <Icon name="chevronRight" size="lg" className="text-white" />
}

function CustomIconClose() {
  return <Icon name="close" size="lg" className="text-white" />
}

export interface LightboxCustomProps {
  index: number;        // Index de l'image active
  photos: Photo[];      // Photos à afficher
  open: boolean;        // Ouvert/Fermé
  onClose: () => void;  // Callback à la fermeture
}

export function LightboxCustom({ index, photos, open, onClose }: LightboxCustomProps) {
  // Transformer les photos pour les captions
  const slides = photos.map(photo => {
    const customPhoto = photo as Photo & { srcHigh?: string; caption?: string };
    return {
      ...photo,
      src: customPhoto.srcHigh || photo.src,  // Image haute résolution
      description: customPhoto.caption || photo.title
    };
  });

  return (
    <YetAnotherLightbox
      open={open}
      index={index}
      slides={slides}
      close={onClose}
      plugins={[Captions]}
      toolbar={{ buttons: ["close"] }}
      render={{
        iconPrev: () => <CustomIconPrev />,
        iconNext: () => <CustomIconNext />,
        iconClose: () => <CustomIconClose />,
      }}
      animation={{ fade: 300, swipe: 250 }}
      controller={{
        closeOnBackdropClick: true,
        closeOnPullDown: true,
        closeOnPullUp: false
      }}
      carousel={{ finite: false, preload: 2 }}
      captions={{
        showToggle: false,
        descriptionTextAlign: 'center',
        descriptionMaxLines: 3,
      }}
    />
  )
}
```

**Transformation Photo → Slide** :
- `src` : Image haute résolution (1920px quality 90 WebP)
- `description` : Caption (de `caption` ou `title`)
- `srcHigh` : Champ custom pour image haute résolution lightbox

---

### Styling CSS Override

**Fichier** : `src/styles/lightbox-override.css`

**Approche** : CSS pur avec `!important` pour override les styles natifs YARL.

```css
/* Toolbar transparente (pas de barre noire) */
.yarl__toolbar {
  background: transparent !important;
  padding: 1.5rem !important;
}

/* Boutons alignés avec BackToTop */
.yarl__button {
  width: 3rem !important;              /* h-12 w-12 = 48px */
  height: 3rem !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  border-radius: 9999px !important;    /* rounded-full */
  background-color: var(--purple-9) !important;
  color: white !important;
  transition: all 0.15s ease !important;

  /* Shadow visible (shadow-xl/50 avec color purple-9) */
  box-shadow:
    0 20px 25px -5px color-mix(in srgb, var(--purple-9) 50%, transparent),
    0 8px 10px -6px color-mix(in srgb, var(--purple-9) 50%, transparent) !important;
  filter: none !important;
}

.yarl__button:hover {
  background-color: var(--purple-10) !important;
}

/* Icons taille alignée avec BackToTop */
.yarl__icon {
  width: 1.25rem !important;   /* h-5 w-5 = 20px */
  height: 1.25rem !important;
}

/* Position des boutons */
.yarl__navigation_prev { left: 2rem !important; }
.yarl__navigation_next { right: 2rem !important; }

/* Container fond beige */
.yarl__container {
  background-color: rgba(255, 253, 247, 0.9) !important;
}

/* Captions transparent avec texte purple */
.yarl__slide_description_container {
  background-color: transparent !important;
  padding: 1.5rem !important;
}

.yarl__slide_description {
  color: var(--purple-10) !important;
  font-size: 1.5rem;
  font-weight: 900 !important;
  text-align: center !important;
}

/* Masquer titre des captions */
.yarl__slide_title_container {
  display: none !important;
}

/* Responsive - Masquer boutons nav sur mobile */
@media (max-width: 768px) {
  .yarl__navigation_prev,
  .yarl__navigation_next {
    display: none !important;
  }
}
```

**Correspondance Tailwind → CSS pur** :
- `h-12 w-12` → `width: 3rem; height: 3rem`
- `rounded-full` → `border-radius: 9999px`
- `bg-purple-9` → `background-color: var(--purple-9)`
- `shadow-xl/50 shadow-(color:--purple-9)` → `box-shadow` avec `color-mix`
- `transition-all` → `transition: all 0.15s ease`

---

### Plugin Captions

**Configuration actuelle** :

```tsx
plugins={[Captions]}

captions={{
  showToggle: false,              // ✅ Pas de bouton CC (toolbar masquée)
  descriptionTextAlign: 'center', // ✅ Texte centré
  descriptionMaxLines: 3,         // ✅ Max 3 lignes
}}
```

**Résultat** :
- ✅ Description en bas uniquement
- ✅ Fond transparent (pas de barre noire)
- ✅ Texte purple-10 (cohérent avec le thème)
- ✅ Pas de bouton toggle CC
- ✅ Pas de titre en haut (toolbar masquée)

---

### Paramètres Lightbox

**Animation** :

```tsx
animation={{
  fade: 300,    // Durée fade in/out (ms)
  swipe: 250    // Durée swipe (ms)
}}
```

**Controller** :

```tsx
controller={{
  closeOnBackdropClick: true,  // Fermer au click sur overlay
  closeOnPullDown: true,       // Fermer au pull down (mobile)
  closeOnPullUp: false         // Désactivé
}}
```

**Carousel** :

```tsx
carousel={{
  finite: false,   // Infinite loop
  preload: 2,      // Précharger 2 images avant/après
}}
```

**Total : 5 images max en mémoire** (image courante + 2 avant + 2 après)

---

### Intégration avec Gallery

**Workflow** :

```
1. User click sur photo → Gallery (via CustomEvent)
2. GalleryWithLightbox écoute l'event → setLightboxIndex(index)
3. LightboxCustom s'ouvre avec l'index
4. User navigue (← →, swipe, clavier)
5. User ferme (Esc, click overlay, pull-down, bouton ✕)
6. onClose() → setLightboxIndex(-1)
```

**Code actuel** :

**Fichier** : `src/components/gallery/GalleryWithLightbox.tsx`

```tsx
'use client';

import { Gallery } from './Gallery'
import { LightboxCustom } from './LightboxCustom'
import { useState } from 'react'

export function GalleryWithLightbox({ photos, layout = 'rows', targetRowHeight = 280, className }) {
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  return (
    <>
      <Gallery
        photos={photos}
        layout={layout}
        targetRowHeight={targetRowHeight}
        onPhotoClick={setLightboxIndex}  // ← Ouvre le lightbox
        className={className}
      />

      <LightboxCustom
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        photos={photos}
        onClose={() => setLightboxIndex(-1)}  // ← Ferme le lightbox
      />
    </>
  );
}
```

---

### Plugins Disponibles (Optionnels)

| Plugin | Description | Usage potentiel |
|--------|-------------|-----------------|
| **Captions** | Affichage des descriptions | ✅ **ACTIF** |
| **Counter** | Compteur "1 / 10" | Indiquer position dans la galerie |
| **Zoom** | Pinch-to-zoom, scroll-to-zoom | Zoom sur détails des images |
| **Fullscreen** | Mode plein écran | Immersion maximale |
| **Thumbnails** | Miniatures de navigation | Navigation rapide |
| **Download** | Bouton téléchargement | Permettre téléchargement |
| **Slideshow** | Diaporama automatique | Présentation auto |
| **Video** | Support vidéo | Si ajout de vidéos |

**Installation (tous inclus dans YARL)** :

```tsx
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import 'yet-another-react-lightbox/plugins/zoom.css'

<LightboxCustom plugins={[Captions, Zoom]} />
```

---

## 🖼️ Optimisation Images Sanity

### Helper Principal

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

### Stratégie Multi-résolutions

```typescript
// galleryTransform.ts
const srcHigh = imageBuilder
  .image(image.asset)
  .width(1920)      // ← Haute résolution pour lightbox
  .quality(90)      // ← Qualité élevée
  .format('webp')
  .url()
```

**Stratégie actuelle** :
- **Gallery** : 800px, quality 85
- **Lightbox** : 1920px, quality 90

---

### Helper pour Transformation Sanity → React Photo Album

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

      // Image haute résolution pour lightbox
      srcHigh: urlFor(asset).width(1920).quality(90).url(),
    }
  })
}
```

---

### Query GROQ pour Gallery

```typescript
// sanity/queries/sectors.ts
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

---

## 🎨 Intégration Radix UI (Optionnelle)

### AspectRatio pour Images Consistantes

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

**Avantages AspectRatio** :
- ✅ Ratio préservé même si image non chargée
- ✅ Zero CLS garanti
- ✅ Compatible avec Next/Image fill

---

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

---

### HoverCard pour Métadonnées Images

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

---

### ScrollArea pour Thumbnails

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

---

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

---

## 🚀 Performance & Optimisation

### Zero CLS & SSR

React Photo Album utilise **CSS flexbox** et **CSS calc()** pour calculer les dimensions côté client, permettant un markup **pixel-perfect** avant hydration.

**Configuration SSR** :

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

**Sans defaultContainerWidth** :
- ❌ Markup vide côté serveur
- ❌ Render seulement après hydration
- ❌ Layout shift visible

**Avec defaultContainerWidth** :
- ✅ Markup complet côté serveur
- ✅ Rendu immédiat avant hydration
- ⚠️ Léger shift si largeur réelle ≠ defaultContainerWidth

---

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

### Preload Première Image (LCP)

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

---

### Temps de Chargement Réseau

**Tests réels** :
- 🚀 **4G/5G** : < 1s (instantané)
- 📶 **3G** : ~3s (acceptable)
- ✅ **LQIP** : Blur placeholder natif (Sanity)
- ✅ **WebP** : -30% vs JPEG

**Optimisations actives** :
- Format WebP moderne
- LQIP (Low Quality Image Placeholder) via Sanity
- Preload intelligent (2 images avant/après dans lightbox)
- Qualité 90% pour lightbox, 85% pour galerie (balance qualité/poids)

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

### Navigation Clavier (Lightbox)

| Touche | Action |
|--------|--------|
| `←` | Image précédente |
| `→` | Image suivante |
| `Esc` | Fermer |
| `Home` | Première image |
| `End` | Dernière image |
| `Tab` | Navigation entre boutons |

---

### ARIA Labels Automatiques (Lightbox)

Le lightbox gère automatiquement :
- `role="dialog"`
- `aria-label` sur les boutons
- `aria-hidden` sur l'overlay
- Focus trap dans le lightbox

---

### Focus Management

```tsx
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
```

---

## 📱 Support Mobile

### Gestures Natifs Actifs

| Gesture | Status | Configuration |
|---------|--------|---------------|
| **Swipe left/right** | ✅ Actif | `animation.swipe: 250ms` |
| **Pull down** | ✅ Actif | `closeOnPullDown: true` |
| **Pull up** | ❌ Désactivé | `closeOnPullUp: false` |
| **Click backdrop** | ✅ Actif | `closeOnBackdropClick: true` |
| **Pinch to zoom** | 💡 Plugin Zoom | Non activé (optionnel) |

---

### Responsive Design

```css
/* lightbox-override.css */
@media (max-width: 768px) {
  /* Masquer boutons ←/→ sur mobile (swipe uniquement) */
  .yarl__navigation_prev,
  .yarl__navigation_next {
    display: none !important;
  }
}
```

**UX mobile optimisée** :
- ✅ Swipe natif performant (pas de boutons qui gênent)
- ✅ Pull-down to close (gesture naturel)
- ✅ Bouton ✕ visible en haut à droite
- ✅ Captions lisibles (1.5rem, bold)

---

## 📊 Exemple Complet Production-Ready

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

## ✅ Performance Checklist

### Avant Déploiement

```bash
✅ Images
  ✓ Dimensions width/height fournies (Zero CLS)
  ✓ LQIP généré (blurhash ou lqip)
  ✓ Srcset avec 3-4 breakpoints
  ✓ Format WebP via Sanity CDN
  ✓ Quality 85% pour galeries, 90% pour lightbox

✅ React Photo Album
  ✓ defaultContainerWidth configuré (SSR)
  ✓ sizes configurées (responsive)
  ✓ Layout approprié (Masonry pour nous)
  ✓ spacing approprié (8px desktop, 4px mobile)

✅ Lightbox
  ✓ Plugins nécessaires uniquement (Captions)
  ✓ CSS importés (styles.css + override.css)
  ✓ Index state géré correctement
  ✓ Slides avec dimensions
  ✓ Préchargement 2 images avant/après

✅ Performance
  ✓ Lazy loading automatique
  ✓ Preload première image (LCP)
  ✓ Bundle size vérifié (~40KB total)
  ✓ Lighthouse score > 90
```

---

## ✅ Résumé Configuration Actuelle

### Architecture Finale

```
src/components/gallery/
├── Gallery.tsx              ← Grid (react-photo-album)
├── LightboxCustom.tsx       ← Lightbox (YARL + custom CSS)
└── GalleryWithLightbox.tsx  ← Wrapper (state management)

src/components/pages/sector/
└── GallerySection.tsx       ← Intégration dans pages secteur

src/styles/
└── lightbox-override.css    ← CSS override pour YARL

sanity/helpers/
└── imageProps.ts            ← Optimisation images

Styling:
- Boutons alignés avec BackToTop (48x48px, purple-9/10, shadow)
- Captions purple-10, fond transparent
- Toolbar transparente (pas de barre noire)
- Responsive (< 768px: swipe only)
```

---

### Features Production Ready

| Feature | Status | Détails |
|---------|--------|---------|
| **Layout** | ✅ Masonry | 1 (mobile) → 2 (tablet) → 3 (desktop) colonnes |
| **Background** | ✅ Fond beige | `rgba(255, 253, 247, 0.9)` |
| **Navigation** | ✅ Complète | Clavier + Souris + Tactile |
| **Boutons** | ✅ Custom | Icon.tsx, style purple, shadow visible |
| **Captions** | ✅ Natifs | En bas, texte purple-10, transparent |
| **Toolbar** | ✅ Masquée | Background transparent, pas de titre |
| **Responsive** | ✅ Mobile-first | Boutons masqués < 768px, swipe + pull-down |
| **Accessibilité** | ✅ Native | ARIA labels, keyboard, focus trap |
| **Performance** | ✅ Optimisée | WebP, LQIP, preload, 3G ~3s |

---

### Configuration Recommandée

**Pour notre projet** :
- ✅ **Layout** : Masonry (meilleur pour photos variées)
- ✅ **Colonnes** : 1 (mobile) → 2 (tablet) → 3 (desktop)
- ✅ **Spacing** : 8px (desktop), 4px (mobile)
- ✅ **SSR** : defaultContainerWidth={1200}
- ✅ **Images** : Next/Image avec LQIP de Sanity
- ✅ **Lightbox** : Plugin Captions + icônes custom

**Bundle estimé** :
- react-photo-album : ~15KB
- yet-another-react-lightbox : ~10KB (base + Captions)
- Total : ~25KB (acceptable)

**Performance attendue** :
- LCP : <2.5s (première image avec priority)
- CLS : 0 (dimensions + LQIP)
- Bundle : +25KB sur pages secteurs uniquement

---

## 📚 Ressources

### Documentation Officielle

**React Photo Album** :
- [Site officiel](https://react-photo-album.com/)
- [Documentation](https://react-photo-album.com/documentation)
- [Examples](https://react-photo-album.com/examples)
- [Next.js Integration](https://react-photo-album.com/examples/nextjs)
- [Zero CLS SSR](https://react-photo-album.com/examples/zero-cls-ssr)
- [Lightbox Integration](https://react-photo-album.com/examples/lightbox)

**Yet Another React Lightbox** :
- [Documentation principale](https://yet-another-react-lightbox.com/documentation)
- [Plugin Captions](https://yet-another-react-lightbox.com/plugins/captions)
- [Playground interactif](https://yet-another-react-lightbox.com/examples/playground)
- [Examples](https://yet-another-react-lightbox.com/examples)

**Sanity** :
- [Sanity Image URLs](https://www.sanity.io/docs/image-urls)
- [Image Pipeline](https://www.sanity.io/docs/image-pipeline)

**GitHub** :
- [react-photo-album](https://github.com/igordanchenko/react-photo-album)
- [yet-another-react-lightbox](https://github.com/igordanchenko/yet-another-react-lightbox)

---

**Status** : ✅ Production Ready
**Dernière mise à jour** : 2025-12-03
**Version** : 2.0.0

**Maintenu par** : Ricardo Do Vale
**Contact** : contact@garderielesptitsloups.ch
