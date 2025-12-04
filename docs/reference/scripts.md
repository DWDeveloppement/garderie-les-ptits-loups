# Référence - Scripts NPM

## 📊 Vue d'ensemble

Scripts NPM disponibles pour le développement, build, et maintenance.

**Fichier** : `package.json`

---

## 🚀 Développement

### `npm run dev`

**Description** : Lance le serveur de développement Next.js

```bash
npm run dev
```

**Port** : http://localhost:3000

**Features** :
- Hot reload
- Fast Refresh
- TypeScript checking
- Error overlay

---

### `npm run sanity`

**Description** : Lance Sanity Studio

```bash
npm run sanity
```

**Port** : http://localhost:3333

**Features** :
- Gestion de contenu
- Preview en temps réel
- Validation schémas

---

### `npm run refresh`

**Description** : Nettoie et redémarre le serveur

```bash
npm run refresh
```

**Équivalent** :
```bash
npm run clean && npm run dev
```

**Usage** : Cache corrompu, erreurs bizarres

---

## 🔨 Build

### `npm run build`

**Description** : Build production Next.js

```bash
npm run build
```

**Output** : `.next/`

**Checks** :
- TypeScript errors
- ESLint warnings
- Build optimization
- Route generation

---

### `npm run start`

**Description** : Lance le build production localement

```bash
npm run start
```

**⚠️ Prérequis** : `npm run build` d'abord

**Port** : http://localhost:3000

---

## 🧪 Qualité

### `npm run lint`

**Description** : Vérifie le code avec ESLint

```bash
npm run lint
```

**Configuration** : `.eslintrc.json`

**Checks** :
- Code style
- Erreurs potentielles
- Best practices
- Accessibilité

---

### `npm run lint:fix`

**Description** : Corrige automatiquement les erreurs ESLint

```bash
npm run lint:fix
```

**⚠️ Attention** : Modifie les fichiers

---

### `npm run typecheck`

**Description** : Vérifie les types TypeScript sans build

```bash
npm run typecheck
```

**Équivalent** :
```bash
npx tsc --noEmit
```

---

## 🧹 Nettoyage

### `npm run clean`

**Description** : Supprime les caches et builds

```bash
npm run clean
```

**Supprime** :
- `.next/` (cache Next.js)
- `node_modules/.cache/` (cache npm)
- `.vercel/` (cache Vercel)

**Équivalent** :
```bash
rm -rf .next node_modules/.cache .vercel
```

---

### `npm run clean:all`

**Description** : Supprime tout et réinstalle

```bash
npm run clean:all
```

**Supprime** :
- `.next/`
- `node_modules/`
- `package-lock.json`

**Puis** :
```bash
npm install
```

**⚠️ Usage** : Problèmes de dépendances

---

## 🔧 Utilitaires

### `npm run kill:dev`

**Description** : Tue le processus sur le port 3000

```bash
npm run kill:dev
```

**Équivalent** :
```bash
lsof -ti:3000 | xargs kill -9
```

**Usage** : Port occupé

---

### `npm run kill:sanity`

**Description** : Tue le processus sur le port 3333

```bash
npm run kill:sanity
```

**Équivalent** :
```bash
lsof -ti:3333 | xargs kill -9
```

---

## 📦 Installation

### `npm install`

**Description** : Installe toutes les dépendances

```bash
npm install
```

**Fichiers** :
- `package.json` (input)
- `package-lock.json` (lockfile)
- `node_modules/` (output)

---

### `npm ci`

**Description** : Installation propre (CI/CD)

```bash
npm ci
```

**Différences vs `npm install`** :
- Supprime `node_modules/` d'abord
- Utilise `package-lock.json` exactement
- Plus rapide et déterministe

**Usage** : CI/CD, production

---

## 🔍 Analyse

### `npm run analyze`

**Description** : Analyse la taille du bundle

```bash
npm run analyze
```

**Output** : Rapport interactif (bundle analyzer)

**Configuration** :
```bash
npm install -D @next/bundle-analyzer
```

```javascript
// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

module.exports = withBundleAnalyzer({
  // ...
})
```

**Usage** :
```bash
ANALYZE=true npm run build
```

---

## 📊 Scripts Complets

### `package.json`

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "typecheck": "tsc --noEmit",
    "sanity": "cd sanity && sanity dev",
    "clean": "rm -rf .next node_modules/.cache .vercel",
    "clean:all": "rm -rf .next node_modules package-lock.json && npm install",
    "refresh": "npm run clean && npm run dev",
    "kill:dev": "lsof -ti:3000 | xargs kill -9",
    "kill:sanity": "lsof -ti:3333 | xargs kill -9",
    "analyze": "ANALYZE=true npm run build"
  }
}
```

---

## 🎯 Workflows Communs

### Démarrage Initial

```bash
npm install
npm run dev
```

### Ouvrir Sanity Studio

```bash
npm run sanity
```

### Problème de Port

```bash
npm run kill:dev
npm run dev
```

### Cache Corrompu

```bash
npm run refresh
```

### Avant Commit

```bash
npm run lint
npm run typecheck
npm run build
```

### Problème de Dépendances

```bash
npm run clean:all
```

---

## 🚀 CI/CD

### GitHub Actions

```yaml
name: CI

on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm run build
```

---

### Vercel

Vercel utilise automatiquement :
- **Build** : `npm run build`
- **Install** : `npm install` (ou `npm ci`)
- **Dev** : `npm run dev`

---

## 📚 Références

- **NPM Scripts** : https://docs.npmjs.com/cli/v9/using-npm/scripts
- **Next.js CLI** : https://nextjs.org/docs/app/api-reference/next-cli

---

**Dernière mise à jour** : 2025-12-03
