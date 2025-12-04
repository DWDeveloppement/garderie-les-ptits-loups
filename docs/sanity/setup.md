# 🗄️ Sanity CMS - Guide Complet

## 📋 Vue d'Ensemble

Sanity CMS intégré comme solution de gestion de contenu pour la garderie "Les P'tits Loups". Système flexible, sécurisé et optimisé pour SSG avec Next.js 15.

### Stack Technologique
- **Sanity v4.6.1** avec `structureTool`
- **Next.js 15** avec App Router
- **TypeScript** pour type safety complet
- **GROQ** pour queries optimisées

---

## 🚀 Installation & Configuration

### 1. Variables d'Environnement

Créez `.env.local` à la racine :

```bash
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01

# API Token (pour mutations et scripts)
SANITY_API_TOKEN=your_api_token

# Revalidation (en cas de passage à ISR)
REVALIDATE_SECRET=your_secret
```

### 2. Installation des Dépendances

```bash
# Sanity packages
npm install sanity @sanity/client @sanity/image-url @sanity/vision next-sanity

# Sanity CLI (global)
npm install -g @sanity/cli
```

### 3. Commandes Utiles

```bash
# Démarrer le Studio
npm run sanity              # → Execute sanity dev -p 3333 → http://localhost:3333

# Build du Studio
npm run sanity:build

# Déployer le Studio
npm run sanity:deploy

# Générer les types TypeScript
npx sanity typegen generate
```

---

## 🏗️ Architecture & Structure

### Structure des Documents

#### **Pages Fixes (Documents Uniques)**
Documents avec ID prédéfini, pas de création multiple possible.

| Page | Type | ID | Description |
|------|------|-----|-------------|
| Page d'accueil | `home` | `home` | Contenu principal |
| À propos | `aboutPage` | `aboutPage` | Informations garderie |
| Contact | `contactPage` | `contactPage` | Coordonnées |
| Tarifs | `schedulePage` | `schedulePage` | Horaires & tarifs |

#### **Pages Dynamiques (Documents Multiples)**
Création de plusieurs documents possibles.

| Type | Description | Exemples |
|------|-------------|----------|
| `sectorPage` | Secteurs garderie | Nurserie, Trotteurs, Grands |
| `spaces` | Espaces spécifiques | Salle de jeux, Dortoir, Jardin |
| `prices` | Documents tarifs | Tarifs mensuels, journaliers |
| `testimonials` | Témoignages | Avis parents |

### Organisation du Studio

```
📁 Sanity Studio
├── Pages Générales
│   ├── Page d'Accueil (Document unique)
│   ├── Page À propos (Document unique)
│   ├── Page Contact (Document unique)
│   └── Page Tarifs (Document unique)
├── La Structure
│   ├── Nurserie (0-24 mois)
│   ├── Trotteurs (24-36 mois)
│   ├── Grands (3+ ans)
│   └── Autres espaces
├── Espaces (12 espaces par secteur)
├── Tarifs & Documents
└── Témoignages
```

### Configuration du Desk Structure

```typescript
// sanity/deskStructure.ts
export const myStructure = (S: StructureBuilder) =>
  S.list()
    .title('Contenu')
    .items([
      // Pages fixes - Documents uniques
      S.listItem()
        .title('Pages Générales')
        .child(
          S.list()
            .title('Pages Générales')
            .items([
              S.documentListItem()
                .schemaType('home')
                .id('home'),
              S.documentListItem()
                .schemaType('aboutPage')
                .id('aboutPage'),
              // ... autres pages fixes
            ])
        ),
      
      // Pages dynamiques - Documents multiples
      S.listItem()
        .title('La Structure')
        .child(S.documentTypeList('sectorPage')),
      
      S.listItem()
        .title('Espaces')
        .child(S.documentTypeList('spaces')),
      
      // ... autres sections
    ])
```

---

## 📝 Schémas & Types

### Client Sanity

```typescript
// lib/sanity/client.ts
import { createClient } from 'next-sanity'
import { measureSanityQuery } from '../performance/measure'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: false, // SSG - données au build time
  token: process.env.SANITY_API_TOKEN,
})

// Wrapper avec cache et performance tracking
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  options: { tag?: string; cache?: RequestCache } = {}
): Promise<T> {
  const queryLabel = options.tag || 'Unknown Query'
  
  return measureSanityQuery(queryLabel, () =>
    client.fetch<T>(query, params, {
      cache: options.cache || 'force-cache',
      next: {
        tags: options.tag ? [options.tag] : undefined,
      },
    })
  )
}
```

