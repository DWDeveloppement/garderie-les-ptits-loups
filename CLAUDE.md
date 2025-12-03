# CLAUDE.md - Guide pour Assistants IA

> **🇫🇷 LANGUE DE COMMUNICATION : FRANÇAIS**
> Tous les échanges avec les assistants IA doivent se faire **exclusivement en français**.
> Code, commentaires, commits, documentation : tout doit être en français.

---

## 🤖 Utilisation des modèles Claude (Optimisation des tokens)

Pour optimiser la consommation de tokens et les coûts, utiliser le modèle approprié :

### Modèles disponibles

| Modèle | Complexité | Cas d'usage | Autorisation |
|--------|------------|-------------|--------------|
| **Haiku** (gratuit) | Simple | Documentation, composants UI basiques, lecture de code | ❌ Non |
| **Sonnet** (moyen) | Moyenne | Composants avec logique, hooks, intégrations API | ❌ Non |
| **Opus** (avancé) | Complexe | Architecture avancée, refactoring majeur | ✅ **Oui** |

> **Note** : Toujours mentionner le moteur utilisé dans le contexte

### Processus de demande pour Opus

```
Cette tâche nécessite Opus car :
- [Raison 1 : complexité architecturale]
- [Raison 2 : impact sur plusieurs modules]
Estimation : ~X tokens
Puis-je procéder avec Opus ?
```

**Attendre confirmation** avant de démarrer.

---

## 🎯 Vue d'ensemble du projet

### Contexte

**Garderie Les P'tits Loups** : Site web moderne pour une garderie suisse.

**Fonctionnalités** :
- Présentation des espaces (nurserie, trotteurs, grands)
- Galeries photos avec lightbox
- Formulaire de contact avec validation
- Gestion de contenu via Sanity CMS
- SEO optimisé et performance

### Stack technique

| Couche | Technologies |
|--------|-------------|
| **Framework** | Next.js 15.5.2 (App Router) |
| **Langage** | TypeScript 5 (strict mode) |
| **UI** | React 19.1.0 + Tailwind CSS v4 |
| **Composants** | Shadcn UI + Radix UI |
| **CMS** | Sanity v4.6.1 + next-sanity |
| **Formulaires** | React Hook Form + Zod |
| **Email** | Resend 6.0.2 |
| **Maps** | Leaflet + OpenStreetMap |
| **Galerie** | react-photo-album + yet-another-react-lightbox |
| **Animations** | Framer Motion |
| **Sécurité** | reCAPTCHA v2 + Honeypot |
| **Déploiement** | Vercel |

### Objectifs

- ✅ Performance : Lighthouse > 90
- ✅ Accessibilité : WCAG 2.1 AA
- ✅ SEO optimisé
- ✅ Code maintenable

---

## 📐 Conventions essentielles

### TypeScript

```typescript
// ✅ Mode strict activé
// ✅ Préférer 'type' à 'interface'
// ✅ Éviter 'any'

type ButtonProps = {
  variant: 'primary' | 'secondary'
  children: React.ReactNode
}

export function Button({ variant, children }: ButtonProps) {
  // ...
}
```

### React

```typescript
// ✅ Server Components par défaut
export default async function HomePage() {
  const data = await fetchFromSanity()
  return <Hero data={data} />
}

// ✅ Client Component uniquement si nécessaire
'use client'
export function ContactForm() {
  const [email, setEmail] = useState('')
  // ...
}
```

### Tailwind CSS

```typescript
// ✅ Palette Orange (neutre) + Purple (accent)
<Button className="bg-purple-9 hover:bg-purple-10 text-white" />
<Card className="bg-orange-1 border-orange-6" />

// ✅ Utiliser cn() pour merge
import { cn } from 'lib/utils'

className={cn(
  'px-4 py-2 rounded-lg',
  variant === 'primary' && 'bg-purple-9',
  className
)}
```

### Nommage

```typescript
// Composants : PascalCase
ContactForm.tsx
HeroSection.tsx

// Fonctions : camelCase
validateEmail()
fetchUserData()

// Constantes : UPPER_SNAKE_CASE
const MAX_FILE_SIZE = 5000000
```

### Commentaires

```typescript
/**
 * Valide une adresse email
 *
 * @param email - Adresse email à valider
 * @returns true si valide, false sinon
 */
function validateEmail(email: string): boolean {
  // Regex simple pour validation email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}
```

---

## 🚀 Démarrage rapide

### Installation

```bash
git clone https://github.com/DWDeveloppement/garderie-les-ptits-loups.git
cd garderie-les-ptits-loups
npm install
```

### Configuration

Créer `.env.local` :

