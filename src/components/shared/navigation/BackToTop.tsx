'use client'

import { Icon } from '@/components/icons/Icon'
import { Button } from '@/ui/button'
import { useScrollDirection, useScrollToTop } from '@/hooks/useScroll'

export function BackToTop() {
	const { visible, scrollToTop } = useScrollToTop(300)
	const scrollDirection = useScrollDirection()

	// Visible seulement si on est assez bas ET qu'on scroll vers le haut
	const shouldShow = visible && scrollDirection === 'up'

	if (!shouldShow) return null

	return (
		<Button
			onClick={scrollToTop}
			aria-label='Retour en haut de la page'
			variant="primary"
			size='icon'
			className='fixed bottom-24 right-4 z-50 h-12 w-12 !rounded-full shadow-lg shadow-purple-9/50'>
			<Icon name='chevronUp' size='lg' aria-hidden />
		</Button>
	)
}
