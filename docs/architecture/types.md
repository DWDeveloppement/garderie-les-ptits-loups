# Architecture - Types TypeScript

## 📊 Vue d'ensemble

**22 fichiers de types** organisés en **2 catégories principales** : types applicatifs (`src/types/`) et types Sanity (`sanity/types/`).

---

## 📁 Organisation des types

### 1. Types Applicatifs (4 fichiers)

**Chemin** : `src/types/`

#### `breakpoints.ts`

Gestion des breakpoints Tailwind CSS avec utilitaires.

```typescript
type BreakpointSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'custom'

const BREAKPOINTS = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
} as const
```

**Utilitaires** :
- `isBreakpoint(width, breakpoint)` : Vérifie si largeur correspond au breakpoint
- `getCurrentBreakpoint(width)` : Retourne le breakpoint actuel
- `isMobile(width)` : `width < 768px` (xs + sm)
- `isTablet(width)` : `768px ≤ width < 1024px` (md)
- `isDesktop(width)` : `width ≥ 1024px` (lg+)
- `isSmallScreen(width)` : `width < 1024px` (xs + sm + md)
- `isCustomBreakpoint(width, customValue)` : Breakpoint personnalisé

---

#### `richText.ts`

Types pour le rendu de contenu Portable Text.

```typescript
type RichTextBlock = {
  _type: string
  children?: Array<{
    _type: string
    text: string
    marks?: string[]
  }>
  style?: string
  markDefs?: Array<{
    _key: string
    _type: string
    href?: string
  }>
}
```

**Blocs disponibles** :
- `RichTextQuoteBlock` : Citations avec auteur et variant
- `RichTextHeadingBlock` : Titres h1-h6
- `RichTextParagraphBlock` : Paragraphes
- `RichTextListBlock` : Listes à puces/numérotées

**Props composant** :
```typescript
type RichTextBlockProps = {
  block: RichTextBlock
  index: number
  className?: string
  children?: React.ReactNode
  list: RichTextListBlock
  quote: RichTextQuoteBlock
  heading: RichTextHeadingBlock
  paragraph: RichTextParagraphBlock
}
```

---

#### `map.ts`

Types pour les composants de carte (Leaflet + OpenStreetMap).

```typescript
type MapLocation = {
  name: string
  address: string
  postalCode: string
  city: string
  country?: string
  lat: number
  lng: number
}

type StaticMapProps = MapProps & {
  zoom?: number
  mapType?: 'roadmap' | 'satellite' | 'hybrid' | 'terrain' // Non utilisé (legacy)
  style?: 'default' | 'light' | 'dark' // Non utilisé (legacy)
}

type DynamicMapProps = MapProps & {
  ref?: React.RefObject<HTMLDivElement | null>
  zoom?: number
  showMarker?: boolean
  showControls?: boolean
  interactive?: boolean
  zIndex?: number
  ratio?: string
  onError?: (error: string) => void
}
```

**Note** : `mapType` et `style` gardés pour compatibilité mais non utilisés (migration Google Maps → Leaflet).

---

#### `components/button.ts`

**Union discriminée** pour props de boutons polymorphes.

```typescript
type ButtonCommonProps = {
  asChild?: boolean
  ariaLabel?: string
  loading?: boolean
  external?: boolean
  asDecorative?: boolean
}

// Rendu <button>
type ButtonAsButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> &
  ButtonCommonProps & {
    asNextLink?: false
    asLink?: false
  }

// Rendu <a> (lien externe)
type ButtonAsAnchorProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> &
  VariantProps<typeof buttonVariants> &
  ButtonCommonProps & {
    asLink: true
    href: string
    asNextLink?: false
  }

// Rendu Next.js <Link>
type ButtonAsNextLinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> &
  VariantProps<typeof buttonVariants> &
  ButtonCommonProps & {
    asNextLink: true
    href: string
    asLink?: false
  }

// Rendu <div> décoratif
type ButtonAsDecorativeProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof buttonVariants> &
  ButtonCommonProps & {
    asDecorative: true
  }

// Union finale
type ButtonProps = ButtonAsNextLinkProps | ButtonAsAnchorProps | ButtonAsButtonProps | ButtonAsDecorativeProps
```

