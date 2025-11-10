import { PricingList } from '@/components/shared/pricing/PricingList'

type SanityPriceItem = { service: string; price: string }
type SanityAccordionItem = { accordionTitle: string; priceItems?: SanityPriceItem[] }

type PriceAccordionDocument = {
	accordionItems: SanityAccordionItem[]
} | null

type PricesSectionProps = {
	monthlyNursery: PriceAccordionDocument
	dailyNursery: PriceAccordionDocument
	monthlyTG: PriceAccordionDocument
	dailyTG: PriceAccordionDocument
}

export function PricesSection({ monthlyNursery, dailyNursery, monthlyTG, dailyTG }: PricesSectionProps) {
	return (
		<>
			{/* Nurserie */}
			<section className='w-full py-16 px-4 sm:px-6 lg:px-8 gradient-section-a'>
				<div className='w-full max-w-6xl mx-auto gap-4 md:gap-8 flex flex-col items-center justify-center'>
					<h2 className='font-bold text-center text-balance mb-8'>La Nurserie (0 – 24 mois)</h2>
					<div className='w-full grid grid-cols-1 items-start justify-center md:grid-cols-2 gap-16 lg:gap-24'>
						<PricingList title={'Prix au mois'} sections={monthlyNursery?.accordionItems} />
						<PricingList title={'Prix au jour'} sections={dailyNursery?.accordionItems} />
					</div>
				</div>
			</section>

			{/* Trotteurs & Grands */}
			<section className='w-full py-16 px-4 sm:px-6 lg:px-8 gradient-section-b'>
				<div className='w-full max-w-6xl mx-auto gap-4 md:gap-8 flex flex-col items-center justify-center'>
					<h2 className='font-bold text-center text-balance mb-8'>Trotteurs et Grands (2 – 6 ans)</h2>
					<div className='w-full grid grid-cols-1 items-start justify-center md:grid-cols-2 gap-12 md:gap-16 lg:gap-24'>
						<PricingList title={'Prix au mois'} sections={monthlyTG?.accordionItems} />
						<PricingList title={'Prix au jour'} sections={dailyTG?.accordionItems} />
					</div>
				</div>
			</section>
		</>
	)
}
