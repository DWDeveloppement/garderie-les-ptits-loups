'use client'

import { Skeleton } from '@radix-ui/themes'
import { ComponentType, Suspense, lazy } from 'react'

interface LazyComponentProps {
  component: () => Promise<{ default: ComponentType<any> }>
  fallback?: React.ReactNode
  [key: string]: any
}

/**
 * Composant pour le lazy loading avec Suspense
 * Améliore les performances en chargeant les composants à la demande
 */
export function LazyComponent({ 
  component, 
  fallback = <DefaultSkeleton />, 
  ...props 
}: LazyComponentProps) {
  const LazyComponent = lazy(component)

  return (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  )
}

/**
 * Skeleton par défaut avec Radix UI
 */
function DefaultSkeleton() {
  return (
    <Skeleton height="16rem" width="100%" />
  )
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

/**
 * Hook pour créer des composants lazy
 */
export function createLazyComponent<T = any>(
  importFn: () => Promise<{ default: ComponentType<T> }>,
  fallback?: React.ReactNode
) {
  const LazyWrapper = (props: T) => (
    <LazyComponent component={importFn} fallback={fallback} {...props} />
  )
  LazyWrapper.displayName = 'LazyWrapper'
  return LazyWrapper
}
