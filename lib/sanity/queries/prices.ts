import { groq } from 'next-sanity'
import { client } from '../client'

type Block = { _type: string; code?: string; children?: Array<{ text?: string }> }
type AccordionItem = { accordionTitle: string; priceContent: Block[] }

export const qMonthlyNursery = groq`*[_type == "prices" && documentType == "accordion" && frequentationType == "monthly-nursery"][0]{
	frequentationType,
	accordionItems[]{
		accordionTitle,
		priceContent
	}
}`

export async function fetchMonthlyNursery() {
	return client.fetch<{ frequentationType?: string; accordionItems: AccordionItem[] } | null>(qMonthlyNursery)
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

export function extractFirstCode(blocks: Block[] | undefined): string {
	if (!blocks) return ''
	const codeBlock = blocks.find((b) => b._type === 'code')
	if (codeBlock?.code) return codeBlock.code
	const first = blocks[0]
	if (first?.children?.length) return first.children.map((c) => c.text || '').join('')
	return ''
}
