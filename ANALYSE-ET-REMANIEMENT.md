# Analyse & Remaniement - Garderie Les P'tits Loups

**Date**: 24 novembre 2025
**Branche**: develop
**État**: En cours de refactorisation

---

## État des Lieux

### Stack Technique
- **Framework**: Next.js 15.5.2 (App Router) + React 19.1.0
- **TypeScript**: 5.x (strict mode)
- **Styling**: Tailwind CSS v4 + Fluid Typography
- **UI**: Radix UI + Shadcn
- **CMS**: Sanity v4.6.1
- **Email**: Resend
- **Maps**: Leaflet + OpenStreetMap

### Statistiques du Projet
- **170+ composants** (UI + Pages + Shared)
- **27 hooks** personnalisés
- **20 schémas** Sanity
- **17 scripts** de maintenance
- **9 routes** + secteurs dynamiques
- **153 fichiers** TS/TSX dans src/
- **48 fichiers** TS/TSX dans sanity/

---

## Problèmes Critiques Identifiés

### 1. Structure de Hooks Dupliquée (CRITIQUE)
**Sévérité**: 🔴 **HAUTE**

**Problème**: Deux systèmes de hooks parallèles
- ✅ Nouveau: `hooks/` (racine) - **27 fichiers, NON TRACKÉS GIT**
- ❌ Ancien: `src/hooks/` - **SUPPRIMÉS du git**

**Détails**:
```
hooks/
├── a11y/              (9 hooks d'accessibilité)
├── components/        (2 hooks de composants)
├── forms/             (3 hooks de formulaires)
├── queries/           (1 hook de requêtes)
├── tests/             (1 hook de tests)
├── utils/             (2 hooks utilitaires)
└── Racine             (9 hooks DUPLIQUÉS)
```

**Hooks dupliqués** entre racine et sous-dossiers:
- `useMaps.ts` → racine ET `components/useMaps.ts`
- `useFormValidation.ts` → racine ET `forms/useFormValidation.ts`
- `useScroll.ts` → racine ET `utils/useScroll.ts`
- `useWindowSize.ts` → racine ET `utils/useWindowSize.ts`
- etc.

**Versions différentes**: Les versions racine sont simplifiées, les versions sous-dossiers ont plus de fonctionnalités.

**Impact**:
- Confusion sur la version à utiliser
- Risque d'importer la mauvaise version
- Maintenance difficile (2x le code)
- Code NON TRACKÉ dans git = **RISQUE MAJEUR**

---

### 2. Systèmes UI Dupliqués (CRITIQUE)
**Sévérité**: 🔴 **HAUTE**

**Problème**: Deux librairies de composants UI parallèles
- `src/components/ui/` - **20 composants**
- `packages/ui/components/` - **54 composants, NON TRACKÉS GIT**

**Questions**:
- Quelle est la source de vérité?
- Migration en cours?
- Les deux doivent coexister?

**Configuration Shadcn** pointe vers `packages/ui/`:
```json
{
  "basePath": "packages/ui"
}
```

**Impact**:
- Confusion sur où créer/modifier les composants
- Duplication potentielle de code
- Import inconsistants
- Code critique NON TRACKÉ dans git

---

### 3. Configuration Sanity Dupliquée (MOYENNE)
**Sévérité**: 🟡 **MOYENNE**

**Problème**: Deux fichiers `sanity.config.ts` identiques
- `/sanity.config.ts` (racine)
- `/sanity/sanity.config.ts` (nouveau, **NON TRACKÉ**)

**Impact**: Risque de conflits de configuration

---

### 4. Fichiers Critiques Non Trackés (CRITIQUE)
**Sévérité**: 🔴 **HAUTE**

**Statut Git**: Plusieurs dossiers critiques non versionnés
```
?? hooks/                    # 27 hooks - CODE CRITIQUE
?? packages/                 # 54 composants UI - CODE CRITIQUE
?? sanity/Studio.tsx         # Wrapper Studio Sanity
?? sanity/sanity.config.ts   # Config Sanity dupliquée
?? src/app/studio/           # Route Studio
?? tailwind.config.ts        # Config Tailwind principale
```

