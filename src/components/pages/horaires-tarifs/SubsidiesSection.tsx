'use client'

import { RichTextRenderer } from '@/components/shared'
import { SubsidiesTable } from '@/components/shared/pricing'
import { Card } from '@/components/ui/card'

import type { PortableTextBlock } from '@/types/sanity/portableText'

type SubsidiesSectionProps = {
	subsidies: {
		labelIncomeRange: string
		labelReduction: string
		items: { incomeRange: string; subsidy: string }[]
		tableSubsidiesInfo?: PortableTextBlock[]
	}
}

export function SubsidiesSection({ subsidies }: SubsidiesSectionProps) {
	return (
		<section className='py-16 px-4 sm:px-6 lg:px-8 gradient-section-a'>
			<div className='max-w-7xl mx-auto'>
				{/* En-tête de section */}
				<h2 className='font-bold text-center text-balance mb-4'>Subventions communales</h2>

				{/* Note importante - Rich Text depuis Sanity */}
				{subsidies.tableSubsidiesInfo && subsidies.tableSubsidiesInfo.length > 0 && (
					<Card variant='primary' className='mb-8'>
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
				<div className='mt-12'>
					<SubsidiesTable subsidies={subsidies} />
				</div>
			</div>
		</section>
	)
}
