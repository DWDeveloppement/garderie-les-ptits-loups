# CONVENTIONS - Garderie Les P'tits Loups

**Version:** 1.0.0
**Date:** 2024-11-24
**Statut:** Production

Ce document définit les conventions de structure, nommage et organisation pour le projet Garderie Les P'tits Loups (Next.js 15 + Sanity CMS).

---

## 📁 Structure du Projet

### Vue d'ensemble complète

```
garderie-les-ptits-loups/
├── src/
│   ├── app/                          # Next.js 15 App Router
│   │   ├── (pages)/                  # Routes groupées
│   │   ├── api/                      # API Routes
│   │   ├── studio/                   # Sanity Studio intégré
│   │   ├── globals.css               # Point d'entrée styles
│   │   ├── layout.tsx                # Layout principal
│   │   └── page.tsx                  # Homepage
│   │
│   ├── ui/                           # ✅ 1. Composants UI (Shadcn - 56 composants)
│   │   ├── button.tsx                # kebab-case
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   └── ...                       # 50+ composants
│   │
│   ├── components/                   # ✅ 2. Composants application (PascalCase)
│   │   ├── layout/                   # Header, Footer, Navigation
│   │   ├── shared/                   # Composants réutilisables
│   │   │   ├── maps/                 # StaticMap, DynamicMap
│   │   │   ├── navigation/           # BackToTop, BottomBar
│   │   │   ├── richtext/             # RichTextRenderer
│   │   │   └── pricing/              # SubsidiesTable
│   │   ├── forms/                    # ContactForm, InputField
│   │   ├── gallery/                  # Gallery, Lightbox
│   │   ├── pages/                    # Sections par page
│   │   │   ├── home/
│   │   │   ├── contact/
│   │   │   ├── horaires-tarifs/
│   │   │   └── sector/
│   │   ├── icons/                    # Icônes custom
│   │   ├── lazy/                     # Lazy loading
│   │   └── dev/                      # Debug components
│   │
│   ├── hooks/                        # ✅ 3. Hooks React (18 hooks)
│   │   ├── index.ts                  # Export centralisé
│   │   ├── useButtonA11y.ts          # Accessibilité (8)
│   │   ├── useMaps.ts                # Composants (2)
│   │   ├── useFormValidation.ts      # Formulaires (3)
│   │   ├── useQueries.ts             # Requêtes (1)
│   │   ├── useConsoleLogs.ts         # Tests (1)
│   │   ├── useScroll.ts              # Utilitaires (2)
│   │   └── useWindowSize.ts
│   │
│   ├── styles/                       # ✅ 4. Styles modulaires
│   │   ├── globals/                  # Système de design
│   │   │   ├── globals.css           # Point d'entrée
│   │   │   ├── palette.css           # Layer 1: Couleurs OKLCH
│   │   │   ├── theme.css             # Layer 2: Rôles sémantiques
│   │   │   ├── fonts.css             # Layer 3: Typographie
│   │   │   └── fluid-variables.css   # Layer 4: Sizing fluide
│   │   ├── frontend/                 # Styles frontend
│   │   │   ├── animations.css
│   │   │   ├── images.css
│   │   │   └── lightbox.css
│   │   └── sanity/                   # Styles Sanity (futur)
│   │
│   ├── types/                        # ✅ 5. Types par domaine
│   │   ├── index.ts
│   │   ├── frontend/                 # Types frontend
│   │   │   ├── breakpoints.ts
│   │   │   ├── map.ts
│   │   │   ├── richText.ts
│   │   │   └── components/
│   │   └── sanity/                   # Types Sanity
│   │       ├── core/                 # image, portableText
│   │       ├── content/              # general, prices
│   │       └── pages/                # home, about, contact...
│   │
│   ├── sanity/                       # ✅ 6. Code Sanity CMS
│   │   ├── sanity.config.ts
│   │   ├── schema.ts
│   │   ├── deskStructure.ts
│   │   ├── schemas/
│   │   │   ├── components/           # hero, basicImage, seo
│   │   │   └── pages/                # home, about, contact
│   │   ├── lib/                      # Utilitaires
│   │   ├── components/               # Composants Studio
│   │   └── queries/                  # Exemples GROQ
│   │
│   └── lib/                          # ✅ 7. Utilitaires généraux
│       └── utils.ts
│
├── public/                           # Assets statiques
├── scripts/                          # Scripts maintenance
├── docs/                             # Documentation projet
├── .ressources/                      # Références
└── Configuration files                # .prettierrc, .editorconfig, etc.
```

---

## 🎯 Conventions de Nommage

### Tableau récapitulatif

