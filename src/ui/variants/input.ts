import { cva, type VariantProps } from 'class-variance-authority'

export const inputVariants = cva(
	// Base styles
	[
		'flex w-full rounded-md border bg-background px-3 py-2 text-sm',
		'ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium',
		'placeholder:text-muted-foreground',
		'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
		'disabled:cursor-not-allowed disabled:opacity-50',
		'transition-colors duration-200',
	],
	{
		variants: {
			variant: {
				default: [
					'border-orange-6 bg-white text-orange-12',
					'focus-visible:ring-purple-7 focus-visible:border-transparent',
					'placeholder:text-orange-9',
				],
				error: ['border-red-6 bg-red-1 text-red-12', 'focus-visible:ring-red-7 focus-visible:border-transparent', 'placeholder:text-red-9'],
				success: [
					'border-green-6 bg-green-1 text-green-12',
					'focus-visible:ring-green-7 focus-visible:border-transparent',
					'placeholder:text-green-9',
				],
				warning: [
					'border-amber-6 bg-amber-1 text-amber-12',
					'focus-visible:ring-amber-7 focus-visible:border-transparent',
					'placeholder:text-amber-9',
				],
			},
			size: {
				sm: 'h-8 px-2 text-xs',
				md: 'h-9 px-3 text-sm',
				lg: 'h-10 px-4 text-base',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'md',
		},
	}
)

export type InputVariants = VariantProps<typeof inputVariants>
