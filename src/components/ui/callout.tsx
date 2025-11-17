// Composant Callout basé sur Shadcn UI Alert
import { Alert, AlertDescription } from '@/components/ui/alert'
import { cn } from '@/lib/utils'
import * as React from 'react'

// Types pour les composants Callout
export type CalloutRootProps = React.ComponentProps<typeof Alert> & {
  color?: 'red' | 'green' | 'blue' | 'yellow'
  variant?: 'surface' | 'soft' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

export type CalloutIconProps = React.ComponentProps<'div'> & {
  children: React.ReactNode
}

export type CalloutTextProps = React.ComponentProps<typeof AlertDescription>

// Composant Root
const CalloutRoot = React.forwardRef<HTMLDivElement, CalloutRootProps>(
  ({ children, color = 'blue', size = '2', className, ...props }, ref) => {
    const colorClasses = {
      red: 'border-red-200 bg-red-50 !text-red-800',
      green: 'border-green-200 bg-green-50 !text-green-800',
      blue: 'border-blue-200 bg-blue-50 !text-blue-800',
      yellow: 'border-yellow-200 bg-yellow-50 !text-yellow-800'
    }

    const sizeClasses = {
      sm: 'p-1 text-sm',
      md: 'p-2 text-sm',
      lg: 'p-3 text-lg'
    }

    return (
      <Alert 
        ref={ref} 
        className={cn(
          colorClasses[color],
          sizeClasses[size as keyof typeof sizeClasses],
          // Neutralise le texte muted par défaut de Alert (Shadcn)
          'text-[inherit]',
          className
        )}
        {...props}
      >
        {children}
      </Alert>
    )
  }
)
CalloutRoot.displayName = 'CalloutRoot'

// Composant Icon
const CalloutIcon = React.forwardRef<HTMLDivElement, CalloutIconProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={cn('flex items-center', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
CalloutIcon.displayName = 'CalloutIcon'

// Composant Text
const CalloutText = React.forwardRef<HTMLParagraphElement, CalloutTextProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <AlertDescription 
        ref={ref} 
        className={cn(
          'mt-1',
          // Hérite couleur et taille du parent (évite le text-sm/muted interne)
          'text-[inherit]',
          className
        )}
        {...props}
      >
        {children}
      </AlertDescription>
    )
  }
)
CalloutText.displayName = 'CalloutText'

// Export des composants
export { CalloutIcon, CalloutRoot, CalloutText }

// Export par défaut pour compatibilité (utilise Root)
export const Callout = CalloutRoot
