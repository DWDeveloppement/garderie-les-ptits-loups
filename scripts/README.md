# 🛠️ Scripts Utilitaires

Scripts Node.js et Bash pour la maintenance du projet.

## 📁 Structure

```md
scripts/
├── clean/          # Nettoyage Sanity
├── tests/          # Performance & Lighthouse
├── tools/          # Utilitaires système
└── README.md
```

---

## 🧹 Scripts de Nettoyage Sanity (`clean/`)

### `npm run cleanup:media`

Supprime les médias inutilisés dans Sanity.

### `npm run verify:assets`

Vérifie les assets supprimés.

### `npm run fix:orphans`

Corrige les références orphelines dans Sanity.

### `npm run cleanup:sanity-cache`

Nettoie le cache local de Sanity.

### `npm run delete:draft-assets`

Supprime les brouillons et assets associés.

---

## 📊 Scripts de Tests (`tests/`)

### `npm run perf`

Mesure les performances des requêtes Sanity.

### `npm run lighthouse`

Lance une analyse Lighthouse.

### `npm run lighthouse:analyze`

Analyse le rapport Lighthouse généré.

---

## 🔧 Outils Système (`tools/`)

### `npm run kill:dev`

Tue les processus sur les ports 3000 et 3333 (dev + Sanity).

### `npm run kill:prod`

Tue les processus sur le port 3100 (production locale).

### `npm run kill:all`

Tue les processus sur tous les ports (3000, 3100, 3333).

---

## 📋 Récapitulatif des Commandes

| Commande                       | Description                    |
| ------------------------------ | ------------------------------ |
| `npm run cleanup:media`        | Nettoyer médias Sanity         |
| `npm run verify:assets`        | Vérifier assets                |
| `npm run fix:orphans`          | Corriger références orphelines |
| `npm run cleanup:sanity-cache` | Vider cache Sanity             |
| `npm run delete:draft-assets`  | Supprimer brouillons           |
| `npm run perf`                 | Test performance               |
| `npm run lighthouse`           | Lancer Lighthouse              |
| `npm run lighthouse:analyze`   | Analyser rapport               |
| `npm run kill:dev`             | Tuer ports dev                 |
| `npm run kill:prod`            | Tuer port prod                 |
| `npm run kill:all`             | Tuer tous les ports            |
