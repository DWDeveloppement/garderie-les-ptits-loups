# 🔍 Système de Queries - Architecture et Stratégies

## 📋 **Vue d'Ensemble**

Documentation complète du système de queries pour le site de la garderie "Les P'tits Loups", couvrant les différentes approches, stratégies de cache et optimisations de performance.

## 🏗️ **Architecture des Données**

### **Classification des Données**

| Type | Fréquence | Exemples | Stratégie |
|------|-----------|----------|-----------|
| **🔄 Fréquentes** | 7-14 jours | Horaires, Actualités, Équipe | Cache court + Revalidation |
| **💰 Stables** | Annuelle | Prix, Subventions, Structure | Cache long + Revalidation manuelle |
| **🖼️ Dynamiques** | Variable | Galeries, Pages slug | Cache adaptatif + Lazy loading |

### **Flux de Données**
```
Sanity CMS → Next.js API → Cache → Composants React
     ↓           ↓          ↓         ↓
   Source    Server-side  Browser   Client-side
```

## 🎯 **Stratégies de Queries**

### **Phase 1 : Sanity + Next.js Natif (RECOMMANDÉE)**

**Avantages :**
- ✅ **SSR/SSG** : Performance optimale
- ✅ **Cache Next.js** : Revalidation automatique
- ✅ **Type safety** : Génération automatique
- ✅ **Bundle léger** : Pas de dépendances supplémentaires
- ✅ **Simplicité** : Pas de complexité supplémentaire

**Implémentation :**
```typescript
// lib/sanity/queries.ts
import { client } from './client'

export const queries = {
  // Données fréquentes (7-14 jours)
  schedules: `*[_type == "schedule"] | order(order asc)`,
  news: `*[_type == "news"] | order(_createdAt desc)`,
  team: `*[_type == "team"] | order(order asc)`,
  activities: `*[_type == "activity"] | order(_createdAt desc)`,
  
  // Données stables (annuelles)
  prices: `*[_type == "price"] | order(_createdAt desc)`,
  subsidies: `*[_type == "subsidy"] | order(order asc)`,
  structure: `*[_type == "structure"] | order(order asc)`,
  
  // Pages dynamiques avec galeries
  pageBySlug: `*[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    content,
    gallery[] {
      _key,
      asset-> {
        _id,
        url,
        metadata {
          dimensions
        }
      },
      alt
    }
  }`,
  
  // Galeries spécialisées
  galleryBySlug: `*[_type == "gallery" && slug.current == $slug][0] {
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
  }`,
}

// Fonctions de récupération
export async function getSchedules() {
  return await client.fetch(queries.schedules)
}

export async function getNews(limit = 10) {
  return await client.fetch(`${queries.news}[0...${limit}]`)
}

export async function getPrices() {
  return await client.fetch(queries.prices)
}

export async function getPageBySlug(slug: string) {
  return await client.fetch(queries.pageBySlug, { slug })
}

export async function getGalleryBySlug(slug: string) {
  return await client.fetch(queries.galleryBySlug, { slug })
}
```

### **Phase 2 : TanStack Query (FUTURE)**

**Quand l'utiliser :**
- 🔄 **Mutations fréquentes** (formulaires, CRUD)
- 🔄 **Cache avancé** (invalidation, synchronisation)
- 🔄 **Optimistic updates**
- 🔄 **Refetch automatique**

**Implémentation :**
```typescript
// hooks/useQueries.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getSchedules, getNews, getPrices } from '@/lib/sanity/queries'

export function useSchedules() {
  return useQuery({
    queryKey: ['schedules'],
    queryFn: getSchedules,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useNews(limit = 10) {
  return useQuery({
    queryKey: ['news', limit],
    queryFn: () => getNews(limit),
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

export function usePrices() {
  return useQuery({
    queryKey: ['prices'],
    queryFn: getPrices,
    staleTime: 24 * 60 * 60 * 1000, // 24 heures
  })
}

// Mutation pour les formulaires
export function useContactForm() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      
      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi')
      }
      
      return response.json()
    },
    onSuccess: () => {
      // Invalidation du cache si nécessaire
      queryClient.invalidateQueries({ queryKey: ['news'] })
    },
  })
}
```

