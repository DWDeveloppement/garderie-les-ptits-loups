# 🏗️ Architecture du Projet - Garderie Les P'tits Loups

## 📋 Vue d'Ensemble

Documentation complète de l'architecture technique : structure du code, design system, hooks personnalisés et conventions de développement.

---

## 📁 Structure du Code

### Arborescence Complète

```
📁 garderie-les-ptits-loups/
│
├── 📁 src/                         # Code source frontend
│   ├── 📁 app/                     # Next.js App Router
│   │   ├── page.tsx               # Page d'accueil
│   │   ├── layout.tsx             # Layout racine
│   │   ├── globals.css            # Styles globaux
│   │   ├── a-propos/              # Page À Propos
│   │   │   └── page.tsx
│   │   ├── contact/               # Page Contact
│   │   │   └── page.tsx
│   │   ├── tarifs/                # Page Tarifs
│   │   │   └── page.tsx
│   │   ├── la-structure/          # Pages Secteurs
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   └── api/                   # API Routes
│   │       └── contact/
│   │           └── route.ts
│   │
│   ├── 📁 components/             # Composants React
│   │   ├── gallery/              # Système de galerie
│   │   │   ├── Gallery.tsx
│   │   │   ├── LightboxCustom.tsx
│   │   │   └── GalleryWithLightbox.tsx
│   │   ├── layout/               # Header, Footer, Navigation
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── NavigationMenu.tsx
│   │   │   └── MobileMenu.tsx
│   │   ├── forms/                # Formulaires
│   │   │   ├── ContactForm.tsx
│   │   │   ├── InputField.tsx
│   │   │   ├── TextareaField.tsx
│   │   │   └── recaptcha-v2.tsx
│   │   ├── pages/                # Sections par page (modulaires)
│   │   │   ├── home/
│   │   │   ├── about/
│   │   │   ├── contact/
│   │   │   ├── horaires-tarifs/
│   │   │   └── sector/
│   │   ├── shared/               # Composants réutilisables
│   │   │   ├── maps/             # StaticMap, DynamicMap
│   │   │   ├── navigation/       # BottomBar, BackToTop
│   │   │   ├── pricing/          # AccordionPrice, PricingList
│   │   │   ├── feedback/         # Spinner, SuccessAnimation
│   │   │   ├── HeroGlobal.tsx
│   │   │   ├── ParalaxImage.tsx
│   │   │   └── Partners.tsx
│   │   ├── ui/                   # Primitives Radix UI
│   │   │   ├── accordion.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── callout.tsx
│   │   │   └── scroll-area.tsx
│   │   ├── icons/                # Système d'icônes
│   │   │   ├── Icon.tsx
│   │   │   └── registry.ts
│   │   └── dev/                  # Outils développement
│   │       └── DevJsonViewer.tsx
│   │
│   ├── 📁 lib/                    # Utilitaires et helpers
│   │   ├── sanity/               # Client et queries Sanity
│   │   │   ├── client.ts
│   │   │   ├── index.ts
│   │   │   ├── queries/
│   │   │   └── helpers/
│   │   └── performance/          # Mesure de performance
│   │       └── measure.ts
│   │
│   ├── 📁 hooks/                  # Hooks personnalisés
│   │   ├── useWindowSize.ts
│   │   ├── useScrollParallax.ts
│   │   ├── useLocalStorage.ts
│   │   └── useFormValidation.ts
│   │
│   ├── 📁 styles/                 # Styles et thème
│   │   ├── globals.css
│   │   └── palette.css
│   │
│   ├── 📁 types/                  # Types TypeScript
│   │   ├── queries/
│   │   ├── components.ts
│   │   └── breakpoints.ts
│   │
│   └── 📁 constants/              # Constantes
│       └── navigation_menu.ts
│
├── 📁 sanity/                     # Sanity Studio
│   ├── schemas/                  # Schémas de contenu
│   │   ├── pages/               # Schémas pages
│   │   ├── components/          # Composants réutilisables
│   │   ├── prices.ts
│   │   ├── spaces.ts
│   │   ├── testimonials.ts
│   │   └── index.ts
│   ├── components/               # Composants Studio
│   │   ├── GalleryInput.tsx
│   │   └── ReadOnlySlug.tsx
│   ├── deskStructure.ts          # Structure navigation Studio
│   └── sanity.config.ts          # Configuration Studio
│
├── 📁 public/                     # Assets statiques
│   ├── images/
│   └── icons/
│
├── 📁 scripts/                    # Scripts utilitaires
│   ├── fix-page.mjs
│   ├── fix-prices-types.mjs
│   ├── cleanup-unused-media.mjs
│   └── kill-ports.sh
│
├── 📁 docs/                       # Documentation
│
├── package.json                   # Dépendances
├── tsconfig.json                  # Configuration TypeScript
├── tailwind.config.ts             # Configuration Tailwind
├── next.config.ts                 # Configuration Next.js
└── .env.local                     # Variables d'environnement
```

