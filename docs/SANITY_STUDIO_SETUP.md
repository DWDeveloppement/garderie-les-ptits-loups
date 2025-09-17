# Configuration du Studio Sanity

## 🚀 Démarrage rapide

### 1. Configuration des variables d'environnement

Créez un fichier `.env.local` à la racine du projet avec :

```env
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production

# Resend Configuration
RESEND_API_KEY=your-resend-api-key

# reCAPTCHA Configuration
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-recaptcha-site-key
RECAPTCHA_SECRET_KEY=your-recaptcha-secret-key
```

### 2. Installation des dépendances Sanity

```bash
npm install sanity @sanity/client @sanity/image-url @sanity/vision
```

### 3. Lancement du studio Sanity

```bash
npm run sanity
```

Le studio sera accessible sur `http://localhost:3333`

## 📋 Structure du Studio

### Organisation des documents

Le studio est organisé en sections :

#### 💰 Tarifs et Subventions
- **Documents de tarifs** : Gestion des tarifs mensuels et journaliers
- **Documents de subventions** : Gestion des subventions communales

#### 📝 Contenu
- **Actualités** : Articles et nouvelles
- **Activités** : Activités proposées aux enfants
- **Équipe** : Membres du personnel

## 🏗️ Schémas disponibles

### priceDocument
Document principal pour les tarifs avec :
- `title` : Titre du document
- `prixAuMois` : Section tarifs mensuels
- `prixAuJour` : Section tarifs journaliers

### subsidiesDocument
Document pour les subventions avec :
- `title` : Titre du document
- `labelIncomeRange` : Libellé pour les tranches de revenus
- `labelReduction` : Libellé pour les réductions
- `items` : Liste des tranches de revenus et réductions

### pricingSection
Section de tarification avec :
- `label` : Libellé de la section
- Blocs de tarification (journée complète, matinée, etc.)

### pricingBlock
Bloc de tarification avec :
- `label` : Libellé du bloc
- `items` : Liste des éléments de prix

### priceItem
Élément de prix avec :
- `description` : Description du service
- `price` : Prix en CHF

### subsidyItem
Élément de subvention avec :
- `incomeRange` : Tranche de revenus
- `reductionDaily` : Réduction journalière en CHF

## 🔧 Commandes utiles

```bash
# Lancer le studio en développement
npm run sanity

# Construire le studio pour la production
npm run sanity:build

# Déployer le studio
npm run sanity:deploy
```

## 📝 Notes importantes

1. **Structure personnalisée** : Le studio utilise une structure personnalisée définie dans `sanity/deskStructure.ts`
2. **Validation** : Tous les champs obligatoires sont validés
3. **Types** : Les schémas sont typés avec TypeScript
4. **Vision Tool** : Outil de requêtes GROQ intégré pour tester les queries

## 🎯 Prochaines étapes

1. Créer un projet Sanity sur [sanity.io](https://sanity.io)
2. Configurer les variables d'environnement
3. Lancer le studio et créer les premiers documents
4. Tester les queries avec l'outil Vision
5. Intégrer les données dans l'application Next.js
