import { groq } from 'next-sanity'
import { client } from '../client'

// Types Sanity simplifiés pour consommation directe
export type SanityPriceItem = { service: string; price: string }
export type SanityAccordionItem = { accordionTitle: string; priceItems: SanityPriceItem[] }

// Requêtes pour les 4 documents d'accordéon
export const qMonthlyNursery = groq`*[_type == "prices" && documentType == "accordion" && frequentationType == "monthly-nursery"][0]{
	frequentationType,
	accordionItems[]{
		accordionTitle,
		priceItems[]{service, price}
	}
}`

export const qDailyNursery = groq`*[_type == "prices" && documentType == "accordion" && frequentationType == "daily-nursery"][0]{
	frequentationType,
	accordionItems[]{
		accordionTitle,
		priceItems[]{service, price}
	}
}`

export const qMonthlyTG = groq`*[_type == "prices" && documentType == "accordion" && frequentationType == "monthly-trotteurs-grands"][0]{
	frequentationType,
	accordionItems[]{
		accordionTitle,
		priceItems[]{service, price}
	}
}`

export const qDailyTG = groq`*[_type == "prices" && documentType == "accordion" && frequentationType == "daily-trotteurs-grands"][0]{
	frequentationType,
	accordionItems[]{
		accordionTitle,
		priceItems[]{service, price}
	}
}`

// Requête pour le document Subventions (table)
export const qSubsidies = groq`*[_type == "prices" && documentType == "table"][0]{
	tableContent{
		subsidyItems[]{ incomeRange, subsidy }
	}
}`

export async function fetchMonthlyNursery() {
	return client.fetch<{ frequentationType?: string; accordionItems: SanityAccordionItem[] } | null>(qMonthlyNursery)
}

export async function fetchDailyNursery() {
	return client.fetch<{ frequentationType?: string; accordionItems: SanityAccordionItem[] } | null>(qDailyNursery)
}

export async function fetchMonthlyTG() {
	return client.fetch<{ frequentationType?: string; accordionItems: SanityAccordionItem[] } | null>(qMonthlyTG)
}

export async function fetchDailyTG() {
	return client.fetch<{ frequentationType?: string; accordionItems: SanityAccordionItem[] } | null>(qDailyTG)
}

export async function fetchSubsidies() {
	return client.fetch<{ tableContent?: { subsidyItems: { incomeRange: string; subsidy: string }[] } } | null>(qSubsidies)
}

export function getFrequentationLabel(value?: string): string {
	const map: Record<string, string> = {
		'monthly-nursery': 'Tarifs mensuels (Nurserie)',
		'daily-nursery': 'Tarifs journaliers (Nurserie)',
		'monthly-trotteurs-grands': 'Tarifs mensuels (Trotteurs & Grands)',
		'daily-trotteurs-grands': 'Tarifs journaliers (Trotteurs & Grands)',
	}
	return value && map[value] ? map[value] : 'Tarifs'
}
