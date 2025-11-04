// Types pour la page Horaires & Tarifs depuis Sanity

import type { PortableTextBlock } from '../sanity/portableText'
import type { SanityImage } from '../sanity/sectorPage'

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
 * Section de subventions
 */
export type SubsidiesSection = {
	title: string
	body?: PortableTextBlock[]
	tableau: SubsidiesDocument
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
	tarifsSectionNurserie: TariffsSection
	tarifsSectionTG: TariffsSection
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
