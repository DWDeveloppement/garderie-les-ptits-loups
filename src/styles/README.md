# Styles - Ce qu'on utilise réellement

Ce dossier contient uniquement les styles utilisés dans l'application.

## 📁 Structure

```
src/styles/
├── palette.css           # Palette couleurs Radix UI custom
├── fonts.css             # Configuration fonts (Open Sans + Chelsea Market)
├── fluid-variables.css   # Variables fluid (copié depuis vendor/)
├── fluid-selected.css    # Classes fluid sélectionnées
└── README.md             # Cette documentation
```

## 🎯 Principe

- **`src/styles/`** → Ce qu'on utilise (importé dans l'app)
- **`vendor/`** → Source de vérité (jamais importé)

## 🔧 Maintenance

### **Pour ajouter des variables fluid :**
1. Modifier `vendor/fluid-system/variables/fluid-variables.css` (source)
2. Copier vers `src/styles/fluid-variables.css`
3. Utiliser dans `src/styles/fluid-selected.css`

### **Pour ajouter des classes fluid :**
1. Modifier `src/styles/fluid-selected.css` directement
2. Référence disponible dans `vendor/fluid-system/`

## 📚 Références

- **Source complète** → `vendor/fluid-system/`
- **Variables** → `vendor/fluid-system/variables/fluid-variables.css`
- **Classes complètes** → `vendor/fluid-system/typography.css` + `spacing.css`
