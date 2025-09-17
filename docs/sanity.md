# 🗄️ Sanity CMS - Système de Gestion de Contenu

## 📋 **Vue d'Ensemble**

Sanity CMS est intégré comme solution de gestion de contenu pour le site de la garderie "Les P'tits Loups". Le système permet une gestion flexible et sécurisée du contenu avec une interface utilisateur intuitive.

## 🏗️ **Architecture Technique**

### **Stack Technologique**
- **Sanity v3** : Version moderne avec `structureTool`
- **Next.js 15** : Intégration avec App Router
- **TypeScript** : Type safety complet
- **Sanity Client** : `@sanity/client` pour les requêtes
- **Next-Sanity** : `next-sanity` pour l'intégration Next.js

### **Configuration Actuelle**
```typescript
// lib/sanity/client.ts
import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: process.env.NODE_ENV === 'production',
  apiVersion: '2024-01-01',
})
```

## 📊 **Stratégie de Données**

### **🔄 Données Fréquentes (7-14 jours)**
- **Horaires** : Changements saisonniers, fermetures exceptionnelles
- **Actualités** : Événements, nouvelles, annonces
- **Équipe** : Arrivées/départs, changements de personnel
- **Activités** : Programmes, sorties, événements spéciaux

### **💰 Données Stables (Annuellement)**
- **Prix** : Tarifs mensuels/journaux, structure de facturation
- **Subventions** : Barèmes de réduction, critères d'éligibilité
- **Structure** : Organisation générale, règlement intérieur

### **🖼️ Données Dynamiques (Pages Slug)**
- **Galeries** : Albums d'activités, photos d'événements
- **Contenu riche** : Articles, témoignages, actualités détaillées

## 🔧 **Système de Queries**

### **Approche Recommandée : Sanity + Next.js Natif**

**Avantages :**
- ✅ **SSR/SSG** : Performance optimale
- ✅ **Cache Next.js** : Revalidation automatique
- ✅ **Type safety** : Génération automatique des types
- ✅ **Bundle léger** : Pas de dépendances supplémentaires
- ✅ **Simplicité** : Pas de complexité supplémentaire

### **Structure des Queries**
```typescript
// lib/sanity/queries.ts
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
```

## 📝 **Schémas Sanity**

### **Document Prix (Structure Fixe)**
```typescript
// Basé sur docs/price.md - Option 3
export const priceSchema = {
  name: 'price',
  title: 'Tarifs',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'prixAuMois',
      title: 'Prix au mois',
      type: 'object',
      fields: [
        {
          name: 'label',
          title: 'Label',
          type: 'string',
          initialValue: 'Prix au mois'
        },
        {
          name: 'journeeComplete',
          title: 'Journée complète',
          type: 'object',
          fields: [
            { name: 'label', type: 'string', initialValue: 'Journée complète' },
            { name: 'items', type: 'array', of: [{ type: 'priceItem' }] }
          ]
        },
        // ... autres champs selon la structure
      ]
    },
    {
      name: 'prixAuJour',
      title: 'Prix au jour',
      type: 'object',
      // Structure similaire
    }
  ]
}
```

### **Document Galerie**
```typescript
export const gallerySchema = {
  name: 'gallery',
  title: 'Galerie',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
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
              type: 'string'
            },
            {
              name: 'caption',
              title: 'Légende',
              type: 'string'
            }
          ]
        }
      ]
    }
  ]
}
```

## 🚀 **Implémentation**

### **1. Pages Statiques avec SSG**
```typescript
// app/horaires-tarifs/page.tsx
import { getPrices, getSubsidies } from '@/lib/sanity/queries'
import { PriceSection } from '@/components/pages/horaires-tarifs/PriceSection'
import { SubsidiesSection } from '@/components/pages/horaires-tarifs/SubsidiesSection'

export default async function HorairesTarifsPage() {
  const [prices, subsidies] = await Promise.all([
    getPrices(),
    getSubsidies()
  ])
  
  return (
    <div>
      {prices.map(price => (
        <PriceSection key={price._id} section={price} />
      ))}
      <SubsidiesSection subsidies={subsidies} />
    </div>
  )
}

// Revalidation automatique
export const revalidate = 86400 // 24 heures
```

### **2. Pages Dynamiques**
```typescript
// app/[slug]/page.tsx
import { getPageBySlug } from '@/lib/sanity/queries'
import { Gallery } from '@/components/Gallery'

export default async function DynamicPage({ params }: { params: { slug: string } }) {
  const page = await getPageBySlug(params.slug)
  
  if (!page) {
    notFound()
  }
  
  return (
    <div>
      <h1>{page.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.content }} />
      {page.gallery && <Gallery photos={page.gallery} />}
    </div>
  )
}

// Génération statique des pages
export async function generateStaticParams() {
  const pages = await client.fetch(`*[_type == "page"] { "slug": slug.current }`)
  return pages.map((page: any) => ({ slug: page.slug }))
}
```

## 🔄 **Stratégie de Revalidation**

### **Revalidation Automatique**
```typescript
// next.config.ts
export default {
  experimental: {
    // Revalidation automatique basée sur les changements Sanity
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  }
}
```

### **Revalidation Manuelle**
```typescript
// app/api/revalidate/route.ts
import { revalidatePath } from 'next/cache'
import { client } from '@/lib/sanity/client'

export async function POST(request: Request) {
  const { secret, type, slug } = await request.json()
  
  if (secret !== process.env.REVALIDATE_SECRET) {
    return Response.json({ message: 'Invalid secret' }, { status: 401 })
  }
  
  try {
    if (type === 'page') {
      revalidatePath(`/${slug}`)
    } else {
      revalidatePath('/')
    }
    
    return Response.json({ revalidated: true })
  } catch (err) {
    return Response.json({ message: 'Error revalidating' }, { status: 500 })
  }
}
```

## 🎯 **Migration Future**

### **Phase 1 : Sanity Natif (Actuel)**
- ✅ Queries Sanity directes
- ✅ SSG avec revalidation
- ✅ Type safety automatique

### **Phase 2 : TanStack Query (Si nécessaire)**
- 🔄 Cache avancé côté client
- 🔄 Optimistic updates
- 🔄 Synchronisation temps réel
- 🔄 Mutations complexes

**Migration vers TanStack Query uniquement si :**
- Mutations fréquentes nécessaires
- Cache côté client avancé requis
- Optimistic updates souhaités
- Synchronisation temps réel critique

## 📚 **Ressources**

- [Sanity Documentation](https://www.sanity.io/docs)
- [Next-Sanity Integration](https://www.sanity.io/plugins/next-sanity)
- [Sanity v3 Migration Guide](https://www.sanity.io/docs/migrating-from-v2)
- [Next.js App Router](https://nextjs.org/docs/app)

## 🔧 **Commandes Utiles**

```bash
# Installation des dépendances Sanity
npm install @sanity/client @sanity/image-url next-sanity

# Génération des types Sanity
npx sanity typegen generate

# Démarrage du studio Sanity
npx sanity dev

# Build du studio Sanity
npx sanity build
```

---

**Dernière mise à jour :** Décembre 2024  
**Version :** Sanity v3 + Next.js 15
