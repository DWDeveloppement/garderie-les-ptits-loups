import type { PortableTextBlock } from '@/types/sanity/portableText'
import { groq } from 'next-sanity'
import { sanityFetch } from '../client'

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
	tableSubsidiesInfo,
	tableContent{
		incomeRangeTitle,
		reductionTitle,
		subsidyItems[]{ incomeRange, subsidy }
	}
}`

export async function fetchMonthlyNursery() {
	return sanityFetch<{ frequentationType?: string; accordionItems: SanityAccordionItem[] } | null>(
		qMonthlyNursery,
		{},
		{ tag: 'prices-monthly-nursery' }
	)
}

export async function fetchDailyNursery() {
	return sanityFetch<{ frequentationType?: string; accordionItems: SanityAccordionItem[] } | null>(
		qDailyNursery,
		{},
		{ tag: 'prices-daily-nursery' }
	)
}

export async function fetchMonthlyTG() {
	return sanityFetch<{ frequentationType?: string; accordionItems: SanityAccordionItem[] } | null>(
		qMonthlyTG,
		{},
		{ tag: 'prices-monthly-tg' }
	)
}

export async function fetchDailyTG() {
	return sanityFetch<{ frequentationType?: string; accordionItems: SanityAccordionItem[] } | null>(qDailyTG, {}, { tag: 'prices-daily-tg' })
}

export async function fetchSubsidies() {
	return sanityFetch<{
		tableSubsidiesInfo?: PortableTextBlock[]
		tableContent?: { incomeRangeTitle: string; reductionTitle: string; subsidyItems: { incomeRange: string; subsidy: string }[] }
	} | null>(qSubsidies, {}, { tag: 'prices-subsidies' })
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
