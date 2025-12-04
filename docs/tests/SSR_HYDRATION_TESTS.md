# 🔄 SSR/Hydration Testing Plan

**Date de création :** 17 octobre 2024
**Dernière mise à jour :** 2025-12-03

---

## 🎯 Objectifs

- ✅ Server-side rendering sans erreurs
- ✅ Hydration sans mismatches
- ✅ Client components identifiés
- ✅ Performance SSR optimale

---

## 📋 Architecture SSR/CSR

### **Server Components** (par défaut)

```tsx
// src/app/la-structure/[slug]/page.tsx
export default async function StructurePage({ params }) {
  const data = await fetchSectorPage(sectorId)  // ← Server-side
  return <SectorPage data={data} />
}
```

✅ **Fetch au build time** (SSG)  
✅ **Zero JavaScript client** pour data fetching

### **Client Components** (avec 'use client')

```tsx
// src/components/gallery/Gallery.tsx
'use client'

export function Gallery({ photos }) {
  const [state, setState] = useState(...)  // ← Client-side
  return <RowsPhotoAlbum ... />
}
```

**Raison :** Interactivité (state, events, hooks)

### **Hybrid Components**

```tsx
// src/components/pages/sector/SectorPage.tsx
// Server component qui render des client components

export function SectorPage({ data }) {
  return (
    <>
      {/* Server-rendered */}
      <Image {...hero} />
      <PortableText value={content} />
      
      {/* Client-rendered */}
      <GalleryWithLightbox photos={photos} />
      <DevJsonViewer data={data} />
    </>
  )
}
```

---

## ✅ Checklist SSR

### **Pages Secteurs**

- [x] `generateStaticParams()` défini
- [x] `generateMetadata()` défini
- [x] Fetch Sanity au build time
- [x] HTML complet pré-rendu
- [x] Pas de `useEffect` pour data fetching

### **Composants**

| Composant | Type | Justification |
|-----------|------|---------------|
| `SectorPage` | Server | Pas de state/events |
| `Gallery` | Client | State (hover, click) |
| `Lightbox` | Client | State (open, index) |
| `GalleryWithLightbox` | Client | State management |
| `DevJsonViewer` | Client | State (collapsed, copy) |
| `PortableText` | Server | Pas d'interactivité |

---

## 🔍 Hydration Mismatches

### **Problèmes potentiels**

#### **1. Client-only data**

❌ **Mauvais :**
```tsx
const timestamp = new Date().toISOString()  // Différent server/client
return <div>{timestamp}</div>
```

✅ **Bon :**
```tsx
const timestamp = data.timestamp  // Même valeur server/client
```

#### **2. useEffect sans dependencies**

❌ **Mauvais :**
```tsx
useEffect(() => {
  setMounted(true)  // Cause mismatch
}, [])
```

✅ **Bon :**
```tsx
const [mounted, setMounted] = useState(false)
useEffect(() => {
  setMounted(true)
}, [])

if (!mounted) return null  // Suppress hydration warning
```

#### **3. Browser-only APIs**

❌ **Mauvais :**
```tsx
const width = window.innerWidth  // window undefined en SSR
```

✅ **Bon :**
```tsx
const [width, setWidth] = useState(0)
useEffect(() => {
  setWidth(window.innerWidth)
}, [])
```

### **Notre implémentation**

✅ **Toutes les données viennent de Sanity** (SSG)  
✅ **Pas de browser APIs en SSR**  
✅ **Client components bien isolés**

---

## 🧪 Tests de Hydration

### **1. Vérifier en console**

```bash
npm run build
npm run start
```

Ouvrir la console navigateur et chercher :

❌ **Erreurs à éviter :**
```
Warning: Text content did not match.
Warning: Prop `className` did not match.
Warning: Expected server HTML to contain...
```

✅ **Attendu :**
```
(Aucune erreur de hydration)
```

### **2. React DevTools**

