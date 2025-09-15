/**Page Contact - Garderie Les P'tits Loups
 * Un hero générique avec un titre et une description venant 
*/
import { ContactFormSection } from "@/components/pages/contact/ContactFormSection"
import { HeroContactSection } from "@/components/pages/contact/HeroContactSection"
import { MapSection } from "@/components/pages/contact/MapSection"

export default function ContactPage() {
  return (
		<div className='min-h-screen'>
			<HeroContactSection />
			<ContactFormSection />
      <MapSection className='bg-orange-bg-light flex flex-col items-center justify-center' />
      <hr />
			<MapSection className='bg-orange-bg-light flex flex-col items-center justify-center' mapType='static' />
		</div>
	)
}