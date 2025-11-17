# 🎯 Réorganisation des Types Sanity - ✅ COMPLÉTÉ

**Date** : 2024  
**Statut** : ✅ Migration terminée  
**Objectif** : Centraliser tous les types Sanity dans `sanity/types/` pour une meilleure organisation et cohérence

---

## 📋 Problème Actuel

Les types Sanity sont actuellement **dispersés** dans plusieurs emplacements :

```
src/types/
├── sanity/                      # Types Sanity partiels
│   ├── portableText.ts
│   ├── sectorPage.ts
│   └── index.ts
├── queries/                     # Types de réponses de queries
│   ├── about.ts
│   ├── contact.ts
│   ├── home.ts
│   └── ...
└── sanity.ts                    # Types généraux Sanity (PriceDocument, etc.)

lib/sanity/queries/
└── prices.ts                    # Types inline dans les queries
```

**Problèmes** :

- ❌ Confusion sur où trouver les types Sanity
- ❌ Types liés à Sanity dispersés dans `src/` alors que tout le reste est dans `sanity/`
- ❌ Incohérence avec la structure `sanity/components/`, `sanity/lib/`, `sanity/queries/`
- ❌ Difficulté à maintenir et documenter

---

## 🎯 Proposition de Structure

Créer un dossier `sanity/types/` pour centraliser **TOUS** les types liés à Sanity :

```
sanity/
├── components/                  # Composants Sanity Studio (existant)
├── lib/                         # Utilitaires Sanity (existant)
├── queries/                     # Queries GROQ (existant)
├── schemas/                     # Schémas Sanity (existant)
│
└── types/                       # ✨ NOUVEAU - Types TypeScript Sanity
    ├── index.ts                 # Barrel export principal
    │
    ├── core/                    # Types de base Sanity
    │   ├── portableText.ts      # Types Portable Text
    │   ├── image.ts             # Types d'images Sanity
    │   ├── document.ts          # Types de documents de base
    │   └── index.ts
    │
    ├── pages/                   # Types de pages
    │   ├── home.ts
    │   ├── about.ts
    │   ├── contact.ts
    │   ├── schedule.ts
    │   ├── sectorPage.ts
    │   └── index.ts
    │
    ├── content/                 # Types de contenu
    │   ├── prices.ts            # Types de prix et tarifs
    │   ├── partners.ts
    │   ├── testimonials.ts
    │   ├── spaces.ts
    │   ├── structures.ts
    │   └── index.ts
    │
    ├── queries/                 # Types de réponses de queries
    │   ├── about.ts             # Types de réponses about
    │   ├── contact.ts
    │   ├── home.ts
    │   └── index.ts
    │
    └── validation.ts            # Types de validation Sanity
```

---

## 📐 Structure Détaillée

### 1. `sanity/types/core/` - Types de base

Types fondamentaux réutilisés partout :

```
sanity/types/core/
├── portableText.ts              # PortableTextBlock, PortableTextSpan, etc.
├── image.ts                     # SanityImage, SanityImageAssetRef, etc.
├── document.ts                  # Types de base des documents
└── index.ts
```

**Contenu** :

- Types déplacés depuis `src/types/sanity/portableText.ts`
- Types déplacés depuis `src/types/sanity/sectorPage.ts` (images)
- Types de base des documents Sanity

### 2. `sanity/types/pages/` - Types de pages

Types spécifiques à chaque page :

```
sanity/types/pages/
├── home.ts                      # HomePageData
├── about.ts                     # AboutPageData
├── contact.ts                   # ContactPageData
├── schedule.ts                  # SchedulePageData
├── sectorPage.ts                # SectorPageData (types de page secteur)
└── index.ts
```

**Contenu** :

- Types déplacés depuis `src/types/queries/` (home, about, contact, etc.)
- Types spécifiques à chaque page

### 3. `sanity/types/content/` - Types de contenu

Types pour le contenu géré par Sanity :

```
sanity/types/content/
├── prices.ts                    # PriceDocument, SubsidiesDocument, etc.
├── partners.ts                  # PartnerDocument
├── testimonials.ts              # TestimonialDocument
├── spaces.ts                    # SpaceDocument
├── structures.ts                # StructureDocument
└── index.ts
```

**Contenu** :

- Types déplacés depuis `src/types/sanity.ts` (PriceDocument, News, Activity, Staff, etc.)
- Types déplacés depuis `lib/sanity/queries/prices.ts`

### 4. `sanity/types/queries/` - Types de réponses

Types spécifiques aux réponses des queries (si différent des types de pages) :

```
sanity/types/queries/
├── about.ts                     # Types de réponse about query
├── contact.ts                   # Types de réponse contact query
└── index.ts
```

**Note** : Si les types de pages et les types de réponses sont identiques, on peut fusionner avec `pages/`.

### 5. `sanity/types/validation.ts` - Types de validation

Types pour la validation Sanity :

```typescript
// sanity/types/validation.ts
export type SanityValidationRule = {
  required: () => SanityValidationRule
  min: (value: number) => SanityValidationRule
  max: (value: number) => SanityValidationRule
  custom: (fn: (value: unknown) => string | true) => SanityValidationRule
}
```

---

## 🔄 Migration Proposée

### ✅ Étape 1 : Créer la structure - COMPLÉTÉ

```bash
mkdir -p sanity/types/{core,pages,content}
```

