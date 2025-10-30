import { buttonVariants } from '@/components/ui/variants/button'
import type { VariantProps } from 'class-variance-authority'
import type * as React from 'react'

// Props communes à tous les rendus
export type ButtonCommonProps = {
	asChild?: boolean
	ariaLabel?: string
	loading?: boolean
	external?: boolean
}

// Rendu bouton natif
export type ButtonAsButtonProps = React.ComponentProps<'button'> &
	VariantProps<typeof buttonVariants> &
	ButtonCommonProps & {
		asNextLink?: false
		asLink?: false
	}

// Rendu lien externe <a>
export type ButtonAsAnchorProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> &
	VariantProps<typeof buttonVariants> &
	ButtonCommonProps & {
		asLink: true
		href: string
		asNextLink?: false
	}

// Rendu Next.js Link
export type ButtonAsNextLinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> &
	VariantProps<typeof buttonVariants> &
	ButtonCommonProps & {
		asNextLink: true
		href: string
		asLink?: false
	}

// Union discriminée des props publiques
export type ButtonProps = ButtonAsNextLinkProps | ButtonAsAnchorProps | ButtonAsButtonProps
