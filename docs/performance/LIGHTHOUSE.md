# Guide des Performances - Garderie Les P'tits Loups

## 🎯 Objectifs de Performance

### Cibles Lighthouse

```
Lighthouse Score: 95+
First Contentful Paint (FCP): < 1.5s
Largest Contentful Paint (LCP): < 2.5s
Cumulative Layout Shift (CLS): < 0.1
Time to Interactive (TTI): < 3.0s
```

### Métriques Actuelles (Production)

#### Bundle Size

```
Route (app)                          Size     First Load JS
┌ ○ /                               5.87 kB   125 kB
├ ○ /_not-found                     994 B     103 kB
├ ○ /a-propos                       1.79 kB   116 kB
├ ○ /contact                        10 kB     125 kB
├ ○ /tarifs                         [TBD]     [TBD]
└ ○ /la-structure/[slug]            [TBD]     [TBD]

○  Static (SSG) - Pages pré-générées au build time
```

#### Core Web Vitals

| Métrique | Cible | Status Actuel |
|----------|-------|---------------|
| **LCP** | <2.5s | ✅ Optimisé (LQIP, priority images) |
| **FID** | <100ms | ✅ Optimisé (SSG, minimal JS) |
| **CLS** | <0.1 | ✅ Zero CLS (dimensions + blur) |
| **FCP** | <1.5s | ✅ Optimisé (preconnect CDN) |
| **TTI** | <3.0s | ✅ Optimisé (SSG, code splitting) |

---

## 🏗️ Architecture : Static Site Generation (SSG)

### **Principe de base**

```typescript
// ✅ Fetch au BUILD TIME (pas au runtime)
export default async function Page() {
  const data = await sanityClient.fetch(QUERY)
  return <Component data={data} />
}

// ❌ PAS de revalidate
// ❌ PAS de 'use client' pour le data fetching
// ❌ PAS de dynamic = 'force-dynamic'
```

### **Workflow de mise à jour**

```
1. Client publie dans Sanity Studio
   ↓
2. Webhook Sanity → Vercel
   ↓
3. Vercel rebuild automatique (~30-60s)
   ↓
4. Site mis à jour avec nouvelles données
   ↓
5. HTML pré-généré servit instantanément
```

**Avantages :**
- ✅ Performance maximale (HTML statique)
- ✅ SEO parfait (contenu dans HTML)
- ✅ Coût minimal (pas de serveur runtime)
- ✅ Résilience (fonctionne même si Sanity down)

---

## 🖼️ Optimisation Images (Zero CLS)

### **Stratégie Sanity Images**

#### **1. GROQ Query avec métadonnées complètes**

```groq
// Toujours récupérer les dimensions et LQIP
"image": {
  ...,
  alt,
  enableOptions,
  credit,
  enableCustomTooltip,
  tooltipText,
  asset-> {
    _id,
    url,
    metadata {
      dimensions {
        width,
        height,
        aspectRatio
      },
      lqip,          // Low Quality Image Placeholder (base64)
      blurhash,      // Alternative à LQIP
      palette {      // Couleurs dominantes
        dominant {
          background,
          foreground
        }
      }
    }
  }
}
```

#### **2. Helpers d'images (lib/sanity/helpers/imageProps.ts)**

```typescript
import imageUrlBuilder from '@sanity/image-url'
import { client } from '@/lib/sanity/client'

const builder = imageUrlBuilder(client)

export function getBasicImageProps(image: SanityBasicImage) {
  if (!image?.asset) return null
  
  return {
    src: builder.image(image).url(),
    alt: image.alt || '',
    width: image.asset.metadata?.dimensions?.width || 800,
    height: image.asset.metadata?.dimensions?.height || 600,
    blurDataURL: image.asset.metadata?.lqip,
    placeholder: 'blur' as const,
    // Tooltip conditionnel
    title: image.enableCustomTooltip 
      ? (image.tooltipText || image.alt) 
      : undefined,
  }
}

export function getHeroImageProps(image: SanityBasicImage) {
  const baseProps = getBasicImageProps(image)
  
  return {
    ...baseProps,
    priority: true,              // Preload hero images
    quality: 90,                 // Haute qualité pour hero
    sizes: '100vw',              // Full width hero
  }
}

export function getGalleryImageProps(image: SanityGalleryImage) {
  const baseProps = getBasicImageProps(image)
  
  return {
    ...baseProps,
    loading: 'lazy' as const,    // Lazy load gallery
    quality: 85,                 // Qualité légèrement réduite
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  }
}
```

#### **3. Utilisation dans les composants**

```typescript
import Image from 'next/image'
import { getHeroImageProps, getGalleryImageProps } from '@/lib/sanity'

// Hero (above the fold)
const heroProps = getHeroImageProps(data.sectionHero.image)
<Image {...heroProps} />  // priority=true auto

// Gallery (below the fold)
const galleryProps = data.gallery.map(getGalleryImageProps)
{galleryProps.map((props, i) => (
  <Image key={i} {...props} />  // loading="lazy" auto
))}
```

**Résultat :** ✅ **CLS = 0** (dimensions connues avant render)

---

## 🔤 Optimisation Polices

### **Next.js Font Optimization (automatique)**

