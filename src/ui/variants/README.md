# Système de Variants CVA

Ce dossier contient tous les variants CVA (Class Variance Authority) pour les composants UI du projet.

## 📁 Structure

```
src/components/ui/variants/
├── README.md           # Documentation
├── index.ts           # Barrel export
├── badge.ts           # Variants pour les badges
├── button.ts          # Variants pour les boutons
├── callout.ts         # Variants pour les callouts
├── card.ts            # Variants pour les cards
├── input.ts           # Variants pour les inputs
├── label.ts           # Variants pour les labels
└── toast.ts           # Variants pour les toasts
```

## 🎯 Principe

Chaque fichier de variant suit la même structure :

```typescript
import { cva, type VariantProps } from 'class-variance-authority'

export const componentVariants = cva(
  // Base styles
  ['base', 'classes'],
  {
    variants: {
      variant: {
        // Variants de style
      },
      size: {
        // Variants de taille
      },
      // Autres variants...
    },
    defaultVariants: {
      // Valeurs par défaut
    },
  }
)

export type ComponentVariants = VariantProps<typeof componentVariants>
```

## 🔧 Utilisation

### Import des variants

```typescript
// Import direct
import { buttonVariants, type ButtonVariants } from './variants/button'

// Import via barrel
import { buttonVariants, type ButtonVariants } from './variants'
```

### Utilisation dans un composant

```typescript
import { cva, type VariantProps } from 'class-variance-authority'
import { buttonVariants } from './variants/button'

export interface ButtonProps 
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = ({ variant, size, className, ...props }) => {
  return (
    <button 
      className={cn(buttonVariants({ variant, size }), className)} 
      {...props} 
    />
  )
}
```

## 🎨 Variants disponibles

### Button
- **Variants** : `primary`, `secondary`, `outline`, `ghost`, `destructive`, `link`
- **Tailles** : `sm`, `md`, `lg`, `xl`, `icon`
- **États** : `default`, `loading`, `success`, `error`, `warning`, `info`

### Card
- **Variants** : `primary`, `secondary`, `neutral`
- **Tailles** : `sm`, `md`, `lg`, `xl`
- **Interactive** : `true`, `false`

### Callout
- **Variants** : `success`, `warning`, `error`, `info`
- **Tailles** : `sm`, `md`, `lg`

### Badge
- **Variants** : `default`, `secondary`, `success`, `warning`, `error`, `info`, `outline`, `ghost`
- **Tailles** : `sm`, `md`, `lg`

### Input
- **Variants** : `default`, `error`, `success`, `warning`
- **Tailles** : `sm`, `md`, `lg`

### Label
- **Variants** : `default`, `error`, `success`, `warning`, `info`
- **Tailles** : `sm`, `md`, `lg`
- **Required** : `true`, `false`

### Toast
- **Variants** : `default`, `success`, `warning`, `error`, `info`

## 🚀 Avantages

1. **Séparation des responsabilités** - Chaque variant dans son fichier
2. **Réutilisabilité** - Variants partagés entre composants
3. **Type Safety** - TypeScript avec autocomplétion
4. **Maintenance** - Modifications centralisées
5. **Performance** - Tree-shaking automatique
6. **Cohérence** - Même système partout

## 📝 Bonnes pratiques

1. **Nommage** : `componentVariants` pour le nom de la fonction
2. **Types** : `ComponentVariants` pour le type exporté
3. **Base styles** : Toujours en premier dans le cva
4. **Default variants** : Toujours définir des valeurs par défaut
5. **Documentation** : Commenter les variants complexes
6. **Tests** : Tester tous les variants dans les pages de démo

## 🔗 Liens utiles

- [Class Variance Authority](https://cva.style/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Page de démo](/variants-demo)
