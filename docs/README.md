# 📚 Documentation - Garderie Les P'tits Loups

## 🎯 Vue d'Ensemble

Site web pour la garderie "Les P'tits Loups" développé avec **Next.js 15**, **Sanity CMS v4.6.1**, **Radix UI**, et **Tailwind CSS v4**.

**Stack Technique** : Next.js 15 · React 19 · TypeScript 5 · Sanity v4.6.1 · Tailwind v4 · Radix UI

---

## 📁 Organisation de la Documentation

Cette documentation est organisée en **7 catégories principales** pour faciliter la navigation.

---

## 🏗️ Architecture

Documentation de l'architecture applicative et des patterns utilisés.

| Fichier | Description |
|---------|-------------|
| **[components.md](./architecture/components.md)** | 87 composants organisés (ui/, pages/, layout/, forms/, gallery/, shared/) |
| **[hooks.md](./architecture/hooks.md)** | 23 hooks dans 7 catégories (a11y/, forms/, queries/, utils/) |
| **[types.md](./architecture/types.md)** | 22 fichiers de types TypeScript (applicatifs + Sanity) |
| **[overview.md](./architecture/overview.md)** | Vue d'ensemble de l'architecture globale |

**Points clés** :
- Pattern Server/Client Components
- Barrel exports (`index.ts`)
- Unions discriminées
- React Cache pour déduplication

---

## 🗄️ Sanity CMS

Configuration, schémas, queries et optimisation Sanity v4.6.1.

| Fichier | Description |
|---------|-------------|
| **[setup.md](./sanity/setup.md)** | Installation, configuration, Studio, webhooks |
| **[schemas.md](./sanity/schemas.md)** | 22 schémas (composants réutilisables, pages, entités) |
| **[queries.md](./sanity/queries.md)** | 11 queries GROQ avec populate, cache, React Cache |
| **[images.md](./sanity/images.md)** | Optimisation images (LQIP, blurhash, WebP, Zero CLS) |

**Points clés** :
- SSG + ISR (60s cache)
- 1 query par page (populate relations)
- Tags pour revalidation granulaire
- BASIC_IMAGE_QUERY_LIGHT pour DRY

---

## ⚙️ Features

Fonctionnalités principales de l'application.

| Fichier | Description |
|---------|-------------|
| **[forms.md](./features/forms.md)** | Formulaire contact (Zod + reCAPTCHA v2 + Honeypot + Resend) |
| **[gallery.md](./features/gallery.md)** | Galerie photos (react-photo-album + yet-another-react-lightbox) |
| **[maps.md](./features/maps.md)** | Cartes interactives (Leaflet + OpenStreetMap, migration Google Maps) |
| **[navigation.md](./features/navigation.md)** | Navigation responsive (Radix UI + menu mobile + a11y) |

**Points clés** :
- Validation double (client + serveur)
- Lazy loading images
- Dynamic import (Leaflet SSR-safe)
- Focus trap et navigation clavier

---

## ⚡ Performance

Optimisation des performances et référencement.

| Fichier | Description |
|---------|-------------|
| **[seo.md](./performance/seo.md)** | SEO complet (metadata, sitemap, robots.txt, structured data) |

**Points clés** :
- Metadata dynamique (App Router)
- JSON-LD (Organization, Breadcrumbs)
- Open Graph + Twitter Cards
- Lighthouse SEO > 90

---

## 📖 Référence

Guides de référence pour configuration et troubleshooting.

| Fichier | Description |
|---------|-------------|
| **[environment.md](./reference/environment.md)** | Variables d'environnement (Sanity, Resend, reCAPTCHA) |
| **[scripts.md](./reference/scripts.md)** | Scripts NPM disponibles (dev, build, clean, kill) |
| **[troubleshooting.md](./reference/troubleshooting.md)** | Solutions aux problèmes courants |
| **[DOMAINS.md](./reference/DOMAINS.md)** | Liste des domaines et URLs (local, preview, production) |
| **[SANITY_DEPLOYMENT.md](./reference/SANITY_DEPLOYMENT.md)** | Checklist de déploiement Sanity (cleanup media, etc.) |

**Points clés** :
- `.env.local` template
- Scripts de nettoyage (`npm run clean`)
- Debug port occupé, cache corrompu, etc.
- Configuration domaines et déploiement

---

## 👤 Client

Documentation destinée aux utilisateurs finaux pour la gestion du contenu.

| Fichier | Description |
|---------|-------------|
| **[GUIDE_SANITY.md](./client/GUIDE_SANITY.md)** | Guide complet Sanity Studio pour éditer le contenu |
| **[TRANSFER_PROJECT.md](./client/TRANSFER_PROJECT.md)** | Procédure de transfert du projet Sanity |
| **[README.md](./client/README.md)** | Vue d'ensemble de la documentation client |

**Points clés** :
- Accès Sanity Studio
- Modifier pages, galeries, contenu
- Procédure de transfert de propriété
- Guides pour utilisateurs non-techniques

---

