/**
 * Page Horaires & Tarifs - Garderie Les P'tits Loups
 * Données depuis Sanity CMS
 */
import { DevJsonViewer } from '@/components/dev'
import { HeroHorairesTarifsSection } from '@/components/pages/horaires-tarifs/HeroHorairesTarifsSection'
import { PricesSection } from '@/components/pages/horaires-tarifs/PricesSection'
import { SubsidiesSection } from '@/components/pages/horaires-tarifs/SubsidiesSection'
import { ParalaxImage } from '@/components/shared'
import { fetchSchedule } from '@/sanity/queries/schedule'
import { fetchDailyNursery, fetchDailyTG, fetchMonthlyNursery, fetchMonthlyTG, fetchSubsidies } from '@/sanity/queries/prices'

// ISR: Revalidation on-demand uniquement (via webhook Sanity)
export const revalidate = 0

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
			<PricesSection monthlyNursery={monthlyNursery} dailyNursery={dailyNursery} monthlyTG={monthlyTG} dailyTG={dailyTG} />
			{scheduleData?.parallax?.image && <ParalaxImage image={scheduleData.parallax.image} />}
			<SubsidiesSection
				subsidies={{
					labelIncomeRange: subsidiesDoc?.tableContent?.incomeRangeTitle || 'Revenus annuels familial',
					labelReduction: subsidiesDoc?.tableContent?.reductionTitle || 'Subvention accordée/jour',
					items: (subsidiesDoc?.tableContent?.subsidyItems || []).map((it) => ({
						incomeRange: it.incomeRange,
						subsidy: `${it.subsidy}`,
					})),
					title: scheduleData?.subsidiesTable?.title || 'Subventions communales',
					tableSubsidiesInfo: scheduleData?.subsidiesTable?.informationImportantSubsidies,
				}}
			/>
			<DevJsonViewer data={[scheduleData, monthlyNursery, dailyNursery, monthlyTG, dailyTG, subsidiesDoc]} />
		</div>
	)
}
