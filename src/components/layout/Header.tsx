'use client';
import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { MainNavigationMenu, MobileMenu } from '@/components/layout';
import { Button } from '@/ui/button';

import { useMobileMenuControl } from '@/hooks/useWindowSize';
import { Icon } from '../icons/Icon';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Hook pour fermer le menu mobile automatiquement au passage desktop
  useMobileMenuControl(isMenuOpen, 'md', closeMenu); // 768px = breakpoint md de Tailwind

  return (
    <header className='bg-purple-1 border-orange-6 sticky top-0 z-30 flex h-18 items-center border-b shadow-sm'>
      <div className='w-full px-4 sm:px-6 lg:px-8'>
        <div className='flex h-16 items-center justify-between'>
          {/* Logo */}
          <div className='flex items-center space-x-2'>
            <Link href='/'>
              <Image src='/navbar-logo.webp' alt='Logo' width={100} height={100} />
            </Link>
            <h1 className='sr-only hidden'>Garderie Les P&apos;tits Loups</h1>
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
              variant="primary"
              onClick={toggleMenu}
              aria-label='Ouvrir le menu mobile'
              aria-expanded={isMenuOpen}>
              <Icon name='menu' size='lg' aria-hidden />
              <span className='sr-only'>Ouvrir le menu mobile</span>
            </Button>
          </div>
        </div>

        {/* Menu Mobile */}
        {isMenuOpen && <MobileMenu isOpen={isMenuOpen} onClose={closeMenu} aria-label='Menu mobile' />}
      </div>
    </header>
  );
}
