// Hooks de scroll
export { useScrollDirection, useScrollToTop } from './utils/useScroll'

// Hooks de cartes (version racine conservée car différente)
export { useDynamicMap, useMapLocation, useStaticMap } from './useMaps'

// Hooks de fenêtre
export { useBreakpoint, useMobileMenuControl, useWindowSize } from './utils/useWindowSize'

// Hooks de formulaires
export { useFormValidation } from './forms/useFormValidation'
export { useLocalStorage } from './forms/useLocalStorage'
export { useRecaptchaV2 } from './forms/useRecaptchaV2'

// Hooks de composants
export { useScrollParallax } from './components/useScollParalax'

// Hooks de tests
export { useConsoleLogs } from './tests/useConsoleLogs'

// Hooks de queries
export { useQueries, usePartners, useSpaces, useTestimonials, usePrices } from './queries/useQueries'
