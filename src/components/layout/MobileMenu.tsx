"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
} from "@/components/ui/dialog"
import { navigationMenu } from "@/constants/navigation_menu"
import { ChevronRight, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

type MobileMenuProps = {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null)

  const toggleSubmenu = (label: string) => {
    setExpandedMenu(expandedMenu === label ? null : label)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogPortal>
        {/* Overlay */}
        <DialogOverlay className="fixed inset-0 bg-orange-12/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        
        {/* Content - Slide from right */}
        <DialogContent 
          showCloseButton={false}
          className="fixed right-0 top-0 h-full w-80 bg-orange-1 border-l border-orange-6 shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right duration-300 p-0 max-w-none translate-x-0 translate-y-0"
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-orange-6">
              <h2 className="text-lg font-semibold text-orange-12">Menu</h2>
              <DialogClose asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  ariaLabel="Fermer le menu mobile"
                  className="rounded-sm opacity-70 ring-offset-orange-1 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-purple-9 focus:ring-offset-2">
                  <X className="h-6 w-6 text-orange-11" />
                </Button>
              </DialogClose>
            </div>

            {/* Navigation Items */}
            <div className="flex-1 overflow-y-auto p-4">
              <nav className="space-y-2">
                {navigationMenu.map((item) => (
                  <div key={item.label}>
                    {item.subMenu ? (
                      <>
                        {/* Item with submenu */}
                        <Button
                          onClick={() => toggleSubmenu(item.label)}
                          variant="ghost"
                          ariaLabel={`Ouvrir le sous-menu ${item.label}`}
                          className="flex items-center justify-between w-full px-3 py-3 text-left text-orange-11 hover:text-purple-9 hover:bg-orange-3 rounded-md transition-colors font-medium"
                        >
                          <span>{item.label}</span>
                          <ChevronRight 
                            className={`h-4 w-4 transition-transform ${
                              expandedMenu === item.label ? 'rotate-90' : ''
                            }`} 
                          />
                        </Button>
                        
                        {/* Submenu */}
                        {expandedMenu === item.label && (
                          <div className="ml-4 space-y-1 border-l border-orange-6 pl-4 mt-2">
                            {item.subMenu.map((subItem) => (
                              <Link
                                key={subItem.href}
                                href={subItem.href}
                                onClick={onClose}
                                className="block px-3 py-2 text-sm text-orange-11 hover:text-purple-9 hover:bg-orange-3 rounded-md transition-colors"
                              >
                                {subItem.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      /* Simple item */
                      <Link
                        href={item.href || "/"}
                        onClick={onClose}
                        className="block px-3 py-3 text-orange-11 hover:text-purple-9 hover:bg-orange-3 rounded-md transition-colors font-medium"
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-orange-6">
              <Link
                href="/contact"
                onClick={onClose}
                className="block w-full px-4 py-3 bg-purple-9 hover:bg-purple-10 text-purple-contrast text-center rounded-md font-medium transition-colors"
              >
                Nous contacter
              </Link>
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}