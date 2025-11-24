# Comparaison : Structure Actuelle vs Référence Next.js 16

**Date**: 24 novembre 2025
**Branche**: feat/refactor

---

## Vue d'Ensemble

### Structure de Référence
- **Source**: `.ressources/next-16-starter-sanity`
- **Stack**: Next.js 16 + React 19 + TypeScript 5 + Tailwind v4 + Shadcn
- **Type**: Template enterprise-grade, production-ready
- **Documentation**: 544 lignes de conventions (CONVENTIONS.md)

### Projet Actuel (Garderie)
- **Stack**: Next.js 15 + React 19 + TypeScript 5 + Tailwind v4 + Shadcn + Sanity
- **Type**: Projet en production avec CMS actif
- **État**: Refactorisation en cours (duplications identifiées)

---

## Comparaison Détaillée

### 1. Organisation des Composants

#### STRUCTURE RÉFÉRENCE (Meilleure ✅)

```
src/
├── ui/                           # ✅ 49 composants Shadcn - CLAIREMENT SÉPARÉ
│   ├── button.tsx                # Naming: kebab-case
│   ├── alert-dialog.tsx
│   └── ...
├── components/                   # ✅ Composants applicatifs
│   ├── globals/                  # ✅ Composants globaux (Header, Nav, etc.)
│   ├── demos/                    # ✅ 63 exemples de composants
│   └── [futurs: home/, about/]  # ✅ Organisation par page préparée
└── sanity/                       # ✅ Structure préparée (vide mais documentée)
    └── components/               # Pour composants Sanity Studio
```

**Principes**:
- **3 tiers clairs**: UI (pure) → App Components → Page Components
- **Séparation stricte**: UI n'a JAMAIS de logique métier
- **Nommage cohérent**: kebab-case pour UI, PascalCase pour app
- **Scalabilité**: Structure extensible documentée

#### STRUCTURE ACTUELLE (Confuse ⚠️)

```
src/components/
├── ui/                           # ⚠️ 20 composants (modifiés de Shadcn)
├── pages/                        # ✅ 27 sections par page (BIEN)
├── shared/                       # ⚠️ 25+ composants (mix global/page)
├── forms/                        # ✅ 6 composants formulaires
├── gallery/                      # ✅ 4 composants galerie
├── layout/                       # ✅ 5 composants layout
├── icons/                        # ✅ 3 fichiers icônes
├── lazy/                         # ⚠️ 4 composants lazy (pattern spécifique)
└── dev/                          # ✅ 1 composant dev

packages/ui/                      # ❌ 54 composants - DUPLICATION CRITIQUE
└── components/
```

**Problèmes**:
- ❌ **Duplication UI**: `src/components/ui/` vs `packages/ui/` (74 composants au total!)
- ⚠️ **Shared trop large**: Mélange de composants globaux et spécifiques
- ⚠️ **Pas de séparation claire**: Où mettre un nouveau composant?
- ❌ **Lazy isolé**: Pattern non documenté

---

### 2. Organisation des Hooks

#### STRUCTURE RÉFÉRENCE (Simple et Claire ✅)

```
src/hooks/
├── use-mobile.ts                 # ✅ Breakpoint detection
├── use-meta-color.ts             # ✅ Theme meta tag sync
└── [futurs: globals/, frontend/, sanity/]  # ✅ Structure extensible documentée
```

**Principes**:
- **Racine simple**: Hooks globaux réutilisables uniquement
- **Convention claire**: `use-*.ts` naming
- **Sous-dossiers préparés**: Documentation pour structure future
- **Pas de duplication**: Un hook = un fichier = un emplacement

**Convention documentée pour l'expansion**:
```
src/hooks/
├── globals/              # Hooks globaux réutilisables partout
├── frontend/             # Hooks spécifiques frontend
│   ├── components/       # Hooks pour composants spécifiques
│   └── pages/            # Hooks pour pages spécifiques
└── sanity/               # Hooks pour Sanity CMS
```

#### STRUCTURE ACTUELLE (Dupliquée ❌)

```
hooks/                            # ❌ À la RACINE (hors src/)
├── a11y/                         # 9 hooks accessibilité
├── components/                   # 2 hooks composants
├── forms/                        # 3 hooks formulaires
├── queries/                      # 1 hook requêtes
├── tests/                        # 1 hook tests
├── utils/                        # 2 hooks utilitaires
└── RACINE                        # ❌ 9 HOOKS DUPLIQUÉS !
    ├── useMaps.ts                # ❌ Existe aussi dans components/
    ├── useFormValidation.ts      # ❌ Existe aussi dans forms/
    └── ...
```

