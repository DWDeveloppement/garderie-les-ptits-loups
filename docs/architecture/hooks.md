# Architecture - Hooks Personnalisés

## 📊 Vue d'ensemble

**23 hooks personnalisés** organisés en **7 catégories**.

---

## 📁 Organisation des hooks

### 1. Accessibilité (8 hooks)

**Chemin** : `src/hooks/a11y/`

| Hook | Description | Retour |
|------|-------------|--------|
| `useButtonA11y` | Props ARIA pour boutons | `{ role, ariaLabel, ariaDisabled }` |
| `useFocusA11y` | Gestion du focus clavier | `{ onFocus, onBlur, isFocused }` |
| `useFormA11y` | Props ARIA pour formulaires | `{ ariaDescribedBy, ariaInvalid }` |
| `useGalleryA11y` | Navigation clavier dans galerie | `{ onKeyDown, tabIndex }` |
| `useGalleryState` | État de la galerie | `{ currentIndex, setIndex }` |
| `useImageA11y` | Alt text et ARIA pour images | `{ alt, ariaLabel, loading }` |
| `useLinkA11y` | Props ARIA pour liens | `{ ariaLabel, ariaExternal }` |

**Usage** :
```typescript
import { useButtonA11y } from '@/hooks/a11y/useButtonA11y'

function Button({ label, disabled }) {
  const a11yProps = useButtonA11y(label, disabled)
  return <button {...a11yProps}>...</button>
}
```

---

### 2. Composants (2 hooks)

**Chemin** : `src/hooks/components/`

#### `useMaps`

Gestion des cartes statiques et dynamiques (Leaflet).

```typescript
const {
  isLoaded,        // État de chargement de Leaflet
  StaticMapFallback, // Composant fallback
  loadDynamicMap   // Fonction de chargement
} = useMaps()
```

**Exports** :
- `useDynamicMap()` : Carte interactive
- `useMapLocation()` : Infos de localisation
- `useStaticMap()` : Carte statique

#### `useScollParalax` (sic)

Effet parallax au scroll.

```typescript
const offset = useScrollParallax(speed)
// offset à utiliser dans transform: translateY()
```

---

### 3. Formulaires (3 hooks)

**Chemin** : `src/hooks/forms/`

#### `useFormValidation`

Validation de formulaire avec Zod + localStorage.

```typescript
const {
  formData,        // Données du formulaire
  errors,          // Erreurs de validation
  isSubmitting,    // État de soumission
  handleChange,    // Gérer les changements
  handleSubmit,    // Soumettre le formulaire
  resetForm        // Réinitialiser
} = useFormValidation()
```

**Features** :
- Validation Zod en temps réel
- Persistence localStorage
- État de soumission
- Reset après succès

#### `useLocalStorage<T>`

Synchronisation état ↔ localStorage.

```typescript
const [value, setValue] = useLocalStorage<FormData>(
  'contactForm',    // Clé localStorage
  defaultFormData   // Valeur par défaut
)
```

**Type-safe** avec TypeScript générique.

#### `useRecaptchaV2`

Intégration reCAPTCHA v2.

```typescript
const {
  recaptchaRef,      // Ref pour le composant
  executeRecaptcha,  // Exécuter la vérification
  resetRecaptcha     // Réinitialiser
} = useRecaptchaV2()

const token = await executeRecaptcha()
```

---

### 4. Queries (1 hook)

**Chemin** : `src/hooks/queries/`

#### `useQueries`

Wrapper pour queries Sanity avec React Cache.

```typescript
// Exports spécialisés
const partners = usePartners()
const prices = usePrices()
const spaces = useSpaces()
const testimonials = useTestimonials()
```

**Pattern** :
```typescript
export const usePartners = cache(async () => {
  return await sanityClient.fetch(partnersQuery)
})
```

**Avantages** :
- Déduplication automatique
- Cache React Server Components
- Type-safe avec TypeScript

---

### 5. Tests (1 hook)

**Chemin** : `src/hooks/tests/`

#### `useConsoleLogs`

Logs conditionnels en développement.

```typescript
const { log, error, warn } = useConsoleLogs()

log('Debug info')  // Seulement en dev
error('Error!')    // Seulement en dev
```

