# Sanity - Queries GROQ

## 📊 Vue d'ensemble

**11 fichiers de queries GROQ** organisés par page et entité, avec système de cache Next.js et React Cache.

**Pattern** : 1 query = 1 page, populate toutes les relations en 1 requête.

---

## 📁 Organisation des queries

### Structure

```
sanity/queries/
├── index.ts              # Barrel export
├── shared.ts             # Queries partagées (React Cache)
├── home.ts               # Page d'accueil + témoignages
├── about.ts              # Page À propos
├── contact.ts            # Page Contact
├── schedule.ts           # Page Horaires & Tarifs
├── sectors.ts            # Pages secteurs (dynamiques)
├── legacyPage.ts         # Mentions légales
├── privatePolicyPage.ts  # Politique de confidentialité
├── partners.ts           # Partenaires
└── prices.ts             # Tarifs
```

---

## 🔄 Queries Partagées (React Cache)

**Fichier** : `sanity/queries/shared.ts`

### Query Unifiée Layout

Query combinée pour Footer + Partners (utilisés sur toutes les pages).

```groq
LAYOUT_DATA_QUERY = groq`
{
  "footer": *[_type == "contactPage" && _id == "contactPage"][0] {
    contactInfo {
      name,
      description,
      address,
      postalCode,
      city,
      country,
      phone,
      email,
      openingHours
    }
  },
  "partners": *[_type == "partners"] | order(_createdAt desc) {
    _id,
    name,
    website,
    logo ${BASIC_IMAGE_QUERY_LIGHT}
  }
}
`
```

**Avantages** :
- **1 requête au lieu de 2** (réduction latence)
- **React Cache** : Déduplication automatique
- **Tag unifié** : `layout-data` pour revalidation

### Fonction avec React Cache

```typescript
import { cache } from 'react'

export const getLayoutData = cache(fetchLayoutData)

// Deprecated (compatibilité)
export const getFooterData = cache(async () => {
  const data = await getLayoutData()
  return { contactInfo: data.footer.contactInfo }
})

export const getPartners = cache(async () => {
  const data = await getLayoutData()
  return data.partners
})
```

**Usage** :
```typescript
// ✅ Recommandé
const { footer, partners } = await getLayoutData()

// ⚠️ Deprecated mais fonctionnel
const footer = await getFooterData()
const partners = await getPartners()
```

---

## 📄 Queries de Pages

### `home.ts` - Page d'Accueil

**Query principale** :

```groq
HOME_QUERY = groq`
  *[_type == "home" && _id == "home"][0] {
    // Hero
    sectionHero {
      title,
      garderieName,
      logo ${BASIC_IMAGE_QUERY_LIGHT},
      description,
      buttonText,
      buttonLink
    },

    // Section Structure (avec populate des secteurs liés)
    sectionStructure {
      title,
      description,
      "linkedSectors": linkedSectors[0...5]-> {
        _id,
        title,
        ageRange,
        "slug": devConfig.slug.current,
        sectionHero {
          description
        }
      }
    },

    // Section Autres Espaces (avec populate des espaces liés)
    sectionOtherSpaces {
      title,
      introductionOtherSpaces,
      "linkedOtherSpaces": linkedOtherSpaces[0...3]-> {
        _id,
        title,
        image ${BASIC_IMAGE_QUERY_LIGHT},
        description
      }
    },

    // Contenu complémentaire
    contentComplement,

    // Parallax
    parallax {
      image ${BASIC_IMAGE_QUERY_LIGHT}
    },

    // SEO
    seo {
      metaTitle,
      metaDescription,
      keywords,
      shareImage ${BASIC_IMAGE_QUERY_LIGHT}
    }
  }
`
```

**Query témoignages** :

```groq
TESTIMONIALS_QUERY = groq`
  *[_type == "testimonials"] | order(_createdAt desc) {
    _id,
    title,
    information,
    signature
  }
`
```

**Fonctions** :
```typescript
export async function fetchHome(): Promise<HomePageData> {
  return sanityFetch<HomePageData>(HOME_QUERY, {}, { tag: 'home-page' })
}

export async function fetchTestimonials() {
  return sanityFetch<Testimonial[]>(TESTIMONIALS_QUERY, {}, { tag: 'testimonials' })
}
```

**Pattern** : 1 requête populate toutes les relations (`linkedSectors->`, `linkedOtherSpaces->`).

---

### `about.ts` - Page À Propos

