'use client'
// 📂 src/hooks/a11y/useFormA11y.ts
// 👉 Hook pour la gestion de l'accessibilité des formulaires

import { useEffect } from 'react'

export interface FormA11yOptions {
	name: string
	label?: string
	required?: boolean
	error?: string
	helpText?: string
	placeholder?: string
	type?: string
}

export interface FormA11yReturn {
	id: string
	'aria-label'?: string
	'aria-labelledby'?: string
	'aria-describedby'?: string
	'aria-invalid': boolean
	'aria-required': boolean
	labelProps: {
		htmlFor: string
		id: string
	}
	helpTextProps?: {
		id: string
	}
	errorProps?: {
		id: string
		role: string
		'aria-live': 'off' | 'assertive' | 'polite'
	}
}

/**
 * Hook pour gérer l'accessibilité des champs de formulaire
 * - Génère des IDs uniques
 * - Gère les relations ARIA
 * - Fournit des props pour les labels et messages d'erreur
 */
export function useFormA11y({ name, label, required = false, error, helpText, placeholder }: FormA11yOptions): FormA11yReturn {
	// Génération d'IDs uniques
	const fieldId = `${name}-${Math.random().toString(36).substr(2, 9)}`
	const labelId = `${fieldId}-label`
	const helpTextId = `${fieldId}-help`
	const errorId = `${fieldId}-error`

	// Avertissement en développement si label manque
	useEffect(() => {
		if (process.env.NODE_ENV === 'development' && !label && !placeholder) {
			console.warn(`[useFormA11y] Label manquant pour le champ "${name}". Ajoutez un label ou placeholder pour l'accessibilité.`)
		}
	}, [name, label, placeholder])

	// Construction des attributs ARIA
	const ariaAttributes: Record<string, string | boolean> = {
		id: fieldId,
		'aria-invalid': !!error,
		'aria-required': required,
	}

	// Gestion des labels
	if (label) {
		ariaAttributes['aria-labelledby'] = labelId
	} else if (placeholder) {
		ariaAttributes['aria-label'] = placeholder
	}

	// Gestion des descriptions
	const describedBy = []
	if (helpText) describedBy.push(helpTextId)
	if (error) describedBy.push(errorId)

	if (describedBy.length > 0) {
		ariaAttributes['aria-describedby'] = describedBy.join(' ')
	}

	return {
		id: fieldId,
		'aria-invalid': !!error,
		'aria-required': required,
		'aria-label': ariaAttributes['aria-label'] as string | undefined,
		'aria-labelledby': ariaAttributes['aria-labelledby'] as string | undefined,
		'aria-describedby': ariaAttributes['aria-describedby'] as string | undefined,
		labelProps: {
			htmlFor: fieldId,
			id: labelId,
		},
		helpTextProps: helpText
			? {
					id: helpTextId,
				}
			: undefined,
		errorProps: error
			? {
					id: errorId,
					role: 'alert',
					'aria-live': 'polite' as const,
				}
			: undefined,
	}
}
