# 🎯 Plan de Réorganisation - Structure du Projet

**Date** : 2024  
**Objectif** : Mettre en place une structure cohérente, durable et conforme aux best practices Next.js 15 + Sanity CMS

---

## 📋 Vue d'Ensemble

Ce plan propose une réorganisation en **3 phases** pour passer d'une structure désorganisée à une structure professionnelle et maintenable.

### 🔴 Problèmes Majeurs à Résoudre

1. **Duplications** : Hooks, scripts et libs en double
2. **Confusion** : Plusieurs emplacements pour le même type de fichier
3. **Incohérence** : Structure mixte entre catégories et fonctionnalités
4. **Maintenance** : Difficulté à trouver et maintenir le code

---

## 🎯 Structure Cible Finale

### Architecture Générale

```
garderie-les-ptits-loups/
├── 📚 docs/                    # Documentation du projet
├── 🌐 public/                  # Assets statiques (Next.js)
├── 🗄️ src/                     # Code source Next.js
│   ├── app/                   # Routes Next.js (App Router)
│   ├── components/            # Composants React organisés
│   ├── hooks/                 # Hooks React (structure unifiée)
│   ├── lib/                   # Utilitaires et config (un seul emplacement)
│   ├── types/                 # Types TypeScript (organisation claire)
│   ├── constants/             # Constantes applicatives
│   ├── data/                  # Données statiques
│   ├── providers/             # Providers React
│   ├── scripts/               # Scripts applicatifs (si nécessaire)
│   ├── styles/                # Styles CSS globaux
│   └── utils/                 # Utilitaires (si différents de lib/)
│
├── 🎨 sanity/                  # Configuration Sanity CMS
│   ├── schemas/               # Schémas de contenu
│   ├── queries/               # Requêtes GROQ
│   ├── components/            # Composants Sanity Studio
│   ├── lib/                   # Utilitaires Sanity
│   └── config/                # Configuration Sanity
│
├── 📝 scripts/                 # Scripts de maintenance et outils
│   ├── maintenance/           # Scripts de maintenance
│   ├── testing/               # Scripts de test
│   └── tools/                 # Outils utilitaires
│
├── 📊 reports/                 # Rapports d'analyse (optionnel)
└── ⚙️ Configuration files      # next.config.ts, tsconfig.json, etc.
```

---

## 📐 Structure Détaillée par Phase

### Phase 1 : Nettoyage (URGENT)

#### 1.1 Hooks - ✅ AUCUNE ACTION NÉCESSAIRE

**⚠️ IMPORTANT - Vérification complète des imports effectuée** :

Les fichiers à la racine de `src/hooks/` sont **ACTUELLEMENT UTILISÉS** dans le code :

```
src/hooks/
├── useFormValidation.ts       ✅ UTILISÉ dans ContactForm.tsx, ContactFormSection.tsx
├── useRecaptchaV2.ts          ✅ UTILISÉ dans ContactForm.tsx
├── useMaps.ts                 ✅ UTILISÉ dans 4 composants (BottomBar, MapSection, MapActions, StaticMap)
├── useScollParalax.ts         ✅ UTILISÉ dans 2 composants (HeroGlobal, ParalaxImage)
├── useScroll.ts               ✅ UTILISÉ dans 2 composants (BackToTop, BottomBar)
├── useWindowSize.ts           ✅ UTILISÉ dans 3 composants (Header, MobileNavigation, SubsidiesTable)
├── useConsoleLogs.ts          ⚠️ À vérifier si utilisé
├── useLocalStorage.ts         ⚠️ À vérifier si utilisé
├── useQueries.ts              ⚠️ À vérifier si utilisé
│
├── a11y/                      ✅ Organisé - UTILISÉ (hooks d'accessibilité)
├── components/                ℹ️ Versions alternatives (non utilisées actuellement)
├── forms/                     ℹ️ Versions alternatives (non utilisées actuellement)
├── queries/                   ℹ️ Versions alternatives (non utilisées actuellement)
├── tests/                     ℹ️ Versions alternatives (non utilisées actuellement)
└── utils/                     ℹ️ Versions alternatives (non utilisées actuellement)
```

**✅ Conclusion** : Les hooks à la racine sont les **VERSIONS ACTIVES** utilisées dans le code. Ils doivent être **CONSERVÉS**.

**❌ NE PAS SUPPRIMER** ces fichiers. Les sous-dossiers contiennent des versions alternatives ou anciennes qui ne sont pas utilisées.

