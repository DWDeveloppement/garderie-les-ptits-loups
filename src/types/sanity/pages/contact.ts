// 📂 sanity/types/pages/contact.ts
// 👉 Types pour la page Contact depuis Sanity

import type { MapLocation } from '@/types/map'

/**
 * Structure complète des informations de contact depuis Sanity
 * Compatible avec le type MapLocation pour utilisation avec MapSection
 */
export type SanityContactInfo = {
	name: string
	address: string
	postalCode: string
	city: string
	country: string
	phone: string
	email: string
	openingHours: string
	// Coordonnées GPS
	latitude: number
	longitude: number
	zoom?: number
}

/**
 * Convertit SanityContactInfo en MapLocation pour les composants de carte
 */
export function contactInfoToMapLocation(contactInfo: SanityContactInfo): MapLocation {
	return {
		name: contactInfo.name,
		address: contactInfo.address,
		postalCode: contactInfo.postalCode,
		city: contactInfo.city,
		country: contactInfo.country,
		lat: contactInfo.latitude,
		lng: contactInfo.longitude,
	}
}

