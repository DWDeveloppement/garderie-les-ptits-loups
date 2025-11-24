/**
 * Section des autres espaces (Jardin, Cuisine, Bricolage)
 *
 * Les données proviennent de la query du champ linkedOtherSpaces (ligne 40 du schema home.ts de Sanity).
 * Pas besoin de condition de rendu car le champ de la query contient uniquement les espaces souhaités.
 */
import { RichTextRenderer } from '@/components/shared'
import { Card } from '@/ui/card'
import type { LinkedOtherSpace } from '@/types/sanity/pages/home'
import type { PortableTextBlock } from '@/types/sanity/core/portableText'
import Image from 'next/image'

type SpacesSectionProps = {
	spaces?: LinkedOtherSpace[]
	contentComplement?: PortableTextBlock[]
}

export function SpacesSection({ spaces, contentComplement }: SpacesSectionProps) {
	// Pas de données à afficher
	if (!spaces || spaces.length === 0) {
		return null
	}

	return (
		<section id='espaces' className='py-16 px-8 md:px-16 gradient-section-b'>
			<div className='max-w-7xl mx-auto'>
				<div className='text-center mb-16'>
					<h2 className='font-bold mb-8'>Nos autres espaces</h2>
					<p className='max-w-3xl mx-auto'>
						Des environnements spécialement conçus pour stimuler l&apos;éveil, la créativité et le bien-être de votre enfant.
					</p>
				</div>

				<div className='flex flex-col gap-24'>
					{/* Affichage des espaces venant de la query du champ linkedOtherSpaces ligne 40 du schema home.ts de Sanity */}
					{spaces.map((space, index) => {
						const isEven = index % 2 === 0
						const imageUrl = space.image?.asset?.url

						return (
							<article key={space._id} className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start'>
								{/* Image - occupe 1/3, position change selon pair/impair */}
								{imageUrl && (
									<Card
										variant='primary'
										size='lg'
										className={`order-1 lg:col-span-1 ${isEven ? 'lg:order-2' : 'lg:order-1'} relative aspect-video rounded-lg overflow-hidden shadow-lg`}>
										<Image
											src={imageUrl}
											alt={space.image?.alt || space.title}
											fill
											className='object-cover hover:scale-105 transition-transform duration-500'
										/>
									</Card>
								)}

								{/* Contenu - occupe 2/3, position change selon pair/impair */}
								<div className={`order-2 lg:col-span-2 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
									<div className='space-y-4'>
										<h3 className='text-center md:text-left font-bold mb-4 text-balance'>{space.title}</h3>
										{space.description && <RichTextRenderer content={space.description} />}
									</div>
								</div>
							</article>
						)
					})}
				</div>
				{/* Informations complémentaires venant de la query du champ contentComplement ligne 58 du schema home.ts de Sanity pour rendre le rich-text */}
				{contentComplement && (
					<div className='mt-24'>
						<RichTextRenderer content={contentComplement} />
					</div>
				)}
			</div>
		</section>
	)
}
