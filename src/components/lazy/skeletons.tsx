'use client'

import { Skeleton } from '@/ui/skeleton'
import { Icon } from '../icons'

/**
 * Skeleton par défaut avec Radix UI
 */
export function DefaultSkeleton() {
  return <Skeleton className="h-40 w-full" />
}

/**
 * Skeleton spécialisé pour la galerie avec Radix UI
 */
export function GallerySkeleton() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-32 w-full" />
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
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-24 w-full" />
      </div>
      <div className="flex gap-4">
        <Skeleton className="h-10 w-16" />
        <Skeleton className="h-10 w-16" />
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
      <Skeleton className="h-8 w-1/2" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-64 w-full" />
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
        <Skeleton className="h-12 w-3/4 mx-auto" />
        {/* Sous-titre skeleton */}
        <Skeleton className="h-6 w-1/2 mx-auto" />
        {/* Description skeleton */}
        <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4 mx-auto" />
          <Skeleton className="h-4 w-2/3 mx-auto" />
        </div>
        {/* Bouton skeleton */}
        <Skeleton className="h-12 w-32 mx-auto" />
      </div>
    </div>
  )
}

export function MapSkeleton({ className = '' }: { className?: string } = {}) {
  return (
		<div className={`relative w-full h-full rounded-lg overflow-hidden ${className}`}>
      {/* Skeleton de la carte - remplit tout le conteneur */}
      <Skeleton className='absolute inset-0 w-full h-full bg-purple-2' />
			<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange-surface backdrop-blur-sm rounded-full p-4 shadow-lg z-10 animate-pulse flex items-center justify-center'>
        <Icon name='mapPin' className='size-24 text-orange-3' />
			</div>

			{/* Skeleton de l'overlay d'informations */}
			<div className='absolute top-4 left-4 bg-orange-surface backdrop-blur-sm rounded-lg p-3 shadow-lg z-10 animate-pulse'>
				<div className='flex items-start gap-2'>
					<Skeleton className='h-4 w-4 flex-shrink-0' />
					<div className='space-y-1'>
						<Skeleton className='h-4 w-20' />
						<Skeleton className='h-4 w-32' />
						<Skeleton className='h-4 w-16' />
					</div>
				</div>
			</div>
		</div>
	)
}