| Type | Fichier | Composant/Fonction | Exemple |
|------|---------|-------------------|---------|
| **Composants UI** | `kebab-case.tsx` | `PascalCase` | `button.tsx` → `Button` |
| **Composants App** | `PascalCase.tsx` | `PascalCase` | `Header.tsx` → `Header` |
| **Hooks** | `use*.ts` | `use*` | `useButtonA11y.ts` |
| **Types** | `kebab-case.ts` | `PascalCase+Suffixe` | `button.ts` → `ButtonProps` |
| **Styles** | `kebab-case.css` | n/a | `palette.css` |
| **Utilitaires** | `kebab-case.ts` | `camelCase` | `utils.ts` → `cn()` |

### Détails par catégorie

#### 1. Composants UI (`src/ui/`)

✅ **Correct:**
```typescript
// Fichier: src/ui/button.tsx
export function Button({ variant, ...props }: ButtonProps) {
  return <button {...props} />
}
```

❌ **À éviter:**
```typescript
// Fichier: src/ui/Button.tsx (PascalCase)
```

**Rationale:** Shadcn utilise kebab-case pour distinguer UI primitives des composants métier.

---

#### 2. Composants App (`src/components/`)

##### Layout (`src/components/layout/`)

✅ **Correct:**
```typescript
// Fichier: src/components/layout/Header.tsx
export function Header() {
  return <header>...</header>
}
```

##### Shared (`src/components/shared/`)

✅ **Correct:**
```typescript
// Fichier: src/components/shared/richtext/RichTextRenderer.tsx
export function RichTextRenderer({ content }: { content: PortableTextBlock[] }) {
  return <PortableText value={content} />
}
```

##### Pages (`src/components/pages/`)

✅ **Correct:**
```typescript
// Fichier: src/components/pages/home/HeroSection.tsx
export function HeroSection({ data }: { data: HeroData }) {
  return <section>...</section>
}
```

---

#### 3. Hooks (`src/hooks/`)

✅ **Correct:**
```typescript
// Fichier: src/hooks/useButtonA11y.ts
export function useButtonA11y() {
  return { role: 'button', tabIndex: 0 }
}

// Export dans index.ts
export * from './useButtonA11y'
```

**Usage:**
```typescript
import { useButtonA11y } from '@/hooks'
```

---

#### 4. Types (`src/types/`)

✅ **Correct:**
```typescript
// Fichier: src/types/frontend/components/button.ts
export interface ButtonProps {
  variant?: 'default' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
}

// Fichier: src/types/sanity/pages/home.ts
export interface HomePage {
  _type: 'homePage'
  hero: HeroData
}
```

**Suffixes:**
- `Props` : Props composants
- `Data` : Données Sanity
- `Type` : Types nécessitant distinction

---

## 📦 Path Aliases & Imports

### Configuration (`tsconfig.json`)

```json
{
  "paths": {
    "@/*": ["src/*"],
    "@/ui/*": ["src/ui/*"],
    "@/hooks/*": ["src/hooks/*"],
    "@/types/*": ["src/types/*"],
    "@/sanity/*": ["src/sanity/*"],
    "@lib/*": ["lib/*"]
  }
}
```

### Ordre des imports

✅ **Correct:**
```typescript
// 1. React & Next.js
import { useState } from 'react'
import Link from 'next/link'

// 2. Bibliothèques tierces
import { PortableText } from '@portabletext/react'

// 3. Composants UI
import { Button } from '@/ui/button'
import { Card } from '@/ui/card'

// 4. Composants App
import { Header } from '@/components/layout/Header'
import { RichTextRenderer } from '@/components/shared/richtext/RichTextRenderer'

// 5. Hooks
import { useButtonA11y } from '@/hooks'

// 6. Utilitaires
import { cn } from '@/lib/utils'

// 7. Types
import type { ButtonProps } from '@/types/frontend/components/button'

// 8. Styles (si nécessaire)
import './styles.css'
```

---

## 🎨 Système de Styles - 5 Couches

### Architecture

```css
/* src/styles/globals/globals.css */

/* Layer 1: Palette - Couleurs brutes OKLCH */
@import './palette.css';

/* Layer 2: Theme - Rôles sémantiques */
@import './theme.css';

/* Layer 3: Fonts - Typographie */
@import './fonts.css';

/* Layer 4: Fluid - Sizing responsive */
@import './fluid-variables.css';

/* Layer 5: Tailwind CSS v4 */
@import 'tailwindcss';

/* Frontend styles */
@import '../frontend/animations.css';
```

### Layer 1: Palette

