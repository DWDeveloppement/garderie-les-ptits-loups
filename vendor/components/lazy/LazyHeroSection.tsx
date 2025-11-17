'use client'

import { HeroSkeleton, LazyComponent } from '@/components/shared/LazyComponent'

/**
 * Hero Section (page d'accueil) lazy avec skeleton spécialisé
 */
export function LazyHeroSection(props: any) {
  return (
    <LazyComponent
      component={() => import('@/components/pages/home/HeroSection').then(module => ({ default: module.HeroSection }))}
      fallback={<HeroSkeleton />}
      {...props}
    />
  )
}
