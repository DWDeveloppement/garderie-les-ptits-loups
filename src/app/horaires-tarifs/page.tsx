/**Page Horaires & Tarifs - Garderie Les P'tits Loups
 * Page complète avec horaires, tarifs et informations sur les subventions
 */
import { HeroHorairesTarifsSection } from "@/components/pages/horaires-tarifs/HeroHorairesTarifsSection"
import { PriceSection } from "@/components/pages/horaires-tarifs/PriceSection"
import { SubsidiesSection } from '@/components/pages/horaires-tarifs/SubsidiesSection'
import { ParalaxImage } from "@/components/ParalaxImage"
import { nurserieData, subventionsData, trotteursGrandsData } from '@/data/prices'

export default function HorairesTarifsPage() {
  return (
		<div className='min-h-screen'>
			<HeroHorairesTarifsSection />
			<PriceSection section={nurserieData} />
		  <PriceSection section={trotteursGrandsData} />
		  <div className="w-full max-w-6xl mx-auto">
			<div className="w-full grid grid-cols-1 items-start justify-center md:grid-cols-2 gap-8">
				<div className="w-full">
					  <h2 className="text-2xl font-bold text-purple-12">Tarifs accordéon test</h2>
					  <div className="w-full">
						  {/* TODO: ajouter le contenu de l'accordéon test */}
					</div>
				</div>
			</div>
		  </div>
			<ParalaxImage />
			<SubsidiesSection subsidies={subventionsData} />
		</div>
	)
}