```groq
ABOUT_QUERY = groq`
  *[_type == "aboutPage" && _id == "aboutPage"][0] {
    title,
    sectionHero {
      description,
      image ${BASIC_IMAGE_QUERY_LIGHT}
    },
    introduction,
    parallaxOne {
      image ${BASIC_IMAGE_QUERY_LIGHT}
    },
    historyCollapse {
      content,
      historyImage {
        "url": asset->url,
        alt,
        "width": asset->metadata.dimensions.width,
        "height": asset->metadata.dimensions.height
      }
    },
    parallaxTwo {
      image ${BASIC_IMAGE_QUERY_LIGHT}
    },
    pedagogy,
    team,
    values,
    seo {
      metaTitle,
      metaDescription,
      keywords,
      shareImage ${BASIC_IMAGE_QUERY_LIGHT}
    }
  }
`
```

**Fonction** :
```typescript
export async function fetchAbout(): Promise<AboutPageData> {
  return sanityFetch<AboutPageData>(ABOUT_QUERY, {}, { tag: 'about-page' })
}
```

---

### `contact.ts` - Page Contact

```groq
CONTACT_QUERY = groq`
  *[_type == "contactPage" && _id == "contactPage"][0] {
    title,
    sectionHero {
      description,
      image ${BASIC_IMAGE_QUERY_LIGHT}
    },
    contactInfo {
      name,
      address,
      postalCode,
      city,
      country,
      phone,
      email,
      openingHours,
      latitude,
      longitude,
      zoom
    },
    parallax {
      image ${BASIC_IMAGE_QUERY_LIGHT}
    },
    seo {
      metaTitle,
      metaDescription,
      keywords,
      shareImage ${BASIC_IMAGE_QUERY_LIGHT}
    }
  }
`
```

**Fonction** :
```typescript
export async function fetchContact(): Promise<ContactPageData> {
  return sanityFetch<ContactPageData>(CONTACT_QUERY, {}, { tag: 'contact-page' })
}
```

**Usage** : Coordonnées GPS pour carte Leaflet.

---

### `schedule.ts` - Page Horaires & Tarifs

```groq
SCHEDULE_QUERY = groq`
  *[_type == "schedulePage" && _id == "schedulePage"][0] {
    title,
    sectionHero {
      description,
      image ${BASIC_IMAGE_QUERY_LIGHT}
    },
    parallax {
      image ${BASIC_IMAGE_QUERY_LIGHT}
    },
    subsidiesTable {
      title,
      informationImportantSubsidies
    },
    seo {
      metaTitle,
      metaDescription,
      keywords,
      shareImage ${BASIC_IMAGE_QUERY_LIGHT}
    }
  }
`
```

**Fonction** :
```typescript
export async function fetchSchedule(): Promise<SchedulePageData> {
  return sanityFetch<SchedulePageData>(SCHEDULE_QUERY, {}, { tag: 'schedule-page' })
}
```

**Note** : Tarifs (nurserie, trotteurs & grands) récupérés via `prices.ts`.

---

### `sectors.ts` - Pages Secteurs (Dynamiques)

**Query principale** :

```groq
SECTOR_PAGE_QUERY = groq`
  *[_type == "sectorPage" && devConfig.slug.current == $slug][0] {
    _id,
    title,
    "slug": devConfig.slug.current,
    sectionHero {
      description,
      image ${BASIC_IMAGE_QUERY_LIGHT}
    },
    content,
    gallery[] {
      image ${BASIC_IMAGE_QUERY_LIGHT},
      label
    },
    "linkedSpaces": linkedSpaces[]-> {
      _id,
      title,
      description,
      image ${BASIC_IMAGE_QUERY_LIGHT}
    },
    parallax {
      image ${BASIC_IMAGE_QUERY_LIGHT}
    },
    seo {
      metaTitle,
      metaDescription,
      keywords,
      shareImage ${BASIC_IMAGE_QUERY_LIGHT}
    }
  }
`
```

**Fonction** :
```typescript
export async function fetchSectorPage(slug: string): Promise<SectorPageData> {
  return sanityFetch<SectorPageData>(
    SECTOR_PAGE_QUERY,
    { slug },
    { tag: `sector-${slug}` }
  )
}
```

**Query génération de routes** :

```groq
SECTOR_SLUGS_QUERY = groq`
  *[_type == "sectorPage" && defined(devConfig.slug.current)] {
    "slug": devConfig.slug.current
  }
`
```

**Fonction** :
```typescript
export async function fetchSectorSlugs(): Promise<Array<{ slug: string }>> {
  return sanityFetch<Array<{ slug: string }>>(
    SECTOR_SLUGS_QUERY,
    {},
    { tag: 'sector-slugs' }
  )
}
```