**✅ Action recommandée** : **AUCUNE ACTION**. La structure actuelle fonctionne correctement.

Si souhaité dans le futur, on peut nettoyer les fichiers non utilisés dans les sous-dossiers après vérification approfondie, mais cela n'est pas urgent.

---

#### 1.2 Consolidation des Scripts

**Structure actuelle** (problématique) :

```
scripts/
├── kill-ports.sh              ✅ Utilisé
├── tools/kill-ports.sh        ❌ Doublon
├── fix-page.mjs               ✅ Utilisé
├── fix/fix-page.mjs           ❌ Doublon
├── fix-prices-types.mjs       ✅ Utilisé
├── fix/fix-prices-types.mjs   ❌ Doublon
├── check-button-accessibility.mjs  ❌ Non utilisé
├── fix/check-button-accessibility.mjs  ⚠️ Version différente
├── cleanup-unused-media.mjs   ✅ Utilisé
├── clesn/cleanup-unused-media.mjs    ❌ Doublon + mal nommé
├── tests/
└── tools/
```

**✅ Structure finale implémentée** :

```
scripts/
├── clean/                     # ✅ Scripts de nettoyage
│   ├── cleanup-unused-media.mjs
│   ├── cleanup-sanity-cache.mjs
│   ├── delete-draft-and-assets.mjs
│   ├── fix-orphaned-references.mjs
│   ├── verify-deleted-assets.mjs
│   └── check-specific-assets.mjs
│
├── fix/                       # ✅ Scripts de correction
│   ├── fix-page.mjs
│   ├── fix-prices-types.mjs
│   └── check-button-accessibility.mjs
│
├── tests/                     # ✅ Scripts de test
│   ├── analyze-lighthouse.mjs
│   ├── audit-all-components.mjs
│   ├── run-lighthouse.mjs
│   ├── test-accessibility-simple.mjs
│   ├── test-accessibility.mjs
│   └── test-performance.mjs
│
├── tools/                     # ✅ Outils utilitaires
│   └── kill-ports.sh
│
└── README.md                  # Documentation complète
```

**Actions** :

1. Créer la nouvelle structure de dossiers
2. Déplacer les scripts dans les bons dossiers
3. Supprimer tous les doublons
4. Mettre à jour `package.json` avec les nouveaux chemins
5. Tester tous les scripts

**✅ Mises à jour package.json effectuées** :

```json
{
  "scripts": {
    "cleanup:media": "node scripts/clean/cleanup-unused-media.mjs",
    "verify:assets": "node scripts/clean/verify-deleted-assets.mjs",
    "fix:orphans": "node scripts/clean/fix-orphaned-references.mjs",
    "cleanup:sanity-cache": "node scripts/clean/cleanup-sanity-cache.mjs",
    "delete:draft-assets": "node scripts/clean/delete-draft-and-assets.mjs",
    "fix:page": "node scripts/fix/fix-page.mjs",
    "fix:prices": "node scripts/fix/fix-prices-types.mjs",
    "kill:dev": "sh scripts/tools/kill-ports.sh 3000 3333",
    "kill:prod": "sh scripts/tools/kill-ports.sh 3100",
    "kill:all": "sh scripts/tools/kill-ports.sh 3000 3100 3333",
    "perf": "tsx scripts/tests/test-performance.mjs",
    "lighthouse": "node scripts/tests/run-lighthouse.mjs",
    "lighthouse:analyze": "node scripts/tests/analyze-lighthouse.mjs"
  }
}
```

---

#### 1.3 Consolidation de lib/

**Structure actuelle** (problématique) :

```
/lib/                          ❌ Racine (confusion)
├── performance/
│   └── measure.ts
└── sanity/
    ├── adapters/
    ├── client.ts
    └── queries/

/src/lib/                      ❌ Deuxième emplacement
├── imageOptimization.ts
├── theme-utils.ts
└── utils.ts
```

**Structure cible** :

```
src/lib/
├── utils.ts                   # Utilitaires généraux
├── imageOptimization.ts       # Utilitaires images
├── theme-utils.ts             # Utilitaires thème
│
├── performance/               # Performance (déplacé depuis /lib/)
│   └── measure.ts
│
└── sanity/                    # Sanity (déplacé depuis /lib/)
    ├── adapters/
    │   └── prices.ts
    ├── client.ts
    ├── env.ts
    ├── helpers/
    │   ├── galleryTransform.ts
    │   └── imageProps.ts
    ├── index.ts
    └── queries/
        ├── about.ts
        ├── contact.ts
        ├── footer.ts
        ├── home.ts
        ├── index.ts
        ├── partners.ts
        ├── prices.ts
        ├── schedule.ts
        ├── sectors.ts
        └── shared.ts
```

