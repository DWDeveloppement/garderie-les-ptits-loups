// 📂 sanity/types/pages/contactPage.ts
// 👉 Types pour la page Contact depuis Sanity

import type { SanityImage } from '../core/image'

/**
 * Structure complète de la page Contact
 */
export type ContactPageData = {
	title: string
	sectionHero: {
		description: string
		image: SanityImage
	}
	// Informations de contact
	contactInfo?: {
		name: string
		address: string
		postalCode: string
		city: string
		country: string
		phone: string
		email: string
		openingHours: string
		latitude: number
		longitude: number
		zoom?: number
	}
	// Parallax
	parallax?: {
		image: SanityImage
	}
	// SEO
	seo?: {
		metaTitle?: string
		metaDescription?: string
		keywords?: string[]
		shareImage?: SanityImage
	}
}

