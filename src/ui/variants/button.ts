import { cva } from 'class-variance-authority'

export const buttonVariants = cva(
	[
		'inline-flex items-center justify-center gap-2',
		'whitespace-nowrap rounded-md text-sm font-medium select-none outline-none',
		'transition-[color,box-shadow]',
		"[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0",
		'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2',
		'disabled:pointer-events-none disabled:opacity-50',
		'aria-invalid:ring-destructive/20 aria-invalid:border-destructive',
	].join(' '),
	{
		variants: {
			variant: {
				primary: ['bg-primary', 'text-primary-foreground', 'hover:bg-primary/90', 'active:bg-primary/90'].join(' '),

				'primary-outline': [
					'border border-[var(--primary-border)]',
					'text-[var(--primary-solid)]',
					'bg-transparent hover:bg-[var(--primary-subtle)]',
				].join(' '),

				secondary: [
					'bg-[var(--secondary-solid)]',
					'text-[var(--secondary-solid-fg)]',
					'hover:bg-[var(--secondary-10)]',
					'active:bg-[var(--secondary-15)]',
				].join(' '),

				'secondary-outline': [
					'border border-[var(--secondary-border)]',
					'text-[var(--secondary-solid)]',
					'bg-transparent hover:bg-[var(--secondary-subtle)]',
				].join(' '),

				ghost: ['bg-transparent', 'text-[var(--foreground)]', 'hover:bg-[var(--muted)]'].join(' '),
			},

			size: {
				sm: 'h-8 px-3 text-sm',
				md: 'h-10 px-4 text-base',
				lg: 'h-11 px-6 text-lg',
				icon: 'h-10 w-10 p-0',
			},

			rounded: {
				none: 'rounded-none',
				sm: 'rounded-[var(--radius-sm)]',
				md: 'rounded-[var(--radius-md)]',
				lg: 'rounded-[var(--radius-lg)]',
				full: 'rounded-full',
			},

			/**
			 * Decorative: supprime les interactions sans toucher aux classes Tailwind
			 */
			decorative: {
				false: '',
				true: 'pointer-events-none hover:bg-transparent focus-visible:ring-0',
			},
		},

		defaultVariants: {
			variant: 'primary',
			size: 'md',
			rounded: 'md',
			decorative: false,
		},
	}
)
