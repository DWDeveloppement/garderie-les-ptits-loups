# 🎯 Guide SEO - Garderie Les P'tits Loups

## 📋 Vue d'Ensemble

Stratégies et bonnes pratiques SEO pour optimiser le référencement du site de la garderie sur Google et les moteurs de recherche.

---

## 🏗️ Architecture SEO

### Pages Optimisées

| Page | URL | Titre SEO | Meta Description |
|------|-----|-----------|------------------|
| **Accueil** | `/` | Garderie Les P'tits Loups - Accueil enfants 0-4 ans | Garderie privée accueillant des enfants de 2 mois à 4 ans. Équipe qualifiée, activités adaptées. |
| **À Propos** | `/a-propos` | Notre Histoire & Pédagogie - Les P'tits Loups | Découvrez l'histoire et les valeurs pédagogiques de notre garderie depuis 2006. |
| **Contact** | `/contact` | Nous Contacter - Les P'tits Loups | Contactez-nous pour une visite ou des informations. Formulaire en ligne, téléphone, email. |
| **Tarifs** | `/tarifs` | Horaires & Tarifs - Les P'tits Loups | Tarifs mensuels et journaliers. Subventions communales disponibles. |
| **Nurserie** | `/la-structure/nurserie` | Nurserie (0-24 mois) - Les P'tits Loups | Espace dédié aux bébés de 0 à 24 mois avec équipe spécialisée. |
| **Trotteurs** | `/la-structure/trotteurs` | Trotteurs (24-36 mois) - Les P'tits Loups | Section pour enfants de 24 à 36 mois. Activités d'éveil et autonomie. |
| **Grands** | `/la-structure/grands` | Grands (3-4 ans) - Les P'tits Loups | Groupe des 3-4 ans. Préparation à l'école et socialisation. |

---

## 🖼️ SEO des Images

### Composant SEO Sanity

```typescript
// sanity/schemas/components/seo.ts
export const seo = {
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    {
      name: 'metaTitle',
      title: 'Titre Meta',
      type: 'string',
      validation: (Rule) => Rule.max(60),
      description: 'Titre affiché dans les résultats Google (max 60 caractères)',
    },
    {
      name: 'metaDescription',
      title: 'Description Meta',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(160),
      description: 'Description affichée dans Google (max 160 caractères)',
    },
    {
      name: 'keywords',
      title: 'Mots-clés',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Mots-clés principaux pour le référencement',
    },
    {
      name: 'shareImage',
      title: 'Image de partage (Open Graph + Twitter)',
      type: 'basicImage',
      description: 'Image 1200x630px pour partages Facebook, LinkedIn, Twitter',
    },
  ],
}
```

### Images Alt Text (Obligatoire)

Toutes les images utilisent `basicImage` avec alt text obligatoire :

```typescript
// Validation stricte
validation: (Rule) => Rule.required().max(125)
  .error('Le texte alternatif est obligatoire pour SEO et accessibilité')
```

**Bonnes pratiques :**
- ✅ Alt text descriptif (<125 caractères)
- ✅ Pas de "image de..." ou "photo de..."
- ✅ Décrire le contenu de l'image
- ✅ Contexte pertinent pour la page

**Exemples :**
```typescript
// ❌ Mauvais
alt: "Image de la garderie"

// ✅ Bon
alt: "Enfants jouant dans la salle de jeux colorée"

// ✅ Excellent
alt: "Groupe de trotteurs construisant une tour en blocs géants"
```

---

## 📱 Open Graph & Twitter Cards

### Configuration Automatique

```typescript
// lib/sanity/helpers/imageProps.ts
export function getSeoShareImageProps(image: SanityBasicImage) {
  const baseProps = getBasicImageProps(image)
  
  return {
    openGraph: {
      ...baseProps,
      width: 1200,
      height: 630, // Format recommandé Facebook, LinkedIn
    },
    twitter: {
      ...baseProps,
      width: 1200,
      height: 630, // Format summary_large_image
    },
  }
}
```

### Meta Tags Générés

```tsx
// app/[page]/page.tsx
export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchPage()
  const shareImageProps = getSeoShareImageProps(data.seo.shareImage)
  
  return {
    title: data.seo.metaTitle,
    description: data.seo.metaDescription,
    keywords: data.seo.keywords,
    openGraph: {
      title: data.seo.metaTitle,
      description: data.seo.metaDescription,
      images: [
        {
          url: shareImageProps.openGraph.src,
          width: shareImageProps.openGraph.width,
          height: shareImageProps.openGraph.height,
          alt: shareImageProps.openGraph.alt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: data.seo.metaTitle,
      description: data.seo.metaDescription,
      images: [shareImageProps.twitter.src],
    },
  }
}
```

