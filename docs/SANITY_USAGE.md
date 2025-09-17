# Guide d'utilisation du Studio Sanity

## 🎯 Objectif

Ce guide explique comment utiliser le studio Sanity pour gérer le contenu de la garderie "Les P'tits Loups".

## 🚀 Démarrage

### 1. Lancer le studio

```bash
npm run sanity
```

Le studio sera accessible sur `http://localhost:3333`

### 2. Se connecter

- Utilisez vos identifiants Sanity
- Ou créez un compte sur [sanity.io](https://sanity.io)

## 📋 Gestion des documents

### 💰 Tarifs et Subventions

#### Documents de tarifs

1. **Créer un nouveau document de tarifs**
   - Cliquez sur "Documents de tarifs"
   - Cliquez sur "Créer"
   - Remplissez le titre (ex: "Nurserie", "Trotteurs & Grands")

2. **Configurer les tarifs mensuels**
   - Dans "Prix au mois", remplissez le libellé
   - Configurez chaque bloc (journée complète, matinée, etc.)
   - Ajoutez les éléments de prix avec description et montant

3. **Configurer les tarifs journaliers**
   - Dans "Prix au jour", remplissez le libellé
   - Configurez les blocs (journée complète, matinée, après-midi)
   - Ajoutez les éléments de prix

#### Documents de subventions

1. **Créer un nouveau document de subventions**
   - Cliquez sur "Documents de subventions"
   - Cliquez sur "Créer"
   - Remplissez le titre (ex: "Subventions communales")

2. **Configurer les subventions**
   - Remplissez les libellés (tranches de revenus, réductions)
   - Ajoutez les éléments de subvention
   - Pour chaque tranche : revenus et réduction journalière

### 📝 Contenu

#### Actualités

1. **Créer une actualité**
   - Cliquez sur "Actualités"
   - Cliquez sur "Créer"
   - Remplissez le titre, slug, extrait
   - Ajoutez le contenu (texte, images)
   - Définissez la date de publication
   - Cochez "Article en vedette" si nécessaire

#### Activités

1. **Créer une activité**
   - Cliquez sur "Activités"
   - Cliquez sur "Créer"
   - Remplissez le titre, description
   - Sélectionnez le groupe d'âge
   - Ajoutez la durée en minutes
   - Liste du matériel nécessaire
   - Ajoutez des photos

#### Équipe

1. **Ajouter un membre de l'équipe**
   - Cliquez sur "Équipe"
   - Cliquez sur "Créer"
   - Remplissez le prénom, nom, poste
   - Ajoutez une photo
   - Rédigez la biographie
   - Liste des qualifications

## 🔍 Outil Vision (GROQ)

### Accès à l'outil

1. Cliquez sur l'icône "Vision" dans la barre latérale
2. Ou utilisez le raccourci clavier `Ctrl/Cmd + Shift + V`

### Requêtes utiles

#### Récupérer tous les tarifs
```groq
*[_type == "priceDocument"] {
  _id,
  title,
  prixAuMois,
  prixAuJour
}
```

#### Récupérer toutes les subventions
```groq
*[_type == "subsidiesDocument"] {
  _id,
  title,
  items[] {
    incomeRange,
    reductionDaily
  }
}
```

#### Récupérer les actualités récentes
```groq
*[_type == "news"] | order(publishedAt desc) [0...5] {
  title,
  slug,
  excerpt,
  publishedAt
}
```

#### Récupérer les activités par groupe d'âge
```groq
*[_type == "activity" && ageGroup == "2-3"] {
  title,
  description,
  duration
}
```

## 📊 Statistiques

### Vérifier le nombre de documents

```groq
{
  "tarifs": count(*[_type == "priceDocument"]),
  "subventions": count(*[_type == "subsidiesDocument"]),
  "actualites": count(*[_type == "news"]),
  "activites": count(*[_type == "activity"]),
  "equipe": count(*[_type == "staff"])
}
```

## 🎨 Personnalisation

### Structure du studio

La structure du studio est définie dans `sanity/deskStructure.ts` :

- **Tarifs et Subventions** : Section dédiée aux documents financiers
- **Contenu** : Section pour les actualités, activités et équipe
- **Tous les documents** : Vue d'ensemble de tous les documents

### Schémas

Les schémas sont définis dans `sanity/schema.ts` :

- `priceDocument` : Documents de tarifs
- `subsidiesDocument` : Documents de subventions
- `news` : Actualités
- `activity` : Activités
- `staff` : Équipe

## 🔧 Maintenance

### Sauvegarde

- Sanity sauvegarde automatiquement vos modifications
- Utilisez l'historique des versions pour revenir en arrière

### Déploiement

```bash
# Construire le studio
npm run sanity:build

# Déployer le studio
npm run sanity:deploy
```

## 🆘 Dépannage

### Problèmes courants

1. **Studio ne se lance pas**
   - Vérifiez les variables d'environnement
   - Vérifiez la connexion internet

2. **Documents ne s'affichent pas**
   - Vérifiez les requêtes GROQ
   - Vérifiez les permissions

3. **Erreurs de validation**
   - Vérifiez que tous les champs obligatoires sont remplis
   - Vérifiez les types de données

### Support

- Documentation Sanity : [sanity.io/docs](https://sanity.io/docs)
- Communauté : [sanity.io/community](https://sanity.io/community)
- Support technique : [sanity.io/support](https://sanity.io/support)
