'use client'

import { useScrollDirection, useScrollToTop } from '@/hooks/useScroll'
import { ArrowUp } from 'lucide-react'

export function BackToTop() {
  const { visible, scrollToTop } = useScrollToTop(300)
  const scrollDirection = useScrollDirection()

  // Visible seulement si on est assez bas ET qu'on scroll vers le haut
  const shouldShow = visible && scrollDirection === 'up'

  if (!shouldShow) return null

  return (
    <button
      onClick={scrollToTop}
      aria-label="Retour en haut de la page"
      className="fixed bottom-20 right-4 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full bg-purple-9 text-white shadow-lg transition-all hover:bg-purple-10 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-9/50"
    >
      <ArrowUp className="h-5 w-5" aria-hidden />
    </button>
  )
}
