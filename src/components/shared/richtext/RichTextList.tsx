import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import type { ReactNode } from "react"

type MinimalSpan = {
  _type: string
  text: string
  marks?: string[]
  _key?: string
}

export type RichTextListItem = {
  _key?: string
  children?: MinimalSpan[]
}

type RichTextListProps = VariantProps<typeof listVariants> & {
  type: 'bullet' | 'number'
  items: RichTextListItem[]
  variant?: 'default' | 'primary'
  renderSpanNodes: (spans: MinimalSpan[], keyPrefix: string) => ReactNode[]
  className?: string
}

const listVariants = cva('mb-4 ml-6 space-y-2', {
  variants: {
    type: {
      bullet: 'list-disc',
      number: 'list-decimal',
    },
  },
  defaultVariants: {
    type: 'bullet',
  },
})

const listItemVariants = cva('leading-relaxed', {
  variants: {
    variant: {
      default: 'text-orange-11',
      primary: 'text-purple-10',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export function RichTextList({ type, items, variant = 'default', renderSpanNodes, className }: RichTextListProps) {
  if (!items || items.length === 0) {
    return null
  }

  const ListTag = type === 'bullet' ? 'ul' : 'ol'

  return (
    <ListTag className={cn(listVariants({ type }), className)}>
      {items.map((item, index) => {
        const key = item._key || `list-item-${index}`
        return (
          <li key={key} className={listItemVariants({ variant })}>
            {renderSpanNodes(item.children ?? [], key)}
          </li>
        )
      })}
    </ListTag>
  )
}