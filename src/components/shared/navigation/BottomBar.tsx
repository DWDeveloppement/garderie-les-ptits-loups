'use client'

import { Fragment, useEffect, useState } from 'react'

import { Icon } from '@/components/icons/Icon'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { MAP_INFO_DEFAULT } from '@/constants/map_info_default'
import { useMapLocation, useScrollDirection } from '@/hooks'
import type { MapLocation } from '@/types/map'

type BottomBarProps = {
	location?: MapLocation
	phoneNumber?: string
	email?: string
	className?: string
}

export function BottomBar({ location = MAP_INFO_DEFAULT, phoneNumber, email, className }: BottomBarProps) {
	const { openSmartDirections } = useMapLocation(location)
	const scrollDirection = useScrollDirection(8)
	const [isAtBottom, setIsAtBottom] = useState(false)
	const [hasScrolled, setHasScrolled] = useState(false)

	useEffect(() => {
		const threshold = 24
		const checkPosition = () => {
			const doc = document.documentElement
			const scrolled = window.innerHeight + window.scrollY
			const limit = doc.scrollHeight - threshold
			setIsAtBottom(scrolled >= limit)

			// Marquer qu'un scroll a eu lieu après le chargement initial
			if (!hasScrolled && window.scrollY > 0) {
				setHasScrolled(true)
			}
		}

		checkPosition()
		window.addEventListener('scroll', checkPosition, { passive: true })
		window.addEventListener('resize', checkPosition)

		return () => {
			window.removeEventListener('scroll', checkPosition)
			window.removeEventListener('resize', checkPosition)
		}
	}, [hasScrolled])

	const actions: Array<{
		id: string
		icon: 'phone' | 'mail' | 'mapPin'
		ariaLabel: string
		srText: string
		href?: string
		onClick?: () => void
	}> = [
		{
			id: 'call',
			icon: 'phone',
			href: `tel:${phoneNumber}`,
			ariaLabel: `Appeler ${location.name}`,
			srText: 'Appeler',
		},
		{
			id: 'mail',
			icon: 'mail',
			href: `mailto:${email}`,
			ariaLabel: `Écrire un email à ${location.name}`,
			srText: `Écrire un email à ${location.name}`,
		},
		{
			id: 'directions',
			icon: 'mapPin',
			onClick: openSmartDirections,
			ariaLabel: `Ouvrir l'itinéraire vers ${location.name}`,
			srText: `Ouvrir l'itinéraire vers ${location.name}`,
		},
	]

	return (
		<div
			className={`border-t border-orange-6 shadow-sm pointer-events-none md:hidden fixed inset-x-0 bottom-0 z-40 transition-transform duration-300 will-change-transform ${
				!hasScrolled || (scrollDirection === 'down' && !isAtBottom) ? 'translate-y-full' : 'translate-y-0'
			}`}>
			<nav
				aria-label='Actions principales'
				className={`pointer-events-auto flex items-stretch justify-around gap-2 py-4 px-8 bg-orange-1/95 backdrop-blur supports-[backdrop-filter]:bg-orange-2 ${className}`}>
				{actions.map((action, index) => {
					const linkProps = action.href
						? ({ asLink: true as const, href: action.href } as const)
						: action.onClick
							? ({ onClick: action.onClick } as const)
							: ({} as const)

					return (
						<Fragment key={action.id}>
							<Button
								variant='default'
								size='icon'
								{...linkProps}
								ariaLabel={action.ariaLabel}
								className='group flex flex-col items-center justify-center gap-1 transition-all active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-9/50 h-12 w-12'>
								<Icon name={action.icon} size='lg' aria-hidden />
								<span className='sr-only'>{action.srText}</span>
							</Button>

							{index < actions.length - 1 && <Separator orientation='vertical' className='!w-0.5 bg-orange-6 !h-auto' />}
						</Fragment>
					)
				})}
			</nav>
		</div>
	)
}
