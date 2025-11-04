import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import type { ReactNode } from 'react'

const baseHeadingClasses: Record<HeadingTag, string> = {
	h1: 'text-5xl font-chelsea whitespace-pre-line',
	h2: 'text-4xl font-chelsea whitespace-pre-line',
	h3: 'text-3xl font-chelsea whitespace-pre-line',
	h4: 'text-2xl font-semibold whitespace-pre-line',
	h5: 'text-xl font-semibold whitespace-pre-line',
	h6: 'text-lg font-semibold whitespace-pre-line',
}

const titleVariants = cva('', {
	variants: {
		variant: {
			default: 'text-purple-10',
			secondary: 'text-orange-10',
			muted: 'text-purple-9/80',
		},
	},
	defaultVariants: {
		variant: 'default',
	},
})

export type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
export type RichTextTitleVariant = NonNullable<VariantProps<typeof titleVariants>['variant']>

type RichTextTitleProps = VariantProps<typeof titleVariants> & {
	tag?: HeadingTag
	children: ReactNode
	className?: string
}

export function RichTextTitle({ tag = 'h2', children, variant, className }: RichTextTitleProps) {
	const TitleTag = tag

	return <TitleTag className={cn(baseHeadingClasses[tag], titleVariants({ variant }), className)}>{children}</TitleTag>
}
