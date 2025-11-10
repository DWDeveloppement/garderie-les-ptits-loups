import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export function AccordionSection() {
	return (
		<section className='space-y-6'>
			<h2 className='font-bold'>Exemples d&apos;accordéons</h2>
			<p className='text-sm text-muted-foreground max-w-2xl'>
				Le composant `Accordion` s’appuie sur Radix UI. Les classes utilitaires appliquées respectent les focus rings et les animations
				personnalisées configurées dans `globals.css`.
			</p>
			<Accordion type='single' collapsible className='p-4 w-full max-w-3xl rounded-lg border border-border bg-card/50'>
				<AccordionItem value='item-1'>
					<AccordionTrigger className='text-fl-base font-semibold'>Comment fonctionne l’accueil quotidien ?</AccordionTrigger>
					<AccordionContent className='text-fl-base leading-relaxed'>
						Chaque enfant est accueilli par un membre de l’équipe pédagogique. Les routines (vestiaires, transmission des informations,
						activités libres) sont pensées pour rassurer les familles et offrir un cadre chaleureux dès l’arrivée.
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value='item-2'>
					<AccordionTrigger className='text-fl-base font-semibold'>Quelles sont les activités proposées ?</AccordionTrigger>
					<AccordionContent className='text-fl-base leading-relaxed'>
						Nous alternons ateliers moteurs, sensoriels et créatifs en adaptant les contenus selon l’âge. Les temps calmes et la lecture
						accompagnée sont essentiels pour favoriser l’éveil et le langage.
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value='item-3'>
					<AccordionTrigger className='text-fl-base font-semibold'>Comment impliquer les familles ?</AccordionTrigger>
					<AccordionContent className='text-fl-base leading-relaxed'>
						Des réunions trimestrielles et des carnets d’observation partagés permettent de garder un lien constant. Nous utilisons
						également des callouts pour rappeler les événements et les actualités importantes.
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</section>
	)
}