**Risque**: Perte potentielle de code critique, impossible de revenir en arrière.

---

### 5. Système de Types Dupliqué (FAIBLE)
**Sévérité**: 🟢 **FAIBLE**

**Problème**: Types en plusieurs endroits
- `src/types/` - Types applicatifs
- `src/types/queries/` - DEPRECATED, ré-exporte depuis sanity
- `src/types/sanity/` - DEPRECATED
- `sanity/types/` - ✅ Nouvelle source canonique

**Impact**: Confusion sur où importer les types

---

### 6. Code Vendor Supprimé (INFO)
**Sévérité**: ℹ️ **INFO**

**Statut Git**: Dossier `vendor/` supprimé
- Composants partagés
- Fonts
- Migrés vers `packages/` et `src/components/shared/`

---

## Architecture Actuelle

### Structure des Composants

```
src/components/
├── ui/              (20 composants Shadcn - modifiés)
├── pages/           (27 sections de pages - bien organisé ✅)
├── shared/          (25+ composants partagés - bon ✅)
├── forms/           (6 composants de formulaires - bon ✅)
├── gallery/         (4 composants galerie - bon ✅)
├── layout/          (5 composants layout - bon ✅)
├── icons/           (3 fichiers icônes - bon ✅)
├── lazy/            (4 composants lazy loading - bon ✅)
└── dev/             (1 composant dev - bon ✅)
```

**✅ Points positifs**:
- Organisation claire par fonctionnalité
- Séparation pages/shared/layout
- Barrel exports cohérents
- Nommage explicite

### Structure Sanity

```
sanity/
├── schemas/         (20 schémas - bien structuré ✅)
├── types/           (21 fichiers types - nouveau standard ✅)
├── queries/         (exemples GROQ - utile ✅)
├── components/      (2 composants Studio - bon ✅)
├── lib/             (utilitaires - bon ✅)
└── Config files     (dupliqués ⚠️)
```

**✅ Points positifs**:
- Types centralisés dans `sanity/types/`
- Schémas bien organisés (pages/components)
- Structure claire

**⚠️ À améliorer**:
- Supprimer config dupliqué

### Scripts de Maintenance

```
scripts/
├── clean/           (7 scripts nettoyage - excellent ✅)
├── fix/             (3 scripts correction - bon ✅)
├── tests/           (6 scripts tests - bon ✅)
└── tools/           (1 utilitaire - bon ✅)
```

**✅ Excellente organisation**: Documentation, nommage clair, bien catégorisé.

---

## Propositions de Remaniement

### Phase 1: Urgences (À faire IMMÉDIATEMENT)

#### 1.1. Commiter les Fichiers Non Trackés
**Action**: Ajouter tous les fichiers critiques au git

```bash
git add hooks/
git add packages/
git add sanity/Studio.tsx
git add sanity/sanity.config.ts
git add src/app/studio/
git add tailwind.config.ts
```

**Justification**: Éviter la perte de code critique.

---

#### 1.2. Consolider la Structure des Hooks
**Action**: Choisir UNE structure canonique

**Option A (RECOMMANDÉE)**: Garder les sous-dossiers, supprimer la racine
```
hooks/
├── a11y/              # Hooks d'accessibilité
├── components/        # Hooks de composants
├── forms/             # Hooks de formulaires
├── queries/           # Hooks de requêtes
├── tests/             # Hooks de tests
├── utils/             # Hooks utilitaires
└── index.ts           # ✅ Exporte TOUT depuis les sous-dossiers
```

**Changements**:
1. Supprimer les hooks dupliqués à la racine
2. Garder uniquement les versions dans les sous-dossiers
3. Mettre à jour `hooks/index.ts` pour exporter depuis les sous-dossiers:
```typescript
// hooks/index.ts
export * from './a11y'
export * from './components'
export * from './forms'
export * from './queries'
export * from './tests'
export * from './utils'
```
4. Créer un index.ts dans chaque sous-dossier
5. Vérifier tous les imports dans le code

