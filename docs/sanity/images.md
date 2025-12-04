# 🖼️ Système de Gestion des Images Sanity

## 📋 Vue d'Ensemble

Système complet de gestion des images optimisées pour performance, SEO et accessibilité. Architecture centralisée avec génération automatique des variantes selon le contexte d'usage.

---

## 🏗️ Architecture du Système

### 1. Composant de Base : `basicImage`

```typescript
// sanity/schemas/components/basicImage.ts
export const basicImage = {
  name: 'basicImage',
  title: 'Image',
  type: 'image',
  options: {
    hotspot: true,
    metadata: ['blurhash', 'lqip', 'palette'],
  },
  fields: [
    // Alt text - OBLIGATOIRE pour SEO/accessibilité
    {
      name: 'alt',
      title: 'Texte alternatif',
      type: 'string',
      validation: (Rule) => Rule.required().max(125),
      description: "Description de l'image pour SEO et accessibilité",
    },
    
    // Options avancées - Collapsible
    {
      name: 'enableOptions',
      title: 'Afficher les options avancées',
      type: 'boolean',
      initialValue: false,
    },
    
    // Crédit (caché par défaut)
    {
      name: 'credit',
      title: 'Crédit',
      type: 'string',
      initialValue: "Garderie Les P'tits Loups",
      hidden: ({ parent }) => !parent?.enableOptions,
    },
    
    // Infobulle personnalisée (cachée par défaut)
    {
      name: 'enableCustomTooltip',
      title: 'Activer une infobulle au survol',
      type: 'boolean',
      initialValue: false,
      hidden: ({ parent }) => !parent?.enableOptions,
    },
    
    {
      name: 'tooltipText',
      title: "Texte de l'infobulle",
      type: 'string',
      hidden: ({ parent }) => !parent?.enableOptions || !parent?.enableCustomTooltip,
      description: 'Si vide, le texte alternatif sera utilisé',
    },
  ],
}
```

### 2. Composants Spécialisés

#### Hero Image
```typescript
// sanity/schemas/components/heroImage.ts
export const heroImage = {
  name: 'heroImage',
  title: 'Hero',
  type: 'object',
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'basicImage',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    },
  ],
}
```

#### Gallery Image
```typescript
// sanity/schemas/components/galleryImage.ts
export const galleryImage = {
  name: 'galleryImage',
  title: 'Image de galerie',
  type: 'object',
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'basicImage',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'label',
      title: 'Label',
      type: 'string',
    },
  ],
}
```

---

## 📏 Standards de Qualité par Usage

### Dimensions Recommandées

| Usage | Dimensions | Qualité | Format | Description |
|-------|------------|---------|--------|-------------|
| **Hero** | 1920x1080 | 90% | WebP | Bannières principales |
| **Gallery** | 1200x800 | 85% | WebP | Galeries d'images |
| **Section** | 960x640 | 80% | WebP | Images de sections |
| **Thumbnail** | 400x300 | 75% | WebP | Miniatures |
| **Article** | 800x600 | 80% | WebP | Images d'articles |
| **OG/Twitter** | 1200x630 | 90% | WebP | Partage social |

### Breakpoints Responsive (alignés Tailwind CSS)

```typescript
const RESPONSIVE_BREAKPOINTS = {
  xs: { width: 320, height: 240 },    // Mobile portrait
  sm: { width: 640, height: 480 },    // Mobile landscape
  md: { width: 768, height: 576 },    // Tablettes
  lg: { width: 1024, height: 768 },   // Desktop
  xl: { width: 1280, height: 960 },   // Large desktop
  '2xl': { width: 1536, height: 1152 }, // Extra large
}
```

---

## ⚡ Optimisation & Performance

### Helpers Next.js Image

