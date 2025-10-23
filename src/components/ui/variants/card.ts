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
					'bg-purple-1 border-purple-6 text-purple-12',
					'hover:border-purple-7 hover:shadow-lg',
					'focus-within:border-purple-8 focus-within:ring-2 focus-within:ring-purple-8/20',
				],
				// Orange-based secondary variant
				secondary: [
					'bg-orange-1 border-orange-6 text-orange-12',
					'hover:border-orange-7 hover:shadow-lg',
					'focus-within:border-orange-8 focus-within:ring-2 focus-within:ring-orange-8/20',
				],
				// Neutral variant (white background)
				neutral: [
					'bg-white border-gray-200 text-gray-900',
					'hover:border-gray-300 hover:shadow-lg',
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
				true: 'cursor-pointer hover:-translate-y-1',
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