**Usage Next.js** :
```typescript
// app/la-structure/[slug]/page.tsx
export async function generateStaticParams() {
  const slugs = await fetchSectorSlugs()
  return slugs.map(({ slug }) => ({ slug }))
}
```

---

### `legacyPage.ts` - Mentions Légales

```groq
LEGACY_PAGE_QUERY = groq`
  *[_type == "legacyPage" && _id == "legacyPage"][0] {
    title,
    content
  }
`
```

**Fonction** :
```typescript
export async function fetchLegacyPage(): Promise<LegalPageData> {
  return sanityFetch<LegalPageData>(LEGACY_PAGE_QUERY, {}, { tag: 'legacy-page' })
}
```

---

### `privatePolicyPage.ts` - Politique de Confidentialité

```groq
PRIVATE_POLICY_QUERY = groq`
  *[_type == "privatePolicyPage" && _id == "privatePolicyPage"][0] {
    title,
    content
  }
`
```

**Fonction** :
```typescript
export async function fetchPrivatePolicyPage(): Promise<LegalPageData> {
  return sanityFetch<LegalPageData>(PRIVATE_POLICY_QUERY, {}, { tag: 'private-policy-page' })
}
```

---

## 📦 Queries d'Entités

### `partners.ts` - Partenaires

```groq
PARTNERS_QUERY = groq`
  *[_type == "partners"] | order(_createdAt desc) {
    _id,
    name,
    website,
    logo ${BASIC_IMAGE_QUERY_LIGHT}
  }
`
```

**Fonction** :
```typescript
export async function fetchPartners(): Promise<Partner[]> {
  return sanityFetch<Partner[]>(PARTNERS_QUERY, {}, { tag: 'partners' })
}
```

**Note** : Également disponible via `shared.ts` → `getLayoutData()`.

---

### `prices.ts` - Tarifs

**Query tarifs** :

```groq
PRICES_QUERY = groq`
  *[_type == "priceDocument"] | order(_createdAt desc) {
    _id,
    title,
    prixAuMois {
      label,
      journeeComplete {
        label,
        items[] {
          description,
          price
        }
      },
      matinRepas {
        label,
        items[] {
          description,
          price
        }
      },
      // ... autres options
    },
    prixAuJour {
      // Structure similaire
    }
  }
`
```

**Query subventions** :

```groq
SUBSIDIES_QUERY = groq`
  *[_type == "subsidiesDocument"][0] {
    _id,
    title,
    labelIncomeRange,
    labelReduction,
    items[] {
      incomeRange,
      reductionDaily
    }
  }
`
```

**Fonctions** :
```typescript
export async function fetchPrices(): Promise<PriceDocument[]> {
  return sanityFetch<PriceDocument[]>(PRICES_QUERY, {}, { tag: 'prices' })
}

export async function fetchSubsidies(): Promise<SubsidiesDocument> {
  return sanityFetch<SubsidiesDocument>(SUBSIDIES_QUERY, {}, { tag: 'subsidies' })
}
```

---

## 🎨 Patterns GROQ

### 1. Projection

Sélectionner uniquement les champs nécessaires.

```groq
*[_type == "partner"] {
  _id,
  name,
  website
}
```

**Avantages** :
- Réduit la taille de réponse
- Performance optimale
- Type-safe avec TypeScript

---

### 2. Populate Relations

Résoudre les références en 1 requête.

```groq
"linkedSectors": linkedSectors[0...5]-> {
  _id,
  title,
  ageRange
}
```

**Pattern** : `reference->` resolve la référence.

**Limitation** : `[0...5]` limite à 5 résultats.

---

### 3. Filtres

```groq
*[_type == "sectorPage" && devConfig.slug.current == $slug][0]
```

**Patterns** :
- `_type == "x"` : Filter par type
- `_id == "x"` : Document unique (singleton)
- `$slug` : Paramètre dynamique
- `[0]` : Premier résultat uniquement

---

### 4. Tri

```groq
*[_type == "testimonials"] | order(_createdAt desc)
```

**Patterns** :
- `order(_createdAt desc)` : Plus récent d'abord
- `order(name asc)` : Alphabétique croissant

---

### 5. Fragments Réutilisables

**Fichier** : `sanity/helpers/imageProps.ts`

```typescript
export const BASIC_IMAGE_QUERY_LIGHT = groq`{
  alt,
  "url": asset->url,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height,
  "lqip": asset->metadata.lqip,
  "blurhash": asset->metadata.blurhash
}`
```

**Usage** :
```groq
logo ${BASIC_IMAGE_QUERY_LIGHT}
```

**Expansion** :
```groq
logo {
  alt,
  "url": asset->url,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height,
  "lqip": asset->metadata.lqip,
  "blurhash": asset->metadata.blurhash
}
```

