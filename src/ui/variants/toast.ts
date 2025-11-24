import { cva, type VariantProps } from 'class-variance-authority'

export const toastVariants = cva(
	// Base styles
	[
		'group pointer-events-auto relative flex w-full items-center justify-between space-x-2',
		'overflow-hidden rounded-md border p-4 pr-6 shadow-lg transition-all',
		'data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)]',
		'data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none',
		'data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out',
		'data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full',
		'data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full',
	],
	{
		variants: {
			variant: {
				default: ['border bg-background text-foreground'],
				success: ['border-green-6 bg-green-2 text-green-11', '[&>svg]:text-green-9'],
				warning: ['border-amber-6 bg-amber-2 text-amber-11', '[&>svg]:text-amber-9'],
				error: ['border-red-6 bg-red-2 text-red-11', '[&>svg]:text-red-9'],
				info: ['border-blue-6 bg-blue-2 text-blue-11', '[&>svg]:text-blue-9'],
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	}
)

export type ToastVariants = VariantProps<typeof toastVariants>
