'use client'

import { Skeleton } from '@radix-ui/themes'

/**
 * Skeleton par défaut avec Radix UI
 */
export function DefaultSkeleton() {
  return <Skeleton height="16rem" width="100%" />
}

/**
 * Skeleton spécialisé pour la galerie avec Radix UI
 */
export function GallerySkeleton() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} height="12rem" width="100%" />
        ))}
      </div>
    </div>
  )
}

/**
 * Skeleton spécialisé pour les formulaires avec Radix UI
 */
export function FormSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Skeleton height="1rem" width="25%" />
        <Skeleton height="2.5rem" width="100%" />
      </div>
      <div className="space-y-4">
        <Skeleton height="1rem" width="25%" />
        <Skeleton height="2.5rem" width="100%" />
      </div>
      <div className="space-y-4">
        <Skeleton height="1rem" width="25%" />
        <Skeleton height="6rem" width="100%" />
      </div>
      <div className="flex gap-4">
        <Skeleton height="2.5rem" width="6rem" />
        <Skeleton height="2.5rem" width="6rem" />
      </div>
    </div>
  )
}

/**
 * Skeleton spécialisé pour les sections avec Radix UI
 */
export function SectionSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton height="2rem" width="50%" />
      <Skeleton height="1rem" width="75%" />
      <Skeleton height="1rem" width="50%" />
      <Skeleton height="16rem" width="100%" />
    </div>
  )
}

/**
 * Skeleton spécialisé pour les Heroes avec Radix UI
 */
export function HeroSkeleton() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-purple-50 to-orange-50">
      <div className="text-center space-y-6 max-w-4xl mx-auto px-4">
        {/* Titre skeleton */}
        <Skeleton height="3rem" width="75%" className="mx-auto" />
        {/* Sous-titre skeleton */}
        <Skeleton height="1.5rem" width="50%" className="mx-auto" />
        {/* Description skeleton */}
        <div className="space-y-2">
          <Skeleton height="1rem" width="100%" />
          <Skeleton height="1rem" width="83%" className="mx-auto" />
          <Skeleton height="1rem" width="67%" className="mx-auto" />
        </div>
        {/* Bouton skeleton */}
        <Skeleton height="3rem" width="12rem" className="mx-auto" />
      </div>
    </div>
  )
}

export function MapSkeleton({ height = 400, className = '' }: { height?: number; className?: string } = {}) {
  return (
    <div className={`space-y-4 w-full max-w-4xl mx-auto ${className}`}>
      {/* Skeleton de la carte */}
      <div className='relative rounded-lg overflow-hidden border border-orange-6'>
        <Skeleton 
          height={`${height}px`} 
          width="100%" 
          className="w-full"
        />
        
        {/* Skeleton de l'overlay d'informations */}
        <div className='absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg'>
          <div className='flex items-start gap-2'>
            <Skeleton height="1rem" width="1rem" className="flex-shrink-0" />
            <div className='space-y-1'>
              <Skeleton height="1rem" width="8rem" />
              <Skeleton height="0.875rem" width="12rem" />
              <Skeleton height="0.875rem" width="6rem" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
