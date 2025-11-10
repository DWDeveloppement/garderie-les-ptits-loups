'use client'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogOverlay, DialogPortal } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { navigationMenu } from '@/constants/navigation_menu'
import { ChevronRight, X } from 'lucide-react'
import { useState } from 'react'

type MobileMenuProps = {
	isOpen: boolean
	onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
	const [expandedMenu, setExpandedMenu] = useState<string | null>(null)

	const toggleSubmenu = (label: string) => {
		setExpandedMenu(expandedMenu === label ? null : label)
	}

	// Ne pas afficher l'item "Contact" dans la liste (gardé uniquement en bouton bas de panneau)
	const menuItems = navigationMenu.filter((item) => item.label !== 'Contact')

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogPortal>
				{/* Overlay */}
				<DialogOverlay className='fixed inset-0 bg-orange-12/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0' />

				{/* Content - Slide from right */}
				<DialogContent
					showCloseButton={false}
					className='fixed right-0 left-auto top-0 h-full w-auto min-w-[18rem] max-w-[90vw] bg-orange-1 border-l border-orange-6 shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right duration-300 p-0 translate-x-0 translate-y-0 overflow-x-hidden rounded-r-none'>
					<div className='flex flex-col h-full'>
						{/* Header */}
						<div className='flex items-center justify-between py-4 px-6'>
							<h2 className='font-bold'>Menu</h2>
							<DialogClose asChild>
								<Button variant='default' size='icon' ariaLabel='Fermer le menu mobile' className='rounded-sm focus:outline-none'>
									<X className='h-6 w-6 text-purple-contrast' />
								</Button>
							</DialogClose>
						</div>
						<Separator className='my-4' />
						{/* Navigation Items */}
						<div className='flex-1'>
							<nav className='flex w-full flex-col items-start justify-start space-y-2'>
								{menuItems.map((item) => (
									<div key={item.label} className='w-full flex flex-col items-start justify-start'>
										{item.subMenu ? (
											<>
												{/* Item with submenu */}
												<Button
													size='lg'
													onClick={() => toggleSubmenu(item.label)}
													variant='ghost'
													ariaLabel={`Ouvrir le sous-menu ${item.label}`}
													className='flex w-full items-center justify-between px-3 py-3 text-left text-purple-9 hover:text-purple-11 hover:bg-orange-3 rounded-md transition-colors font-medium text-fl-lg'>
													<span className='flex-1'>{item.label}</span>
													<ChevronRight className={`h-5 w-5 transition-transform ${expandedMenu === item.label ? 'rotate-90' : ''}`} />
												</Button>

												{/* Submenu */}
												{expandedMenu === item.label && (
													<div className='w-full ml-6 space-y-1 border-l-4 border-purple-6 mt-2.5'>
														{item.subMenu.map((subItem) => (
															<Button
																asNextLink
																size='lg'
																variant='ghost'
																key={subItem.href}
																href={subItem.href}
																onClick={onClose}
																className='flex w-full items-start justify-start font-medium px-3 py-2 text-fl-lg text-purple-9 hover:text-purple-11 hover:bg-orange-3 rounded-md transition-colors text-left'
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
												className='w-full justify-start px-3 py-3 text-left text-purple-9 hover:text-purple-11 hover:bg-orange-3 rounded-md transition-colors font-medium text-fl-lg'
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
						<div className='px-6 pb-4'>
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
	)
}
