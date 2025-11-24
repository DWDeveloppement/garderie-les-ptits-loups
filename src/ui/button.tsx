'use client'

import React from 'react'
import Link from 'next/link'

import { cn } from '@ui/lib/utils'
import { buttonVariants } from '@ui/variants/button'
import { ButtonProps } from '@ui/types/button'
import { useButtonA11yProps } from '@hooks/a11y'
import { getButtonComponent } from '@ui/lib/getButtonComponent'

export const Button = React.forwardRef<HTMLElement, ButtonProps>(
	(
		{
			mode = 'button',
			variant,
			size,
			rounded,
			decorative = false,
			asChild = false,
			href,
			children,
			className,
			disabled,
			loading,
			...props
		},
		ref
	) => {
		/**
		 * --------------------------------------------------------------
		 * 1. Détermination du composant final (Comp)
		 * --------------------------------------------------------------
		 * Responsabilité : Déléguée à getButtonComponent()
		 */
		const Comp = getButtonComponent({ mode, asChild, href })

		/**
		 * --------------------------------------------------------------
		 * 2. Props d'accessibilité (A11y)
		 * --------------------------------------------------------------
		 * Responsabilité : Déléguée à useButtonA11yProps()
		 */
		const a11yProps = useButtonA11yProps({ mode, href, disabled, loading })

		/**
		 * --------------------------------------------------------------
		 * 3. Classes CSS
		 * --------------------------------------------------------------
		 * Responsabilité : Génération des classes via CVA
		 */
		const classes = cn(buttonVariants({ variant, size, rounded, decorative }), className)

		/**
		 * --------------------------------------------------------------
		 * 4. Rendu
		 * --------------------------------------------------------------
		 * Responsabilité unique : Orchestrer le rendu du composant
		 */
		if (Comp === Link && href) {
			return (
				<Link
					href={href}
					ref={(node) => {
						if (typeof ref === 'function') {
							ref(node)
						} else if (ref) {
							;(ref as React.MutableRefObject<HTMLElement | null>).current = node
						}
					}}
					className={classes}
					{...a11yProps}
					{...props}>
					{children}
				</Link>
			)
		}

		return (
			<Comp ref={ref} href={href} className={classes} {...a11yProps} {...props}>
				{children}
			</Comp>
		)
	}
)

Button.displayName = 'Button'
