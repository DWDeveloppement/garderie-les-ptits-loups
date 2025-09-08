"use client"
import { navigationMenu } from "@/constants/navigation_menu"
import * as NavigationMenu from "@radix-ui/react-navigation-menu"
import { ChevronDown } from "lucide-react"
import Link from "next/link"



export function MainNavigationMenu() {
  return (
		<NavigationMenu.Root className='relative z-10 flex max-w-max flex-1 items-center justify-center'>
			<NavigationMenu.List className='group flex flex-1 list-none items-center justify-center space-x-1'>
				{navigationMenu.map((item) => (
					<NavigationMenu.Item key={item.label}>
						{item.subMenu ? (
							<>
								<NavigationMenu.Trigger className='group inline-flex h-10 w-max items-center justify-center bg-transparent px-4 text-lg font-medium text-purple-9 border-b-2 border-transparent transition-colors hover:border-orange-9 hover:text-orange-9 focus:border-orange-9 focus:text-orange-9 focus:outline-none disabled:pointer-events-none disabled:opacity-50'>
									{item.label}
									<ChevronDown size={24}
										className='relative top-[1px] transition duration-200 group-data-[state=open]:rotate-180'
										aria-hidden='true'
									/>
								</NavigationMenu.Trigger>
								<NavigationMenu.Content className='left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto'>
									<div className='grid w-[300px] gap-1 p-4'>
										{item.subMenu.map((subItem) => (
											<NavigationMenu.Link key={subItem.href} asChild>
												<Link
													href={subItem.href}
													className='block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-orange-3 hover:text-purple-9 focus:bg-orange-3 focus:text-purple-9 text-sm font-medium text-orange-12'>
													{subItem.label}
												</Link>
											</NavigationMenu.Link>
										))}
									</div>
								</NavigationMenu.Content>
							</>
						) : (
							<NavigationMenu.Link asChild>
								<Link
									href={item.href || '/'}
									className='group inline-flex h-10 gap-2 w-max items-center justify-center bg-transparent px-4 text-lg border-b-2 border-transparent hover:border-orange-9 font-medium text-purple-9 transition-colors hover:text-orange-9 focus:text-orange-9 focus:border-orange-9 focus:outline-none disabled:pointer-events-none disabled:opacity-50'>
									{item.label}
								</Link>
							</NavigationMenu.Link>
						)}
					</NavigationMenu.Item>
				))}
			</NavigationMenu.List>

			<div className='absolute left-1/2 top-full flex -translate-x-1/2 mt-3 justify-center'>
				<NavigationMenu.Viewport className='origin-top-center relative mt-2.5 h-[var(--radix-navigation-menu-viewport-height)] z-40 overflow-hidden rounded-md border border-orange-6 bg-orange-1 text-orange-12 shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 w-[var(--radix-navigation-menu-viewport-width)]' />
				<NavigationMenu.Indicator className='data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in top-[100%] z-50 flex h-1.5 items-end mt-3 justify-center overflow-hidden'>
					<div className='relative top-[120%] h-4 w-4 rotate-45 rounded-tl-sm bg-orange-1 border-l border-t border-orange-6 shadow-md' />
				</NavigationMenu.Indicator>
			</div>
		</NavigationMenu.Root>
	)
}