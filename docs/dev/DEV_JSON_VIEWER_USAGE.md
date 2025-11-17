# 🛠️ DevJsonViewer : Guide d'utilisation

## 📋 Vue d'ensemble

Le `<DevJsonViewer>` est un outil de développement qui affiche les données JSON de chaque page en bas de l'écran.

**Visible uniquement en développement (NODE_ENV !== 'production')**

---

## ✨ Features

- ✅ **Panel fixe en bas** : toujours accessible
- ✅ **Collapse/Expand** : toggle d'affichage
- ✅ **Copy JSON** : copier les données dans le clipboard
- ✅ **Slug display** : identification claire de la page
- ✅ **Key count** : nombre de propriétés affichées
- ✅ **Auto-hide en production** : invisible après build

---

## 🎯 Utilisation

### Syntaxe de base

```tsx
import { DevJsonViewer } from '@/components/dev'

<DevJsonViewer data={pageData} slug="nurserie" />
```

### Props

| Prop | Type | Requis | Description |
|------|------|--------|-------------|
| `data` | `unknown` | ✅ | Données à afficher (objet, array, etc.) |
| `slug` | `string` | ❌ | Slug de la page (ex: `"nurserie"`, `"home"`) |
| `title` | `string` | ❌ | Titre custom (par défaut: `/${slug}`) |
| `collapsed` | `boolean` | ❌ | Panel fermé au chargement (défaut: `true`) |

---

## 📝 Exemples d'intégration

### Page Statique (ex: `/`)

```tsx
// src/app/page.tsx
import { DevJsonViewer } from '@/components/dev'

export default function HomePage() {
  const data = { ... } // Données de la page
  
  return (
    <>
      {/* Contenu de la page */}
      
      <DevJsonViewer data={data} slug="home" collapsed />
    </>
  )
}
```

### Page Dynamique (ex: `/la-structure/[slug]`)

```tsx
// src/app/la-structure/[slug]/page.tsx
import { DevJsonViewer } from '@/components/dev'

export default async function StructurePage({ params }) {
  const { slug } = await params
  const data = await fetchSectorPage(slug)
  
  return (
    <>
      {/* Contenu de la page */}
      
      <DevJsonViewer data={data} slug={`la-structure/${slug}`} collapsed />
    </>
  )
}
```

### Page avec titre custom

```tsx
<DevJsonViewer 
  data={pageData} 
  slug="about" 
  title="Page À propos" 
  collapsed={false}  // Ouvert par défaut
/>
```

---

## 🗺️ Checklist : Ajouter sur toutes les pages

### Pages principales (statiques)
- [ ] `/` → `slug="home"`
- [ ] `/a-propos` → `slug="a-propos"`
- [ ] `/contact` → `slug="contact"`
- [ ] `/tarifs` → `slug="tarifs"`

### Pages dynamiques
- [x] `/la-structure/[slug]` → `slug="la-structure/{slug}"`
- [ ] `/espaces/[slug]` → `slug="espaces/{slug}"`

---

## 🎨 Apparence

### Header
```
┌─────────────────────────────────────────────────────────┐
│ [DEV] /la-structure/nurserie [nurserie] (15 keys)      │
│                              [📋 Copy] [▼ Hide]         │
└─────────────────────────────────────────────────────────┘
```

- **Badge jaune `DEV`** : indicateur dev
- **Badge bleu `slug`** : slug de la page (si fourni)
- **Font mono** : police monospace pour lisibilité
- **Key count** : nombre de propriétés dans l'objet

### Panel JSON
```json
{
  "_id": "nurserie",
  "title": "La Nurserie",
  "slug": "nurserie",
  "sectionHero": { ... },
  ...
}
```

---

## 🔧 Workflow : Vision → DevJsonViewer

### 1. Tester la query dans Vision
```bash
npm run sanity  # Ouvrir Studio → Vision
```

### 2. Copier le résultat JSON
Cliquer sur **"Copy"** dans Vision

### 3. Vérifier avec DevJsonViewer
Ouvrir la page dans le navigateur → Voir le JSON en bas

### 4. Comparer les structures
- Vision JSON → Structure attendue
- DevJsonViewer → Structure reçue
- Ajuster les types si différence

---

## 📊 Exemple de debug

### Problème : `gallery` est `undefined`

**Vision (attendu) :**
```json
{
  "gallery": [
    { "image": {...}, "label": "..." },
    { "image": {...}, "label": "..." }
  ]
}
```

**DevJsonViewer (reçu) :**
```json
{
  "gallery": null
}
```

**Solution :** Vérifier la query GROQ pour `gallery[]`

---

## ⚡ Tips

### 1. **Toujours commencer fermé** (`collapsed={true}`)
Le panel ne gêne pas la visualisation de la page

### 2. **Utiliser le slug complet** pour les pages dynamiques
```tsx
// Bon ✅
slug="la-structure/nurserie"

// Moins clair ❌
slug="nurserie"
```

### 3. **Ajouter dès le début du développement**
Gain de temps énorme en debugging

### 4. **Copy JSON pour Vision**
Comparer facilement Vision ↔ Frontend

---

## 🚫 Ce qu'il NE faut PAS faire

❌ **Oublier de l'ajouter en dev**
```tsx
// Mauvais : pas de DevJsonViewer
export default function Page() {
  return <div>...</div>
}
```

❌ **L'afficher en production**
Le composant s'auto-hide, mais éviter de l'oublier dans le code

❌ **Passer des données sensibles**
Ne JAMAIS passer de tokens, passwords, etc.

---

## 📚 Voir aussi

- [VISION_QUERIES.md](./VISION_QUERIES.md) - Guide queries Vision
- [DevJsonViewer.tsx](/src/components/dev/DevJsonViewer.tsx) - Code source

---

## 🎯 Résumé

```tsx
// 1 ligne à ajouter en bas de chaque page :
<DevJsonViewer data={pageData} slug="page-slug" collapsed />
```

✅ **Résultat :** Zero erreur de structure + Debug ultra-rapide !

