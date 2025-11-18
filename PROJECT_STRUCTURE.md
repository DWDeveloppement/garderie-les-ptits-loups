# 📁 Structure Complète du Projet - Garderie Les P'tits Loups

**Dernière mise à jour** : Novembre 2024  
**Version du projet** : 0.1.0  
**Stack** : Next.js 15 + TypeScript + Sanity CMS + Tailwind CSS v4

---

## 📋 Table des Matières

1. [Structure Complète de l'Arborescence](#structure-complète-de-larborescence)
2. [Racine du Projet](#racine-du-projet)
3. [Dossier `src/` - Code Source Next.js](#dossier-src---code-source-nextjs)
4. [Dossier `sanity/` - Configuration Sanity CMS](#dossier-sanity---configuration-sanity-cms)
5. [Dossier `lib/` - Utilitaires Partagés](#dossier-lib---utilitaires-partagés)
6. [Dossier `scripts/` - Scripts de Maintenance](#dossier-scripts---scripts-de-maintenance)
7. [Dossier `docs/` - Documentation](#dossier-docs---documentation)
8. [Dossier `public/` - Assets Statiques](#dossier-public---assets-statiques)
9. [Dossier `reports/` - Rapports d'Analyse](#dossier-reports---rapports-danalyse)
10. [Fichiers de Configuration](#fichiers-de-configuration)

---

## 🗂️ Structure Complète de l'Arborescence

```
garderie-les-ptits-loups/
├── 📚 docs/                      # Documentation complète du projet
│   ├── README.md                 # Index principal de la documentation
│   ├── STRUCTURE.md              # Organisation du dossier docs/
│   ├── PROJECT_STRUCTURE_ANALYSIS.md  # Analyse de la structure du projet
│   ├── REORGANIZATION_PLAN.md    # Plan de réorganisation (étapes complétées)
│   ├── SANITY_TYPES_REORGANIZATION.md  # Migration des types Sanity (✅ COMPLÉTÉ)
│   ├── FLUID-CICD-STRATEGY.md    # Stratégie CI/CD
│   ├── FLUID-TO-TAILWIND-MIGRATION.md  # Migration Fluid → Tailwind
│   ├── LEADING-COMPARISON.md     # Comparaison de leading
│   │
│   ├── setup/                    # Configuration et Setup
│   │   ├── SETUP.md              # Configuration initiale (env, services)
│   │   ├── SECURITY.md           # Sécurité (reCAPTCHA, Honeypot)
│   │   ├── GITHUB.md             # Git workflow, CI/CD
│   │   ├── DOMAINS.md            # Configuration des domaines
│   │   └── SANITY_DEPLOYMENT.md  # Déploiement Sanity
│   │
│   ├── sanity/                   # Documentation Sanity CMS
│   │   ├── SANITY.md             # Setup, schémas, queries GROQ
│   │   └── SANITY_IMAGES.md      # Système d'images, optimisation
│   │
│   ├── features/                 # Features et Composants
│   │   ├── ARCHITECTURE.md       # Architecture de l'application
│   │   ├── FORM.md               # Formulaire de contact
│   │   ├── GALLERY.md            # Galeries React Photo Album
│   │   ├── LIGHTBOX.md           # Lightbox yet-another-react-lightbox
│   │   ├── MAP.md                # Cartes Google Maps
│   │   ├── MOBILE_NAV.md         # Navigation mobile
│   │   ├── BUTTON_FALLBACKS.md   # Fallbacks de boutons
│   │   └── REFACTORING.md        # Refactoring
│   │
│   ├── performance/              # Performance et SEO
│   │   ├── LIGHTHOUSE.md         # Optimisation Lighthouse
│   │   └── SEO.md                # Référencement SEO
│   │
│   ├── tests/                    # Tests et Validation
│   │   ├── README.md             # Index des tests
│   │   ├── ACCESSIBILITY_TESTS.md     # Tests d'accessibilité
│   │   ├── BUILD_REPORT.md       # Rapport de build
│   │   └── PERFORMANCE_REPORT.md # Rapport de performance
│   │
│   └── dev/                      # Développement
│       ├── DEV_JSON_VIEWER_USAGE.md   # Usage du JSON viewer
│       ├── VISION_QUERIES.md     # Queries Sanity Vision
│       └── vision-results/       # Résultats des queries Vision
│           └── README.md
│
├── 🌐 public/                    # Assets statiques (Next.js)
│   ├── logo-les-ptits-loups.webp # Logo principal
│   ├── navbar-logo.webp          # Logo de la navbar
│   ├── *.webp                    # Images optimisées (bbnageurs, carte, jardin, etc.)
│   ├── paralax.jpg, paralax.webp # Images de parallaxe
│   └── *.svg                     # Icônes (file, globe, window)
│
├── 🗄️ src/                       # Code source Next.js
│   ├── app/                      # Pages Next.js (App Router)
│   ├── components/               # Composants React
│   ├── hooks/                    # Hooks personnalisés
│   ├── lib/                      # Utilitaires (images, theme, utils)
│   ├── types/                    # Types TypeScript applicatifs
│   ├── constants/                # Constantes applicatives
│   ├── data/                     # Données statiques
│   ├── providers/                # Providers React
│   ├── scripts/                  # Scripts applicatifs
│   ├── styles/                   # Styles CSS globaux
│   └── utils/                    # Utilitaires spécifiques
│
├── 🎨 sanity/                    # Configuration Sanity CMS
│   ├── schemas/                  # Schémas de contenu
│   ├── components/               # Composants Sanity Studio
│   ├── queries/                  # Requêtes GROQ
│   ├── lib/                      # Utilitaires Sanity
│   ├── types/                    # ✅ Types TypeScript Sanity (centralisés)
│   ├── styles/                   # Styles Sanity Studio
│   ├── schema.ts                 # Point d'entrée des schémas
│   ├── deskStructure.ts          # Structure du desk Sanity Studio
│   ├── sanity.config.ts          # Configuration Sanity
│   └── sanity.cli.ts             # Configuration CLI Sanity
│
├── 📦 lib/                       # Utilitaires partagés (sanity, performance)
│   ├── sanity/                   # Client et queries Sanity
│   └── performance/              # Mesure de performance
│
├── 📝 scripts/                   # Scripts de maintenance
│   ├── clean/                    # ✅ Scripts de nettoyage
│   ├── fix/                      # ✅ Scripts de correction
│   ├── tests/                    # ✅ Scripts de test
│   ├── tools/                    # ✅ Outils utilitaires
│   └── README.md                 # Documentation des scripts
│
├── 📊 reports/                   # Rapports d'analyse
│   ├── README.md                 # Index des rapports
│   ├── ANALYSE-*.md              # Analyses diverses
│   ├── performance-report.json   # Rapport de performance JSON
│   └── lightouse.json            # Rapport Lighthouse JSON
│
├── ⚙️ Configuration files
│   ├── package.json              # Dépendances et scripts npm
│   ├── tsconfig.json             # Configuration TypeScript
│   ├── next.config.ts            # Configuration Next.js
│   ├── postcss.config.js         # Configuration PostCSS
│   ├── eslint.config.mjs         # Configuration ESLint
│   ├── components.json           # Configuration Shadcn/UI
│   ├── .cursorrules.md           # Règles Cursor AI
│   ├── .gitignore                # Fichiers ignorés par Git
│   └── README.md                 # README principal du projet
│
└── 📄 PROJECT_STRUCTURE.md       # Ce fichier - Structure détaillée du projet
```

---

## 📂 Racine du Projet

### Fichiers de Configuration Principaux

#### `package.json`

**Usage** : Définit les dépendances, scripts npm et métadonnées du projet.

**Scripts principaux** :

- `dev` : Serveur de développement Next.js (port 3000)
- `build` : Build de production
- `start` : Serveur de production (port 3100)
- `sanity` : Sanity Studio (port 3333)
- `cleanup:media` : Nettoyer les médias non utilisés
- `fix:page` : Réparer un document Sanity
- `perf` : Tests de performance
- `lighthouse` : Analyse Lighthouse

#### `tsconfig.json`

**Usage** : Configuration TypeScript avec paths aliases (`@/*`, `@/sanity/*`, `lib/*`).

**Paths configurés** :

- `@/*` → `./src/*`
- `lib/*` → `./lib/*`
- `@/sanity/*` → `./sanity/*`

#### `next.config.ts`

**Usage** : Configuration Next.js (images, redirects, headers, optimisation).

#### `postcss.config.js`

**Usage** : Configuration PostCSS pour Tailwind CSS v4 avec `@tailwindcss/postcss`.

#### `eslint.config.mjs`

**Usage** : Configuration ESLint avec règles Next.js et TypeScript.

#### `components.json`

**Usage** : Configuration Shadcn/UI (chemins, alias, style).

#### `.cursorrules.md`

**Usage** : Règles pour Cursor AI (stack technique, conventions de code, structure).

#### `.gitignore`

**Usage** : Fichiers et dossiers ignorés par Git (node_modules, .next, docs/, vendor/, .ressources/).

---

## 🗄️ Dossier `src/` - Code Source Next.js

### `src/app/` - Pages Next.js (App Router)

Structure des routes Next.js 15 avec App Router.

#### `src/app/layout.tsx`

**Usage** : Layout racine de l'application. Configure les fonts (Chelsea Market, Open Sans), imports les composants de layout (Header, Footer), et les composants client-only (AnimateCSS, Toaster).

**Composants importés** :

- `Header`, `Footer` : Layout global
- `Partners` : Liste des partenaires
- `AnimateCSSClient`, `ToasterClient` : Composants client-only

#### `src/app/page.tsx`

**Usage** : Page d'accueil (`/`). Affiche les sections principales : Hero, Spaces, Structure, Testimonials.

#### `src/app/a-propos/page.tsx`

**Usage** : Page "À propos" (`/a-propos`). Affiche l'histoire, la pédagogie, l'équipe et les valeurs.

**Données** : Charge `aboutPage` depuis Sanity via `fetchAbout()`.

#### `src/app/contact/page.tsx`

**Usage** : Page de contact (`/contact`). Affiche le formulaire de contact et la carte.

**Sections** :

- `HeroContactSection` : Hero de la page contact
- `ContactFormSection` : Formulaire de contact avec reCAPTCHA
- `MapSection` : Carte interactive

#### `src/app/tarifs/page.tsx`

**Usage** : Page des tarifs (`/tarifs`). Affiche les tarifs mensuels/journaliers et les subventions.

**Données** : Charge les prix depuis Sanity (`fetchMonthlyNursery`, `fetchDailyNursery`, etc.).

#### `src/app/la-structure/[slug]/page.tsx`

**Usage** : Pages dynamiques des secteurs (`/la-structure/nurserie`, `/la-structure/trotteurs`, etc.).

**Sections** :

- `HeroSectorSection` : Hero du secteur
- `ContentSection` : Contenu riche (Portable Text)
- `GallerySection` : Galerie d'images
- `LinkedSpacesSection` : Espaces liés
- `ParallaxSection` : Section parallaxe

#### `src/app/exemples/page.tsx`

**Usage** : Page d'exemples (`/exemples`). Affiche des exemples de composants UI pour le développement.

#### `src/app/mentions-legales/page.tsx`

**Usage** : Page des mentions légales (`/mentions-legales`).

#### `src/app/politique-confidentialite/page.tsx`

**Usage** : Page de la politique de confidentialité (`/politique-confidentialite`).

#### `src/app/globals.css`

**Usage** : Styles CSS globaux. Imports Tailwind, variables CSS, fonts, palette de couleurs.

#### `src/app/home.json`

**Usage** : Données JSON statiques de la page d'accueil (pour développement/test).

#### `src/app/a-propos/about.json`

**Usage** : Données JSON statiques de la page À propos (pour développement/test).

#### `src/app/tarifs/tarifs.json`

**Usage** : Données JSON statiques de la page tarifs (pour développement/test).

### `src/app/api/` - API Routes

#### `src/app/api/contact/route.ts`

**Usage** : Route API POST `/api/contact`. Traite le formulaire de contact.

**Fonctionnalités** :

- Validation reCAPTCHA v2
- Validation honeypot (anti-bot)
- Envoi d'email via Resend
- Formatage HTML de l'email

**Variables d'environnement requises** :

- `RESEND_API_KEY`
- `RESEND_TO_EMAIL`
- `RECAPTCHA_SECRET_KEY`

#### `src/app/api/recaptcha-config/route.ts`

**Usage** : Route API GET `/api/recaptcha-config`. Expose la clé publique reCAPTCHA au client.

**Retour** : `{ siteKey: string }`

---

### `src/components/` - Composants React

Organisation des composants par catégorie et usage.

#### `src/components/ui/` - Composants Shadcn/UI

**Usage** : Composants UI de base (Shadcn/UI + Radix UI). **⚠️ Ne pas modifier directement**.

**Fichiers principaux** :

- `button.tsx` : Bouton avec variants (default, outline, ghost, link)
- `card.tsx` : Carte avec header, content, footer
- `form.tsx` : Formulaires avec react-hook-form
- `input.tsx`, `textarea.tsx`, `label.tsx` : Champs de formulaire
- `dialog.tsx` : Dialog modal
- `accordion.tsx` : Accordéon dépliable
- `tooltip.tsx` : Tooltip au survol
- `sonner.tsx` : Toast notifications
- `navigation-menu.tsx` : Menu de navigation
- `scroll-area.tsx` : Zone de scroll personnalisée
- `separator.tsx` : Séparateur horizontal/vertical
- `skeleton.tsx` : Skeleton loader
- `spinner.tsx` : Indicateur de chargement
- `badge.tsx` : Badge de statut
- `avatar.tsx` : Avatar d'utilisateur
- `alert.tsx` : Alerte d'information
- `callout.tsx` : Callout d'information

**Sous-dossier `variants/`** :

- `button.ts` : Variants de boutons (CVA)
- `card.ts` : Variants de cartes
- `badge.ts` : Variants de badges
- `tooltip.ts` : Variants de tooltips
- `input.ts` : Variants d'inputs
- `label.ts` : Variants de labels
- `toast.ts` : Variants de toasts

#### `src/components/layout/` - Composants de Layout

**Usage** : Composants de structure globale de l'application.

**Fichiers** :

- `Header.tsx` : Header principal avec navigation
- `Footer.tsx` : Footer avec informations de contact
- `MainNavigationMenu.tsx` : Menu de navigation principal (desktop)
- `MobileMenu.tsx` : Menu mobile
- `index.ts` : Barrel export

**Usage** : Importés dans `src/app/layout.tsx` pour le layout global.

#### `src/components/pages/` - Sections de Pages

**Usage** : Composants spécifiques à chaque page, organisés par dossier.

##### `src/components/pages/home/`

- `HeroSection.tsx` : Hero de la page d'accueil
- `SpacesSection.tsx` : Section des espaces disponibles
- `StructureSection.tsx` : Section de la structure
- `Testimonals.tsx` : Section des témoignages

##### `src/components/pages/about/`

- `HeroAboutSection.tsx` : Hero de la page À propos
- `AboutIntroSection.tsx` : Introduction
- `HistorySection.tsx` : Section histoire
- `PedagogySection.tsx` : Section pédagogie
- `TeamSection.tsx` : Section équipe
- `ValuesSection.tsx` : Section valeurs
- `index.ts` : Barrel export

##### `src/components/pages/contact/`

- `HeroContactSection.tsx` : Hero de la page contact
- `ContactFormSection.tsx` : Section du formulaire de contact
- `MapSection.tsx` : Section de la carte interactive

##### `src/components/pages/horaires-tarifs/`

- `HeroHorairesTarifsSection.tsx` : Hero de la page tarifs
- `PricesSection.tsx` : Section des prix (mensuels/journaliers)
- `SubsidiesSection.tsx` : Section des subventions

##### `src/components/pages/sector/`

- `HeroSectorSection.tsx` : Hero du secteur
- `ContentSection.tsx` : Contenu riche (Portable Text)
- `GallerySection.tsx` : Galerie d'images du secteur
- `LinkedSpacesSection.tsx` : Espaces liés au secteur
- `ParallaxSection.tsx` : Section parallaxe
- `index.ts` : Barrel export

##### `src/components/pages/exemples/`

- `AccordionSection.tsx` : Exemple d'accordéon
- `ButtonSection.tsx` : Exemples de boutons
- `CalloutSection.tsx` : Exemples de callouts
- `CardSection.tsx` : Exemples de cartes
- `RichTextSection.tsx` : Exemple de contenu riche
- `TypographySection.tsx` : Exemples de typographie

#### `src/components/shared/` - Composants Partagés

**Usage** : Composants réutilisables dans plusieurs pages.

**Fichiers principaux** :

- `HeroGlobal.tsx` : Hero réutilisable avec image et texte
- `ParalaxImage.tsx` : Image avec effet parallaxe
- `Partners.tsx` : Liste des partenaires
- `BlockQuote.tsx` : Citation en bloc
- `AnimateCSS.tsx` : Animations CSS
- `CriticalCSS.tsx` : CSS critique inliné
- `index.ts` : Barrel export principal

**Sous-dossier `richtext/`** :

- `RichTextRenderer.tsx` : Renderer principal de Portable Text
- `RichTextList.tsx` : Rendu des listes
- `RichTextQuote.tsx` : Rendu des citations
- `RichTextTitle.tsx` : Rendu des titres
- `RichTextFeedbackCard.tsx` : Carte de feedback

**Sous-dossier `maps/`** :

- `DynamicMap.tsx` : Carte dynamique interactive (Leaflet)
- `StaticMap.tsx` : Carte statique (image)
- `MapActions.tsx` : Actions de la carte (itinéraire, etc.)
- `index.ts` : Barrel export

**Sous-dossier `navigation/`** :

- `BackToTop.tsx` : Bouton retour en haut
- `BottomBar.tsx` : Barre de navigation du bas (mobile)
- `MobileNavigation.tsx` : Navigation mobile
- `index.ts` : Barrel export

**Sous-dossier `pricing/`** :

- `PricingList.tsx` : Liste des prix
- `SubsidiesTable.tsx` : Tableau des subventions
- `index.ts` : Barrel export

**Sous-dossier `feedback/`** :

- `success-animation.tsx` : Animation de succès
- `index.ts` : Barrel export

#### `src/components/forms/` - Composants de Formulaires

**Usage** : Composants de formulaires réutilisables.

**Fichiers** :

- `ContactForm.tsx` : Formulaire de contact complet avec validation
- `InputField.tsx` : Champ de saisie avec label et erreur
- `TextareaField.tsx` : Zone de texte avec label et erreur
- `HoneypotField.tsx` : Champ honeypot anti-bot
- `recaptcha-v2.tsx` : Composant reCAPTCHA v2
- `index.ts` : Barrel export

**Fonctionnalités** :

- Validation avec react-hook-form + zod
- localStorage pour sauvegarde temporaire
- reCAPTCHA v2 intégré
- Honeypot anti-bot

#### `src/components/gallery/` - Composants de Galerie

**Usage** : Composants de galerie d'images avec lightbox.

**Fichiers** :

- `Gallery.tsx` : Galerie de base avec react-photo-album
- `GalleryWithLightbox.tsx` : Galerie avec lightbox intégré
- `LightboxCustom.tsx` : Lightbox personnalisé (yet-another-react-lightbox)
- `index.ts` : Barrel export

**Fonctionnalités** :

- Layouts responsives (rows, columns, masonry)
- Lightbox avec navigation
- Images optimisées (Sanity)

#### `src/components/icons/` - Système d'Icônes

**Usage** : Système d'icônes avec Lucide React.

**Fichiers** :

- `Icon.tsx` : Composant Icon wrapper
- `registry.ts` : Registre des icônes disponibles
- `index.ts` : Barrel export

**Usage** : `<Icon name="home" />` pour afficher une icône.

#### `src/components/lazy/` - Composants Lazy-Load

**Usage** : Composants chargés uniquement côté client.

**Fichiers** :

- `ClientOnlyComponents.tsx` : Wrapper pour composants client-only
- `createLazyComponent.tsx` : Factory pour créer des composants lazy
- `LazySkeletons.tsx` : Squelettes de chargement
- `skeletons.tsx` : Types de squelettes
- `index.ts` : Barrel export

**Usage** : Pour les composants qui nécessitent le browser API (AnimateCSS, Toaster).

#### `src/components/dev/` - Composants de Développement

**Usage** : Composants utiles pour le développement.

**Fichiers** :

- `DevJsonViewer.tsx` : Visualiseur JSON pour déboguer les données
- `index.ts` : Barrel export

**Usage** : Affiche les données Sanity en format JSON lisible.

---

### `src/hooks/` - Hooks Personnalisés

**Usage** : Hooks React réutilisables.

#### Hooks à la racine (utilisés activement)

- `useFormValidation.ts` : Validation de formulaires avec react-hook-form
- `useRecaptchaV2.ts` : Gestion reCAPTCHA v2
- `useMaps.ts` : Hooks pour les cartes (useDynamicMap, useMapLocation, useStaticMap)
- `useScollParalax.ts` : Effet parallaxe au scroll
- `useScroll.ts` : Gestion du scroll (useScrollDirection, useScrollToTop)
- `useWindowSize.ts` : Taille de la fenêtre (useBreakpoint, useMobileMenuControl, useWindowSize)
- `useQueries.ts` : Hooks pour les queries Sanity
- `useConsoleLogs.ts` : Logs de débogage
- `useLocalStorage.ts` : Gestion localStorage

**Sous-dossiers (versions alternatives/organisées)** :

- `a11y/` : Hooks d'accessibilité
  - `useButtonA11y.ts` : Accessibilité des boutons
  - `useFormA11y.ts` : Accessibilité des formulaires
  - `useGalleryA11y.ts` : Accessibilité des galeries
  - `useImageA11y.ts` : Accessibilité des images
  - `useLinkA11y.ts` : Accessibilité des liens
  - `useFocusA11y.ts` : Gestion du focus
  - `useGalleryState.ts` : État de la galerie
  - `README.md` : Documentation des hooks a11y

- `components/` : Hooks pour composants
  - `useMaps.ts` : Version alternative
  - `useScollParalax.ts` : Version alternative

- `forms/` : Hooks pour formulaires
  - `useFormValidation.ts` : Version alternative
  - `useLocalStorage.ts` : Version alternative
  - `useRecaptchaV2.ts` : Version alternative

- `queries/` : Hooks pour queries
  - `useQueries.ts` : Version alternative

- `utils/` : Hooks utilitaires
  - `useScroll.ts` : Version alternative
  - `useWindowSize.ts` : Version alternative

- `tests/` : Hooks de test
  - `useConsoleLogs.ts` : Version alternative

**Note** : Les hooks à la racine sont **actuellement utilisés** dans le code. Les versions dans les sous-dossiers sont alternatives ou anciennes.

**Fichier `index.ts`** : Barrel export principal (exports les hooks à la racine).

---

### `src/lib/` - Utilitaires

**Usage** : Fonctions utilitaires et helpers pour l'application.

**Fichiers** :

- `utils.ts` : Fonctions utilitaires générales (`cn()` pour classnames, etc.)
- `theme-utils.ts` : Utilitaires de thème
- `imageOptimization.ts` : Optimisation d'images

**Usage** : Imports depuis `@/lib/utils`, `@/lib/theme-utils`, etc.

---

### `src/types/` - Types TypeScript Applicatifs

**Usage** : Types TypeScript spécifiques à l'application Next.js (non Sanity).

#### `src/types/breakpoints.ts`

**Usage** : Types pour les breakpoints responsive.

#### `src/types/map.ts`

**Usage** : Types pour les cartes (Leaflet).

#### `src/types/richText.ts`

**Usage** : Types pour le contenu riche applicatif.

#### `src/types/components/button.ts`

**Usage** : Types pour les composants boutons.

#### `src/types/sanity/` - ⚠️ DÉPRÉCIÉ

**Usage** : Types Sanity (déplacés vers `sanity/types/`). Reste vide ou avec re-exports.

**Fichiers** :

- `index.ts` : Vide ou placeholder
- `portableText.ts` : Déplacé vers `sanity/types/core/portableText.ts`
- `sectorPage.ts` : Déplacé vers `sanity/types/pages/sectorPage.ts`

#### `src/types/queries/` - ⚠️ DÉPRÉCIÉ

**Usage** : Types de queries (déplacés vers `sanity/types/pages/`). Re-exports de compatibilité.

**Fichier `index.ts`** : Re-exports vers `@/sanity/types/pages/*` avec message de dépréciation.

**Fichiers** :

- `about.ts`, `contact.ts`, `home.ts`, etc. : Anciens types (conservés pour référence ou compatibilité)

#### `src/types/sanity.ts`

**Usage** : Types Sanity généraux (déplacés vers `sanity/types/content/`). Peut contenir des re-exports.

---

### `src/constants/` - Constantes

**Usage** : Constantes applicatives.

**Fichiers** :

- `navigation_menu.ts` : Menu de navigation (routes, labels, icônes)
- `map_info_default.ts` : Informations par défaut de la carte (coordonnées, zoom, etc.)

---

### `src/data/` - Données Statiques

**Usage** : Données statiques typées utilisées dans l'application.

**Fichiers** :

- `partners.ts` : Données des partenaires (type `Partner[]`)
- `prices.ts` : Données des prix (type `Price[]`)
- `spaces.ts` : Données des espaces (type `Space[]`)
- `structures.ts` : Données des structures (type `Structure[]`)
- `testimonials.ts` : Données des témoignages (type `Testimonial[]`)

**Sous-dossier `response-queries/`** :

- `*.json` : Exemples de réponses JSON des queries Sanity (pour développement/test)
  - `about.json`, `partners.json`, `spaces.json`, `structures.json`, `testimonials.json`, `horaires-tarifs.json`

---

### `src/providers/` - Providers React

**Usage** : Providers React pour le contexte global.

**Fichier `index.ts`** : Export des providers.

---

### `src/scripts/` - Scripts Applicatifs

**Usage** : Scripts utilisés par l'application (non maintenance).

**Fichier `contactForm.ts`** : Types et validation pour le formulaire de contact.

---

### `src/styles/` - Styles CSS

**Usage** : Fichiers CSS globaux et modules.

**Fichiers** :

- `globals.css` : Styles globaux (dans `src/app/globals.css` en réalité)
- `palette.css` : Palette de couleurs (Orange, Purple)
- `fonts.css` : Configuration des fonts
- `animations.css` : Animations CSS personnalisées
- `optimized-images.css` : Styles pour les images optimisées
- `lightbox-override.css` : Styles pour le lightbox

**Sous-dossier `fluid/`** :

- `index.css` : Import principal du système fluid
- `fluid-variables.css` : Variables CSS du système fluid
- `spacing.css` : Espacements fluid
- `typography.css` : Typographie fluid

**Fichiers documentation** :

- `README.md` : Documentation des styles
- `typography-guide.md` : Guide de typographie

---

### `src/utils/` - Utilitaires Spécifiques

**Usage** : Utilitaires spécifiques à l'application.

**Fichier `sectorIcons.tsx`** : Mappage des icônes par secteur.

---

## 🎨 Dossier `sanity/` - Configuration Sanity CMS

### `sanity/schemas/` - Schémas de Contenu

**Usage** : Définitions des schémas de contenu Sanity (documents et objets).

#### `sanity/schemas/index.ts`

**Usage** : Point d'entrée qui exporte tous les schémas.

#### `sanity/schemas/pages/` - Schémas de Pages

**Fichiers** :

- `home.ts` : Schéma de la page d'accueil
- `about.ts` : Schéma de la page À propos
- `contact.ts` : Schéma de la page Contact
- `schedule.ts` : Schéma de la page Horaires/Tarifs
- `sectorPage.ts` : Schéma des pages secteurs (nurserie, trotteurs, etc.)
- `exemple.ts` : Schéma de page d'exemple (développement)

#### `sanity/schemas/components/` - Schémas de Composants

**Fichiers** :

- `basicImage.ts` : Image de base
- `galleryImage.ts` : Image de galerie
- `hero.ts` : Hero section
- `heroImage.ts` : Image de hero
- `paralaxImage.ts` : Image parallaxe
- `portableTextConfig.ts` : Configuration Portable Text
- `seo.ts` : Métadonnées SEO
- `seoImage.ts` : Image SEO
- `index.ts` : Barrel export

#### `sanity/schemas/partners.ts`

**Usage** : Schéma des partenaires.

#### `sanity/schemas/prices.ts`

**Usage** : Schéma des prix et tarifs.

#### `sanity/schemas/spaces.ts`

**Usage** : Schéma des espaces.

#### `sanity/schemas/testimonials.ts`

**Usage** : Schéma des témoignages.

#### `sanity/schema.ts`

**Usage** : Point d'entrée principal qui importe tous les schémas depuis `schemas/index.ts`.

---

### `sanity/types/` - Types TypeScript Sanity ✅

**Usage** : Types TypeScript centralisés pour Sanity (créé lors de la réorganisation).

#### `sanity/types/index.ts`

**Usage** : Barrel export principal. Exporte `core`, `content`, `validation`, puis `pages` (pour éviter conflits).

#### `sanity/types/core/` - Types de Base

**Fichiers** :

- `portableText.ts` : Types Portable Text (`PortableTextBlock`, `PortableTextSpan`, `PortableTextLink`, etc.)
- `image.ts` : Types d'images Sanity (`SanityImage`, `SanityImageAssetRef`, `SanityImageMetadata`, etc.)
- `index.ts` : Barrel export

#### `sanity/types/content/` - Types de Contenu

**Fichiers** :

- `prices.ts` : Types de prix (`PriceDocument`, `SubsidiesDocument`, `PriceItem`, `PricingBlock`, etc.)
- `general.ts` : Types de contenu général (`News`, `Activity`, `Staff`, etc.)
- `index.ts` : Barrel export

#### `sanity/types/pages/` - Types de Pages

**Fichiers** :

- `home.ts` : Types de la page d'accueil (`HomePageData`)
- `about.ts` : Types de la page À propos (`AboutPageData`)
- `contact.ts` : Types de contact (`SanityContactInfo`)
- `contactPage.ts` : Types de la page contact (`ContactPageData`)
- `schedule.ts` : Types de la page horaires (`SchedulePageData`, `TariffDocument`, etc.)
- `sectorPage.ts` : Types des pages secteurs (`SectorPageData`)
- `partners.ts` : Types des partenaires (`Partner`)
- `testimonials.ts` : Types des témoignages (`TestimonialsTypesProps`)
- `structure.ts` : Types de structure
- `espaces.ts` : Types d'espaces
- `prices.ts` : Types spécifiques aux pages de prix (évite conflit avec `content/prices.ts`)
- `sanityImage.ts` : Types d'images
- `index.ts` : Barrel export (exports sélectifs pour éviter conflits)

#### `sanity/types/validation.ts`

**Usage** : Types de validation Sanity (`SanityValidationRule`, `QueryResponse<T>`, `SingleQueryResponse<T>`).

**Imports recommandés** :

- `@/sanity/types` : Tous les types
- `@/sanity/types/core` : Types de base
- `@/sanity/types/pages` : Types de pages
- `@/sanity/types/content` : Types de contenu

---

### `sanity/queries/` - Requêtes GROQ

**Usage** : Requêtes GROQ pour récupérer les données depuis Sanity.

#### `sanity/queries/README.md`

**Usage** : Documentation des queries GROQ disponibles.

#### `sanity/queries/groq/`

- `sectorpage.groq` : Requête GROQ pour les pages secteurs

#### `sanity/queries/json-response/`

- `about.json` : Exemple de réponse JSON pour la page À propos
- `sectorPage.json` : Exemple de réponse JSON pour une page secteur

**Note** : Les queries principales sont dans `lib/sanity/queries/` (voir section suivante).

---

### `sanity/components/` - Composants Sanity Studio

**Usage** : Composants personnalisés pour Sanity Studio.

**Fichiers** :

- `GalleryInput.tsx` : Input personnalisé pour les galeries d'images
- `ReadOnlySlug.tsx` : Slug en lecture seule

---

### `sanity/lib/` - Utilitaires Sanity

**Usage** : Utilitaires spécifiques à Sanity.

**Fichier `webhooks.ts`** : Configuration des webhooks Sanity → Vercel.

---

### `sanity/styles/` - Styles Sanity Studio

**Usage** : Styles personnalisés pour Sanity Studio.

**Fichier `studio.css`** : Styles CSS pour le Studio.

---

### `sanity/deskStructure.ts`

**Usage** : Structure personnalisée du desk Sanity Studio. Organise les documents en catégories (Pages Générales, La Structure, Espaces, etc.).

**Structure** :

- Pages Générales : home, aboutPage, contactPage, schedulePage
- La Structure : nurserie, trotteurs, grands, autres-espaces
- Espaces : 12 espaces fixes groupés par secteur
- Contenu : prices, partners, testimonials, spaces

---

### `sanity.config.ts`

**Usage** : Configuration principale de Sanity (project ID, dataset, plugins, etc.).

### `sanity.cli.ts`

**Usage** : Configuration CLI Sanity (project ID, dataset pour les commandes CLI).

---

## 📦 Dossier `lib/` - Utilitaires Partagés

**Usage** : Utilitaires partagés entre Next.js et Sanity (client Sanity, queries, performance).

### `lib/sanity/` - Client et Queries Sanity

**Usage** : Client Sanity et toutes les queries GROQ utilisées par l'application Next.js.

#### `lib/sanity/client.ts`

**Usage** : Client Sanity configuré (project ID, dataset, API version, token).

#### `lib/sanity/env.ts`

**Usage** : Variables d'environnement Sanity (validation et export).

#### `lib/sanity/index.ts`

**Usage** : Barrel export principal. Exporte `client`, `env`, `queries`, `helpers`, `adapters`.

#### `lib/sanity/queries/` - Queries GROQ

**Usage** : Toutes les queries GROQ organisées par page/document.

**Fichiers** :

- `index.ts` : Barrel export de toutes les queries
- `home.ts` : Query page d'accueil (`fetchHome()`)
- `about.ts` : Query page À propos (`fetchAbout()`)
- `contact.ts` : Query page contact (`fetchContact()`)
- `schedule.ts` : Query page horaires/tarifs (`fetchSchedule()`)
- `sectors.ts` : Query pages secteurs (`fetchNurserie()`, `fetchTrotteurs()`, etc.)
- `prices.ts` : Query prix (`fetchMonthlyNursery()`, `fetchDailyNursery()`, etc.)
- `footer.ts` : Query footer (partners + contact info)
- `partners.ts` : Query partenaires
- `shared.ts` : Queries partagées avec React Cache (pour layout)

**Fonctions** : Chaque fichier exporte des fonctions `fetch*()` qui retournent les données typées.

#### `lib/sanity/helpers/` - Helpers Sanity

**Fichiers** :

- `imageProps.ts` : Helpers pour générer les props d'images optimisées (dimensions, srcset, etc.)
- `galleryTransform.ts` : Transformateurs pour les galeries d'images (react-photo-album format)

#### `lib/sanity/adapters/` - Adaptateurs Sanity

**Fichiers** :

- `prices.ts` : Adaptateur pour transformer les données de prix (formatage, calculs)

### `lib/performance/` - Mesure de Performance

**Usage** : Outils pour mesurer et tracker la performance des queries Sanity.

**Fichier `measure.ts`** :

- `generatePerformanceReport()` : Génère un rapport de performance
- `resetMeasurements()` : Réinitialise les mesures
- `generateAlerts()` : Génère des alertes si seuils dépassés

**Usage** : Utilisé dans les queries pour mesurer le temps d'exécution.

---

## 📝 Dossier `scripts/` - Scripts de Maintenance

**Usage** : Scripts Node.js pour la maintenance, le nettoyage, les tests et les corrections.

### `scripts/clean/` - Scripts de Nettoyage ✅

**Usage** : Scripts pour nettoyer et maintenir la base Sanity.

**Fichiers** :

- `cleanup-unused-media.mjs` : Nettoie les médias non utilisés dans Sanity
  - **Usage** : `npm run cleanup:media`
  - **Options** : `--delete` (supprime réellement), `--alt` (vérifie alt text)
- `cleanup-sanity-cache.mjs` : Nettoie le cache Sanity
  - **Usage** : `npm run cleanup:sanity-cache`
- `delete-draft-and-assets.mjs` : Supprime les brouillons et leurs assets
  - **Usage** : `npm run delete:draft-assets`
- `fix-orphaned-references.mjs` : Corrige les références orphelines
  - **Usage** : `npm run fix:orphans`
- `verify-deleted-assets.mjs` : Vérifie que les assets supprimés sont bien supprimés
  - **Usage** : `npm run verify:assets`
- `check-specific-assets.mjs` : Vérifie des assets spécifiques
- `check-specific-assets-references.mjs` : Vérifie les références d'assets spécifiques

### `scripts/fix/` - Scripts de Correction ✅

**Usage** : Scripts pour corriger des problèmes spécifiques.

**Fichiers** :

- `fix-page.mjs` : Répare un document Sanity corrompu
  - **Usage** : `npm run fix:page -- contact` (remplace le document)
  - **Pages supportées** : home, about, contact, tarifs
- `fix-prices-types.mjs` : Corrige les types de prix
  - **Usage** : `npm run fix:prices`
- `check-button-accessibility.mjs` : Vérifie l'accessibilité des boutons
  - **Usage** : Script de vérification (non npm script)

### `scripts/tests/` - Scripts de Test ✅

**Usage** : Scripts pour tester l'application (performance, accessibilité, Lighthouse).

**Fichiers** :

- `test-performance.mjs` : Tests de performance des queries Sanity
  - **Usage** : `npm run perf`
  - **Fonctionnalités** : Mesure le temps de toutes les queries, génère un rapport
- `run-lighthouse.mjs` : Lance Lighthouse sur l'application
  - **Usage** : `npm run lighthouse`
- `analyze-lighthouse.mjs` : Analyse le rapport Lighthouse
  - **Usage** : `npm run lighthouse:analyze`
- `test-accessibility.mjs` : Tests d'accessibilité complets
- `test-accessibility-simple.mjs` : Tests d'accessibilité simplifiés
- `audit-all-components.mjs` : Audit d'accessibilité de tous les composants

### `scripts/tools/` - Outils Utilitaires ✅

**Usage** : Outils utilitaires pour le développement.

**Fichiers** :

- `kill-ports.sh` : Tue les processus utilisant des ports spécifiques
  - **Usage** : `npm run kill:dev` (3000, 3333), `npm run kill:prod` (3100), `npm run kill:all`
  - **Fonctionnalités** : Tue les processus sur les ports donnés en arguments

### `scripts/README.md`

**Usage** : Documentation complète des scripts disponibles.

---

## 📚 Dossier `docs/` - Documentation

**Usage** : Documentation complète du projet organisée par thème.

### `docs/README.md`

**Usage** : Index principal de la documentation. Navigation vers tous les documents.

### `docs/STRUCTURE.md`

**Usage** : Organisation du dossier `docs/` et conventions de nommage.

### Documentation par Thème

**Setup** (`docs/setup/`) : Configuration, installation, sécurité, Git, déploiement  
**Sanity** (`docs/sanity/`) : Configuration Sanity, schémas, queries, images  
**Features** (`docs/features/`) : Architecture, composants, features spécifiques  
**Performance** (`docs/performance/`) : Optimisation Lighthouse, SEO  
**Tests** (`docs/tests/`) : Tests d'accessibilité, performance, responsive  
**Dev** (`docs/dev/`) : Outils de développement, queries Vision

**Voir** `docs/STRUCTURE.md` pour la documentation complète.

---

## 🌐 Dossier `public/` - Assets Statiques

**Usage** : Fichiers statiques servis directement par Next.js.

**Fichiers** :

- `logo-les-ptits-loups.webp` : Logo principal de la garderie
- `navbar-logo.webp` : Logo pour la navbar
- `bbnageurs.webp`, `carte.webp`, `jardin.webp`, `hummingbirds.webp` : Images optimisées
- `paralax.jpg`, `paralax.webp` : Images de parallaxe
- `*.svg` : Icônes SVG (file, globe, window)

**Usage** : Accès via `/logo-les-ptits-loups.webp` depuis le code.

---

## 📊 Dossier `reports/` - Rapports d'Analyse

**Usage** : Rapports d'analyse et d'optimisation du projet.

**Fichiers principaux** :

- `README.md` : Index des rapports
- `ANALYSE-HOME-PAGE-QUERY.md` : Analyse de la query page d'accueil
- `ANALYSE-ABOUT-PAGE-QUERY.md` : Analyse de la query page À propos
- `ANALYSE-PERFORMANCE.md` : Analyse de performance
- `ANALYSE-PRICES-QUERIES.md` : Analyse des queries de prix
- `performance-report.json`, `performance-report.md` : Rapports de performance
- `lightouse.json`, `lighthouse-report.md` : Rapports Lighthouse
- `OPTIMISATION-GROQ-CACHE.md` : Optimisation du cache GROQ
- `RESUME-OPTIMISATIONS-APPLIQUEES.md` : Résumé des optimisations

---

## 🔗 Imports et Alias TypeScript

### Alias Configurés (`tsconfig.json`)

- `@/*` → `./src/*`
  - Exemple : `import { Button } from '@/components/ui/button'`
- `lib/*` → `./lib/*`
  - Exemple : `import { fetchHome } from 'lib/sanity/queries/home'`
- `@/sanity/*` → `./sanity/*`
  - Exemple : `import type { HomePageData } from '@/sanity/types/pages/home'`

### Imports Recommandés

**Composants** :

```typescript
import { Button } from '@/components/ui/button'
import { HeroSection } from '@/components/pages/home/HeroSection'
import { ContactForm } from '@/components/forms/ContactForm'
```

**Types Sanity** :

```typescript
import type { HomePageData } from '@/sanity/types/pages/home'
import type { PortableTextBlock } from '@/sanity/types/core/portableText'
import type { SanityImage } from '@/sanity/types/core/image'
```

**Queries** :

```typescript
import { fetchHome } from 'lib/sanity/queries/home'
import { fetchAbout } from 'lib/sanity/queries/about'
```

**Hooks** :

```typescript
import { useFormValidation } from '@/hooks/useFormValidation'
import { useMaps } from '@/hooks/useMaps'
import { useWindowSize } from '@/hooks/useWindowSize'
```

**Utils** :

```typescript
import { cn } from '@/lib/utils'
import { getImageProps } from 'lib/sanity/helpers/imageProps'
```

---

## 📝 Notes Importantes

### Fichiers Ignorés (`.gitignore`)

- `docs/` : Ignoré mais certains fichiers trackés (`.gitkeep` permet de tracker le dossier)
- `vendor/` : Anciennes versions (ignoré)
- `.ressources/` : Sauvegardes (ignoré)
- `node_modules/`, `.next/`, `.git/` : Standard

### Structure Réorganisée (Novembre 2024)

**Types Sanity** : Migrés vers `sanity/types/` ✅  
**Scripts** : Réorganisés dans `scripts/clean/`, `scripts/fix/`, `scripts/tests/`, `scripts/tools/` ✅

### Compatibilité

**Re-exports de compatibilité** :

- `src/types/queries/index.ts` : Re-exports vers `@/sanity/types/pages/*` (déprécié)
- Les anciens imports fonctionnent encore mais génèrent des warnings

---

**Dernière mise à jour** : Novembre 2024  
**Maintenu par** : Équipe de développement
