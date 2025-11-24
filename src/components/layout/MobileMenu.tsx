'use client';
import { useState } from 'react';

import { navigationMenu } from '@/constants/navigation_menu';
import { Button } from '@/ui/button';
import { Dialog, DialogClose, DialogContent, DialogOverlay, DialogPortal } from '@/ui/dialog';
import { Separator } from '@/ui/separator';

import { Icon } from '../icons/Icon';

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  const toggleSubmenu = (label: string) => {
    setExpandedMenu(expandedMenu === label ? null : label);
  };

  // Ne pas afficher l'item "Contact" dans la liste (gardé uniquement en bouton bas de panneau)
  const menuItems = navigationMenu.filter((item) => item.label !== 'Contact');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogPortal>
        {/* Overlay */}
        <DialogOverlay className='bg-orange-12/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 backdrop-blur-sm' />

        {/* Content - Slide from right */}
        <DialogContent
          showCloseButton={false}
          className='bg-orange-1 border-orange-6 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right fixed top-0 right-0 left-auto h-full w-auto max-w-[90vw] min-w-[18rem] translate-x-0 translate-y-0 overflow-x-hidden rounded-r-none border-l p-0 shadow-lg duration-300'>
          <div className='flex h-full flex-col'>
            {/* Header */}
            <div className='flex items-center justify-between px-8 pt-4'>
              <h2 className='text-fl-xl font-bold'>Menu</h2>
              <DialogClose asChild>
                <Button
                  variant='default'
                  size='icon'
                  ariaLabel='Fermer le menu mobile'
                  className='h-12 w-12 focus:outline-none'
                  aria-expanded={isOpen}>
                  <Icon name='close' size='xl' aria-hidden />
                </Button>
              </DialogClose>
            </div>
            <Separator className='my-4' />
            {/* Navigation Items */}
            <div className='flex-1 px-4'>
              <nav className='flex w-full flex-col items-start justify-start space-y-4'>
                {menuItems.map((item) => (
                  <div key={item.label} className='flex w-full flex-col items-start justify-start space-y-4'>
                    {item.subMenu ? (
                      <>
                        {/* Item with submenu */}
                        <Button
                          size='lg'
                          onClick={() => toggleSubmenu(item.label)}
                          variant='ghost'
                          ariaLabel={`Ouvrir le sous-menu ${item.label}`}
                          className='text-purple-9 hover:text-purple-11 hover:bg-orange-3 text-fl-lg mb-0 flex w-full items-center justify-between rounded-md text-left font-medium transition-colors'>
                          <span className='flex-1'>{item.label}</span>
                          <Icon
                            name='chevronRight'
                            size='xl'
                            aria-hidden
                            className={`transition-transform ${expandedMenu === item.label ? 'rotate-90' : ''}`}
                          />
                        </Button>

                        {/* Submenu */}
                        {expandedMenu === item.label && (
                          <div className='border-purple-6 mt-1 mb-2 ml-6 w-auto space-y-1 border-l-4 pl-1'>
                            {item.subMenu.map((subItem) => (
                              <Button
                                asNextLink
                                size='lg'
                                variant='ghost'
                                key={subItem.href}
                                href={subItem.href}
                                onClick={onClose}
                                className='text-fl-lg text-purple-9 hover:text-purple-11 hover:bg-orange-3 flex w-full items-center justify-start rounded-md text-left font-medium transition-colors'
                                ariaLabel={`Aller à la page ${subItem.label}`}>
                                {subItem.label}
                              </Button>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      /* Simple item */
                      <Button
                        asNextLink
                        size='lg'
                        variant='ghost'
                        href={item.href || '/'}
                        onClick={onClose}
                        className='text-purple-9 hover:text-purple-11 hover:bg-orange-3 text-fl-lg flex w-full items-center justify-start rounded-md text-left font-medium transition-colors'
                        ariaLabel={`Aller à la page ${item.label}`}>
                        {item.label}
                      </Button>
                    )}
                  </div>
                ))}
              </nav>
            </div>

            {/* Footer */}
            <Separator className='my-4' />
            <div className='px-8 pb-4'>
              <Button
                asNextLink
                href='/contact'
                ariaLabel='Aller à la page Contact'
                onClick={onClose}
                variant='default'
                size='xl'
                className='w-full'>
                Nous contacter
              </Button>
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
