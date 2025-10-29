'use client'

import { Button } from '@/components/ui/button'
import { useScrollDirection, useScrollToTop } from '@/hooks/useScroll'
import { ArrowUp } from 'lucide-react'

export function BackToTop() {
  const { visible, scrollToTop } = useScrollToTop(300)
  const scrollDirection = useScrollDirection()

  // Visible seulement si on est assez bas ET qu'on scroll vers le haut
  const shouldShow = visible && scrollDirection === 'up'

  if (!shouldShow) return null

  return (
		<Button
			onClick={scrollToTop}
			ariaLabel='Retour en haut de la page'
			variant="default"
			size="icon"
			className='fixed bottom-20 right-4 z-50 h-12 w-12 rounded-full shadow-xl/50 shadow-(color:--purple-9)'>
			<ArrowUp className='h-5 w-5' aria-hidden />
		</Button>
	)
}
