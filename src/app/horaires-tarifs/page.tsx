/**Page Horaires & Tarifs - Garderie Les P'tits Loups
 * Page complète avec horaires, tarifs et informations sur les subventions
 */
import { HeroHorairesTarifsSection } from "@/components/pages/horaires-tarifs/HeroHorairesTarifsSection"
import { HorairesSection } from "@/components/pages/horaires-tarifs/HorairesSection"
import { SubventionsSection } from "@/components/pages/horaires-tarifs/SubventionsSection"
import { TarifsSection } from "@/components/pages/horaires-tarifs/TarifsSection"

export default function HorairesTarifsPage() {
  return (
    <div className='min-h-screen'>
      <HeroHorairesTarifsSection />
      <HorairesSection />
          <TarifsSection />
      <SubventionsSection />
    </div>
  )
}