```bash
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production

# Email
RESEND_API_KEY=your_resend_key

# reCAPTCHA
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key
RECAPTCHA_SECRET_KEY=your_secret_key
```

### Scripts essentiels

```bash
npm run dev        # Développement (port 3000)
npm run sanity     # Sanity Studio (port 3333)
npm run refresh    # Clean + restart
npm run build      # Build production
npm run lint       # Vérifier le code
```

---

## 📚 Documentation complète

### Navigation

La documentation détaillée est organisée dans le dossier `docs/` :

- **[01-code-style/](./docs/01-code-style/)** : TypeScript, React, formatage
- **[02-components/](./docs/02-components/)** : Patterns UI, Server/Client
- **[03-architecture/](./docs/03-architecture/)** : Structure, design system
- **[04-sanity/](./docs/04-sanity/)** : CMS, schémas, queries, images
- **[05-features/](./docs/05-features/)** : Formulaires, galeries, maps
- **[06-performance/](./docs/06-performance/)** : SEO, Lighthouse, ISR
- **[07-git-workflow/](./docs/07-git-workflow/)** : Branches, commits, déploiement
- **[08-reference/](./docs/08-reference/)** : Scripts, troubleshooting, env

### Fichiers clés

- **[README.md](./README.md)** : Vue d'ensemble et démarrage rapide
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** : Guide de contribution
- **[.cursorrules.md](./.cursorrules.md)** : Règles de développement Cursor
- **[docs/README.md](./docs/README.md)** : Index complet de la documentation

---

## ✅ Checklist avant commit

- [ ] TypeScript : Pas d'erreurs (`npx tsc --noEmit`)
- [ ] ESLint : Code conforme (`npm run lint`)
- [ ] Build : Build réussit (`npm run build`)
- [ ] Types : Tous les types définis
- [ ] Commentaires : En français, clairs
- [ ] Imports : Utiliser les aliases (`@/*`, `lib/*`)
- [ ] Styles : Tailwind uniquement
- [ ] Images : Next/Image avec alt text
- [ ] Accessibilité : ARIA labels, semantic HTML
- [ ] Performance : Lazy loading si nécessaire
- [ ] Sécurité : Pas de secrets dans le code

---

## 🏗️ Architecture clés

### Data Fetching : SSG + ISR

```typescript
// Static Site Generation avec ISR
export const revalidate = 60 // Cache 60 secondes

// + Webhook Sanity pour revalidation instantanée
// POST /api/revalidate → revalidatePath('/')
```

### Structure des dossiers

```
src/
├── app/              # Pages Next.js (App Router)
├── components/
│   ├── ui/           # Shadcn UI
│   ├── layout/       # Header, Footer, Navigation
│   ├── pages/        # Sections de pages
│   ├── shared/       # Composants réutilisables
│   ├── forms/        # Formulaires
│   └── gallery/      # Galerie photos
├── hooks/            # Hooks personnalisés
├── lib/              # Utilitaires
├── styles/           # CSS (palette, fonts)
└── types/            # Types TypeScript applicatifs

sanity/
├── schemas/          # Schémas de contenu
├── queries/          # Requêtes GROQ
├── types/            # Types Sanity
├── helpers/          # Optimisation images
└── client.ts         # Client configuré
```

---

## 🔒 Sécurité

### Validation formulaire

```typescript
// 1. Client : Zod schema
const contactSchema = z.object({
  email: z.string().email('Email invalide'),
  message: z.string().min(10, 'Minimum 10 caractères')
})

// 2. reCAPTCHA v2 Check
const token = await executeRecaptcha()

// 3. Honeypot Detection
if (formData.website) return error

// 4. Server Validation
const validatedData = contactSchema.parse(body)
```

### Variables d'environnement

```bash
# ❌ Jamais de secrets dans le code
# ✅ Toujours utiliser .env.local
# ✅ Vérifier avant commit : git diff
```

---

## 🐛 Troubleshooting rapide

**Port occupé** :
```bash
npm run kill:dev
```

**Cache corrompu** :
```bash
npm run clean && npm run dev
```

**Build échoue** :
```bash
rm -rf .next node_modules && npm install && npm run build
```

---

## 📖 Ressources

- [Next.js 15](https://nextjs.org/docs)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [Sanity](https://www.sanity.io/docs)
- [Shadcn UI](https://ui.shadcn.com/)

---

**Date de création** : 2025-12-03
**Dernière mise à jour** : 2025-12-03
**Version** : 2.0.0 (synthétisé)

**Maintenu par** : Ricardo Do Vale
**Contact** : contact@garderielesptitsloups.ch
