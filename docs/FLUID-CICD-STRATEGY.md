# Stratégie CI/CD pour Fluid System

## 📋 Vue d'ensemble

Ce document décrit la stratégie pour réintégrer le système Fluid dans le pipeline CI/CD, permettant :

- ✅ Génération automatique des classes fluid nécessaires
- ✅ Optimisation du CSS (suppression des classes inutilisées)
- ✅ Injection automatique dans les composants
- ✅ Pas de modification manuelle des composants

---

## 1️⃣ Architecture proposée

### Pipeline CI/CD

```
┌─────────────────────────────────────────────────────────┐
│ Build Step 1: Analyse du code                          │
├─────────────────────────────────────────────────────────┤
│ - Scanner les composants pour identifier les besoins    │
│ - Détecter les classes fluid utilisées/implicites      │
│ - Générer un mapping des classes nécessaires            │
│ - Sortie: mapping.json                                  │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│ Build Step 2: Génération Fluid                         │
├─────────────────────────────────────────────────────────┤
│ - Activer les imports fluid dans globals.css            │
│ - Générer uniquement les classes fluid nécessaires      │
│ - Optimiser le CSS (supprimer les inutilisées)         │
│ - Sortie: CSS optimisé avec fluid                      │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│ Build Step 3: Validation                                │
├─────────────────────────────────────────────────────────┤
│ - Tests visuels (screenshots)                           │
│ - Tests de performance (Lighthouse)                    │
│ - Tests de régression                                   │
└─────────────────────────────────────────────────────────┘
```

---

## 2️⃣ Composants nécessaires

### 2.1 Script d'analyse

**Fichier :** `scripts/cicd/analyze-fluid-usage.mjs`

**Fonctionnalités :**

- Scanner `src/` pour détecter les classes fluid utilisées
- Détecter les classes implicites (via `.text-fl-*` qui inclut `leading-fl-*`)
- Générer un mapping JSON des classes nécessaires

**Exemple de sortie :**

```json
{
  "text": ["text-fl-xs", "text-fl-sm", "text-fl-base", "text-fl-lg"],
  "spacing": ["p-fl-md", "space-y-fl-lg", "gap-fl-md"],
  "leading": ["leading-fl-5", "leading-fl-6"]
}
```

### 2.2 Script de génération CSS

**Fichier :** `scripts/cicd/generate-fluid-css.mjs`

**Fonctionnalités :**

- Lire le mapping généré
- Générer uniquement les classes fluid nécessaires
- Optimiser le CSS (supprimer les inutilisées)
- Injecter dans `globals.css`

### 2.3 Script d'optimisation

**Fichier :** `scripts/cicd/optimize-fluid-css.mjs`

**Fonctionnalités :**

- Parser les fichiers CSS fluid
- Comparer avec les classes utilisées
- Supprimer les règles inutilisées
- Gérer les sélecteurs groupés (ex: `.mb-fl-lg, .my-fl-lg`)

---

## 3️⃣ Processus détaillé

### Phase 1 : Analyse (Pre-build)

```bash
# 1. Analyser le code source
node scripts/cicd/analyze-fluid-usage.mjs

# Sortie : mapping.json
{
  "used": ["text-fl-base", "p-fl-md", "space-y-fl-lg"],
  "implicit": ["leading-fl-5"], // Via text-fl-base
  "total": 150 // Classes nécessaires
}
```

### Phase 2 : Activation Fluid

```bash
# 2. Activer les imports fluid dans globals.css
node scripts/cicd/generate-fluid-css.mjs

# Actions :
# - Décommenter les imports fluid dans globals.css
# - Générer uniquement les classes nécessaires
# - Optimiser le CSS
```

### Phase 3 : Build

```bash
# 3. Build normal
npm run build

# Le CSS généré contiendra uniquement :
# - Classes fluid utilisées
# - Classes Tailwind standard
# - CSS optimisé
```

### Phase 4 : Validation

```bash
# 4. Tests de validation
npm run test:visual
npm run test:performance
npm run test:regression
```

---

## 4️⃣ Implémentation technique

### 4.1 Détection des classes utilisées

**Patterns à détecter :**

```javascript
// Classes explicites
className="text-fl-base p-fl-md"

// Classes dans template strings
className={`text-fl-${size}`}

// Classes via variables
const classes = "text-fl-base leading-fl-6"
```

