# 🏫 Garderie Les P'tits Loups

Une application web moderne pour la gestion d'une garderie, construite avec Next.js, Radix UI et Sanity CMS.

## 🚀 Stack Technique

- **Framework**: [Next.js 15](https://nextjs.org/) + App Router
- **Langage**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS V4](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) + [Shadcn UI](https://ui.shadcn.com/)
- **CMS**: [Sanity](https://www.sanity.io/)
- **Email**: [Resend](https://resend.com/)
- **Déploiement**: [Vercel](https://vercel.com/)
- **Icônes**: [Lucide React](https://lucide.dev/)

## 📦 Installation

```bash
# Installation des dépendances
npm install

# Mode développement
npm run dev

# Studio Sanity
npm run sanity
```

## ⚙️ Configuration

### Variables d'environnement
Créez un fichier `.env.local` avec :

```env
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01

# Email (Resend)
RESEND_API_KEY=your_resend_key

# reCAPTCHA
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key
RECAPTCHA_SECRET_KEY=your_secret_key
```

### Configuration Sanity
1. Créez un nouveau projet sur [sanity.io](https://sanity.io)
2. Ajoutez vos identifiants dans `.env.local`
3. Lancez le studio : `npm run sanity`

## 📁 Structure du Projet

```
📦 garderie-les-ptits-loups/
├── 📚 docs/                 # Documentation complète
├── 🌐 public/               # Fichiers statiques
├── 🗄️ src/
│   ├── 📱 app/              # Pages Next.js (routing)
│   ├── 🧩 components/       # UI, shared, pages
│   │   ├── ui/              # Composants Shadcn originaux
│   │   ├── pages/           # Sections de pages
│   │   ├── debug/           # Composants de debug
│   │   └── examples/        # Exemples de composants
│   ├── 🎣 hooks/            # Hooks personnalisés
│   ├── 🔧 lib/              # Utilitaires et config
│   ├── 🎨 styles/           # CSS et variables
│   └── 🟦 types/            # Types TypeScript
├── ⚙️ .env.local            # Variables d'environnement
├── ⚙️ .cursorrules.md       # Règles Cursor AI
└── ✍️ README.md
```

## 🎨 Design System

### Palette de Couleurs
- **Orange** : Couleur neutre/système (remplace gray)
- **Purple** : Couleur d'accent principale

### Usage
```css
bg-purple-9          /* Boutons principaux */
text-orange-11       /* Texte principal */
border-orange-6      /* Bordures */
```

## 🧩 Composants Principaux

### Structure
- `src/components/ui/` : Composants Shadcn originaux (ne pas modifier)
- `src/components/pages/` : Sections spécifiques aux pages
- `src/components/debug/` : Composants de debug (développement)
- `src/components/examples/` : Exemples de composants

### Exemples
- **Button** : Variants avec icônes et focus states
- **ContactForm** : Validation, localStorage, reCAPTCHA
- **Maps** : OpenStreetMap + Leaflet (pas Google Maps)
- **Navigation** : Mobile bottom bar avec auto-hide

## 🔒 Sécurité

- **reCAPTCHA v2** : Protection anti-bot visible
- **Honeypot** : Champ invisible anti-bot
- **Validation** : Client et serveur
- **Sanitisation** : Données utilisateur

## 📱 Responsive Design

- **Mobile First** : Approche progressive
- **Breakpoints** : Mobile < 640px, Tablet 640-1024px, Desktop > 1024px
- **Navigation** : Bottom bar mobile avec auto-hide

## 🚦 Déploiement

Automatique sur Vercel (branche `main`).

## 📞 Contact

Ricardo Do Vale