---

## 🗺️ Schema.org Structured Data

### LocalBusiness Schema

```typescript
// components/StructuredData.tsx
export function LocalBusinessSchema({ contactInfo }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ChildCare',
    name: "Garderie Les P'tits Loups",
    description: 'Garderie privée accueillant des enfants de 2 mois à 4 ans',
    url: 'https://garderie-les-ptits-loups.ch',
    telephone: contactInfo.phone,
    email: contactInfo.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: contactInfo.address,
      postalCode: contactInfo.postalCode,
      addressLocality: contactInfo.city,
      addressCountry: contactInfo.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: contactInfo.latitude,
      longitude: contactInfo.longitude,
    },
    openingHoursSpecification: contactInfo.openingHours.map(schedule => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: schedule.days,
      opens: schedule.opens,
      closes: schedule.closes,
    })),
    priceRange: '$$',
    image: 'https://garderie-les-ptits-loups.ch/og-image.jpg',
  }
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

---

## 🔍 Mots-Clés Stratégiques

### Mots-Clés Principaux

**Génériques :**
- garderie
- crèche
- garde d'enfants
- structure d'accueil

**Locaux :**
- garderie [ville]
- crèche [ville]
- garderie privée [canton]

**Spécifiques :**
- garderie 0-4 ans
- nurserie bébés
- garderie trotteurs
- accueil périscolaire

### Longue Traîne

- garderie privée pour bébés de 2 mois
- crèche avec subventions communales
- structure d'accueil avec équipe qualifiée
- garderie avec pédagogie active
- horaires garderie flexibles

---

## 📊 Optimisations Techniques

### 1. Balises Meta

```tsx
// app/layout.tsx
export const metadata: Metadata = {
  title: {
    default: "Garderie Les P'tits Loups",
    template: "%s | Les P'tits Loups"
  },
  description: "Garderie privée accueillant des enfants de 2 mois à 4 ans",
  keywords: [
    'garderie',
    'crèche',
    'garde d\'enfants',
    'nurserie',
    'trotteurs',
    'structure d\'accueil'
  ],
  authors: [{ name: 'Garderie Les P\'tits Loups' }],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://garderie-les-ptits-loups.ch',
  },
}
```

### 2. Sitemap XML

```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://garderie-les-ptits-loups.ch'
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/a-propos`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tarifs`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/la-structure/nurserie`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/la-structure/trotteurs`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/la-structure/grands`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]
}
```

### 3. Robots.txt

```typescript
// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/sanity/'],
    },
    sitemap: 'https://garderie-les-ptits-loups.ch/sitemap.xml',
  }
}
```

### 4. Canonical URLs

```tsx
// Chaque page définit son URL canonique
export async function generateMetadata(): Promise<Metadata> {
  return {
    alternates: {
      canonical: 'https://garderie-les-ptits-loups.ch/a-propos',
    },
  }
}
```

---

## 📝 Contenu SEO

### Titres H1-H6

**Hiérarchie stricte :**
```html
<h1>Titre principal (1 seul par page)</h1>
<h2>Section principale</h2>
<h3>Sous-section</h3>
<h4>Détails</h4>
```

**Bonnes pratiques :**
- ✅ 1 seul H1 par page
- ✅ Hiérarchie logique (H2 après H1, H3 après H2)
- ✅ Mots-clés dans les titres
- ✅ Titres descriptifs et courts

### Rich Text SEO-Friendly

```typescript
// Sanity Rich Text avec headings
{
  name: 'content',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
        ],
      },
    },
  ],
}
```

---

## 🚀 Performance SEO

### Core Web Vitals

| Métrique | Cible | Impact SEO |
|----------|-------|------------|
| **LCP** | <2.5s | ⭐⭐⭐ Élevé |
| **FID** | <100ms | ⭐⭐ Moyen |
| **CLS** | <0.1 | ⭐⭐⭐ Élevé |

### Optimisations Implémentées

```typescript
// 1. Images avec LQIP (Zero CLS)
<Image
  src={imageUrl}
  alt={alt}
  blurDataURL={lqip}
  placeholder="blur"
/>

// 2. Preconnect CDN
<link rel="preconnect" href="https://cdn.sanity.io" />

// 3. Priority images (Hero)
<Image priority={true} loading="eager" />

// 4. Lazy loading (Gallery)
<Image priority={false} loading="lazy" />
```

---

## 📱 Mobile-First SEO

### Mobile Friendliness

```tsx
// Responsive design avec Tailwind
<div className="px-4 md:px-8 lg:px-16">
  <h1 className="text-2xl md:text-3xl lg:text-4xl">
    {title}
  </h1>
</div>

// Navigation mobile optimisée
<MobileNavigation />
```

