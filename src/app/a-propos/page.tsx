// Page About - Garderie Les P'tits Loups
import {
  AboutIntroSection,
  HeroAboutSection,
  HistorySection,
  PedagogySection,
  TeamSection,
  ValuesSection
} from "@/components/pages/about"
import { ParalaxImage } from "@/components/shared"
import { fetchAbout } from "lib/sanity/queries/about"

export default async function AboutPage() {
  const data = await fetchAbout()

  return (
    <div className="min-h-screen">
      <HeroAboutSection 
        title={data?.title}
        description={data?.sectionHero?.description}
        image={data?.sectionHero?.image}
      />
      <AboutIntroSection />
      {/* Parallax 1 - après l'introduction */}
      {data?.parallaxOne?.image && <ParalaxImage image={data.parallaxOne.image} />}
      <HistorySection />
      {/* Parallax 2 - après l'histoire */}
      {data?.parallaxTwo?.image && <ParalaxImage image={data.parallaxTwo.image} />}
      <TeamSection />
      <ValuesSection />
      <PedagogySection />
    </div>
  )
}