**Problèmes**:
- ❌ **Hors de src/**: Incohérent avec le reste de l'architecture
- ❌ **Duplication critique**: 9 hooks en double (racine + sous-dossiers)
- ❌ **Versions différentes**: Les versions diffèrent (quelle est la bonne?)
- ⚠️ **Sur-organisation**: 7 catégories pour 27 hooks (2-9 hooks/catégorie)
- ❌ **Non tracké git**: Tout le dossier `hooks/` est untracked

---

### 3. Architecture des Styles

#### STRUCTURE RÉFÉRENCE (Architecture Modulaire ✅)

```
src/styles/
├── globals/                      # ✅ Styles globaux organisés
│   ├── globals.css               # Point d'entrée principal
│   ├── palette.css               # ✅ OKLCH - Couleurs brutes (12 steps)
│   ├── theme.css                 # ✅ Rôles sémantiques (mapping)
│   ├── fonts.css                 # ✅ Configuration typographie
│   └── fluid-variables.css       # ✅ Utopia.fyi - Système fluide
├── frontend/                     # ✅ Styles spécifiques frontend (vide, prêt)
└── sanity/                       # ✅ Styles Sanity Studio (vide, prêt)
```

**Architecture en Couches** (EXCELLENT):
```
Layer 1: PALETTE (palette.css)
  → Couleurs brutes OKLCH
  → 12 steps par couleur (Radix methodology)
  → Purple, Orange, Green, Amber, Red, Blue
  → Aucune sémantique, juste des numéros

Layer 2: THEME (theme.css)
  → Map palette → rôles sémantiques
  → --background, --foreground, --primary, --secondary
  → Compatibilité Shadcn UI
  → Mode light/dark

Layer 3: FONTS (fonts.css)
  → Familles de polices
  → Weights, line-heights, letter-spacing
  → Variables CSS réutilisables

Layer 4: FLUID (fluid-variables.css)
  → Système de taille fluide (clamp)
  → Typography scale (--size--2 à --size-5)
  → Spacing scale (--space-3xs à --space-3xl)
  → Viewport: 360px → 1240px

Layer 5: APPLICATION (globals.css)
  → Imports des layers
  → Classes utilitaires custom
  → Tailwind v4
```

**Avantages**:
- ✅ **Séparation des préoccupations**: Chaque layer a un rôle clair
- ✅ **Maintenabilité**: Modifier une couleur = 1 endroit (palette)
- ✅ **Scalabilité**: Ajouter un thème = modifier theme.css
- ✅ **Performance**: CSS organisé pour chargement optimal
- ✅ **Documentation**: Chaque layer est auto-documenté

#### STRUCTURE ACTUELLE (Mixte ⚠️)

```
src/styles/
├── palette.css                   # ✅ Similaire (Orange/Purple)
├── fonts.css                     # ✅ Chelsea Market + Open Sans
├── animations.css                # ⚠️ Custom (pas dans référence)
├── optimized-images.css          # ⚠️ Custom (spécifique projet)
├── lightbox-override.css         # ⚠️ Custom (librairie tierce)
├── fluid/                        # ✅ Système fluide (similaire)
│   ├── fluid-variables.css
│   ├── spacing.css
│   └── typography.css
└── Documentation
    ├── README.md
    └── typography-guide.md       # ✅ Documentation présente (bon)
```

**Différences**:
- ⚠️ **Pas de theme.css**: Mapping sémantique manquant
- ⚠️ **Fichiers spécifiques dispersés**: animations, images, lightbox
- ⚠️ **Moins modulaire**: Difficile de switcher de thème
- ✅ **Documentation**: Mieux documenté que référence (README + guide)

**Verdict**: Structure actuelle fonctionnelle mais moins modulaire. La référence est plus extensible.

---

### 4. Organisation des Types

#### STRUCTURE RÉFÉRENCE (Par Domaine ✅)

```
src/types/
├── index.ts                      # ✅ Exports globaux
├── frontend/                     # ✅ Types spécifiques frontend (vide, prêt)
└── sanity/                       # ✅ Types Sanity CMS (vide, prêt)
```

**Principes**:
- **Séparation domaines**: Frontend ↔ Sanity
- **Structure préparée**: Dossiers vides documentés
- **Centralisation**: index.ts pour exports globaux
- **Scalabilité**: Facile d'ajouter un nouveau domaine

#### STRUCTURE ACTUELLE (Dispersée ⚠️)

```
src/types/                        # Types applicatifs
├── queries/                      # ❌ DEPRECATED (ré-exporte sanity)
└── sanity/                       # ❌ DEPRECATED

sanity/types/                     # ✅ NOUVEAU canonical (21 fichiers)
├── core/                         # Images, Portable Text
├── content/                      # General, Prices
├── pages/                        # Types par page (12 fichiers)
├── validation.ts
└── index.ts
```

**Problèmes**:
- ❌ **Types deprecated non supprimés**: `src/types/queries/`, `src/types/sanity/`
- ⚠️ **Types Sanity hors de src/**: `sanity/types/` (incohérent avec référence)
- ⚠️ **Import confusion**: Où importer les types? 3 emplacements possibles

**Note**: La structure `sanity/types/` est bonne en soi, mais diverge de la référence qui garde tout dans `src/`.

---

### 5. Configuration et Tooling

#### STRUCTURE RÉFÉRENCE (Moderne ✅)

| Config | Référence | Actuel | Note |
|--------|-----------|--------|------|
| **ESLint** | ESLint 9 flat config | ESLint 9 flat config | ✅ Même version |
| **Prettier** | ✅ `.prettierrc.json` + plugins | ❌ Pas de config visible | ❌ Manquant |
| **EditorConfig** | ✅ `.editorconfig` | ❌ Pas présent | ⚠️ Recommandé |
| **NVM** | ✅ `.nvmrc` | ❌ Pas présent | ⚠️ Utile |
| **npm** | ✅ `.npmrc` | ❌ Pas présent | ⚠️ Utile |
| **Tailwind** | v4 (PostCSS only) | v4 (avec tailwind.config.ts) | ⚠️ Différent |
| **Next.js** | v16 | v15 | ⚠️ Actuel moins récent |
| **Bundle Analyzer** | ✅ Intégré (optionnel) | ✅ Intégré | ✅ Même |

**Prettier Setup (Référence)**:
```json
{
  "printWidth": 120,
  "singleQuote": true,
  "jsxSingleQuote": true,
  "trailingComma": "none",
  "plugins": [
    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss"
  ],
  "importOrder": [
    "^react$",
    "^next",
    "^next-themes",
    "^@/(.*)$",
    "^[./]"
  ]
}
```

**Avantage référence**: Imports automatiquement triés et formatés.

---

### 6. Documentation

#### STRUCTURE RÉFÉRENCE (Exceptionnelle ✅)

```
├── README.md                     # ✅ Overview complet
└── src/docs/
    └── CONVENTIONS.md            # ✅ 544 lignes (!!)
        ├── Structure projet complète
        ├── Conventions de nommage
        ├── Organisation composants
        ├── Organisation styles
        ├── Organisation hooks
        ├── Organisation types
        ├── Patterns d'import
        ├── Guide de migration
        └── Checklist de compliance
```

**Qualité CONVENTIONS.md**:
- ✅ Exemples visuels (✅/❌)
- ✅ Rationale pour chaque décision
- ✅ Diagrammes de structure
- ✅ Patterns code concrets
- ✅ Checklist pour nouveaux composants
- ✅ Guide migration structure ancienne → nouvelle

#### STRUCTURE ACTUELLE (Bonne mais Fragmentée ⚠️)

```
├── README.md                     # ✅ Bon overview
├── ANALYSE-ET-REMANIEMENT.md     # ✅ Analyse complète (nouveau)
├── docs/                         # ✅ Documentation extensive
│   ├── README.md                 # Index
│   ├── setup/
│   ├── sanity/
│   ├── features/
│   ├── performance/
│   └── tests/
└── src/styles/                   # ✅ Documentation CSS
    ├── README.md
    └── typography-guide.md
```

**Comparaison**:
- ✅ **Plus de docs**: Actuel a plus de contenu (setup, features, etc.)
- ⚠️ **Moins centralisé**: Fragmenté en plusieurs dossiers
- ❌ **Pas de CONVENTIONS**: Pas de fichier unique pour conventions
- ⚠️ **Peut-être obsolète**: Docs peuvent ne pas refléter structure actuelle

**Verdict**: Actuel a plus de contenu, Référence a mieux structuré les conventions.

---

### 7. Scripts et Utilitaires

#### STRUCTURE RÉFÉRENCE (Minimal ✅)

```json
{
  "dev": "next dev --turbopack",
  "build": "next build --turbopack",
  "start": "next start",
  "lint": "next lint",
  "lint:fix": "eslint --fix \"src/**/*.{js,jsx,ts,tsx}\"",
  "format": "prettier --write \"src/**/*.{js,jsx,ts,tsx}\"",
  "type-check": "tsc --noEmit"
}
```

**7 scripts essentiels** - Turbopack activé partout

#### STRUCTURE ACTUELLE (Complet ⚠️)

```json
{
  "dev/build/start": "...",        # ✅ Base
  "sanity:*": "...",                # ✅ Scripts Sanity (3)
  "cleanup:*": "...",               # ✅ Scripts nettoyage (4)
  "fix:*": "...",                   # ✅ Scripts correction (2)
  "kill:*": "...",                  # ✅ Gestion ports (3)
  "perf/lighthouse/analyze": "..."  # ✅ Tests performance (3)
}
```

**32 scripts** + **17 scripts Node.js** dans `scripts/`

**Comparaison**:
- ✅ **Actuel beaucoup plus complet**: Scripts maintenance Sanity
- ⚠️ **Référence plus simple**: Juste l'essentiel
- ⚠️ **Actuel spécialisé**: Beaucoup de scripts spécifiques CMS

**Verdict**: Les deux approches sont valides selon le contexte. Projet actuel nécessite plus de scripts (CMS actif).

---

## Tableau de Comparaison Global

| Aspect | Référence | Actuel | Gagnant |
|--------|-----------|--------|---------|
| **Composants UI** | src/ui/ (49, séparé) | src/components/ui/ (20) + packages/ui/ (54) | ✅ Référence |
| **Composants App** | src/components/ (bien organisé) | src/components/ (mixte) | ⚠️ Référence |
| **Hooks** | src/hooks/ (2, simple) | hooks/ (27, dupliqués) | ✅ Référence |
| **Styles** | Architecture 5 layers | Bon mais moins modulaire | ✅ Référence |
| **Types** | src/types/ (par domaine) | Dispersés (deprecated présents) | ✅ Référence |
| **Config** | Moderne (Prettier, EditorConfig) | Bon (manque Prettier) | ✅ Référence |
| **Documentation** | CONVENTIONS.md (544 lignes) | docs/ (fragmenté) | ⚠️ Égalité |
| **Scripts** | 7 essentiels | 32 + 17 fichiers | ⚠️ Contexte |
| **Sanity** | Préparé (vide) | Implémenté (actif) | ✅ Actuel |
| **Version Stack** | Next.js 16, React 19 | Next.js 15, React 19 | ⚠️ Référence |
| **Maturité** | Template starter | Projet production | ✅ Actuel |

**Score Global**:
- **Référence**: 7/10 aspects gagnés (architecture pure)
- **Actuel**: 3/10 aspects gagnés (fonctionnalité)

---

## Analyse : Pourquoi la Référence est Meilleure

### 1. Séparation Claire des Préoccupations

**Référence** suit le principe **SoC (Separation of Concerns)** strictement:
- `src/ui/` = Pure UI (0% logique métier)
- `src/components/` = Composants app (logique métier)
- `src/sanity/` = CMS (totalement isolé)

**Actuel** mélange:
- `src/components/ui/` modifiés (pas pure UI)
- `src/components/shared/` mélange global + spécifique
- `packages/ui/` duplication

**Impact**: Référence est plus **maintenable** et **scalable**.

---

### 2. Architecture Modulaire (Styles)

**Référence** utilise une architecture **en couches**:
```
Palette → Theme → Fonts → Fluid → Application
```

**Avantages**:
- Changer de thème = 1 fichier (theme.css)
- Ajouter une couleur = 1 endroit (palette.css)
- Support multi-thème facile
- Testable isolément

**Actuel** fonctionne mais moins flexible:
- Palette OK
- Pas de layer theme (sémantique)
- Fichiers custom dispersés
- Moins extensible

---

### 3. Convention Over Configuration

**Référence** documente tout dans **CONVENTIONS.md**:
- Où créer un nouveau composant? → Documenté
- Quel naming pour un hook? → Documenté
- Comment organiser les imports? → Documenté
- Migration ancienne structure? → Documenté

**Actuel** manque de guide centralisé:
- Conventions implicites
- Besoin de demander à l'équipe
- Risque d'incohérences

**Impact**: Référence réduit **cognitive load** et **onboarding time**.

---

### 4. Tooling Moderne

**Référence** inclut:
- ✅ Prettier configuré (formatage auto)
- ✅ Import order (tri automatique)
- ✅ EditorConfig (cohérence IDE)
- ✅ NVM/NPM config
- ✅ Turbopack activé

**Actuel** manque:
- ❌ Prettier non configuré
- ❌ EditorConfig absent
- ⚠️ Turbopack pas activé

**Impact**: Référence améliore **DX (Developer Experience)**.

---

### 5. Scalabilité Préparée

**Référence** prépare l'expansion:
- Dossiers vides documentés (`frontend/`, `sanity/`)
- Structure extensible expliquée
- Patterns pour nouveaux domaines

**Actuel** structure organique:
- Grandi au fil du temps
- Pas de plan d'expansion clair
- Duplications apparues

---

## Recommandations pour Refactorisation

### Option A: Adoption Complète (Recommandée ✅)

**Adopter la structure de référence à 100%**

#### Migrations Nécessaires

**1. Composants UI**
```
AVANT:
src/components/ui/ (20)
packages/ui/ (54)

