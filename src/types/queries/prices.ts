// row de tableaux
type priceProps = {
	prestation: string
	price: number
}

type pricePrestation = {
	titlePrices: string
	mothPrices?: priceAccordion[]
	daysPrices?: priceAccordion[]
}

// Accordion item = title and Accordion content = table
type priceAccordion = {
	accordionItem: string
	accordionContent: priceProps[]
}

// ici on attribue l si possible le type de prix (nursery, trotteursGrands) avec chaqun à l'intérieur les 2 accordions (mothPrices, daysPrices)
export type PricesTypesProps = {
	nursery: pricePrestation[]
	trotteursGrands: pricePrestation[]
	subsides: {
		titleSubsides: string
		subsidesContent: {
			label: string
			reduction: number //float
		}[]
	}
}

// Types pour les données JSON (compatibles avec horaires-tarifs.json)
export type PriceItem = {
	description: string
	price: number
}

export type PricingSection = {
	label: string
	items: PriceItem[]
}

export type PricingBlockMensuel = {
	label: string
	journeeComplete: PricingSection
	matinRepas: PricingSection
	matinSansRepas: PricingSection
	apresMidiRepas: PricingSection
	apresMidiSansRepas: PricingSection
}

export type PricingBlockJournalier = {
	label: string
	journeeComplete: PricingSection
	matinee: PricingSection
	apresMidi: PricingSection
}

export type PriceDocument = {
	_id: string
	_type: string
	prixAuMois: PricingBlockMensuel
	prixAuJour: PricingBlockJournalier
}

export type SubsidiesDocument = {
	_id: string
	_type: string
	title: string
	labelIncomeRange: string
	labelReduction: string
	items: {
		incomeRange: string
		reductionDaily: number
	}[]
}