### Page Speed Mobile

**Cibles :**
- Mobile Score: 90+
- Desktop Score: 95+
- TTI Mobile: <3.5s
- TTI Desktop: <2.0s

---

## 🔗 Linking Strategy

### Liens Internes

**Structure de navigation :**
```
Accueil
├── À Propos (breadcrumb)
├── Contact (breadcrumb)
├── Tarifs (breadcrumb)
└── La Structure
    ├── Nurserie (breadcrumb)
    ├── Trotteurs (breadcrumb)
    └── Grands (breadcrumb)
```

**Implémentation :**
```tsx
// components/Breadcrumb.tsx
<nav aria-label="Fil d'Ariane">
  <ol className="flex gap-2">
    <li><Link href="/">Accueil</Link></li>
    <li>/</li>
    <li><Link href="/la-structure">La Structure</Link></li>
    <li>/</li>
    <li aria-current="page">Nurserie</li>
  </ol>
</nav>
```

### Liens Externes

- ✅ Attribut `rel="noopener noreferrer"` pour liens externes
- ✅ Liens vers autorités (administrations, certificats)
- ✅ Éviter les liens cassés

---

## 🎯 Stratégie Locale (Local SEO)

### Google My Business

**Informations à compléter :**
- ✅ Nom : Garderie Les P'tits Loups
- ✅ Catégorie : Garderie / Crèche
- ✅ Adresse complète
- ✅ Téléphone
- ✅ Horaires d'ouverture
- ✅ Photos de la structure
- ✅ Avis clients

### Citations Locales

**Annuaires à référencer :**
- Google My Business
- local.ch
- search.ch
- PagesJaunes.ch
- Annuaire des garderies du canton

---

## 📊 Monitoring SEO

### Outils Recommandés

**Gratuits :**
- [Google Search Console](https://search.google.com/search-console)
- [Google Analytics 4](https://analytics.google.com/)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Lighthouse](https://developer.chrome.com/docs/lighthouse/)

**Payants (optionnels) :**
- SEMrush
- Ahrefs
- Moz Pro

### KPIs à Suivre

| Métrique | Objectif | Fréquence |
|----------|----------|-----------|
| **Position moyenne** | Top 3 (mots-clés principaux) | Hebdomadaire |
| **Impressions** | +20%/mois | Mensuelle |
| **Clics** | +15%/mois | Mensuelle |
| **CTR** | >5% | Mensuelle |
| **Core Web Vitals** | Tous "Bon" | Mensuelle |

---

## 🔧 Checklist SEO

### On-Page SEO

```bash
✅ Technique
  ✓ Titres H1 uniques par page
  ✓ Meta descriptions <160 caractères
  ✓ Alt text sur toutes les images
  ✓ URLs propres et descriptives
  ✓ Sitemap XML généré
  ✓ Robots.txt configuré
  ✓ Canonical URLs
  ✓ Schema.org (LocalBusiness)
  ✓ Open Graph & Twitter Cards

✅ Performance
  ✓ LCP <2.5s
  ✓ FID <100ms
  ✓ CLS <0.1
  ✓ Score Lighthouse 95+
  ✓ Images optimisées (WebP)
  ✓ LQIP pour Zero CLS

✅ Mobile
  ✓ Responsive design
  ✓ Navigation mobile optimisée
  ✓ Touch targets ≥44px
  ✓ Mobile score 90+

✅ Contenu
  ✓ Contenu unique et pertinent
  ✓ Mots-clés dans titres
  ✓ Rich Text bien structuré
  ✓ Liens internes pertinents
```

### Off-Page SEO

```bash
✅ Citations
  ✓ Google My Business
  ✓ Annuaires locaux
  ✓ Réseaux sociaux

✅ Backlinks
  ✓ Partenaires locaux
  ✓ Administrations
  ✓ Articles de presse

✅ Réseaux Sociaux
  ✓ Facebook page
  ✓ Instagram
  ✓ LinkedIn (optionnel)
```

---

## 📚 Ressources

### Documentation
- [Google SEO Guide](https://developers.google.com/search/docs)
- [Next.js SEO](https://nextjs.org/learn/seo/introduction-to-seo)
- [Schema.org ChildCare](https://schema.org/ChildCare)
- [Open Graph Protocol](https://ogp.me/)

### Outils
- [Google Search Console](https://search.google.com/search-console)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Rich Results Test](https://search.google.com/test/rich-results)
- [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)

---

**Dernière mise à jour :** Octobre 2024  
**Version :** Next.js 15 + Sanity v3 + SSG