**Avantages** :
- DRY (Don't Repeat Yourself)
- Maintainability
- Consistency

---

### 6. Objets Imbriqués

```groq
{
  "footer": *[_type == "contactPage"][0].contactInfo,
  "partners": *[_type == "partners"]
}
```

**Pattern** : Query unique retournant un objet avec plusieurs propriétés.

---

## 🔄 Cache & Revalidation

### Tags Next.js

Chaque query a un **tag unique** pour revalidation granulaire.

```typescript
sanityFetch(HOME_QUERY, {}, { tag: 'home-page' })
```

**Tags utilisés** :
- `home-page`
- `about-page`
- `contact-page`
- `schedule-page`
- `sector-${slug}` (dynamique)
- `sector-slugs`
- `legacy-page`
- `private-policy-page`
- `partners`
- `prices`
- `subsidies`
- `testimonials`
- `layout-data`

### Revalidation

**Webhook Sanity** → **Next.js API Route** → `revalidateTag(tag)`

```typescript
// app/api/revalidate/route.ts
export async function POST(request: Request) {
  const { tag } = await request.json()
  revalidateTag(tag)
  return Response.json({ revalidated: true })
}
```

**Exemple** : Modifier un secteur dans Sanity → Webhook → `revalidateTag('sector-nurserie')`.

---

### React Cache

**Pattern** : Déduplication pendant un seul rendu.

```typescript
import { cache } from 'react'

export const getLayoutData = cache(fetchLayoutData)
```

**Avantages** :
- Footer + Partners appelés dans `layout.tsx` → 1 seule requête Sanity
- Partage entre Server Components pendant le rendu
- Automatique, pas de configuration

---

## 📊 Statistiques

| Catégorie | Fichiers | Pourcentage |
|-----------|----------|-------------|
| **Pages** | 7 | 64% |
| **Entités** | 2 | 18% |
| **Partagées** | 1 | 9% |
| **Config** | 1 | 9% |
| **Total** | **11** | **100%** |

---

## 🚀 Performance

### Requêtes Optimisées

**Avant** (N+1 queries) :
```typescript
const home = await fetchHome()
const sectors = await Promise.all(
  home.linkedSectors.map(ref => fetchSector(ref._id))
)
```

**Après** (1 query avec populate) :
```typescript
const home = await fetchHome() // Secteurs déjà inclus
```

**Gain** : 1 requête au lieu de 4+.

---

### Image Optimization

**BASIC_IMAGE_QUERY_LIGHT** inclut :
- `lqip` : Placeholder durant chargement
- `blurhash` : Blur progressif
- `dimensions` : Zero CLS

**Résultat** : Core Web Vitals optimisés (LCP < 2.5s, CLS < 0.1).

---

## 📚 Références

- **GROQ Docs** : https://www.sanity.io/docs/groq
- **Next.js Cache** : https://nextjs.org/docs/app/building-your-application/caching
- **React Cache** : https://react.dev/reference/react/cache
- **Sanity Image Pipeline** : https://www.sanity.io/docs/image-urls

---

## 💡 Best Practices

### 1. Une Query par Page

**✅ Recommandé** :
```typescript
// home.ts
export const HOME_QUERY = groq`...` // Tout en 1 requête
```

**❌ Éviter** :
```typescript
const hero = await fetchHomeHero()
const sectors = await fetchHomeSectors()
const spaces = await fetchHomeSpaces()
```

---

### 2. Populate Relations

**✅ Recommandé** :
```groq
"linkedSectors": linkedSectors[]-> { _id, title }
```

**❌ Éviter** :
```groq
"linkedSectorIds": linkedSectors[]._ref
// Puis fetch chaque ID séparément
```

---

### 3. Projection Minimale

**✅ Recommandé** :
```groq
*[_type == "partner"] { _id, name, website }
```

**❌ Éviter** :
```groq
*[_type == "partner"] // Retourne TOUT (lourd)
```

---

### 4. React Cache pour Layout

**✅ Recommandé** :
```typescript
export const getLayoutData = cache(fetchLayoutData)
```

**Avantages** :
- Déduplication automatique
- Footer + Partners = 1 requête
- Partage entre composants

---

### 5. Tags Granulaires

**✅ Recommandé** :
```typescript
{ tag: 'sector-nurserie' } // Revalidation spécifique
```

**❌ Éviter** :
```typescript
{ tag: 'all-pages' } // Revalide TOUT (inefficace)
```

---

**Dernière mise à jour** : 2025-12-03
**Version Sanity** : v4.6.1
**Nombre de queries** : 11
