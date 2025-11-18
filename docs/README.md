# 📚 Documentation - Garderie Les P'tits Loups

## 🎯 Vue d'Ensemble

Site web pour la garderie "Les P'tits Loups" développé avec **Next.js 15**, **Sanity CMS v3**, **Radix UI**, et **Tailwind CSS v4**.

**Stack Technique :** Next.js 15 · React 19 · TypeScript · Sanity v3 · Tailwind v4 · Radix UI

---

## 📁 Navigation de la Documentation

### 🗄️ [Sanity CMS](./sanity/)

Configuration, schémas, queries et optimisation des images.

- **[SANITY.md](./sanity/SANITY.md)** - Setup, schémas, queries GROQ, usage Studio
- **[SANITY_IMAGES.md](./sanity/SANITY_IMAGES.md)** - Système d'images, optimisation, SEO, protection

### ⚙️ [Configuration & Setup](./setup/)

Installation, variables d'environnement et Git.

- **[SETUP.md](./setup/SETUP.md)** - Variables d'env, Sanity, Resend, reCAPTCHA, Vercel
- **[SECURITY.md](./setup/SECURITY.md)** - reCAPTCHA v2, Honeypot, validation double
- **[GITHUB.md](./setup/GITHUB.md)** - Git workflow, branches, commits conventionnels, CI/CD

### 🎨 [Features & Composants](./features/)

Fonctionnalités et architecture de l'application.

- **[ARCHITECTURE.md](./features/ARCHITECTURE.md)** - Structure code, design system, hooks, patterns
- **[GALLERY.md](./features/GALLERY.md)** - React Photo Album, layouts, SSR, Zero CLS
- **[FORM.md](./features/FORM.md)** - Formulaire contact, validation, localStorage, Resend
- **[MAP.md](./features/MAP.md)** - Cartes Google Maps (Static + Dynamic)
- **[MOBILE_NAV.md](./features/MOBILE_NAV.md)** - Navigation mobile, BottomBar, BackToTop

### ⚡ [Performance & SEO](./performance/)

Optimisation des performances et référencement.

- **[LIGHTHOUSE.md](./performance/LIGHTHOUSE.md)** - SSG, cache, images, Core Web Vitals, monitoring
- **[SEO.md](./performance/SEO.md)** - Référencement, meta tags, Schema.org, Open Graph, sitemap

---

## 🚀 Démarrage Rapide

### Installation

```bash
# Cloner et installer
git clone [repository-url]
cd garderie-les-ptits-loups
npm install
```

### Configuration

Créer `.env.local` à la racine (voir [setup/SETUP.md](./setup/SETUP.md)) :

```bash
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID="your_project_id"
NEXT_PUBLIC_SANITY_DATASET="production"
SANITY_API_TOKEN="your_api_token"

# Services
RESEND_API_KEY="re_xxxxxxxxxxxx"
RECAPTCHA_SITE_KEY="your_site_key"
RECAPTCHA_SECRET_KEY="your_secret_key"
```

### Lancement

```bash
npm run dev       # Next.js → http://localhost:3000
npm run sanity    # Studio → http://localhost:3333
```

---

## 📖 Structure du Site

### Pages

| Route                     | Description          |
| ------------------------- | -------------------- |
| `/`                       | Page d'accueil       |
| `/a-propos`               | Histoire & pédagogie |
| `/contact`                | Formulaire & carte   |
| `/tarifs`                 | Tarifs & subventions |
| `/la-structure/nurserie`  | Secteur 0-24 mois    |
| `/la-structure/trotteurs` | Secteur 24-36 mois   |
| `/la-structure/grands`    | Secteur 3-4 ans      |

### Architecture Code

Voir [features/ARCHITECTURE.md](./features/ARCHITECTURE.md) pour la structure détaillée.

```md
src/
├── app/          # Pages Next.js
├── components/   # Composants React
├── lib/          # Utilitaires (sanity, performance)
├── hooks/        # Hooks personnalisés
└── types/        # Types TypeScript applicatifs

sanity/
├── schemas/      # Schémas CMS
├── components/   # Composants Studio
├── types/        # ✅ Types TypeScript Sanity (centralisés)
├── queries/      # Requêtes GROQ
├── lib/          # Utilitaires Sanity
└── deskStructure.ts

scripts/
├── clean/        # ✅ Scripts de nettoyage
├── fix/          # ✅ Scripts de correction
├── tests/        # ✅ Scripts de test
└── tools/        # ✅ Outils utilitaires
```

