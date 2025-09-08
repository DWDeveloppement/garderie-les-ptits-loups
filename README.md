# Garderie Les P'tits Loups

Une application web moderne pour la gestion d'une garderie, construite avec Next.js, Radix UI et Sanity CMS.

## Technologies utilisées

- **Next.js 14** - Framework React avec App Router
- **TypeScript** - Typage statique
- **Tailwind CSS** - Framework CSS utilitaire
- **Radix UI** - Composants UI accessibles
- **Sanity** - CMS headless
- **Lucide React** - Icônes

## Installation

1. Clonez le projet et installez les dépendances :
```bash
npm install
```

2. Configurez les variables d'environnement :
   - Copiez `.env.example` vers `.env.local`
   - Remplissez les variables Sanity avec vos vraies valeurs

3. Configurez Sanity :
```bash
# Créez un nouveau projet Sanity sur sanity.io
# Puis ajoutez vos identifiants dans .env.local
```

## Démarrage

### Mode développement
```bash
npm run dev
```

### Studio Sanity
```bash
npm run sanity
```

## Structure du projet

- `/src/app` - Pages Next.js (App Router)
- `/src/components` - Composants React réutilisables
- `/src/lib` - Utilitaires et configuration
- `/sanity` - Configuration et schémas Sanity

## Fonctionnalités

- Interface moderne et responsive
- Gestion des enfants inscrits
- Suivi des activités
- Gestion de l'équipe
- Système d'actualités
- Backend CMS avec Sanity

## Configuration Sanity

Le projet inclut des schémas pour :
- **Enfants** : informations personnelles, allergies, contacts d'urgence
- **Activités** : description, groupe d'âge, matériel nécessaire
- **Équipe** : profils du personnel, qualifications
- **Actualités** : articles et annonces

## Variables d'environnement requises

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```