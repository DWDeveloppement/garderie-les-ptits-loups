# Vendor - Source de Vérité

Ce dossier contient les fichiers originaux complets, non modifiés, qui servent de référence.

## 📁 Structure

```
vendor/
├── fluid-system/              # Système typographique fluide complet
│   ├── variables/             # Variables de base (Utopia.fyi)
│   ├── typography.css         # Classes typographiques complètes (259 lignes)
│   └── spacing.css            # Classes d'espacement complètes (948 lignes)
└── README.md                  # Cette documentation
```

## 🎯 Usage

**IMPORTANT :** Ce dossier n'est **PAS** importé dans l'application. Il sert uniquement de référence.

### **Pour utiliser le système :**

1. **Copier** les fichiers nécessaires de `vendor/` vers `src/styles/`
2. **Modifier** les fichiers dans `src/styles/` selon les besoins
3. **Importer** depuis `src/styles/` dans `globals.css`

### **Exemple :**

```bash
# Copier le système complet
cp vendor/fluid-system/typography.css src/styles/
cp vendor/fluid-system/spacing.css src/styles/

# Ou créer une version sélectionnée
# (voir src/styles/fluid-selected.css)
```

## 📚 Références

- [Utopia.fyi Calculator](https://utopia.fyi/type/calculator)
- [Tailwind CSS v4](https://tailwindcss.com/docs/v4-beta)
- [Next.js Font Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)

## 🔧 Maintenance

- **Modifications** → Toujours dans `src/styles/`
- **Référence** → Toujours dans `vendor/`
- **Build** → Seul `src/styles/` est inclus dans le build