'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

type SanityPriceItem = { service: string; price: string }
type SanityAccordionItem = { accordionTitle: string; priceItems?: SanityPriceItem[] }

type SanityPricingListProps = {
	title: string
	sections: SanityAccordionItem[] | undefined
}

export function PricingList({ title, sections }: SanityPricingListProps) {
	const safeSections = sections || []

	return (
		<Card role='article' variant='primary'>
			<CardHeader>
				<h3 className='mb-6 text-center'>{title}</h3>
			</CardHeader>
			<CardContent className='p-0'>
				<Accordion role='list' type='single' collapsible className='space-y-4 rounded-lg overflow-hidden'>
					{safeSections.map((section) => (
						<>
							<AccordionItem
								key={section.accordionTitle}
								value={section.accordionTitle}
								className='border-none m-0 first:rounded-t-lg last:rounded-b-lg'>
								<AccordionTrigger className='text-fl-base text-balance font-bold flex items-center justify-between gap-2 hover:text-purple-10 transition-colors hover:bg-purple-3 p-4 hover:cursor-pointer hover:no-underline rounded-none'>
									{section.accordionTitle}
								</AccordionTrigger>
								<AccordionContent asChild className='overflow-x-auto'>
									<table className='flex flex-col min-w-full divide-y divide-orange-6'>
										<thead className='bg-orange-2'>
											<tr className='flex w-full'>
												<th className='flex-1 px-6 py-3 text-left text-fl-sm font-bold text-orange-11 uppercase tracking-wider'>
													Prestation
												</th>
												<th className='px-6 py-3 text-left text-fl-sm font-bold text-orange-11 uppercase tracking-wider'>Prix (CHF)</th>
											</tr>
										</thead>
										<tbody className='divide-y divide-purple-6'>
											{(section.priceItems || []).map((item, index) => (
												<tr key={`${section.accordionTitle}-${index}`} className='flex w-full'>
													<td className='flex-1 px-6 py-4 text-fl-sm font-bold text-balance text-purple-11'>{item.service}</td>
													<td className='px-6 py-4 whitespace-nowrap text-fl-sm text-orange-10'>{`CHF ${item.price}`}</td>
												</tr>
											))}
										</tbody>
									</table>
								</AccordionContent>
							</AccordionItem>
							<Separator orientation='horizontal' className='!h-0.5 w-full mx-auto bg-orange-6 last:hidden !my-0' />
						</>
					))}
				</Accordion>
			</CardContent>
		</Card>
	)
}
