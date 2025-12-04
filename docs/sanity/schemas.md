# Sanity - Schémas de Contenu

## 📊 Vue d'ensemble

**22 schémas Sanity** organisés en **3 catégories** : composants réutilisables, pages, et entités de contenu.

**Version Sanity** : v4.6.1

---

## 📁 Organisation des schémas

### Structure

```
sanity/schemas/
├── index.ts                    # Barrel export + configuration
├── components/                 # 9 schémas réutilisables
│   ├── index.ts
│   ├── basicImage.ts
│   ├── hero.ts
│   ├── heroImage.ts
│   ├── galleryImage.ts
│   ├── paralaxImage.ts        # (typo: paralax → parallax)
│   ├── seo.ts
│   ├── seoImage.ts
│   └── portableTextConfig.ts
├── pages/                      # 8 pages
│   ├── about.ts
│   ├── contact.ts
│   ├── exemple.ts              # Template/exemple
│   ├── home.ts
│   ├── legacyPage.ts
│   ├── privatePolicyPage.ts
│   ├── schedule.ts
│   └── sectorPage.ts
├── partners.ts                 # Entité partenaires
├── prices.ts                   # Entité tarifs
├── spaces.ts                   # Entité espaces
└── testimonials.ts             # Entité témoignages
```

---

## 🧩 Composants Réutilisables (9 schémas)

**Chemin** : `sanity/schemas/components/`

### Images

#### `basicImage.ts`

Image Sanity de base avec alt text obligatoire.

```typescript
{
  name: 'basicImage',
  type: 'image',
  fields: [
    {
      name: 'alt',
      type: 'string',
      title: 'Texte alternatif',
      validation: Rule => Rule.required().error('Le texte alternatif est obligatoire')
    }
  ],
  options: {
    hotspot: true
  }
}
```

**Validation** : Alt text obligatoire (SEO + accessibilité).

---

#### `heroImage.ts`

Image pour sections Hero (haute résolution).

```typescript
{
  name: 'heroImage',
  type: 'image',
  fields: [
    {
      name: 'alt',
      type: 'string',
      validation: Rule => Rule.required()
    }
  ],
  options: {
    hotspot: true,
    metadata: ['lqip', 'blurhash', 'dimensions']
  }
}
```

**Metadata** :
- `lqip` : Low Quality Image Placeholder
- `blurhash` : Hash pour blur progressif
- `dimensions` : Largeur/hauteur/aspectRatio

---

#### `galleryImage.ts`

Image pour galeries avec label.

```typescript
{
  name: 'galleryImage',
  type: 'object',
  fields: [
    {
      name: 'image',
      type: 'heroImage'
    },
    {
      name: 'label',
      type: 'string',
      title: 'Légende'
    }
  ]
}
```

**Usage** : `react-photo-album` + `yet-another-react-lightbox`.

---

#### `paralaxImage.ts`

Image pour sections parallaxe.

```typescript
{
  name: 'paralaxImage', // ⚠️ Typo : paralax → parallax
  type: 'object',
  fields: [
    {
      name: 'image',
      type: 'heroImage'
    }
  ]
}
```

**Note** : Typo dans le nom du schéma (hérité de types).

---

#### `seoImage.ts`

Image optimisée pour Open Graph / Twitter Cards.

```typescript
{
  name: 'seoImage',
  type: 'image',
  fields: [
    {
      name: 'alt',
      type: 'string',
      validation: Rule => Rule.required()
    }
  ],
  options: {
    hotspot: true
  },
  validation: Rule => Rule.custom((image) => {
    // Recommandation 1200x630px pour OG
    if (image?.asset?.metadata?.dimensions) {
      const { width, height } = image.asset.metadata.dimensions
      if (width < 1200 || height < 630) {
        return 'Recommandation : 1200x630px minimum pour Open Graph'
      }
    }
    return true
  })
}
```

**Dimensions recommandées** : 1200x630px (Open Graph).

---

### Structure

#### `hero.ts`

Section Hero avec description et image.

```typescript
{
  name: 'hero',
  type: 'object',
  fields: [
    {
      name: 'description',
      type: 'text',
      rows: 3
    },
    {
      name: 'image',
      type: 'heroImage'
    }
  ]
}
```

**Usage** : Toutes les pages ont un `sectionHero`.

---

#### `seo.ts`

Metadata SEO (meta tags, Open Graph, Twitter).

```typescript
{
  name: 'seo',
  type: 'object',
  fields: [
    {
      name: 'metaTitle',
      type: 'string',
      validation: Rule => Rule.max(60)
    },
    {
      name: 'metaDescription',
      type: 'text',
      validation: Rule => Rule.max(160)
    },
    {
      name: 'keywords',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'shareImage',
      type: 'seoImage'
    }
  ]
}
```