### ✅ Étape 2 : Déplacer les fichiers - COMPLÉTÉ

1. **Types de base** :
   - ✅ `src/types/sanity/portableText.ts` → `sanity/types/core/portableText.ts`
   - ✅ `src/types/sanity/sectorPage.ts` (partie images) → `sanity/types/core/image.ts`
   - ✅ `src/types/sanity/sectorPage.ts` (partie page) → `sanity/types/pages/sectorPage.ts`

2. **Types de pages** :
   - ✅ `src/types/queries/home.ts` → `sanity/types/pages/home.ts`
   - ✅ `src/types/queries/about.ts` → `sanity/types/pages/about.ts`
   - ✅ `src/types/queries/contact.ts` → `sanity/types/pages/contact.ts`
   - ✅ `src/types/queries/schedulePage.ts` → `sanity/types/pages/schedule.ts`
   - ✅ Tous les autres types de pages migrés

3. **Types de contenu** :
   - ✅ `src/types/sanity.ts` (PriceDocument, etc.) → `sanity/types/content/prices.ts`
   - ✅ Types de contenu général → `sanity/types/content/general.ts`

4. **Types de validation** :
   - ✅ `src/types/sanity.ts` (SanityValidationRule) → `sanity/types/validation.ts`

### ✅ Étape 3 : Créer les barrel exports - COMPLÉTÉ

```typescript
// sanity/types/index.ts
export * from './core'
export * from './pages'
export * from './content'
export * from './queries'
export * from './validation'
```

### ✅ Étape 4 : Mettre à jour les imports - COMPLÉTÉ

Remplacé tous les imports dans :
- ✅ `src/components/`
- ✅ `lib/sanity/queries/`
- ✅ `src/hooks/queries/`
- ✅ Tous les fichiers utilisant les types Sanity

Imports mis à jour :
- ✅ `@/types/sanity/*` → `@/sanity/types/*`
- ✅ `@/types/queries/*` → `@/sanity/types/pages/*`
- ✅ Ajouté alias `@/sanity/*` dans `tsconfig.json`

### ✅ Étape 5 : Nettoyer - COMPLÉTÉ

- ✅ `src/types/sanity/` vidé (reste comme placeholder)
- ✅ `src/types/queries/index.ts` créé avec re-exports de compatibilité (déprécié)

---

## ✅ Avantages

1. **Cohérence** : Tous les éléments Sanity dans le même dossier `sanity/`
2. **Clarté** : Structure claire par catégorie (core, pages, content, queries)
3. **Maintenabilité** : Un seul endroit pour les types Sanity
4. **Documentation** : Plus facile à documenter et comprendre
5. **Séparation** : Types Sanity séparés des types applicatifs Next.js

---

## 📝 Checklist de Migration

### ✅ Phase 1 : Préparation - COMPLÉTÉ

- [x] Créer la structure de dossiers `sanity/types/`
- [x] Documenter la nouvelle structure

### ✅ Phase 2 : Migration - COMPLÉTÉ

- [x] Déplacer les types de base (`core/`)
- [x] Déplacer les types de pages (`pages/`)
- [x] Déplacer les types de contenu (`content/`)
- [x] Déplacer les types de validation (`validation.ts`)
- [x] Créer les barrel exports

### ✅ Phase 3 : Mise à jour - COMPLÉTÉ

- [x] Rechercher et remplacer tous les imports dans `src/`
- [x] Mettre à jour les imports dans `lib/sanity/queries/`
- [x] Ajouter alias `@/sanity/*` dans `tsconfig.json`
- [x] Vérifier que tout compile (build réussi)

### ✅ Phase 4 : Nettoyage - COMPLÉTÉ

- [x] Nettoyer les anciens dossiers (vidés)
- [x] Créer re-exports de compatibilité dans `src/types/queries/index.ts`
- [x] Mettre à jour la documentation

---

## 🔍 Imports Exemples Après Migration

### Avant

```typescript
// src/components/pages/home/HeroSection.tsx
import type { HomePageData } from '@/types/queries/home'
import type { PortableTextBlock } from '@/types/sanity/portableText'
import type { SanityImage } from '@/types/sanity/sectorPage'
```

### Après

```typescript
// src/components/pages/home/HeroSection.tsx
import type {
  HomePageData,
  PortableTextBlock,
  SanityImage
} from '@/sanity/types'
```

**OU** avec imports plus spécifiques :

```typescript
import type { HomePageData } from '@/sanity/types/pages'
import type { PortableTextBlock } from '@/sanity/types/core'
import type { SanityImage } from '@/sanity/types/core'
```

---

## 🎯 Structure Finale

```
sanity/
├── components/                  # Composants Sanity Studio
├── lib/                         # Utilitaires Sanity
├── queries/                     # Queries GROQ
├── schemas/                     # Schémas de contenu
├── types/                       # ✨ Types TypeScript (NOUVEAU)
│   ├── core/                   # Types de base
│   ├── pages/                  # Types de pages
│   ├── content/                # Types de contenu
│   └── validation.ts           # Types de validation
└── config/                      # Configuration Sanity
```

**Résultat** : Structure cohérente et organisée où **tout ce qui concerne Sanity** est dans le dossier `sanity/` !

---

**✅ Migration terminée** : Tous les types Sanity ont été centralisés dans `sanity/types/`. La structure est maintenant cohérente avec `sanity/components/` et `sanity/lib/`.
