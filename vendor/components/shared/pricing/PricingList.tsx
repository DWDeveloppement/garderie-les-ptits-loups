'use client'

import { AccordionContent, AccordionItem, AccordionRoot, AccordionTrigger } from '@/components/ui/accordion'

type SanityPriceItem = { service: string; price: string }
type SanityAccordionItem = { accordionTitle: string; priceItems?: SanityPriceItem[] }

type SanityPricingListProps = {
  title: string
  sections: SanityAccordionItem[] | undefined
}

export function PricingList({ title, sections }: SanityPricingListProps) {
  const safeSections = sections || []

  return (
    <article className="flex flex-col items-center justify-center mb-12 p-6 bg-white rounded-lg shadow-md border border-orange-6 w-full">
      <h3 className="font-bold text-purple-12 mb-6 text-center">{title}</h3>
      <AccordionRoot type="single" collapsible className="space-y-4 w-full">
        {safeSections.map((section) => (
          <AccordionItem key={section.accordionTitle} value={section.accordionTitle}>
            <AccordionTrigger>{section.accordionTitle}</AccordionTrigger>
            <AccordionContent>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-orange-6">
                  <thead className="bg-orange-2">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-orange-11 uppercase tracking-wider">Prestation</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-orange-11 uppercase tracking-wider">Prix (CHF)</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-orange-6">
                    {(section.priceItems || []).map((item, index) => (
                      <tr key={`${section.accordionTitle}-${index}`}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-purple-11">{item.service}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-orange-10">{`CHF ${item.price}`}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </AccordionRoot>
    </article>
  )
}


