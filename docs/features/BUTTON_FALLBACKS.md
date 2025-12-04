# Système de Fallbacks pour les Boutons

## 🎯 Stratégie de Fallbacks

Le système de boutons utilise une approche hybride avec des fallbacks Radix UI pour assurer la cohérence et la compatibilité.

### **🔧 Principe de Fonctionnement**

#### **1. Couleurs Personnalisées (Priorité)**
```css
/* Couleurs custom du projet */
bg-purple-9 text-white
hover:bg-purple-10
```

#### **2. Fallbacks Radix (Sécurité)**
```css
/* Fallbacks Radix UI */
[&:not([data-accent-color])]:bg-accent-9
[&:not([data-accent-color])]:text-accent-contrast
[&:not([data-accent-color])]:hover:bg-accent-10
```

### **🎨 Mapping des Couleurs**

#### **🎯 Stratégie de Couleurs**

**Couleurs Custom (Purple/Orange) :**
- Utilisées pour `primary`, `secondary`, `outline`, `ghost`, `link`
- Cohérence avec l'identité visuelle du projet
- Fallbacks Radix pour la compatibilité

**Couleurs Radix (Feedback) :**
- Utilisées directement pour `destructive` et états spéciaux
- Plus vives et contrastées que nos couleurs custom
- Meilleure lisibilité pour les actions critiques

#### **Variants Principaux**
| Variant | Couleur Custom | Fallback Radix |
|---------|----------------|----------------|
| `primary` | `purple-9` | `accent-9` |
| `secondary` | `orange-9` | `accent-9` |
| `outline` | `purple-7` | `accent-7` |
| `ghost` | `purple-11` | `accent-11` |
| `destructive` | **Radix `red-9`** | **Radix `red-9`** |
| `link` | `purple-9` | `accent-9` |

#### **États Spéciaux**
| État | Couleur Utilisée | Note |
|------|------------------|------|
| `success` | **Radix `green-9`** | Plus vif que custom |
| `error` | **Radix `red-9`** | Plus vif que custom |
| `warning` | **Radix `amber-9`** | Plus vif que custom |
| `info` | **Radix `blue-9`** | Plus vif que custom |

### **🔍 Sélecteurs CSS**

#### **Sélecteur de Fallback**
```css
[&:not([data-accent-color])]:bg-accent-9
```

**Explication :**
- `&` = élément actuel
- `:not([data-accent-color])` = si pas d'attribut `data-accent-color`
- `:bg-accent-9` = utilise la couleur Radix par défaut

### **📋 Avantages**

#### **✅ Cohérence**
- Couleurs personnalisées en priorité
- Fallbacks Radix pour la compatibilité
- Design system unifié

#### **✅ Flexibilité**
- Support des thèmes Radix
- Adaptation automatique
- Pas de conflits de couleurs

#### **✅ Maintenance**
- Moins de CSS custom
- Utilisation des standards Radix
- Évolutivité facilitée

### **🚀 Usage**

#### **Bouton Standard**
```tsx
<Button variant="primary">Bouton</Button>
// Utilise purple-9, fallback accent-9
```

#### **Bouton avec Thème Radix**
```tsx
<Button variant="primary" data-accent-color="blue">
  Bouton
</Button>
// Utilise blue-9 (thème Radix)
```

#### **Bouton Destructif**
```tsx
<Button variant="destructive">Supprimer</Button>
// Utilise red-9 (couleur Radix standard)
```

### **🔧 Configuration**

#### **Couleurs Custom (palette.css)**
```css
:root {
  --purple-9: oklch(0.511 0.1407 142.5);
  --orange-9: oklch(0.511 0.1407 66.57);
  /* ... */
}
```

#### **Couleurs Radix (globals.css)**
```css
:root {
  --accent-9: var(--purple-9);
  --accent-contrast: var(--purple-contrast);
  /* ... */
}
```

### **📝 Notes Techniques**

#### **Ordre de Priorité**
1. **Couleurs custom** (purple-9, orange-9, etc.)
2. **Fallbacks Radix** (accent-9, red-9, etc.)
3. **Couleurs système** (browser defaults)

#### **Compatibilité**
- ✅ **Radix UI** - Support complet
- ✅ **Tailwind CSS** - Classes natives
- ✅ **Thèmes** - Adaptation automatique
- ✅ **Accessibilité** - Contrastes respectés

### **🎯 Résultat**

Un système de boutons robuste qui :
- Utilise les couleurs du projet en priorité
- Fallback sur Radix UI pour la compatibilité
- Maintient la cohérence du design system
- S'adapte aux différents thèmes