**Pattern** : Discrimination par props (`asNextLink`, `asLink`, `asDecorative`).

---

## 📦 Types Sanity (18 fichiers)

### Organisation

```
sanity/types/
├── index.ts              # Barrel export principal
├── core/                 # Types de base (4 fichiers)
│   ├── index.ts
│   ├── image.ts
│   ├── portableText.ts
│   └── sanityImage.ts
├── content/              # Entités réutilisables (7 fichiers)
│   ├── index.ts
│   ├── contact.ts
│   ├── espaces.ts
│   ├── partners.ts
│   ├── prices.ts
│   ├── structure.ts
│   └── testimonials.ts
└── pages/                # Structures de pages (7 fichiers)
    ├── index.ts
    ├── about.ts
    ├── contactPage.ts
    ├── home.ts
    ├── legacyAndConfidentials.ts
    ├── schedule.ts
    └── sectorPage.ts
```

---

### 2. Core - Types de Base (4 fichiers)

**Chemin** : `sanity/types/core/`

#### `image.ts`

Types pour images Sanity avec metadata (dimensions, LQIP, blurhash).

```typescript
type SanityImageDimensions = {
  _type: 'sanity.imageDimensions'
  aspectRatio: number
  height: number
  width: number
}

type SanityImageMetadata = {
  dimensions: SanityImageDimensions
  lqip: string // Low Quality Image Placeholder
  blurhash?: string | null
}

type SanityImageAssetRef = {
  _id: string
  url: string
  metadata: SanityImageMetadata
}

type SanityImage = {
  alt: string
  asset: SanityImageAssetRef
  crop: null | {
    bottom?: number
    left?: number
    right?: number
    top?: number
  }
  hotspot: null | {
    height?: number
    width?: number
    x?: number
    y?: number
  }
}
```

**Usage** : Toutes les images Sanity utilisent `SanityImage`.

---

#### `portableText.ts`

Types pour Portable Text (contenu riche Sanity).

```typescript
type PortableTextSpan = {
  _key: string
  _type: 'span'
  text: string
  marks: string[]
}

type PortableTextLink = {
  _key: string
  _type: 'link'
  href: string
}

type PortableTextAlign = {
  _key: string
  _type: 'textAlign'
  align: 'left' | 'center' | 'right' | 'justify'
}

type PortableTextBlock = {
  _key: string
  _type: 'block'
  children: PortableTextSpan[]
  markDefs: PortableTextMarkDef[]
  style: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'blockquote' | 'text-left' | 'text-center' | 'text-right' | 'text-justify'
}

// Blockquote unifié
type Blockquote = {
  _key: string
  _type: 'blockquote'
  text: string
  author?: string
  isSecondary?: boolean // false = Primary (violet), true = Secondary (orange)
  isSpecial?: boolean   // false = Standard (bordure), true = Special (carte)
}

// Union
type PortableTextContent = PortableTextBlock | Blockquote
```

---

#### `sanityImage.ts`

Type pour images parallaxe.

```typescript
type ParalaxImageProps = {
  id: string
  image: SanityImage
}
```

**Note** : Typo dans le nom (`Paralax` au lieu de `Parallax`).

---

### 3. Content - Entités Réutilisables (7 fichiers)

**Chemin** : `sanity/types/content/`

#### `contact.ts`

Informations de contact avec conversion vers `MapLocation`.

```typescript
type SanityContactInfo = {
  name: string
  address: string
  postalCode: string
  city: string
  country: string
  phone: string
  email: string
  openingHours: string
  latitude: number
  longitude: number
  zoom?: number
}

// Fonction de conversion
function contactInfoToMapLocation(contactInfo: SanityContactInfo): MapLocation {
  return {
    name: contactInfo.name,
    address: contactInfo.address,
    postalCode: contactInfo.postalCode,
    city: contactInfo.city,
    country: contactInfo.country,
    lat: contactInfo.latitude,
    lng: contactInfo.longitude
  }
}
```

