'use client'

import { LazyComponent, SectionSkeleton } from '@/components/shared/LazyComponent'

/**
 * Section parallaxe lazy avec skeleton spécialisé
 */
export function LazyParallaxSection(props: any) {
  return (
    <LazyComponent
      component={() => import('@/components/shared/ParalaxImage').then(module => ({ default: module.ParalaxImage }))}
      fallback={<SectionSkeleton />}
      {...props}
    />
  )
}
