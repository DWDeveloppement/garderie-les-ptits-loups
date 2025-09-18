# 🔗 Système de Référence Médiathèque-Images

## 🎯 Vue d'ensemble

Ce système protège contre la suppression incorrecte des médias en vérifiant les références avant toute suppression et en fournissant des outils de gestion avancés.

## 🛡️ Protection contre suppression

### Principe
- **Vérification automatique** des références avant suppression
- **Alerte utilisateur** si le média est utilisé ailleurs
- **Liste des références** pour guider l'utilisateur
- **Prévention** des erreurs de suppression

### Implémentation
```typescript
// Plugin de protection
const deleteWithReferenceCheck: DocumentActionComponent = (props) => {
  // Vérifier les références
  const references = await checkMediaReferences(id, client)
  
  if (references.length > 0) {
    // Afficher alerte avec liste des références
    showAlert(`Impossible de supprimer: utilisé dans ${references.length} document(s)`)
    return
  }
  
  // Procéder à la suppression si pas de références
  await client.delete(id)
}
```

## 📊 Dashboard des médias

### Statistiques disponibles
- **Total des médias** : Nombre total de médias
- **Médias utilisés** : Médias référencés dans d'autres documents
- **Médias non utilisés** : Médias orphelins
- **Avec alt text** : Médias accessibles
- **Sans alt text** : Médias nécessitant une attention

### Interface
```typescript
<MediaDashboard />
// Affiche:
// - Statistiques en temps réel
// - Badges colorés selon l'état
// - Actions rapides
```

## 📁 Liste des médias

### Fonctionnalités
- **Filtres** : Tous, Non utilisés, Sans alt text
- **Informations** : Alt text, légende, crédit, références
- **Preview** : Image miniature avec métadonnées
- **Références** : Liste des documents utilisant le média

### Interface
```typescript
<MediaList />
// Affiche:
// - Grille des médias avec preview
// - Badges d'état (références, alt text, crédit)
// - Liste des références pour chaque média
```

## 🔍 Validation des champs

### Validations automatiques
```typescript
// Alt text obligatoire
validateAltText: (Rule) => Rule.required().max(125)

// Vérification de l'existence du média
validateMediaReference: (Rule) => Rule.custom(async (value, context) => {
  const media = await client.fetch(`*[_id == $mediaId][0]`, { mediaId })
  if (!media) return 'Le média référencé n\'existe plus'
  return true
})

// Cohérence des métadonnées
validateMetadataConsistency: (Rule) => Rule.custom((value) => {
  if (value.caption && !value.alt) {
    return 'Si une légende est fournie, le texte alternatif est obligatoire'
  }
  return true
})
```

## 🧹 Script de nettoyage

### Utilisation
```bash
# Mode dry-run (recommandé)
node scripts/cleanup-unused-media.js

# Suppression réelle
node scripts/cleanup-unused-media.js --delete

# Voir les médias sans alt text
node scripts/cleanup-unused-media.js --alt
```

### Fonctionnalités
- **Détection** des médias non utilisés
- **Vérification** des références
- **Mode dry-run** pour sécurité
- **Suppression** sécurisée avec confirmation
- **Rapport** détaillé des actions

## 🔧 Configuration

### Plugins activés
```typescript
// sanity.config.ts
plugins: [
  media(),                    // Gestion des médias
  mediaReferencePlugin(),    // Protection contre suppression
]
```

### Composants enregistrés
```typescript
components: {
  MediaDashboard,  // Dashboard des statistiques
  MediaList,       // Liste avec filtres
}
```

## 📋 Workflow recommandé

### 1. Upload de médias
1. **Upload** dans la médiathèque
2. **Remplir** alt text obligatoire
3. **Ajouter** légende et crédit si nécessaire
4. **Catégoriser** et tagger

### 2. Utilisation dans les pages
1. **Référencer** depuis la médiathèque
2. **Override** alt text si contexte différent
3. **Ajouter** légende spécifique si nécessaire
4. **Vérifier** la cohérence des métadonnées

### 3. Maintenance
1. **Consulter** le dashboard régulièrement
2. **Identifier** les médias non utilisés
3. **Corriger** les médias sans alt text
4. **Nettoyer** avec le script si nécessaire

## 🚨 Gestion des erreurs

### Médias introuvables
- **Détection** automatique lors de la validation
- **Alerte** utilisateur avec message clair
- **Suggestion** de sélectionner un autre média

### Références cassées
- **Vérification** lors de l'ouverture des documents
- **Affichage** d'un message d'erreur
- **Possibilité** de corriger la référence

### Suppression bloquée
- **Explication** claire du problème
- **Liste** des documents utilisant le média
- **Guidance** pour résoudre le problème

## 📈 Métriques et monitoring

### KPIs à suivre
- **Taux d'utilisation** des médias
- **Médias sans alt text** (accessibilité)
- **Médias orphelins** (stockage)
- **Erreurs de référence** (intégrité)

### Alertes
- **Médias non utilisés** > 10%
- **Médias sans alt text** > 5%
- **Erreurs de référence** > 0
- **Taille médiathèque** > limite

## 🔄 Migration et maintenance

### Migration depuis WordPress
1. **Import** des médias originaux uniquement
2. **Génération** des variantes selon usage
3. **Vérification** des références
4. **Nettoyage** des doublons

### Maintenance régulière
- **Audit** mensuel des médias non utilisés
- **Vérification** trimestrielle des alt texts
- **Nettoyage** semestriel avec le script
- **Backup** avant nettoyage important

---

*Système de référence médiathèque-images - Version 1.0*
*Protection contre suppression incorrecte et gestion avancée des médias*
