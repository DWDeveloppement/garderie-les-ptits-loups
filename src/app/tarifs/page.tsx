/**Page Horaires & Tarifs - Garderie Les P'tits Loups
 * Page complète avec horaires, tarifs et informations sur les subventions
 */
import { HeroHorairesTarifsSection } from "@/components/pages/horaires-tarifs/HeroHorairesTarifsSection"
import { SubsidiesSection } from '@/components/pages/horaires-tarifs/SubsidiesSection'
import { ParalaxImage, PricingList } from "@/components/shared"
// plus de mock; lecture Sanity directe
// Rendu direct des accordéons Sanity sans mapping
import { fetchDailyNursery, fetchDailyTG, fetchMonthlyNursery, fetchMonthlyTG, fetchSubsidies } from '../../../lib/sanity/queries/prices'

export default async function HorairesTarifsPage() {
  // Récupérer les 4 documents Sanity en parallèle
  const [monthlyNursery, dailyNursery, monthlyTG, dailyTG, subsidiesDoc] = await Promise.all([
    fetchMonthlyNursery(),
    fetchDailyNursery(),
    fetchMonthlyTG(),
    fetchDailyTG(),
    fetchSubsidies(),
  ])

  return (
		<div className='min-h-screen'>
			<HeroHorairesTarifsSection />
			{/* Nurserie */}
			<section className='w-full py-16 px-4 sm:px-6 lg:px-8 bg-purple-1'>
				<div className='w-full max-w-6xl mx-auto gap-2'>
					<h2 className='text-2xl font-bold text-purple-12'>La Nurserie (0 – 24 mois)</h2>
					<div className='w-full grid grid-cols-1 items-start justify-center md:grid-cols-2 gap-8'>
						<PricingList title={'Prix au mois'} sections={monthlyNursery?.accordionItems} />
						<PricingList title={'Prix au jour'} sections={dailyNursery?.accordionItems} />
					</div>
				</div>
			</section>

			{/* Trotteurs & Grands */}
			<section className='w-full py-16 px-4 sm:px-6 lg:px-8 bg-purple-1'>
				<div className='w-full max-w-6xl mx-auto gap-2'>
					<h2 className='text-2xl font-bold text-purple-12'>Trotteurs et Grands (2 – 6 ans)</h2>
					<div className='w-full grid grid-cols-1 items-start justify-center md:grid-cols-2 gap-8'>
						<PricingList title={'Prix au mois'} sections={monthlyTG?.accordionItems} />
						<PricingList title={'Prix au jour'} sections={dailyTG?.accordionItems} />
					</div>
				</div>
			</section>

			<ParalaxImage />
			{/* Subventions depuis Sanity (sans fallback) */}
			<SubsidiesSection subsidies={{
				labelIncomeRange: 'Revenus annuels familial',
				labelReduction: 'subvention accordée/jour',
				items: (subsidiesDoc?.tableContent?.subsidyItems || []).map((it) => ({
					incomeRange: it.incomeRange,
					subsidy: `${it.subsidy}`,
				})),
			}} />
		</div>
	)
}