### **Phase 3 : SWR (ALTERNATIVE LÉGÈRE)**

**Avantages :**
- ✅ **Bundle léger** (~13KB)
- ✅ **Cache intelligent**
- ✅ **Revalidation automatique**
- ✅ **TypeScript natif**

**Implémentation :**
```typescript
// hooks/useSWR.ts
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export function useSchedules() {
  const { data, error, isLoading } = useSWR('/api/schedules', fetcher, {
    refreshInterval: 5 * 60 * 1000, // 5 minutes
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  })

  return {
    schedules: data,
    isLoading,
    isError: error,
  }
}

export function useNews(limit = 10) {
  const { data, error, isLoading } = useSWR(
    `/api/news?limit=${limit}`,
    fetcher,
    {
      refreshInterval: 2 * 60 * 1000, // 2 minutes
    }
  )

  return {
    news: data,
    isLoading,
    isError: error,
  }
}
```

## 🔄 **Stratégies de Cache**

### **1. Cache Next.js (SSG/SSR)**

```typescript
// app/horaires-tarifs/page.tsx
import { getSchedules, getPrices } from '@/lib/sanity/queries'

export default async function HorairesTarifsPage() {
  const [schedules, prices] = await Promise.all([
    getSchedules(),
    getPrices()
  ])
  
  return (
    <div>
      <SchedulesSection schedules={schedules} />
      <PricesSection prices={prices} />
    </div>
  )
}

// Revalidation automatique
export const revalidate = 86400 // 24 heures pour les prix
export const revalidate = 3600  // 1 heure pour les horaires
```

### **2. Cache API Routes**

```typescript
// app/api/schedules/route.ts
import { getSchedules } from '@/lib/sanity/queries'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const schedules = await getSchedules()
    
    return NextResponse.json(schedules, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des horaires' },
      { status: 500 }
    )
  }
}
```

### **3. Cache Client-Side**

```typescript
// lib/cache.ts
class ClientCache {
  private cache = new Map<string, { data: any; timestamp: number }>()
  private defaultTTL = 5 * 60 * 1000 // 5 minutes

  set(key: string, data: any, ttl = this.defaultTTL) {
    this.cache.set(key, {
      data,
      timestamp: Date.now() + ttl,
    })
  }

  get(key: string) {
    const item = this.cache.get(key)
    
    if (!item) return null
    
    if (Date.now() > item.timestamp) {
      this.cache.delete(key)
      return null
    }
    
    return item.data
  }

  clear() {
    this.cache.clear()
  }
}

export const clientCache = new ClientCache()
```

## 🚀 **Optimisations de Performance**

### **1. Lazy Loading des Queries**

```typescript
// components/LazyData.tsx
import { Suspense } from 'react'
import { getSchedules } from '@/lib/sanity/queries'

async function SchedulesData() {
  const schedules = await getSchedules()
  return <SchedulesSection schedules={schedules} />
}

export function LazySchedules() {
  return (
    <Suspense fallback={<SchedulesSkeleton />}>
      <SchedulesData />
    </Suspense>
  )
}

function SchedulesSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded mb-4"></div>
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-4 bg-gray-200 rounded"></div>
        ))}
      </div>
    </div>
  )
}
```

### **2. Prefetching Intelligent**

```typescript
// lib/prefetch.ts
import { client } from './sanity/client'

export async function prefetchCriticalData() {
  const [schedules, prices] = await Promise.all([
    client.fetch('*[_type == "schedule"] | order(order asc)'),
    client.fetch('*[_type == "price"] | order(_createdAt desc)'),
  ])

  return {
    schedules,
    prices,
  }
}

// app/layout.tsx
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Prefetch des données critiques
  const criticalData = await prefetchCriticalData()
  
  return (
    <html>
      <body>
        <DataProvider initialData={criticalData}>
          {children}
        </DataProvider>
      </body>
    </html>
  )
}
```

