# Scripts d'Accessibilité

## 🎯 Organisation des Scripts

### **📋 Scripts d'Accessibilité (a11y:)**

#### **`npm run a11y:test`**
- **Description** : Tests d'accessibilité manuels structurés
- **Usage** : Guide étape par étape pour tester l'accessibilité
- **Cible** : Tests visuels, clavier, lecteurs d'écran

#### **`npm run a11y:report`**
- **Description** : Génère un rapport de test d'accessibilité
- **Usage** : Checklist et critères de validation
- **Cible** : Documentation des tests effectués

#### **`npm run a11y:lighthouse`**
- **Description** : Analyse le rapport Lighthouse pour l'accessibilité
- **Usage** : Extrait les violations et scores d'accessibilité
- **Cible** : Rapport Lighthouse (lightouse.json)

#### **`npm run a11y:buttons`**
- **Description** : Vérifie l'accessibilité des boutons
- **Usage** : Détecte les boutons sans labels accessibles
- **Cible** : Boutons icon et boutons sans contenu

## 🚀 Workflow d'Accessibilité

### **1. Tests Automatiques**
```bash
# Analyser le rapport Lighthouse
npm run a11y:lighthouse

# Vérifier les boutons
npm run a11y:buttons
```

### **2. Tests Manuels**
```bash
# Lancer les tests manuels
npm run a11y:test

# Générer un rapport
npm run a11y:report
```

### **3. Correction des Problèmes**
1. **Boutons sans labels** → Ajouter `aria-label`
2. **Contraste insuffisant** → Ajuster les couleurs
3. **Navigation clavier** → Tester Tab/Enter/Space
4. **Lecteurs d'écran** → Tester avec NVDA/VoiceOver

## 📊 Métriques Cibles

### **Lighthouse Accessibility**
- **Score cible** : 95/100 minimum
- **Violations** : 0 violation critique
- **Avertissements** : 0 avertissement

### **Boutons Accessibles**
- **Tous les boutons** ont des labels accessibles
- **Boutons icon** ont des `aria-label`
- **Navigation clavier** fonctionne

### **Contraste des Couleurs**
- **Ratio minimum** : 4.5:1 (AA)
- **Ratio recommandé** : 7:1 (AAA)
- **Tous les textes** sont lisibles

## 🔧 Scripts Techniques

### **Structure des Scripts**
```
scripts/
├── clesn/                          # Scripts de nettoyage
│   └── cleanup-unused-media.mjs
├── fix/                           # Scripts de correction
│   ├── fix-page.mjs
│   ├── fix-prices-types.mjs
│   └── check-button-accessibility.mjs
├── tests/                         # Scripts de test
│   ├── test-accessibility-simple.mjs
│   └── analyze-lighthouse.mjs
├── tools/                         # Outils utilitaires
│   └── kill-ports.sh
└── README.md                      # Documentation
```

### **Dépendances**
- **Node.js** : Scripts ES modules
- **Lighthouse** : Rapport d'accessibilité
- **Axe-core** : Tests d'accessibilité automatiques

## 📝 Notes d'Usage

### **Avant de Commencer**
1. Démarrer le serveur : `npm run dev`
2. Ouvrir http://localhost:3000/example
3. Lancer Lighthouse (F12 → Lighthouse)

### **Après les Corrections**
1. Relancer Lighthouse
2. Exporter le rapport (lightouse.json)
3. Analyser avec `npm run a11y:lighthouse`
4. Vérifier les boutons avec `npm run a11y:buttons`

### **Tests Finaux**
1. Tests manuels complets
2. Navigation clavier
3. Lecteur d'écran
4. Tests responsive
5. Validation finale
