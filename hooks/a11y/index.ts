// 📂 src/hooks/a11y/index.ts
// 👉 Export centralisé des hooks d'accessibilité

// Hooks spécialisés
export { useButtonA11y } from './useButtonA11y'
export { useLinkA11y } from './useLinkA11y'
export { useFocusA11y } from './useFocusA11y'
export { useFormA11y } from './useFormA11y'
export { useImageA11y } from './useImageA11y'

// Hook unifié pour Button (packages/ui)
export { useButtonA11yProps } from './useButtonA11yProps'
export type { ButtonA11yProps } from './useButtonA11yProps'

// Hooks existants (gallery)
export { useGalleryA11y } from './useGalleryA11y'
export { useGalleryState } from './useGalleryState'

// Types communs (legacy)
export type { ButtonA11yProps as ButtonA11yPropsLegacy } from './useButtonA11y'
export type { LinkA11yProps } from './useLinkA11y'
/**
 * export type { FocusA11yProps } from './useFocusA11y'
 * export type { FormA11yProps } from './useFormA11y'
 * export type { ImageA11yProps } from './useImageA11y'
 */
