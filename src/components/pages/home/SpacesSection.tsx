/**
 * Section des autres espaces (Jardin, Cuisine, Bricolage)
 * 
 * Les données proviennent de la query du champ linkedOtherSpaces (ligne 40 du schema home.ts de Sanity).
 * Pas besoin de condition de rendu car le champ de la query contient uniquement les espaces souhaités.
 */
import type { LinkedOtherSpace } from "@/types/queries"
import { PortableText } from "next-sanity"
import Image from "next/image"

interface SpacesSectionProps {
  spaces?: LinkedOtherSpace[]
  contentComplement?: LinkedOtherSpace['description'] // PortableTextBlock[]
}

export function SpacesSection({ spaces, contentComplement }: SpacesSectionProps) {
  // Pas de données à afficher
  if (!spaces || spaces.length === 0) {
    return null
  }

  return (
		<section id='espaces' className='py-16 px-4 sm:px-6 lg:px-8 gradient-section-b'>
			<div className='max-w-7xl mx-auto'>
				<div className='text-center mb-16'>
					<h2 className='font-bold mb-4'>Nos autres espaces</h2>
					<p className='max-w-3xl mx-auto'>
						Des environnements spécialement conçus pour stimuler l&apos;éveil, la créativité et le bien-être de votre enfant.
					</p>
				</div>

        <div className='flex flex-col gap-16'>
          {/* Affichage des espaces venant de la query du champ linkedOtherSpaces ligne 40 du schema home.ts de Sanity */}
					{spaces.map((space, index) => {
						const isEven = index % 2 === 0
						const imageUrl = space.image?.asset?.url

						return (
							<article key={space._id} className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start'>
								{/* Image - occupe 1/3, position change selon pair/impair */}
								{imageUrl && (
									<div className={`order-1 lg:col-span-1 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
										<div className='relative aspect-video rounded-lg overflow-hidden shadow-lg'>
											<Image
												src={imageUrl}
												alt={space.image?.alt || space.title}
												fill
												className='object-cover hover:scale-105 transition-transform duration-500'
											/>
										</div>
									</div>
								)}

								{/* Contenu - occupe 2/3, position change selon pair/impair */}
								<div className={`order-2 lg:col-span-2 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
									<div className='space-y-4'>
										<h3 className='font-bold mb-4'>{space.title}</h3>
										{space.description && (
											<div className='leading-relaxed'>
												<PortableText value={space.description} />
											</div>
										)}
									</div>
								</div>
							</article>
						)
					})}
				</div>
				{/* Informations complémentaires venant de la query du champ contentComplement ligne 58 du schema home.ts de Sanity pour rendre le rich-text */}
				{contentComplement && (
					<div className='mt-16'>
						<PortableText value={contentComplement} />
					</div>
				)}
			</div>
		</section>
	)
}
