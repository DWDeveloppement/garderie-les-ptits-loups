"use client"

import { useButtonA11y } from "@/hooks/a11y"
import { useLinkA11y } from "@/hooks/a11y/useLinkA11y"
import { Slot } from "@radix-ui/react-slot"
 
import Link from "next/link"
import * as React from "react"

import { cn } from "@/lib/utils"
import type { ButtonAsAnchorProps, ButtonAsButtonProps, ButtonAsDecorativeProps, ButtonAsNextLinkProps, ButtonProps } from "@/types/components/button"
import { buttonVariants } from "./variants/button"

function Button(props: ButtonAsNextLinkProps | ButtonAsAnchorProps | ButtonAsButtonProps | ButtonAsDecorativeProps) {
  const {
    className,
    variant,
    size,
    asChild = false,
    ariaLabel,
    children,
    loading,
    asDecorative = false,
  } = props

  const isNextLinkProps = (p: ButtonProps): p is ButtonAsNextLinkProps =>
    (p as ButtonAsNextLinkProps).asNextLink === true
  const isAnchorLinkProps = (p: ButtonProps): p is ButtonAsAnchorProps =>
    (p as ButtonAsAnchorProps).asLink === true

  const isNextLink = isNextLinkProps(props)
  const isAnchorLink = isAnchorLinkProps(props)

  const href = (isNextLink || isAnchorLink) ? props.href : undefined
  const target = (isNextLink || isAnchorLink) ? props.target : undefined
  const rel = (isNextLink || isAnchorLink) ? props.rel : undefined
  const external = props.external
  const disabled = (!isNextLink && !isAnchorLink) ? (props as ButtonAsButtonProps).disabled : undefined

  // Générer les classes de base
  const baseClasses = buttonVariants({ variant, size, className })
  
  // Pour le mode décoratif : retirer uniquement les classes focus (pas d'interaction directe)
  // Les classes group-* sont gérées via className dans le composant parent si nécessaire
  const buttonClasses = asDecorative
    ? baseClasses
        .split(' ')
        .map(cls => {
          // Retire uniquement les classes focus-visible (pas d'interaction directe)
          if (cls.startsWith('focus-visible:')) return ''
          // Retire hover: (sera géré par group-hover dans className si nécessaire)
          if (cls.startsWith('hover:')) return ''
          return cls
        })
        .filter(cls => cls !== '') // Retire les classes vides
        .join(' ')
    : baseClasses

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

  // Adapte le onClick des liens pour appeler éventuellement le onClick de bouton
  const onClickForAnchor: React.MouseEventHandler<HTMLAnchorElement> | undefined =
    (isNextLink || isAnchorLink) ? (props.onClick as React.MouseEventHandler<HTMLAnchorElement> | undefined) : undefined

  // Rendu en Next.js Link
  if (isNextLink && href) {
    return (
      <Link
        href={href}
        target={linkA11y.target}
        rel={linkA11y.rel}
        aria-label={linkA11y.ariaLabel}
        role={linkA11y.role}
        tabIndex={linkA11y.tabIndex}
        className={buttonClasses}
        onClick={onClickForAnchor}
      >
        {children}
      </Link>
    )
  }

  // Rendu en lien <a>
  if (isAnchorLink && href) {
    return (
      <a
        href={href}
        target={linkA11y.target}
        rel={linkA11y.rel}
        aria-label={linkA11y.ariaLabel}
        role={linkA11y.role}
        tabIndex={linkA11y.tabIndex}
        className={buttonClasses}
        onClick={onClickForAnchor}
      >
        {children}
      </a>
    )
  }

  // Rendu en div décoratif
  if (asDecorative === true) {
    return (
      <div className={cn(buttonClasses, 'group-button')} aria-hidden='true'>
        {children}
      </div>
    )
  }

  // Rendu en bouton par défaut
  const Comp = asChild ? Slot : "button"
  let buttonRest: React.ButtonHTMLAttributes<HTMLButtonElement> | undefined
  if (!isNextLink && !isAnchorLink) {
    const btn = props as ButtonAsButtonProps
    buttonRest = { onClick: btn.onClick, type: btn.type }
  }
  return (
    <Comp
      data-slot="button"
      className={buttonClasses}
      disabled={buttonA11y.disabled}
      aria-label={buttonA11y.ariaLabel}
      aria-busy={loading || undefined}
      data-state={loading ? 'loading' : undefined}
      role={buttonA11y.role}
      tabIndex={buttonA11y.tabIndex}
      {...buttonRest}
    >
      {children}
    </Comp>
  )
}

export { Button, buttonVariants }