---

#### `espaces.ts`

Types pour les espaces de la garderie.

```typescript
type SpacesTypesProps = {
  id: string
  title: string
  imageUrl: string
  imageAlt: string
  sector: string // 'nursery' | 'trotteurs' | 'grands' | 'other'
  description: string
  color: string
}
```

---

#### `partners.ts`

Partenaires de la garderie.

```typescript
type Partner = {
  _id: string
  name: string
  website: string
  logo: SanityImage
}

/**
 * @deprecated Utiliser Partner à la place
 */
type PartnersTypesProps = Partner

/**
 * @deprecated Utiliser Partner[] à la place
 */
type PartnersData = Partner[]
```

**Note** : Types legacy deprecated avec annotations JSDoc.

---

#### `prices.ts`

Tarifs et subventions.

```typescript
type PriceItem = {
  description: string
  price: number
}

type PricingBlock = {
  label: string
  items: PriceItem[]
}

type PricingSection = {
  label: string
  journeeComplete?: PricingBlock
  matinRepas?: PricingBlock
  matinSansRepas?: PricingBlock
  apresMidiRepas?: PricingBlock
  apresMidiSansRepas?: PricingBlock
  matinee?: PricingBlock
  apresMidi?: PricingBlock
}

type PriceDocument = {
  _id: string
  _type: 'priceDocument'
  title: string
  prixAuMois: PricingSection
  prixAuJour: PricingSection
}

type SubsidyItem = {
  incomeRange: string
  reductionDaily: number
}

type SubsidiesDocument = {
  _id: string
  _type: 'subsidiesDocument'
  title: string
  labelIncomeRange: string
  labelReduction: string
  items: SubsidyItem[]
}
```

---

#### `structure.ts`

Secteurs de la garderie.

```typescript
type StructureTypesProps = {
  id: string
  title: string
  ageRange: string
  description: string
  icon: React.ElementType
  features: string[]
  color: string
}

// Type JSON (sans React.ElementType)
type StructureData = {
  id: string
  title: string
  ageRange: string
  description: string
  icon: string // Nom de l'icône en string
  features: string[]
  color: string
}
```

**Secteurs** :
- `nursery` : 0-24 mois
- `trotteurs` : 24-36 mois
- `grands` : 3-4 ans
- `other` : Espaces communs

---

#### `testimonials.ts`

Témoignages des parents.

```typescript
type TestimonialsTypesProps = {
  id: number
  name: string
  title: string
  content: string
  rating: number
}
```

---

### 4. Pages - Structures Complètes (7 fichiers)

**Chemin** : `sanity/types/pages/`

#### `home.ts`

Page d'accueil.

```typescript
type LinkedSector = {
  _id: string
  title: string
  ageRange: string
  slug: string
  sectionHero: {
    description: string
    image: SanityImage
  }
}

type LinkedOtherSpace = {
  _id: string
  title: string
  sector: string
  image: SanityImage
  description?: PortableTextBlock[]
}

type HomePageData = {
  title?: string
  sectionHero: {
    title: string
    garderieName: string
    logo: SanityImage
    description: string
    buttonText: string
    buttonLink: string
  }
  sectionStructure?: {
    title?: string
    description?: string
    linkedSectors: LinkedSector[]
  }
  sectionOtherSpaces?: {
    title?: string
    introductionOtherSpaces?: string
    linkedOtherSpaces: LinkedOtherSpace[]
  }
  contentComplement?: PortableTextBlock[]
  parallax?: {
    image: SanityImage
  }
  seo?: {
    metaTitle?: string
    metaDescription?: string
    keywords?: string[]
    shareImage?: SanityImage
  }
}
```

---

#### `about.ts`

Page À propos.

