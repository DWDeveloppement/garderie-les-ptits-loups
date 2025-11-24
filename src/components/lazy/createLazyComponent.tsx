'use client';

import { type ComponentType, type ReactNode, Suspense, lazy } from 'react';

import { SectionSkeleton } from './LazySkeletons';

function DefaultSkeleton() {
  return <SectionSkeleton />;
}

/**
 * createLazyComponent
 * - Typage strict côté props
 * - Typage détendu sur le loader pour éviter les unions infernales de Promise
 */
export function createLazyComponent<P extends Record<string, unknown> = Record<string, unknown>>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  loader: () => Promise<{ default: ComponentType<any> }>, // 👈 any volontaire pour éviter les unions infernales de Promise
  fallback: ReactNode = <DefaultSkeleton />
) {
  const Lazy = lazy(loader);

  const LazyWrapper = (props: P) => (
    <Suspense fallback={fallback}>
      <Lazy {...props} />
    </Suspense>
  );

  return LazyWrapper;
}
