import { Icon } from '@/components/icons/Icon'
import type { IconName } from '@/components/icons/registry'
import { Card, CardContent } from '@/ui/card'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { Quote } from 'lucide-react'
import type { ReactNode } from 'react'

type BaseVariant = 'default' | 'secondary'
type BlockQuoteVariant = BaseVariant | 'primary'

const blockQuoteVariants = cva(['relative my-6 pl-4 md:pl-6', 'border-l-4', 'leading-relaxed text-2xl italic'], {
	variants: {
		variant: {
			default: ['border-purple-7 text-purple-10'],
			secondary: ['border-orange-7 text-orange-10'],
		},
	},
	defaultVariants: {
		variant: 'default',
	},
})

const blockQuoteCardPalette: Record<BaseVariant, { card: string; icon: string; quote: string; author: string }> = {
	default: {
		card: 'bg-purple-2 border-purple-6',
		icon: 'text-purple-9 bg-purple-2 border-purple-9',
		quote: 'text-purple-11',
		author: 'text-purple-10',
	},
	secondary: {
		card: 'bg-orange-2 border-orange-6',
		icon: 'text-orange-9 bg-orange-2 border-orange-9',
		quote: 'text-orange-11',
		author: 'text-orange-10',
	},
}

type BlockQuoteProps = VariantProps<typeof blockQuoteVariants> & {
	children?: ReactNode
	content?: ReactNode
	author?: ReactNode
	className?: string
	authorClassName?: string
}

type BlockQuoteCardProps = {
	children?: ReactNode
	content?: ReactNode
	author?: ReactNode
	variant?: BlockQuoteVariant
	className?: string
	quoteClassName?: string
	authorClassName?: string
	iconName?: IconName
	icon?: ReactNode
	iconClassName?: string
}

function normalizeVariant(variant?: BlockQuoteVariant | null): BaseVariant {
	if (variant === 'secondary') return 'secondary'
	return 'default'
}

export function BlockQuote({ children, content, author, variant, className, authorClassName }: BlockQuoteProps) {
	const resolvedVariant = normalizeVariant(variant)

	return (
		<blockquote className={cn(blockQuoteVariants({ variant: resolvedVariant }), className)}>
			{children}
			{content && <div>{content}</div>}
			{author && <cite className={cn('mt-2 block text-sm not-italic opacity-80', authorClassName)}>{author}</cite>}
		</blockquote>
	)
}

export function BlockQuoteCard({
	children,
	content,
	author,
	variant = 'default',
	className,
	quoteClassName,
	authorClassName,
	iconName,
	icon,
	iconClassName,
}: BlockQuoteCardProps) {
	const resolvedVariant = normalizeVariant(variant)
	const palette = blockQuoteCardPalette[resolvedVariant]

	const resolvedIcon =
		icon ??
		(iconName ? (
			<Icon name={iconName} size='lg' className={cn('h-16 w-16 p-4 rounded-full border-4', palette.icon, iconClassName)} />
		) : (
			<Quote className={cn('h-24 w-24 p-4 rounded-full border-4', palette.icon, iconClassName)} />
		))

	return (
		<Card
			variant={resolvedVariant === 'secondary' ? 'secondary' : 'primary'}
			className={cn(
				'!flex flex-col justify-center items-center relative w-full max-w-2xl mx-auto',
				'!pt-12 mt-16 mb-8 shadow-lg !overflow-visible !contain-none',
				palette.card,
				className
			)}>
			<div className='absolute -top-12 left-1/2 -translate-x-1/2 flex justify-center items-center'>{resolvedIcon}</div>

			<CardContent className='p-6 text-center'>
				{children}
				<blockquote className={cn('text-2xl italic leading-relaxed mb-4', palette.quote, quoteClassName)}>{content}</blockquote>

				{author && <cite className={cn('block text-md font-semibold not-italic', palette.author, authorClassName)}>{author}</cite>}
			</CardContent>
		</Card>
	)
}