Installer **React DevTools** et vérifier :

- [ ] Components tree correct
- [ ] Pas de duplicates
- [ ] State initialisé correctement
- [ ] Pas de warnings

### **3. Network Tab**

Vérifier que :
- [ ] HTML complet dans la réponse initiale
- [ ] Pas de waterfall de requêtes
- [ ] Hydration rapide (< 100ms)

---

## 📊 SSR Performance

### **Métriques**

| Métrique | Target | Notes |
|----------|--------|-------|
| **TTFB** | < 600ms | Time to First Byte |
| **FCP** | < 1.8s | First Contentful Paint |
| **LCP** | < 2.5s | Largest Contentful Paint |
| **TTI** | < 3.8s | Time to Interactive |
| **Hydration** | < 100ms | Client-side hydration |

### **Optimisations SSG**

✅ **Pre-rendering** : HTML généré au build  
✅ **Zero TTFB** : Fichier statique servi  
✅ **Instant FCP** : HTML complet immédiatement  
✅ **Fast hydration** : Minimal client JS

---

## 🔧 Commandes de test

### **Build + Serve local**

```bash
# Build production
npm run build

# Serve en mode production
npm run start

# Tester
curl -I http://localhost:3000/la-structure/nurserie
```

### **Vérifier HTML source**

```bash
# Voir le HTML pré-rendu
curl http://localhost:3000/la-structure/nurserie > nurserie.html

# Vérifier que le contenu est là (pas juste loading...)
grep "La Nurserie" nurserie.html
grep "Galerie" nurserie.html
```

### **Mesurer Hydration Time**

Dans la console navigateur :

```js
// Avant hydration
performance.mark('hydration-start')

// Après hydration (React DevTools)
performance.mark('hydration-end')
performance.measure('hydration', 'hydration-start', 'hydration-end')
```

---

## 🐛 Debugging Hydration

### **Activer les warnings React**

```tsx
// next.config.ts
const nextConfig = {
  reactStrictMode: true,  // ← Active double-render en dev
}
```

### **Suspense Boundaries**

Pour isoler les erreurs :

```tsx
<Suspense fallback={<GallerySkeleton />}>
  <Gallery photos={photos} />
</Suspense>
```

### **Error Boundaries**

```tsx
<ErrorBoundary fallback={<ErrorMessage />}>
  <GalleryWithLightbox photos={photos} />
</ErrorBoundary>
```

---

## ✅ Checklist SSR/Hydration

### **Build**
- [x] Build successful
- [x] 4 pages SSG générées
- [x] HTML files présents (.html)
- [x] RSC payloads générés (.rsc)
- [ ] Aucune erreur de build

### **Runtime**
- [ ] Aucune erreur hydration en console
- [ ] Components s'affichent correctement
- [ ] Interactivité fonctionne après hydration
- [ ] Pas de flash de contenu

### **Performance**
- [ ] TTFB < 600ms (SSG : ~0ms)
- [ ] FCP < 1.8s
- [ ] LCP < 2.5s (Hero image)
- [ ] Hydration < 100ms

---

## 🎯 Résultat attendu

### **SSR/SSG**
```
✅ 4 pages HTML pre-rendered
✅ Contenu complet dans le HTML
✅ SEO-friendly (crawler voit le contenu)
✅ Fast First Paint
```

### **Hydration**
```
✅ Zero mismatches
✅ Smooth transition server → client
✅ Interactivité immédiate
✅ Pas de flash/jump
```

---

## 🚀 Commandes rapides

```bash
# Build + Test
npm run build && npm run start

# Vérifier HTML source
curl http://localhost:3000/la-structure/nurserie | grep -i "nurserie"

# Test hydration
# → Ouvrir navigateur + console
# → Vérifier aucune erreur
```

---

**Statut :** ✅ **Architecture SSR/CSR correcte**

**Tests requis :** Validation manuelle en mode production