```typescript
type AboutPageData = {
  title: string
  sectionHero: {
    description: string
    image: SanityImage
  }
  introduction?: PortableTextBlock[]
  parallaxOne?: {
    image: SanityImage
  }
  historyCollapse?: {
    content?: PortableTextBlock[]
    historyImage?: {
      url: string
      alt?: string
      width: number
      height: number
    }
  }
  parallaxTwo?: {
    image: SanityImage
  }
  pedagogy?: PortableTextBlock[]
  team?: PortableTextBlock[]
  values?: PortableTextBlock[]
  seo?: {
    metaTitle?: string
    metaDescription?: string
    keywords?: string[]
    shareImage?: SanityImage
  }
}
```

---

#### `contactPage.ts`

Page Contact.

```typescript
type ContactPageData = {
  title: string
  sectionHero: {
    description: string
    image: SanityImage
  }
  contactInfo?: {
    name: string
    address: string
    postalCode: string
    city: string
    country: string
    phone: string
    email: string
    openingHours: string
    latitude: number
    longitude: number
    zoom?: number
  }
  parallax?: {
    image: SanityImage
  }
  seo?: {
    metaTitle?: string
    metaDescription?: string
    keywords?: string[]
    shareImage?: SanityImage
  }
}
```

---

#### `schedule.ts`

Page Horaires & Tarifs.

```typescript
type PriceItem = {
  service: string
  price: string
}

type AccordionItem = {
  accordionTitle: string
  priceItems: PriceItem[]
}

type TariffDocument = {
  _id: string
  title: string
  frequentationType: string
  accordionItems: AccordionItem[]
}

type TariffsSection = {
  title: string
  tarifs: TariffDocument[]
}

type SubsidyItem = {
  incomeRange: string
  subsidy: string
}

type SubsidiesDocument = {
  _id: string
  title: string
  tableContent: {
    subsidyItems: SubsidyItem[]
  }
}

type SubsidiesSection = {
  title: string
  informationImportantSubsidies?: PortableTextBlock[]
}

type SchedulePageData = {
  title: string
  sectionHero: {
    description: string
    image: SanityImage
  }
  parallax?: {
    image: SanityImage
  }
  subsidiesTable: SubsidiesSection
  seo?: {
    metaTitle?: string
    metaDescription?: string
    keywords?: string[]
    shareImage?: SanityImage
  }
}
```

**Note** : `schedule.ts` a des exports sélectifs dans `pages/index.ts` pour éviter conflits avec `content/prices.ts`.

---

#### `sectorPage.ts`

Pages secteurs (nurserie, trotteurs, grands).

```typescript
type GalleryItem = {
  image: SanityImage
  label: string
}

type LinkedSpace = {
  _id: string
  title: string
  description: PortableTextBlock[]
  image: SanityImage
}

type SectionHero = {
  description: string
  image: SanityImage
}

type Parallax = {
  image: SanityImage
}

type SeoMetadata = {
  metaTitle: string
  metaDescription: string
  keywords: string[]
  shareImage?: SanityImage
}

type SectorPageData = {
  _id: string
  title: string
  slug: string | null
  content: PortableTextBlock[]
  gallery: GalleryItem[]
  linkedSpaces: LinkedSpace[]
  parallax: Parallax
  sectionHero: SectionHero
  seo: SeoMetadata | null
}
```

---

#### `legacyAndConfidentials.ts`

Pages Mentions Légales et Politique de Confidentialité.

```typescript
type LegalPageData = {
  title: string
  content: PortableTextBlock[]
}

/**
 * @deprecated Utiliser LegalPageData
 */
type LegacyAndConfidentialsPageData = LegalPageData
```

---

### Export avec Gestion de Conflits

**Fichier** : `sanity/types/pages/index.ts`

```typescript
export * from './about'
export * from './contactPage'
export * from './home'
export * from './legacyAndConfidentials'

// Exports sélectifs pour éviter conflits avec content/prices.ts
export type {
  SchedulePageData,
  SubsidiesSection,
  TariffDocument,
  TariffsSection,
  AccordionItem as ScheduleAccordionItem,
  PriceItem as SchedulePriceItem
} from './schedule'

export * from './sectorPage'
```

**Raison** : `schedule.ts` et `content/prices.ts` ont tous deux `PriceItem` et `SubsidyItem`.

---

