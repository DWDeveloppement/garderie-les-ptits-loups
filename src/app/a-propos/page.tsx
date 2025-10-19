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
      {data?.parallax?.image && <ParalaxImage image={data.parallax.image} />}
      <HistorySection />
      {data?.parallax?.image && <ParalaxImage image={data.parallax.image} />}
      <TeamSection />
      <ValuesSection />
      <PedagogySection />
    </div>
  )
}