```typescript
// lib/sanity/helpers/imageProps.ts
export type NextImageProps = {
  src: string
  alt: string
  width: number
  height: number
  title?: string
  credit?: string
  blurDataURL?: string
  placeholder?: 'blur' | 'empty'
}

// Conversion basicImage → Next.js Image props
export function getBasicImageProps(image: SanityBasicImage): NextImageProps {
  const { asset, alt, credit, enableCustomTooltip, tooltipText } = image
  
  return {
    src: asset.url,
    alt: alt,
    width: asset.metadata.dimensions.width,
    height: asset.metadata.dimensions.height,
    title: enableCustomTooltip ? tooltipText?.trim() || alt : undefined,
    credit: credit || "Garderie Les P'tits Loups",
    blurDataURL: asset.metadata?.lqip,
    placeholder: asset.metadata?.lqip ? 'blur' : 'empty',
  }
}

// Props optimisées pour Hero (above the fold)
export function getHeroImagePropsOptimized(image: SanityBasicImage) {
  return {
    ...getBasicImageProps(image),
    priority: true,        // Preload
    quality: 90,          // Haute qualité
    sizes: '100vw',       // Full width
    loading: 'eager',     // Chargement immédiat
  }
}

// Props optimisées pour Gallery (below the fold)
export function getGalleryImagePropsOptimized(item: SanityGalleryImage) {
  return {
    ...getBasicImageProps(item.image),
    label: item.label,
    priority: false,      // Pas de preload
    loading: 'lazy',      // Lazy loading
    quality: 85,          // Qualité optimisée
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  }
}

// Props pour SEO (Open Graph + Twitter)
export function getSeoShareImageProps(image: SanityBasicImage) {
  const baseProps = getBasicImageProps(image)
  return {
    openGraph: {
      ...baseProps,
      width: 1200,
      height: 630, // Format recommandé OG
    },
    twitter: {
      ...baseProps,
      width: 1200,
      height: 630, // Format summary_large_image
    },
  }
}
```

### Query Fragments GROQ

```typescript
// Métadonnées image complètes (LQIP pour Zero CLS)
export const IMAGE_QUERY_FRAGMENT = `
  asset->{
    _id,
    url,
    metadata{
      dimensions{
        width,
        height,
        aspectRatio
      },
      lqip,
      blurhash
    }
  }
`

// BasicImage complète
export const BASIC_IMAGE_QUERY = `{
  ${IMAGE_QUERY_FRAGMENT},
  alt,
  enableOptions,
  credit,
  enableCustomTooltip,
  tooltipText
}`

// Hero Image complète
export const HERO_IMAGE_QUERY = `{
  image${BASIC_IMAGE_QUERY},
  description
}`

// Gallery Image complète
export const GALLERY_IMAGE_QUERY = `{
  image${BASIC_IMAGE_QUERY},
  label
}`
```

---

## 🛡️ Protection & Validation

### Protection contre Suppression

Les images référencées dans des documents ne peuvent pas être supprimées.

```typescript
// Vérification automatique des références
const canDeleteMedia = async (mediaId: string) => {
  const references = await client.fetch(`
    *[references($id)] {
      _type,
      _id,
      title
    }
  `, { id: mediaId })
  
  if (references.length > 0) {
    throw new Error(
      `Impossible de supprimer : utilisé dans ${references.length} document(s)`
    )
  }
  
  return true
}
```

### Validations Obligatoires

```typescript
// Alt text obligatoire (SEO + Accessibilité)
validation: (Rule) => Rule.required()
  .max(125)
  .error('Le texte alternatif est obligatoire pour l\'accessibilité')

// Image obligatoire
validation: (Rule) => Rule.required()
  .error('L\'image est obligatoire')
```

---

## 💾 Stratégies de Cache

### 1. Cache Sanity CDN
```typescript
// Images servies via cdn.sanity.io
const imageUrl = urlFor(image)
  .width(1200)
  .height(630)
  .quality(90)
  .format('webp')
  .url()
// → https://cdn.sanity.io/images/[project]/[dataset]/[asset]?w=1200&h=630&q=90&fm=webp
```

### 2. Cache Next.js
```typescript
// Cache automatique avec Next.js Image component
<Image
  src={imageUrl}
  alt={alt}
  width={width}
  height={height}
  {...imageProps}
/>
// → Cache automatique dans .next/cache/images/
```

