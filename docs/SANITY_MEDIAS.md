# 📁 Guide des Médias Sanity - Garderie Les P'tits Loups

## 🎯 Vue d'ensemble

Ce document définit la stratégie complète de gestion des médias dans Sanity CMS pour la garderie Les P'tits Loups, incluant l'architecture, les standards de qualité, et les bonnes pratiques.

## 🏗️ Architecture du système

### 1. Médiathèque centralisée
- **Source de vérité** pour tous les médias
- **Gestion centralisée** des métadonnées (alt, crédit, tags)
- **Protection contre suppression** si image utilisée
- **Système de références** vers les pages

### 2. Champs image optimisés
- **Référence** vers la médiathèque
- **Override contextuel** des champs (alt, légende)
- **Usage spécifique** (hero, galerie, section, etc.)
- **Génération automatique** des variantes

## 📏 Standards de qualité par usage

### Hero (Bannières principales)
```typescript
{
  width: 1200,
  height: 630,
  quality: 90,
  format: 'webp',
  description: 'Images hero pour pages principales'
}
```

### Galerie
```typescript
{
  width: 800,
  height: 600,
  quality: 85,
  format: 'webp',
  description: 'Images pour galeries et carrousels'
}
```

### Section (Contenu)
```typescript
{
  width: 600,
  height: 400,
  quality: 80,
  format: 'webp',
  description: 'Images pour sections de contenu'
}
```

### Thumbnail (Miniatures)
```typescript
{
  width: 300,
  height: 200,
  quality: 75,
  format: 'webp',
  description: 'Miniatures et aperçus'
}
```

### Article/Blog
```typescript
{
  width: 800,
  height: 500,
  quality: 80,
  format: 'webp',
  description: 'Images pour articles et actualités'
}
```

## 🗂️ Structure de la médiathèque

### Champs obligatoires
- **Titre** : Nom descriptif du média
- **Asset** : Fichier média (image, vidéo, document)
- **Alt text** : Description pour accessibilité (obligatoire pour images)
- **Catégorie** : Classification du média
- **Tags** : Mots-clés pour recherche
- **Crédit** : Photographe ou source

### Champs optionnels
- **Description** : Description détaillée
- **Légende** : Légende optionnelle
- **Usage** : Pages d'utilisation
- **Public** : Visibilité publique
- **Date d'upload** : Timestamp automatique

## 🎨 Catégories de médias

### Images
- **Hero** : Bannières principales
- **Galerie** : Images de galerie
- **Équipe** : Photos du personnel
- **Espaces** : Photos des locaux
- **Activités** : Photos d'activités
- **Autres** : Images diverses

### Vidéos
- **Présentation** : Vidéos de présentation
- **Activités** : Vidéos d'activités
- **Tutoriels** : Vidéos explicatives

### Documents
- **PDF** : Documents officiels
- **Formulaires** : Formulaires à télécharger
- **Règlements** : Règlements intérieurs

## 🔄 Système de références

### Principe
- **Médiathèque** = Source de vérité
- **Pages** = Références vers médiathèque
- **Override contextuel** des champs selon usage
- **Protection** contre suppression si utilisée

### Workflow
1. **Upload** dans la médiathèque
2. **Remplir** métadonnées centrales
3. **Référencer** depuis les pages
4. **Ajouter** contexte spécifique (usage, légende)
5. **Override** alt text si nécessaire

## 🚀 Génération automatique des variantes

### Principe
- **Une seule image** originale dans la médiathèque
- **Génération à la demande** selon l'usage
- **Cache intelligent** pour éviter les régénérations
- **Optimisation** automatique (format, qualité, dimensions)

