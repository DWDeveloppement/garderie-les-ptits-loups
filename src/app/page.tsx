/**
 * Page d'accueil - Garderie Les P'tits Loups
 * Données depuis Sanity CMS
 */
import { HeroSection } from "@/components/pages/home/HeroSection"
import { SpacesSection } from "@/components/pages/home/SpacesSection"
import { StructureSection } from "@/components/pages/home/StructureSection"
import { TestimonialsSection } from "@/components/pages/home/Testimonals"
import { ParalaxImage } from "@/components/shared"
import { fetchHome } from "lib/sanity/queries/home"

export default async function Home() {
  const data = await fetchHome()

  return (
    <div className="min-h-screen">
      <HeroSection 
        title={data?.sectionHero?.title}
        garderieName={data?.sectionHero?.garderieName}
        description={data?.sectionHero?.description}
        logo={data?.sectionHero?.logo}
        buttonText={data?.sectionHero?.buttonText}
        buttonLink={data?.sectionHero?.buttonLink}
      />
      <StructureSection sectors={data?.linkedSectors} />
      <SpacesSection spaces={data?.linkedOtherSpaces} />
      {data?.parallax?.image && <ParalaxImage image={data.parallax.image} />}
      <TestimonialsSection />
    </div>
  );
}
