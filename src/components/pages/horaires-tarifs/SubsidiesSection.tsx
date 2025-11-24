'use client'

import { RichTextRenderer } from '@/components/shared'
import { SubsidiesTable } from '@/components/shared/pricing'
import { Card } from '@/ui/card'

import type { PortableTextBlock } from '@/sanity/types/core/portableText'

type SubsidiesSectionProps = {
	subsidies: {
		title: string
		labelIncomeRange: string
		labelReduction: string
		items: { incomeRange: string; subsidy: string }[]
		tableSubsidiesInfo?: PortableTextBlock[]
	}
}

export function SubsidiesSection({ subsidies }: SubsidiesSectionProps) {
	return (
		<section className='py-16 px-8 md:px-16 gradient-section-a'>
			<div className='max-w-7xl mx-auto'>
				{/* En-tête de section */}
				<h2 className='font-bold text-center text-balance mb-8'>{subsidies.title}</h2>

				{/* Note importante - Rich Text depuis Sanity */}
				{subsidies.tableSubsidiesInfo && subsidies.tableSubsidiesInfo.length > 0 && (
					<Card variant='primary' className='mb-24 max-w-5xl mx-auto'>
						<RichTextRenderer content={subsidies.tableSubsidiesInfo} />
					</Card>
				)}
				{/*
				<Card variant='primary' className='mt-12'>
					<CardHeader>
						<CardTitle>
							<strong className='text-purple-9'>Information importante :</strong>
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className='text-purple-11'>
							Les subventions sont automatiquement calculées et appliquées selon vos revenus déclarés. Contactez-nous pour toute question
							concernant votre éligibilité.
						</p>
					</CardContent>
				</Card>

*/}
				{/* Tableau des subventions */}
				<div className='max-w-5xl mx-auto'>
					<SubsidiesTable subsidies={subsidies} />
				</div>
			</div>
		</section>
	)
}