**Actions** :

1. Déplacer tout le contenu de `/lib/` vers `/src/lib/`
2. Supprimer le dossier `/lib/` vide
3. Rechercher et remplacer tous les imports `@/lib/` ou `../../lib/`

---

### Phase 2 : Réorganisation (IMPORTANT)

#### 2.1 Réorganisation des Composants

**Structure actuelle** (problématique) :

```
src/components/
├── dev/                        ✅ Logique
├── forms/                      ✅ Logique
├── gallery/                    ✅ Logique
├── icons/                      ✅ Logique
├── layout/                     ✅ Logique
├── lazy/                       ✅ Logique
├── pages/                      ✅ Sections par page
│   ├── about/
│   ├── contact/
│   ├── home/
│   └── sector/
├── shared/                     ⚠️ Mélange de catégories
│   ├── maps/
│   ├── navigation/
│   ├── pricing/
│   └── richtext/
└── ui/                         ✅ Composants Shadcn
```

**Structure cible** :

```
src/components/
├── ui/                         # Composants Shadcn/UI (ne pas modifier)
│   ├── accordion.tsx
│   ├── button.tsx
│   ├── card.tsx
│   └── variants/
│
├── layout/                     # Layout global de l'application
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── MainNavigationMenu.tsx
│   └── MobileMenu.tsx
│
├── features/                   # Composants par feature métier
│   ├── contact/
│   │   ├── ContactForm.tsx
│   │   ├── MapSection.tsx      # Déplacé depuis shared/maps/
│   │   └── index.ts
│   ├── gallery/
│   │   ├── Gallery.tsx
│   │   ├── GalleryWithLightbox.tsx
│   │   └── LightboxCustom.tsx
│   ├── pricing/
│   │   ├── PricingList.tsx     # Déplacé depuis shared/pricing/
│   │   ├── SubsidiesTable.tsx  # Déplacé depuis shared/pricing/
│   │   └── index.ts
│   └── partners/
│       └── Partners.tsx
│
├── content/                    # Composants de contenu réutilisables
│   ├── HeroGlobal.tsx
│   ├── ParalaxImage.tsx
│   ├── richtext/
│   │   ├── RichTextRenderer.tsx
│   │   ├── RichTextList.tsx
│   │   ├── RichTextQuote.tsx
│   │   └── RichTextTitle.tsx
│   └── index.ts
│
├── navigation/                 # Composants de navigation (extrait de shared/)
│   ├── BackToTop.tsx
│   ├── BottomBar.tsx
│   ├── MobileNavigation.tsx
│   └── index.ts
│
├── forms/                      # Composants de formulaires réutilisables
│   ├── ContactForm.tsx         # Si utilisé ailleurs que dans contact
│   ├── HoneypotField.tsx
│   ├── InputField.tsx
│   ├── TextareaField.tsx
│   ├── recaptcha-v2.tsx
│   └── index.ts
│
├── icons/                      # Système d'icônes
│   ├── Icon.tsx
│   ├── registry.ts
│   └── index.ts
│
├── lazy/                       # Composants lazy-load
│   ├── ClientOnlyComponents.tsx
│   ├── createLazyComponent.tsx
│   ├── LazySkeletons.tsx
│   └── index.ts
│
├── pages/                      # Sections spécifiques par page
│   ├── about/
│   ├── contact/
│   ├── exemples/
│   ├── home/
│   ├── horaires-tarifs/
│   └── sector/
│
└── dev/                        # Composants de développement
    ├── DevJsonViewer.tsx
    └── index.ts
```

**Actions** :

1. Créer la nouvelle structure de dossiers
2. Déplacer `shared/maps/` vers `features/contact/MapSection.tsx` (si utilisé uniquement dans contact)
3. Déplacer `shared/navigation/` vers `components/navigation/`
4. Déplacer `shared/pricing/` vers `features/pricing/`
5. Déplacer `shared/richtext/` vers `content/richtext/`
6. Supprimer le dossier `shared/` vide
7. Mettre à jour tous les imports
8. Mettre à jour les fichiers `index.ts` (barrel exports)

---

#### 2.2 Types - Migration vers `sanity/types/` ✨ NOUVEAU