### 4.2 Gestion des sélecteurs groupés

**Problème :**

```css
.mb-fl-lg,
.my-fl-lg {
  margin-bottom: var(--fl-space-lg);
}
```

**Solution :**

- Si `mb-fl-lg` est utilisé → garder la règle
- Si `my-fl-lg` est utilisé → garder la règle
- Si aucune n'est utilisée → supprimer la règle

### 4.3 Optimisation CSS

**Avant :**

```css
/* 948 lignes dans spacing.css */
.mb-fl-lg, .my-fl-lg { ... }
.mb-fl-xl, .my-fl-xl { ... }
/* ... 1000+ règles */
```

**Après :**

```css
/* Seulement les règles utilisées */
.mb-fl-lg, .my-fl-lg { ... }
/* ... 50-100 règles */
```

**Réduction estimée :** 30-40% du CSS

---

## 5️⃣ Configuration CI/CD

### 5.1 GitHub Actions

```yaml
name: Build with Fluid System

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Analyze fluid usage
        run: node scripts/cicd/analyze-fluid-usage.mjs

      - name: Generate fluid CSS
        run: node scripts/cicd/generate-fluid-css.mjs

      - name: Build
        run: npm run build

      - name: Test performance
        run: npm run test:performance
```

### 5.2 Variables d'environnement

```bash
# .env.production
ENABLE_FLUID_SYSTEM=true
FLUID_OPTIMIZE=true
FLUID_ANALYZE_ONLY=false
```

---

## 6️⃣ Avantages de cette approche

### 6.1 Performance

- ✅ **CSS optimisé** : Seulement les classes nécessaires
- ✅ **Bundle réduit** : 30-40% de réduction estimée
- ✅ **Chargement plus rapide** : Moins de CSS à parser

### 6.2 Maintenabilité

- ✅ **Pas de modification manuelle** : Automatique
- ✅ **Flexibilité** : Basculer entre Fluid et Tailwind
- ✅ **Traçabilité** : Mapping JSON pour audit

### 6.3 Développement

- ✅ **Dev simple** : Utiliser Tailwind standard
- ✅ **Prod optimisé** : Fluid automatiquement injecté
- ✅ **Tests** : Validation automatique

---

## 7️⃣ Checklist d'implémentation

### Phase 1 : Préparation

- [ ] Créer `scripts/cicd/` directory
- [ ] Créer `scripts/cicd/analyze-fluid-usage.mjs`
- [ ] Créer `scripts/cicd/generate-fluid-css.mjs`
- [ ] Créer `scripts/cicd/optimize-fluid-css.mjs`

### Phase 2 : Tests

- [ ] Tester l'analyse sur un projet exemple
- [ ] Tester la génération CSS
- [ ] Tester l'optimisation
- [ ] Valider la réduction de taille

### Phase 3 : Intégration

- [ ] Configurer GitHub Actions
- [ ] Ajouter les variables d'environnement
- [ ] Configurer les tests de validation
- [ ] Documenter le processus

### Phase 4 : Déploiement

- [ ] Tester sur un environnement de staging
- [ ] Valider les performances
- [ ] Déployer en production
- [ ] Monitorer les métriques

---

## 8️⃣ Exemple de script

### analyze-fluid-usage.mjs

```javascript
import { readFileSync, writeFileSync } from 'fs';
import { glob } from 'glob';

const files = glob.sync('src/**/*.{tsx,ts,jsx,js}');
const usedClasses = new Set();

files.forEach(file => {
  const content = readFileSync(file, 'utf-8');
  const matches = content.matchAll(/-fl-[\w-]+/g);
  for (const match of matches) {
    usedClasses.add(match[0]);
  }
});

const mapping = {
  used: Array.from(usedClasses),
  timestamp: new Date().toISOString()
};

writeFileSync('mapping.json', JSON.stringify(mapping, null, 2));
console.log(`Found ${usedClasses.size} fluid classes used`);
```

---

## 9️⃣ Références

- **Documentation migration** : `docs/FLUID-TO-TAILWIND-MIGRATION.md`
- **Fichiers Fluid** : `src/styles/fluid/`
- **Mapping des classes** : `docs/LEADING-COMPARISON.md`

---

**Date de création :** $(date)
**Statut :** Planifié pour CI/CD