### Implémentation
```typescript
// Génération automatique selon l'usage
const getOptimizedImage = (image: SanityImage, usage: string) => {
  const configs = {
    hero: { width: 1200, height: 630, quality: 90 },
    gallery: { width: 800, height: 600, quality: 85 },
    section: { width: 600, height: 400, quality: 80 },
    thumbnail: { width: 300, height: 200, quality: 75 },
    article: { width: 800, height: 500, quality: 80 }
  }
  
  const config = configs[usage] || configs.section
  
  return urlFor(image)
    .width(config.width)
    .height(config.height)
    .quality(config.quality)
    .format('webp')
    .url()
}
```

### Breakpoints responsive alignés avec Tailwind CSS
```typescript
// Breakpoints alignés avec src/types/breakpoints.ts
const RESPONSIVE_BREAKPOINTS = {
  xs: { width: 320, height: 240 },    // Extra small (portrait phones)
  sm: { width: 640, height: 480 },    // Small (landscape phones)
  md: { width: 768, height: 576 },    // Medium (tablets)
  lg: { width: 1024, height: 768 },   // Large (desktops)
  xl: { width: 1280, height: 960 },  // Extra large (large desktops)
  '2xl': { width: 1536, height: 1152 }, // 2X large (larger desktops)
}
```

## 💾 Stratégies de cache

### 1. Cache Sanity (Recommandé)
```typescript
// Cache côté Sanity avec TTL
const cachedImage = await sanityClient.fetch(`
  *[_type == "media" && _id == $id][0] {
    asset,
    "optimizedUrl": asset.asset->url + "?w=" + $width + "&h=" + $height + "&q=" + $quality
  }
`, { id, width, height, quality })
```

### 2. Cache Next.js
```typescript
// Cache côté Next.js avec revalidation
export async function getStaticProps() {
  const images = await getMediaImages()
  
  return {
    props: { images },
    revalidate: 3600 // 1 heure
  }
}
```

### 3. Cache CDN
```typescript
// Cache CDN avec headers
const imageUrl = urlFor(image)
  .width(width)
  .height(height)
  .quality(quality)
  .url()

// Headers pour cache CDN
res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
```

### 4. Cache hybride (Optimal)
```typescript
// Combinaison des trois approches
const getCachedImage = async (imageId: string, usage: string) => {
  // 1. Vérifier cache local
  const cached = await getLocalCache(imageId, usage)
  if (cached) return cached
  
  // 2. Générer depuis Sanity
  const image = await getSanityImage(imageId)
  const optimized = getOptimizedImage(image, usage)
  
  // 3. Mettre en cache
  await setLocalCache(imageId, usage, optimized)
  
  return optimized
}
```

### 5. Cache avec Redis (Production)
```typescript
// Cache Redis pour les variantes générées
const getCachedVariant = async (imageId: string, usage: string) => {
  const cacheKey = `image:${imageId}:${usage}`
  
  // Vérifier Redis
  const cached = await redis.get(cacheKey)
  if (cached) return JSON.parse(cached)
  
  // Générer et mettre en cache
  const variant = await generateImageVariant(imageId, usage)
  await redis.setex(cacheKey, 3600, JSON.stringify(variant))
  
  return variant
}
```

### 6. Cache avec Service Worker
```typescript
// Service Worker pour cache côté client
self.addEventListener('fetch', event => {
  if (event.request.url.includes('/api/images/')) {
    event.respondWith(
      caches.match(event.request).then(response => {
        if (response) return response
        
        return fetch(event.request).then(fetchResponse => {
          const responseClone = fetchResponse.clone()
          caches.open('images-v1').then(cache => {
            cache.put(event.request, responseClone)
          })
          return fetchResponse
        })
      })
    )
  }
})
```

## 🛡️ Protection et validation

### Protection contre suppression
```typescript
// Validation avant suppression
const canDeleteMedia = async (mediaId: string) => {
  const references = await sanityClient.fetch(`
    *[references($id)] {
      _type,
      _id,
      title
    }
  `, { id: mediaId })
  
  if (references.length > 0) {
    throw new Error(`Impossible de supprimer : utilisé dans ${references.length} document(s)`)
  }
  
  return true
}
```