**🎯 Proposition** : Créer `sanity/types/` pour centraliser **TOUS** les types Sanity, comme `sanity/components/` et `sanity/lib/`.

**Structure actuelle** (problématique) :

```
src/types/
├── breakpoints.ts              # ✅ Type applicatif (OK)
├── map.ts                      # ✅ Type applicatif (OK)
├── richText.ts                 # ✅ Type applicatif (OK)
├── sanity.ts                   # ❌ Types Sanity (devrait être dans sanity/types/)
├── components/                 # ✅ Types de composants (OK)
│   └── button.ts
├── queries/                    # ❌ Types Sanity (devrait être dans sanity/types/pages/)
│   ├── about.ts
│   ├── contact.ts
│   └── ...
└── sanity/                     # ❌ Types Sanity (devrait être dans sanity/types/core/)
    ├── portableText.ts
    └── sectorPage.ts
```

**✅ Structure finale implémentée** :

```
sanity/types/                   # ✅ IMPLÉMENTÉ - Centralise TOUS les types Sanity
├── index.ts                    # Barrel export principal
│
├── core/                       # ✅ Types de base Sanity
│   ├── portableText.ts         # Types Portable Text
│   ├── image.ts                # Types d'images Sanity
│   └── index.ts
│
├── pages/                      # ✅ Types de pages
│   ├── home.ts
│   ├── about.ts
│   ├── contact.ts
│   ├── contactPage.ts
│   ├── schedule.ts
│   ├── sectorPage.ts
│   ├── partners.ts
│   ├── testimonials.ts
│   ├── structure.ts
│   ├── espaces.ts
│   ├── prices.ts
│   └── index.ts
│
├── content/                    # ✅ Types de contenu
│   ├── prices.ts               # PriceDocument, SubsidiesDocument
│   ├── general.ts              # News, Activity, Staff
│   └── index.ts
│
└── validation.ts               # ✅ Types de validation Sanity

src/types/                      # Types applicatifs Next.js uniquement
├── breakpoints.ts              # ✅ Types applicatifs
├── map.ts                      # ✅ Types applicatifs
├── richText.ts                 # ✅ Types applicatifs
├── components/                 # ✅ Types de composants React
│   └── button.ts
└── queries/                    # ⚠️ Re-exports de compatibilité (déprécié)
    └── index.ts                # Redirige vers @/sanity/types/pages/*
```

**✅ Actions complétées** :

1. ✅ Créé la structure `sanity/types/` avec sous-dossiers (`core/`, `pages/`, `content/`)
2. ✅ Déplacé `src/types/sanity/*` → `sanity/types/core/` et `sanity/types/pages/`
3. ✅ Déplacé `src/types/queries/*` → `sanity/types/pages/`
4. ✅ Déplacé `src/types/sanity.ts` → `sanity/types/content/`
5. ✅ Créé les barrel exports dans `sanity/types/` (index.ts par dossier)
6. ✅ Mis à jour tous les imports : `@/types/sanity/*` → `@/sanity/types/*`
7. ✅ Ajouté alias `@/sanity/*` dans `tsconfig.json`
8. ✅ Créé re-exports de compatibilité dans `src/types/queries/index.ts`
9. ✅ Vérifié que le build compile correctement

**✅ Avantages** :

- Cohérence : Tous les éléments Sanity dans `sanity/`
- Clarté : Structure organisée par catégorie
- Maintenabilité : Un seul endroit pour les types Sanity
- Séparation : Types Sanity séparés des types applicatifs

**📝 Voir détails complets** : `docs/SANITY_TYPES_REORGANIZATION.md`

---

### Phase 3 : Optimisation (RECOMMANDÉ)

#### 3.1 Nettoyage des Dossiers Archivés

**Action** : Supprimer ou archiver les dossiers ignorés :

- **`vendor/`** : Anciennes versions (déjà dans `.gitignore`)
  - Option A : Supprimer définitivement (si sauvegardes faites)
  - Option B : Créer un dossier `archive/` et y déplacer

- **`.ressources/`** : Sauvegardes (déjà dans `.gitignore`)
  - Option A : Supprimer définitivement (si sauvegardes faites)
  - Option B : Créer un dossier `archive/` et y déplacer

**Recommandation** : Créer un dossier `archive/` à la racine et y déplacer ces dossiers avant suppression (sécurité).

---

#### 3.2 Organisation de la Documentation

**Structure actuelle** :

```
docs/
├── dev/
├── features/
├── performance/
├── sanity/
├── setup/
└── tests/
```

**Structure cible** :

