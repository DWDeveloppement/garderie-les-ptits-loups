'use client'

import { PriceDocument } from '@/data/prices'
import { PricingList } from '../../shared/PricingList'

type PriceSectionProps = {
	section: PriceDocument
	heading?: string
}


export function PriceSection({ section, heading }: PriceSectionProps) {
	const inferredTitle = section._id?.toLowerCase().includes('nur')
		? 'La Nurserie (0 – 24 mois)'
		: 'Trotteurs et Grands (2 – 6 ans)'

	return (
		<section className=' w-full py-16 px-4 sm:px-6 lg:px-8 bg-purple-1'>
			<div className='w-full max-w-6xl mx-auto gap-2'>
				<h2 className='text-2xl font-bold text-purple-12'>
					{heading ?? inferredTitle}
				</h2>
				<div className='w-full grid grid-cols-1 items-start justify-center md:grid-cols-2 gap-8'>
					{/** Prix au mois */}
					<PricingList pricingLabel={section.prixAuMois.label} pricingData={section.prixAuMois} />
					{/** Prix au jour */}
					<PricingList pricingLabel={section.prixAuJour.label} pricingData={section.prixAuJour} />
				</div>
			</div>
		</section>
	)
}


{
	/* 
La Nurserie (0 – 24 mois) = aux h2 en dur dans chaque section.
<Composant PricingList label={label injecté depuis les données Sanity controleeur des données (prixAuMois.label)} pricingData={prixAuMois}> = <article>
    <h3>{prixAuMois.label}</h3> == prix au mois venant des données Sanity
    <AccordionRoot type="single" collapsible ...> == accordéon générique avec le mapping des données Sanity (prixAuMois.journeeComplete, prixAuMois.matinee, prixAuMois.apresMidi)
        <AccordionItem value="journeeComplete">
            <AccordionTrigger>{journée complète}</AccordionTrigger>
            <AccordionContent> == tableau générique avec le mapping des données Sanity (prixAuMois)
                <table> == tableau générique avec le mapping des données Sanity (prixAuMois.journeeComplete)
                    <tr>
                        <td>{description}</td>
                        <td>{price}</td>
                    </tr>
                </table>
            </AccordionContent>
        </AccordionItem>
... les autres items comme matinée et après-midi sont identiques à journe complete mais avec les données Sanity (prixAuMois.matinee et prixAuMois.apresMidi)
    </AccordionRoot>
</article>
*/}