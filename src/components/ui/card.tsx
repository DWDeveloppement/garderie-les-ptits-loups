// Composants UI utilisant Radix Theme avec displayName
import { Heading, Card as RadixCard, Text } from "@radix-ui/themes"
import * as React from "react"

export type CardProps = React.ComponentProps<typeof RadixCard>

// Classes de base pour le composant Card
const CARD_BASE_CLASSES = 'rounded-lg overflow-hidden border'
const CARD_BASE_RADIXOVERIDES_CLASSES = 'p-0'

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, ...props }, ref) => {
    return (
			<RadixCard className={`${CARD_BASE_CLASSES} ${props.className || ''} ${CARD_BASE_RADIXOVERIDES_CLASSES}`} ref={ref} {...props}>
				{children}
			</RadixCard>
		)
  }
)
Card.displayName = "Card"

export type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ children, className, ...props }, ref) => {
    return (
			<div ref={ref} className={` ${className || ''} p-4`} {...props}>
				{children}
			</div>
		)
  }
)
CardHeader.displayName = "CardHeader"

export type CardTitleProps = React.ComponentProps<typeof Heading>

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ children, ...props }, ref) => {
    return (
      <Heading ref={ref} size="4" {...props} className={`pt-1.5 px-1.5 ${props.className || ''}`}>
        {children}
      </Heading>
    )
  }
)
CardTitle.displayName = "CardTitle"

export type CardDescriptionProps = React.ComponentProps<typeof Text>

const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ children, ...props }, ref) => {
    return (
      <Text ref={ref} size="2" color="gray" {...props}>
        {children}
      </Text>
    )
  }
)
CardDescription.displayName = "CardDescription"

export type CardContentProps = React.HTMLAttributes<HTMLDivElement>

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ children, className, ...props }, ref) => {
    return (
			<div ref={ref} className={`${className || ''} p-0`} {...props}>
				{children}
			</div>
		)
  }
)
CardContent.displayName = "CardContent"

export type CardFooterProps = React.HTMLAttributes<HTMLDivElement>

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`pb-1.5 px-1.5 ${className || ''}`}
        {...props}
      >
        {children}
      </div>
    )
  }
)
CardFooter.displayName = "CardFooter"

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle }

