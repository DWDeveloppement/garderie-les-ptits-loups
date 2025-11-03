'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Card } from '@/components/ui/card'

type SanityPriceItem = { service: string; price: string }
type SanityAccordionItem = { accordionTitle: string; priceItems?: SanityPriceItem[] }

type SanityPricingListProps = {
  title: string
  sections: SanityAccordionItem[] | undefined
}

export function PricingList({ title, sections }: SanityPricingListProps) {
  const safeSections = sections || []

  return (
    <>
      {/* On garde cet espace pour des tests de présentation de la Card */}
    <Card>
      <article>
        je suis un article
      </article>
      </Card>
      {/* Fin des tests de présentation de la Card */}
      
      {/* On garde ce code original ci-dessous. ne pas toucher à ce code */}
    <article className="p-6 bg-white rounded-lg shadow-md border border-orange-6 w-full">
      <h3 className="mb-6 text-center">{title}</h3>
      <Accordion type="single" collapsible className="space-y-4">
        {safeSections.map((section) => (
          <AccordionItem key={section.accordionTitle} value={section.accordionTitle}>
            <AccordionTrigger className="text-xl text-balance font-bold flex items-center justify-between gap-2">
              {section.accordionTitle}
            </AccordionTrigger>
            <AccordionContent asChild className='overflow-x-auto'>
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
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </article>
    </>
  )
}


