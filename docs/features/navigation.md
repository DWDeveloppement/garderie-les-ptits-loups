# Features - Navigation

## 📊 Vue d'ensemble

Système de navigation responsive avec menu mobile, accessibilité clavier et animations.

**Stack** : Radix UI NavigationMenu · Framer Motion · Next.js Link

---

## 🧩 Composants

### `Header.tsx`

**Chemin** : `src/components/layout/Header.tsx`

```tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { NavigationMenu } from '@/components/ui/navigation-menu'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="Les P'tits Loups" className="h-10" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex">
          <NavigationMenu>
            <NavigationMenuItem>
              <Link href="/">Accueil</Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/a-propos">À propos</Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>La Structure</NavigationMenuTrigger>
              <NavigationMenuContent>
                <Link href="/la-structure/nurserie">Nurserie</Link>
                <Link href="/la-structure/trotteurs">Trotteurs</Link>
                <Link href="/la-structure/grands">Grands</Link>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/horaires-tarifs">Horaires & Tarifs</Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/contact">Contact</Link>
            </NavigationMenuItem>
          </NavigationMenu>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200"
          >
            <div className="container py-4 space-y-2">
              <MobileNavLink href="/" onClick={() => setMobileMenuOpen(false)}>
                Accueil
              </MobileNavLink>
              <MobileNavLink href="/a-propos" onClick={() => setMobileMenuOpen(false)}>
                À propos
              </MobileNavLink>
              <MobileNavLink href="/la-structure/nurserie" onClick={() => setMobileMenuOpen(false)}>
                Nurserie
              </MobileNavLink>
              <MobileNavLink href="/la-structure/trotteurs" onClick={() => setMobileMenuOpen(false)}>
                Trotteurs
              </MobileNavLink>
              <MobileNavLink href="/la-structure/grands" onClick={() => setMobileMenuOpen(false)}>
                Grands
              </MobileNavLink>
              <MobileNavLink href="/horaires-tarifs" onClick={() => setMobileMenuOpen(false)}>
                Horaires & Tarifs
              </MobileNavLink>
              <MobileNavLink href="/contact" onClick={() => setMobileMenuOpen(false)}>
                Contact
              </MobileNavLink>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
```

---

## 🎨 Navigation Menu (Radix UI)

### Installation

```bash
npx shadcn@latest add navigation-menu
```

### Configuration

**Fichier** : `src/components/ui/navigation-menu.tsx`

```tsx
import * as React from 'react'
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu'
import { cn } from '@/lib/utils'

const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn('relative z-10 flex max-w-max', className)}
    {...props}
  >
    {children}
  </NavigationMenuPrimitive.Root>
))

const NavigationMenuItem = NavigationMenuPrimitive.Item
const NavigationMenuTrigger = NavigationMenuPrimitive.Trigger
const NavigationMenuContent = NavigationMenuPrimitive.Content
const NavigationMenuLink = NavigationMenuPrimitive.Link

export {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink
}
```

---

## 📱 Menu Mobile

### Toggle Animation

```tsx
<AnimatePresence>
  {mobileMenuOpen && (
    <motion.nav
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Navigation links */}
    </motion.nav>
  )}
</AnimatePresence>
```

---

### Focus Trap

Piéger le focus dans le menu ouvert.

```tsx
import { useFocusTrap } from '@/hooks/a11y/useFocusA11y'

export function MobileMenu() {
  const menuRef = useRef<HTMLDivElement>(null)
  useFocusTrap(menuRef, isOpen)

  return <div ref={menuRef}>{/* Menu items */}</div>
}
```

---

### Fermeture au Clic Extérieur

```tsx
import { useEffect, useRef } from 'react'

export function MobileMenu({ isOpen, onClose }) {
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  return <div ref={menuRef}>{/* Menu items */}</div>
}
```

---

## 🎯 Accessibilité

### ARIA Labels

```tsx
<button
  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
  aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
  aria-expanded={mobileMenuOpen}
  aria-controls="mobile-menu"
>
  {mobileMenuOpen ? <X /> : <Menu />}
</button>

<nav
  id="mobile-menu"
  aria-label="Navigation principale"
  hidden={!mobileMenuOpen}
>
  {/* Navigation links */}
</nav>
```

---

### Navigation Clavier

| Touche | Action |
|--------|--------|
| `Tab` | Naviguer entre liens |
| `Shift + Tab` | Navigation arrière |
| `Enter` / `Space` | Activer lien |
| `Escape` | Fermer menu mobile |
| `←` / `→` | Navigation sous-menus |

---

### Skip to Content

```tsx
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:p-4 focus:bg-white"
>
  Aller au contenu principal
</a>
```

---

## 🎨 Styles

### Active Link

```tsx
'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={cn(
        'px-4 py-2 rounded-lg transition-colors',
        isActive
          ? 'bg-purple-9 text-white'
          : 'text-gray-700 hover:bg-gray-100'
      )}
    >
      {children}
    </Link>
  )
}
```

---

### Sticky Header

```tsx
<header className="sticky top-0 z-50 bg-white border-b border-gray-200 backdrop-blur-lg bg-white/80">
  {/* Navigation */}
</header>
```

---

## 🚀 Performance

### Prefetch Links

Next.js précharge automatiquement les liens visibles.

```tsx
<Link href="/contact" prefetch={true}>
  Contact
</Link>
```

---

### Code Splitting

Lazy load menu mobile uniquement si nécessaire.

```tsx
import dynamic from 'next/dynamic'

const MobileMenu = dynamic(() => import('./MobileMenu'), {
  ssr: false
})
```

---

## 📚 Références

- **Radix UI NavigationMenu** : https://www.radix-ui.com/docs/primitives/components/navigation-menu
- **Framer Motion** : https://www.framer.com/motion/
- **Next.js Link** : https://nextjs.org/docs/app/api-reference/components/link

---

**Dernière mise à jour** : 2025-12-03
**Version** : 1.0.0
