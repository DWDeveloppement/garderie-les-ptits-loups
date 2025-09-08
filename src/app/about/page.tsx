// Page About - Garderie Les P'tits Loups
import {
  AboutIntroSection,
  HeroAboutSection,
  HistorySection,
  PedagogySection,
  TeamSection,
  ValuesSection
} from "@/components/pages/about"
import { ParalaxImage } from "@/components/ParalaxImage"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <HeroAboutSection />
      <AboutIntroSection />
      <ParalaxImage />
      <HistorySection />
      <ParalaxImage />
      <TeamSection />
      <ValuesSection />
      <PedagogySection />
    </div>
  )
}