```
docs/
├── architecture/               # Documentation d'architecture
│   └── ARCHITECTURE.md
│
├── development/                # Guides de développement
│   ├── DEV_JSON_VIEWER_USAGE.md
│   └── VISION_QUERIES.md
│
├── features/                   # Documentation des features
│   ├── GALLERY.md
│   ├── LIGHTBOX.md
│   ├── MAP.md
│   └── ...
│
├── deployment/                 # Guides de déploiement
│   ├── SETUP.md
│   ├── DOMAINS.md
│   └── SANITY_DEPLOYMENT.md
│
├── performance/                # Documentation de performance
│   ├── LIGHTHOUSE.md
│   └── SEO.md
│
└── testing/                    # Documentation de tests
    ├── ACCESSIBILITY_TESTS.md
    └── ...
```

**Actions** :

1. Réorganiser les dossiers selon la nouvelle structure
2. Mettre à jour `.gitignore` (retirer `docs/` si nécessaire)
3. Créer un `README.md` principal dans `docs/` avec un index

---

## 🔄 Plan d'Exécution

### Étape 1 : Préparation

1. ✅ Créer une branche Git dédiée : `reorganization/structure`
2. ✅ Faire un commit initial
3. ✅ Vérifier que tous les tests passent
4. ✅ Documenter les dépendances (imports)

### Étape 2 : Phase 1 - Nettoyage

1. **Hooks** (≈ 30 min)
   - [ ] Identifier tous les imports de hooks dupliqués
   - [ ] Supprimer les doublons à la racine
   - [ ] Mettre à jour tous les imports
   - [ ] Tester que tout fonctionne

2. **Scripts** (≈ 45 min)
   - [ ] Créer la nouvelle structure
   - [ ] Déplacer les scripts
   - [ ] Supprimer les doublons
   - [ ] Mettre à jour `package.json`
   - [ ] Tester tous les scripts

3. **Lib** (≈ 30 min)
   - [ ] Déplacer `/lib/` vers `/src/lib/`
   - [ ] Mettre à jour tous les imports
   - [ ] Tester que tout fonctionne

### Étape 3 : Phase 2 - Réorganisation

1. **Composants** (≈ 2h)
   - [ ] Créer la nouvelle structure
   - [ ] Déplacer les composants étape par étape
   - [ ] Mettre à jour tous les imports
   - [ ] Mettre à jour les barrel exports
   - [ ] Tester chaque page

2. **Types** (≈ 1h)
   - [ ] Créer la nouvelle structure
   - [ ] Fusionner les types queries/sanity
   - [ ] Mettre à jour tous les imports
   - [ ] Vérifier TypeScript

### Étape 4 : Phase 3 - Optimisation

1. **Nettoyage** (≈ 30 min)
   - [ ] Créer dossier `archive/`
   - [ ] Déplacer `vendor/` et `.ressources/`
   - [ ] Supprimer ou archiver selon décision

2. **Documentation** (≈ 1h)
   - [ ] Réorganiser `docs/`
   - [ ] Mettre à jour `.gitignore`
   - [ ] Créer un index dans `docs/README.md`

### Étape 5 : Validation

1. ✅ Exécuter tous les tests
2. ✅ Vérifier que le build passe
3. ✅ Tester manuellement l'application
4. ✅ Vérifier tous les imports
5. ✅ Mettre à jour la documentation
6. ✅ Merge dans `main`

---

## 📝 Checklist Complète

### Phase 1 : Nettoyage (URGENT)

#### Hooks - ✅ AUCUNE ACTION NÉCESSAIRE

✅ **Vérification complète effectuée** : Les hooks à la racine sont **ACTUELLEMENT UTILISÉS** dans le code. Ils doivent être **CONSERVÉS**.

**Hooks actifs à conserver** :

- ✅ `useFormValidation.ts` → utilisé dans ContactForm.tsx, ContactFormSection.tsx
- ✅ `useRecaptchaV2.ts` → utilisé dans ContactForm.tsx
- ✅ `useMaps.ts` → utilisé dans 4 composants
- ✅ `useScollParalax.ts` → utilisé dans 2 composants
- ✅ `useScroll.ts` → utilisé dans 2 composants
- ✅ `useWindowSize.ts` → utilisé dans 3 composants

**❌ NE PAS SUPPRIMER** ces fichiers. La structure actuelle fonctionne correctement.

- [ ] (Optionnel - nettoyage futur) Vérifier si les fichiers dans les sous-dossiers (components/, forms/, etc.) sont obsolètes et peuvent être supprimés

