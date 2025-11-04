/**
 * Section des partenaires
 * Les données proviennent de Sanity CMS
 * Composant autonome qui gère sa propre query
 */
import { Card } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { fetchPartners } from 'lib/sanity/queries'
import Image from 'next/image'
export async function Partners() {
	// Récupération des partenaires depuis Sanity
	const partners = await fetchPartners()

	// Pas de partenaires à afficher
	if (!partners || partners.length === 0) {
		return null
	}

	return (
		<section className='py-16 px-4 sm:px-6 lg:px-8 gradiant-section-b'>
			<div className='max-w-7xl mx-auto'>
				<div className='text-center mb-12'>
					<h2 className='font-bold mb-4'>Nos Partenaires</h2>
					<p className='mx-auto'>
						Nous collaborons avec des institutions de confiance pour offrir le meilleur accompagnement à votre enfant.
					</p>
				</div>

				<div className='grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-12 md:gap-36 max-w-sm sm:max-w-3xl mx-auto'>
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
											<p className='text-sm'>Voir le site web de {partner.name}</p>
										</TooltipContent>
									</Tooltip>
								)}
							</a>
						)
					})}
				</div>
			</div>
		</section>
	)
}
