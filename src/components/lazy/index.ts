// 📂 src/components/lazy/index.ts
// 👉 Barrel export pour les composants lazy et skeletons

// Lazy Components
export { LazyContactForm, LazyGallery, LazyHeroGlobal, LazyHeroSection, LazyMapSection, LazyParallaxSection } from './LazySkeletons'

// Skeletons (pour utilisation directe)
export { FormSkeleton, GallerySkeleton, HeroSkeleton, MapSkeleton, SectionSkeleton } from './LazySkeletons'

// Factory
export { createLazyComponent } from './createLazyComponent'

// Client Only Components (chargés uniquement côté client)
export { AnimateCSSClient, MobileNavigationClient, ToasterClient } from './ClientOnlyComponents'
