/**
 * Page d'accueil - Garderie Les P'tits Loups
 * Données depuis Sanity CMS
 */
import { DevJsonViewer } from '@/components/dev'
import { HeroSection } from '@/components/pages/home/HeroSection'
import { SpacesSection } from '@/components/pages/home/SpacesSection'
import { StructureSection } from '@/components/pages/home/StructureSection'
import { TestimonialsSection } from '@/components/pages/home/Testimonals'
import { ParalaxImage } from '@/components/shared'
import type { TestimonialsTypesProps } from '@/sanity/types/content/testimonials'
import { fetchHome, fetchTestimonials } from '@/sanity/queries/home'

export default async function Home() {
	const [data, testimonialsData] = await Promise.all([fetchHome(), fetchTestimonials()])

	// Mapper les témoignages Sanity vers le format attendu par le composant
	const testimonials: TestimonialsTypesProps[] = (testimonialsData || []).map((testimonial, index) => ({
		id: index + 1,
		name: testimonial.signature || 'Parent',
		title: testimonial.title || 'Témoignage',
		content: testimonial.information,
		rating: 5, // Par défaut 5 étoiles (non présent dans le schéma Sanity)
	}))

	return (
		<div className='min-h-screen'>
			<HeroSection sectionHero={data?.sectionHero} />
			{data?.sectionStructure && <StructureSection sectionStructure={data?.sectionStructure} />}
			<SpacesSection spaces={data?.sectionOtherSpaces?.linkedOtherSpaces} contentComplement={data?.contentComplement} />
			{/* Image parallaxe venant de la query du champ parallax (ligne 67-71 du schema home.ts de Sanity).
          La query GROQ récupère parallax.image avec BASIC_IMAGE_QUERY qui retourne la structure SanityImage.
          Le composant ParalaxImage attend image?.asset?.url et image?.alt, ce qui correspond à la structure SanityImage. */}
			{data?.parallax?.image && <ParalaxImage image={data.parallax.image} />}
			{testimonials.length > 0 && <TestimonialsSection testimonials={testimonials} />}
			<DevJsonViewer data={data} slug='home' collapsed isHidden />
		</div>
	)
}