---

## 🔧 Scripts Principaux

### Développement

```bash
npm run dev              # Serveur dev Next.js
npm run sanity           # Sanity Studio
npm run lint             # ESLint
```

### Production

```bash
npm run build            # Build production
npm run start            # Serveur production
```

### Utilitaires

```bash
npm run kill:dev         # Libérer port 3000
npm run kill:studio      # Libérer port 3333
npm run fix:page -- contact  # Réparer document Sanity
npm run cleanup:media    # Nettoyer médias non utilisés
```

Voir [setup/SETUP.md](./setup/SETUP.md) pour tous les scripts disponibles.

---

## 📊 État du Projet

### ✅ Production Ready

**Backend :**

- ✅ Sanity Studio configuré avec desk structure personnalisée
- ✅ Queries GROQ optimisées (1 requête/page, populate relations)
- ✅ Système d'images SEO (alt obligatoire, LQIP, Zero CLS)
- ✅ Performance tracking automatique

**Frontend :**

- ✅ 7 pages statiques (SSG)
- ✅ Formulaire contact avec protection anti-spam
- ✅ Navigation responsive (desktop + mobile)
- ✅ Optimisation images (priority hero, lazy gallery)

**Performance :**

- ✅ Bundle <125kB par page
- ✅ Core Web Vitals optimisés
- ✅ Zero CLS (LQIP + dimensions)
- ✅ Cache SSG + Vercel Edge

### 🚧 En Développement

- 🔄 Galeries React Photo Album
- 🔄 Lightbox yet-another-react-lightbox
- 🔄 Schema.org ChildCare
- 🔄 Tests automatisés

---

## 🆘 Aide Rapide

### Problèmes Courants

**Port occupé :**

```bash
npm run kill:dev   # ou npm run kill:studio
```

**Document Sanity bloqué :**

```bash
npm run fix:page -- contact
```

**Build échoue :**

```bash
rm -rf .next node_modules && npm install && npm run build
```

### Logs & Debug

- **Vercel** : `vercel logs [url]`
- **Sanity Vision** : http://localhost:3333/vision
- **Performance** : Voir `lib/performance/measure.ts`

---

## 📚 Parcours de Lecture

### 🎓 Nouveau sur le projet ?

1. **Démarrer** → [setup/SETUP.md](./setup/SETUP.md)
2. **Comprendre Sanity** → [sanity/SANITY.md](./sanity/SANITY.md)
3. **Explorer l'architecture** → [features/ARCHITECTURE.md](./features/ARCHITECTURE.md)
4. **Voir les features** → [features/](./features/)

### 🎨 Développer une feature ?

1. **Architecture** → [features/ARCHITECTURE.md](./features/ARCHITECTURE.md)
2. **Design system** → [features/ARCHITECTURE.md#design-system](./features/ARCHITECTURE.md)
3. **Composants** → [features/](./features/)
4. **Performance** → [performance/LIGHTHOUSE.md](./performance/LIGHTHOUSE.md)

### 🚀 Déployer en production ?

1. **Configuration** → [setup/SETUP.md](./setup/SETUP.md)
2. **Sécurité** → [setup/SECURITY.md](./setup/SECURITY.md)
3. **Git & CI/CD** → [setup/GITHUB.md](./setup/GITHUB.md)
4. **SEO** → [performance/SEO.md](./performance/SEO.md)

---

## 🏆 Résultat

Site professionnel avec :

- ✅ Design moderne et responsive
- ✅ Performance optimisée (SSG, Zero CLS, Bundle <125kB)
- ✅ SEO-ready (meta tags, alt text, Open Graph)
- ✅ Architecture maintenable (TypeScript strict, modulaire)
- ✅ Documentation complète et structurée

**Status :** ✅ Production Ready

---

**Dernière mise à jour :** Octobre 2024 · **Version :** 1.0.0