### Composants Réutilisables

#### BasicImage
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
    {
      name: 'alt',
      title: 'Texte alternatif',
      type: 'string',
      validation: (Rule) => Rule.required().max(125),
    },
    {
      name: 'enableOptions',
      title: 'Afficher les options avancées',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'credit',
      title: 'Crédit',
      type: 'string',
      initialValue: "Garderie Les P'tits Loups",
      hidden: ({ parent }) => !parent?.enableOptions,
    },
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
    },
  ],
}
```

#### Hero Component
```typescript
// sanity/schemas/components/hero.ts
export const hero = {
  name: 'hero',
  title: 'Section Hero',
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

#### SEO Component
```typescript
// sanity/schemas/components/seo.ts
export const seo = {
  name: 'seo',
  title: 'SEO',
  type: 'object',
  options: { collapsible: true, collapsed: false },
  fields: [
    {
      name: 'metaTitle',
      title: 'Titre Meta',
      type: 'string',
      validation: (Rule) => Rule.max(60),
    },
    {
      name: 'metaDescription',
      title: 'Description Meta',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(160),
    },
    {
      name: 'keywords',
      title: 'Mots-clés',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'shareImage',
      title: 'Image de partage (OG + Twitter)',
      type: 'basicImage',
      description: 'Recommandé: 1200x630px',
    },
  ],
}
```

---

## 🔍 Queries GROQ & Data Fetching

### Classification des Données

| Type | Fréquence | Exemples | Stratégie Cache |
|------|-----------|----------|----------------|
| **Fréquentes** | 7-14 jours | Horaires, Actualités | Cache court + revalidation |
| **Stables** | Annuelle | Prix, Subventions | Cache long + revalidation manuelle |
| **Dynamiques** | Variable | Galeries, Slug pages | Cache adaptatif + lazy loading |

### Structure des Queries

```typescript
// lib/sanity/queries/home.ts
import { groq } from 'next-sanity'
import { sanityFetch } from '../client'
import { BASIC_IMAGE_QUERY } from '../helpers/imageProps'

export const HOME_QUERY = groq`
  *[_type == "home" && _id == "home"][0] {
    title,
    sectionHero {
      image ${BASIC_IMAGE_QUERY},
      description
    },
    "linkedSectors": linkedSectors[]-> {
      _id,
      title,
      "slug": devConfig.slug.current,
      sectionHero {
        image ${BASIC_IMAGE_QUERY}
      }
    },
    "linkedOtherSpaces": linkedOtherSpaces[]-> {
      _id,
      title,
      sector,
      image ${BASIC_IMAGE_QUERY}
    },
    parallax {
      image ${BASIC_IMAGE_QUERY}
    },
    seo {
      metaTitle,
      metaDescription,
      keywords,
      shareImage ${BASIC_IMAGE_QUERY}
    }
  }
`

export async function fetchHome() {
  return sanityFetch(HOME_QUERY, {}, { tag: 'home-page' })
}
```

### Query Fragments pour Images

```typescript
// lib/sanity/helpers/imageProps.ts
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

export const BASIC_IMAGE_QUERY = `{
  ${IMAGE_QUERY_FRAGMENT},
  alt,
  enableOptions,
  credit,
  enableCustomTooltip,
  tooltipText
}`

export const GALLERY_IMAGE_QUERY = `{
  image${BASIC_IMAGE_QUERY},
  label
}`
```

### Stratégie SSG (Recommandée)

```typescript
// app/page.tsx
export default async function HomePage() {
  const data = await fetchHome()
  
  return <HomePageClient data={data} />
}

// Revalidation automatique
export const revalidate = 86400 // 24 heures
```

### Génération Statique des Pages Dynamiques

```typescript
// app/la-structure/[slug]/page.tsx
export async function generateStaticParams() {
  const sectors = await client.fetch(
    `*[_type == "sectorPage"] { "slug": devConfig.slug.current }`
  )
  
  return sectors.map((sector) => ({
    slug: sector.slug.split('/').pop(), // "la-structure/nurserie" → "nurserie"
  }))
}

export default async function SectorPage({ params }: { params: { slug: string } }) {
  const data = await fetchSectorPage(`${params.slug}`)
  
  return <SectorPageClient data={data} />
}
```

---

## 📊 Stratégies de Cache

### 1. Cache Next.js (force-cache)
```typescript
// Automatique avec sanityFetch
export async function sanityFetch<T>(query, params, options) {
  return client.fetch<T>(query, params, {
    cache: 'force-cache', // SSG
    next: {
      tags: options.tag ? [options.tag] : undefined,
    },
  })
}
```

### 2. Revalidation par Tags
```typescript
// app/api/revalidate/route.ts
import { revalidateTag } from 'next/cache'

export async function POST(request: Request) {
  const { secret, tag } = await request.json()
  
  if (secret !== process.env.REVALIDATE_SECRET) {
    return Response.json({ message: 'Invalid secret' }, { status: 401 })
  }
  
  revalidateTag(tag) // Ex: 'home-page', 'sector-nurserie'
  
  return Response.json({ revalidated: true })
}
```

### 3. Webhook Sanity → Vercel
```typescript
// sanity/lib/webhooks.ts
export const webhookConfig = {
  name: 'Vercel Rebuild',
  url: process.env.VERCEL_DEPLOY_HOOK_URL,
  on: ['create', 'update', 'delete'],
  filter: '_type in ["home", "aboutPage", "contactPage", "schedulePage", "sectorPage", "spaces", "prices"]',
}
```

---

## 🎯 Guide d'Utilisation Studio

### Pages Fixes

1. **Ouvrir la page** : Clic direct sur le nom (ex: "Page d'Accueil")
2. **Modifier le contenu** : Remplir les champs
3. **Sauvegarder** : Bouton "Publish"
4. **Résultat** : Mise à jour automatique via webhook

### Pages Dynamiques

1. **Cliquer sur la section** (ex: "Espaces")
2. **Voir la liste** des documents existants
3. **Créer un nouveau document** : Bouton "Create"
4. **Ou modifier** un document existant

### Tarifs & Prix

#### Créer un document de tarifs
1. Aller dans "Tarifs & Documents"
2. Créer un nouveau "Price Document"
3. Choisir le `documentType` : `accordion` (tarifs) ou `table` (subventions)
4. Choisir le `frequentationType` : `monthly-nursery`, `daily-nursery`, etc.
5. Remplir les accordéons ou le tableau

#### Lier les tarifs à la page Tarifs
1. Ouvrir "Page Tarifs"
2. Dans "Tarifs Nurserie" → Sélectionner les documents prix (mensuels + journaliers)
3. Dans "Tarifs Trotteurs & Grands" → Idem
4. Dans "Tableau Subventions" → Sélectionner le document table

---

## 🔧 Maintenance

### Nettoyage des Médias Non Utilisés
```bash
npm run cleanup:media
```

### Scripts Utiles

```bash
# Fixer un document corrompu
npm run fix:page -- contact

# Convertir les prix Number → String
npm run fix:prices
```

### Validation des Documents

```typescript
// Vision Tool (GROQ)
// Vérifier tous les documents prix
*[_type == "prices"] {
  _id,
  title,
  documentType,
  frequentationType,
  accordionItems
}

// Compter les documents par type
{
  "home": count(*[_type == "home"]),
  "sectors": count(*[_type == "sectorPage"]),
  "spaces": count(*[_type == "spaces"]),
  "prices": count(*[_type == "prices"])
}
```

### Slugs Auto-Générés

Pour les pages secteurs et espaces, les slugs sont automatiques :

```typescript
// Secteur - initialValue basé sur _id
slug: {
  type: 'slug',
  readOnly: true,
  hidden: true,
  initialValue: (doc) => ({
    _type: 'slug',
    current: `la-structure/${doc._id}`,
  }),
}

// Espace - pas de slug (pas de navigation directe)
// Le field sector est auto-calculé depuis _id
```

---

## 🚀 Déploiement

### Build du Studio
```bash
npm run sanity:build
```

### Déploiement automatique
Le studio est hébergé sur Sanity et accessible via :
```
https://[project-name].sanity.studio/
```

### Configuration CORS
Ajouter les domaines autorisés dans Sanity Dashboard :
- `http://localhost:3000` (dev)
- `https://votre-domaine.com` (prod)
- `https://votre-domaine.vercel.app` (preview)

---

## 📚 Ressources

- [Sanity Documentation](https://www.sanity.io/docs)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Next-Sanity Integration](https://www.sanity.io/plugins/next-sanity)
- [Sanity Vision Tool](https://www.sanity.io/docs/vision)
- [Sanity CLI](https://www.sanity.io/docs/cli)

---

**Dernière mise à jour :** Octobre 2024  
**Version :** Sanity v4.6.1 + Next.js 15 + TypeScript