---

## 🎨 Design System

### Palette de Couleurs

Le site utilise une palette personnalisée définie dans `src/styles/palette.css` basée sur Radix UI Colors.

#### Couleur Neutre : Orange

Remplace la couleur `gray` de Radix UI pour une identité visuelle unique.

```css
/* Variables CSS générées */
--orange-1: #fefcfb;    /* Background le plus clair */
--orange-2: #fff7ed;
--orange-3: #ffefd5;
--orange-4: #ffe4c2;
--orange-5: #fdd0a2;
--orange-6: #fdba74;
--orange-7: #fb923c;
--orange-8: #f97316;
--orange-9: #ea580c;
--orange-10: #c2410c;
--orange-11: #9a3412;   /* Texte standard */
--orange-12: #7c2d12;   /* Texte le plus foncé */
```

**Usage :**
- `bg-orange-1` à `bg-orange-3` : Backgrounds clairs
- `text-orange-11` : Texte standard
- `text-orange-12` : Titres et emphases
- `border-orange-6` : Bordures et séparateurs

#### Couleur d'Accent : Purple

Utilisée pour les éléments interactifs et les call-to-action.

```css
/* Variables CSS générées */
--purple-1: #fefcfe;    /* Background le plus clair */
--purple-2: #fbf7fe;
--purple-3: #f7edfe;
--purple-4: #f0dbff;
--purple-5: #e9c6ff;
--purple-6: #dda9f5;
--purple-7: #c77dde;
--purple-8: #a855f7;    /* Accent principal */
--purple-9: #9333ea;    /* Accent foncé */
--purple-10: #7e22ce;
--purple-11: #6b21a8;   /* Hover states */
--purple-12: #581c87;   /* States actifs */
```

**Usage :**
- `bg-purple-9` : Boutons primaires
- `text-purple-11` : Liens et actions
- `hover:bg-purple-10` : États de survol
- `border-purple-8` : Focus rings

### Composants UI

#### Composants de Base

| Composant | Fichier | Description | Props Principales |
|-----------|---------|-------------|-------------------|
| **Button** | `ui/Button.tsx` | Boutons avec variants | `variant`, `size`, `disabled` |
| **Card** | `ui/Card.tsx` | Conteneurs de contenu | `header`, `content`, `footer` |
| **Toast** | `ui/Toast.tsx` | Notifications | `type`, `message`, `duration` |
| **Spinner** | `ui/Spinner.tsx` | Loading indicators | `size`, `color` |
| **Success Animation** | `ui/SuccessAnimation.tsx` | Animation succès | `show`, `onComplete` |

#### Composants Partagés

| Composant | Fichier | Description |
|-----------|---------|-------------|
| **Hero** | `shared/Hero.tsx` | Section hero réutilisable |
| **ParallaxImage** | `shared/ParallaxImage.tsx` | Image avec effet parallax |
| **PricingList** | `shared/PricingList.tsx` | Accordéons de tarifs |
| **MobileNavigation** | `shared/MobileNavigation.tsx` | Barre navigation mobile |

#### Composants de Pages

### **Organisation des Composants (Nouvelle Structure)**

**Principe :** Séparation par responsabilité et réutilisabilité.

```
src/components/
├── gallery/          ← Système galerie (react-photo-album + YARL)
├── layout/           ← Header, Footer, Navigation (layout global)
├── forms/            ← Formulaires et champs
├── pages/            ← Sections modulaires par page
│   ├── about/        ← 6 sections (Hero, Intro, History, etc.)
│   ├── sector/       ← 5 sections (Hero, LinkedSpaces, etc.)
│   └── home/         ← 4 sections
├── shared/           ← Composants réutilisables
│   ├── maps/         ← StaticMap, DynamicMap
│   ├── navigation/   ← BottomBar, BackToTop, MobileNavigation
│   ├── pricing/      ← AccordionPrice, PricingList, SubsidiesTable
│   ├── feedback/     ← Spinner, SuccessAnimation
│   └── *.tsx         ← HeroGlobal, ParalaxImage, Partners, RichTextRenderer
├── ui/               ← Primitives Radix UI (accordion, button, card, etc.)
├── icons/            ← Système d'icônes (registry + Icon.tsx)
└── dev/              ← DevJsonViewer (debug only)
```

