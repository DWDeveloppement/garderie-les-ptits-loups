# 🔍 Guide : Tester les queries GROQ avec Sanity Vision

## Pourquoi utiliser Vision ?

**Vision** est l'outil intégré dans Sanity Studio pour tester et valider les queries GROQ en temps réel.

### Avantages :
- ✅ **Voir la structure exacte** des données retournées
- ✅ **Éviter les erreurs de typage** (object vs array)
- ✅ **Valider les noms de champs** (name dans Sanity)
- ✅ **Tester les filtres** et les références
- ✅ **Réduire le debugging** en frontend

---

## 🚀 Accéder à Vision

### Option 1 : Via le Studio local
```bash
npm run sanity
```
Puis dans le menu : **Vision** (icône 🔍)

### Option 2 : Via Sanity.io
```
https://garderie-les-ptits-loups.sanity.studio/vision
```

---

## 📝 Tester la Query SectorPage

### Query complète pour un secteur :

```groq
*[_type == "sectorPage" && _id == "nurserie"][0]{
  _id,
  title,
  "slug": devConfig.slug.current,
  
  // Hero
  sectionHero{
    image{
      asset->{
        _id,
        url,
        metadata{
          dimensions,
          lqip,
          blurhash
        }
      },
      alt,
      hotspot,
      crop
    },
    description
  },
  
  // Espaces liés (populate avec ->)
  linkedSpaces[]->{
    _id,
    title,
    description,
    image{
      asset->{
        _id,
        url,
        metadata{
          dimensions,
          lqip
        }
      },
      alt
    }
  },
  
  // Image parallaxe
  parallax{
    image{
      asset->{
        _id,
        url,
        metadata{
          dimensions,
          lqip
        }
      },
      alt
    }
  },
  
  // Contenu rich-text
  content,
  
  // Galerie
  gallery[]{
    image{
      asset->{
        _id,
        url,
        metadata{
          dimensions,
          lqip,
          blurhash
        }
      },
      alt,
      hotspot,
      crop
    },
    label
  },
  
  // SEO
  seo{
    metaTitle,
    metaDescription,
    keywords,
    shareImage{
      asset->{
        url,
        metadata{
          dimensions
        }
      },
      alt
    }
  }
}
```

### Variables à tester :
- `_id == "nurserie"`
- `_id == "trotteurs"`
- `_id == "grands"`
- `_id == "autres-espaces"`

---

## 🎯 Checklist de validation

Après avoir exécuté la query dans Vision, vérifier :

### Structure générale
- [ ] La query retourne un **objet** (pas un array)
- [ ] Tous les champs requis sont présents
- [ ] Les références (`->`) sont bien populées

### Images
- [ ] `asset` contient `url`, `_id`
- [ ] `metadata` contient `dimensions`, `lqip`
- [ ] `alt` est présent (ou `null`)

### Gallery
- [ ] `gallery` est un **array** d'objets
- [ ] Chaque item a `image` + `label`
- [ ] `image.asset` est bien populé

### linkedSpaces
- [ ] `linkedSpaces` est un **array**
- [ ] Chaque espace a `_id`, `title`, `image`
- [ ] Les images sont bien populées

---

## 🔧 Intégration dans le code

### 1. Copier le résultat de Vision

Dans Vision, cliquer sur **"Copy"** pour copier le JSON résultat.

### 2. Créer un fichier de test

```bash
touch docs/dev/vision-results/nurserie.json
```

Coller le résultat pour référence.

### 3. Mettre à jour le type TypeScript

Comparer le résultat avec `SectorPageData` dans `src/components/pages/sector/SectorPage.tsx`

### 4. Ajuster la query dans `lib/sanity/queries/sectors.ts`

Si la structure ne correspond pas, ajuster la query GROQ.

---

## 🐛 Debug avec DevJsonViewer

Le composant `<DevJsonViewer>` affiche les données en bas de page (dev only).

### Utilisation dans SectorPage :

```tsx
import { DevJsonViewer } from '@/components/dev'

export function SectorPage({ data }: SectorPageProps) {
  return (
    <>
      {/* ... contenu de la page ... */}
      
      <DevJsonViewer data={data} title="Sector Page Data" />
    </>
  )
}
```

### Features :
- **Collapse/Expand** : Afficher/Masquer le JSON
- **Copy** : Copier le JSON dans le clipboard
- **Auto-hide en production** : Invisible en build production

---

## 📚 Ressources

- [GROQ Cheat Sheet](https://www.sanity.io/docs/query-cheat-sheet)
- [GROQ Reference](https://www.sanity.io/docs/groq)
- [Vision Guide](https://www.sanity.io/docs/the-vision-plugin)

---

## ⚡ Workflow recommandé

1. **Écrire la query dans Vision** → Valider le résultat
2. **Copier le résultat JSON** → Créer le fichier de référence
3. **Mettre à jour le type TS** → Aligner avec le JSON
4. **Porter la query dans le code** → `lib/sanity/queries/sectors.ts`
5. **Tester avec DevJsonViewer** → Vérifier que les données correspondent

✅ **Résultat : Zero bug de structure de données !**

