"use client"

import { useButtonA11y } from "@/hooks/a11y"
import { useLinkA11y } from "@/hooks/a11y/useLinkA11y"
import { Slot } from "@radix-ui/react-slot"
import { type VariantProps } from "class-variance-authority"
import Link from "next/link"
import * as React from "react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "./variants/button"

function Button({
  className,
  variant,
  size,
  asChild = false,
  ariaLabel,
  children,
  disabled,
  loading,
  
  // Props pour le rendu en lien
  asLink = false,
  asNextLink = false,
  href,
  target,
  rel,
  external = false,
  
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    ariaLabel?: string
    loading?: boolean
    
    // Props pour le rendu en lien
    asLink?: boolean
    asNextLink?: boolean
    href?: string
    target?: string
    rel?: string
    external?: boolean
  }) {
  
  const buttonClasses = cn(buttonVariants({ variant, size, className }))

  // Hook d'accessibilité pour les liens (si asLink ou asNextLink)
  const linkA11y = useLinkA11y({
    href: href || '#',
    children,
    ariaLabel,
    target,
    rel,
    external
  })

  // Hook d'accessibilité pour les boutons (si asLink = false)
  const buttonA11y = useButtonA11y({
    ariaLabel,
    children,
    disabled,
    loading
  })

  // Rendu en Next.js Link
  if (asNextLink && href) {
    return (
      <Link
        href={href}
        target={linkA11y.target}
        rel={linkA11y.rel}
        aria-label={linkA11y.ariaLabel}
        role={linkA11y.role}
        tabIndex={linkA11y.tabIndex}
        className={buttonClasses}
      >
        {loading && (
          <svg
            className="mr-2 h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </Link>
    )
  }

  // Rendu en lien <a>
  if (asLink && href) {
    return (
      <a
        href={href}
        target={linkA11y.target}
        rel={linkA11y.rel}
        aria-label={linkA11y.ariaLabel}
        role={linkA11y.role}
        tabIndex={linkA11y.tabIndex}
        className={buttonClasses}
      >
        {loading && (
          <svg
            className="mr-2 h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </a>
    )
  }

  // Rendu en bouton par défaut
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      data-slot="button"
      className={buttonClasses}
      disabled={buttonA11y.disabled}
      aria-label={buttonA11y.ariaLabel}
      role={buttonA11y.role}
      tabIndex={buttonA11y.tabIndex}
      {...props}
    >
      {loading && (
        <svg
          className="mr-2 h-4 w-4 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </Comp>
  )
}

export { Button, buttonVariants }
