# Guide Visuel des Variants

## 🎨 Matrice des Variants

Ce guide présente toutes les combinaisons possibles de variants pour les composants interactifs.

## Structure d'un Variant

```
[color] + [style] + [size]
```

Exemples :
- `primary` + `solid` + `md` = Button primary solid de taille moyenne
- `secondary` + `outline` + `lg` = Button secondary outline de grande taille
- `success` + `surface` + `sm` = Alert success surface de petite taille

---

## 🟣 PRIMARY (Purple)

### Solid Variant
```tsx
className="
  bg-primary 
  text-primary-foreground 
  hover:bg-primary-hover 
  active:bg-primary-active
"
```
**Usage** : Actions principales, CTAs, boutons primaires

---

### Surface Variant
```tsx
className="
  bg-primary-subtle 
  text-purple-11 
  border border-primary-border 
  hover:bg-primary-subtle-hover
  hover:border-primary-border-hover
"
```
**Usage** : Actions secondaires, cards interactives, badges

---

### Outline Variant
```tsx
className="
  bg-transparent 
  text-purple-11 
  border border-primary-border 
  hover:bg-primary-subtle
  hover:border-primary-border-hover
"
```
**Usage** : Actions tertiaires, boutons secondaires avec bordure

---

### Ghost Variant
```tsx
className="
  bg-transparent 
  text-purple-11 
  hover:bg-purple-4
  hover:text-purple-12
"
```
**Usage** : Actions discrètes, liens, navigation items

---

## 🟠 SECONDARY (Orange)

### Solid Variant
```tsx
className="
  bg-secondary 
  text-secondary-foreground 
  hover:bg-secondary-hover 
  active:bg-secondary-active
"
```

### Surface Variant
```tsx
className="
  bg-secondary-subtle 
  text-orange-11 
  border border-secondary-border 
  hover:bg-secondary-subtle-hover
  hover:border-secondary-border-hover
"
```

### Outline Variant
```tsx
className="
  bg-transparent 
  text-orange-11 
  border border-secondary-border 
  hover:bg-secondary-subtle
  hover:border-secondary-border-hover
"
```

### Ghost Variant
```tsx
className="
  bg-transparent 
  text-orange-11 
  hover:bg-orange-4
  hover:text-orange-12
"
```

---

## 🟢 SUCCESS (Green)

### Solid Variant
```tsx
className="
  bg-success 
  text-success-foreground 
  hover:bg-success-hover
"
```

### Surface Variant
```tsx
className="
  bg-success-subtle 
  text-green-11 
  border border-success-border 
  hover:bg-success-subtle-hover
  hover:border-success-border-hover
"
```

### Outline Variant
```tsx
className="
  bg-transparent 
  text-green-11 
  border border-success-border 
  hover:bg-success-subtle
  hover:border-success-border-hover
"
```

### Ghost Variant
```tsx
className="
  bg-transparent 
  text-green-11 
  hover:bg-green-4
  hover:text-green-12
"
```

---

## 🔴 DESTRUCTIVE (Red)

### Solid Variant
```tsx
className="
  bg-destructive 
  text-destructive-foreground 
  hover:bg-destructive-hover
"
```

### Surface Variant
```tsx
className="
  bg-destructive-subtle 
  text-red-11 
  border border-destructive-border 
  hover:bg-destructive-subtle-hover
  hover:border-destructive-border-hover
"
```

### Outline Variant
```tsx
className="
  bg-transparent 
  text-red-11 
  border border-destructive-border 
  hover:bg-destructive-subtle
  hover:border-destructive-border-hover
"
```

### Ghost Variant
```tsx
className="
  bg-transparent 
  text-red-11 
  hover:bg-red-4
  hover:text-red-12
"
```

---

## 🟡 WARNING (Amber)

### Solid Variant
```tsx
className="
  bg-warning 
  text-warning-foreground 
  hover:bg-warning-hover
"
```

### Surface Variant
```tsx
className="
  bg-warning-subtle 
  text-amber-11 
  border border-warning-border 
  hover:bg-warning-subtle-hover
  hover:border-warning-border-hover
"
```

### Outline Variant
```tsx
className="
  bg-transparent 
  text-amber-11 
  border border-warning-border 
  hover:bg-warning-subtle
  hover:border-warning-border-hover
"
```

