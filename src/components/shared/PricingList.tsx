'use client'

import { AccordionContent, AccordionItem, AccordionRoot, AccordionTrigger } from '@/components/ui/accordion'
import { PriceItem, PricingBlockJournalier, PricingBlockMensuel } from '@/data/prices'

type PricingListProps = {
	pricingLabel: string
	pricingData: PricingBlockMensuel | PricingBlockJournalier
}

export function PricingList({ pricingLabel, pricingData }: PricingListProps) {
	// Format CHF (fr-CH)
	const formatCHF = (value: number) =>
		new Intl.NumberFormat('fr-CH', {
			style: 'currency',
			currency: 'CHF',
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(value)

	// Fonction helper pour rendre un tableau
	const renderTable = (items: PriceItem[] & Array<{ priceText?: string }>) => (
		<div className="overflow-x-auto">
			<table className="min-w-full divide-y divide-orange-6">
				<thead className="bg-orange-2">
					<tr>
						<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-orange-11 uppercase tracking-wider">
							Prestation
						</th>
						<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-orange-11 uppercase tracking-wider">
							Prix (CHF)
						</th>
					</tr>
				</thead>
				<tbody className="bg-white divide-y divide-orange-6">
					{items.map((item, index) => (
						<tr key={index}>
							<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-purple-11">
								{item.description}
							</td>
							<td className="px-6 py-4 whitespace-nowrap text-sm text-orange-10">
								{item.priceText ? item.priceText : formatCHF(item.price)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)

	return (
		<article className="mb-12 p-6 bg-white rounded-lg shadow-md border border-orange-6">
			<h3 className="text-xl font-bold text-purple-12 mb-6 text-center">
				{pricingLabel}
			</h3>
			
			<AccordionRoot type="single" collapsible className="space-y-4">
				{/* Accordéon Journée complète - toujours présent */}
				{pricingData.journeeComplete.items.length > 0 && (
					<AccordionItem value="journeeComplete">
						<AccordionTrigger>{pricingData.journeeComplete.label}</AccordionTrigger>
						<AccordionContent>
							{renderTable(pricingData.journeeComplete.items)}
						</AccordionContent>
					</AccordionItem>
				)}

				{/* Logique conditionnelle selon le type */}
				{'matinRepas' in pricingData ? (
					// Type PricingBlockMensuel
					<>
						{pricingData.matinRepas.items.length > 0 && (
							<AccordionItem value="matinRepas">
								<AccordionTrigger>{pricingData.matinRepas.label}</AccordionTrigger>
								<AccordionContent>
									{renderTable(pricingData.matinRepas.items)}
								</AccordionContent>
							</AccordionItem>
						)}
						{pricingData.matinSansRepas.items.length > 0 && (
							<AccordionItem value="matinSansRepas">
								<AccordionTrigger>{pricingData.matinSansRepas.label}</AccordionTrigger>
								<AccordionContent>
									{renderTable(pricingData.matinSansRepas.items)}
								</AccordionContent>
							</AccordionItem>
						)}
						{pricingData.apresMidiRepas.items.length > 0 && (
							<AccordionItem value="apresMidiRepas">
								<AccordionTrigger>{pricingData.apresMidiRepas.label}</AccordionTrigger>
								<AccordionContent>
									{renderTable(pricingData.apresMidiRepas.items)}
								</AccordionContent>
							</AccordionItem>
						)}
						{pricingData.apresMidiSansRepas.items.length > 0 && (
							<AccordionItem value="apresMidiSansRepas">
								<AccordionTrigger>{pricingData.apresMidiSansRepas.label}</AccordionTrigger>
								<AccordionContent>
									{renderTable(pricingData.apresMidiSansRepas.items)}
								</AccordionContent>
							</AccordionItem>
						)}
					</>
				) : (
					// Type PricingBlockJournalier
					<>
						{pricingData.matinee.items.length > 0 && (
							<AccordionItem value="matinee">
								<AccordionTrigger>{pricingData.matinee.label}</AccordionTrigger>
								<AccordionContent>
									{renderTable(pricingData.matinee.items)}
								</AccordionContent>
							</AccordionItem>
						)}
						{pricingData.apresMidi.items.length > 0 && (
							<AccordionItem value="apresMidi">
								<AccordionTrigger>{pricingData.apresMidi.label}</AccordionTrigger>
								<AccordionContent>
									{renderTable(pricingData.apresMidi.items)}
								</AccordionContent>
							</AccordionItem>
						)}
					</>
				)}
			</AccordionRoot>
		</article>
	)
}
