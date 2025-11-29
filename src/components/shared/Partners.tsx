/**
 * Section des partenaires
 * Les données proviennent de Sanity CMS
 * Composant autonome qui gère sa propre query
 */
import { Card } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { getLayoutData } from 'lib/sanity/queries/shared'
import Image from 'next/image'
import { AnimateGroup } from '../animate-once'
export async function Partners() {
	// Récupération des données de layout (Footer + Partners) depuis Sanity (avec cache React)
	const { partners } = await getLayoutData()

	// Pas de partenaires à afficher
	if (!partners || partners.length === 0) {
		return null
	}

	return (
		<section className='py-16 px-8 md:px-16 gradient-section-b'>
			<div className='max-w-7xl mx-auto'>
				<div className='text-center mb-16'>
					<h2 className='font-bold mb-8'>Nos Partenaires</h2>
					<p className='mx-auto'>
						Nous collaborons avec des institutions de confiance pour offrir le meilleur accompagnement à votre enfant.
					</p>
				</div>

				<AnimateGroup
					animation='slide-up'
					speed='normal'
					easing='smooth'
					threshold={0.2}
					as='div'
					className='grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-12 md:gap-36 max-w-sm sm:max-w-3xl mx-auto'>
					{partners.map((partner) => {
						const imageUrl = partner.logo?.asset?.url
						const imageAlt = partner.logo?.alt || partner.name

						return (
							<a
								key={partner._id}
								href={partner.website}
								target='_blank'
								rel='noopener noreferrer'
								className='self-start group outline-none focus-visible:outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:rounded-lg'
								aria-label={`Visiter le site web de ${partner.name}`}>
								{imageUrl && (
									<Tooltip>
										<TooltipTrigger asChild>
											<Card
												variant='primary'
												size='lg'
												interactive
												className='overflow-hidden cursor-pointer group-focus-within:border-ring transition-colors p-0'>
												<Image
													src={imageUrl}
													alt={imageAlt}
													width={partner.logo?.asset?.metadata?.dimensions?.width || 400}
													height={partner.logo?.asset?.metadata?.dimensions?.height || 300}
													className='w-full h-auto group-hover:scale-105 transition-transform duration-300'
												/>
											</Card>
										</TooltipTrigger>
										<TooltipContent variant='purple' side='bottom' showArrow={true}>
											<p className='m-0 text-fl-sm'>Voir le site web de {partner.name}</p>
										</TooltipContent>
									</Tooltip>
								)}
							</a>
						)
					})}
				</AnimateGroup>
			</div>
		</section>
	)
}