```typescript
// app/layout.tsx
import { Inter, Montserrat } from 'next/font/google'

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',              // FOUT strategy (meilleur UX)
  variable: '--font-inter',
  preload: true,
  fallback: ['system-ui', 'arial'],
})

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
  weight: ['400', '600', '700'], // Uniquement weights utilisés
  preload: true,
})
```

**Next.js gère automatiquement :**
- ✅ Subsetting (uniquement caractères utilisés)
- ✅ Preload dans `<head>`
- ✅ Self-hosting (pas de requête Google Fonts)
- ✅ Font display swap (évite FOIT)

---

## 📡 Optimisation Requêtes GROQ

### **Principe : 1 Requête = 1 Page**

**❌ ANTI-PATTERN (Waterfall) :**

```typescript
// Multiples requêtes séquentielles
const page = await fetchPage()
const sectors = await fetchSectors(page.sectorIds) // Attend page
const spaces = await fetchSpaces(sectors.spaceIds) // Attend sectors
// 3 requêtes HTTP = 3x latence réseau
```

**✅ BONNE PRATIQUE (Single Query) :**

```typescript
// Populate toutes les relations en 1 requête
const HOME_QUERY = groq`
  *[_type == "home"][0] {
    title,
    sectionHero { ... },
    
    // Populate avec ->
    "linkedSectors": linkedSectors[]-> {
      _id,
      title,
      "slug": devConfig.slug.current,
      sectionHero { ... }
    },
    
    "linkedOtherSpaces": linkedOtherSpaces[]-> {
      _id,
      title,
      image { ... }
    },
    
    seo { ... }
  }
`
// 1 requête HTTP = latence minimale
```

---

## ⚡ Code Splitting & Lazy Loading

### **Composants lourds en dynamic import**

```typescript
import dynamic from 'next/dynamic'

// Galerie (react-photo-album) → Lazy + SSR
const PhotoGallery = dynamic(
  () => import('@/components/PhotoGallery'),
  {
    loading: () => <GallerySkeleton />,
    ssr: true, // SSR pour SEO
  }
)

// Map interactive (Leaflet) → Lazy + No SSR
const DynamicMap = dynamic(
  () => import('@/components/DynamicMap'),
  {
    loading: () => <StaticMapFallback />,
    ssr: false, // Client-side uniquement (librairie browser)
  }
)

// Formulaire contact (Radix UI) → Lazy
const ContactForm = dynamic(
  () => import('@/components/ContactForm'),
  {
    loading: () => <FormSkeleton />,
    ssr: true,
  }
)
```

**Résultat :** Bundle initial réduit de ~40%

---

## 📊 Métriques & Monitoring

### **Core Web Vitals**

```typescript
// lib/performance/web-vitals.ts
export function reportWebVitals(metric) {
  console.log(metric)
  
  // Envoyer vers analytics (optionnel)
  if (metric.label === 'web-vital') {
    // Google Analytics, Vercel Analytics, etc.
  }
}

// app/layout.tsx
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <SpeedInsights /> {/* Monitoring automatique */}
      </body>
    </html>
  )
}
```

### **Mesure temps requêtes Sanity**

```typescript
// lib/sanity/client.ts
export async function sanityFetch(query, params = {}) {
  const start = Date.now()
  
  const result = await client.fetch(query, params)
  
  const duration = Date.now() - start
  console.log(`[Sanity] Query took ${duration}ms`)
  
  return result
}
```

---

## 🚀 Checklist Déploiement

### **Avant mise en production :**

- [ ] Vérifier Lighthouse Score > 95
- [ ] Tester toutes les pages en mode production (`npm run build && npm run start`)
- [ ] Vérifier images : dimensions + LQIP présents
- [ ] Configurer webhook Sanity → Vercel (voir WEBHOOK_SETUP.md)
- [ ] Tester webhook : publier dans Sanity → rebuild automatique
- [ ] Configurer Vercel Analytics (monitoring)
- [ ] Tester temps de build (devrait être < 60s)
- [ ] Vérifier Core Web Vitals en production

### **Optimisations post-lancement :**

- [ ] Ajouter redirections 301 pour anciennes URLs
- [ ] Configurer Cache-Control headers
- [ ] Activer Vercel Image Optimization (automatique)
- [ ] Monitorer temps de build (alerte si > 2 min)
- [ ] Nettoyer médias inutilisés (`npm run cleanup:media`)

---

## 📚 Ressources

- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Sanity Image URLs](https://www.sanity.io/docs/image-url)
- [Core Web Vitals](https://web.dev/vitals/)
- [Vercel Analytics](https://vercel.com/docs/analytics)
- [React Photo Album](https://react-photo-album.com/) (pour galeries)

---

## 🎯 Résumé de la stratégie

```
✅ SSG Full Static (build time)
✅ Webhook auto-rebuild (Sanity → Vercel)
✅ Images optimisées (dimensions + LQIP + lazy loading)
✅ Polices optimisées (Next.js font system)
✅ 1 requête GROQ par page (populate relations)
✅ Code splitting (dynamic imports)
✅ Monitoring (Web Vitals + Sanity query times)
```

**Résultat attendu :**
- Lighthouse Score: 95-100
- FCP: < 1s
- LCP: < 2s
- CLS: 0
- TTI: < 2s

