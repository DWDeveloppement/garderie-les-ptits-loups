"use client"

import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import * as React from "react"

import { cn } from "@/lib/utils"
import { tooltipArrowVariants, tooltipContentVariants, type TooltipArrowVariants, type TooltipContentVariants } from "./variants/tooltip"

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  )
}

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  )
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  showArrow = true,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content> & TooltipContentVariants & {
  showArrow?: boolean
}) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          tooltipContentVariants({ variant, size }),
          className
        )}
        {...props}
      >
        {children}
        {showArrow && (
          <TooltipPrimitive.Arrow 
            className={cn(
              tooltipArrowVariants({ variant }),
            )} 
          />
        )}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

function TooltipArrow({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Arrow> & TooltipArrowVariants) {
  return (
    <TooltipPrimitive.Arrow
      className={cn(
        tooltipArrowVariants({ variant }),
        className
      )}
      {...props}
    />
  )
}

export { Tooltip, TooltipArrow, TooltipContent, TooltipProvider, TooltipTrigger }

