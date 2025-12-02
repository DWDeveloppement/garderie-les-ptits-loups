// 📂 sanity/types/pages/index.ts
// 👉 Barrel export pour les types de PAGES Sanity (structure complète des pages)

export * from './about'
export * from './contactPage'
export * from './home'
export * from './legacyAndConfidentials'
// schedule.ts exporte des types en conflit avec content/prices.ts - exports sélectifs uniquement
export type {
	SchedulePageData,
	SubsidiesSection,
	TariffDocument,
	TariffsSection,
	AccordionItem as ScheduleAccordionItem,
	PriceItem as SchedulePriceItem,
} from './schedule'
export * from './sectorPage'