APRÈS:
src/ui/ (74 fusionnés, dédupliqués)
```

**2. Composants App**
```
AVANT:
src/components/pages/       (27)
src/components/shared/      (25)
src/components/layout/      (5)
src/components/forms/       (6)
src/components/gallery/     (4)

APRÈS:
src/components/
├── globals/               # Layout, Navigation (Header, Footer, etc.)
├── home/                  # Sections homepage
├── about/                 # Sections about
├── contact/               # Sections contact + Forms
├── horaires-tarifs/       # Sections pricing
├── sector/                # Sections secteurs
└── shared/                # Vraiment partagé (Gallery, etc.)
```

**3. Hooks**
```
AVANT:
hooks/ (racine, 27 fichiers dupliqués, non tracké)

APRÈS:
src/hooks/
├── use-*.ts               # Hooks globaux réutilisables
└── [si besoin: globals/, frontend/, sanity/]
```

**4. Styles**
```
AVANT:
src/styles/
├── palette.css
├── fonts.css
├── animations.css
├── optimized-images.css
├── lightbox-override.css
└── fluid/

APRÈS:
src/styles/
├── globals/
│   ├── globals.css        # Point d'entrée
│   ├── palette.css        # ✅ Garder (bon)
│   ├── theme.css          # ✅ CRÉER (mapping sémantique)
│   ├── fonts.css          # ✅ Garder (bon)
│   └── fluid-variables.css # ✅ Fusionner depuis fluid/
├── frontend/
│   ├── animations.css     # Déplacer ici
│   ├── images.css         # Renommer optimized-images
│   └── lightbox.css       # Renommer lightbox-override
└── sanity/
    └── studio.css         # Si besoin custom Sanity Studio styles
```

**5. Types**
```
AVANT:
src/types/                 # Types app
src/types/queries/         # DEPRECATED
src/types/sanity/          # DEPRECATED
sanity/types/              # Types Sanity (hors src)

APRÈS:
src/types/
├── index.ts               # Exports globaux
├── frontend/              # Types app
│   ├── components.ts
│   ├── pages.ts
│   └── forms.ts
└── sanity/                # Fusionner depuis sanity/types/
    ├── core/
    ├── content/
    ├── pages/
    └── index.ts
```

**6. Sanity**
```
AVANT:
sanity/ (racine)

APRÈS:
src/sanity/                # Déplacer TOUT dans src/
├── schemas/
├── types/                 # Fusionné depuis ci-dessus
├── components/
├── lib/
├── queries/
├── studio/                # Studio config
└── sanity.config.ts       # Config unique
```

**7. Configuration**
```
AJOUTER:
├── .prettierrc.json       # ✅ Config Prettier
├── .prettierignore        # ✅ Ignores
├── .editorconfig          # ✅ EditorConfig
├── .nvmrc                 # ✅ Node version (20.18.0)
└── .npmrc                 # ✅ npm config

MODIFIER:
├── package.json           # Ajouter scripts format, lint:fix
└── next.config.ts         # Activer Turbopack?
```

**8. Documentation**
```
CRÉER:
src/docs/CONVENTIONS.md    # ✅ Guide complet (adapter référence)

GARDER:
docs/                      # ✅ Contenu existant (setup, features, etc.)
```

---

### Option B: Adoption Partielle (Compromis ⚠️)

**Adopter uniquement les améliorations critiques**

**À faire**:
1. ✅ Fusionner UI → `src/ui/`
2. ✅ Consolider hooks → `src/hooks/`
3. ✅ Ajouter Prettier + EditorConfig
4. ✅ Créer CONVENTIONS.md
5. ⚠️ Garder sanity/ à la racine (ne pas déplacer dans src/)
6. ⚠️ Garder structure composants actuelle (juste nettoyer)

**Avantages**:
- Moins de travail
- Moins de risques breaking changes
- Migration progressive

**Inconvénients**:
- Structure toujours mixte
- Moins cohérent
- Dette technique reste

---

### Option C: Rester sur Structure Actuelle (Non Recommandé ❌)

**Juste corriger les duplications identifiées**

**À faire**:
1. Supprimer duplications hooks
2. Choisir packages/ui/ OU src/components/ui/
3. Nettoyer types deprecated

**Avantages**:
- Travail minimal
- 0 refactorisation

**Inconvénients**:
- ❌ Structure reste sous-optimale
- ❌ Pas de guidelines claires
- ❌ Dette technique augmente

---

## Plan de Migration Recommandé (Option A)

### Phase 1: Préparation (1h)
```bash
# 1. Sauvegarder état actuel
git add -A
git commit -m "chore: backup before structure migration"

