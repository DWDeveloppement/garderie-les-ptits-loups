"use client"
import { MainNavigationMenu, MobileMenu } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { useMobileMenuControl } from "@/hooks/useWindowSize"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Hook pour fermer le menu mobile automatiquement au passage desktop
  useMobileMenuControl(isMenuOpen, 'md',closeMenu); // 768px = breakpoint md de Tailwind

  return (
		<header className='flex items-center bg-purple-1 shadow-sm sticky top-0 z-30 border-b border-orange-6 h-18'>
			<div className='w-full px-4 sm:px-6 lg:px-8'>
				<div className='flex items-center justify-between h-16'>
					{/* Logo */}
					<div className='flex items-center space-x-2'>
						<Image src='/navbar-logo.webp' alt='Logo' width={100} height={100} />
						<h1 className='hidden sr-only'>Garderie Les P&apos;tits Loups</h1>
					</div>

					{/* Navigation Desktop */}
					<div className="hidden md:block">
						<MainNavigationMenu />
					</div>

					{/* Attention pas de boutton contact dans le header */}

					{/* Menu Mobile */}
					<div className='md:hidden'>
						<Button variant='ghost' size='icon' onClick={toggleMenu} className='hover:bg-orange-3'>
							{isMenuOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
						</Button>
					</div>
				</div>

				{/* Menu Mobile */}
				<MobileMenu isOpen={isMenuOpen} onClose={closeMenu} />
			</div>
		</header>
	)
}
