'use client'
import { MainNavigationMenu, MobileMenu } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { useMobileMenuControl } from '../../../hooks/useWindowSize'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Icon } from '../icons/Icon'

export function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
	const closeMenu = () => setIsMenuOpen(false)

	// Hook pour fermer le menu mobile automatiquement au passage desktop
	useMobileMenuControl(isMenuOpen, 'md', closeMenu) // 768px = breakpoint md de Tailwind

	return (
		<header className='flex items-center bg-purple-1 shadow-sm sticky top-0 z-30 border-b border-orange-6 h-18'>
			<div className='w-full px-4 sm:px-6 lg:px-8'>
				<div className='flex items-center justify-between h-16'>
					{/* Logo */}
					<div className='flex items-center space-x-2'>
						<Link href='/'>
							<Image src='/navbar-logo.webp' alt='Logo' width={100} height={100} />
						</Link>
						<h1 className='hidden sr-only'>Garderie Les P&apos;tits Loups</h1>
					</div>

					{/* Navigation Desktop */}
					<div className='hidden md:block'>
						<MainNavigationMenu />
					</div>

					{/* Attention pas de boutton contact dans le header */}

					{/* Menu Mobile */}
					<div className='md:hidden'>
						<Button
							className='h-12 w-12 focus:outline-none'
							size='icon'
							variant='default'
							onClick={toggleMenu}
							ariaLabel='Ouvrir le menu mobile'
							aria-expanded={isMenuOpen}>
							<Icon name='menu' size='xl' aria-hidden />
							<span className='sr-only'>Ouvrir le menu mobile</span>
						</Button>
					</div>
				</div>

				{/* Menu Mobile */}
				{isMenuOpen && <MobileMenu isOpen={isMenuOpen} onClose={closeMenu} aria-label='Menu mobile' />}
			</div>
		</header>
	)
}
