// 📂 src/hooks/a11y/index.ts
// 👉 Export centralisé des hooks d'accessibilité

// Hooks spécialisés
export { useButtonA11y } from './useButtonA11y'
export { useFocusA11y } from './useFocusA11y'
export { useFormA11y } from './useFormA11y'
export { useImageA11y } from './useImageA11y'
export { useLinkA11y } from './useLinkA11y'

// Hooks existants (gallery)
export { useGalleryA11y } from './useGalleryA11y'
export { useGalleryState } from './useGalleryState'

// Types communs
export type { ButtonA11yOptions, ButtonA11yReturn } from './useButtonA11y'
export type { FocusA11yOptions, FocusA11yReturn } from './useFocusA11y'
export type { FormA11yOptions, FormA11yReturn } from './useFormA11y'
export type { ImageA11yOptions, ImageA11yReturn } from './useImageA11y'
export type { LinkA11yOptions, LinkA11yReturn } from './useLinkA11y'
