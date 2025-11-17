// Exemples des cards, Callouts, BlockQuotes spéciaux avec design de carte
import { Icon } from '@/components/icons/Icon'
import { BlockQuoteCard } from '@/components/shared/BlockQuote'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export function CardSection() {
	return (
		<section className='space-y-6'>
			<h2 className='font-bold'>Exemples de cards</h2>
			<div className='space-y-4'>
				<h3 className='font-semibold'>Cards standards (variants personnalisées)</h3>
				<div className='grid gap-6 md:grid-cols-2'>
					<Card variant='primary' size='lg'>
						<CardHeader>
							<CardTitle className='text-fl-xl font-semibold text-purple-11'>Card variant primary</CardTitle>
							<CardDescription className='text-fl-base'>
								Cette variante utilise la palette purple (neutral du projet) avec un focus ring harmonisé.
							</CardDescription>
						</CardHeader>
						<CardContent className='space-y-3 text-fl-base'>
							<p>
								Idéal pour les contenus principaux mettant en avant des informations clés. Les interactions restent subtiles grâce aux
								transitions douces et au respect de `prefers-reduced-motion`.
							</p>
							<Separator />
							<p className='text-sm text-muted-foreground'>
								La configuration `interactive` ajoute les états focus/hover inspirés de Shadcn sans casser l’accessibilité.
							</p>
						</CardContent>
						<CardFooter className='flex gap-3 justify-end'>
							<Button variant='outline'>En savoir plus</Button>
							<Button>Action principale</Button>
						</CardFooter>
					</Card>

					<Card variant='secondary' size='lg' interactive>
						<CardHeader>
							<CardTitle className='text-fl-xl font-semibold text-orange-11'>Card variant secondary</CardTitle>
							<CardDescription className='text-fl-base'>
								Palette orange (couleur neutre du projet) pour les contenus complémentaires ou contextuels.
							</CardDescription>
						</CardHeader>
						<CardContent className='space-y-3 text-fl-base'>
							<p>
								Activez la prop <code>interactive</code> pour transformer la card en élément cliquable : ombre accentuée, légère mise à
								l’échelle, et focus ring cohérent avec les boutons Shadcn.
							</p>
							<p className='text-sm text-muted-foreground'>
								Idéal pour des listes de ressources, témoignages, ou call-to-action secondaires.
							</p>
						</CardContent>
						<CardFooter className='justify-between items-center gap-3'>
							<span className='text-sm font-medium text-orange-10'>Version interactive</span>
							<Button variant='ghost' className='font-semibold'>
								Explorer
							</Button>
						</CardFooter>
					</Card>
				</div>
			</div>

			<div className='space-y-4'>
				<h3 className='font-semibold'>BlockQuote Card (design spécial)</h3>
				<p className='text-sm text-muted-foreground'>
					Ces cartes utilisent le composant partagé `BlockQuoteCard`, réutilisable dans le rich-text Sanity ou directement côté front.
				</p>
				<div className='grid gap-6 md:grid-cols-2'>
					<BlockQuoteCard
						content={
							<p>
								“Créer un environnement chaleureux, c’est offrir aux enfants la liberté d’explorer, de rire et d’apprendre à leur rythme.”
							</p>
						}
						author='— Équipe pédagogique'
					/>
					<BlockQuoteCard
						variant='secondary'
						content={<p>“La curiosité est une étincelle précieuse. Accompagnons-la avec confiance, patience et beaucoup de sourires.”</p>}
						author='— Direction de la garderie'
						icon={<Icon name='star' size='lg' className='h-16 w-16 p-4 rounded-full border-4 text-orange-9 bg-orange-2 border-orange-9' />}
					/>
				</div>
			</div>
		</section>
	)
}