## 🎨 Patterns TypeScript

### 1. Union Discriminée

**Exemple** : `ButtonProps` avec discrimination par props.

```typescript
// Discrimination par asNextLink, asLink, asDecorative
type ButtonProps =
  | ButtonAsNextLinkProps
  | ButtonAsAnchorProps
  | ButtonAsButtonProps
  | ButtonAsDecorativeProps
```

**Avantages** :
- Type-safe
- Autocomplétion IDE
- Validation TypeScript stricte

---

### 2. Type Guards & Utilitaires

**Exemple** : `breakpoints.ts`

```typescript
function isMobile(width: number): boolean {
  return width < BREAKPOINTS.md
}

function getCurrentBreakpoint(width: number): BreakpointSize {
  if (width >= BREAKPOINTS['2xl']) return '2xl'
  if (width >= BREAKPOINTS.xl) return 'xl'
  // ...
}
```

**Pattern** : Fonctions utilitaires type-safe pour logique métier.

---

### 3. Barrel Exports

**Pattern** : `index.ts` dans chaque dossier.

```typescript
// sanity/types/index.ts
export * from './core'
export * from './content'
export * from './pages'
```

**Avantages** :
- Imports simplifiés
- Organisation modulaire
- Gestion centralisée des exports

**Usage** :
```typescript
// ❌ Import profond
import { SanityImage } from 'sanity/types/core/image'

// ✅ Import via barrel
import { SanityImage } from 'sanity/types'
```

---

### 4. Exports Sélectifs

**Exemple** : `pages/index.ts`

```typescript
// Renommage pour éviter conflits
export type {
  AccordionItem as ScheduleAccordionItem,
  PriceItem as SchedulePriceItem
} from './schedule'
```

**Pattern** : Aliases pour résoudre conflits de nommage.

---

### 5. Types Deprecated

**Exemple** : `partners.ts`

```typescript
/**
 * @deprecated Utiliser Partner à la place
 */
type PartnersTypesProps = Partner
```

**Pattern** : JSDoc `@deprecated` pour migration progressive.

---

### 6. Fonctions de Conversion

**Exemple** : `contact.ts`

```typescript
function contactInfoToMapLocation(contactInfo: SanityContactInfo): MapLocation {
  return {
    name: contactInfo.name,
    address: contactInfo.address,
    // ...
  }
}
```

**Pattern** : Adaptateurs entre types incompatibles.

---

### 7. as const

**Exemple** : `breakpoints.ts`

```typescript
export const BREAKPOINTS = {
  xs: 0,
  sm: 640,
  // ...
} as const

// Type inféré : { readonly xs: 0, readonly sm: 640, ... }
```

**Pattern** : Constantes immuables avec types littéraux.

---

## 📊 Statistiques

| Catégorie | Fichiers | Pourcentage |
|-----------|----------|-------------|
| **Types Sanity** | 18 | 82% |
| - Pages | 7 | 32% |
| - Content | 7 | 32% |
| - Core | 4 | 18% |
| **Types Applicatifs** | 4 | 18% |
| **Total** | **22** | **100%** |

---

## 🔗 Imports Recommandés

### Imports Sanity

```typescript
// ✅ Import via barrel export
import type {
  SanityImage,
  PortableTextBlock,
  HomePageData,
  Partner
} from 'sanity/types'
```

### Imports Applicatifs

```typescript
// ✅ Import via alias @/types
import type { MapLocation, ButtonProps } from '@/types/map'
import type { BreakpointSize } from '@/types/breakpoints'
```

---

## 📚 Références

- **TypeScript Handbook** : https://www.typescriptlang.org/docs/handbook/
- **Union Discriminées** : https://www.typescriptlang.org/docs/handbook/unions-and-intersections.html
- **Type Guards** : https://www.typescriptlang.org/docs/handbook/advanced-types.html
- **Sanity GROQ** : https://www.sanity.io/docs/groq

---

**Dernière mise à jour** : 2025-12-03
**Nombre de fichiers** : 22
**Catégories** : 2 (Applicatifs + Sanity)
