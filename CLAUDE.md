# CLAUDE.md - Guide pour Assistants IA

> **🇫🇷 LANGUE DE COMMUNICATION : FRANÇAIS**
> Tous les échanges avec les assistants IA doivent se faire **exclusivement en français**.
> Code, commentaires, commits, documentation : tout doit être en français.

---

## 📋 Table des matières

1. [Vue d'ensemble du projet](#-vue-densemble-du-projet)
2. [Architecture technique](#-architecture-technique)
3. [Structure du code](#-structure-du-code)
4. [Workflows de développement](#-workflows-de-développement)
5. [Conventions et bonnes pratiques](#-conventions-et-bonnes-pratiques)
6. [Intégration Sanity CMS](#-intégration-sanity-cms)
7. [Guide de tâches courantes](#-guide-de-tâches-courantes)
8. [Sécurité et performance](#-sécurité-et-performance)
9. [Troubleshooting](#-troubleshooting)

---

## 🎯 Vue d'ensemble du projet

### Contexte

**Garderie Les P'tits Loups** est un site web moderne pour une garderie suisse, construit avec Next.js 15 et Sanity CMS. L'application offre :

- Présentation des espaces (nurserie, trotteurs, grands)
- Galeries photos avec lightbox
- Formulaire de contact avec validation
- Gestion de contenu via Sanity CMS
- SEO optimisé et Core Web Vitals
- Design responsive mobile-first

### Public cible

- **Parents** : Découvrir la garderie, horaires, tarifs, contact
- **Administrateurs** : Gérer le contenu via Sanity Studio
- **Développeurs** : Maintenabilité et évolutivité du code

### Objectifs techniques

- ✅ **Performance** : Score Lighthouse > 90
- ✅ **Accessibilité** : WCAG 2.1 AA
- ✅ **SEO** : Métadonnées complètes, sitemap, robots.txt
- ✅ **Sécurité** : reCAPTCHA, validation, secrets env
- ✅ **Maintenabilité** : Code TypeScript strict, modularité

---

## 🏗️ Architecture technique

### Stack principal

| Couche | Technologies |
|--------|-------------|
| **Framework** | Next.js 15.5.2 (App Router) |
| **Langage** | TypeScript 5 (strict mode) |
| **UI** | React 19.1.0 |
| **Styling** | Tailwind CSS v4 + styled-components |
| **Composants UI** | Shadcn UI + Radix UI primitives |
| **CMS** | Sanity v4.6.1 + next-sanity |
| **Formulaires** | React Hook Form + Zod |
| **Email** | Resend 6.0.2 |
| **Maps** | Leaflet + OpenStreetMap |
| **Galerie** | react-photo-album + yet-another-react-lightbox |
| **Animations** | Framer Motion 12.23.24 |
| **Icônes** | Lucide React |
| **Notifications** | Sonner (toasts) |
| **Sécurité** | reCAPTCHA v2 + Honeypot |
| **Déploiement** | Vercel |

### Patterns architecturaux

#### 1. **Server vs Client Components**

```typescript
// ✅ Server Component (par défaut)
// - Fetching de données
// - Accès direct aux secrets
// - Rendu côté serveur
export default async function HomePage() {
  const data = await fetchFromSanity()
  return <Hero data={data} />
}

// ✅ Client Component ('use client')
// - Interactivité (useState, useEffect)
// - Event handlers
// - Animations, formulaires
'use client'
export function ContactForm() {
  const [email, setEmail] = useState('')
  // ...
}
```

#### 2. **Data Fetching : SSG + ISR**

```typescript
// Static Site Generation avec Incremental Static Regeneration
export const revalidate = 60 // Cache 60 secondes

// + Webhook Sanity pour revalidation instantanée
// POST /api/revalidate → revalidatePath('/tarifs')
```

#### 3. **Optimisation des images**

```typescript
// Sanity Image URL Builder
import imageUrlBuilder from '@sanity/image-url'

// Génération d'URLs optimisées avec :
// - LQIP (Low Quality Image Placeholder)
// - Blurhash pour skeleton screens
// - WebP/AVIF formats
// - Responsive sizes
```

#### 4. **Validation multi-couches**

```
User Input
    ↓
Client Validation (Zod)
    ↓
reCAPTCHA v2 Check
    ↓
Honeypot Detection
    ↓
Server Validation (API Route)
    ↓
Resend Email API
```

---

## 📁 Structure du code

### Architecture des répertoires

```
📦 garderie-les-ptits-loups/
├── 📚 docs/                          # Documentation complète
├── 🌐 public/                        # Fichiers statiques
│   ├── fonts/                        # Chelsea Market, Open Sans
│   ├── images/                       # Images WebP (hero, logo, etc.)
│   ├── robots.txt                    # SEO robots
│   └── sitemap.xml                   # Sitemap statique
├── 🗄️ src/
│   ├── 📱 app/                       # Next.js 15 App Router
│   │   ├── (routes)/                 # Pages (homepage, contact, etc.)
│   │   ├── api/                      # API Routes
│   │   │   ├── contact/              # POST /api/contact
│   │   │   ├── recaptcha-config/     # GET /api/recaptcha-config
│   │   │   └── revalidate/           # POST /api/revalidate (webhook)
│   │   ├── layout.tsx                # Layout racine
│   │   └── globals.css               # CSS global + Tailwind
│   ├── 🧩 components/
│   │   ├── ui/                       # Shadcn UI (button, card, input, etc.)
│   │   ├── layout/                   # Header, Footer, Navigation
│   │   ├── pages/                    # Sections de pages (hero, contact, etc.)
│   │   ├── shared/                   # Composants réutilisables
│   │   │   ├── maps/                 # DynamicMap, StaticMap
│   │   │   ├── richtext/             # RichTextRenderer (Portable Text)
│   │   │   ├── pricing/              # PricingList, SubsidiesTable
│   │   │   └── feedback/             # Animations success
│   │   ├── forms/                    # ContactForm, InputField, etc.
│   │   ├── gallery/                  # Photo album + lightbox
│   │   └── dev/                      # DevJsonViewer (debug)
│   ├── 🎣 hooks/                     # Hooks personnalisés
│   │   ├── useFormValidation.ts      # Validation formulaire
│   │   ├── useRecaptchaV2.ts         # reCAPTCHA
│   │   ├── useMaps.ts                # Gestion maps
│   │   ├── useScrollParallax.ts      # Effet parallax
│   │   ├── useWindowSize.ts          # Responsive
│   │   └── a11y/                     # Accessibilité (useLinkA11y, etc.)
│   ├── 🔧 lib/                       # Utilitaires
│   │   ├── utils.ts                  # Helpers généraux
│   │   └── cn.ts                     # Merge classes Tailwind
│   ├── 🎨 styles/                    # CSS
│   │   ├── palette.css               # Orange + Purple (Radix Colors)
│   │   ├── fonts.css                 # Chelsea Market, Open Sans
│   │   └── animations.css            # Keyframes
│   ├── 🟦 types/                     # Types TypeScript applicatifs
│   │   ├── map.ts                    # MapLocation
│   │   ├── form.ts                   # ContactFormData
│   │   └── components.ts             # Props composants
│   ├── 📝 constants/                 # Constantes
│   ├── 🔌 providers/                 # React Context
│   └── 🛠️ utils/                     # Fonctions utilitaires
├── 🎨 sanity/                        # Sanity CMS
│   ├── schemas/                      # Schémas de contenu
│   │   ├── pages/                    # home, aboutPage, contactPage, etc.
│   │   ├── content/                  # prices, partners, testimonials
│   │   └── components/               # hero, basicImage, seo
│   ├── queries/                      # Requêtes GROQ
│   │   ├── home.ts                   # Homepage data
│   │   ├── sectors.ts                # Sector pages
│   │   ├── contact.ts                # Contact page
│   │   └── shared.ts                 # Fragments réutilisables
│   ├── types/                        # Types Sanity
│   │   ├── core/                     # PortableText, SanityImage, SEO
│   │   ├── content/                  # Prices, Spaces, Testimonials
│   │   └── pages/                    # HomePageData, SectorPageData
│   ├── helpers/                      # Optimisation images, transforms
│   ├── components/                   # Composants Sanity Studio
│   ├── client.ts                     # Client Sanity configuré
│   └── deskStructure.ts              # Navigation Studio
├── 📝 scripts/                       # Scripts maintenance
│   ├── clean/                        # Nettoyage Sanity
│   ├── tests/                        # Performance, Lighthouse
│   └── tools/                        # kill-ports.sh, etc.
├── ⚙️ Configuration
│   ├── .env.example                  # Template variables env
│   ├── .cursorrules.md               # Règles AI (Cursor)
│   ├── next.config.ts                # Next.js config
│   ├── sanity.config.ts              # Sanity config
│   ├── tsconfig.json                 # TypeScript config
│   ├── postcss.config.js             # PostCSS + Tailwind
│   ├── eslint.config.mjs             # ESLint
│   ├── components.json               # Shadcn/ui config
│   └── package.json                  # Dependencies + scripts
└── 📖 README.md
```

### Aliases de chemins (tsconfig.json)

```typescript
// Utiliser ces imports partout :
import { Button } from '@/components/ui/button'
import { sanityClient } from '@/sanity/client'
import type { HomePageData } from '@/sanity/types'
import { cn } from 'lib/utils'

// Aliases configurés :
// @/* → src/*
// lib/* → ./lib/*
// @/sanity/* → sanity/*
```

---

## ⚙️ Workflows de développement

### Scripts npm essentiels

#### Développement

```bash
# Mode développement (port 3000)
npm run dev

# Sanity Studio (port 3333)
npm run sanity

# Clean + restart (recommandé si problèmes de cache)
npm run refresh

# Tuer les ports dev (3000 + 3333)
npm run kill:dev
```

#### Production

```bash
# Build production
npm run build

# Serveur production (port 3100)
npm run start

# Serveur production sur port 3000
npm run start:dev

# Clean + build + start (test complet)
npm run review

# Analyse du bundle
npm run analyze
```

#### Maintenance Sanity

```bash
# Nettoyer médias non utilisés
npm run cleanup:media

# Vérifier intégrité des assets
npm run verify:assets

# Réparer références orphelines
npm run fix:orphans

# Nettoyer cache Sanity
npm run cleanup:sanity-cache

# Supprimer brouillons et assets associés
npm run delete:draft-assets
```

#### Tests & Performance

```bash
# Tests de performance
npm run perf

# Audit Lighthouse
npm run lighthouse

# Analyser rapports Lighthouse
npm run lighthouse:analyze

# Tester revalidation ISR
npm run test:revalidate

# Debug revalidation Vercel
npm run debug:vercel
```

### Workflow Git

#### Branches

- **`main`** : Production (auto-deploy Vercel)
- **`develop`** : Staging/développement
- **`feature/*`** : Nouvelles fonctionnalités
- **`fix/*`** : Corrections de bugs

#### Commits conventionnels

```bash
feat: ajout galerie photos page Nurserie
fix: correction validation email formulaire
docs: mise à jour README configuration Sanity
style: refactoring composant Button
refactor: optimisation queries GROQ
perf: amélioration chargement images
test: ajout tests composant ContactForm
chore: mise à jour dépendances
```

#### Workflow type

```bash
# 1. Créer une branche
git checkout -b feat/nouvelle-fonctionnalite

# 2. Développer et tester
npm run dev
npm run lint

# 3. Commit
git add .
git commit -m "feat: description de la fonctionnalité"

# 4. Push
git push origin feat/nouvelle-fonctionnalite

# 5. Créer PR vers develop
# (via GitHub UI)

# 6. Merge vers main pour déploiement
```

### Déploiement Vercel

- **Automatique** sur push vers `main`
- **Preview** sur chaque PR
- **Variables d'environnement** : Configurées dans Vercel Dashboard
- **Webhooks Sanity** : Déclenchent revalidation ISR

---

## 📐 Conventions et bonnes pratiques

### TypeScript

#### Strict mode activé

```typescript
// ✅ Toujours typer explicitement
export type ContactFormData = {
  nom: string
  prenom: string
  email: string
  phone: string
  sujet: string
  message: string
}

// ✅ Utiliser 'type' plutôt qu'interface
type ButtonProps = {
  variant: 'primary' | 'secondary'
  children: React.ReactNode
}

// ✅ Typer les composants React
export function Button({ variant, children }: ButtonProps): JSX.Element {
  // ...
}

// ✅ Utiliser les types Sanity générés
import type { HomePageData } from '@/sanity/types'
```

#### Éviter les any

```typescript
// ❌ Éviter any
function handleData(data: any) { }

// ✅ Utiliser unknown et type guard
function handleData(data: unknown) {
  if (isValidData(data)) {
    // TypeScript sait maintenant que data est ValidData
  }
}
```

### Nommage

#### Fichiers et composants

```typescript
// Composants React : PascalCase
Button.tsx
ContactForm.tsx
HeroSection.tsx

// Utilitaires : camelCase
utils.ts
imageHelpers.ts
formValidation.ts

// Types : camelCase avec .ts
form.ts (export type ContactFormData)
map.ts (export type MapLocation)

// Hooks : camelCase avec use*
useFormValidation.ts
useRecaptchaV2.ts
```

#### Variables et fonctions

```typescript
// Variables : camelCase
const userName = 'John'
const isFormValid = true

// Constantes : UPPER_SNAKE_CASE
const MAX_FILE_SIZE = 5000000
const API_BASE_URL = 'https://api.example.com'

// Fonctions : camelCase, verbe au début
function fetchUserData() { }
function validateEmail(email: string) { }
function handleSubmit() { }
```

### Styling avec Tailwind

#### Ordre des classes

```tsx
// Ordre recommandé :
// 1. Layout (flex, grid)
// 2. Positioning (absolute, relative)
// 3. Sizing (w-*, h-*)
// 4. Spacing (p-*, m-*)
// 5. Typography (text-*, font-*)
// 6. Visual (bg-*, border-*)
// 7. Effects (shadow-*, opacity-*)
// 8. Interactions (hover:, focus:)

<div className="flex flex-col relative w-full h-screen p-4 text-lg font-bold bg-purple-9 border border-orange-6 shadow-lg hover:bg-purple-10">
```

#### Utiliser cn() pour merge

```tsx
import { cn } from 'lib/utils'

function Button({ className, variant }: ButtonProps) {
  return (
    <button
      className={cn(
        'px-4 py-2 rounded-lg font-semibold transition',
        variant === 'primary' && 'bg-purple-9 text-white',
        variant === 'secondary' && 'bg-orange-3 text-orange-11',
        className
      )}
    >
      {children}
    </button>
  )
}
```

#### Palette de couleurs

```css
/* Couleurs principales (Radix Colors custom) */

/* Orange (neutre, remplace gray) */
bg-orange-1   /* Backgrounds très clairs */
bg-orange-3   /* Backgrounds clairs */
bg-orange-6   /* Borders */
text-orange-11 /* Texte principal */
text-orange-12 /* Texte contrasté */

/* Purple (accent) */
bg-purple-9   /* Boutons principaux */
bg-purple-10  /* Hover states */
text-purple-11 /* Liens */

/* Usage */
<Button className="bg-purple-9 hover:bg-purple-10 text-white" />
<Card className="bg-orange-1 border-orange-6" />
```

### Composants React

#### Structure d'un composant

```tsx
'use client' // Si nécessaire

import React from 'react'
import { cn } from 'lib/utils'
import type { ButtonProps } from '@/types'

/**
 * Composant Button avec variants
 *
 * @param variant - Style du bouton ('primary' | 'secondary' | 'outline')
 * @param size - Taille ('sm' | 'md' | 'lg')
 * @param children - Contenu du bouton
 */
export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-lg font-semibold transition',
        // Variants
        variant === 'primary' && 'bg-purple-9 text-white hover:bg-purple-10',
        variant === 'secondary' && 'bg-orange-3 text-orange-11 hover:bg-orange-4',
        // Sizes
        size === 'sm' && 'px-3 py-1.5 text-sm',
        size === 'md' && 'px-4 py-2 text-base',
        size === 'lg' && 'px-6 py-3 text-lg',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
```

#### Commentaires en français

```typescript
/**
 * Valide une adresse email
 *
 * @param email - Adresse email à valider
 * @returns true si valide, false sinon
 */
function validateEmail(email: string): boolean {
  // Regex simple pour validation email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}
```

### Performance

#### Lazy loading des composants

```tsx
// Pour composants lourds (maps, galleries)
import dynamic from 'next/dynamic'

const DynamicMap = dynamic(
  () => import('@/components/shared/maps/DynamicMap'),
  {
    ssr: false, // Pas de SSR pour Leaflet
    loading: () => <MapSkeleton />
  }
)
```

#### Optimisation des images

```tsx
import Image from 'next/image'
import { urlFor } from '@/sanity/helpers/imageOptimization'

// ✅ Utiliser Next/Image avec Sanity URL Builder
<Image
  src={urlFor(image).width(800).height(600).url()}
  alt={image.alt}
  width={800}
  height={600}
  loading="lazy"
  placeholder="blur"
  blurDataURL={image.lqip}
/>
```

---

## 🎨 Intégration Sanity CMS

### Structure des schémas

#### Pages (documents fixes)

```typescript
// sanity/schemas/pages/home.ts
export const home = {
  name: 'home',
  type: 'document',
  title: 'Page d\'accueil',
  fields: [
    {
      name: 'sectionHero',
      type: 'heroHome',
      title: 'Section Hero'
    },
    {
      name: 'sectionStructure',
      type: 'object',
      title: 'Section Structure',
      fields: [...]
    },
    {
      name: 'seo',
      type: 'seo',
      title: 'SEO'
    }
  ]
}
```

#### Collections (multiples documents)

```typescript
// sanity/schemas/content/prices.ts
export const prices = {
  name: 'prices',
  type: 'document',
  title: 'Tarifs',
  fields: [
    { name: 'title', type: 'string', title: 'Titre' },
    { name: 'price', type: 'number', title: 'Prix' },
    { name: 'frequency', type: 'string', title: 'Fréquence' },
    { name: 'subsidy', type: 'number', title: 'Subvention' }
  ]
}
```

### Requêtes GROQ

#### Exemple de requête complète

```typescript
// sanity/queries/home.ts
import { groq } from 'next-sanity'

export const homeQuery = groq`
  *[_type == "home"][0] {
    _id,
    sectionHero {
      title,
      subtitle,
      cta {
        text,
        url
      },
      image {
        asset->{
          _id,
          url,
          metadata {
            lqip,
            dimensions {
              width,
              height
            }
          }
        },
        alt
      }
    },
    sectionStructure {
      title,
      sectors[]-> {
        _id,
        title,
        slug {
          current
        },
        description
      }
    },
    seo {
      metaTitle,
      metaDescription,
      ogImage {
        asset->url
      }
    }
  }
`
```

#### Fetching des données

```typescript
// app/page.tsx
import { sanityClient } from '@/sanity/client'
import { homeQuery } from '@/sanity/queries/home'
import type { HomePageData } from '@/sanity/types'

export const revalidate = 60 // ISR cache 60s

export default async function HomePage() {
  const data: HomePageData = await sanityClient.fetch(homeQuery)

  return (
    <main>
      <HeroSection data={data.sectionHero} />
      <StructureSection data={data.sectionStructure} />
    </main>
  )
}
```

### ISR et revalidation

#### Webhook Sanity → Vercel

```typescript
// app/api/revalidate/route.ts
import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  // Vérifier secret
  const secret = req.nextUrl.searchParams.get('secret')
  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
  }

  // Parser le body
  const body = await req.json()
  const { _type } = body

  // Revalider selon le type de document
  switch (_type) {
    case 'home':
      revalidatePath('/')
      break
    case 'sectorPage':
      revalidatePath('/la-structure/[slug]')
      break
    case 'prices':
      revalidatePath('/tarifs')
      break
    default:
      revalidatePath('/')
  }

  return NextResponse.json({ revalidated: true, now: Date.now() })
}
```

#### Configuration dans Sanity

```
Webhook URL: https://www.garderielesptitsloups.ch/api/revalidate?secret=YOUR_SECRET
Trigger: On create, update, delete
```

### Optimisation des images Sanity

```typescript
// sanity/helpers/imageOptimization.ts
import imageUrlBuilder from '@sanity/image-url'
import { sanityClient } from '@/sanity/client'

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: any) {
  return builder.image(source)
}

// Usage
urlFor(image)
  .width(800)
  .height(600)
  .fit('crop')
  .format('webp')
  .quality(90)
  .url()
```

---

## 🛠️ Guide de tâches courantes

### Tâche 1 : Ajouter une nouvelle page

#### Étape 1 : Créer le schéma Sanity

```typescript
// sanity/schemas/pages/nouvellePagee.ts
export const nouvellePage = {
  name: 'nouvellePage',
  type: 'document',
  title: 'Nouvelle Page',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Titre',
      validation: (Rule) => Rule.required()
    },
    {
      name: 'content',
      type: 'array',
      title: 'Contenu',
      of: [{ type: 'block' }]
    },
    {
      name: 'seo',
      type: 'seo',
      title: 'SEO'
    }
  ]
}
```

#### Étape 2 : Ajouter au schéma principal

```typescript
// sanity/schemas/index.ts
import { nouvellePage } from './pages/nouvellePage'

export const schema = {
  types: [
    // ... autres schémas
    nouvellePage
  ]
}
```

#### Étape 3 : Créer la requête GROQ

```typescript
// sanity/queries/nouvellePage.ts
import { groq } from 'next-sanity'

export const nouvellePageQuery = groq`
  *[_type == "nouvellePage"][0] {
    _id,
    title,
    content,
    seo {
      metaTitle,
      metaDescription
    }
  }
`
```

#### Étape 4 : Créer le type TypeScript

```typescript
// sanity/types/pages/nouvellePage.ts
import type { PortableTextBlock, SEO } from '../core'

export type NouvellePageData = {
  _id: string
  title: string
  content: PortableTextBlock[]
  seo: SEO
}
```

#### Étape 5 : Créer la route Next.js

```typescript
// app/nouvelle-page/page.tsx
import { sanityClient } from '@/sanity/client'
import { nouvellePageQuery } from '@/sanity/queries/nouvellePage'
import type { NouvellePageData } from '@/sanity/types'

export const revalidate = 60

export default async function NouvellePage() {
  const data: NouvellePageData = await sanityClient.fetch(nouvellePageQuery)

  return (
    <main>
      <h1>{data.title}</h1>
      <RichTextRenderer content={data.content} />
    </main>
  )
}

export async function generateMetadata() {
  const data: NouvellePageData = await sanityClient.fetch(nouvellePageQuery)

  return {
    title: data.seo.metaTitle,
    description: data.seo.metaDescription
  }
}
```

### Tâche 2 : Créer un nouveau composant UI

```typescript
// components/ui/badge.tsx
'use client'

import React from 'react'
import { cn } from 'lib/utils'

type BadgeVariant = 'default' | 'success' | 'warning' | 'error'

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
}

/**
 * Composant Badge pour afficher des états ou catégories
 */
export function Badge({
  variant = 'default',
  children,
  className
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        variant === 'default' && 'bg-orange-3 text-orange-11',
        variant === 'success' && 'bg-green-3 text-green-11',
        variant === 'warning' && 'bg-yellow-3 text-yellow-11',
        variant === 'error' && 'bg-red-3 text-red-11',
        className
      )}
    >
      {children}
    </span>
  )
}
```

### Tâche 3 : Ajouter un hook personnalisé

```typescript
// hooks/useMediaQuery.ts
'use client'

import { useState, useEffect } from 'react'

/**
 * Hook pour détecter les media queries
 *
 * @param query - Media query CSS (ex: '(min-width: 768px)')
 * @returns true si la media query match, false sinon
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)

    // Initialiser la valeur
    if (media.matches !== matches) {
      setMatches(media.matches)
    }

    // Listener pour les changements
    const listener = () => setMatches(media.matches)
    media.addEventListener('change', listener)

    return () => media.removeEventListener('change', listener)
  }, [matches, query])

  return matches
}

// Usage
const isMobile = useMediaQuery('(max-width: 640px)')
const isDesktop = useMediaQuery('(min-width: 1024px)')
```

### Tâche 4 : Mettre à jour le formulaire de contact

```typescript
// components/forms/ContactForm.tsx
'use client'

import { useFormValidation } from '@/hooks/useFormValidation'
import { useRecaptchaV2 } from '@/hooks/useRecaptchaV2'
import { InputField } from './InputField'
import { TextareaField } from './TextareaField'
import { Button } from '@/components/ui/button'

export function ContactForm() {
  const {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit
  } = useFormValidation()

  const { recaptchaRef, executeRecaptcha } = useRecaptchaV2()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Obtenir token reCAPTCHA
    const token = await executeRecaptcha()

    // Soumettre le formulaire
    await handleSubmit({ ...formData, recaptchaToken: token })
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <InputField
        name="nom"
        label="Nom"
        value={formData.nom}
        onChange={handleChange}
        error={errors.nom}
        required
      />

      <InputField
        name="prenom"
        label="Prénom"
        value={formData.prenom}
        onChange={handleChange}
        error={errors.prenom}
        required
      />

      <InputField
        type="email"
        name="email"
        label="Email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        required
      />

      <TextareaField
        name="message"
        label="Message"
        value={formData.message}
        onChange={handleChange}
        error={errors.message}
        rows={6}
        required
      />

      <ReCAPTCHA ref={recaptchaRef} />

      <Button
        type="submit"
        variant="primary"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Envoi...' : 'Envoyer'}
      </Button>
    </form>
  )
}
```

### Tâche 5 : Optimiser les performances d'une page

#### Checklist performance

```typescript
// 1. Activer ISR
export const revalidate = 60

// 2. Lazy loading des composants lourds
const DynamicMap = dynamic(() => import('@/components/shared/maps/DynamicMap'), {
  ssr: false,
  loading: () => <Skeleton className="h-96" />
})

// 3. Optimiser les images
<Image
  src={imageUrl}
  alt={alt}
  width={800}
  height={600}
  loading="lazy"
  placeholder="blur"
  blurDataURL={lqip}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>

// 4. Limiter les requêtes Sanity
// Une seule requête par page avec tous les champs nécessaires

// 5. Utiliser font-display: swap
// Configuré dans src/styles/fonts.css

// 6. Minifier les bundles
// Automatique avec Next.js production build

// 7. Analyser le bundle
npm run analyze
```

---

## 🔒 Sécurité et performance

### Variables d'environnement critiques

```bash
# .env.local (NE JAMAIS COMMIT)

# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=skXXXXXXXXXXXXXX

# Secrets revalidation
SANITY_REVALIDATE_SECRET=super_secret_random_string

# Email Resend
RESEND_API_KEY=re_XXXXXXXXXXXX
NEXT_PUBLIC_CONTACT_EMAIL=contact@garderielesptitsloups.ch

# reCAPTCHA v2
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6LeXXXXXXXXXXXXXXX
RECAPTCHA_SECRET_KEY=6LeXXXXXXXXXXXXXXX

# Site URL (important SEO)
NEXT_PUBLIC_SITE_URL=https://www.garderielesptitsloups.ch
```

### Points de sécurité critiques

#### 1. Validation formulaire multi-couches

```typescript
// Client : Zod schema
const contactSchema = z.object({
  nom: z.string().min(2, 'Minimum 2 caractères'),
  email: z.string().email('Email invalide'),
  message: z.string().min(10, 'Minimum 10 caractères')
})

// Serveur : Re-validation
const body = await req.json()
const validatedData = contactSchema.parse(body)
```

#### 2. reCAPTCHA v2

```typescript
// Vérifier le token côté serveur
const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`
})

const data = await response.json()
if (!data.success) {
  return NextResponse.json({ error: 'reCAPTCHA failed' }, { status: 400 })
}
```

#### 3. Honeypot anti-bot

```typescript
// Champ invisible dans le formulaire
<input
  type="text"
  name="website"
  style={{ display: 'none' }}
  tabIndex={-1}
  autoComplete="off"
/>

// Serveur : Rejeter si rempli
if (formData.website) {
  return NextResponse.json({ error: 'Bot detected' }, { status: 400 })
}
```

#### 4. Headers de sécurité

```typescript
// next.config.ts
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        { key: 'X-DNS-Prefetch-Control', value: 'on' }
      ]
    }
  ]
}
```

### Performance - Core Web Vitals

#### Objectifs Lighthouse

- **Performance** : > 90
- **Accessibility** : > 95
- **Best Practices** : > 95
- **SEO** : 100

#### Optimisations clés

```typescript
// 1. LCP (Largest Contentful Paint) < 2.5s
// - Hero image avec LQIP
// - Critical CSS inline
// - Preload fonts

// 2. FID (First Input Delay) < 100ms
// - Lazy loading des composants non-critiques
// - Code splitting automatique Next.js

// 3. CLS (Cumulative Layout Shift) < 0.1
// - Dimensions explicites pour images
// - Skeleton screens
// - Pas de contenu injecté dynamiquement en haut de page
```

---

## 🐛 Troubleshooting

### Problèmes courants

#### 1. Port déjà utilisé

```bash
# Erreur : Port 3000 already in use
npm run kill:dev

# Ou manuellement
lsof -ti:3000 | xargs kill -9
```

#### 2. Cache Next.js corrompu

```bash
# Nettoyer le cache
npm run clean

# Ou complet
rm -rf .next
npm install
npm run dev
```

#### 3. Images Sanity ne chargent pas

```typescript
// Vérifier next.config.ts
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'cdn.sanity.io',
      pathname: '/images/**'
    }
  ]
}