### **3. Optimisation des Images**

```typescript
// lib/sanity/image-optimization.ts
import { urlFor } from './image-url'

export function getOptimizedImageUrl(
  asset: any,
  width: number,
  height?: number,
  quality = 85
) {
  let builder = urlFor(asset)
    .width(width)
    .quality(quality)
    .format('webp')
  
  if (height) {
    builder = builder.height(height)
  }
  
  return builder.url()
}

export function getResponsiveImageSrcSet(asset: any, baseWidth: number) {
  const sizes = [400, 800, 1200, 1600, 2000]
  
  return sizes.map(size => ({
    src: getOptimizedImageUrl(asset, size),
    width: size,
    height: Math.round(
      (asset.metadata.dimensions.height * size) / 
      asset.metadata.dimensions.width
    ),
  }))
}
```

## 🔧 **Monitoring et Debug**

### **1. Logging des Queries**

```typescript
// lib/sanity/logger.ts
class QueryLogger {
  private queries = new Map<string, { count: number; totalTime: number }>()

  log(query: string, duration: number) {
    const existing = this.queries.get(query) || { count: 0, totalTime: 0 }
    
    this.queries.set(query, {
      count: existing.count + 1,
      totalTime: existing.totalTime + duration,
    })
  }

  getStats() {
    return Array.from(this.queries.entries()).map(([query, stats]) => ({
      query,
      count: stats.count,
      averageTime: stats.totalTime / stats.count,
      totalTime: stats.totalTime,
    }))
  }
}

export const queryLogger = new QueryLogger()

// Wrapper pour les queries
export async function loggedFetch(query: string, params?: any) {
  const start = Date.now()
  
  try {
    const result = await client.fetch(query, params)
    const duration = Date.now() - start
    
    queryLogger.log(query, duration)
    
    return result
  } catch (error) {
    const duration = Date.now() - start
    queryLogger.log(`ERROR: ${query}`, duration)
    throw error
  }
}
```

### **2. Performance Monitoring**

```typescript
// lib/performance.ts
export function measureQueryPerformance<T>(
  queryName: string,
  queryFn: () => Promise<T>
): Promise<T> {
  const start = performance.now()
  
  return queryFn().then(result => {
    const end = performance.now()
    const duration = end - start
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`Query ${queryName} took ${duration.toFixed(2)}ms`)
    }
    
    return result
  })
}
```

## 📊 **Comparaison des Solutions**

| Solution | Bundle Size | Performance | Cache | Type Safety | Complexité |
|----------|-------------|-------------|-------|-------------|------------|
| **Sanity Natif** | 0KB | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ | ⭐ |
| **TanStack Query** | ~50KB | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ |
| **SWR** | ~13KB | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐⭐ |
| **Apollo Client** | ~100KB | ⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ |

## 🎯 **Recommandations Finales**

### **Phase 1 : Sanity Natif (IMMÉDIAT)**
- ✅ Implémentation rapide
- ✅ Performance optimale
- ✅ Bundle léger
- ✅ Type safety complet

### **Phase 2 : Migration Conditionnelle**
- 🔄 TanStack Query si mutations fréquentes
- 🔄 SWR si besoin de cache client simple
- 🔄 Apollo Client si GraphQL nécessaire

### **Critères de Migration**
- **Mutations > 10/jour** → TanStack Query
- **Cache client critique** → SWR ou TanStack Query
- **Synchronisation temps réel** → TanStack Query
- **GraphQL requis** → Apollo Client

## 📚 **Ressources**

- [Next.js Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)
- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [SWR Documentation](https://swr.vercel.app/)
- [Sanity Client Documentation](https://www.sanity.io/docs/js-client)

---

**Dernière mise à jour :** Décembre 2024  
**Version :** Next.js 15 + Sanity v3
