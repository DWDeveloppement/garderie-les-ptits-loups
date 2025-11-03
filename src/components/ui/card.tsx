import * as React from "react"

import { cardVariants, type CardVariants } from "@/components/ui/variants/card"
import { cn } from "@/lib/utils"

type CardProps = React.ComponentProps<"div"> & CardVariants

function Card({ 
  className, 
  variant,
  size,
  interactive,
  ...props 
}: CardProps) {
  // Appliquer les variants seulement si au moins une prop variant est fournie
  const hasVariants = variant !== undefined || size !== undefined || interactive !== undefined
  
  return (
    <div
      data-slot="card"
      className={cn(
        // Classes Shadcn de base (toujours appliquées pour compatibilité)
        "flex flex-col gap-6 border shadow-sm",
        // Si pas de variants → styles Shadcn par défaut
        !hasVariants && "bg-card text-card-foreground py-6 rounded-xl",
        // Si variants fournis → appliquer CVA (rounded-lg déjà dans la base CVA)
        hasVariants && cardVariants({ variant, size, interactive }),
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
}

export {
  Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
}

