# 📊 Analyse de la Structure du Projet

**Date d'analyse** : 2024  
**Projet** : Garderie Les P'tits Loups  
**Stack** : Next.js 15 + Sanity CMS + TypeScript

---

## 📋 Table des Matières

1. [Structure Actuelle Détaillée](#structure-actuelle-détaillée)
2. [Problèmes Identifiés](#problèmes-identifiés)
3. [Recommandations Best Practices](#recommandations-best-practices)
4. [Proposition de Réorganisation](#proposition-de-réorganisation)

---

## 📁 Structure Actuelle Détaillée

### 🔴 Racine du Projet

```
garderie-les-ptits-loups/
├── 📚 docs/                    # Documentation
│   ├── dev/                   # Docs de développement
│   ├── features/              # Docs des features
│   ├── performance/           # Docs de performance
│   ├── sanity/                # Docs Sanity
│   ├── setup/                 # Docs de setup
│   └── tests/                 # Docs de tests
│
├── 🌐 public/                  # Fichiers statiques (Next.js)
│   ├── *.webp                 # Images optimisées
│   └── *.svg                  # Icônes
│
├── 🗄️ src/                     # Code source Next.js
│   ├── app/                   # Pages Next.js (App Router)
│   ├── components/            # Composants React
│   ├── hooks/                 # Hooks React (⚠️ STRUCTURE DÉSORGANISÉE)
│   ├── lib/                   # Utilitaires
│   ├── types/                 # Types TypeScript
│   ├── constants/             # Constantes
│   ├── data/                  # Données statiques
│   ├── providers/             # Providers React
│   ├── scripts/               # Scripts applicatifs
│   ├── styles/                # Styles CSS
│   └── utils/                 # Utilitaires
│
├── 🎨 sanity/                  # Configuration Sanity CMS
│   ├── components/            # Composants Sanity Studio
│   ├── config/                # Configuration Sanity
│   ├── hooks/                 # Hooks Sanity
│   ├── lib/                   # Bibliothèques Sanity
│   ├── queries/               # Requêtes GROQ
│   ├── schemas/               # Schémas de contenu
│   ├── styles/                # Styles Sanity Studio
│   └── types/                 # ✨ PROPOSÉ - Types TypeScript Sanity
│
├── 📝 scripts/                 # Scripts de maintenance (⚠️ DUPLICATIONS)
│   ├── clesn/                 # ❌ Doublon mal nommé
│   ├── fix/                   # Scripts de correction (⚠️ DUPLICATIONS)
│   ├── tests/                 # Scripts de test
│   └── tools/                 # Outils (⚠️ DUPLICATIONS)
│
├── 📦 lib/                     # ❌ CONFUSION : Doublon avec src/lib/
│   ├── performance/
│   └── sanity/                # ❌ Doublon avec src/lib/
│
├── 📦 vendor/                  # ❌ Anciennes versions (déjà dans .gitignore)
│   ├── components/
│   ├── design-tokens/
│   ├── fluid-system/
│   └── fonts/
│
├── 📊 reports/                 # Rapports d'analyse
│   └── *.md, *.json
│
└── ⚙️ Configuration
    ├── next.config.ts
    ├── sanity.config.ts
    ├── tsconfig.json
    ├── package.json
    └── components.json
```

---

## 🚨 Problèmes Identifiés

### 1. **Structure Hybride des Hooks** (OBSERVATION - PAS DE PROBLÈME)

**Situation** : Les hooks sont organisés de manière hybride - certains à la racine, d'autres dans des sous-dossiers :

```
src/hooks/
├── useConsoleLogs.ts           # ⚠️ Vérifier utilisation
├── useFormValidation.ts        # ✅ UTILISÉ dans ContactForm.tsx, ContactFormSection.tsx
├── useLocalStorage.ts          # ⚠️ Vérifier utilisation
├── useMaps.ts                  # ✅ UTILISÉ dans BottomBar.tsx, MapSection.tsx, MapActions.tsx, StaticMap.tsx
├── useQueries.ts               # ⚠️ Vérifier utilisation
├── useRecaptchaV2.ts           # ✅ UTILISÉ dans ContactForm.tsx
├── useScollParalax.ts          # ✅ UTILISÉ dans HeroGlobal.tsx, ParalaxImage.tsx
├── useScroll.ts                # ✅ UTILISÉ dans BackToTop.tsx, BottomBar.tsx
├── useWindowSize.ts            # ✅ UTILISÉ dans Header.tsx, MobileNavigation.tsx, SubsidiesTable.tsx
│
├── a11y/                       # ✅ Organisé (hooks d'accessibilité) - UTILISÉ dans button.tsx
├── components/                 # ℹ️ Versions alternatives/anciennes (non utilisées actuellement)
├── forms/                      # ℹ️ Versions alternatives/anciennes (non utilisées actuellement)
├── queries/                    # ℹ️ Versions alternatives/anciennes (non utilisées actuellement)
├── tests/                      # ℹ️ Versions alternatives/anciennes (non utilisées actuellement)
└── utils/                      # ℹ️ Versions alternatives/anciennes (non utilisées actuellement)
```

**⚠️ IMPORTANT** : Les fichiers à la racine sont **ACTUELLEMENT UTILISÉS** dans le code. Les sous-dossiers contiennent des versions différentes ou alternatives qui ne sont pas utilisées.

**✅ Conclusion** : Cette structure fonctionne correctement. Les hooks à la racine doivent être **CONSERVÉS**. Les fichiers dans les sous-dossiers peuvent être des versions de sauvegarde ou alternatives, mais ne doivent PAS être proposés comme remplacement.

---

### 2. **Duplication de Structure `lib/`** (MAJEUR)

**Problème** : Deux dossiers `lib/` différents :

- `/lib/` (racine) : Contient `sanity/` et `performance/`
- `/src/lib/` : Contient `imageOptimization.ts`, `theme-utils.ts`, `utils.ts`

**Impact** : Confusion sur où placer les utilitaires, imports incohérents.

---

### 3. **Duplication de Scripts** (MAJEUR)

**Problème** : Scripts dupliqués dans plusieurs emplacements :

```
scripts/
├── kill-ports.sh               # ✅ Utilisé dans package.json
├── tools/kill-ports.sh         # ❌ DOUBLON (non utilisé)
│
├── fix-page.mjs                # ✅ Utilisé dans package.json
├── fix/fix-page.mjs            # ❌ DOUBLON
│
├── fix-prices-types.mjs        # ✅ Utilisé dans package.json
├── fix/fix-prices-types.mjs    # ❌ DOUBLON
│
├── check-button-accessibility.mjs    # ❌ Non utilisé
├── fix/check-button-accessibility.mjs # ⚠️ Version différente (chemin relatif)
│
├── cleanup-unused-media.mjs    # ✅ Utilisé dans package.json
└── clesn/cleanup-unused-media.mjs    # ❌ DOUBLON + mal nommé ("clesn" au lieu de "clean")
```

**Impact** : Maintenance difficile, scripts potentiellement obsolètes.

---

### 4. **Structure Incohérente des Composants**

**Problème** : Organisation mixte entre catégories :

```
src/components/
├── dev/                        # ✅ Composants de développement
├── forms/                      # ✅ Composants de formulaires
├── gallery/                    # ✅ Composants de galerie
├── icons/                      # ✅ Système d'icônes
├── layout/                     # ✅ Layout (Header, Footer)
├── lazy/                       # ✅ Composants lazy-load
├── pages/                      # ✅ Sections de pages (by page)
│   ├── about/
│   ├── contact/
│   ├── exemples/
│   ├── home/
│   ├── horaires-tarifs/
│   └── sector/
│
├── shared/                     # ⚠️ MÉLANGE : Composants réutilisables
│   ├── maps/                   # ⚠️ Sous-module qui devrait être à la racine ?
│   ├── navigation/             # ⚠️ Pourquoi pas dans layout/ ?
│   ├── pricing/                # ⚠️ Pourquoi pas dans forms/ ou pages/ ?
│   └── richtext/               # ✅ Logique
│
└── ui/                         # ✅ Composants Shadcn/UI (ne pas modifier)
```

**Impact** : Difficile de savoir où placer un nouveau composant.

---

### 5. **Dossiers Ignorés mais Présents** (MINEUR)

**Problème** : Dossiers dans `.gitignore` mais toujours présents :

- `vendor/` : Anciennes versions, devrait être supprimé ou archiver
- `.ressources/` : Sauvegardes, devrait être dans un dossier d'archive
- `docs/` : Documenté dans `.gitignore` mais commité

**Impact** : Incohérence, confusion.

---

### 6. **Organisation des Types** (IMPORTANT)

**Problème** : Types Sanity dispersés dans `src/` alors que tout le reste est dans `sanity/` :

```
src/types/
├── breakpoints.ts              # ✅ Type applicatif (OK)
├── map.ts                      # ✅ Type applicatif (OK)
├── richText.ts                 # ✅ Type applicatif (OK)
├── sanity.ts                   # ❌ Types Sanity (devrait être dans sanity/types/)
│
├── components/                 # ✅ Organisé
│   └── button.ts
│
├── queries/                    # ❌ Types Sanity (devrait être dans sanity/types/pages/)
│   └── *.ts                    # Types de pages home, about, contact, etc.
│
└── sanity/                     # ❌ Types Sanity (devrait être dans sanity/types/core/)
    ├── portableText.ts         # Types Portable Text
    └── sectorPage.ts           # Types de pages et images
```

**Impact** :

- Incohérence : Types Sanity dans `src/` alors que `components/`, `lib/`, `queries/` sont dans `sanity/`
- Confusion sur où trouver les types Sanity
- Dépendances croisées entre `types/queries/` et `types/sanity/`

**✅ Proposition** : Créer `sanity/types/` pour centraliser tous les types Sanity, comme `sanity/components/` et `sanity/lib/`.

---

### 7. **Organisation des Données** (MINEUR)

**Problème** : Mélange de données statiques et types :

```
src/data/
├── partners.ts                 # ✅ Données typées
├── prices.ts                   # ✅ Données typées
├── spaces.ts                   # ✅ Données typées
├── structures.ts               # ✅ Données typées
├── testimonials.ts             # ✅ Données typées
│
└── response-queries/           # ⚠️ JSON d'exemples (devrait être dans docs/examples/ ?)
    └── *.json
```

**Impact** : Confusion entre données réelles et exemples de réponses API.

---

## 📚 Recommandations Best Practices

### Next.js 15 + App Router

**Structure recommandée** :

```
src/
├── app/                        # Routes Next.js (App Router)
│   ├── (routes)/              # Routes groupées
│   ├── api/                   # API Routes
│   └── layout.tsx             # Layout racine
│
├── components/                 # Composants React
│   ├── ui/                    # Composants UI de base (Shadcn)
│   ├── features/              # Composants par feature
│   └── layout/                # Composants de layout
│
├── lib/                        # Utilitaires et config
│   ├── utils.ts               # Fonctions utilitaires
│   └── (domain)/              # Utilitaires par domaine
│
├── hooks/                      # Hooks React (UN SEUL NIVEAU)
│   └── use*.ts                # Hooks au même niveau
│
├── types/                      # Types TypeScript globaux
└── styles/                     # Styles CSS globaux
```

### Sanity CMS

**Structure recommandée** :

```
sanity/
├── schemas/                    # Schémas de contenu
│   ├── documents/             # Documents (pages, etc.)
│   ├── objects/               # Objets réutilisables
│   └── components/            # Composants de schéma
│
├── queries/                    # Requêtes GROQ
├── plugins/                    # Plugins Sanity
├── components/                 # Composants Sanity Studio
├── lib/                        # Utilitaires Sanity
└── config/                     # Configuration Sanity
```

---

## 🎯 Proposition de Réorganisation

### Phase 1 : Nettoyage (URGENT)

#### 1.1 Hooks - ✅ AUCUNE ACTION NÉCESSAIRE

**⚠️ IMPORTANT** : Les fichiers à la racine de `src/hooks/` sont **ACTUELLEMENT UTILISÉS** dans le code. Ils doivent être **CONSERVÉS**.

Les fichiers dans les sous-dossiers (`tests/useConsoleLogs.ts`, `forms/useFormValidation.ts`, `components/useMaps.ts`, etc.) **EXISTENT** mais sont des **versions alternatives** qui ne sont **PAS utilisées** actuellement.

**✅ Conclusion** :

- Les hooks à la racine sont les **VERSIONS ACTIVES** utilisées dans le code
- Les fichiers dans les sous-dossiers sont des versions alternatives/anciennes
- **AUCUNE SUPPRESSION** ne doit être effectuée
- La structure actuelle fonctionne correctement

#### 1.2 Scripts - Consolidation

**Action** : Supprimer les doublons et garder une structure unique :

```
scripts/
├── cleanup/                   # Scripts de nettoyage
│   └── cleanup-unused-media.mjs
├── fix/                       # Scripts de correction
│   ├── fix-page.mjs
│   ├── fix-prices-types.mjs
│   └── check-button-accessibility.mjs
├── tests/                     # Scripts de test
├── tools/                     # Outils utilitaires
│   └── kill-ports.sh
└── README.md
```

**Fichiers à supprimer** :

- `scripts/clesn/` → Intégrer dans `scripts/cleanup/` (corriger le nom)
- `scripts/tools/kill-ports.sh` → Utiliser `scripts/kill-ports.sh`
- `scripts/fix-page.mjs` → Utiliser `scripts/fix/fix-page.mjs`
- `scripts/fix-prices-types.mjs` → Utiliser `scripts/fix/fix-prices-types.mjs`
- `scripts/check-button-accessibility.mjs` → Déterminer la bonne version

#### 1.3 Lib - Consolidation

**Action** : Déplacer `/lib/` vers `/src/lib/` :

```
src/lib/
├── utils.ts                   # ✅ Utilitaires généraux
├── imageOptimization.ts       # ✅ Utilitaires images
├── theme-utils.ts             # ✅ Utilitaires thème
│
├── performance/               # ✅ Performance (déplacé depuis /lib/)
│   └── measure.ts
│
└── sanity/                    # ✅ Sanity (déplacé depuis /lib/)
    ├── adapters/
    ├── client.ts
    ├── env.ts
    ├── helpers/
    └── queries/
```

**Fichiers à supprimer** :

- `/lib/` → Tout déplacer vers `/src/lib/`

---

### Phase 2 : Réorganisation (IMPORTANT)

#### 2.1 Composants - Réorganisation

**Proposition** :

```
src/components/
├── ui/                        # ✅ Composants Shadcn/UI (ne pas modifier)
│
├── layout/                    # ✅ Layout global
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── MainNavigationMenu.tsx
│   └── MobileMenu.tsx
│
├── features/                  # ✅ Composants par feature métier
│   ├── contact/
│   │   ├── ContactForm.tsx
│   │   └── MapSection.tsx
│   ├── gallery/
│   │   ├── Gallery.tsx
│   │   └── GalleryWithLightbox.tsx
│   ├── pricing/
│   │   ├── PricingList.tsx
│   │   └── SubsidiesTable.tsx
│   └── partners/
│       └── Partners.tsx
│
├── content/                   # ✅ Composants de contenu
│   ├── HeroGlobal.tsx
│   ├── ParalaxImage.tsx
│   └── richtext/
│       └── RichTextRenderer.tsx
│
├── navigation/                # ✅ Navigation (extrait de shared/)
│   ├── BackToTop.tsx
│   ├── BottomBar.tsx
│   └── MobileNavigation.tsx
│
└── dev/                       # ✅ Composants de développement
    └── DevJsonViewer.tsx
```

**Changements** :

- `shared/maps/` → `features/contact/MapSection.tsx` (car utilisé uniquement dans contact)
- `shared/navigation/` → `components/navigation/`
- `shared/pricing/` → `features/pricing/`
- `pages/` → Reste tel quel (sections spécifiques par page)

#### 2.2 Types - Consolidation

**Proposition** :

```
src/types/
├── global/                    # Types globaux
│   ├── breakpoints.ts
│   └── map.ts
│
├── components/                # Types de composants
│   └── button.ts
│
├── sanity/                    # Types Sanity unifiés
│   ├── index.ts
│   ├── portableText.ts
│   ├── sectorPage.ts
│   └── queries/               # ⚠️ Déplacer types/queries/ ici
│       ├── about.ts
│       ├── contact.ts
│       ├── home.ts
│       └── ...
│
└── app/                       # Types spécifiques à l'app
    └── richText.ts
```

**Changements** :

- Fusionner `types/queries/` et `types/sanity/` → `types/sanity/queries/`
- Garder une séparation claire entre types Sanity et types applicatifs

---

### Phase 3 : Optimisation (RECOMMANDÉ)

#### 3.1 Dossiers Ignorés

**Action** : Nettoyer les dossiers archivés :

- **Option A** : Supprimer `vendor/` et `.ressources/` (si sauvegardes faites)
- **Option B** : Créer un dossier `archive/` et y déplacer ces dossiers

#### 3.2 Documentation

**Action** : Déplacer `docs/` en dehors du `.gitignore` OU créer une structure claire :

```
docs/
├── architecture/              # Architecture
├── development/               # Guide de développement
├── features/                  # Documentation des features
└── deployment/                # Guide de déploiement
```

#### 3.3 Scripts - Amélioration

**Action** : Créer une structure plus claire :

```
scripts/
├── maintenance/               # Scripts de maintenance
│   ├── cleanup/
│   └── fix/
├── testing/                   # Scripts de test
├── tools/                     # Outils utilitaires
└── README.md                  # Documentation complète
```

---

## 📋 Checklist de Réorganisation

### Phase 1 : Nettoyage (URGENT)

- [ ] Supprimer doublons dans `src/hooks/`
- [ ] Mettre à jour tous les imports de hooks
- [ ] Supprimer doublons dans `scripts/`
- [ ] Mettre à jour `package.json` avec les bons chemins
- [ ] Déplacer `/lib/` vers `/src/lib/`
- [ ] Mettre à jour tous les imports de lib

### Phase 2 : Réorganisation (IMPORTANT)

- [ ] Réorganiser `src/components/` selon la nouvelle structure
- [ ] Mettre à jour tous les imports de composants
- [ ] Consolider `src/types/` (fusionner queries et sanity)
- [ ] Mettre à jour tous les imports de types

### Phase 3 : Optimisation (RECOMMANDÉ)

- [ ] Nettoyer `vendor/` et `.ressources/`
- [ ] Réorganiser `docs/`
- [ ] Améliorer la structure de `scripts/`
- [ ] Créer un document de guidelines pour la structure

---

## 🎯 Structure Cible Finale

```
garderie-les-ptits-loups/
├── 📚 docs/                    # Documentation
├── 🌐 public/                  # Fichiers statiques
├── 🗄️ src/                     # Code source Next.js
│   ├── app/                   # Pages (App Router)
│   ├── components/            # Composants React (organisés)
│   ├── hooks/                 # Hooks (structure unifiée)
│   ├── lib/                   # Utilitaires (un seul emplacement)
│   ├── types/                 # Types (organisation claire)
│   ├── constants/             # Constantes
│   ├── data/                  # Données statiques
│   ├── providers/             # Providers React
│   ├── scripts/               # Scripts applicatifs
│   ├── styles/                # Styles CSS
│   └── utils/                 # Utilitaires (si différents de lib/)
│
├── 🎨 sanity/                  # Configuration Sanity
├── 📝 scripts/                 # Scripts de maintenance (structure unique)
├── 📊 reports/                 # Rapports d'analyse
└── ⚙️ Configuration files
```

---

## 📝 Notes Finales

Cette réorganisation permettra :

✅ **Clarté** : Chaque fichier a un emplacement évident  
✅ **Maintenabilité** : Pas de doublons, structure cohérente  
✅ **Scalabilité** : Structure adaptée à la croissance  
✅ **Best Practices** : Respect des conventions Next.js et Sanity  
✅ **Onboarding** : Facile pour nouveaux développeurs

**Prochaine étape** : Valider cette proposition et commencer la Phase 1 (nettoyage).
