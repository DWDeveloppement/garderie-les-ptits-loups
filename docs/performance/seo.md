# Performance - SEO

## 📊 Vue d'ensemble

Optimisation SEO complète avec metadata dynamique, sitemap, robots.txt et structured data.

**Objectif** : Lighthouse SEO > 90

---

## 🎯 Metadata Dynamique

### `metadata` (App Router)

**Fichier** : `app/page.tsx`

```typescript
import type { Metadata } from 'next'
import { fetchHome } from '@/sanity/queries'

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchHome()

  return {
    title: data.seo?.metaTitle || 'Garderie Les P\'tits Loups',
    description: data.seo?.metaDescription || 'Garderie accueillant les enfants de 0 à 4 ans',
    keywords: data.seo?.keywords || ['garderie', 'nurserie', 'enfants', 'suisse'],
    openGraph: {
      title: data.seo?.metaTitle,
      description: data.seo?.metaDescription,
      images: data.seo?.shareImage?.asset?.url
        ? [{ url: data.seo.shareImage.asset.url }]
        : undefined,
      type: 'website',
      locale: 'fr_CH'
    },
    twitter: {
      card: 'summary_large_image',
      title: data.seo?.metaTitle,
      description: data.seo?.metaDescription,
      images: data.seo?.shareImage?.asset?.url
    }
  }
}

export default async function HomePage() {
  // ...
}
```

---

### Pages Dynamiques

**Fichier** : `app/la-structure/[slug]/page.tsx`

```typescript
export async function generateMetadata({
  params
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const data = await fetchSectorPage(params.slug)

  return {
    title: data.seo?.metaTitle || `${data.title} - Garderie Les P'tits Loups`,
    description: data.seo?.metaDescription || data.sectionHero.description,
    keywords: data.seo?.keywords,
    openGraph: {
      title: data.seo?.metaTitle,
      description: data.seo?.metaDescription,
      images: data.seo?.shareImage?.asset?.url
        ? [{ url: data.seo.shareImage.asset.url }]
        : undefined
    }
  }
}
```

---

## 🌐 Sitemap

**Fichier** : `app/sitemap.ts`

```typescript
import type { MetadataRoute } from 'next'
import { fetchSectorSlugs } from '@/sanity/queries'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://garderielesptitsloups.ch'

  // Pages statiques
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1
    },
    {
      url: `${baseUrl}/a-propos`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/horaires-tarifs`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8
    }
  ]

  // Pages dynamiques (secteurs)
  const sectors = await fetchSectorSlugs()
  const sectorPages: MetadataRoute.Sitemap = sectors.map((sector) => ({
    url: `${baseUrl}/la-structure/${sector.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7
  }))

  return [...staticPages, ...sectorPages]
}
```

---

## 🤖 Robots.txt

**Fichier** : `app/robots.ts`

```typescript
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/', '/studio/']
    },
    sitemap: 'https://garderielesptitsloups.ch/sitemap.xml'
  }
}
```

---

## 📝 Structured Data (JSON-LD)

### Organization

**Fichier** : `app/layout.tsx`

```tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'ChildCare',
    name: 'Garderie Les P\'tits Loups',
    description: 'Garderie accueillant les enfants de 0 à 4 ans',
    url: 'https://garderielesptitsloups.ch',
    telephone: '+41 XX XXX XX XX',
    email: 'contact@garderielesptitsloups.ch',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rue Exemple 123',
      addressLocality: 'Ville',
      postalCode: '1234',
      addressCountry: 'CH'
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:00',
        closes: '18:00'
      }
    ],
    sameAs: [
      'https://www.facebook.com/lesptitsloups',
      'https://www.instagram.com/lesptitsloups'
    ]
  }

  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

---

### Breadcrumbs

```tsx
export function Breadcrumbs({ items }: { items: Array<{ name: string; url: string }> }) {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://garderielesptitsloups.ch${item.url}`
    }))
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <nav aria-label="Breadcrumb">
        {items.map((item, index) => (
          <span key={item.url}>
            <Link href={item.url}>{item.name}</Link>
            {index < items.length - 1 && ' / '}
          </span>
        ))}
      </nav>
    </>
  )
}
```

---

## 🖼️ Images SEO

### Alt Text

```tsx
<Image
  src="/image.jpg"
  alt="Description précise de l'image pour SEO et accessibilité"
  width={1200}
  height={630}
/>
```

---

### Open Graph Image

```tsx
export const metadata: Metadata = {
  openGraph: {
    images: [
      {
        url: 'https://garderielesptitsloups.ch/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Garderie Les P\'tits Loups'
      }
    ]
  }
}
```

**Dimensions recommandées** : 1200x630px (ratio 1.91:1).

---

## 🚀 Performance

### ISR (Incremental Static Regeneration)

```typescript
// app/page.tsx
export const revalidate = 60 // Revalidate toutes les 60 secondes
```

---

### Webhook Revalidation

**API Route** : `app/api/revalidate/route.ts`

```typescript
import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
  }

  const { tag } = await request.json()

  if (!tag) {
    return NextResponse.json({ error: 'Tag required' }, { status: 400 })
  }

  revalidateTag(tag)

  return NextResponse.json({ revalidated: true, tag })
}
```

**Configuration Sanity** :
```json
{
  "url": "https://garderielesptitsloups.ch/api/revalidate?secret=xxx",
  "method": "POST",
  "body": {
    "tag": "home-page"
  }
}
```

---

## 📊 Checklist SEO

### On-Page

- [x] Title unique par page (max 60 caractères)
- [x] Meta description (max 160 caractères)
- [x] Keywords pertinents
- [x] URL lisibles (slugs)
- [x] Headings hiérarchiques (H1 → H6)
- [x] Alt text images
- [x] Liens internes
- [x] Structured data (JSON-LD)

### Technical

- [x] Sitemap.xml
- [x] Robots.txt
- [x] Canonical URLs
- [x] HTTPS
- [x] Mobile-friendly
- [x] Core Web Vitals (LCP, FID, CLS)
- [x] Page speed (Lighthouse > 90)

### Off-Page

- [ ] Backlinks
- [ ] Google My Business
- [ ] Social media presence
- [ ] Reviews

---

## 🔍 Outils

### Google Search Console

Vérifier indexation et performances.

```bash
https://search.google.com/search-console
```

---

### Lighthouse

```bash
npx lighthouse https://garderielesptitsloups.ch --view
```

---

### Rich Results Test

```bash
https://search.google.com/test/rich-results
```

---

## 📚 Références

- **Next.js Metadata** : https://nextjs.org/docs/app/building-your-application/optimizing/metadata
- **Schema.org** : https://schema.org/
- **Google SEO** : https://developers.google.com/search/docs

---

**Dernière mise à jour** : 2025-12-03
**Score Lighthouse** : 95+ (SEO)