// Vérifier que l'URL est bien générée
console.log(urlFor(image).width(800).url())
```

#### 4. Formulaire ne s'envoie pas

```typescript
// 1. Vérifier reCAPTCHA site key
console.log(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY)

// 2. Vérifier API route
// Tester avec curl :
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"nom":"Test","email":"test@example.com","message":"Test"}'

// 3. Vérifier Resend API key
console.log(process.env.RESEND_API_KEY)
```

#### 5. ISR ne se revalide pas

```typescript
// 1. Vérifier secret webhook
console.log(process.env.SANITY_REVALIDATE_SECRET)

// 2. Tester manuellement
curl -X POST 'https://www.garderielesptitsloups.ch/api/revalidate?secret=YOUR_SECRET' \
  -H "Content-Type: application/json" \
  -d '{"_type":"home"}'

// 3. Vérifier logs Vercel
// Dashboard Vercel > Functions > /api/revalidate
```

#### 6. TypeScript errors après npm install

```bash
# Régénérer les types
rm -rf .next
npm run dev

# Ou forcer la compilation
npx tsc --noEmit
```

#### 7. Styles Tailwind ne s'appliquent pas

```typescript
// 1. Vérifier postcss.config.js
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}

// 2. Vérifier import dans globals.css
@import "tailwindcss";

