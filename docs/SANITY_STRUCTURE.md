# Structure Sanity Studio - Garderie Les P'tits Loups

## 📋 **Organisation des Documents**

### 🔒 **Pages Statiques (Documents Uniques)**
Ces pages ont un **document fixe** avec un ID prédéfini. L'utilisateur ne peut pas créer plusieurs documents de ce type.

| Page | Type | ID du Document | Description |
|------|------|----------------|-------------|
| **Page d'accueil** | `home` | `home-page` | Contenu principal du site |
| **À propos** | `about` | `about-page` | Informations sur la garderie |
| **Contact** | `contact` | `contact-page` | Coordonnées et horaires |
| **Horaires & Tarifs** | `schedule` | `schedule-page` | Tarifs et subventions |

### 📚 **Pages Dynamiques (Documents Multiples)**
Ces pages permettent de créer **plusieurs documents** du même type.

| Page | Type | Description |
|------|------|-------------|
| **La Structure** | `sectors` | Secteurs de la garderie (Nurserie, Trotteurs, etc.) |
| **Espaces** | `spaces` | Différents espaces de la garderie |

## 🏗️ **Structure du Studio**

### Navigation Principale
```
Contenu
├── Page d'accueil (Document unique)
├── À propos (Document unique)
├── Contact (Document unique)
├── Horaires & Tarifs (Document unique)
├── La Structure (Documents multiples)
└── Espaces (Documents multiples)
```

### Comportement dans le Studio

#### Pages Statiques
- **Clic direct** → Ouvre directement le document
- **Pas de liste** → Impossible de créer plusieurs documents
- **ID fixe** → Document toujours accessible avec le même ID

#### Pages Dynamiques
- **Clic** → Affiche la liste des documents existants
- **Bouton "Create"** → Permet de créer de nouveaux documents
- **Filtrage** → Affiche uniquement les documents du type correspondant

## 🔧 **Configuration Technique**

### Structure du Studio (`deskStructure.simple.ts`)
```typescript
// Pages statiques - Documents uniques
S.document()
  .title("Page d'accueil")
  .documentId('home-page')
  .schemaType('home')

// Pages dynamiques - Documents multiples
S.documentList()
  .title('La Structure')
  .filter('_type == "sectors"')

S.documentList()
  .title('Espaces')
  .filter('_type == "spaces"')
```

### Avantages de cette Structure

1. **Simplicité pour l'utilisateur** : Pas de confusion sur le nombre de documents
2. **Sécurité** : Impossible de créer des doublons pour les pages importantes
3. **Performance** : Requêtes plus rapides avec des IDs fixes
4. **Maintenance** : Structure claire et prévisible

## 📝 **Utilisation**

### Pour les Pages Statiques
1. Cliquer sur le nom de la page dans la navigation
2. Le document s'ouvre directement
3. Modifier le contenu selon les besoins
4. Sauvegarder

### Pour les Pages Dynamiques
1. Cliquer sur le nom de la page dans la navigation
2. Voir la liste des documents existants
3. Cliquer sur "Create" pour ajouter un nouveau document
4. Ou cliquer sur un document existant pour le modifier

## 🏢 **Secteurs de la Garderie**

### Structure des Secteurs (`sectors`)
Chaque secteur représente une **tranche d'âge** ou un **groupe spécifique** de la garderie :

#### Champs disponibles :
- **Titre** : Nom du secteur (ex: "Nurserie", "Trotteurs")
- **Slug** : URL-friendly identifier
- **Tranche d'âge** : Ex: "0-24 mois", "24-36 mois"
- **Description** : Présentation du secteur
- **Image hero** : Image principale
- **Contenu détaillé** : Informations complètes
- **Capacité** : Nombre d'enfants maximum
- **Caractéristiques** : Liste des spécificités
- **Équipe** : Membres du personnel assignés
- **Galerie** : Photos du secteur

#### Exemples de secteurs :
- **Nurserie** (0-24 mois)
- **Trotteurs** (24-36 mois)
- **Grands** (3+ ans)
- **Accueil périscolaire**

## 🚀 **Prochaines Étapes**

1. **Créer les documents initiaux** pour les pages statiques
2. **Créer les secteurs** de la garderie
3. **Tester la structure** dans le studio Sanity
4. **Ajouter du contenu** selon les besoins
5. **Configurer les requêtes** dans l'application Next.js
