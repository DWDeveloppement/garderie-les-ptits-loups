/**Page Horaires & Tarifs - Garderie Les P'tits Loups
 * Page complète avec horaires, tarifs et informations sur les subventions
 */
import { HeroHorairesTarifsSection } from "@/components/pages/horaires-tarifs/HeroHorairesTarifsSection"
import { ParalaxImage } from "@/components/ParalaxImage"
import { PriceSection } from "@/components/shared/PriceSection"
import { SubsidiesSection } from '@/components/shared/SubsidiesSection'
import { nurserieData, subventionsData, trotteursGrandsData } from '@/data/prices'

export default function HorairesTarifsPage() {
  return (
    <div className='min-h-screen'>
      <HeroHorairesTarifsSection />
      <PriceSection section={nurserieData} />
      <PriceSection section={trotteursGrandsData} />
      <ParalaxImage />
      <SubsidiesSection subsidies={subventionsData} />
    </div>
  )
}
