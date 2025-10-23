import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

const badgeVariants = cva(
	// Base styles
	[
		'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold',
		'transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
	],
	{
		variants: {
			variant: {
				default: [
					'border-transparent bg-purple-9 text-white',
					'hover:bg-purple-10',
				],
				secondary: [
					'border-transparent bg-orange-9 text-white',
					'hover:bg-orange-10',
				],
				success: [
					'border-transparent bg-green-9 text-white',
					'hover:bg-green-10',
				],
				warning: [
					'border-transparent bg-amber-9 text-white',
					'hover:bg-amber-10',
				],
				error: [
					'border-transparent bg-red-9 text-white',
					'hover:bg-red-10',
				],
				info: [
					'border-transparent bg-blue-9 text-white',
					'hover:bg-blue-10',
				],
				outline: [
					'border-purple-7 text-purple-11',
					'hover:bg-purple-2',
				],
				ghost: [
					'border-transparent text-purple-11',
					'hover:bg-purple-2',
				],
			},
			size: {
				sm: 'px-2 py-0.5 text-xs',
				md: 'px-2.5 py-0.5 text-xs',
				lg: 'px-3 py-1 text-sm',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'md',
		},
	}
)

export interface BadgeProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
	return (
		<div className={cn(badgeVariants({ variant, size }), className)} {...props} />
	)
}

export { Badge, badgeVariants }