### 3. Preconnect CDN (gain ~150ms)
```typescript
// app/layout.tsx
<head>
  <link rel="preconnect" href="https://cdn.sanity.io" />
  <link rel="dns-prefetch" href="https://cdn.sanity.io" />
</head>
```

### 4. LQIP pour Zero CLS
```typescript
// Utilisation du LQIP (Low Quality Image Placeholder)
<Image
  src={imageUrl}
  alt={alt}
  blurDataURL={asset.metadata.lqip}
  placeholder="blur"
  // → Zero CLS, affichage progressif
/>
```

---

## 🧹 Maintenance & Nettoyage

### Script de Nettoyage des Médias Non Utilisés

```bash
# Voir les médias non utilisés (dry-run)
npm run cleanup:media

# Supprimer (avec confirmation)
npm run cleanup:media -- --delete

# Vérifier les images sans alt text
npm run cleanup:media -- --alt
```

### Script de Cleanup

```javascript
// scripts/clean/cleanup-unused-media.mjs
import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

// Trouver les images non utilisées
const unusedImages = await client.fetch(`
  *[_type == "sanity.imageAsset"] {
    _id,
    url,
    "references": count(*[references(^._id)])
  }[references == 0]
`)

console.log(`${unusedImages.length} images non utilisées`)

// Supprimer si --delete
if (process.argv.includes('--delete')) {
  for (const image of unusedImages) {
    await client.delete(image._id)
    console.log(`✅ Supprimé: ${image.url}`)
  }
}
```

### Vérification des Alt Texts

```groq
// Vision Tool - Images sans alt text
*[_type in ["home", "aboutPage", "contactPage", "schedulePage", "sectorPage"]] {
  _type,
  _id,
  title,
  "missingAlt": select(
    defined(sectionHero.image.alt) => false,
    true
  )
}[missingAlt == true]
```

---

## 🎨 Custom Input pour Galeries

### GalleryInput Component

Composant personnalisé pour afficher les galeries en grille dans le Studio.

```typescript
// sanity/components/GalleryInput.tsx
import { useEffect } from 'react'
import { ArrayOfObjectsInputProps } from 'sanity'

export function GalleryInput(props: ArrayOfObjectsInputProps) {
  useEffect(() => {
    // Injecter CSS pour layout 1500px
    const style = document.createElement('style')
    style.textContent = `
      /* Container global à 1500px */
      [data-ui="Container"] {
        max-width: 1500px !important;
      }
      
      /* Autres champs restent à 40rem */
      [data-ui="Stack"]:not([data-comments-field-id="gallery"]) {
        max-width: 40rem !important;
        margin: 0 auto !important;
      }
      
      /* Galerie en grille responsive */
      [data-ui="Stack"][data-comments-field-id="gallery"] [data-ui="Grid"] {
        grid-template-columns: repeat(4, 1fr);
        gap: 1rem;
      }
      
      @media (max-width: 1280px) {
        [data-ui="Stack"][data-comments-field-id="gallery"] [data-ui="Grid"] {
          grid-template-columns: repeat(3, 1fr);
        }
      }
      
      @media (max-width: 768px) {
        [data-ui="Stack"][data-comments-field-id="gallery"] [data-ui="Grid"] {
          grid-template-columns: repeat(2, 1fr);
        }
      }
    `
    document.head.appendChild(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [])
  
  return props.renderDefault(props)
}
```

### Utilisation dans un Schéma

```typescript
// sanity/schemas/pages/sectorPage.ts
import { GalleryInput } from '../../components/GalleryInput'

export const sectorPage = {
  fields: [
    {
      name: 'gallery',
      title: 'Galerie',
      type: 'array',
      of: [{ type: 'galleryImage' }],
      options: {
        layout: 'grid', // Grille au lieu de liste
      },
      components: {
        input: GalleryInput, // Layout personnalisé
      },
    },
  ],
}
```

