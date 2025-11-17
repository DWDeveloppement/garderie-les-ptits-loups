'use client'

import { HeroSkeleton, LazyComponent } from '@/components/shared/LazyComponent'

/**
 * Hero Global lazy avec skeleton spécialisé
 */
export function LazyHeroGlobal(props: any) {
  return (
    <LazyComponent
      component={() => import('@/components/shared/HeroGlobal').then(module => ({ default: module.HeroGlobal }))}
      fallback={<HeroSkeleton />}
      {...props}
    />
  )
}