## 🧪 Tests & Dev Tools

Documentation des tests et outils de développement.

| Dossier | Description |
|---------|-------------|
| **[tests/](./tests/)** | Tests (a11y, SSR, performance, responsive) |
| **[dev/](./dev/)** | Outils dev (Vision queries, JSON viewer) |

---

## 🚀 Démarrage Rapide

### Installation

```bash
git clone https://github.com/DWDeveloppement/garderie-les-ptits-loups.git
cd garderie-les-ptits-loups
npm install
```

### Configuration

Créer `.env.local` (voir [reference/environment.md](./reference/environment.md)) :

```bash
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production

# Email
RESEND_API_KEY=re_xxxxxxxxxxxx

# reCAPTCHA v2
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6LeXXXXXXXXXXXXXXXXXXXXXXX
RECAPTCHA_SECRET_KEY=6LeXXXXXXXXXXXXXXXXXXXXXXX

# Revalidation
REVALIDATE_SECRET=your_random_secret
```

### Lancement

```bash
npm run dev       # Next.js → http://localhost:3000
npm run sanity    # Studio → http://localhost:3333
```

---

## 📖 Structure du Site

### Pages

| Route | Description |
|-------|-------------|
| `/` | Page d'accueil (hero, secteurs, autres espaces) |
| `/a-propos` | Histoire, pédagogie, équipe, valeurs |
| `/contact` | Formulaire contact + carte Leaflet |
| `/horaires-tarifs` | Tarifs (nurserie, trotteurs & grands) + subventions |
| `/la-structure/nurserie` | Secteur 0-24 mois (galerie, espaces liés) |
| `/la-structure/trotteurs` | Secteur 24-36 mois |
| `/la-structure/grands` | Secteur 3-4 ans |
| `/mentions-legales` | Mentions légales |
| `/politique-confidentialite` | Politique de confidentialité |

---

## 📂 Structure du Code

```
📁 garderie-les-ptits-loups/
├── 📁 src/
│   ├── 📁 app/              # Pages Next.js (App Router)
│   ├── 📁 components/       # 87 composants React
│   │   ├── ui/              # Primitives Shadcn UI (19)
│   │   ├── pages/           # Sections de pages (25)
│   │   ├── layout/          # Header, Footer, Navigation (8)
│   │   ├── shared/          # Composants réutilisables (20)
│   │   ├── forms/           # Formulaires (5)
│   │   ├── gallery/         # Galerie photos (4)
│   │   ├── lazy/            # Lazy loaded (3)
│   │   ├── icons/           # Icônes (2)
│   │   └── dev/             # Dev tools (1)
│   ├── 📁 hooks/            # 23 hooks personnalisés
│   │   ├── a11y/            # Accessibilité (8)
│   │   ├── components/      # Composants (2)
│   │   ├── forms/           # Formulaires (3)
│   │   ├── queries/         # Queries Sanity (1)
│   │   ├── tests/           # Tests (3)
│   │   ├── utils/           # Utilitaires (5)
│   │   └── *.ts             # Root hooks (1)
│   ├── 📁 types/            # Types applicatifs (4)
│   ├── 📁 lib/              # Utilitaires
│   ├── 📁 styles/           # CSS (palette, fonts)
│   └── 📁 constants/        # Constantes
├── 📁 sanity/
│   ├── 📁 schemas/          # 22 schémas Sanity
│   ├── 📁 queries/          # 11 queries GROQ
│   ├── 📁 types/            # 18 types Sanity (core/, content/, pages/)
│   ├── 📁 helpers/          # Optimisation images
│   └── client.ts            # Client configuré
├── 📁 docs/                 # Documentation complète
│   ├── architecture/        # Architecture (4 fichiers)
│   ├── sanity/              # Sanity CMS (4 fichiers)
│   ├── features/            # Features (4 fichiers)
│   ├── performance/         # Performance (1 fichier)
│   ├── reference/           # Référence (5 fichiers)
│   ├── client/              # Documentation client (3 fichiers)
│   ├── tests/               # Tests (7 fichiers)
│   └── dev/                 # Dev tools (2 fichiers)
├── 📁 public/               # Assets statiques
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
├── CLAUDE.md                # Guide pour assistants IA
└── .cursorrules.md          # Règles de développement
```

Voir [architecture/components.md](./architecture/components.md) pour la structure détaillée des composants.

---

## 🔧 Scripts Principaux

Voir [reference/scripts.md](./reference/scripts.md) pour la liste complète.

### Développement

```bash
npm run dev              # Serveur dev Next.js
npm run sanity           # Sanity Studio
npm run lint             # ESLint
npm run typecheck        # Vérification TypeScript
npm run refresh          # Clean + restart
```

### Production

```bash
npm run build            # Build production
npm run start            # Serveur production
```

### Utilitaires

```bash
npm run kill:dev         # Libérer port 3000
npm run kill:sanity      # Libérer port 3333
npm run clean            # Nettoyer caches
npm run clean:all        # Tout supprimer + réinstaller
```

---

