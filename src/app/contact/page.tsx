/**
 * Page Contact - Garderie Les P'tits Loups
 * Données depuis Sanity CMS
 */
import { ContactFormSection } from "@/components/pages/contact/ContactFormSection"
import { HeroContactSection } from "@/components/pages/contact/HeroContactSection"
import { MapSection } from "@/components/pages/contact/MapSection"
import { ParalaxImage } from "@/components/shared"
import { fetchContact } from "@/sanity/queries/contact"

export default async function ContactPage() {
  const data = await fetchContact()

  return (
    <div className='min-h-screen'>
      <HeroContactSection 
        title={data?.title}
        description={data?.sectionHero?.description}
        image={data?.sectionHero?.image}
      />
      <ContactFormSection />
      {data?.parallax?.image && <ParalaxImage image={data.parallax.image} />}
      <MapSection className='bg-orange-bg-light flex flex-col items-center justify-center' />
    </div>
  )
}