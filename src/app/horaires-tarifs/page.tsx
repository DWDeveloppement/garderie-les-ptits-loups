/**Page Horaires & Tarifs - Garderie Les P'tits Loups
 * Page complète avec horaires, tarifs et informations sur les subventions
 */
import { HeroHorairesTarifsSection } from "@/components/pages/horaires-tarifs/HeroHorairesTarifsSection"
import { PriceSection } from "@/components/pages/horaires-tarifs/PriceSection"
import { SubsidiesSection } from '@/components/pages/horaires-tarifs/SubsidiesSection'
import { ParalaxImage } from "@/components/ParalaxImage"
import { subventionsData } from '@/data/prices'
import { adaptSanityToPriceDocument } from '../../../lib/sanity/adapters/prices'
import { fetchMonthlyNursery } from '../../../lib/sanity/queries/prices'

export default async function HorairesTarifsPage() {
  // Récupérer les données Sanity
  const sanityData = await fetchMonthlyNursery()
  
  // Adapter les données Sanity vers le format des composants
  const adaptedData = adaptSanityToPriceDocument(sanityData)
  
  return (
		<div className='min-h-screen'>
			<HeroHorairesTarifsSection />
			
			{/* Section Sanity adaptée */}
			{adaptedData ? (
				<PriceSection section={adaptedData} />
			) : (
				<div className='w-full py-16 px-4 sm:px-6 lg:px-8 bg-purple-1'>
					<div className='w-full max-w-6xl mx-auto'>
						<p className='text-center text-gray-600'>Aucun document Sanity trouvé.</p>
					</div>
				</div>
			)}
			
			<ParalaxImage />
			<SubsidiesSection subsidies={subventionsData} />
		</div>
	)
}
