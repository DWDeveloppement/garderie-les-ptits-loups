import { PriceDocument, PricingBlockJournalier, PricingBlockMensuel } from '@/data/prices'

// Types Sanity
type Block = { _type: string; code?: string; children?: Array<{ text?: string }> }
type AccordionItem = { accordionTitle: string; priceContent: Block[] }
type SanityPricesData = { frequentationType?: string; accordionItems: AccordionItem[] }

/**
 * Parse le contenu d'un bloc code pour extraire les données de prix
 */
function parseCodeContent(code: string): { description: string; price: number; priceText?: string }[] {
	const lines = code.split('\n').filter((line) => line.trim())
	const items: { description: string; price: number }[] = []

	for (const line of lines) {
		// Format attendu: "Description | Prix" ou "Description\tPrix"
		const parts = line.split(/[|\t]/).map((part) => part.trim())
		if (parts.length >= 2) {
			const description = parts[0]
			let priceStr = parts[1]

			// Nettoyer le prix : garder seulement chiffres, virgules et points
			priceStr = priceStr.replace(/[^\d.,]/g, '')

			// Gérer les formats suisses : "492.-" ou "492,00" ou "492.00"
			if (priceStr.includes('.-')) {
				priceStr = priceStr.replace('.-', '')
			}

			// Convertir virgule en point pour parseFloat
			priceStr = priceStr.replace(',', '.')

			const parsed = parseFloat(priceStr)

			// Stocker le texte brut en priorité, garder un nombre si parse réussi
			items.push({ description, price: isNaN(parsed) ? 0 : parsed, priceText: parts[1] })
		}
	}

	return items
}

/**
 * Crée un PricingSection à partir d'un AccordionItem
 */
function createPricingSection(item: AccordionItem): { label: string; items: { description: string; price: number; priceText?: string }[] } {
	const code = item.priceContent.find((b) => b._type === 'code')?.code || ''
	const items = parseCodeContent(code)

	return {
		label: item.accordionTitle,
		items,
	}
}

/**
 * Adapte les données Sanity vers le format PriceDocument
 */
export function adaptSanityToPriceDocument(sanityData: SanityPricesData | null): PriceDocument | null {
	if (!sanityData?.accordionItems?.length) return null

	const items = sanityData.accordionItems

	// Créer les sections pour prix au mois
	const journeeComplete = items.find((item) => item.accordionTitle === 'Journée complète')
	const matinRepas = items.find((item) => item.accordionTitle === 'Matin avec repas')
	const matinSansRepas = items.find((item) => item.accordionTitle === 'Matin sans repas')
	const apresMidiRepas = items.find((item) => item.accordionTitle === 'Après-midi avec repas')
	const apresMidiSansRepas = items.find((item) => item.accordionTitle === 'Après-midi sans repas')

	const prixAuMois: PricingBlockMensuel = {
		label: 'Prix au mois',
		journeeComplete: journeeComplete ? createPricingSection(journeeComplete) : { label: 'Journée complète', items: [] },
		matinRepas: matinRepas ? createPricingSection(matinRepas) : { label: 'Matin avec repas', items: [] },
		matinSansRepas: matinSansRepas ? createPricingSection(matinSansRepas) : { label: 'Matin sans repas', items: [] },
		apresMidiRepas: apresMidiRepas ? createPricingSection(apresMidiRepas) : { label: 'Après-midi avec repas', items: [] },
		apresMidiSansRepas: apresMidiSansRepas ? createPricingSection(apresMidiSansRepas) : { label: 'Après-midi sans repas', items: [] },
	}

	// Pour l'instant, on utilise les mêmes données pour prix au jour
	// TODO: Adapter selon le type de fréquentation (daily vs monthly)
	const prixAuJour: PricingBlockJournalier = {
		label: 'Prix au jour',
		journeeComplete: journeeComplete ? createPricingSection(journeeComplete) : { label: 'Journée complète', items: [] },
		matinee: matinRepas ? createPricingSection(matinRepas) : { label: 'Matinée', items: [] },
		apresMidi: apresMidiRepas ? createPricingSection(apresMidiRepas) : { label: 'Après-midi', items: [] },
	}

	return {
		_id: 'sanity-nursery',
		_type: 'priceDocument',
		prixAuMois,
		prixAuJour,
	}
}
