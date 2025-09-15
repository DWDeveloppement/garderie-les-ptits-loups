// Composants UI utilisant Radix Theme avec displayName
// Utilisation des composants Callout de Radix UI : Callout.Root, Callout.Icon, Callout.Text
import { Callout as RadixCallout } from '@radix-ui/themes'
import * as React from 'react'

// Types pour les composants Callout
export type CalloutRootProps = React.ComponentProps<typeof RadixCallout.Root>
export type CalloutIconProps = React.ComponentProps<typeof RadixCallout.Icon>
export type CalloutTextProps = React.ComponentProps<typeof RadixCallout.Text>

// Composant Root
const CalloutRoot = React.forwardRef<HTMLDivElement, CalloutRootProps>(({ children, ...props }, ref) => {
	return (
		<RadixCallout.Root ref={ref} {...props}>
			{children}
		</RadixCallout.Root>
	)
})
CalloutRoot.displayName = 'CalloutRoot'

// Composant Icon
const CalloutIcon = React.forwardRef<HTMLDivElement, CalloutIconProps>(({ children, ...props }, ref) => {
	return (
		<RadixCallout.Icon ref={ref} {...props}>
			{children}
		</RadixCallout.Icon>
	)
})
CalloutIcon.displayName = 'CalloutIcon'

// Composant Text
const CalloutText = React.forwardRef<HTMLParagraphElement, CalloutTextProps>(({ children, ...props }, ref) => {
	return (
		<RadixCallout.Text ref={ref} {...props}>
			{children}
		</RadixCallout.Text>
	)
})
CalloutText.displayName = 'CalloutText'

// Export des composants
export { CalloutIcon, CalloutRoot, CalloutText }

// Export par défaut pour compatibilité (utilise Root)
export const Callout = CalloutRoot
