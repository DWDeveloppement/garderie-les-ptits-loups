// 📂 sanity/types/pages/about.ts
// 👉 Types pour la page À propos depuis Sanity

import type { PortableTextBlock } from '../core/portableText'
import type { SanityImage } from '../core/image'

/**
 * Structure complète de la page À propos
 */
export type AboutPageData = {
	title: string
	sectionHero: {
		description: string
		image: SanityImage
	}
	// Introduction (rich-text avec images)
	introduction?: PortableTextBlock[]
	// Parallax 1
	parallaxOne?: {
		image: SanityImage
	}
	// Histoire (collapse)
	historyCollapse?: {
		content?: PortableTextBlock[]
		historyImage?: {
			url: string
			alt?: string
			width: number
			height: number
		}
	}
	// Parallax 2
	parallaxTwo?: {
		image: SanityImage
	}
	// Pédagogie
	pedagogy?: PortableTextBlock[]
	// Équipe (rich-text simple)
	team?: PortableTextBlock[]
	// Valeurs (rich-text simple)
	values?: PortableTextBlock[]
	// SEO
	seo?: {
		metaTitle?: string
		metaDescription?: string
		keywords?: string[]
		shareImage?: SanityImage
	}
}

