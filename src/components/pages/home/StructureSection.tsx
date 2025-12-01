import { AnimateOnce } from '@/components/animate-once'
import { IconName } from '@/components/icons'
import { Icon } from '@/components/icons/Icon'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import type { LinkedSector } from '@/sanity/types/pages/home'
import { getSectorIconByTitle } from '@/utils/sectorIcons'
import { TransitionLink } from '@/components/transition-link'

type StructureSectionProps = {
	sectionStructure: {
		title?: string
		description?: string
		linkedSectors: LinkedSector[]
	}
}

export function StructureSection({ sectionStructure }: StructureSectionProps) {
	// Utiliser les données Sanity si disponibles, sinon fallback sur données statiques
	const displaySectors =
		sectionStructure?.linkedSectors && sectionStructure?.linkedSectors.length > 0
			? sectionStructure?.linkedSectors.map((sector) => ({
					id: sector.slug || sector._id, // Utiliser _id comme fallback si slug est null
					title: sector.title,
					ageRange: sector.ageRange,
					description: sector.sectionHero.description,
					icon: getSectorIconByTitle(sector.title),
				}))
			: null

	return (
		<section id='structure' className='py-16 px-8 md:px-16 gradient-section-a'>
			<div className='max-w-7xl mx-auto'>
				<div className='text-center mb-16'>
					<h2 className='font-bold mb-8'>{sectionStructure?.title}</h2>
					<p className='max-w-3xl mx-auto'>{sectionStructure?.description}</p>
				</div>

				<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12'>
					{displaySectors &&
						displaySectors.map((structure, index) => (
							<AnimateOnce key={structure.id} animation='slide-up' speed='slow' staggerIndex={index} className='h-full'>
								<TransitionLink
									href={`/la-structure/${structure.id}`}
									className='group flex h-full focus-visible:outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:rounded-lg'>
									<Card
										role='article'
										variant='secondary'
										size='lg'
										className='flex flex-col justify-start items-center h-full group-focus-within:border-ring transition-colors'
										interactive>
										<CardHeader className='!p-0 w-full flex flex-col justify-start items-center gap-4'>
											<Avatar className='w-24 h-24 group-hover:scale-105 transition-all duration-300'>
												<AvatarFallback className='text-purple-9 bg-transparent'>
													<Icon name={structure.icon as IconName} size='avatar' />
												</AvatarFallback>
											</Avatar>
											<CardTitle className='group-hover:transition-colors'>
												<h3 className='text-fl-lg font-bold'>{structure.title}</h3>
											</CardTitle>
											<CardDescription className='mb-2 font-medium text-fl-base'>
												<p className='text-fl-lg font-bold text-orange-11'>{structure.ageRange}</p>
											</CardDescription>
										</CardHeader>

										<CardContent className='!p-0 px-6 space-y-4 flex-1'>
											<p className='leading-relaxed text-center'>{structure.description}</p>
										</CardContent>

										<CardFooter className='!p-0 w-full h-16 flex justify-center items-end'>
											<Button
												variant='default'
												asDecorative
												size='xl'
												className='!text-primary-foreground font-medium group-hover:bg-primary/90 transition-colors text-fl-base'>
												<span>Voir le secteur</span>
												<Icon name='arrowRight' size='md' className='h-4 w-4 ml-2 transition-transform group-hover:translate-x-1' />
											</Button>
										</CardFooter>
									</Card>
								</TransitionLink>
							</AnimateOnce>
						))}
				</div>
			</div>
		</section>
	)
}
