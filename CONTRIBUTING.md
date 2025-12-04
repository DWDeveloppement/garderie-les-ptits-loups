# 🤝 Guide de Contribution - Garderie Les P'tits Loups

Merci de ton intérêt pour contribuer à ce projet ! Ce guide t'aidera à comprendre notre workflow de développement.

---

## 🌿 Structure des Branches

Le projet utilise deux branches principales :

- **`develop`** : Branche de développement (pré-production)
- **`main`** : Branche de production (déploiement automatique sur Vercel)

**Important** : Toutes les contributions doivent être basées sur `develop`.

---

## 🔄 Workflow de Développement

### 1. Créer une branche

Depuis `develop`, crée une nouvelle branche selon le type de changement :

```bash
# Nouvelle fonctionnalité
git checkout -b feature/nom-de-la-fonctionnalite

# Correction de bug
git checkout -b fix/description-du-bug

# Documentation
git checkout -b docs/sujet-de-la-documentation

# Refactoring
git checkout -b refactor/zone-du-refactor
```

### 2. Développer

- Écris du code **TypeScript strict**
- Utilise **Tailwind CSS** pour le styling
- Commente en **français**
- Teste localement avec `npm run dev`

### 3. Commiter

Utilise les **commits conventionnels** :

```bash
git commit -m "type(scope): description"
```

**Types de commits** :

| Type | Description | Exemple |
|------|-------------|---------|
| `feat` | Nouvelle fonctionnalité | `feat(contact): ajout validation email` |
| `fix` | Correction de bug | `fix(gallery): correction affichage mobile` |
| `docs` | Documentation | `docs(readme): mise à jour installation` |
| `style` | Formatage (sans changement de logique) | `style(button): correction indentation` |
| `refactor` | Refactoring | `refactor(hooks): simplification useForm` |
| `perf` | Optimisation performance | `perf(images): ajout lazy loading` |
| `test` | Ajout/modification de tests | `test(form): ajout tests validation` |
| `chore` | Tâches de maintenance | `chore(deps): mise à jour dépendances` |

**Exemples complets** :

```bash
git commit -m "feat(contact): ajout formulaire de contact avec validation Zod"
git commit -m "fix(navbar): correction menu mobile qui ne se ferme pas"
git commit -m "docs(claude): ajout section optimisation modèles IA"
git commit -m "refactor(components): migration Shadcn vers Radix UI"
```

### 4. Pousser et créer une Pull Request

```bash
# Pousser ta branche
git push origin feature/nom-de-la-fonctionnalite

# Créer une Pull Request vers develop (via GitHub UI)
```

### 5. Revue de code

- L'équipe review ta PR
- Effectue les modifications demandées si nécessaire
- Une fois approuvée, la PR est mergée dans `develop`

### 6. Déploiement en production

- Après validation en pré-production (`develop`)
- Un merge vers `main` déclenche le déploiement Vercel automatique

---

## 🔧 Configuration Technique

### Installation

```bash
# Cloner le projet
git clone https://github.com/DWDeveloppement/garderie-les-ptits-loups.git
cd garderie-les-ptits-loups

# Installer les dépendances
npm install

# Copier et configurer les variables d'environnement
cp .env.example .env.local
# Éditer .env.local avec tes clés API
```

### Commandes utiles

```bash
# Développement
npm run dev              # Next.js (port 3000)
npm run sanity           # Sanity Studio (port 3333)
npm run refresh          # Clean + restart

# Tests
npm run lint             # ESLint
npm run build            # Test du build

# Nettoyage
npm run clean            # Supprimer .next
npm run kill:dev         # Libérer ports 3000 et 3333
```

### Résolution de problèmes

**Port déjà utilisé** :
```bash
npm run kill:dev
```

**Cache corrompu** :
```bash
npm run clean && npm run dev
```

**Problème avec Sanity** :
```bash
npm run cleanup:sanity-cache
```

---

## 📐 Conventions de Code

### TypeScript

- **Mode strict activé** : Toujours typer explicitement
- **Préférer `type`** plutôt qu'`interface`
- **Éviter `any`** : Utiliser `unknown` avec type guards

```typescript
// ✅ Bon
type ButtonProps = {
  variant: 'primary' | 'secondary'
  children: React.ReactNode
}

// ❌ À éviter
interface ButtonProps {
  variant: any
  children: any
}
```

### React

- **Server Components par défaut** : Utiliser `'use client'` uniquement si nécessaire
- **PascalCase** pour les composants : `ContactForm.tsx`
- **camelCase** pour les fonctions : `validateEmail()`

### Tailwind CSS

- **Palette Orange + Purple** : Utiliser les couleurs du design system
- **Pas d'inline styles** : Toujours utiliser Tailwind
- **Utiliser `cn()`** pour merger les classes

```tsx
import { cn } from 'lib/utils'

<button className={cn(
  'px-4 py-2 rounded-lg',
  variant === 'primary' && 'bg-purple-9 text-white',
  className
)}>
```

### Commentaires

**Toujours en français** :

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

## 🚫 Ce qui N'est PAS Accepté

### ❌ Mises à jour automatiques de dépendances

- **Dependabot PRs automatiques** ne sont **pas acceptées**
- Les mises à jour de dépendances sont gérées **manuellement** une fois par mois
- Toujours tester en local avant de proposer une mise à jour

### ❌ Secrets dans le code

- **Jamais de clés API** dans le code
- Utiliser `.env.local` et les variables d'environnement
- Vérifier avant commit : `git diff` pour s'assurer qu'aucun secret n'est inclus

### ❌ Code non testé

- Toujours tester en local avec `npm run dev`
- Vérifier le build : `npm run build`
- Tester sur mobile (navigation responsive)

---

## 📚 Documentation

Avant de contribuer, consulte :

- **[CLAUDE.md](./CLAUDE.md)** : Guide complet pour assistants IA
- **[docs/README.md](./docs/README.md)** : Documentation technique
- **[.cursorrules.md](./.cursorrules.md)** : Règles de développement Cursor

---

## ✅ Checklist avant Pull Request

- [ ] Code testé en local (`npm run dev`)
- [ ] Build réussit (`npm run build`)
- [ ] ESLint passe (`npm run lint`)
- [ ] Commits conventionnels respectés
- [ ] Commentaires en français
- [ ] Pas de secrets dans le code
- [ ] Types TypeScript définis
- [ ] Documentation mise à jour si nécessaire

---

## 🆘 Besoin d'Aide ?

- **Documentation** : Consulte [docs/README.md](./docs/README.md)
- **Issues GitHub** : Ouvre une issue pour poser des questions
- **Contact** : Ricardo Do Vale

---

**Merci de contribuer à Garderie Les P'tits Loups !** 🎉