**Validations** :
- `metaTitle` : Max 60 caractères (Google)
- `metaDescription` : Max 160 caractères (Google)

---

### Contenu

#### `portableTextConfig.ts`

Configuration Portable Text avec blocs personnalisés.

```typescript
{
  name: 'portableText',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'Citation', value: 'blockquote' }
      ],
      marks: {
        decorators: [
          { title: 'Gras', value: 'strong' },
          { title: 'Italique', value: 'em' },
          { title: 'Souligné', value: 'underline' }
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            fields: [
              {
                name: 'href',
                type: 'url'
              }
            ]
          }
        ]
      }
    },
    {
      type: 'blockquote' // Bloc personnalisé
    },
    {
      type: 'basicImage'
    }
  ]
}
```

**Blocs disponibles** :
- Titres : h2, h3, h4
- Styles : Gras, italique, souligné
- Citations personnalisées (blockquote avec auteur)
- Images inline
- Liens externes

---

## 📄 Pages (8 schémas)

**Chemin** : `sanity/schemas/pages/`

### `home.ts`

Page d'accueil.

```typescript
{
  name: 'homePage',
  type: 'document',
  title: 'Page d\'accueil',
  fields: [
    {
      name: 'title',
      type: 'string'
    },
    {
      name: 'sectionHero',
      type: 'object',
      fields: [
        { name: 'title', type: 'string' },
        { name: 'garderieName', type: 'string' },
        { name: 'logo', type: 'heroImage' },
        { name: 'description', type: 'text' },
        { name: 'buttonText', type: 'string' },
        { name: 'buttonLink', type: 'string' }
      ]
    },
    {
      name: 'sectionStructure',
      type: 'object',
      fields: [
        { name: 'title', type: 'string' },
        { name: 'description', type: 'text' },
        {
          name: 'linkedSectors',
          type: 'array',
          of: [{ type: 'reference', to: [{ type: 'sectorPage' }] }]
        }
      ]
    },
    {
      name: 'sectionOtherSpaces',
      type: 'object',
      fields: [
        { name: 'title', type: 'string' },
        { name: 'introductionOtherSpaces', type: 'text' },
        {
          name: 'linkedOtherSpaces',
          type: 'array',
          of: [{ type: 'reference', to: [{ type: 'space' }] }]
        }
      ]
    },
    {
      name: 'contentComplement',
      type: 'portableText'
    },
    {
      name: 'parallax',
      type: 'paralaxImage'
    },
    {
      name: 'seo',
      type: 'seo'
    }
  ]
}
```

**Sections** :
- Hero : Logo, titre, description, CTA
- Structure : Liens vers secteurs (nurserie, trotteurs, grands)
- Autres espaces : Liens vers espaces communs
- Contenu complémentaire : Portable Text
- Parallax : Image décorative
- SEO : Metadata

**Singleton** : Une seule instance possible.

---

### `about.ts`

Page À propos.

```typescript
{
  name: 'aboutPage',
  type: 'document',
  title: 'Page À propos',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'sectionHero', type: 'hero' },
    { name: 'introduction', type: 'portableText' },
    { name: 'parallaxOne', type: 'paralaxImage' },
    {
      name: 'historyCollapse',
      type: 'object',
      fields: [
        { name: 'content', type: 'portableText' },
        { name: 'historyImage', type: 'basicImage' }
      ]
    },
    { name: 'parallaxTwo', type: 'paralaxImage' },
    { name: 'pedagogy', type: 'portableText' },
    { name: 'team', type: 'portableText' },
    { name: 'values', type: 'portableText' },
    { name: 'seo', type: 'seo' }
  ]
}
```

**Sections** :
- Introduction : Présentation générale
- Histoire : Collapse avec image
- Pédagogie : Approche éducative
- Équipe : Présentation du personnel
- Valeurs : Valeurs de la garderie
- 2 parallaxes décoratifs

---

### `contact.ts`

Page Contact.

```typescript
{
  name: 'contactPage',
  type: 'document',
  title: 'Page Contact',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'sectionHero', type: 'hero' },
    {
      name: 'contactInfo',
      type: 'object',
      fields: [
        { name: 'name', type: 'string' },
        { name: 'address', type: 'string' },
        { name: 'postalCode', type: 'string' },
        { name: 'city', type: 'string' },
        { name: 'country', type: 'string' },
        { name: 'phone', type: 'string' },
        { name: 'email', type: 'string' },
        { name: 'openingHours', type: 'text' },
        { name: 'latitude', type: 'number' },
        { name: 'longitude', type: 'number' },
        { name: 'zoom', type: 'number' }
      ]
    },
    { name: 'parallax', type: 'paralaxImage' },
    { name: 'seo', type: 'seo' }
  ]
}
```

