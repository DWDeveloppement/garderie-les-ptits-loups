# 📁 Structure Complète du Projet

**Dernière mise à jour** : Novembre 2024
**Projet** : Garderie Les P'tits Loups
**Stack** : Next.js 15 + Sanity CMS + TypeScript
**Statut** : ✅ Organisé et à jour

---

## 📋 Table des Matières

1. [Vue d'Ensemble](#-vue-densemble)
2. [Structure Racine](#-structure-racine)
3. [Dossier src/](#-dossier-src)
4. [Dossier docs/](#-dossier-docs)
5. [Autres Dossiers](#-autres-dossiers)
6. [Index des Fichiers Clés](#-index-des-fichiers-clés)

---

## 🏗️ Vue d'Ensemble

```
garderie-les-ptits-loups/
├── 📚 docs/                    # Documentation complète du projet
├── 🌐 public/                  # Assets statiques (images, icônes)
├── 🗄️ src/                     # Code source de l'application
│   ├── app/                   # Pages Next.js (App Router)
│   ├── components/            # Composants React
│   ├── sanity/                # Configuration et intégration Sanity
│   ├── types/                 # Définitions TypeScript
│   ├── ui/                    # Design System (shadcn/ui)
│   ├── hooks/                 # React Hooks personnalisés
│   ├── lib/                   # Utilitaires
│   ├── utils/                 # Fonctions utilitaires
│   ├── constants/             # Constantes de l'application
│   ├── data/                  # Données statiques
│   ├── providers/             # Context Providers
│   └── styles/                # Styles CSS globaux
├── 📝 scripts/                # Scripts de maintenance et outils
├── 📊 reports/                # Rapports d'analyse et performance
└── ⚙️  Configuration           # Fichiers de config (Next, TS, etc.)
```

---

## 🏠 Structure Racine

### Dossiers Principaux

| Dossier | Description | Contenu | À quoi il sert |
|---------|-------------|---------|----------------|
| `docs/` | Documentation du projet | Guides, architecture, setup, features | Documenter toutes les fonctionnalités, l'architecture et les processus du projet |
| `public/` | Assets statiques | Images WebP, icônes SVG | Stocker les ressources statiques servies directement par Next.js (images, logos, icônes) |
| `src/` | Code source Next.js | Application complète | Contenir tout le code source de l'application web |
| `scripts/` | Scripts de maintenance | Nettoyage, tests, outils | Automatiser les tâches de maintenance, nettoyage et tests |
| `reports/` | Rapports d'analyse | Performance, Lighthouse, analyses GROQ | Stocker les résultats d'analyses de performance et d'optimisation |

### Fichiers de Configuration

| Fichier | À quoi il sert |
|---------|----------------|
| `next.config.ts` | Configurer Next.js 15 (images, redirections, headers, etc.) |
| `sanity.config.ts` | Configurer Sanity Studio (projet, dataset, plugins) |
| `tsconfig.json` | Configurer le compilateur TypeScript (chemins, options strictes) |
| `tailwind.config.ts` | Configurer Tailwind CSS (thème, couleurs, breakpoints) |
| `components.json` | Configurer shadcn/ui (chemins des composants) |
| `package.json` | Gérer les dépendances npm et les scripts de build/dev |
| `.env.local` | Stocker les variables d'environnement locales (secrets, API keys) |
| `.gitignore` | Exclure les fichiers du versioning Git (node_modules, .env, etc.) |
| `postcss.config.js` | Configurer PostCSS pour le traitement CSS |
| `eslint.config.mjs` | Configurer ESLint pour le linting du code |

---

## 🗄️ Dossier `src/`

### 📁 Structure Complète

```
src/
├── app/                        # Next.js App Router - Pages et routes
├── components/                 # Composants React réutilisables
├── sanity/                     # Sanity CMS - Schémas et configuration
├── types/                      # Types TypeScript
├── ui/                         # Design System (shadcn/ui)
├── hooks/                      # React Hooks personnalisés
├── lib/                        # Bibliothèques utilitaires
├── utils/                      # Fonctions utilitaires
├── constants/                  # Constantes de l'application
├── data/                       # Données statiques
├── providers/                  # Context Providers React
└── styles/                     # Styles CSS globaux
```

---

## 📱 `src/app/` - Pages Next.js

**À quoi il sert** : Définir toutes les routes et pages de l'application avec le système App Router de Next.js 15.

```
app/
├── page.tsx                           # Page d'accueil (/)
├── layout.tsx                         # Layout principal (wrapper global)
├── globals.css                        # Styles globaux de l'application
├── a-propos/
│   └── page.tsx                       # Page À Propos (/a-propos)
├── contact/
│   └── page.tsx                       # Page Contact (/contact)
├── tarifs/
│   └── page.tsx                       # Page Tarifs (/tarifs)
├── la-structure/
│   ├── page.tsx                       # Page Structure principale
│   └── [slug]/
│       └── page.tsx                   # Pages Structure dynamiques (par secteur)
├── mentions-legales/
│   └── page.tsx                       # Mentions légales
├── politique-confidentialite/
│   └── page.tsx                       # Politique de confidentialité
├── exemples/
│   └── page.tsx                       # Page d'exemples (environnement dev)
├── api/                               # Routes API (backend)
│   ├── contact/
│   │   └── route.ts                   # Endpoint API pour envoi email contact
│   └── recaptcha-config/
│       └── route.ts                   # Endpoint API pour config reCAPTCHA
└── studio/
    └── [[...index]]/
        └── page.tsx                   # Sanity Studio intégré (/studio)
```

**Fonctionnalités** :
- Pages Next.js avec Server Components pour performance optimale
- Routes API pour le formulaire de contact et la configuration reCAPTCHA
- Sanity Studio intégré dans l'application
- Pages statiques générées (SSG) pour SEO et performance
- Routes dynamiques pour les pages de secteurs

---

## 🎨 `src/components/` - Composants React

**À quoi il sert** : Organiser tous les composants React de l'application par fonctionnalité et responsabilité.

```
components/
├── dev/                               # DÉVELOPPEMENT
│   ├── DevJsonViewer.tsx             # Visualiseur JSON pour debug
│   └── DevOnly.tsx                   # Wrapper pour composants dev uniquement
│
├── forms/                             # FORMULAIRES
│   ├── ContactForm.tsx               # Formulaire de contact principal avec validation
│   ├── ContactFormSection.tsx        # Section complète formulaire (wrapper)
│   ├── ReCaptcha.tsx                 # Composant reCAPTCHA v2
│   ├── FormField.tsx                 # Champ de formulaire réutilisable
│   ├── FormTextarea.tsx              # Textarea avec validation
│   └── FormSubmit.tsx                # Bouton de soumission avec états
│
├── gallery/                           # GALERIES PHOTOS
│   ├── PhotoGallery.tsx              # Galerie principale (React Photo Album)
│   ├── GalleryLightbox.tsx           # Lightbox pour agrandissement images
│   ├── PhotoAlbumGallery.tsx         # Galerie avec lightbox intégrée
│   └── index.ts                      # Exports des composants galerie
│
├── icons/                             # ICÔNES PERSONNALISÉES
│   ├── BackgroundIcon.tsx            # Icône background SVG
│   ├── MapIcon.tsx                   # Icône carte SVG
│   └── index.ts                      # Exports des icônes
│
├── layout/                            # LAYOUT ET STRUCTURE
│   ├── Header.tsx                    # En-tête du site (logo, navigation)
│   ├── Footer.tsx                    # Pied de page (liens, copyright)
│   ├── Navigation.tsx                # Navigation principale
│   ├── BottomBar.tsx                 # Barre de navigation mobile fixe
│   └── BackToTop.tsx                 # Bouton retour en haut de page
│
├── lazy/                              # LAZY LOADING (PERFORMANCE)
│   ├── LazyGoogleMaps.tsx            # Chargement différé Google Maps
│   ├── LazyLightbox.tsx              # Chargement différé Lightbox
│   ├── LazyRecaptcha.tsx             # Chargement différé reCAPTCHA
│   ├── LazyComponents.tsx            # Wrapper générique lazy load
│   └── index.ts                      # Exports lazy loading
│
├── pages/                             # COMPOSANTS SPÉCIFIQUES AUX PAGES
│   ├── home/                         # Composants page d'accueil
│   │   ├── HeroSection.tsx           # Section Hero principale
│   │   ├── WelcomeSection.tsx        # Section Bienvenue
│   │   ├── ValuesSection.tsx         # Section Valeurs de la garderie
│   │   └── TestimonialsSection.tsx   # Section Témoignages parents
│   ├── about/                        # Composants page À Propos
│   │   ├── TeamSection.tsx           # Section Équipe
│   │   └── HistorySection.tsx        # Section Histoire
│   ├── contact/                      # Composants page Contact
│   │   ├── ContactInfoSection.tsx    # Informations de contact
│   │   └── MapSection.tsx            # Section carte Google Maps
│   ├── sector/                       # Composants pages Secteurs
│   │   ├── SectorHero.tsx            # Hero section pour chaque secteur
│   │   └── SectorContent.tsx         # Contenu spécifique secteur
│   ├── horaires-tarifs/              # Composants page Horaires & Tarifs
│   │   ├── ScheduleSection.tsx       # Section horaires d'ouverture
│   │   └── PricingSection.tsx        # Section grille tarifaire
│   └── exemples/                     # Composants page Exemples
│       └── ExamplesGrid.tsx          # Grille d'exemples de composants
│
└── shared/                            # COMPOSANTS PARTAGÉS
    ├── AnimateCSS.tsx                # Wrapper pour animations CSS
    ├── BlockQuote.tsx                # Citations formatées
    ├── CriticalCSS.tsx               # Injection CSS critique
    ├── HeroGlobal.tsx                # Hero section réutilisable
    ├── ParalaxImage.tsx              # Images avec effet parallax
    ├── Partners.tsx                  # Section partenaires/logos
    │
    ├── feedback/                     # Composants de feedback utilisateur
    │   ├── ErrorMessage.tsx          # Messages d'erreur
    │   └── SuccessMessage.tsx        # Messages de succès
    │
    ├── maps/                         # Composants Google Maps
    │   ├── GoogleMap.tsx             # Carte Google Maps interactive
    │   ├── StaticMap.tsx             # Carte statique (image)
    │   ├── MapActions.tsx            # Actions de la carte (itinéraire, etc.)
    │   └── MapMarker.tsx             # Marqueur personnalisé
    │
    ├── navigation/                   # Navigation
    │   ├── NavLink.tsx               # Lien de navigation avec état actif
    │   ├── MobileMenu.tsx            # Menu mobile responsive
    │   ├── DesktopMenu.tsx           # Menu desktop
    │   └── MenuToggle.tsx            # Toggle burger menu
    │
    ├── pricing/                      # Composants tarifs
    │   ├── PriceCard.tsx             # Carte de prix individuelle
    │   ├── PriceTable.tsx            # Tableau de prix
    │   └── PriceList.tsx             # Liste de prix
    │
    └── richtext/                     # Rich Text (Portable Text Sanity)
        ├── RichTextRenderer.tsx      # Renderer principal Portable Text
        ├── RichTextComponents.tsx    # Composants personnalisés (headings, etc.)
        ├── ListRenderer.tsx          # Renderer pour listes
        ├── BlockRenderer.tsx         # Renderer pour blocs de texte
        └── MarkRenderer.tsx          # Renderer pour marks (bold, italic, etc.)
```

**Organisation par responsabilité** :
- **dev/** : Outils de développement et debug (seulement en dev)
- **forms/** : Tous les composants liés aux formulaires avec validation
- **gallery/** : Système de galeries photos avec lightbox
- **icons/** : Icônes SVG personnalisées
- **layout/** : Structure de la page (header, footer, navigation)
- **lazy/** : Composants avec chargement différé pour optimiser la performance
- **pages/** : Composants spécifiques à chaque page (non réutilisables)
- **shared/** : Composants partagés et réutilisables dans toute l'application

---

## 🗄️ `src/sanity/` - Sanity CMS

**À quoi il sert** : Gérer toute la configuration et l'intégration du CMS Sanity (schémas de contenu, queries, client).

```
sanity/
├── Studio.tsx                         # Wrapper du Sanity Studio
├── sanity.config.ts                   # Configuration complète du Studio
├── schema.ts                          # Schema global (agrégation des schémas)
├── deskStructure.ts                   # Structure de navigation dans le Studio
│
├── components/                        # COMPOSANTS SANITY STUDIO
│   ├── CustomInput.tsx               # Input personnalisé pour le Studio
│   └── PreviewComponent.tsx          # Composant de prévisualisation
│
├── hooks/                             # HOOKS SANITY
│   └── useSanityData.ts              # Hook pour fetcher les données Sanity
│
├── lib/                               # BIBLIOTHÈQUES SANITY
│   ├── client.ts                     # Client Sanity configuré
│   └── image.ts                      # Helper pour images Sanity (urlFor, etc.)
│
├── queries/                           # QUERIES GROQ
│   ├── groq/                         # Queries GROQ brutes
│   │   ├── pages.ts                  # Queries pour toutes les pages
│   │   ├── content.ts                # Queries pour contenus réutilisables
│   │   └── common.ts                 # Fragments GROQ communs
│   └── json-response/                # Responses JSON (pour tests)
│       ├── home.json                 # Response de la page accueil
│       └── about.json                # Response de la page à propos
│
├── schemas/                           # SCHÉMAS DE CONTENU
│   ├── components/                   # Schémas pour composants réutilisables
│   │   ├── blockQuote.ts            # Schéma citation
│   │   ├── gallery.ts               # Schéma galerie photos
│   │   ├── hero.ts                  # Schéma hero section
│   │   ├── pricing.ts               # Schéma grille tarifaire
│   │   └── testimonial.ts           # Schéma témoignage
│   └── pages/                        # Schémas pour pages
│       ├── homePage.ts              # Schéma page accueil
│       ├── aboutPage.ts             # Schéma page à propos
│       ├── contactPage.ts           # Schéma page contact
│       ├── pricingPage.ts           # Schéma page tarifs
│       └── sectorPage.ts            # Schéma page secteur
│
└── styles/                            # STYLES SANITY STUDIO
    └── studio.css                    # Styles personnalisés du Studio
```

**Fonctionnalités** :
- Configuration complète de Sanity Studio
- Schémas de contenu pour toutes les pages et composants
- Queries GROQ optimisées avec cache pour performance
- Client Sanity configuré pour fetch les données
- Helpers pour manipulation d'images
- Composants personnalisés pour le Studio

---

## 🎯 `src/types/` - Types TypeScript

**À quoi il sert** : Centraliser toutes les définitions de types TypeScript pour assurer la sécurité des types dans toute l'application.

```
types/
├── index.ts                           # Index principal (exports globaux)
│
├── frontend/                          # TYPES FRONTEND
│   ├── index.ts                      # Exports types frontend
│   ├── breakpoints.ts                # Types pour breakpoints responsive
│   ├── map.ts                        # Types pour Google Maps
│   ├── richText.ts                   # Types pour Rich Text rendering
│   ├── sanity.ts                     # Types bridge Sanity-Frontend
│   └── components/                   # Types pour composants
│       ├── button.ts                 # Props et types boutons
│       ├── form.ts                   # Props et types formulaires
│       └── gallery.ts                # Props et types galeries
│
└── sanity/                            # TYPES SANITY
    ├── index.ts                      # Index types Sanity
    ├── validation.ts                 # Types pour validation Sanity
    ├── sectorPage.ts                 # Types pour page secteur
    ├── portableText.ts               # Types pour Portable Text
    │
    ├── core/                         # TYPES CORE SANITY
    │   ├── index.ts                  # Exports types core
    │   ├── image.ts                  # Types pour images Sanity
    │   └── portableText.ts           # Types Portable Text de base
    │
    ├── content/                      # TYPES CONTENUS RÉUTILISABLES
    │   ├── index.ts                  # Exports types content
    │   ├── general.ts                # Types contenus généraux
    │   └── prices.ts                 # Types grilles tarifaires
    │
    └── pages/                        # TYPES PAGES
        ├── index.ts                  # Exports types pages
        ├── home.ts                   # Types page accueil
        ├── about.ts                  # Types page à propos
        ├── contact.ts                # Types page contact
        ├── contactPage.ts            # Types contact page schema
        ├── prices.ts                 # Types page tarifs
        ├── schedule.ts               # Types page horaires
        ├── structure.ts              # Types page structure
        ├── sectorPage.ts             # Types page secteur
        ├── sanityImage.ts            # Types images Sanity
        ├── testimonials.ts           # Types témoignages
        ├── espaces.ts                # Types espaces
        └── partners.ts               # Types partenaires
```

**Organisation** :
- **frontend/** : Types pour composants React, UI et fonctionnalités frontend
- **sanity/** : Types générés depuis les schémas Sanity
- **sanity/core/** : Types de base Sanity (images, Portable Text)
- **sanity/content/** : Types pour contenus réutilisables
- **sanity/pages/** : Types spécifiques à chaque page

**À quoi ça sert** :
- Assurer la sécurité des types dans tout le code
- Autocomplétion dans l'éditeur
- Détecter les erreurs à la compilation
- Documentation du code via les types

---

## 🎨 `src/ui/` - Design System

**À quoi il sert** : Fournir un système de design complet et cohérent avec des composants UI réutilisables basés sur shadcn/ui.

```
ui/
├── accordion.tsx                      # Accordéons repliables
├── alert.tsx                          # Alertes et notifications
├── alert-dialog.tsx                   # Dialogs d'alerte modales
├── aspect-ratio.tsx                   # Conteneurs avec ratio d'aspect
├── avatar.tsx                         # Avatars utilisateurs
├── badge.tsx                          # Badges et tags
├── breadcrumb.tsx                     # Fil d'Ariane
├── button.tsx                         # Boutons (primaire, secondaire, etc.)
├── button-group.tsx                   # Groupes de boutons
├── calendar.tsx                       # Calendrier de sélection de date
├── callout.tsx                        # Callouts informatifs
├── card.tsx                           # Cartes de contenu
├── card-examples.tsx                  # Exemples d'utilisation cartes
├── carousel.tsx                       # Carrousels d'images/contenu
├── chart.tsx                          # Graphiques et visualisations
├── checkbox.tsx                       # Cases à cocher
├── collapsible.tsx                    # Sections repliables
├── command.tsx                        # Interface de commandes
├── context-menu.tsx                   # Menus contextuels (clic droit)
├── dialog.tsx                         # Dialogs modales
├── drawer.tsx                         # Tiroirs latéraux
├── dropdown-menu.tsx                  # Menus déroulants
├── empty.tsx                          # États vides (no data)
├── field.tsx                          # Champs de formulaire
├── form.tsx                           # Formulaires avec validation
├── hover-card.tsx                     # Cartes affichées au survol
├── input.tsx                          # Inputs de texte
├── input-group.tsx                    # Groupes d'inputs
├── input-otp.tsx                      # Input pour codes OTP
├── item.tsx                           # Items de liste génériques
├── kbd.tsx                            # Affichage raccourcis clavier
├── label.tsx                          # Labels de formulaire
├── menubar.tsx                        # Barres de menu horizontales
├── native-select.tsx                  # Selects natifs HTML
├── navigation-menu.tsx                # Menus de navigation
├── pagination.tsx                     # Pagination de listes
├── popover.tsx                        # Popovers (tooltips riches)
├── progress.tsx                       # Barres de progression
├── radio-group.tsx                    # Groupes de boutons radio
├── resizable.tsx                      # Éléments redimensionnables
├── scroll-area.tsx                    # Zones de scroll personnalisées
├── select.tsx                         # Selects personnalisés
├── separator.tsx                      # Séparateurs visuels
├── sheet.tsx                          # Sheets (panneaux latéraux)
├── sidebar.tsx                        # Sidebars de navigation
├── skeleton.tsx                       # Skeletons de chargement
├── slider.tsx                         # Sliders de valeur
├── sonner.tsx                         # Toasts (notifications Sonner)
├── spinner.tsx                        # Spinners de chargement
├── switch.tsx                         # Switches on/off
├── table.tsx                          # Tableaux de données
├── tabs.tsx                           # Onglets de navigation
├── textarea.tsx                       # Textareas multi-lignes
├── toggle.tsx                         # Toggles on/off
├── toggle-group.tsx                   # Groupes de toggles
├── tooltip.tsx                        # Tooltips informatifs
│
├── lib/                               # UTILITAIRES UI
│   ├── utils.ts                      # Fonction cn() pour classes CSS
│   └── getButtonComponent.ts         # Helper pour composants boutons
│
├── types/                             # TYPES UI
│   └── button.ts                     # Types pour boutons
│
└── variants/                          # VARIANTS CVA (Class Variance Authority)
    ├── index.ts                      # Exports variants
    ├── badge.ts                      # Variants badge
    ├── button.ts                     # Variants button
    ├── card.ts                       # Variants card
    ├── input.ts                      # Variants input
    ├── label.ts                      # Variants label
    └── tooltip.ts                    # Variants tooltip
```

**Caractéristiques** :
- Composants UI complets et accessibles (WCAG)
- Basés sur Radix UI primitives + Tailwind CSS
- Variants personnalisés avec Class Variance Authority (CVA)
- Types TypeScript stricts pour toutes les props
- Thème personnalisable via Tailwind config

---

## 🪝 `src/hooks/` - React Hooks

**À quoi il sert** : Centraliser toute la logique réutilisable dans des hooks personnalisés pour éviter la duplication de code.

```
hooks/
├── index.ts                           # Index et exports de tous les hooks
│
├── ACCESSIBILITÉ (A11Y)
├── useButtonA11y.ts                   # Accessibilité pour boutons (ARIA, keyboard)
├── useButtonA11yProps.ts              # Props a11y pour boutons
├── useFocusA11y.ts                    # Gestion du focus accessible
├── useFormA11y.ts                     # Accessibilité pour formulaires
├── useGalleryA11y.ts                  # Accessibilité pour galeries
├── useImageA11y.ts                    # Accessibilité pour images (alt, ARIA)
├── useLinkA11y.ts                     # Accessibilité pour liens
│
├── FORMULAIRES
├── useFormValidation.ts               # Validation de formulaires (Zod)
├── useLocalStorage.ts                 # Persistance dans localStorage
│
├── INTÉGRATIONS EXTERNES
├── useMaps.ts                         # Intégration Google Maps API
├── useRecaptchaV2.ts                  # Intégration reCAPTCHA v2
├── useQueries.ts                      # Queries Sanity optimisées
│
├── UI/UX
├── useGalleryState.ts                 # Gestion d'état des galeries
├── useScollParalax.ts                 # Effet parallax au scroll
├── useScroll.ts                       # Position et direction du scroll
├── useWindowSize.ts                   # Taille de la fenêtre (responsive)
│
└── DÉVELOPPEMENT
    └── useConsoleLogs.ts              # Logs console conditionnels (dev only)
```

**Catégories** :
- **Accessibilité** : Hooks pour conformité WCAG et ARIA
- **Formulaires** : Validation, persistance, gestion d'état
- **Intégrations** : Google Maps, reCAPTCHA, Sanity
- **UI/UX** : Scroll, parallax, responsive, galeries
- **Développement** : Outils de debug et développement

**À quoi ça sert** :
- Réutiliser la logique complexe dans plusieurs composants
- Séparer la logique métier de l'UI
- Faciliter les tests unitaires
- Améliorer la maintenabilité du code

---

## 🛠️ `src/lib/` - Bibliothèques

**À quoi il sert** : Fournir des utilitaires et helpers réutilisables pour des fonctionnalités spécifiques.

```
lib/
├── imageOptimization.ts               # Optimisation images (Sanity + Next.js Image)
├── theme-utils.ts                     # Utilitaires pour gestion du thème
└── utils.ts                           # Utilitaires généraux
```

**Fonctionnalités** :
- **imageOptimization.ts** : Génération d'URLs optimisées, srcsets, placeholders blur
- **theme-utils.ts** : Gestion du thème clair/sombre, tokens CSS
- **utils.ts** : Fonctions utilitaires générales (formatage, etc.)

---

## 🔧 `src/utils/` - Utilitaires

**À quoi il sert** : Stocker des fonctions utilitaires spécifiques à l'application.

```
utils/
└── sectorIcons.tsx                    # Mapping des icônes par secteur
```

**À quoi ça sert** :
- Fournir les bonnes icônes pour chaque secteur de la garderie
- Mapping entre les slugs et les composants d'icônes

---

## 📦 `src/constants/` - Constantes

**À quoi il sert** : Centraliser toutes les constantes de l'application pour éviter les valeurs en dur dans le code.

```
constants/
├── map_info_default.ts                # Informations par défaut pour Google Maps
└── navigation_menu.ts                 # Structure du menu de navigation
```

**À quoi ça sert** :
- **map_info_default.ts** : Coordonnées, zoom, type de carte par défaut
- **navigation_menu.ts** : Liens du menu, labels, routes

---

## 📊 `src/data/` - Données Statiques

**À quoi il sert** : Stocker les données statiques ou mock data utilisées dans l'application.

```
data/
├── partners.ts                        # Liste des partenaires (logos, liens)
├── prices.ts                          # Grilles tarifaires statiques
├── spaces.ts                          # Espaces de la garderie (description)
├── structures.ts                      # Structures/secteurs de la garderie
├── testimonials.ts                    # Témoignages de parents
│
└── response-queries/                  # RESPONSES JSON SANITY (pour tests)
    ├── about.json                    # Response complète page à propos
    ├── contact.json                  # Response complète page contact
    ├── home.json                     # Response complète page accueil
    ├── prices.json                   # Response complète page tarifs
    └── structure.json                # Response complète page structure
```

**À quoi ça sert** :
- Fournir des données statiques pour les pages
- Stocker des données de fallback
- Tester les composants sans appeler Sanity
- Documenter la structure des données attendues

---

## 🎭 `src/providers/` - Context Providers

**À quoi il sert** : Gérer l'état global de l'application avec React Context.

```
providers/
└── index.ts                           # Providers globaux (Theme, etc.)
```

**À quoi ça sert** :
- Fournir un état global accessible par tous les composants
- Gérer le thème de l'application
- Partager des données entre composants éloignés

---

## 🎨 `src/styles/` - Styles CSS

**À quoi il sert** : Centraliser tous les styles CSS de l'application (globals, variables, animations).

```
styles/
├── README.md                          # Documentation des styles
├── typography-guide.md                # Guide de typographie
│
├── frontend/                          # STYLES FRONTEND
│   ├── animations.css                # Animations CSS personnalisées
│   ├── utilities.css                 # Classes utilitaires CSS
│   └── components.css                # Styles de composants spécifiques
│
├── globals/                           # STYLES GLOBAUX
│   ├── base.css                      # Styles de base (body, html, etc.)
│   ├── reset.css                     # Reset CSS (normalize)
│   ├── variables.css                 # Variables CSS (couleurs, spacing, etc.)
│   ├── fluid-variables.css           # Variables fluides (responsive)
│   ├── typography.css                # Styles typographiques
│   └── tailwind.css                  # Imports et config Tailwind
│
└── sanity/                            # STYLES SANITY STUDIO
    └── studio.css                    # Styles personnalisés pour le Studio
```

**Organisation** :
- **frontend/** : Styles spécifiques à l'application web
- **globals/** : Variables CSS, reset, typographie de base
- **sanity/** : Styles pour personnaliser le Sanity Studio

**À quoi ça sert** :
- Définir les variables CSS globales (couleurs, spacing)
- Fournir des animations réutilisables
- Personnaliser l'apparence du Sanity Studio
- Système de typographie cohérent

---

## 📚 Dossier `docs/`

**À quoi il sert** : Documenter complètement le projet (architecture, features, setup, tests).

```
docs/
├── README.md                          # 📚 Index principal de la documentation
├── STRUCTURE.md                       # 📁 Ce fichier - Structure complète du projet
│
├── ANALYSE DE PROJET
├── PROJECT_STRUCTURE_ANALYSIS.md      # Analyse détaillée de la structure
├── REORGANIZATION_PLAN.md             # Plan de réorganisation du code
├── SANITY_TYPES_REORGANIZATION.md     # Migration des types Sanity
│
├── MIGRATIONS
├── FLUID-CICD-STRATEGY.md             # Stratégie de CI/CD
├── FLUID-TO-TAILWIND-MIGRATION.md     # Migration Fluid → Tailwind CSS
├── LEADING-COMPARISON.md              # Comparaison de leading typography
│
├── setup/                             # ⚙️ CONFIGURATION ET SETUP
│   ├── SETUP.md                       # Configuration initiale du projet
│   ├── SECURITY.md                    # Sécurité (reCAPTCHA, Honeypot)
│   ├── GITHUB.md                      # Git workflow, branches, CI/CD
│   ├── DOMAINS.md                     # Configuration des domaines
│   └── SANITY_DEPLOYMENT.md           # Déploiement Sanity Studio
│
├── sanity/                            # 🗄️ DOCUMENTATION SANITY
│   ├── SANITY.md                      # Setup, schémas, queries GROQ
│   └── SANITY_IMAGES.md               # Système d'images, optimisation
│
├── features/                          # 🎨 FEATURES ET COMPOSANTS
│   ├── ARCHITECTURE.md                # Architecture de l'application
│   ├── FORM.md                        # Formulaire de contact
│   ├── GALLERY.md                     # Galeries React Photo Album
│   ├── LIGHTBOX.md                    # Lightbox yet-another-react-lightbox
│   ├── MAP.md                         # Cartes Google Maps
│   ├── MOBILE_NAV.md                  # Navigation mobile
│   ├── BUTTON_FALLBACKS.md            # Système de fallbacks boutons
│   ├── photo-album-gallery-lightbox.md # Documentation combinée
│   └── REFACTORING.md                 # Documentation refactoring
│
├── performance/                       # ⚡ PERFORMANCE ET SEO
│   ├── LIGHTHOUSE.md                  # Optimisation Lighthouse
│   └── SEO.md                         # Référencement SEO
│
├── tests/                             # 🧪 TESTS ET VALIDATION
│   ├── README.md                      # Index des tests disponibles
│   ├── ACCESSIBILITY_TESTS.md         # Tests d'accessibilité
│   ├── BUILD_REPORT.md                # Rapport de build
│   ├── BUTTON_ACCESSIBILITY_TESTS.md  # Tests a11y boutons
│   ├── DEV_TOOLS_VALIDATION.md        # Validation dev tools
│   ├── PERFORMANCE_REPORT.md          # Rapport de performance
│   ├── RESPONSIVE_TEST_PLAN.md        # Plan de tests responsive
│   └── SSR_HYDRATION_TESTS.md         # Tests SSR et hydration
│
└── dev/                               # 💻 DÉVELOPPEMENT
    ├── DEV_JSON_VIEWER_USAGE.md       # Usage du JSON viewer
    ├── VISION_QUERIES.md              # Queries Sanity Vision
    └── vision-results/                # Résultats des queries Vision
        └── README.md
```

**À quoi ça sert** :
- **setup/** : Documenter la configuration initiale et le déploiement
- **sanity/** : Expliquer l'utilisation de Sanity CMS
- **features/** : Documenter chaque fonctionnalité de l'application
- **performance/** : Documenter les optimisations et le SEO
- **tests/** : Rapports de tests et validation
- **dev/** : Outils et processus de développement

---

## 📝 Dossier `scripts/`

**À quoi il sert** : Automatiser les tâches de maintenance, nettoyage et tests du projet.

```
scripts/
├── README.md                          # Documentation des scripts disponibles
│
├── clean/                             # SCRIPTS DE NETTOYAGE
│   ├── clean-cache.sh                # Nettoyer le cache (.next, etc.)
│   ├── clean-node-modules.sh         # Supprimer node_modules
│   ├── clean-build.sh                # Nettoyer les builds
│   ├── clean-all.sh                  # Nettoyage complet du projet
│   └── remove-unused-deps.sh         # Supprimer dépendances inutilisées
│
├── fix/                               # SCRIPTS DE CORRECTION
│   ├── fix-imports.sh                # Corriger les imports automatiquement
│   ├── fix-types.sh                  # Corriger les erreurs TypeScript
│   └── fix-eslint.sh                 # Corriger les erreurs ESLint
│
├── tests/                             # SCRIPTS DE TESTS
│   ├── test-build.sh                 # Tester le build de production
│   ├── test-types.sh                 # Vérifier les types TypeScript
│   ├── test-performance.sh           # Tester la performance
│   └── lighthouse.sh                 # Lancer les tests Lighthouse
│
└── tools/                             # OUTILS UTILITAIRES
    └── generate-types.sh             # Générer les types depuis Sanity
```

**À quoi ça sert** :
- **clean/** : Nettoyer le projet (cache, builds, dépendances)
- **fix/** : Corriger automatiquement les erreurs courantes
- **tests/** : Automatiser les tests de build, types, performance
- **tools/** : Générer du code (types Sanity, etc.)

---

## 📊 Dossier `reports/`

**À quoi il sert** : Stocker tous les rapports d'analyse de performance et d'optimisation.

```
reports/
├── README.md                          # Index des rapports disponibles
│
├── ANALYSES SANITY GROQ
├── ANALYSE-ABOUT-PAGE-QUERY.md        # Analyse query page à propos
├── ANALYSE-CHAMPS-UTILISES.md         # Analyse des champs utilisés
├── ANALYSE-HOME-PAGE-QUERY.md         # Analyse query page accueil
├── ANALYSE-PRICES-QUERIES.md          # Analyse queries tarifs
├── ANALYSE-SCHEDULE-PAGE-QUERY.md     # Analyse query horaires
├── OPTIMISATION-GROQ-CACHE.md         # Optimisations GROQ et cache
├── FILTRE-SECTEURS-FLEXIBLE.md        # Analyse filtres secteurs
├── CLARIFICATION-FILTRES-SCHEMA.md    # Clarification des filtres
│
├── ANALYSES PERFORMANCE
├── ANALYSE-PERFORMANCE.md             # Analyse performance générale
├── ANALYSE-PRELOAD.md                 # Analyse du preload
├── RESUME-OPTIMISATION-HOME.md        # Résumé optimisations page accueil
├── RESUME-OPTIMISATIONS-APPLIQUEES.md # Résumé de toutes les optimisations
├── TOPO-FINAL-PERFORMANCE.md          # Bilan final de performance
│
├── COMPARAISONS
├── SANITY-GROQ-VS-GRAPHQL.md          # Comparaison GROQ vs GraphQL
│
└── RAPPORTS LIGHTHOUSE
    ├── lighthouse-report.md           # Rapport Lighthouse (format texte)
    ├── lightouse.json                 # Rapport Lighthouse (format JSON)
    ├── performance-report.json        # Rapport performance (JSON)
    └── performance-report.md          # Rapport performance (texte)
```

**À quoi ça sert** :
- Documenter les analyses de queries Sanity
- Stocker les résultats d'optimisation
- Suivre l'évolution de la performance
- Comparer les différentes approches techniques

---

## 🌐 Dossier `public/`

**À quoi il sert** : Stocker les assets statiques servis directement par Next.js (images, icônes, favicons).

```
public/
├── logo-les-ptits-loups.webp          # Logo principal de la garderie
├── navbar-logo.webp                   # Logo optimisé pour navbar
├── carte.webp                         # Image de la carte/localisation
├── jardin.webp                        # Photo du jardin
├── paralax.webp                       # Image pour effet parallax
├── paralax.jpg                        # Image parallax (fallback JPG)
├── hummingbirds.webp                  # Image des colibris
├── bbnageurs.webp                     # Image bébés nageurs
├── file.svg                           # Icône fichier
├── globe.svg                          # Icône globe
└── window.svg                         # Icône fenêtre
```

**Caractéristiques** :
- Images optimisées en format WebP pour performance
- Icônes vectorielles en SVG
- Assets référencés directement dans l'application
- Servis avec cache optimal par Next.js

---

## 🔍 Index des Fichiers Clés

### Configuration Principale

| Fichier | À quoi il sert | Emplacement |
|---------|----------------|-------------|
| `next.config.ts` | Configurer Next.js (images, redirections, headers, bundle analyzer) | Racine |
| `sanity.config.ts` | Configurer Sanity Studio (projet, dataset, plugins, schémas) | Racine |
| `tailwind.config.ts` | Configurer Tailwind CSS (thème, couleurs, breakpoints, plugins) | Racine |
| `tsconfig.json` | Configurer TypeScript (paths, strict mode, compilation) | Racine |
| `components.json` | Configurer shadcn/ui (chemins des composants UI) | Racine |
| `.env.local` | Stocker les secrets et variables d'environnement | Racine |
| `package.json` | Gérer les dépendances npm et scripts de build | Racine |

### Pages Principales

| Page | Fichier | Route | À quoi elle sert |
|------|---------|-------|------------------|
| Accueil | `src/app/page.tsx` | `/` | Page d'accueil avec hero, valeurs, témoignages |
| À Propos | `src/app/a-propos/page.tsx` | `/a-propos` | Présentation de l'équipe et de la garderie |
| Contact | `src/app/contact/page.tsx` | `/contact` | Formulaire de contact et carte |
| Tarifs | `src/app/tarifs/page.tsx` | `/tarifs` | Grille tarifaire et horaires |
| Structure | `src/app/la-structure/page.tsx` | `/la-structure` | Liste des secteurs |
| Secteur | `src/app/la-structure/[slug]/page.tsx` | `/la-structure/[slug]` | Détail d'un secteur spécifique |
| Studio | `src/app/studio/[[...index]]/page.tsx` | `/studio` | Interface Sanity Studio intégrée |

### API Routes

| Route | Fichier | À quoi elle sert |
|-------|---------|------------------|
| Contact | `src/app/api/contact/route.ts` | Envoyer les emails du formulaire de contact via Resend |
| reCAPTCHA | `src/app/api/recaptcha-config/route.ts` | Fournir la configuration reCAPTCHA au frontend |

### Composants Critiques

| Composant | Fichier | À quoi il sert |
|-----------|---------|----------------|
| ContactForm | `src/components/forms/ContactForm.tsx` | Formulaire de contact avec validation et reCAPTCHA |
| PhotoGallery | `src/components/gallery/PhotoGallery.tsx` | Galerie photos responsive avec lightbox |
| GoogleMap | `src/components/shared/maps/GoogleMap.tsx` | Carte Google Maps interactive |
| RichTextRenderer | `src/components/shared/richtext/RichTextRenderer.tsx` | Rendu du Portable Text de Sanity |
| Header | `src/components/layout/Header.tsx` | En-tête avec logo et navigation |
| Footer | `src/components/layout/Footer.tsx` | Pied de page avec liens et copyright |

### Sanity Clés

| Fichier | À quoi il sert |
|---------|----------------|
| `src/sanity/lib/client.ts` | Client Sanity configuré pour fetch les données |
| `src/sanity/schema.ts` | Schema global Sanity (agrégation de tous les schémas) |
| `src/sanity/deskStructure.ts` | Structure de navigation dans le Studio |
| `src/types/sanity/pages/` | Types TypeScript générés depuis les schémas |

### Hooks Essentiels

| Hook | Fichier | À quoi il sert |
|------|---------|----------------|
| useFormValidation | `src/hooks/useFormValidation.ts` | Valider les formulaires avec Zod |
| useMaps | `src/hooks/useMaps.ts` | Intégrer Google Maps API |
| useRecaptchaV2 | `src/hooks/useRecaptchaV2.ts` | Intégrer reCAPTCHA v2 |
| useLocalStorage | `src/hooks/useLocalStorage.ts` | Persister les données dans localStorage |

---

## ✅ Conventions de Nommage

### Fichiers et Dossiers

| Type | Convention | Exemples |
|------|------------|----------|
| Composants React | **PascalCase** | `ContactForm.tsx`, `PhotoGallery.tsx` |
| Hooks | **camelCase** avec `use` | `useFormValidation.ts`, `useMaps.ts` |
| Utilitaires | **camelCase** | `imageOptimization.ts`, `utils.ts` |
| Types | **camelCase** | `button.ts`, `sanity.ts` |
| Routes Next.js | **kebab-case** | `a-propos/`, `la-structure/` |
| Documentation | **UPPERCASE** | `README.md`, `SETUP.md`, `STRUCTURE.md` |
| Constantes | **SNAKE_CASE** | `MAP_INFO_DEFAULT` |

### Organisation des Dossiers

| Principe | Description |
|----------|-------------|
| **Groupement par fonctionnalité** | Regrouper les fichiers liés (ex: `forms/`, `gallery/`) |
| **index.ts pour exports** | Faciliter les imports avec des barrels |
| **Colocalisation** | Garder les tests et types près du code |
| **README.md par dossier** | Documenter le contenu et l'usage de chaque dossier |

---

## 📝 Checklist de Maintenance

### Lors de changements majeurs

- [ ] Mettre à jour `docs/STRUCTURE.md` si l'organisation des dossiers change
- [ ] Mettre à jour `docs/PROJECT_STRUCTURE_ANALYSIS.md` si la structure globale change
- [ ] Mettre à jour `docs/REORGANIZATION_PLAN.md` si de nouvelles étapes sont complétées
- [ ] Mettre à jour la documentation des features si de nouvelles fonctionnalités sont ajoutées
- [ ] Mettre à jour `docs/README.md` si de nouveaux documents sont créés
- [ ] Vérifier et mettre à jour tous les fichiers `index.ts` pour les exports
- [ ] Régénérer les types Sanity si les schémas sont modifiés
- [ ] Mettre à jour les rapports de performance après optimisations
- [ ] Vérifier que tous les nouveaux composants ont des types appropriés
- [ ] Documenter les nouveaux hooks dans `src/hooks/README.md` (à créer si nécessaire)

### Scripts de maintenance réguliers

```bash
# Nettoyer le cache et les builds
npm run clean

# Vérifier les types TypeScript
npm run type-check

# Linter le code
npm run lint

# Formater le code
npm run format

# Tester le build de production
npm run build
```

---

## 🔍 Navigation Rapide

### Par Fonctionnalité

| Fonctionnalité | Localisation |
|----------------|--------------|
| **Pages du site** | `src/app/` |
| **Composants UI** | `src/components/` et `src/ui/` |
| **CMS Sanity** | `src/sanity/` |
| **Types TypeScript** | `src/types/` |
| **Hooks personnalisés** | `src/hooks/` |
| **Styles CSS** | `src/styles/` |
| **Documentation** | `docs/` |

### Par Type de Fichier

| Type | Localisation |
|------|--------------|
| **Components React (.tsx)** | `src/components/`, `src/ui/`, `src/app/` |
| **Types TypeScript (.ts)** | `src/types/` |
| **Styles CSS (.css)** | `src/styles/` |
| **Queries GROQ** | `src/sanity/queries/groq/` |
| **Schémas Sanity** | `src/sanity/schemas/` |
| **Documentation (.md)** | `docs/` |

### Par Tâche Courante

| Tâche | Emplacement |
|-------|-------------|
| **Ajouter une nouvelle page** | `src/app/[nouvelle-page]/page.tsx` |
| **Créer un nouveau composant** | `src/components/[categorie]/NouveauComposant.tsx` |
| **Modifier le design** | `src/ui/` ou `src/styles/` |
| **Modifier le contenu CMS** | `src/sanity/schemas/` |
| **Optimiser la performance** | Voir `docs/performance/` |
| **Configurer l'environnement** | `.env.local` et fichiers `*.config.ts` |
| **Lancer des tests** | `scripts/tests/` |

---

## 🎯 Résumé des Responsabilités

### Dossiers Frontend

| Dossier | Responsabilité Principale |
|---------|---------------------------|
| `src/app/` | Définir les routes et pages de l'application |
| `src/components/` | Fournir les composants React métier |
| `src/ui/` | Fournir le système de design (composants UI de base) |
| `src/hooks/` | Centraliser la logique réutilisable |
| `src/styles/` | Définir les styles globaux et variables CSS |

### Dossiers Backend/CMS

| Dossier | Responsabilité Principale |
|---------|---------------------------|
| `src/sanity/` | Gérer tout ce qui concerne Sanity CMS |
| `src/sanity/schemas/` | Définir la structure du contenu |
| `src/sanity/queries/` | Récupérer les données de Sanity |
| `src/types/sanity/` | Typer les données venant de Sanity |

### Dossiers Utilitaires

| Dossier | Responsabilité Principale |
|---------|---------------------------|
| `src/lib/` | Fournir des helpers et utilitaires |
| `src/utils/` | Fonctions utilitaires spécifiques |
| `src/constants/` | Stocker les valeurs constantes |
| `src/data/` | Stocker les données statiques |
| `src/types/` | Définir tous les types TypeScript |

### Dossiers Projet

| Dossier | Responsabilité Principale |
|---------|---------------------------|
| `docs/` | Documenter le projet complet |
| `scripts/` | Automatiser les tâches de maintenance |
| `reports/` | Stocker les rapports d'analyse |
| `public/` | Servir les assets statiques |

---

**Dernière mise à jour** : Novembre 2024
**Maintenu par** : Équipe de développement
**Version** : 2.0 - Structure complète refactorisée et documentée