---

## 📊 Métriques & Monitoring

### KPIs à Suivre

- **Taux d'images avec alt text** : >95%
- **Taille moyenne par usage** : <500KB
- **Temps de chargement LCP** : <2.5s
- **CLS (Cumulative Layout Shift)** : 0 (grâce à LQIP)
- **Images non utilisées** : <10%

### Dashboard Studio (Futur)

```typescript
// Statistiques à afficher dans le Studio
const imageStats = {
  total: count(*[_type == "sanity.imageAsset"]),
  withAlt: count(*[_type == "sanity.imageAsset" && defined(metadata.alt)]),
  unused: count(*[_type == "sanity.imageAsset" && count(*[references(^._id)]) == 0]),
  byUsage: {
    hero: count(*[_type in ["home", "aboutPage"] && defined(sectionHero.image)]),
    gallery: count(*[_type == "sectorPage" && count(gallery) > 0]),
    // ...
  }
}
```

---

## 📚 Bonnes Pratiques

### Upload
- ✅ **Formats recommandés** : WebP, AVIF, JPEG
- ✅ **Taille maximale** : 5MB par image
- ✅ **Dimensions minimales** : 1200px de large
- ✅ **Compression** : Qualité 80-90% selon usage

### Organisation
- ✅ **Alt text systématique** : Obligatoire pour toutes les images
- ✅ **Crédit par défaut** : "Garderie Les P'tits Loups"
- ✅ **Infobulle optionnelle** : Uniquement si contexte spécifique
- ✅ **LQIP activé** : Pour Zero CLS

### Performance
- ✅ **Priority pour Hero** : Images above the fold
- ✅ **Lazy loading pour Gallery** : Images below the fold
- ✅ **Srcset responsive** : Breakpoints Tailwind
- ✅ **Cache agressif** : CDN + Next.js
- ✅ **Preconnect CDN** : Réduction DNS lookup

### SEO
- ✅ **Alt text descriptif** : <125 caractères
- ✅ **Dimensions OG** : 1200x630px
- ✅ **Format WebP** : Supporté partout
- ✅ **Qualité optimale** : 90% pour partages sociaux

---

## 🚀 Workflow Recommandé

### 1. Upload & Configuration
1. Uploader l'image dans Sanity
2. Remplir le **alt text obligatoire**
3. Activer "Options avancées" si besoin
4. Ajuster crédit/infobulle si nécessaire

### 2. Utilisation dans les Pages
1. Référencer l'image depuis le schéma
2. L'image hérite automatiquement du alt text
3. Le système génère les variantes optimisées
4. LQIP et dimensions injectés automatiquement

### 3. Validation
1. Vérifier le alt text (obligatoire)
2. Tester l'affichage sur différents écrans
3. Vérifier le LCP/CLS dans Lighthouse
4. Publier

---

## 🔧 Migration & Scripts

### Convertir des Images Existantes

```javascript
// Script de migration (exemple)
const images = await client.fetch('*[_type == "sanity.imageAsset"]')

for (const image of images) {
  if (!image.metadata?.alt) {
    await client
      .patch(image._id)
      .set({ 'metadata.alt': 'À compléter' })
      .commit()
  }
}
```

### Optimisation en Lot

```bash
# Générer les LQIP manquants
npx sanity documents query '*[_type == "sanity.imageAsset" && !defined(metadata.lqip)]' | \
  xargs -I {} npx sanity exec generate-lqip.js --id {}
```

---

## 📚 Ressources

- [Sanity Image API](https://www.sanity.io/docs/image-api)
- [Next.js Image Component](https://nextjs.org/docs/api-reference/next/image)
- [WebP Format](https://developers.google.com/speed/webp)
- [LQIP Technique](https://css-tricks.com/the-complete-guide-to-lazy-loading-images/)
- [Cumulative Layout Shift](https://web.dev/cls/)

---

**Dernière mise à jour :** Octobre 2024  
**Version :** Sanity v4.6.1 + Next.js Image + TypeScript

