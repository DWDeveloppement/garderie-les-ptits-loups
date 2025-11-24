/**
 * Composants chargés uniquement côté client
 * Wrapper pour éviter de passer des fonctions depuis Server Components
 */

'use client';

import dynamic from 'next/dynamic';

// AnimateCSS - Chargement uniquement côté client (non-critique pour le FCP)
export const AnimateCSSClient = dynamic(
  () => import('@/components/shared/AnimateCSS').then((mod) => ({ default: mod.AnimateCSS })),
  {
    ssr: false // Pas de SSR nécessaire (chargement après FCP)
  }
);

// MobileNavigation - Chargement uniquement côté client (menu mobile)
export const MobileNavigationClient = dynamic(
  () => import('@/components/shared/navigation').then((mod) => ({ default: mod.MobileNavigation })),
  {
    ssr: false // Pas de SSR nécessaire (menu mobile uniquement)
  }
);

// Toaster - Chargement uniquement côté client (toasts après interactions)
export const ToasterClient = dynamic(() => import('@/ui/sonner').then((mod) => ({ default: mod.Toaster })), {
  ssr: false // Pas de SSR nécessaire (toasts uniquement après interactions)
});
