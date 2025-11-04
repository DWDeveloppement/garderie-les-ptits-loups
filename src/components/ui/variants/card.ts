// Variants Card basés sur la palette Radix UI custom
import { cva, type VariantProps } from 'class-variance-authority'

export const cardVariants = cva(
	// Base styles
	'rounded-lg border transition-all duration-300',
	{
		variants: {
			variant: {
				// Purple-based primary variant
				primary: [
					'bg-purple-1 border-purple-6 text-purple-11',
					'hover:border-purple-7',
					'focus-within:border-purple-8 focus-within:ring-2 focus-within:ring-purple-8/20',
				],
				// Orange-based secondary variant
				secondary: [
					'bg-orange-bg-light border-orange-6 text-orange-11',
					'hover:border-orange-7',
					'focus-within:border-orange-8 focus-within:ring-2 focus-within:ring-orange-8/20',
				],
				// Neutral variant (white background)
				neutral: [
					'bg-white border-gray-200 text-gray-900',
					'hover:border-gray-300',
					'focus-within:border-gray-400 focus-within:ring-2 focus-within:ring-gray-400/20',
				],
			},
			size: {
				sm: 'p-4',
				md: 'p-6',
				lg: 'p-8',
				xl: 'p-10',
			},
			interactive: {
				true: [
					'cursor-pointer',
					// transitions limitées et douces
					'transition-colors transition-shadow transition-transform duration-200 ease-out',
					// feedback au survol
					'hover:shadow-lg hover:bg-orange-bg-light',
					// mouvement uniquement si autorisé par l'utilisateur
					'motion-safe:hover:scale-102',
					// respect de prefers-reduced-motion
					'motion-reduce:transition-none motion-reduce:hover:scale-100',
					// focus visible pour navigation clavier (pattern input.tsx Shadcn)
					'focus-visible:outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
				].join(' '),
				false: '',
			},
		},
		defaultVariants: {
			variant: 'primary',
			size: 'md',
			interactive: false,
		},
	}
)

export type CardVariants = VariantProps<typeof cardVariants>
