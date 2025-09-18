# Plugin SEO pour les Images - Garderie Les P'tits Loups

## 🎯 **Objectif**

Automatiser le SEO des images en forçant l'alt text et en optimisant les métadonnées pour améliorer l'accessibilité et le référencement.

## 🖼️ **Fonctionnalités**

### **Champs automatiques :**
- **Alt text** (obligatoire, max 125 chars) - Pour l'accessibilité et le SEO
- **Légende** (optionnelle, max 200 chars) - Description sous l'image
- **Crédit photo** (optionnel, max 100 chars) - Source de l'image

### **Validation automatique :**
- Alt text obligatoire pour toutes les images
- Limitation des caractères pour optimiser le SEO
- Prévisualisation avec alt text et légende

## 🔧 **Configuration**

### **Plugin installé :**
```typescript
// sanity/plugins/imageSEO.ts
export const imageSEOField = {
  name: 'image',
  title: 'Image',
  type: 'image',
  options: { hotspot: true },
  fields: [
    {
      name: 'alt',
      title: 'Texte alternatif (Alt)',
      type: 'string',
      validation: (Rule) => Rule.required().max(125),
    },
    // ... autres champs
  ]
}
```

### **Utilisation dans les schémas :**
```typescript
// Dans spaces.ts, sectors.ts, etc.
{
  ...imageSEOField,
  name: 'featuredImage',
  title: 'Image featured',
  validation: (Rule) => Rule.required(),
}
```

## 🚀 **Avantages**

### **SEO automatique :**
- ✅ Alt text obligatoire sur toutes les images
- ✅ Optimisation des métadonnées
- ✅ Cohérence dans la gestion des médias
- ✅ Amélioration de l'accessibilité

### **Impact global :**
- ✅ Toutes les images du site bénéficient du SEO
- ✅ Maintenance centralisée
- ✅ Performance optimisée
- ✅ Conformité WCAG

## 📋 **Schémas concernés**

- ✅ `spaces.ts` - Images des espaces
- 🔄 `sectors.ts` - Images des secteurs (à mettre à jour)
- 🔄 `home.ts` - Images de la page d'accueil (à mettre à jour)
- 🔄 `about.ts` - Images de la page à propos (à mettre à jour)
- 🔄 `contact.ts` - Images de la page contact (à mettre à jour)
- 🔄 `schedule.ts` - Images de la page horaires (à mettre à jour)

## 🎯 **Prochaines étapes**

1. **Tester** l'upload d'images avec alt text obligatoire
2. **Mettre à jour** tous les autres schémas
3. **Vérifier** l'impact sur le SEO
4. **Optimiser** les performances des images