```css
/* palette.css - Couleurs brutes */
:root {
  --purple-1: oklch(0.98 0.01 282);
  --purple-9: oklch(0.50 0.15 282);
  --orange-1: oklch(0.98 0.02 45);
  --orange-9: oklch(0.70 0.20 45);
}
```

### Layer 2: Theme

```css
/* theme.css - Mapping sémantique */
:root {
  --background: var(--purple-2);
  --foreground: var(--orange-11);
  --primary: var(--purple-9);
  --secondary: var(--orange-9);
}
```

### Layer 3: Fonts

```css
/* fonts.css - Typographie */
:root {
  --font-sans: 'Open Sans', sans-serif;
  --font-display: 'Chelsea Market', cursive;
}
```

### Layer 4: Fluid

```css
/* fluid-variables.css - Sizing fluide */
:root {
  --fl-text-base: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
  --fl-text-2xl: clamp(1.5rem, 1.35rem + 0.75vw, 1.875rem);
}
```

---

## 🧩 Sanity CMS

### Organisation

```
src/sanity/
├── sanity.config.ts          # Config Studio
├── schema.ts                 # Point d'entrée schémas
├── schemas/
│   ├── components/           # Composants réutilisables
│   │   ├── hero.ts
│   │   ├── basicImage.ts
│   │   └── seo.ts
│   └── pages/                # Schémas pages
│       ├── home.ts
│       └── contact.ts
└── lib/                      # Utilitaires
```

### Exemple schéma

```typescript
// src/sanity/schemas/pages/home.ts
export const homePageSchema = defineType({
  name: 'homePage',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      type: 'hero', // Réutilise composant
    }),
  ],
})
```

---

## ✅ Best Practices

### Composants UI

✅ **DO:**
- Pas de logique métier
- Props typées
- Export nommé
- Variantes via CVA

❌ **DON'T:**
- Fetch de données
- Hooks métier
- Duplication Shadcn

### Composants App

✅ **DO:**
- Utiliser composants UI
- Server Components Next.js
- Props typées
- Composition

❌ **DON'T:**
- Dupliquer logique
- Fetch dans UI
- Mélanger concerns

### Hooks

✅ **DO:**
- Préfixe `use*`
- Export via `index.ts`
- Documentation JSDoc
- Tests unitaires

❌ **DON'T:**
- Duplication
- Side effects non documentés
- Dépendances circulaires

### Styles

✅ **DO:**
- Système 5 couches
- Variables CSS
- Tailwind utility-first
- Fluid typography

❌ **DON'T:**
- Hardcode couleurs
- Dupliquer variables
- Ignorer layers

---

## 📋 Checklist Compliance

### Nouveau composant

- [ ] Bon dossier (`ui/`, `layout/`, `shared/`, `pages/`)
- [ ] Convention nommage respectée
- [ ] Imports ordonnés
- [ ] Types importés depuis `@/types/*`
- [ ] Export nommé

### Nouveau hook

- [ ] Préfixe `use*`
- [ ] Dans `src/hooks/`
- [ ] Export dans `index.ts`
- [ ] Types dans `@/types/frontend/`

### Nouveau style

- [ ] Variables CSS (pas hardcode)
- [ ] Suit système 5 couches
- [ ] Classes kebab-case
- [ ] Fluid typography

### Type Sanity

- [ ] Dans `src/types/sanity/`
- [ ] Suffixe cohérent
- [ ] Export dans `index.ts`
- [ ] Schema correspondant

---

## 🔄 Migration Guide

| Ancien | Nouveau | Status |
|--------|---------|--------|
| `src/components/ui/button.tsx` | `src/ui/button.tsx` | ✅ Migré |
| `packages/ui/components/card.tsx` | `src/ui/card.tsx` | ✅ Migré |
| `hooks/a11y/useButtonA11y.ts` | `src/hooks/useButtonA11y.ts` | ✅ Migré |
| `sanity/types/pages/home.ts` | `src/types/sanity/pages/home.ts` | ✅ Migré |
| `sanity/schemas/pages/home.ts` | `src/sanity/schemas/pages/home.ts` | ✅ Migré |

---

## 📚 Ressources

### Documentation

- [Next.js 15](https://nextjs.org/docs)
- [Sanity CMS](https://www.sanity.io/docs)
- [Shadcn UI](https://ui.shadcn.com/)
- [Tailwind v4](https://tailwindcss.com/)

### Scripts

```bash
npm run dev              # Dev server
npm run build            # Build production
npm run type-check       # Vérifier types
npm run lint             # Linter
npm run lint:fix         # Fix linting
npm run format           # Format Prettier
npm run sanity           # Sanity Studio
```

---

**Dernière mise à jour:** 2024-11-24
**Version:** 1.0.0
**Auteur:** Claude Code
