# 📁 Sanity Queries Organization

## 📌 Structure

```
sanity/queries/
├── groq/              # Queries GROQ (à copier dans Vision)
│   └── sectorpage.groq
└── json-response/     # Résultats JSON de Vision (référence)
    └── sectorPage.json
```

---

## 🎯 Objectif

Centraliser les **queries GROQ** et leurs **résultats JSON** pour :
- ✅ Valider les structures de données
- ✅ Synchroniser Backend (Sanity) ↔ Frontend (Next.js)
- ✅ Éviter les erreurs de typage
- ✅ Documenter les champs disponibles
- ✅ Faciliter le debugging

---

## 🔄 Workflow

### 1️⃣ **Créer/Modifier une query GROQ**

```bash
# Créer une nouvelle query
touch sanity/queries/groq/home.groq

# Éditer la query
# Copier le contenu dans Sanity Vision pour tester
```

### 2️⃣ **Tester dans Sanity Vision**

```bash
npm run sanity
```

1. Ouvrir **Vision** dans le Studio
2. Copier le contenu du fichier `.groq`
3. Exécuter la query
4. Vérifier le résultat

### 3️⃣ **Sauvegarder le résultat JSON**

```bash
# Copier le résultat depuis Vision
# Créer le fichier JSON correspondant
touch sanity/queries/json-response/home.json

# Coller le résultat JSON
```

### 4️⃣ **Mettre à jour les types TypeScript**

Comparer le JSON avec les types dans le frontend :

```tsx
// src/components/pages/home/HomePage.tsx

export interface HomePageData {
  // Structure EXACTE du JSON
  _id: string
  title: string
  // ...
}
```

### 5️⃣ **Porter la query dans le code**

```ts
// lib/sanity/queries/home.ts

import { groq } from 'next-sanity'
import { sanityFetch } from '../client'

export const HOME_QUERY = groq`
  // Copier le contenu du fichier .groq
`

export async function fetchHome() {
  return sanityFetch(HOME_QUERY, {}, { tag: 'home-page' })
}
```

---

## 📝 Convention de nommage

### Fichiers GROQ
- Format : `{pageName}.groq` (camelCase)
- Exemples : `home.groq`, `sectorpage.groq`, `contactPage.groq`

### Fichiers JSON
- Format : `{pageName}.json` (camelCase)
- **DOIT correspondre** au nom du fichier `.groq`
- Exemples : `home.json`, `sectorPage.json`, `contactPage.json`

---

## 🗂️ Organisation par page

### Pages principales (statiques)
- `home.groq` + `home.json` → Page d'accueil
- `aboutPage.groq` + `aboutPage.json` → Page À propos
- `contactPage.groq` + `contactPage.json` → Page Contact
- `schedulePage.groq` + `schedulePage.json` → Page Tarifs

### Pages dynamiques
- `sectorpage.groq` + `sectorPage.json` → Pages secteurs
- `spacePage.groq` + `spacePage.json` → Pages espaces

---

## ✅ Checklist pour une nouvelle query

- [ ] Créer le fichier `.groq` dans `groq/`
- [ ] Tester la query dans Vision
- [ ] Vérifier que tous les champs requis sont présents
- [ ] Copier le résultat JSON dans `json-response/`
- [ ] Créer/Mettre à jour les types TypeScript
- [ ] Porter la query dans `lib/sanity/queries/`
- [ ] Tester avec `<DevJsonViewer>` en dev

---

## 🚨 Important

### ⚠️ Fichiers `.groq` ne sont PAS importés
Les fichiers `.groq` sont **purement documentaires**. Ils servent à :
- Documenter la query
- Copier/coller dans Vision pour tests
- Référence pour le code

**NE PAS** essayer de les importer directement.

### ✅ Bonne pratique
```ts
// ❌ Mauvais
import query from 'sanity/queries/groq/home.groq'

// ✅ Bon
export const HOME_QUERY = groq`
  // Contenu copié depuis home.groq
`
```

---

## 📊 Exemple complet : SectorPage

### 1. Query GROQ
**Fichier :** `sanity/queries/groq/sectorpage.groq`

```groq
*[_type == "sectorPage" && _id == "nurserie"][0]{
  _id,
  title,
  "slug": devConfig.slug.current,
  sectionHero{...},
  linkedSpaces[]->{...},
  // ...
}
```

### 2. Résultat JSON
**Fichier :** `sanity/queries/json-response/sectorPage.json`

```json
{
  "_id": "nurserie",
  "title": "La Nurserie",
  "slug": "nurserie",
  "sectionHero": {...},
  "linkedSpaces": [...]
}
```

### 3. Types TypeScript
**Fichier :** `src/components/pages/sector/SectorPage.tsx`

```tsx
export interface SectorPageData {
  _id: string
  title: string
  slug: string | null
  sectionHero?: {
    image?: SanityImageWithMetadata
    description?: string
  }
  linkedSpaces?: LinkedSpace[]
  // ...
}
```

### 4. Query dans le code
**Fichier :** `lib/sanity/queries/sectors.ts`

```ts
export const SECTOR_PAGE_QUERY = groq`
  // Contenu copié depuis sectorpage.groq
`
```

---

## 🛠️ Outils de debug

### DevJsonViewer
Intégré sur chaque page en dev :

```tsx
<DevJsonViewer data={pageData} slug="page-slug" collapsed />
```

Affiche le JSON en bas de page pour comparer avec le résultat Vision.

### Comparaison Vision ↔ DevJsonViewer

1. **Vision** : Structure attendue (backend)
2. **DevJsonViewer** : Structure reçue (frontend)
3. **Comparer** : Identifier les différences
4. **Ajuster** : Corriger la query ou les types

---

## 📚 Voir aussi

- [VISION_QUERIES.md](/docs/dev/VISION_QUERIES.md) - Guide Vision
- [DEV_JSON_VIEWER_USAGE.md](/docs/dev/DEV_JSON_VIEWER_USAGE.md) - Guide DevJsonViewer
- [Sanity Schemas](/sanity/schemas/) - Définitions des schemas
- [GROQ Reference](https://www.sanity.io/docs/groq)

---

## 🎯 Résumé

```
.groq (doc) → Vision (test) → .json (ref) → Types TS → Code
```

✅ **Résultat :** Zero bug de structure + Types exacts + Doc à jour !

