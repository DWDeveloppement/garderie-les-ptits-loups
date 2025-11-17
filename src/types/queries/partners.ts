import type { SanityImage } from '../sanity/sectorPage'

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