## 📊 État du Projet

### ✅ Production Ready

**Backend :**
- ✅ Sanity v4.6.1 avec structureTool
- ✅ 22 schémas (9 composants, 8 pages, 4 entités)
- ✅ 11 queries GROQ optimisées (populate relations)
- ✅ React Cache pour déduplication layout
- ✅ Images SEO (alt obligatoire, LQIP, blurhash)

**Frontend :**
- ✅ 87 composants organisés (7 catégories)
- ✅ 23 hooks personnalisés (7 catégories)
- ✅ 22 fichiers de types TypeScript
- ✅ Navigation responsive (desktop + mobile)
- ✅ Formulaire contact (Zod + reCAPTCHA + Resend)
- ✅ Galerie photos (react-photo-album + lightbox)
- ✅ Cartes Leaflet + OpenStreetMap

**Performance :**
- ✅ SSG + ISR (60s cache)
- ✅ Core Web Vitals optimisés
- ✅ Zero CLS (LQIP + dimensions)
- ✅ SEO complet (metadata, sitemap, structured data)

---

## 🆘 Aide Rapide

Voir [reference/troubleshooting.md](./reference/troubleshooting.md) pour toutes les solutions.

### Problèmes Courants

**Port occupé :**
```bash
npm run kill:dev   # Port 3000
npm run kill:sanity # Port 3333
```

**Cache corrompu :**
```bash
npm run refresh
```

**Build échoue :**
```bash
npm run typecheck  # Vérifier types
npm run lint       # Vérifier ESLint
npm run build      # Tester build local
```

---

## 📚 Parcours de Lecture

### 🎓 Nouveau sur le projet ?

1. **Démarrer** → [reference/environment.md](./reference/environment.md) + [reference/scripts.md](./reference/scripts.md)
2. **Comprendre Sanity** → [sanity/setup.md](./sanity/setup.md) + [sanity/schemas.md](./sanity/schemas.md)
3. **Explorer l'architecture** → [architecture/overview.md](./architecture/overview.md) + [architecture/components.md](./architecture/components.md)
4. **Voir les composants** → [architecture/hooks.md](./architecture/hooks.md) + [architecture/types.md](./architecture/types.md)

### 🎨 Développer une feature ?

1. **Architecture** → [architecture/overview.md](./architecture/overview.md)
2. **Composants** → [architecture/components.md](./architecture/components.md)
3. **Hooks** → [architecture/hooks.md](./architecture/hooks.md)
4. **Types** → [architecture/types.md](./architecture/types.md)
5. **Features** → [features/](./features/)

### 🗄️ Travailler avec Sanity ?

1. **Setup** → [sanity/setup.md](./sanity/setup.md)
2. **Schémas** → [sanity/schemas.md](./sanity/schemas.md)
3. **Queries** → [sanity/queries.md](./sanity/queries.md)
4. **Images** → [sanity/images.md](./sanity/images.md)

### 🚀 Déployer en production ?

1. **Configuration** → [reference/environment.md](./reference/environment.md)
2. **Build** → [reference/scripts.md](./reference/scripts.md)
3. **SEO** → [performance/seo.md](./performance/seo.md)
4. **Troubleshooting** → [reference/troubleshooting.md](./reference/troubleshooting.md)

---

## 🏆 Technologies

### Frontend

- **Framework** : Next.js 15.5.2 (App Router)
- **Langage** : TypeScript 5 (strict mode)
- **UI** : React 19.1.0
- **Styles** : Tailwind CSS v4
- **Composants** : Shadcn UI + Radix UI
- **Animations** : Framer Motion

### Backend

- **CMS** : Sanity v4.6.1 + next-sanity
- **Email** : Resend 6.0.2
- **Sécurité** : reCAPTCHA v2 + Honeypot

### Features

- **Formulaires** : React Hook Form + Zod
- **Galerie** : react-photo-album + yet-another-react-lightbox
- **Cartes** : Leaflet + OpenStreetMap

### Déploiement

- **Hosting** : Vercel
- **CI/CD** : GitHub Actions
- **Cache** : SSG + ISR (60s) + Vercel Edge

---

## 📄 Fichiers Principaux

- **[CLAUDE.md](../CLAUDE.md)** : Guide complet pour assistants IA
- **[.cursorrules.md](../.cursorrules.md)** : Règles de développement pour Cursor
- **[CONTRIBUTING.md](../CONTRIBUTING.md)** : Guide de contribution
- **[LICENSE.md](../LICENSE.md)** : Licence MIT

---

## 🏆 Résultat

Site professionnel avec :

- ✅ Design moderne et responsive
- ✅ Performance optimisée (SSG, Zero CLS, Core Web Vitals)
- ✅ SEO-ready (metadata, sitemap, structured data)
- ✅ Architecture maintenable (TypeScript strict, modulaire)
- ✅ Documentation complète (30+ fichiers, 7 catégories)

**Status** : ✅ Production Ready

---

**Dernière mise à jour** : 2025-12-03 · **Version** : 2.0.0
