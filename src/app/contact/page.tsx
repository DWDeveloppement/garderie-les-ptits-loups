/**Page Contact - Garderie Les P'tits Loups
 * Un hero générique avec un titre et une description venant 
*/
import { ContactFormSection } from "@/components/pages/contact/ContactFormSection"
import { HeroContactSection } from "@/components/pages/contact/HeroContactSection"

export default function ContactPage() {
  return <div className="min-h-screen">
    <HeroContactSection />
    <ContactFormSection />
  </div>
}