# 2. Créer branches de travail
git checkout -b feat/structure-migration

# 3. Ajouter configs manquants
# - Copier .prettierrc.json depuis référence
# - Copier .editorconfig depuis référence
# - Copier .nvmrc depuis référence
# - Copier .npmrc depuis référence

# 4. Installer Prettier plugins
npm install -D @trivago/prettier-plugin-sort-imports prettier-plugin-tailwindcss
```

### Phase 2: Composants UI (2h)
```bash
# 1. Créer src/ui/
mkdir -p src/ui

# 2. Auditer et fusionner
# - Comparer src/components/ui/ vs packages/ui/components/
# - Garder la meilleure version
# - Copier vers src/ui/

# 3. Mettre à jour imports
# - Find & Replace: @/components/ui/ → @/ui/
# - Find & Replace: @ui/components/ → @/ui/

# 4. Supprimer anciennes structures
rm -rf src/components/ui/
rm -rf packages/ui/

# 5. Mettre à jour tsconfig.json paths
# "@/ui/*": ["./src/ui/*"]

# 6. Tester build
npm run build
```

### Phase 3: Hooks (1h)
```bash
# 1. Créer src/hooks/
mkdir -p src/hooks

# 2. Consolider hooks
# - Garder versions sous-dossiers (plus complètes)
# - Copier dans src/hooks/ (flat structure pour l'instant)
# - Créer index.ts avec exports

# 3. Mettre à jour imports
# - Find & Replace: @hooks/ → @/hooks/

# 4. Supprimer ancien dossier
rm -rf hooks/

# 5. Mettre à jour tsconfig.json paths
# "@/hooks/*": ["./src/hooks/*"]
```

### Phase 4: Styles (2h)
```bash
# 1. Créer structure
mkdir -p src/styles/globals
mkdir -p src/styles/frontend
mkdir -p src/styles/sanity

# 2. Déplacer et fusionner
mv src/styles/palette.css src/styles/globals/
mv src/styles/fonts.css src/styles/globals/
# Fusionner fluid/ → fluid-variables.css
mv src/styles/animations.css src/styles/frontend/
mv src/styles/optimized-images.css src/styles/frontend/images.css
mv src/styles/lightbox-override.css src/styles/frontend/lightbox.css

# 3. CRÉER theme.css (nouveau)
# - Copier depuis référence
# - Adapter aux couleurs Purple/Orange

# 4. Créer globals.css principal
# @import './palette.css';
# @import './theme.css';
# @import './fonts.css';
# @import './fluid-variables.css';

# 5. Mettre à jour src/app/globals.css
# @import '../styles/globals/globals.css';
# @import '../styles/frontend/animations.css';
# etc.
```

### Phase 5: Types (1h)
```bash
# 1. Créer structure
mkdir -p src/types/frontend
mkdir -p src/types/sanity

