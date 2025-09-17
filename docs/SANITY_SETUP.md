# 🗄️ Configuration Sanity CMS

## 📋 **Variables d'Environnement Requises**

Ajoutez ces variables à votre fichier `.env.local` :

```bash
# ============================================================================
# CONFIGURATION SANITY CMS
# ============================================================================

# Project ID Sanity (obligatoire)
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here

# Dataset Sanity (obligatoire)
NEXT_PUBLIC_SANITY_DATASET=production

# Token API Sanity (optionnel, pour les mutations)
SANITY_API_TOKEN=your_api_token_here

# ============================================================================
# CONFIGURATION DE REVALIDATION
# ============================================================================

# Secret pour la revalidation manuelle
REVALIDATE_SECRET=your_revalidate_secret_here
```

## 🚀 **Étapes de Configuration**

### **1. Créer un Projet Sanity**

```bash
# Installation de Sanity CLI
npm install -g @sanity/cli

# Créer un nouveau projet
sanity init

# Suivre les instructions :
# - Choisir "Create new project"
# - Entrer le nom : "garderie-les-ptits-loups"
# - Choisir le dataset : "production"
# - Choisir le template : "Clean project with no predefined schemas"
```

### **2. Configuration du Studio**

```bash
# Aller dans le dossier du studio
cd studio

# Installer les dépendances
npm install

# Démarrer le studio
npm run dev
```

### **3. Configuration des Schémas**

Créer les schémas dans `studio/schemas/` :

#### **Schéma Prix (`price.ts`)**
```typescript
export default {
  name: 'price',
  title: 'Tarifs',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3
    },
    {
      name: 'prixAuMois',
      title: 'Prix au mois',
      type: 'object',
      fields: [
        {
          name: 'label',
          title: 'Label',
          type: 'string',
          initialValue: 'Prix au mois'
        },
        {
          name: 'journeeComplete',
          title: 'Journée complète',
          type: 'object',
          fields: [
            { name: 'label', type: 'string', initialValue: 'Journée complète' },
            { 
              name: 'items', 
              type: 'array', 
              of: [{ 
                type: 'object',
                fields: [
                  { name: 'description', type: 'string', title: 'Description' },
                  { name: 'price', type: 'string', title: 'Prix' }
                ]
              }]
            }
          ]
        },
        // ... autres champs selon la structure
      ]
    },
    {
      name: 'prixAuJour',
      title: 'Prix au jour',
      type: 'object',
      // Structure similaire
    }
  ]
}
```

#### **Schéma Subvention (`subsidy.ts`)**
```typescript
export default {
  name: 'subsidy',
  title: 'Subvention',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3
    },
    {
      name: 'labelIncomeRange',
      title: 'Label Revenus',
      type: 'string',
      initialValue: 'Revenus'
    },
    {
      name: 'labelReduction',
      title: 'Label Réduction',
      type: 'string',
      initialValue: 'Réduction journalière'
    },
    {
      name: 'items',
      title: 'Items de subvention',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'incomeRange', type: 'string', title: 'Tranche de revenus' },
            { name: 'reductionDaily', type: 'number', title: 'Réduction journalière' }
          ]
        }
      ]
    },
    {
      name: 'order',
      title: 'Ordre d\'affichage',
      type: 'number',
      initialValue: 0
    },
    {
      name: 'isActive',
      title: 'Actif',
      type: 'boolean',
      initialValue: true
    }
  ]
}
```

#### **Schéma Galerie (`gallery.ts`)**
```typescript
export default {
  name: 'gallery',
  title: 'Galerie',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3
    },
    {
      name: 'photos',
      title: 'Photos',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'asset',
              title: 'Image',
              type: 'reference',
              to: [{ type: 'sanity.imageAsset' }],
              validation: Rule => Rule.required()
            },
            {
              name: 'alt',
              title: 'Texte alternatif',
              type: 'string'
            },
            {
              name: 'caption',
              title: 'Légende',
              type: 'string'
            }
          ]
        }
      ]
    },
    {
      name: 'layout',
      title: 'Layout par défaut',
      type: 'string',
      options: {
        list: [
          { title: 'Grille', value: 'grid' },
          { title: 'Masonry', value: 'masonry' }
        ]
      },
      initialValue: 'grid'
    },
    {
      name: 'isPublished',
      title: 'Publié',
      type: 'boolean',
      initialValue: true
    }
  ]
}
```

### **4. Configuration du Studio**

Dans `studio/sanity.config.ts` :

```typescript
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'

import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'garderie-les-ptits-loups',
  title: 'Garderie Les P\'tits Loups',
  
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Contenu')
          .items([
            S.listItem()
              .title('Tarifs')
              .child(S.documentTypeList('price')),
            S.listItem()
              .title('Subventions')
              .child(S.documentTypeList('subsidy')),
            S.listItem()
              .title('Galeries')
              .child(S.documentTypeList('gallery')),
            S.listItem()
              .title('Actualités')
              .child(S.documentTypeList('news')),
            S.listItem()
              .title('Équipe')
              .child(S.documentTypeList('team')),
            S.listItem()
              .title('Horaires')
              .child(S.documentTypeList('schedule')),
            S.listItem()
              .title('Activités')
              .child(S.documentTypeList('activity')),
            S.listItem()
              .title('Structure')
              .child(S.documentTypeList('structure')),
          ])
    }),
    visionTool()
  ],
  
  schema: {
    types: schemaTypes,
  },
})
```

## 🔧 **Commandes Utiles**

```bash
# Démarrer le studio Sanity
cd studio && npm run dev

# Build du studio pour production
cd studio && npm run build

# Générer les types TypeScript
npx sanity typegen generate

# Déployer le studio
cd studio && npm run deploy
```

## 📚 **Ressources**

- [Sanity Documentation](https://www.sanity.io/docs)
- [Sanity Studio Configuration](https://www.sanity.io/docs/studio-configuration)
- [Sanity Schema Types](https://www.sanity.io/docs/schema-types)
- [Sanity Vision Tool](https://www.sanity.io/docs/vision)

---

**Dernière mise à jour :** Décembre 2024  
**Version :** Sanity v3
