// 📂 sanity/types/pages/index.ts
// 👉 Barrel export pour tous les types de pages Sanity

export * from './about'
export * from './contact'
export * from './contactPage'
export * from './espaces'
export * from './home'
export * from './partners'
// prices.ts exporte des types en conflit avec content/prices.ts - exports sélectifs uniquement
export type { PricesTypesProps, PricingBlockMensuel, PricingBlockJournalier } from './prices'
// schedule.ts exporte des types en conflit avec content/prices.ts - exports sélectifs uniquement
// SubsidyItem et SubsidiesDocument sont différents dans schedule.ts vs content/prices.ts
export type { 
	SchedulePageData,
	SubsidiesSection,
	TariffDocument,
	TariffsSection,
	AccordionItem as ScheduleAccordionItem,
	PriceItem as SchedulePriceItem
	// SubsidyItem et SubsidiesDocument non exportés (en conflit avec content/prices.ts)
} from './schedule'
export * from './sectorPage'
export * from './structure'
export * from './testimonials'
export * from './sanityImage'

