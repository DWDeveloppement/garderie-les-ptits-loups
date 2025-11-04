# 📋 Liste des Composants Non Utilisés

## Composants de Démonstration/Exemples

### ✅ Utilisés uniquement dans `/exemples`

- `src/components/ui/card-examples.tsx` - Utilisé dans`src/app/exemples/page.tsx`
- `src/components/ui/button-examples.tsx` - Non trouvé dans les imports (à vérifier)

## Composants de Pricing

### ⚠️ Potentiellement Non Utilisés

- `src/components/shared/pricing/AccordionPrice.tsx`
  - **Statut** : Exporté dans`index.ts` mais non utilisé dans les pages
  - **Remarque** :`PricingList.tsx` est utilisé à la place
  - **Vérification** : Aucun import trouvé dans`src/app` ou`src/components/pages`

## Composants de Navigation

### ✅ Tous Utilisés

- `MobileNavigation` - Utilisé dans`src/app/layout.tsx`
- `BottomBarWithAutoHide` - Utilisé dans`MobileNavigation.tsx`
- `BottomBar` - Utilisé dans`MobileNavigation.tsx`
- `BackToTop` - Probablement utilisé (à vérifier)

## Composants de Galerie

### ✅ Tous Utilisés

- `GalleryWithLightbox` - Utilisé dans`GallerySection.tsx` et`LazySkeletons.tsx`
- `Gallery` - Utilisé (via`GalleryWithLightbox`)
- `LightboxCustom` - Utilisé (via`GalleryWithLightbox`)

## Composants de Maps

### ✅ Tous Utilisés

- `MapActions` - Utilisé dans`MapSection.tsx`
- `DynamicMap` - Utilisé dans`MapSection.tsx`
- `StaticMap` - Utilisé dans`MapSection.tsx`

## Composants de Feedback

### ✅ Tous Utilisés

- `SuccessAnimation` - Utilisé dans`ContactFormSection.tsx`
- `Spinner` (shared/feedback) - Exporté mais non utilisé (conflit avec`ui/spinner`)
- **Remarque** :`ui/spinner.tsx` est utilisé dans`ContactForm.tsx` à la place

## Composants de Pages

### ⚠️ Potentiellement Non Utilisés

- `src/components/pages/contact/ContactDirections.tsx`
  - **Statut** : Non importé dans`src/app/contact/page.tsx`
  - **Vérification** : Aucun import trouvé

- `src/components/pages/horaires-tarifs/HorairesSection.tsx`
  - **Statut** : Non importé dans`src/app/tarifs/page.tsx`
  - **Vérification** : Aucun import trouvé

- `src/components/pages/about/AboutIntroSection.tsx`
  - **Statut** : ✅ Utilisé dans`src/app/a-propos/page.tsx`

- `src/components/pages/sector/ParallaxSection.tsx`
  - **Statut** : ✅ Utilisé dans`src/app/la-structure/[slug]/page.tsx`

## Composants UI Shadcn

### ✅ Tous Probablement Utilisés

Les composants UI Shadcn sont généralement utilisés indirectement ou dans des composants parents.

## Résumé

### Composants à Vérifier/Supprimer (si confirmé non utilisés)

1. ✅`src/components/shared/pricing/AccordionPrice.tsx` -**NON UTILISÉ** (remplacé par`PricingList`)
2. ✅`src/components/pages/contact/ContactDirections.tsx` -**NON UTILISÉ**
3. ✅`src/components/pages/horaires-tarifs/HorairesSection.tsx` -**NON UTILISÉ**
4. ⚠️`src/components/shared/feedback/spinner.tsx` - Exporté mais non utilisé (conflit avec`ui/spinner`)
5. ⚠️`src/components/ui/button-examples.tsx` - À vérifier si utilisé

### Composants de Démonstration (garder pour développement)

- `src/components/ui/card-examples.tsx` - Garder (utilisé dans`/exemples`)