**Avantages :**
- ✅ Sections modulaires (1 section = 1 fichier)
- ✅ Réutilisabilité maximale
- ✅ Imports propres (`@/components/layout`, `@/components/shared/maps`)
- ✅ Testabilité individuelle
- ✅ Cohérence entre toutes les pages

### Responsive Breakpoints

Breakpoints Tailwind CSS alignés avec le design :

```typescript
// src/types/breakpoints.ts
export const BREAKPOINTS = {
  xs: 320,   // Mobile portrait
  sm: 640,   // Mobile landscape
  md: 768,   // Tablettes
  lg: 1024,  // Desktop
  xl: 1280,  // Large desktop
  '2xl': 1536, // Extra large
} as const

export type Breakpoint = keyof typeof BREAKPOINTS
```

**Usage dans les composants :**
```tsx
// Responsive classes Tailwind
<div className="px-4 md:px-8 lg:px-16">
  <h1 className="text-2xl md:text-3xl lg:text-4xl">
    {title}
  </h1>
</div>
```

---

## 🔧 Hooks Personnalisés

### Liste des Hooks

| Hook | Fichier | Description | Retour |
|------|---------|-------------|--------|
| `useWindowSize` | `hooks/useWindowSize.ts` | Taille fenêtre responsive | `{ width, height, isMobile, isTablet, isDesktop }` |
| `useScrollParallax` | `hooks/useScrollParallax.ts` | Effet parallax au scroll | `{ offsetY, scrollProgress }` |
| `useLocalStorage` | `hooks/useLocalStorage.ts` | Persistance localStorage | `[value, setValue, removeValue]` |
| `useFormValidation` | `hooks/useFormValidation.ts` | Validation formulaire | `{ validate, errors, isValid }` |
| `useConsoleLogs` | `hooks/useConsoleLogs.ts` | Logs visuels debug | `{ log, warn, error, success }` |

### Exemples d'Utilisation

#### useWindowSize

```tsx
import { useWindowSize } from '@/hooks/useWindowSize'

export function ResponsiveComponent() {
  const { isMobile, isTablet, isDesktop } = useWindowSize()
  
  return (
    <div>
      {isMobile && <MobileView />}
      {isTablet && <TabletView />}
      {isDesktop && <DesktopView />}
    </div>
  )
}
```

#### useLocalStorage

```tsx
import { useLocalStorage } from '@/hooks/useLocalStorage'

export function FormWithPersistence() {
  const [formData, setFormData] = useLocalStorage('contact-form', {})
  
  const handleSubmit = () => {
    // Données persistées automatiquement
    setFormData({ ...formData, submitted: true })
  }
  
  return <form onSubmit={handleSubmit}>...</form>
}
```

#### useScrollParallax

```tsx
import { useScrollParallax } from '@/hooks/useScrollParallax'

export function ParallaxHero() {
  const { offsetY } = useScrollParallax({ speed: 0.5 })
  
  return (
    <div style={{ transform: `translateY(${offsetY}px)` }}>
      <img src="/hero.jpg" alt="Hero" />
    </div>
  )
}
```

---

## 🎯 Conventions de Développement

### Naming Conventions

```typescript
// Composants : PascalCase
export function HeroSection() {}

// Hooks : camelCase avec préfixe "use"
export function useWindowSize() {}

// Utilitaires : camelCase
export function getImageProps() {}

// Types : PascalCase
export type SanityImage = {}

// Constants : UPPER_SNAKE_CASE
export const API_ENDPOINT = ''
```

### Structure des Fichiers

```
Component.tsx           # Composant React
Component.module.css    # Styles spécifiques (si nécessaire)
Component.test.tsx      # Tests unitaires
index.ts               # Exports du dossier
```

### Organisation des Imports

```typescript
// 1. Imports externes
import { useState } from 'react'
import { groq } from 'next-sanity'

// 2. Imports internes (alias @/)
import { Button } from '@/components/ui/Button'
import { useWindowSize } from '@/hooks/useWindowSize'

// 3. Imports relatifs
import { LocalComponent } from './LocalComponent'

// 4. Imports types
import type { SanityImage } from '@/types'

// 5. Imports CSS
import './styles.css'
```

### TypeScript Strict Mode

**Règles strictes appliquées :**
```typescript
// ✅ Aucun `any` toléré
// ✅ Types explicites pour toutes les fonctions
// ✅ Null-safety avec optional chaining
// ✅ Readonly pour les constantes

// Exemple
export function getImageProps(image: SanityBasicImage): NextImageProps {
  // Types stricts, pas de any
}
```

---

## 🎨 Design Tokens

### Spacing

