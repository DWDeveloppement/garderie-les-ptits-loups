// 📂 sanity/types/pages/schedule.ts
// 👉 Types pour la page Horaires & Tarifs depuis Sanity

import type { PortableTextBlock } from '../core/portableText'
import type { SanityImage } from '../core/image'

/**
 * Item de prix dans un accordion
 */
export type PriceItem = {
	service: string
	price: string
}

/**
 * Section d'accordion avec titre et items
 */
export type AccordionItem = {
	accordionTitle: string
	priceItems: PriceItem[]
}

/**
 * Document de tarifs (mensuel ou journalier)
 */
export type TariffDocument = {
	_id: string
	title: string
	frequentationType: string
	accordionItems: AccordionItem[]
}

/**
 * Section de tarifs (Nurserie ou Trotteurs & Grands)
 */
export type TariffsSection = {
	title: string
	tarifs: TariffDocument[]
}

/**
 * Item de subvention
 */
export type SubsidyItem = {
	incomeRange: string
	subsidy: string
}

/**
 * Document de subventions
 */
export type SubsidiesDocument = {
	_id: string
	title: string
	tableContent: {
		subsidyItems: SubsidyItem[]
	}
}

/**
 * Section de subventions (optimisée : seulement body)
 * Note: Les données du tableau viennent de fetchSubsidies() (query séparée)
 */
export type SubsidiesSection = {
	title: string
	informationImportantSubsidies?: PortableTextBlock[]
}

/**
 * Structure complète de la page Horaires & Tarifs
 */
export type SchedulePageData = {
	title: string
	sectionHero: {
		description: string
		image: SanityImage
	}
	// tarifsSectionNurserie et tarifsSectionTG supprimées (données via queries séparées)
	parallax?: {
		image: SanityImage
	}
	subsidiesTable: SubsidiesSection
	seo?: {
		metaTitle?: string
		metaDescription?: string
		keywords?: string[]
		shareImage?: SanityImage
	}
}

