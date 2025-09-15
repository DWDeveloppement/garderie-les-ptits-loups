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
