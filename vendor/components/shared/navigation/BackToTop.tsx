'use client'

import { Button } from '@/components/ui/button'
import { useScrollDirection, useScrollToTop } from '@/hooks/utils/useScroll'
import { ArrowUp } from 'lucide-react'

export function BackToTop() {
  const { visible, scrollToTop } = useScrollToTop(300)
  const scrollDirection = useScrollDirection()

  // Visible seulement si on est assez bas ET qu'on scroll vers le haut
  const shouldShow = visible && scrollDirection === 'up'

  if (!shouldShow) return null

  return (
		<Button
			variant="primary"
			size="icon"
			onClick={scrollToTop}
			ariaLabel='Retour en haut de la page'
			className='fixed bottom-20 right-4 z-50 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300'>
			<ArrowUp className='h-5 w-5' aria-hidden />
		</Button>
	)
}
