import type { IconName } from '@/components/icons/registry'
import { BlockQuote, BlockQuoteCard } from '@/components/shared/BlockQuote'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

type RichTextQuoteProps = {
	variant?: 'default' | 'secondary'
	content: ReactNode
	author?: ReactNode
	className?: string
}

export function RichTextQuote({ content, author, variant, className }: RichTextQuoteProps) {
	return <BlockQuote content={content} author={author} variant={variant} className={className} />
}

type RichTextQuoteSpecialProps = {
	content: ReactNode
	author?: ReactNode
	variant?: 'default' | 'secondary'
	className?: string
	iconName?: IconName
}

export function RichTextQuoteSpecial({ content, author, variant = 'default', className, iconName }: RichTextQuoteSpecialProps) {
	return <BlockQuoteCard content={content} author={author} variant={variant} className={cn('mt-32', className)} iconName={iconName} />
}
