// Exemple d'usage du système typographique et espacement Tailwind
import { AccordionSection } from '@/components/pages/exemples/AccordionSection'
import { ButtonSection } from '@/components/pages/exemples/ButtonSection'
import { CalloutSection } from '@/components/pages/exemples/CalloutSection'
import { CardSection } from '@/components/pages/exemples/CardSection'
import { TypographySection } from '@/components/pages/exemples/TypographySection'
export default function ExamplePage() {
	return (
		<div className='p-8'>
			<div className='max-w-6xl mx-auto space-y-12'>
				<h1 className='font-bold'>Exemples de pages</h1>
				{/* Section 1: Typographie */}
				<TypographySection />
				<ButtonSection />
				<CalloutSection />
				<CardSection />
				<AccordionSection />
			</div>
		</div>
	)
}
