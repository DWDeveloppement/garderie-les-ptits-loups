import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import { Quote } from "lucide-react"
import type { ReactNode } from "react"

const quoteVariants = cva(
  [
    'relative my-6 pl-4 md:pl-6',
    'border-l-4',
    'leading-relaxed text-2xl italic',
  ],
  {
    variants: {
      variant: {
        default: ['border-purple-7 text-purple-10'],
        secondary: ['border-orange-7 text-orange-10'],
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

type RichTextQuoteProps = VariantProps<typeof quoteVariants> & {
  content: ReactNode
  author?: ReactNode
  className?: string
}

export function RichTextQuote({ content, author, variant, className }: RichTextQuoteProps) {
  return (
    <blockquote className={cn(quoteVariants({ variant }), className)}>
      <div>{content}</div>
      {author && <cite className="mt-2 block text-sm not-italic opacity-80"> {author}</cite>}
    </blockquote>
  )
}

type RichTextQuoteSpecialProps = {
  content: ReactNode
  author?: ReactNode
  variant?: 'default' | 'secondary'
  className?: string
}

const specialPalette = {
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
} as const

export function RichTextQuoteSpecial({ content, author, variant = 'default', className }: RichTextQuoteSpecialProps) {
  const styles = specialPalette[variant]

  return (
    <Card
      className={cn(
        '!flex flex-col justify-center items-center relative w-full max-w-2xl mx-auto',
        '!pt-12 mt-16 mb-8 shadow-lg !overflow-visible !contain-none',
        styles.card,
        className
      )}
    >
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex justify-center items-center">
        <Quote className={cn('p-4 h-24 w-24 rounded-full border-4', styles.icon)} />
      </div>

      <CardContent className="p-6 text-center">
        <blockquote className={cn('text-2xl italic leading-relaxed mb-4', styles.quote)}>
          {content}
        </blockquote>

        {author && <cite className={cn('block text-md font-semibold not-italic', styles.author)}> {author}</cite>}
      </CardContent>
    </Card>
  )
}