---

### 6. Utilitaires (2 hooks)

**Chemin** : `src/hooks/utils/`

#### `useScroll`

Gestion du scroll et de la direction.

```typescript
const {
  scrollY,          // Position Y
  scrollDirection,  // 'up' | 'down' | null
  isAtTop,          // true si en haut de page
  isAtBottom,       // true si en bas de page
  scrollTo          // Fonction de scroll
} = useScroll()
```

**Exports** :
- `useScrollDirection()` : Direction uniquement
- `useScrollToTop()` : Fonction scroll to top

#### `useWindowSize`

Dimensions de la fenêtre et breakpoints.

```typescript
const {
  width,       // Largeur en px
  height,      // Hauteur en px
  isMobile,    // < 640px
  isTablet,    // 640px - 1024px
  isDesktop    // > 1024px
} = useWindowSize()
```

**Debounced** pour éviter trop de re-renders.

---

### 7. Root (1 hook)

**Chemin** : `src/hooks/`

#### `use-animate-once`

Animation au premier chargement de page.

```typescript
const hasAnimated = useAnimateOnce('homepage')

return (
  <div className={hasAnimated ? 'animate-fade-in' : ''}>
    ...
  </div>
)
```

**Persistence** : sessionStorage

---

## 🎨 Patterns de Hooks

### Export Centralisé

**Fichier** : `src/hooks/index.ts`

```typescript
// Scroll
export { useScrollDirection, useScrollToTop } from './utils/useScroll'

// Maps
export { useDynamicMap, useMapLocation, useStaticMap } from './components/useMaps'

// Forms
export { useFormValidation } from './forms/useFormValidation'
export { useLocalStorage } from './forms/useLocalStorage'
export { useRecaptchaV2 } from './forms/useRecaptchaV2'

// A11y
export { useButtonA11y } from './a11y/useButtonA11y'
export { useFormA11y } from './a11y/useFormA11y'
// etc. (23 exports au total)
```

**Usage** :
```typescript
import { useScrollDirection, useFormValidation } from '@/hooks'
```

---

### Client Components Only

⚠️ **Tous les hooks nécessitent** `'use client'` car ils utilisent :
- `useState`, `useEffect`, `useRef`
- `window`, `document`, `localStorage`
- Event listeners

**Exception** : `useQueries` qui utilise React Cache (serveur).

---

### TypeScript Strict

Tous les hooks sont **fully typed** :

```typescript
// Type générique
function useLocalStorage<T>(
  key: string,
  defaultValue: T
): [T, (value: T) => void]

// Type strict
function useScroll(): {
  scrollY: number
  scrollDirection: 'up' | 'down' | null
  isAtTop: boolean
  isAtBottom: boolean
  scrollTo: (y: number) => void
}
```

---

### Cleanup Automatique

Les hooks gèrent automatiquement le cleanup :

```typescript
useEffect(() => {
  const handleScroll = () => { /* ... */ }
  window.addEventListener('scroll', handleScroll)

  // Cleanup automatique
  return () => window.removeEventListener('scroll', handleScroll)
}, [])
```

---

## 📊 Statistiques

| Catégorie | Nombre | Pourcentage |
|-----------|--------|-------------|
| A11y | 8 | 35% |
| Forms | 3 | 13% |
| Utils | 2 | 9% |
| Components | 2 | 9% |
| Queries | 1 | 4% |
| Tests | 1 | 4% |
| Root | 1 | 4% |
| **Total** | **23** | **100%** |

---

## 🔗 Dépendances

- **React** : useState, useEffect, useRef, useCallback, useMemo
- **React Cache** : cache() pour queries Sanity
- **Zod** : Validation formulaires
- **Leaflet** : Cartes interactives
- **reCAPTCHA** : Intégration Google

---

## 📚 Références

- **React Hooks** : https://react.dev/reference/react
- **React Cache** : https://nextjs.org/docs/app/building-your-application/caching
- **Accessibility** : https://www.w3.org/WAI/ARIA/apg/

---

**Dernière mise à jour** : 2025-12-03
**Nombre de hooks** : 23
**Catégories** : 7