# 2. Déplacer types Sanity
mv sanity/types/* src/types/sanity/

# 3. Supprimer deprecated
rm -rf src/types/queries/
rm -rf src/types/sanity/

# 4. Mettre à jour imports
# - Find & Replace: @sanity/types/ → @/types/sanity/

# 5. Créer src/types/index.ts
# export * from './frontend';
# export * from './sanity';
```

### Phase 6: Sanity (2h)
```bash
# 1. Créer src/sanity/
mkdir -p src/sanity

# 2. Déplacer TOUT
mv sanity/* src/sanity/

# 3. Mettre à jour imports
# - Find & Replace: @sanity/ → @/sanity/

# 4. Mettre à jour tsconfig.json paths
# "@/sanity/*": ["./src/sanity/*"]

# 5. Supprimer ancienne racine
rm -rf sanity/

# 6. Tester Sanity Studio
npm run sanity
```

### Phase 7: Documentation (1h)
```bash
# 1. Créer src/docs/
mkdir -p src/docs

# 2. Copier CONVENTIONS.md depuis référence
cp .ressources/next-16-starter-sanity/src/docs/CONVENTIONS.md src/docs/

# 3. Adapter à notre projet
# - Remplacer exemples
# - Ajouter sections spécifiques (Sanity actif, scripts, etc.)
# - Documenter décisions architecture

# 4. Mettre à jour docs/ existant si besoin
```

### Phase 8: Composants App (3h)
```bash
# 1. Réorganiser src/components/
# Structure cible:
# src/components/
# ├── globals/        # Header, Footer, Navigation, Theme
# ├── home/           # Sections homepage
# ├── about/          # Sections about
# ├── contact/        # Sections contact + forms
# ├── horaires-tarifs/
# ├── sector/
# └── shared/         # Gallery, RichText, Maps, etc.

# 2. Déplacer composants
# - layout/ → globals/
# - forms/ → contact/
# - pages/home/ → home/
# - pages/about/ → about/
# - etc.

# 3. Mettre à jour tous les imports

# 4. Supprimer dossiers vides
# - pages/
# - layout/
# - forms/
```

### Phase 9: Configuration (30min)
```bash
# 1. Mettre à jour package.json
# Ajouter scripts:
"lint:fix": "eslint --fix \"src/**/*.{js,jsx,ts,tsx}\"",
"format": "prettier --write \"src/**/*.{js,jsx,ts,tsx}\"",

# 2. Activer Turbopack? (optionnel)
# "dev": "next dev --turbopack",
# "build": "next build --turbopack",

# 3. Formatter tout le code
npm run format

# 4. Linter tout le code
npm run lint:fix
```

### Phase 10: Tests et Validation (2h)
```bash
# 1. Type check
npm run type-check

# 2. Build
npm run build

# 3. Tests manuels
npm run dev
# Tester toutes les pages
# Tester formulaires
# Tester galeries
# Tester navigation

# 4. Sanity Studio
npm run sanity
# Tester édition contenu

# 5. Performance
npm run lighthouse

# 6. Commit final
git add -A
git commit -m "refactor: migrate to reference Next.js 16 structure

- Consolidate UI components in src/ui/
- Move hooks to src/hooks/ (deduplicated)
- Restructure styles with layers (palette → theme → app)
- Organize types by domain (frontend/, sanity/)
- Move Sanity to src/sanity/
- Add Prettier + EditorConfig
- Create CONVENTIONS.md guide
- Reorganize app components by page

