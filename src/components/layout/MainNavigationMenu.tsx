'use client';
import Link from 'next/link';

import { navigationMenu } from '@/constants/navigation_menu';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from '@/ui/navigation-menu';

export function MainNavigationMenu() {
  return (
    <NavigationMenu className='relative z-10 flex max-w-max flex-1 items-center justify-center' viewport={false}>
      <NavigationMenuList className='group flex flex-1 list-none items-center justify-center space-x-1'>
        {navigationMenu.map((item) => (
          <NavigationMenuItem key={item.label}>
            {item.subMenu ? (
              <>
                <NavigationMenuTrigger className='group text-purple-9 hover:border-orange-9 hover:text-orange-9 focus:border-orange-9 focus:text-orange-9 inline-flex h-10 w-max items-center justify-center border-b-2 border-transparent bg-transparent px-4 text-lg font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50'>
                  {item.label}
                </NavigationMenuTrigger>
                <NavigationMenuContent className='data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 top-0 left-1/2 w-full -translate-x-1/2 transform md:absolute md:w-auto'>
                  <NavigationMenuList className='flex w-[200px] flex-col gap-1 p-2'>
                    {item.subMenu.map((subItem) => (
                      <NavigationMenuLink key={subItem.href} asChild className='w-full items-center justify-center'>
                        <Link
                          href={subItem.href}
                          className='hover:bg-orange-3 hover:text-purple-9 focus:bg-orange-3 focus:text-purple-9 text-orange-12 flex w-full items-center rounded-md border-none p-3 text-sm leading-none font-medium no-underline transition-colors outline-none select-none'>
                          {subItem.label}
                        </Link>
                      </NavigationMenuLink>
                    ))}
                  </NavigationMenuList>
                </NavigationMenuContent>
              </>
            ) : (
              <NavigationMenuLink asChild>
                <Link
                  href={item.href || '/'}
                  className='group hover:border-orange-9 text-purple-9 hover:text-orange-9 focus:text-orange-9 focus:border-orange-9 inline-flex h-10 w-max items-center justify-center gap-2 border-b-2 border-transparent bg-transparent px-4 text-lg font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50'>
                  {item.label}
                </Link>
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
