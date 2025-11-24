import { cva, type VariantProps } from 'class-variance-authority'

export const labelVariants = cva(
	// Base styles
	['text-sm font-medium leading-none', 'peer-disabled:cursor-not-allowed peer-disabled:opacity-70', 'transition-colors duration-200'],
	{
		variants: {
			variant: {
				default: 'text-purple-10',
				error: 'text-red-11',
				success: 'text-green-11',
				warning: 'text-amber-11',
				info: 'text-blue-11',
			},
			size: {
				sm: 'text-xs',
				md: 'text-sm',
				lg: 'text-base',
			},
			required: {
				true: 'after:content-["*"] after:ml-0.5 after:text-red-9',
				false: '',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'md',
			required: false,
		},
	}
)

export type LabelVariants = VariantProps<typeof labelVariants>