### Ghost Variant
```tsx
className="
  bg-transparent 
  text-amber-11 
  hover:bg-amber-4
  hover:text-amber-12
"
```

---

## 🔵 INFO (Blue)

### Solid Variant
```tsx
className="
  bg-info 
  text-info-foreground 
  hover:bg-info-hover
"
```

### Surface Variant
```tsx
className="
  bg-info-subtle 
  text-blue-11 
  border border-info-border 
  hover:bg-info-subtle-hover
  hover:border-info-border-hover
"
```

### Outline Variant
```tsx
className="
  bg-transparent 
  text-blue-11 
  border border-info-border 
  hover:bg-info-subtle
  hover:border-info-border-hover
"
```

### Ghost Variant
```tsx
className="
  bg-transparent 
  text-blue-11 
  hover:bg-blue-4
  hover:text-blue-12
"
```

---

## 📏 Size Variants

### Small (sm)
```tsx
className="px-3 py-1.5 text-sm"
```

### Medium (md) - Default
```tsx
className="px-4 py-2 text-base"
```

### Large (lg)
```tsx
className="px-6 py-3 text-lg"
```

### Extra Large (xl)
```tsx
className="px-8 py-4 text-xl"
```

---

## 🔄 États Interactifs

### Focus State
```tsx
className="
  focus-visible:outline-none 
  focus-visible:ring-2 
  focus-visible:ring-ring 
  focus-visible:ring-offset-2
"
```

### Disabled State
```tsx
className="
  disabled:opacity-50 
  disabled:pointer-events-none
"
```

### Loading State
```tsx
className="
  relative
  disabled:cursor-wait
"
```

---

## 📊 Tableau Récapitulatif

| Color | Solid | Surface | Outline | Ghost |
|-------|-------|---------|---------|-------|
| **Primary (Purple)** | Fond purple-9, texte blanc | Fond purple-4, bordure purple-8 | Transparent, bordure purple-8 | Transparent, hover purple-4 |
| **Secondary (Orange)** | Fond orange-9, texte blanc | Fond orange-4, bordure orange-8 | Transparent, bordure orange-8 | Transparent, hover orange-4 |
| **Success (Green)** | Fond green-9, texte blanc | Fond green-4, bordure green-8 | Transparent, bordure green-8 | Transparent, hover green-4 |
| **Warning (Amber)** | Fond amber-9, texte blanc | Fond amber-4, bordure amber-8 | Transparent, bordure amber-8 | Transparent, hover amber-4 |
| **Destructive (Red)** | Fond red-9, texte blanc | Fond red-4, bordure red-8 | Transparent, bordure red-8 | Transparent, hover red-4 |
| **Info (Blue)** | Fond blue-9, texte blanc | Fond blue-4, bordure blue-8 | Transparent, bordure blue-8 | Transparent, hover blue-4 |

---

## 💡 Bonnes Pratiques

### Hiérarchie Visuelle
1. **Solid** - Action la plus importante de la page
2. **Surface** - Actions secondaires importantes
3. **Outline** - Actions alternatives
4. **Ghost** - Actions discrètes, navigation

### Accessibilité
- Toujours utiliser les teintes `-11` et `-12` pour le texte (accessibles)
- Les couleurs `-9` et `-10` sont pour les solides uniquement
- Contraste minimum WCAG AA respecté

### Cohérence
- Maximum 2 boutons "solid" par section
- Les variants "ghost" pour la navigation
- Les variants "surface" pour les cards interactives
- Les variants "outline" pour les actions secondaires

---

## 🎯 Exemples Contextuels

### Call to Action Principal
```tsx
<Button variant="solid" color="primary" size="lg">
  Commencer maintenant
</Button>
```

### Action Secondaire
```tsx
<Button variant="surface" color="secondary" size="md">
  En savoir plus
</Button>
```

### Action Destructive
```tsx
<Button variant="outline" color="destructive" size="md">
  Supprimer
</Button>
```

### Navigation Item
```tsx
<Button variant="ghost" color="primary" size="sm">
  Accueil
</Button>
```

### Success Alert
```tsx
<Alert variant="surface" color="success">
  Votre inscription a été confirmée !
</Alert>
```

### Error Message
```tsx
<Alert variant="surface" color="destructive">
  Une erreur s'est produite
</Alert>
```