**Avantages**:
- Organisation claire par catégorie
- Pas de duplication
- Extensible (facile d'ajouter de nouvelles catégories)
- Cohérent avec la structure composants

**Option B**: Garder la racine, supprimer les sous-dossiers
- ❌ Moins scalable
- ❌ Moins organisé

---

#### 1.3. Clarifier le Système UI
**Action**: Choisir UNE source de vérité

**Option A (RECOMMANDÉE)**: Packages UI comme standard
```
packages/ui/
├── components/        # ✅ 54 composants - Source de vérité
└── ...

src/components/ui/     # ❌ À migrer ou supprimer
```

**Plan de migration**:
1. Auditer les 20 composants dans `src/components/ui/`
2. Vérifier s'ils existent dans `packages/ui/components/`
3. Si oui: supprimer de `src/components/ui/`
4. Si non: migrer vers `packages/ui/components/`
5. Mettre à jour tous les imports:
   - De: `@/components/ui/button`
   - Vers: `@ui/components/button`
6. Supprimer `src/components/ui/` une fois vide

**Avantages**:
- Architecture package moderne
- Réutilisable dans d'autres projets
- Cohérent avec Shadcn config
- Séparation claire app/ui

**Option B**: Garder src/components/ui/
- ✅ Moins de travail immédiat
- ❌ Architecture moins moderne
- ❌ Moins réutilisable

---

#### 1.4. Supprimer Config Sanity Dupliqué
**Action**: Garder un seul fichier

**Recommandation**: Garder `/sanity.config.ts` (racine)
```bash
rm sanity/sanity.config.ts
```

**Justification**: Le CLI Sanity cherche à la racine par défaut.

---

### Phase 2: Nettoyage (À faire ENSUITE)

#### 2.1. Nettoyer les Types Deprecated
**Action**: Supprimer les re-exports inutiles

```bash
# Vérifier que plus rien n'importe depuis:
rm -rf src/types/queries/
rm -rf src/types/sanity/
```

**Mettre à jour tous les imports**:
- De: `@/types/queries/*` ou `@/types/sanity/*`
- Vers: `@sanity/types/*`

---

#### 2.2. Standardiser les Path Aliases
**Action**: Cohérence dans `tsconfig.json`

**Recommandation**: Utiliser le préfixe `@` partout
```json
{
  "paths": {
    "@/*": ["src/*"],
    "@ui/*": ["packages/ui/*"],
    "@hooks/*": ["hooks/*"],
    "@lib/*": ["lib/*"],
    "@sanity/*": ["sanity/*"],
    "@scripts/*": ["scripts/*"]
  }
}
```

**Supprimer**: Les alias sans `@` pour éviter la confusion.

---

#### 2.3. Documenter l'Architecture Fluid Typography
**Action**: Créer un guide dans `docs/`

**Fichier**: `docs/design/fluid-typography.md`
- Expliquer le système clamp()
- Documenter les variables CSS
- Exemples d'utilisation
- Breakpoints

---

### Phase 3: Documentation (À faire APRÈS)

#### 3.1. Mettre à Jour la Documentation
**Fichiers à mettre à jour**:
- `README.md` - Structure actuelle
- `docs/README.md` - Index complet
- Créer `docs/architecture/HOOKS.md` - Guide des hooks
- Créer `docs/architecture/UI-SYSTEM.md` - Système UI
- Créer `docs/architecture/PATH-ALIASES.md` - Guide des imports

---

#### 3.2. Documenter les Décisions Architecture
**Fichier**: `docs/architecture/ADR.md` (Architecture Decision Records)

Documenter:
- Pourquoi packages/ui/ vs src/components/ui/
- Structure des hooks (sous-dossiers)
- Choix de Tailwind v4
- Système de typography fluide
- Intégration Sanity

---

### Phase 4: Optimisations (OPTIONNEL)

#### 4.1. Créer un Monorepo Workspace
**Si vous voulez aller plus loin**:

```json
// package.json
{
  "workspaces": [
    "packages/*"
  ]
}
```

Créer des packages:
- `packages/ui` - Composants UI
- `packages/hooks` - Hooks personnalisés
- `packages/sanity-config` - Config Sanity

**Avantages**:
- Isolation des packages
- Réutilisabilité
- Versioning indépendant

**Inconvénient**: Complexité accrue

---

#### 4.2. Ajouter Storybook
**Pour documenter les composants UI**:

```bash
npx storybook@latest init
```

**Avantages**:
- Documentation visuelle
- Développement isolé
- Tests visuels

---

## Proposition de Structure Finale

```
garderie-les-ptits-loups/
├── src/                          # Application Next.js
│   ├── app/                      # Routes (App Router)
│   ├── components/               # Composants applicatifs
│   │   ├── pages/                # Sections de pages
│   │   ├── shared/               # Composants partagés
│   │   ├── forms/                # Formulaires
│   │   ├── gallery/              # Galeries
│   │   ├── layout/               # Layout
│   │   ├── icons/                # Icônes
│   │   ├── lazy/                 # Lazy loading
│   │   └── dev/                  # Dev tools
│   ├── lib/                      # Utilitaires app
│   ├── styles/                   # CSS custom
│   └── types/                    # Types applicatifs
│
├── packages/                     # Packages réutilisables
│   └── ui/                       # ✅ Composants UI (source de vérité)
│       ├── components/           # 54 composants Shadcn/Radix
│       ├── css/                  # Styles UI
│       ├── lib/                  # Utilitaires UI
│       ├── types/                # Types UI
│       ├── variants/             # Variants CVA
│       └── index.ts              # Exports
│
├── hooks/                        # ✅ Hooks personnalisés
│   ├── a11y/                     # Accessibilité (9 hooks)
│   ├── components/               # Composants (2 hooks)
│   ├── forms/                    # Formulaires (3 hooks)
│   ├── queries/                  # Requêtes (1 hook)
│   ├── tests/                    # Tests (1 hook)
│   ├── utils/                    # Utilitaires (2 hooks)
│   └── index.ts                  # Exports tout
│
├── sanity/                       # ✅ Sanity CMS
│   ├── schemas/                  # Schémas (20)
│   ├── types/                    # Types Sanity (21)
│   ├── queries/                  # Exemples GROQ
│   ├── components/               # Composants Studio
│   ├── lib/                      # Utilitaires
│   └── deskStructure.ts          # Structure Studio
│
├── scripts/                      # ✅ Scripts maintenance
│   ├── clean/                    # Nettoyage (7)
│   ├── fix/                      # Correction (3)
│   ├── tests/                    # Tests (6)
│   └── tools/                    # Outils (1)
│
├── lib/                          # Utilitaires globaux
├── docs/                         # Documentation
├── public/                       # Assets statiques
│
├── sanity.config.ts              # ✅ Config Sanity (unique)
├── tailwind.config.ts            # ✅ Config Tailwind
├── next.config.ts                # Config Next.js
├── tsconfig.json                 # Config TypeScript
└── package.json                  # Dependencies
```

---

## Plan d'Action Recommandé

### Étape 1: Sécuriser (30 min)
```bash
# 1. Commiter tout le code non tracké
git add hooks/ packages/ sanity/Studio.tsx src/app/studio/ tailwind.config.ts
git commit -m "chore: track critical untracked files"

# 2. Créer une branche de sauvegarde
git checkout -b backup-before-refactor
git checkout develop
```

### Étape 2: Consolider Hooks (1-2h)
1. Créer `hooks/*/index.ts` dans chaque sous-dossier
2. Mettre à jour `hooks/index.ts` principal
3. Supprimer hooks dupliqués à la racine de `hooks/`
4. Tester que tous les imports fonctionnent
5. Commit: `refactor(hooks): consolidate hook structure`

### Étape 3: Consolider UI (2-3h)
1. Auditer `src/components/ui/` vs `packages/ui/components/`
2. Migrer les composants uniques vers `packages/ui/`
3. Mettre à jour tous les imports
4. Supprimer `src/components/ui/`
5. Tester l'application
6. Commit: `refactor(ui): migrate to packages/ui as single source of truth`

### Étape 4: Nettoyer Config (15 min)
```bash
rm sanity/sanity.config.ts
git add sanity/sanity.config.ts
git commit -m "chore: remove duplicate sanity config"
```

### Étape 5: Nettoyer Types (30 min)
1. Grep pour trouver tous les imports depuis `@/types/queries/` et `@/types/sanity/`
2. Remplacer par `@sanity/types/*`
3. Supprimer les dossiers deprecated
4. Commit: `refactor(types): remove deprecated type re-exports`

### Étape 6: Standardiser Aliases (15 min)
1. Mettre à jour `tsconfig.json`
2. Vérifier qu'aucun import ne casse
3. Commit: `chore: standardize path aliases`

### Étape 7: Documentation (1h)
1. Mettre à jour `README.md`
2. Créer guides architecture
3. Documenter décisions
4. Commit: `docs: update architecture documentation`

### Étape 8: Tester (30 min)
```bash
npm run build
npm run lint
npm run start
```

### Temps Total Estimé: 6-8 heures

---

## Métriques de Succès

### Avant Refactorisation
- ❌ Fichiers critiques non trackés
- ❌ 27 hooks avec duplication
- ❌ 2 systèmes UI parallèles
- ❌ Config Sanity dupliqué
- ❌ Types deprecated présents
- ⚠️ Documentation obsolète

### Après Refactorisation
- ✅ Tous les fichiers trackés dans git
- ✅ Hooks organisés en sous-dossiers (0 duplication)
- ✅ 1 seul système UI (`packages/ui/`)
- ✅ 1 seul `sanity.config.ts`
- ✅ Types centralisés (`sanity/types/`)
- ✅ Documentation à jour
- ✅ Path aliases cohérents
- ✅ Build et lint passent

---

## Risques Identifiés

### Risque 1: Breaking Changes
**Probabilité**: Moyenne
**Impact**: Haut
**Mitigation**:
- Créer branche backup
- Tester après chaque étape
- Faire des commits atomiques

### Risque 2: Imports Cassés
**Probabilité**: Haute
**Impact**: Moyen
**Mitigation**:
- Utiliser la fonction "Find All References" de l'IDE
- Grep pour trouver tous les imports
- Tester avec `npm run build`

### Risque 3: Perte de Fonctionnalité
**Probabilité**: Faible
**Impact**: Haut
**Mitigation**:
- Comparer les versions avant suppression
- Tester toutes les pages
- Tests manuels complets

---

## Questions pour Validation

Avant de procéder, confirmer:

1. **Hooks**: OK pour consolider en sous-dossiers et supprimer duplications racine?
2. **UI**: OK pour migrer vers `packages/ui/` comme source unique?
3. **Sanity Config**: OK pour supprimer `sanity/sanity.config.ts`?
4. **Types**: OK pour supprimer `src/types/queries/` et `src/types/sanity/`?
5. **Path Aliases**: OK pour standardiser avec préfixe `@` partout?
6. **Timing**: OK pour bloquer 6-8h sur cette refacto?
7. **Tests**: Avez-vous des tests automatisés, ou uniquement manuels?

---

## Recommandations Supplémentaires

### Court Terme (1-2 semaines)
- ✅ Implémenter Phase 1 & 2
- Ajouter tests unitaires pour les hooks
- Ajouter tests E2E pour les flows critiques

### Moyen Terme (1 mois)
- Mettre en place Storybook
- Créer guide de contribution
- Automatiser les tests de performance

### Long Terme (3+ mois)
- Considérer migration vers monorepo complet
- Extraire `packages/ui` en npm package privé
- Ajouter CI/CD avec tests automatiques

---

**Note**: Cette analyse est basée sur l'état du projet au 24 novembre 2025. Le projet est globalement bien structuré avec des choix techniques modernes. Les problèmes identifiés sont principalement organisationnels et facilement résolubles.

**Score Santé Projet**: 7/10
- Architecture solide: 9/10
- Stack technique: 10/10
- Organisation code: 6/10 (à cause des duplications)
- Documentation: 7/10
- Tests: 5/10 (peu de tests automatisés)

---

## Prochaine Étape

**Attente de votre validation** sur:
- Les options choisies (Hooks: Option A, UI: Option A, etc.)
- L'ordre des étapes
- Les questions ci-dessus

Une fois validé, je peux commencer l'implémentation étape par étape.
