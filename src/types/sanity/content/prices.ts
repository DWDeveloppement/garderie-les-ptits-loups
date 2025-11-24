// 📂 sanity/types/content/prices.ts
// 👉 Types pour les tarifs et subventions Sanity

export type PriceItem = {
	description: string
	price: number
}

export type PricingBlock = {
	label: string
	items: PriceItem[]
}

export type PricingSection = {
	label: string
	journeeComplete?: PricingBlock
	matinRepas?: PricingBlock
	matinSansRepas?: PricingBlock
	apresMidiRepas?: PricingBlock
	apresMidiSansRepas?: PricingBlock
	matinee?: PricingBlock
	apresMidi?: PricingBlock
}

export type PriceDocument = {
	_id: string
	_type: 'priceDocument'
	title: string
	prixAuMois: PricingSection
	prixAuJour: PricingSection
}

export type SubsidyItem = {
	incomeRange: string
	reductionDaily: number
}

export type SubsidiesDocument = {
	_id: string
	_type: 'subsidiesDocument'
	title: string
	labelIncomeRange: string
	labelReduction: string
	items: SubsidyItem[]
}

