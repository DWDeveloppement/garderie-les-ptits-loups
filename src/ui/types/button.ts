import { VariantProps } from 'class-variance-authority'
import { buttonVariants } from '@ui/variants/button'

export type ButtonMode = 'button' | 'link' | 'next-link' | 'decorative'

export interface ButtonProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof buttonVariants> {
	/**
	 * Mode de rendu
	 */
	mode?: ButtonMode

	/**
	 * Rendu asChild via Radix
	 */
	asChild?: boolean

	/**
	 * Lien (pour link / next-link)
	 */
	href?: string

	/**
	 * Empêche l'interaction
	 */
	decorative?: boolean

	/**
	 * Désactive le bouton
	 */
	disabled?: boolean

	/**
	 * État de chargement
	 */
	loading?: boolean
}