// 3. Redémarrer le serveur
npm run clean && npm run dev
```

### Logs et debugging

```typescript
// Activer logs Sanity queries
// sanity/client.ts
export const sanityClient = createClient({
  ...config,
  useCdn: process.env.NODE_ENV === 'production',
  stega: {
    enabled: process.env.NODE_ENV === 'development',
    studioUrl: 'http://localhost:3333'
  },
  // Logger personnalisé
  logger: console
})

// DevTools composant
// components/dev/DevJsonViewer.tsx
<DevJsonViewer data={data} />
```

---

## 📚 Ressources et documentation

### Documentation officielle

- [Next.js 15](https://nextjs.org/docs)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [Sanity](https://www.sanity.io/docs)
- [Shadcn UI](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/primitives)

### Documentation du projet

Consultez le dossier `docs/` pour :

- **[Setup](docs/setup/)** - Installation et configuration
- **[Sanity CMS](docs/sanity/)** - Schémas et queries
- **[Features](docs/features/)** - Composants et fonctionnalités
- **[Performance](docs/performance/)** - SEO et optimisations
- **[Tests](docs/tests/)** - Tests et validation

### Scripts utiles

Voir `scripts/README.md` pour tous les scripts de maintenance.

---

## ✅ Checklist avant commit

### Pour les assistants IA

Avant chaque commit, vérifier :

- [ ] **TypeScript** : Pas d'erreurs (`npx tsc --noEmit`)
- [ ] **ESLint** : Code conforme (`npm run lint`)
- [ ] **Build** : Build réussit (`npm run build`)
- [ ] **Types** : Tous les types définis
- [ ] **Commentaires** : En français, clairs
- [ ] **Imports** : Utiliser les aliases (`@/*`, `lib/*`)
- [ ] **Styles** : Tailwind uniquement, pas d'inline styles
- [ ] **Images** : Next/Image avec alt text
- [ ] **Accessibilité** : ARIA labels, semantic HTML
- [ ] **Performance** : Lazy loading si nécessaire
- [ ] **Sécurité** : Pas de secrets dans le code

---

## 🎯 Résumé pour AI

Ce projet est un **site web Next.js 15 pour une garderie suisse** avec :

✅ **Moderne** : Next.js 15, React 19, TypeScript strict
✅ **Performant** : SSG + ISR, images optimisées, code splitting
✅ **Accessible** : WCAG 2.1 AA, semantic HTML, ARIA
✅ **Sécurisé** : reCAPTCHA, validation multi-couches, secrets env
✅ **Maintenable** : Code modulaire, typage strict, documentation

### Approche recommandée

1. **Lire ce fichier entièrement** avant toute modification
2. **Utiliser le français** pour tout (code, commits, commentaires)
3. **Respecter les conventions** TypeScript et Tailwind
4. **Tester localement** avant commit (`npm run dev`)
5. **Documenter** toute nouvelle fonctionnalité

### Commandes essentielles

```bash
npm run dev        # Développement (port 3000)
npm run sanity     # Sanity Studio (port 3333)
npm run refresh    # Clean + restart
npm run build      # Build production
npm run lint       # Vérifier le code
```

---

**Date de création** : 2025-12-03
**Dernière mise à jour** : 2025-12-03
**Version** : 1.0.0

**Maintenu par** : Ricardo Do Vale
**Contact** : contact@garderielesptitsloups.ch