BREAKING CHANGES:
- All import paths updated
- UI components now in @/ui/
- Hooks now in @/hooks/
- Sanity now in @/sanity/
- Types now in @/types/
"
```

### Temps Total Estimé: 15-16 heures

**Répartition**:
- Préparation: 1h
- Composants UI: 2h
- Hooks: 1h
- Styles: 2h
- Types: 1h
- Sanity: 2h
- Documentation: 1h
- Composants App: 3h
- Configuration: 30min
- Tests: 2h

---

## Risques et Mitigations

### Risque 1: Breaking Changes Massifs
**Probabilité**: HAUTE
**Impact**: HAUT

**Mitigation**:
- ✅ Backup complet avant migration
- ✅ Branche dédiée (feat/structure-migration)
- ✅ Migration par étapes (commits atomiques)
- ✅ Tests après chaque phase
- ✅ Possibilité de rollback par phase

### Risque 2: Imports Cassés
**Probabilité**: HAUTE
**Impact**: MOYEN

**Mitigation**:
- ✅ Utiliser Find & Replace IDE (VSCode)
- ✅ TypeScript détecte les imports cassés
- ✅ `npm run type-check` après chaque phase
- ✅ Tests manuels exhaustifs

### Risque 3: Perte de Fonctionnalité
**Probabilité**: MOYENNE
**Impact**: HAUT

**Mitigation**:
- ✅ Auditer composants avant fusion/suppression
- ✅ Comparer versions (UI duplications)
- ✅ Tests manuels de toutes les features
- ✅ Checklist fonctionnalités

### Risque 4: Sanity Studio Cassé
**Probabilité**: MOYENNE
**Impact**: CRITIQUE

**Mitigation**:
- ✅ Tester Studio après chaque modif Sanity
- ✅ Garder backup sanity.config.ts
- ✅ Vérifier connexion CMS
- ✅ Tester création/édition documents

### Risque 5: Performance Dégradée
**Probabilité**: FAIBLE
**Impact**: MOYEN

**Mitigation**:
- ✅ Lighthouse avant/après
- ✅ Bundle analyzer avant/après
- ✅ Tests de charge
- ✅ Monitoring production

---

## Métriques de Succès

### Avant Migration

| Métrique | Valeur |
|----------|--------|
| **Composants UI** | 74 (20 + 54 dupliqués) |
| **Hooks** | 27 (9 dupliqués) |
| **Fichiers CSS** | 11 (dispersés) |
| **Types deprecated** | 2 dossiers |
| **Config files** | Manque Prettier, EditorConfig |
| **Documentation** | Fragmentée (docs/) |
| **Import paths** | 5 patterns (@/, @ui/, @hooks/, @lib/, @sanity/) |
| **Sanity location** | Racine (hors src/) |
| **Structure score** | 6/10 |

### Après Migration

| Métrique | Cible |
|----------|-------|
| **Composants UI** | 74 (0 duplication, dans src/ui/) |
| **Hooks** | 27 (0 duplication, dans src/hooks/) |
| **Fichiers CSS** | Architecture 3 layers (globals/, frontend/, sanity/) |
| **Types deprecated** | 0 |
| **Config files** | Prettier + EditorConfig + NVM/NPM |
| **Documentation** | CONVENTIONS.md + docs/ (cohérent) |
| **Import paths** | Cohérent (@/* uniquement) |
| **Sanity location** | src/sanity/ (cohérent) |
| **Structure score** | 9/10 |

---

## Conclusion

### Structure de Référence est Meilleure ✅

**Pourquoi**:
1. ✅ **Séparation claire**: UI / App / CMS isolés
2. ✅ **Architecture modulaire**: Styles en layers extensibles
3. ✅ **Scalabilité**: Structure préparée pour croissance
4. ✅ **Conventions documentées**: CONVENTIONS.md de 544 lignes
5. ✅ **Tooling moderne**: Prettier, EditorConfig, Turbopack
6. ✅ **DX optimisée**: Import order, formatage auto
7. ✅ **Maintenabilité**: Chaque chose à sa place
8. ✅ **0 duplication**: Principe DRY respecté

**Pour le Projet Garderie**:
- ✅ **Migration vaut l'effort**: 15-16h pour structure pro
- ✅ **Gains long terme**: Maintenance facilitée, onboarding rapide
- ✅ **Compatibilité**: Stack compatible (Next.js, Tailwind, Shadcn)
- ✅ **Production-ready**: Template enterprise-grade

### Recommandation Finale

**Adopter Option A: Migration Complète** ✅

**Raisons**:
1. Projet en production depuis un moment → refacto structurelle nécessaire
2. Duplications critiques → doivent être corrigées de toute façon
3. Migration partielle → dette technique reste
4. Structure référence → battle-tested, documentée
5. ROI positif → 15h investies pour des années de maintenance facilitée

**Timing**:
- Phase 1-6 (préparation → Sanity): **1 journée** (8h)
- Phase 7-10 (doc → tests): **1 journée** (8h)
- **Total**: 2 jours de travail concentré

**Alternative si contraintes temps**:
- Option B (compromis): 1 journée (8h)
- Fusionner UI, consolider hooks, ajouter Prettier
- Reporter reste à plus tard

---

**Prochaine Étape**: Validation et Go/No-Go sur Option A vs Option B ?
