// Page About - Garderie Les P'tits Loups
import { DevJsonViewer } from '@/components/dev'
import { AboutIntroSection, HeroAboutSection, HistorySection, PedagogySection, TeamSection, ValuesSection } from '@/components/pages/about'
import { ParalaxImage } from '@/components/shared'
import { fetchAbout } from '@/sanity/queries/about'

// ISR: Cache de 60s + revalidation on-demand (via webhook Sanity)
export const revalidate = 60

export default async function AboutPage() {
	const data = await fetchAbout()

	return (
		<div className='min-h-screen'>
			<HeroAboutSection title={data?.title} description={data?.sectionHero?.description} image={data?.sectionHero?.image} />
			{data?.introduction && data.introduction.length > 0 && <AboutIntroSection content={data.introduction} />}
			{/* Parallax 1 - après l'introduction */}
			{data?.parallaxOne?.image && <ParalaxImage image={data.parallaxOne.image} />}
			{data?.historyCollapse?.historyImage && (
				<HistorySection content={data.historyCollapse.content} historyImage={data.historyCollapse.historyImage} />
			)}
			{/* Parallax 2 - après l'histoire */}
			{data?.parallaxTwo?.image && <ParalaxImage image={data.parallaxTwo.image} />}
			<TeamSection content={data?.team} />
			<ValuesSection content={data?.values} />
			<PedagogySection content={data?.pedagogy} />
			<DevJsonViewer data={data} slug='a-propos' collapsed />
		</div>
	)
}
