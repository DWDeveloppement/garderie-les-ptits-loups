'use client'

import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'
import * as React from 'react'

export type AccordionRootProps = React.ComponentProps<typeof Accordion.Root>
export type AccordionItemProps = React.ComponentProps<typeof Accordion.Item>
export type AccordionTriggerProps = React.ComponentProps<typeof Accordion.Trigger>
export type AccordionContentProps = React.ComponentProps<typeof Accordion.Content>

const AccordionRoot = React.forwardRef<HTMLDivElement, AccordionRootProps>(
  ({ children, ...props }, ref) => (
    <Accordion.Root ref={ref} {...props}>
      {children}
    </Accordion.Root>
  )
)
AccordionRoot.displayName = 'AccordionRoot'

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ children, ...props }, ref) => (
    <Accordion.Item ref={ref} {...props}>
      {children}
    </Accordion.Item>
  )
)
AccordionItem.displayName = 'AccordionItem'

const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ children, className, ...props }, ref) => (
    <Accordion.Trigger
      ref={ref}
      className={`group flex w-full items-center justify-between rounded-lg bg-white px-4 py-3 text-left font-medium text-purple-11 hover:bg-purple-1 transition-colors ${className}`}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 text-purple-9 transition-transform duration-200 group-data-[state=open]:rotate-180" />
    </Accordion.Trigger>
  )
)
AccordionTrigger.displayName = 'AccordionTrigger'

const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ children, className, ...props }, ref) => (
    <Accordion.Content
      ref={ref}
      className={`overflow-hidden bg-white border-t border-orange-6 ${className}`}
      {...props}
    >
      <div className="px-4 py-3 text-orange-10">
        {children}
      </div>
    </Accordion.Content>
  )
)
AccordionContent.displayName = 'AccordionContent'

export { AccordionContent, AccordionItem, AccordionRoot, AccordionTrigger }
