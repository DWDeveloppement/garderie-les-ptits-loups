# 📁 Vision Query Results

Ce dossier contient les résultats JSON des queries GROQ testées dans **Sanity Vision**.

## 📌 Objectif

Conserver une **référence** de la structure exacte des données retournées par Sanity pour :
- Valider les types TypeScript
- Éviter les erreurs de structure (object vs array)
- Documenter les champs disponibles
- Faciliter le debugging

## 📝 Fichiers

### Pages Secteurs
- `nurserie.json` - Résultat pour La Nurserie
- `trotteurs.json` - Résultat pour Les Trotteurs
- `grands.json` - Résultat pour Les Grands
- `autres-espaces.json` - Résultat pour Les Autres Espaces

### Pages Générales
- `home.json` - Résultat pour la page d'accueil
- `about.json` - Résultat pour la page À propos
- `contact.json` - Résultat pour la page Contact
- `schedule.json` - Résultat pour la page Tarifs

## 🔄 Workflow

1. **Tester la query dans Vision** (`npm run sanity` → Vision)
2. **Copier le résultat JSON**
3. **Créer/Mettre à jour le fichier** correspondant ici
4. **Comparer avec les types TS** du frontend
5. **Ajuster si nécessaire** la query ou le type

## ⚠️ Important

Ces fichiers sont **purement documentaires** :
- ❌ Ne PAS les importer dans le code
- ✅ Les utiliser comme **référence** pour valider les structures
- ✅ Les mettre à jour quand le schema Sanity change

## 📚 Voir aussi

- [Guide Vision Queries](../VISION_QUERIES.md)
- [Sanity Schemas](/sanity/schemas/)
- [GROQ Queries](/lib/sanity/queries/)

