// 📂 packages/ui/lib/getButtonComponent.ts
// 👉 Helper pour déterminer le composant à rendre selon le mode du Button
// Responsabilité unique : Retourner le React.ElementType approprié selon les props

import React from 'react'
import Link from 'next/link'
import { Slot } from '@radix-ui/react-slot'

import type { ButtonMode } from '@/ui/types/button'

type GetButtonComponentParams = {
	mode: ButtonMode
	asChild: boolean
	href?: string
}

/**
 * Détermine le composant React à utiliser selon le mode du Button
 * Responsabilité unique : Logique de sélection du composant
 */
export function getButtonComponent({ mode, asChild, href }: GetButtonComponentParams): React.ElementType {
	if (mode === 'decorative') {
		return 'div'
	}

	if (asChild) {
		return Slot
	}

	if (mode === 'next-link' && href) {
		return Link
	}

	if (mode === 'link' && href) {
		return 'a'
	}

	// Mode par défaut : button
	return 'button'
}