### Validation des champs
```typescript
// Validation alt text obligatoire
const validateAltText = (Rule: Rule) => 
  Rule.required().custom((value: string, context: any) => {
    if (!value || value.trim().length === 0) {
      return 'Le texte alternatif est obligatoire pour l\'accessibilité'
    }
    if (value.length > 125) {
      return 'Le texte alternatif ne doit pas dépasser 125 caractères'
    }
    return true
  })
```

## 📊 Métriques et monitoring

### KPIs à suivre
- **Taille moyenne** des images par usage
- **Temps de chargement** des variantes
- **Taux d'utilisation** des images
- **Erreurs** de génération de variantes

### Alertes
- **Images sans alt text**
- **Images non utilisées** (> 30 jours)
- **Images trop lourdes** (> 500KB)
- **Erreurs de génération** de variantes

## 🔧 Maintenance

### Tâches régulières
- **Nettoyage** des images non utilisées
- **Optimisation** des images lourdes
- **Vérification** des alt texts
- **Mise à jour** des métadonnées

### Scripts utiles
- **Migration** WordPress → Sanity
- **Optimisation** en lot des images
- **Génération** de variantes manquantes
- **Rapport** d'utilisation des médias

## 🧩 Utilisation des composants

### Composants disponibles
```typescript
import { 
  OptimizedImage, 
  HeroImage, 
  GalleryImage, 
  ThumbnailImage, 
  ArticleImage, 
  SectionImage 
} from '@/components/ui/OptimizedImage'

// Utilise Radix UI AspectRatio pour la gestion des ratios d'aspect
// Migration vers Shadcn UI AspectRatio prévue plus tard
```

### Exemples d'utilisation
```typescript
// Image hero avec preload
<HeroImage 
  image={heroImage} 
  alt="Façade de la garderie"
  caption="Bienvenue dans notre univers"
  credit="Photo Studio ABC"
/>

// Image de galerie avec lazy loading
<GalleryImage 
  image={galleryImage} 
  alt="Salle de jeux colorée"
  caption="Espace dédié aux 2-3 ans"
/>

// Miniature
<ThumbnailImage 
  image={thumbnailImage} 
  alt="Aperçu de l'activité"
/>

// Image d'article
<ArticleImage 
  image={articleImage} 
  alt="Nouvelle activité"
  caption="Découvrez notre nouvelle activité"
  credit="Équipe pédagogique"
/>
```

### Personnalisation
```typescript
// Options personnalisées
<OptimizedImage 
  image={image} 
  usage="hero"
  alt="Image personnalisée"
  className="custom-hero-image"
  showCaption={true}
  showCredit={true}
/>
```

### Architecture technique
```typescript
// Utilise Radix UI AspectRatio pour la gestion des ratios
import * as AspectRatio from '@radix-ui/react-aspect-ratio'

// Structure du composant
<AspectRatio.Root ratio={imageProps.aspectRatio}>
  <Image {...imageProps} fill />
</AspectRatio.Root>

// Migration prévue vers Shadcn UI AspectRatio
// - Meilleure intégration avec le design system
// - Styles cohérents avec les autres composants
// - Maintenance simplifiée
```

## 📚 Bonnes pratiques

### Upload
- **Formats recommandés** : WebP, AVIF, JPEG, PNG
- **Taille maximale** : 5MB par image
- **Dimensions** : Minimum 1200px de large
- **Compression** : Qualité 80-90% selon usage

### Organisation
- **Nommage** : descriptif et cohérent
- **Tags** : maximum 5 par image
- **Catégorisation** : une seule catégorie principale
- **Crédits** : toujours renseignés

### Performance
- **Lazy loading** pour les galeries
- **Responsive images** avec srcset
- **Preload** pour les images hero
- **Cache** agressif pour les variantes

---

*Dernière mise à jour : $(date)*
*Version : 1.0*
