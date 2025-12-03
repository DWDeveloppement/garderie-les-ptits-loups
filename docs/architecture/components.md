# Architecture - Composants

## 📊 Vue d'ensemble

**87 composants TypeScript/TSX** organisés de manière modulaire.

---

## 📁 Organisation des composants

### 1. UI Primitives (19 composants)

**Chemin** : `src/components/ui/`

Composants de base Shadcn UI + Radix UI :

| Composant | Fichier | Description |
|-----------|---------|-------------|
| Accordion | `accordion.tsx` | Sections pliables |
| Alert | `alert.tsx` | Messages d'alerte |
| Avatar | `avatar.tsx` | Images de profil |
| Badge | `badge.tsx` | Étiquettes colorées |
| Button | `button.tsx` | Boutons avec variants |
| Callout | `callout.tsx` | Boîtes d'info |
| Card | `card.tsx` | Cartes de contenu |
| Dialog | `dialog.tsx` | Modales |
| Form | `form.tsx` | Formulaires |
| Input | `input.tsx` | Champs de saisie |
| Label | `label.tsx` | Labels de formulaire |
| Navigation Menu | `navigation-menu.tsx` | Menu de navigation |
| Scroll Area | `scroll-area.tsx` | Zones scrollables |
| Separator | `separator.tsx` | Séparateurs |
| Skeleton | `skeleton.tsx` | Chargement squelettes |
| Sonner | `sonner.tsx` | Notifications toast |
| Spinner | `spinner.tsx` | Indicateurs de chargement |
| Textarea | `textarea.tsx` | Zones de texte |
| Tooltip | `tooltip.tsx` | Info-bulles |

**Variants** (7 fichiers) : `ui/variants/`
- `badge.ts`, `button.ts`, `card.ts`, `input.ts`, `label.ts`, `toast.ts`, `tooltip.ts`

---

### 2. Pages (25 sections)

**Chemin** : `src/components/pages/`

#### 2.1 Home (4 sections)

- `HeroSection.tsx` : Hero de la page d'accueil
- `SpacesSection.tsx` : Présentation des espaces
- `StructureSection.tsx` : Structure de la garderie
- `Testimonals.tsx` : Témoignages des parents

#### 2.2 About (7 sections + index)

- `HeroAboutSection.tsx` : Hero À propos
- `AboutIntroSection.tsx` : Introduction
- `HistorySection.tsx` : Historique
- `ValuesSection.tsx` : Valeurs
- `PedagogySection.tsx` : Pédagogie
- `TeamSection.tsx` : Équipe

#### 2.3 Contact (3 sections)

- `HeroContactSection.tsx` : Hero Contact
- `ContactFormSection.tsx` : Formulaire de contact (Client Component)
- `MapSection.tsx` : Carte interactive (Client Component)

#### 2.4 Horaires & Tarifs (3 sections)

- `HeroHorairesTarifsSection.tsx` : Hero Horaires/Tarifs
- `PricesSection.tsx` : Tableau des prix
- `SubsidiesSection.tsx` : Subventions

#### 2.5 Sector (6 sections + index)

- `HeroSectorSection.tsx` : Hero secteur
- `ContentSection.tsx` : Contenu du secteur
- `ParallaxSection.tsx` : Section parallax
- `GallerySection.tsx` : Galerie photos (Client Component)
- `LinkedSpacesSection.tsx` : Espaces liés

#### 2.6 Exemples (6 sections)

- `AccordionSection.tsx`, `ButtonSection.tsx`, etc.

---

### 3. Layout (5 composants + index)

**Chemin** : `src/components/layout/`

| Composant | Type | Description |
|-----------|------|-------------|
| `Header.tsx` | Client | En-tête avec navigation |
| `Footer.tsx` | Server | Pied de page avec liens |
| `MainNavigationMenu.tsx` | Client | Menu principal |
| `MobileMenu.tsx` | Client | Menu mobile |

---

### 4. Forms (6 composants + index)

**Chemin** : `src/components/forms/`

| Composant | Description |
|-----------|-------------|
| `ContactForm.tsx` | Formulaire principal (Client Component) |
| `InputField.tsx` | Champ input avec validation |
| `TextareaField.tsx` | Zone de texte avec validation |
| `HoneypotField.tsx` | Champ anti-bot (invisible) |
| `recaptcha-v2.tsx` | Intégration reCAPTCHA |

**Validation** : React Hook Form + Zod
**Sécurité** : reCAPTCHA v2 + Honeypot + validation serveur

---

### 5. Shared (18 composants)

**Chemin** : `src/components/shared/`

#### 5.1 Root (6 composants)

- `HeroGlobal.tsx` : Hero réutilisable
- `ParalaxImage.tsx` : Images avec effet parallax
- `Partners.tsx` : Section partenaires
- `BlockQuote.tsx` : Citations
- `AnimateCSS.tsx` : Animations CSS
- `CriticalCSS.tsx` : CSS critique inline

