/**
 * Page Horaires & Tarifs - Garderie Les P'tits Loups
 * Données depuis Sanity CMS
 */
import { HeroHorairesTarifsSection } from "@/components/pages/horaires-tarifs/HeroHorairesTarifsSection"
import { SubsidiesSection } from '@/components/pages/horaires-tarifs/SubsidiesSection'
import { ParalaxImage, PricingList } from "@/components/shared"
import { fetchSchedule } from 'lib/sanity/queries/schedule'
import { fetchDailyNursery, fetchDailyTG, fetchMonthlyNursery, fetchMonthlyTG, fetchSubsidies } from '../../../lib/sanity/queries/prices'

export default async function HorairesTarifsPage() {
  // Récupérer les données page + prix en parallèle
  const [scheduleData, monthlyNursery, dailyNursery, monthlyTG, dailyTG, subsidiesDoc] = await Promise.all([
    fetchSchedule(),
    fetchMonthlyNursery(),
    fetchDailyNursery(),
    fetchMonthlyTG(),
    fetchDailyTG(),
    fetchSubsidies(),
  ])

  return (
		<div className='min-h-screen'>
			<HeroHorairesTarifsSection 
        title={scheduleData?.title}
        description={scheduleData?.sectionHero?.description}
        image={scheduleData?.sectionHero?.image}
      />
			{/* Nurserie */}
			<section className='w-full py-16 px-4 sm:px-6 lg:px-8 bg-purple-1'>
				<div className='w-full max-w-6xl mx-auto gap-4 md:gap-8 flex flex-col items-center justify-center'>
					<h2 className="font-bold text-center text-balance">La Nurserie (0 – 24 mois)</h2>
					<div className='w-full grid grid-cols-1 items-start justify-center md:grid-cols-2 gap-16 lg:gap-24'>
						<PricingList title={'Prix au mois'} sections={monthlyNursery?.accordionItems} />
						<PricingList title={'Prix au jour'} sections={dailyNursery?.accordionItems} />
					</div>
				</div>
			</section>

			{/* Trotteurs & Grands */}
			<section className='w-full py-16 px-4 sm:px-6 lg:px-8 bg-purple-1'>
				<div className='w-full max-w-6xl mx-auto gap-4 md:gap-8 flex flex-col items-center justify-center'>
					<h2 className="font-bold text-center text-balance">Trotteurs et Grands (2 – 6 ans)</h2>
					<div className='w-full grid grid-cols-1 items-start justify-center md:grid-cols-2 gap-12 md:gap-16 lg:gap-24'>
						<PricingList title={'Prix au mois'} sections={monthlyTG?.accordionItems} />
						<PricingList title={'Prix au jour'} sections={dailyTG?.accordionItems} />
					</div>
				</div>
			</section>

			{scheduleData?.parallax?.image && <ParalaxImage image={scheduleData.parallax.image} />}
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
