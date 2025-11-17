# 🎯 Hooks d'Accessibilité

Ce dossier contient tous les hooks spécialisés pour gérer l'accessibilité de l'application.

## 📁 Architecture

```
src/hooks/a11y/
├── useButtonA11y.ts     # Gestion des boutons
├── useLinkA11y.ts       # Gestion des liens
├── useImageA11y.ts      # Gestion des images
├── useFormA11y.ts       # Gestion des formulaires
├── useFocusA11y.ts      # Gestion du focus
├── useGalleryA11y.ts    # Galerie (existant)
├── useGalleryState.ts   # État galerie (existant)
├── index.ts             # Exports centralisés
└── README.md            # Documentation
```

## 🎯 Principes

### **Séparation des Responsabilités**
- Chaque hook gère un type d'élément spécifique
- Logique d'accessibilité centralisée
- Réutilisabilité maximale

### **Développement**
- Avertissements automatiques en console
- Fallbacks intelligents
- Types TypeScript stricts

### **Production**
- Aucun impact sur les performances
- Code optimisé
- Avertissements désactivés

## 🔧 Utilisation

### **Boutons**
```tsx
import { useButtonA11y } from '@/hooks/a11y'

const MyButton = ({ children, ariaLabel, ...props }) => {
  const a11y = useButtonA11y({
    ariaLabel,
    children,
    variant: 'primary',
    disabled: false
  })
  
  return (
    <button
      aria-label={a11y.ariaLabel}
      role={a11y.role}
      tabIndex={a11y.tabIndex}
      disabled={a11y.disabled}
      {...props}
    >
      {children}
    </button>
  )
}
```

### **Liens**
```tsx
import { useLinkA11y } from '@/hooks/a11y'

const MyLink = ({ href, children, ...props }) => {
  const a11y = useLinkA11y({
    href,
    children,
    external: href.startsWith('http')
  })
  
  return (
    <a
      href={href}
      aria-label={a11y.ariaLabel}
      target={a11y.target}
      rel={a11y.rel}
      {...props}
    >
      {children}
    </a>
  )
}
```

### **Images**
```tsx
import { useImageA11y } from '@/hooks/a11y'

const MyImage = ({ src, alt, decorative, ...props }) => {
  const a11y = useImageA11y({
    src,
    alt,
    decorative
  })
  
  return (
    <img
      src={src}
      alt={a11y.alt}
      role={a11y.role}
      aria-hidden={a11y['aria-hidden']}
      {...props}
    />
  )
}
```

### **Formulaires**
```tsx
import { useFormA11y } from '@/hooks/a11y'

const MyInput = ({ name, label, error, ...props }) => {
  const a11y = useFormA11y({
    name,
    label,
    error,
    required: true
  })
  
  return (
    <div>
      <label htmlFor={a11y.labelProps.htmlFor}>
        {label}
      </label>
      <input
        id={a11y.id}
        aria-invalid={a11y['aria-invalid']}
        aria-describedby={a11y['aria-describedby']}
        {...props}
      />
      {error && (
        <div id={a11y.errorProps?.id} role="alert">
          {error}
        </div>
      )}
    </div>
  )
}
```

### **Focus**
```tsx
import { useFocusA11y } from '@/hooks/a11y'

const MyModal = ({ isOpen, onClose }) => {
  const { containerRef, handleKeyDown, focusFirst } = useFocusA11y({
    trapFocus: true,
    restoreFocus: true,
    onEscape: onClose
  })
  
  useEffect(() => {
    if (isOpen) focusFirst()
  }, [isOpen, focusFirst])
  
  return (
    <div
      ref={containerRef}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
    >
      {/* Contenu du modal */}
    </div>
  )
}
```

## 🚀 Avantages

1. **Cohérence** : Même logique d'accessibilité partout
2. **Maintenabilité** : Modifications centralisées
3. **Réutilisabilité** : Hooks réutilisables dans tous les composants
4. **Développement** : Avertissements automatiques
5. **Performance** : Optimisé pour la production
6. **Types** : Support TypeScript complet

## 🎯 Prochaines Étapes

- [ ] Refactoriser tous les composants existants
- [ ] Ajouter des tests unitaires
- [ ] Créer des composants wrapper
- [ ] Documenter les patterns d'usage