#### Scripts - ✅ COMPLÉTÉ

- [x] Créer `scripts/clean/` (structure simplifiée)
- [x] Créer `scripts/fix/`
- [x] Créer `scripts/tests/` (déjà existant)
- [x] Déplacer scripts de cleanup dans `scripts/clean/`
- [x] Déplacer scripts de fix dans `scripts/fix/`
- [x] Scripts de test déjà dans `scripts/tests/`
- [x] Supprimer `scripts/clesn/`
- [x] Mettre à jour `package.json` avec les nouveaux chemins
- [x] Structure finale : `scripts/clean/`, `scripts/fix/`, `scripts/tests/`, `scripts/tools/`

#### Lib

- [ ] Déplacer `/lib/performance/` vers `/src/lib/performance/`
- [ ] Déplacer `/lib/sanity/` vers `/src/lib/sanity/`
- [ ] Supprimer `/lib/` vide
- [ ] Rechercher et remplacer tous les imports

### Phase 2 : Réorganisation (IMPORTANT)

#### Composants

- [ ] Créer `src/components/features/`
- [ ] Créer `src/components/content/`
- [ ] Créer `src/components/navigation/`
- [ ] Déplacer `shared/maps/` vers `features/contact/`
- [ ] Déplacer `shared/navigation/` vers `components/navigation/`
- [ ] Déplacer `shared/pricing/` vers `features/pricing/`
- [ ] Déplacer `shared/richtext/` vers `content/richtext/`
- [ ] Supprimer `shared/` vide
- [ ] Mettre à jour tous les imports
- [ ] Mettre à jour les barrel exports

#### Types - ✅ COMPLÉTÉ

- [x] Créer `sanity/types/` avec sous-dossiers (`core/`, `pages/`, `content/`)
- [x] Déplacer `src/types/sanity/*` → `sanity/types/core/` et `sanity/types/pages/`
- [x] Déplacer `src/types/queries/*` → `sanity/types/pages/`
- [x] Déplacer `src/types/sanity.ts` → `sanity/types/content/`
- [x] Créer les barrel exports dans `sanity/types/`
- [x] Mettre à jour tous les imports : `@/types/sanity/*` → `@/sanity/types/*`
- [x] Ajouter alias `@/sanity/*` dans `tsconfig.json`
- [x] Créer re-exports de compatibilité dans `src/types/queries/index.ts`

### Phase 3 : Optimisation (RECOMMANDÉ)

- [ ] Créer `archive/`
- [ ] Déplacer `vendor/` vers `archive/`
- [ ] Déplacer `.ressources/` vers `archive/`
- [ ] Réorganiser `docs/`
- [ ] Mettre à jour `.gitignore`
- [ ] Créer `docs/README.md`

---

## ⚠️ Points d'Attention

### Import Aliases

Vérifier que les alias suivants sont correctement configurés dans `tsconfig.json` :

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/hooks/*": ["./src/hooks/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/types/*": ["./src/types/*"]
    }
  }
}
```

### Barrel Exports

Maintenir les fichiers `index.ts` pour faciliter les imports :

```typescript
// src/hooks/index.ts
export * from './a11y'
export * from './components'
export * from './forms'
// ...
```

### Tests

Après chaque phase :

- [ ] Exécuter `npm run build`
- [ ] Exécuter `npm run lint`
- [ ] Tester manuellement les pages principales
- [ ] Vérifier les imports avec `grep -r "from" src/`

---

## 🎯 Résultats Attendus

### Avant

- ❌ Doublons dans hooks, scripts, lib
- ❌ Confusion sur l'emplacement des fichiers
- ❌ Structure incohérente
- ❌ Difficulté de maintenance

### Après

- ✅ Structure claire et cohérente
- ✅ Un seul emplacement par type de fichier
- ✅ Organisation logique par feature
- ✅ Facilité de maintenance et d'extension
- ✅ Conformité aux best practices Next.js 15 + Sanity

---

## 📚 Références

- [Next.js 15 App Router - Project Structure](https://nextjs.org/docs/app/building-your-application/routing)
- [Sanity CMS - Project Structure](https://www.sanity.io/docs/structure-builder)
- [TypeScript - Project References](https://www.typescriptlang.org/docs/handbook/project-references.html)
- [React - Component Organization](https://react.dev/learn/thinking-in-react)

---

**Prochaine étape** : Valider ce plan et commencer la Phase 1 (nettoyage).
