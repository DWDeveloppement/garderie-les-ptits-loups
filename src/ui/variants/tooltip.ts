import { cva, type VariantProps } from 'class-variance-authority'

export const tooltipContentVariants = cva(
	// Base styles
	[
		'animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
		'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
		'z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance',
		'shadow-lg',
	],
	{
		variants: {
			variant: {
				default: 'bg-foreground text-background',
				purple: 'bg-purple-9 text-purple-1',
				orange: 'bg-orange-9 text-orange-1',
				green: 'bg-green-9 text-green-1',
				red: 'bg-red-9 text-red-1',
				blue: 'bg-blue-9 text-blue-1',
				amber: 'bg-amber-9 text-amber-1',
				white: 'bg-white text-purple-12 border border-purple-6',
				dark: 'bg-purple-12 text-purple-1',
			},
			size: {
				sm: 'px-2 py-1 text-xs',
				md: 'px-3 py-1.5 text-xs',
				lg: 'px-4 py-2 text-sm',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'md',
		},
	}
)

export const tooltipArrowVariants = cva(
	// Base styles
	['z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]'],
	{
		variants: {
			variant: {
				default: 'bg-foreground fill-foreground',
				purple: 'bg-purple-9 fill-purple-9',
				orange: 'bg-orange-9 fill-orange-9',
				green: 'bg-green-9 fill-green-9',
				red: 'bg-red-9 fill-red-9',
				blue: 'bg-blue-9 fill-blue-9',
				amber: 'bg-amber-9 fill-amber-9',
				white: 'bg-white fill-white border border-purple-6',
				dark: 'bg-purple-12 fill-purple-12',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	}
)

export type TooltipContentVariants = VariantProps<typeof tooltipContentVariants>
export type TooltipArrowVariants = VariantProps<typeof tooltipArrowVariants>