**Sections** :
- Contact Info : Adresse, téléphone, email, horaires, GPS
- Formulaire : Géré côté client (React Hook Form)
- Carte : Leaflet + OpenStreetMap (coordonnées GPS)

---

### `schedule.ts`

Page Horaires & Tarifs.

```typescript
{
  name: 'schedulePage',
  type: 'document',
  title: 'Page Horaires & Tarifs',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'sectionHero', type: 'hero' },
    { name: 'parallax', type: 'paralaxImage' },
    {
      name: 'subsidiesTable',
      type: 'object',
      fields: [
        { name: 'title', type: 'string' },
        { name: 'informationImportantSubsidies', type: 'portableText' }
      ]
    },
    { name: 'seo', type: 'seo' }
  ]
}
```

**Note** : Les tarifs (nurserie, trotteurs & grands) sont dans des documents séparés (`prices.ts`).

---

### `sectorPage.ts`

Pages secteurs (nurserie, trotteurs, grands).

```typescript
{
  name: 'sectorPage',
  type: 'document',
  title: 'Page Secteur',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'ageRange', type: 'string' },
    {
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    { name: 'sectionHero', type: 'hero' },
    { name: 'content', type: 'portableText' },
    {
      name: 'gallery',
      type: 'array',
      of: [{ type: 'galleryImage' }]
    },
    {
      name: 'linkedSpaces',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'space' }] }]
    },
    { name: 'parallax', type: 'paralaxImage' },
    { name: 'seo', type: 'seo' }
  ]
}
```

**Slug** : Auto-généré depuis `title` (ex: `/la-structure/nurserie`).

**Sections** :
- Contenu : Description du secteur
- Galerie : Photos du secteur (react-photo-album)
- Espaces liés : Références vers espaces spécifiques
- Parallax : Image décorative

---

### `legacyPage.ts`

Page Mentions Légales.

```typescript
{
  name: 'legacyPage',
  type: 'document',
  title: 'Mentions Légales',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'content', type: 'portableText' }
  ]
}
```

**Structure simple** : Titre + contenu Portable Text.

---

### `privatePolicyPage.ts`

Page Politique de Confidentialité.

```typescript
{
  name: 'privatePolicyPage',
  type: 'document',
  title: 'Politique de Confidentialité',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'content', type: 'portableText' }
  ]
}
```

**Structure simple** : Titre + contenu Portable Text.

---

### `exemple.ts`

Template pour nouvelles pages.

```typescript
{
  name: 'exemplePage',
  type: 'document',
  title: '[EXEMPLE] Nouvelle Page',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'sectionHero', type: 'hero' },
    { name: 'content', type: 'portableText' },
    { name: 'parallax', type: 'paralaxImage' },
    { name: 'seo', type: 'seo' }
  ]
}
```

**Usage** : Dupliquer pour créer de nouvelles pages.

---

## 📦 Entités de Contenu (4 schémas)

**Chemin** : `sanity/schemas/` (root)

### `spaces.ts`

Espaces de la garderie.

```typescript
{
  name: 'space',
  type: 'document',
  title: 'Espace',
  fields: [
    { name: 'title', type: 'string' },
    {
      name: 'sector',
      type: 'string',
      options: {
        list: [
          { title: 'Nurserie', value: 'nursery' },
          { title: 'Trotteurs', value: 'trotteurs' },
          { title: 'Grands', value: 'grands' },
          { title: 'Autres', value: 'other' }
        ]
      }
    },
    { name: 'image', type: 'heroImage' },
    { name: 'description', type: 'portableText' }
  ]
}
```

**Secteurs** :
- `nursery` : 0-24 mois
- `trotteurs` : 24-36 mois
- `grands` : 3-4 ans
- `other` : Espaces communs

**Usage** : Référencés dans `sectorPage` et `homePage`.

---

### `testimonials.ts`

Témoignages des parents.

```typescript
{
  name: 'testimonial',
  type: 'document',
  title: 'Témoignage',
  fields: [
    { name: 'name', type: 'string' },
    { name: 'title', type: 'string' }, // Rôle (ex: "Maman de Léa")
    { name: 'content', type: 'text' },
    {
      name: 'rating',
      type: 'number',
      validation: Rule => Rule.min(1).max(5)
    }
  ]
}
```

**Validation** : Rating entre 1 et 5 étoiles.

**Usage** : Affichés sur la page d'accueil.

---

### `partners.ts`

Partenaires de la garderie.

