import { Icon } from "@/components/icons/Icon"
import type { IconName } from "@/components/icons/registry"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

const feedbackCardVariants = cva(
  "relative w-full max-w-2xl mx-auto rounded-xl border overflow-hidden bg-white text-[inherit] shadow-sm",
  {
    variants: {
      variant: {
        primary: "border-purple-6 bg-purple-2 text-purple-12",
        secondary: "border-orange-6 bg-orange-2 text-orange-12",
        success: "border-green-6 bg-green-2 text-green-11",
        info: "border-blue-6 bg-blue-2 text-blue-11",
        warning: "border-amber-6 bg-amber-2 text-amber-11",
        destructive: "border-red-6 bg-red-2 text-red-11",
      },
      size: {
        sm: "py-3 px-4 text-sm [&_[data-slot='icon']]:size-4",
        md: "py-4 px-6 text-sm [&_[data-slot='icon']]:size-5",
        lg: "py-6 px-8 text-base [&_[data-slot='icon']]:size-6",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
)

type FeedbackIcon = IconName | React.ReactNode

type FeedbackCardProps = VariantProps<typeof feedbackCardVariants> & {
  children: React.ReactNode
  className?: string
  icon?: FeedbackIcon | null
  title?: React.ReactNode
}

const iconSizeByCard: Record<NonNullable<FeedbackCardProps["size"]>, "sm" | "md" | "lg"> = {
  sm: "sm",
  md: "md",
  lg: "lg",
}

export function RichTextFeedbackCard({
  children,
  className,
  icon,
  title,
  size,
  variant,
}: FeedbackCardProps) {
  const cardSize = (size ?? "md") as NonNullable<FeedbackCardProps["size"]>
  const resolvedIcon = React.useMemo(() => {
    if (!icon) return null

    if (typeof icon === "string") {
      const iconName = icon as IconName
      return (
        <Icon
          name={iconName}
          size={iconSizeByCard[cardSize]}
          className="text-current"
        />
      )
    }

    return (
      <span data-slot="icon" className="inline-flex items-center justify-center text-[inherit]">
        {icon}
      </span>
    )
  }, [icon, cardSize])

  const content = (
    <div className="leading-relaxed whitespace-pre-line text-[inherit]">
      {children}
    </div>
  )

  return (
    <div
      data-slot="feedback-card"
      className={cn(feedbackCardVariants({ variant, size }), className)}
    >
      {resolvedIcon ? (
        <div className="flex items-start gap-4">
          <div className="mt-1 shrink-0 text-[inherit]">
            {resolvedIcon}
          </div>
          <div className="flex flex-col gap-2 text-[inherit]">
            {title ? (
              <div className="font-semibold leading-snug whitespace-pre-line text-[inherit]">
                {title}
              </div>
            ) : null}
            {content}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2 text-[inherit]">
          {title ? (
            <div className="font-semibold leading-snug whitespace-pre-line text-[inherit]">
              {title}
            </div>
          ) : null}
          {content}
        </div>
      )}
    </div>
  )
}

