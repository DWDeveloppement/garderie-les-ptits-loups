import { cva, type VariantProps } from 'class-variance-authority'

export const buttonVariants = cva(
	// Base styles - styles communs à tous les boutons
	[
		'inline-flex items-center justify-center gap-2',
		'whitespace-nowrap rounded-md text-sm font-medium',
		'ring-offset-background transition-colors',
		'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
		'disabled:pointer-events-none disabled:opacity-50',
		'transition-all duration-200 ease-in-out',
	],
	{
		variants: {
			variant: {
				// Bouton principal - Purple avec fallback Radix
				primary: [
					'bg-purple-9 text-white shadow-sm',
					'hover:bg-purple-10 hover:shadow-md',
					'active:bg-purple-11 active:scale-95',
					'focus-visible:ring-purple-8/20',
					// Fallback Radix colors
					'[&:not([data-accent-color])]:bg-accent-9',
					'[&:not([data-accent-color])]:text-accent-contrast',
					'[&:not([data-accent-color])]:hover:bg-accent-10',
					'[&:not([data-accent-color])]:focus-visible:ring-accent-8/20',
				],
				// Bouton secondaire - Orange avec fallback Radix
				secondary: [
					'bg-orange-9 text-white shadow-sm',
					'hover:bg-orange-10 hover:shadow-md',
					'active:bg-orange-11 active:scale-95',
					'focus-visible:ring-orange-8/20',
					// Fallback Radix colors
					'[&:not([data-accent-color])]:bg-accent-9',
					'[&:not([data-accent-color])]:text-accent-contrast',
					'[&:not([data-accent-color])]:hover:bg-accent-10',
					'[&:not([data-accent-color])]:focus-visible:ring-accent-8/20',
				],
				// Bouton outline - Bordure purple avec fallback Radix
				outline: [
					'border border-purple-7 bg-transparent text-purple-11',
					'hover:bg-purple-2 hover:border-purple-8 hover:text-purple-12',
					'active:bg-purple-3 active:border-purple-9',
					'focus-visible:ring-purple-8/20',
					// Fallback Radix colors
					'[&:not([data-accent-color])]:border-accent-7',
					'[&:not([data-accent-color])]:text-accent-11',
					'[&:not([data-accent-color])]:hover:bg-accent-2',
					'[&:not([data-accent-color])]:hover:border-accent-8',
					'[&:not([data-accent-color])]:hover:text-accent-12',
					'[&:not([data-accent-color])]:focus-visible:ring-accent-8/20',
				],
				// Bouton ghost - Transparent avec fallback Radix
				ghost: [
					'bg-transparent text-purple-11',
					'hover:bg-purple-2 hover:text-purple-12',
					'active:bg-purple-3',
					'focus-visible:ring-purple-8/20',
					// Fallback Radix colors
					'[&:not([data-accent-color])]:text-accent-11',
					'[&:not([data-accent-color])]:hover:bg-accent-2',
					'[&:not([data-accent-color])]:hover:text-accent-12',
					'[&:not([data-accent-color])]:focus-visible:ring-accent-8/20',
				],
				// Bouton destructif - Utilise directement les couleurs Radix
				destructive: [
					// Couleurs Radix par défaut (plus vives)
					'bg-red-9 text-red-contrast shadow-sm',
					'hover:bg-red-10 hover:shadow-md',
					'active:bg-red-11 active:scale-95',
					'focus-visible:ring-red-8/20',
				],
				// Bouton lien - Style lien avec fallback Radix
				link: [
					'text-purple-9 underline-offset-4',
					'hover:underline hover:text-purple-10',
					'active:text-purple-11',
					'focus-visible:ring-purple-8/20',
					// Fallback Radix colors
					'[&:not([data-accent-color])]:text-accent-9',
					'[&:not([data-accent-color])]:hover:text-accent-10',
					'[&:not([data-accent-color])]:active:text-accent-11',
					'[&:not([data-accent-color])]:focus-visible:ring-accent-8/20',
				],
			},
			size: {
				sm: 'h-8 px-3 text-xs',
				md: 'h-9 px-4 text-sm',
				lg: 'h-10 px-6 text-base',
				xl: 'h-12 px-8 text-lg',
				icon: 'h-9 w-9', // Bouton carré pour icônes
			},
			// Variants pour les états spéciaux
			state: {
				default: '',
				loading: 'cursor-wait',
				success: [
					// Couleurs Radix par défaut (plus vives)
					'bg-green-9 text-green-contrast shadow-sm',
					'hover:bg-green-10 hover:shadow-md',
					'active:bg-green-11 active:scale-95',
					'focus-visible:ring-green-8/20',
				],
				error: [
					// Couleurs Radix par défaut (plus vives)
					'bg-red-9 text-red-contrast shadow-sm',
					'hover:bg-red-10 hover:shadow-md',
					'active:bg-red-11 active:scale-95',
					'focus-visible:ring-red-8/20',
				],
				warning: [
					// Couleurs Radix par défaut (plus vives)
					'bg-amber-9 text-amber-contrast shadow-sm',
					'hover:bg-amber-10 hover:shadow-md',
					'active:bg-amber-11 active:scale-95',
					'focus-visible:ring-amber-8/20',
				],
				info: [
					// Couleurs Radix par défaut (plus vives)
					'bg-blue-9 text-blue-contrast shadow-sm',
					'hover:bg-blue-10 hover:shadow-md',
					'active:bg-blue-11 active:scale-95',
					'focus-visible:ring-blue-8/20',
				],
			},
		},
		defaultVariants: {
			variant: 'primary',
			size: 'md',
			state: 'default',
		},
	}
)

export type ButtonVariants = VariantProps<typeof buttonVariants>