```typescript
// Aligné avec Tailwind spacing scale
const SPACING = {
  0: '0',
  1: '0.25rem',  // 4px
  2: '0.5rem',   // 8px
  3: '0.75rem',  // 12px
  4: '1rem',     // 16px
  6: '1.5rem',   // 24px
  8: '2rem',     // 32px
  12: '3rem',    // 48px
  16: '4rem',    // 64px
}
```

### Typography

```css
/* Titres */
.text-h1 { font-size: 2.25rem; }   /* 36px */
.text-h2 { font-size: 1.875rem; }  /* 30px */
.text-h3 { font-size: 1.5rem; }    /* 24px */
.text-h4 { font-size: 1.25rem; }   /* 20px */

/* Corps */
.text-base { font-size: 1rem; }    /* 16px */
.text-sm { font-size: 0.875rem; }  /* 14px */
.text-xs { font-size: 0.75rem; }   /* 12px */
```

### Shadows

```css
/* Tailwind shadows */
.shadow-sm    /* Légère */
.shadow       /* Moyenne */
.shadow-md    /* Medium */
.shadow-lg    /* Large */
.shadow-xl    /* Extra large */
```

### Border Radius

```css
.rounded-none  /* 0 */
.rounded-sm    /* 0.125rem = 2px */
.rounded       /* 0.25rem = 4px */
.rounded-md    /* 0.375rem = 6px */
.rounded-lg    /* 0.5rem = 8px */
.rounded-xl    /* 0.75rem = 12px */
.rounded-2xl   /* 1rem = 16px */
.rounded-full  /* 9999px */
```

---

## 🔌 Intégrations Externes

### Sanity CMS

**Client Configuration :**
```typescript
// lib/sanity/client.ts
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: false, // SSG - pas de CDN
  token: process.env.SANITY_API_TOKEN,
})
```

**Wrapper avec Performance :**
```typescript
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  options: { tag?: string; cache?: RequestCache } = {}
): Promise<T> {
  return measureSanityQuery(options.tag || 'query', () =>
    client.fetch<T>(query, params, {
      cache: 'force-cache',
      next: { tags: options.tag ? [options.tag] : undefined },
    })
  )
}
```

### Resend (Email)

```typescript
// app/api/contact/route.ts
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

await resend.emails.send({
  from: 'onboarding@resend.dev',
  to: process.env.RESEND_TO_EMAIL,
  subject: 'Nouveau message de contact',
  html: emailTemplate,
})
```

### Google reCAPTCHA v2

```typescript
// Validation côté serveur
const verifyResponse = await fetch(
  'https://www.google.com/recaptcha/api/siteverify',
  {
    method: 'POST',
    body: new URLSearchParams({
      secret: process.env.RECAPTCHA_SECRET_KEY!,
      response: recaptchaToken,
    }),
  }
)
```

---

## 📦 Patterns de Développement

### Server Components (par défaut)

```tsx
// app/page.tsx
// Par défaut, c'est un Server Component
export default async function HomePage() {
  const data = await fetchHome()
  
  return <HomePageClient data={data} />
}
```

### Client Components (si nécessaire)

```tsx
// components/Gallery.tsx
'use client'

import { useState } from 'react'

export function Gallery({ photos }: GalleryProps) {
  const [index, setIndex] = useState(-1)
  // ... état côté client
}
```

### Data Fetching Pattern

```typescript
// 1. Query GROQ dans lib/sanity/queries/
export const HOME_QUERY = groq`...`

// 2. Fonction fetch avec cache
export async function fetchHome() {
  return sanityFetch(HOME_QUERY, {}, { tag: 'home-page' })
}

// 3. Utilisation dans Server Component
const data = await fetchHome()
```

### Error Handling

```typescript
// Pattern try/catch avec fallback
try {
  const data = await fetchData()
  return <Component data={data} />
} catch (error) {
  console.error('Error fetching data:', error)
  return <ErrorFallback />
}
```

---

## 🧪 Tests (Futur)

### Structure Tests

```
__tests__/
├── components/
│   ├── Button.test.tsx
│   └── Card.test.tsx
├── hooks/
│   └── useWindowSize.test.ts
└── utils/
    └── validation.test.ts
```

### Testing Stack (À implémenter)

- **Jest** : Test runner
- **React Testing Library** : Tests composants
- **Cypress** : Tests E2E
- **MSW** : Mock API routes

---

## 📚 Ressources

### Documentation Technique
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Radix UI](https://www.radix-ui.com/)

### Guidelines du Projet
- [Sanity](../sanity/SANITY.md) - Architecture CMS
- [Performance](../performance/LIGHTHOUSE.md) - Optimisations
- [Security](../setup/SECURITY.md) - Sécurité

---

**Dernière mise à jour :** Octobre 2024  
**Version :** 1.0.0

