// 📂 sanity/types/pages/partners.ts
// 👉 Types pour les partenaires depuis Sanity

import type { SanityImage } from '../core/image'

/**
 * Partenaire depuis Sanity
 */
export type Partner = {
	_id: string
	name: string
	website: string
	logo: SanityImage
}

/**
 * Type pour compatibilité (legacy)
 * @deprecated Utiliser Partner à la place
 */
export type PartnersTypesProps = Partner

/**
 * Type pour les données JSON (legacy)
 * @deprecated Utiliser Partner[] à la place
 */
export type PartnersData = Partner[]

