"use client"
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { navigationMenu } from "@/constants/navigation_menu"
import Link from "next/link"



export function MainNavigationMenu() {
  return (
		<NavigationMenu 
			className='relative z-10 flex max-w-max flex-1 items-center justify-center'
			viewport={false}
		>
			<NavigationMenuList className='group flex flex-1 list-none items-center justify-center space-x-1'>
				{navigationMenu.map((item) => (
					<NavigationMenuItem key={item.label}>
						{item.subMenu ? (
							<>
								<NavigationMenuTrigger className='group inline-flex h-10 w-max items-center justify-center bg-transparent px-4 text-lg font-medium text-purple-9 border-b-2 border-transparent transition-colors hover:border-orange-9 hover:text-orange-9 focus:border-orange-9 focus:text-orange-9 focus:outline-none disabled:pointer-events-none disabled:opacity-50'>
									{item.label}
								</NavigationMenuTrigger>
								<NavigationMenuContent className='left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto transform -translate-x-1/2 left-1/2'>
									<div className='grid w-[200px] gap-1 p-2'>
										{item.subMenu.map((subItem) => (
											<NavigationMenuLink key={subItem.href} asChild className='w-full justify-center items-center'>
												<Link
													href={subItem.href}
													className='flex items-center w-full border-none rounded-md select-none p-3 leading-none no-underline outline-none transition-colors hover:bg-orange-3 hover:text-purple-9 focus:bg-orange-3 focus:text-purple-9 text-sm font-medium text-orange-12'>
													{subItem.label}
												</Link>
											</NavigationMenuLink>
										))}
									</div>
								</NavigationMenuContent>
							</>
						) : (
							<NavigationMenuLink asChild>
								<Link
									href={item.href || '/'}
									className='group inline-flex h-10 gap-2 w-max items-center justify-center bg-transparent px-4 text-lg border-b-2 border-transparent hover:border-orange-9 font-medium text-purple-9 transition-colors hover:text-orange-9 focus:text-orange-9 focus:border-orange-9 focus:outline-none disabled:pointer-events-none disabled:opacity-50'>
									{item.label}
								</Link>
							</NavigationMenuLink>
						)}
					</NavigationMenuItem>
				))}
			</NavigationMenuList>
		</NavigationMenu>
	)
}