#### 5.2 Rich Text (5 composants + index)

`shared/richtext/`

- `RichTextRenderer.tsx` : Rendu Portable Text
- `RichTextTitle.tsx` : Titres
- `RichTextQuote.tsx` : Citations
- `RichTextList.tsx` : Listes
- `RichTextFeedbackCard.tsx` : Cartes de feedback

#### 5.3 Maps (4 fichiers + index)

`shared/maps/`

- `StaticMap.tsx` : Carte statique (Server Component)
- `DynamicMap.tsx` : Carte interactive Leaflet (Client Component)
- `MapActions.tsx` : Actions sur la carte

#### 5.4 Navigation (4 fichiers + index)

`shared/navigation/`

- `BottomBar.tsx` : Barre mobile en bas (Client Component)
- `BackToTop.tsx` : Bouton retour en haut (Client Component)
- `MobileNavigation.tsx` : Navigation mobile (Client Component)

#### 5.5 Pricing (3 fichiers + index)

`shared/pricing/`

- `PricingList.tsx` : Liste des prix
- `SubsidiesTable.tsx` : Tableau des subventions

#### 5.6 Feedback (2 fichiers + index)

`shared/feedback/`

- `success-animation.tsx` : Animation de succès

---

### 6. Gallery (4 composants + index)

**Chemin** : `src/components/gallery/`

| Composant | Bibliothèque | Type |
|-----------|--------------|------|
| `Gallery.tsx` | react-photo-album | Client |
| `GalleryWithLightbox.tsx` | + yet-another-react-lightbox | Client |
| `LightboxCustom.tsx` | Personnalisé | Client |

**Features** :
- Layouts responsive (rows, columns, masonry)
- Lightbox avec zoom et navigation
- Zero CLS (dimensions calculées)
- Lazy loading des images

---

### 7. Lazy Loading (5 composants + index)

**Chemin** : `src/components/lazy/`

| Composant | Description |
|-----------|-------------|
| `ClientOnlyComponents.tsx` | HOC pour composants client only |
| `createLazyComponent.tsx` | Factory pour lazy loading |
| `LazySkeletons.tsx` | Skeletons de chargement |
| `skeletons.tsx` | Variantes de skeletons |

**Usage** :
```tsx
const DynamicMap = dynamic(() => import('@/components/shared/maps/DynamicMap'), {
  ssr: false,
  loading: () => <Skeleton className="h-96" />
})
```

---

### 8. Icons (3 fichiers)

**Chemin** : `src/components/icons/`

- `Icon.tsx` : Composant Icon générique
- `registry.ts` : Registre d'icônes Lucide
- `index.ts` : Exports

---

### 9. Dev Tools (2 fichiers + index)

**Chemin** : `src/components/dev/`

- `DevJsonViewer.tsx` : Visualiseur JSON pour debug (Client Component)

---

### 10. Root Components (2 fichiers)

**Chemin** : `src/components/`

- `animate-once.tsx` : Animation au premier chargement
- `transition-link.tsx` : Liens avec transitions

---

## 🎨 Patterns de Composants

### Server vs Client Components

**Server Components (défaut)** : 41 composants
- Pages dans `app/`
- Sections statiques dans `pages/`
- Footer, Partners, etc.

**Client Components ('use client')** : 46 composants
- UI primitives (11)
- Layout interactif (3)
- Forms (5)
- Gallery (3)
- Shared (13) : maps, navigation, pricing, feedback
- Pages (5) : ContactFormSection, MapSection, etc.
- Lazy (4)
- Autres (2)

### Barrel Exports Pattern

Chaque dossier a un `index.ts` pour exports centralisés :

```typescript
// components/forms/index.ts
export { ContactForm } from './ContactForm'
export { InputField } from './InputField'
export { TextareaField } from './TextareaField'
// etc.
```

### Props avec Discriminated Unions

```typescript
// components/ui/button.tsx
export type ButtonProps =
  | ButtonAsNextLinkProps
  | ButtonAsAnchorProps
  | ButtonAsButtonProps
  | ButtonAsDecorativeProps

// Type guards
const isNextLinkProps = (p: ButtonProps): p is ButtonAsNextLinkProps =>
  (p as ButtonAsNextLinkProps).asNextLink === true
```

---

## 📚 Références

- **Shadcn UI** : https://ui.shadcn.com/
- **Radix UI** : https://www.radix-ui.com/primitives
- **Next.js Server Components** : https://nextjs.org/docs/app/building-your-application/rendering/server-components

---

**Dernière mise à jour** : 2025-12-03
**Nombre de composants** : 87
**Architecture** : Next.js 15 App Router + React 19