```typescript
{
  name: 'partner',
  type: 'document',
  title: 'Partenaire',
  fields: [
    { name: 'name', type: 'string' },
    { name: 'website', type: 'url' },
    { name: 'logo', type: 'basicImage' }
  ]
}
```

**Usage** : Affichés sur la page À propos.

---

### `prices.ts`

Tarifs de la garderie.

```typescript
{
  name: 'priceDocument',
  type: 'document',
  title: 'Tarifs',
  fields: [
    { name: 'title', type: 'string' },
    {
      name: 'prixAuMois',
      type: 'object',
      fields: [
        { name: 'label', type: 'string' },
        {
          name: 'journeeComplete',
          type: 'object',
          fields: [
            { name: 'label', type: 'string' },
            {
              name: 'items',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'description', type: 'string' },
                    { name: 'price', type: 'number' }
                  ]
                }
              ]
            }
          ]
        },
        // matinRepas, matinSansRepas, apresMidiRepas, apresMidiSansRepas...
      ]
    },
    {
      name: 'prixAuJour',
      type: 'object'
      // Structure similaire
    }
  ]
}
```

**Structure** : Tarifs au mois / au jour avec différentes options.

**Document séparé** : `subsidiesDocument` pour les subventions.

---

## 🎨 Patterns de Schémas

### 1. Singleton vs Collection

**Singleton** : Pages uniques (home, about, contact).

```typescript
__experimental_singleton: true // Sanity v4
```

**Collection** : Entités multiples (spaces, testimonials, partners).

---

### 2. Références (Relations)

**Exemple** : `homePage` référence `sectorPage`.

```typescript
{
  name: 'linkedSectors',
  type: 'array',
  of: [{ type: 'reference', to: [{ type: 'sectorPage' }] }]
}
```

**Pattern** : Relations many-to-many via références.

---

### 3. Validation

**Exemples** :

```typescript
// Alt text obligatoire
validation: Rule => Rule.required().error('Le texte alternatif est obligatoire')

// Max caractères
validation: Rule => Rule.max(60)

// Range
validation: Rule => Rule.min(1).max(5)

// URL valide
type: 'url'
```

---

### 4. Slug Auto-généré

```typescript
{
  name: 'slug',
  type: 'slug',
  options: {
    source: 'title',
    maxLength: 96
  }
}
```

**Usage** : Généré depuis `title` (ex: "Nurserie" → `/la-structure/nurserie`).

---

### 5. Options de Liste

```typescript
{
  name: 'sector',
  type: 'string',
  options: {
    list: [
      { title: 'Nurserie', value: 'nursery' },
      { title: 'Trotteurs', value: 'trotteurs' }
    ]
  }
}
```

**Pattern** : Dropdown avec valeurs prédéfinies.

---

### 6. Metadata Automatique

```typescript
options: {
  hotspot: true,
  metadata: ['lqip', 'blurhash', 'dimensions']
}
```

**Avantages** :
- `lqip` : Placeholder durant chargement
- `blurhash` : Blur progressif
- `dimensions` : Zero CLS (Cumulative Layout Shift)

---

## 📊 Statistiques

| Catégorie | Nombre | Pourcentage |
|-----------|--------|-------------|
| **Pages** | 8 | 36% |
| **Composants** | 9 | 41% |
| **Entités** | 4 | 18% |
| **Config** | 1 | 5% |
| **Total** | **22** | **100%** |

---

## 🔗 Configuration

**Fichier** : `sanity/schemas/index.ts`

```typescript
import { type SchemaTypeDefinition } from 'sanity'

// Import composants
import basicImage from './components/basicImage'
import hero from './components/hero'
// ... tous les composants

// Import pages
import homePage from './pages/home'
import aboutPage from './pages/about'
// ... toutes les pages

// Import entités
import space from './spaces'
import testimonial from './testimonials'
import partner from './partners'
import priceDocument from './prices'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Composants
    basicImage,
    hero,
    heroImage,
    galleryImage,
    paralaxImage,
    seo,
    seoImage,
    portableTextConfig,

    // Pages
    homePage,
    aboutPage,
    contactPage,
    schedulePage,
    sectorPage,
    legacyPage,
    privatePolicyPage,
    exemplePage,

    // Entités
    space,
    testimonial,
    partner,
    priceDocument
  ]
}
```

---

## 📚 Références

- **Sanity v4 Docs** : https://www.sanity.io/docs
- **Portable Text** : https://www.sanity.io/docs/presenting-block-text
- **Image Pipeline** : https://www.sanity.io/docs/image-type
- **Validation** : https://www.sanity.io/docs/validation

---

**Dernière mise à jour** : 2025-12-03
**Version Sanity** : v4.6.1
**Nombre de schémas** : 22
