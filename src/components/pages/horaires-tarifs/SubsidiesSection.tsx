'use client'

import { Card, CardContent } from '@/components/ui/card'
import { SubsidiesTable } from '../../shared/SubsidiesTable'

type SubsidiesSectionProps = {
	subsidies: {
		labelIncomeRange: string
		labelReduction: string
		items: { incomeRange: string; subsidy: string }[]
	}
}

export function SubsidiesSection({ subsidies }: SubsidiesSectionProps) {
	return (
		<section className="py-16 px-4 sm:px-6 lg:px-8 bg-orange-1">
			<div className="max-w-7xl mx-auto">
				{/* En-tête de section */}
				<Card className="mb-12">
					<CardContent className="text-center py-8">
					<h2 className="text-3xl md:text-4xl font-bold text-purple-12 mb-4">Subventions communales</h2>
						<p className="text-lg text-orange-10 max-w-3xl mx-auto">
							Consultez les subventions communales disponibles selon vos revenus annuels.
							Les montants sont calculés automatiquement et déduits de votre facture mensuelle.
						</p>
					</CardContent>
				</Card>

				{/* Tableau des subventions */}
				<SubsidiesTable subsidies={subsidies} />

				{/* Note importante */}
				<Card className="mt-12 bg-purple-2 border-l-4 border-purple-9">
					<CardContent className="py-6">
						<p className="text-purple-11">
							<strong>Information importante :</strong> Les subventions sont automatiquement 
							calculées et appliquées selon vos revenus déclarés. 
							Contactez-nous pour toute question concernant votre éligibilité.
						</p>
					</CardContent>
				</Card>
			</div>
		</section>
	)
}
