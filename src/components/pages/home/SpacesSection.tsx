import { linkedOtherSpaces } from "@/data/spaces"
import type { LinkedOtherSpace } from "@/types/queries"
import { imageBuilder } from "lib/sanity/client"
import { PortableText } from "next-sanity"
import Image from "next/image"
import * as React from "react"
{/* Vérifier que les imports des espaces proviennent de la query du champ linkedOtherSpaces ligne 40 du Shema de home.ts de sanity et non du fichier spaces.ts de @/data/spaces.ts car la source de données doit être rendu par Sanity. P.S. pas besoin de condition de rendu car le champ de la query contient uniquement les espaces souhaités, donc rendu simple. Une fois vérifié et ok. il faut supprimer les imports inutiles relatifs à ces espaces provenant de data/spaces.ts et fichiers associés. */}
interface SpacesSectionProps {
  spaces?: LinkedOtherSpace[]
  contentComplement?: LinkedOtherSpace['description'] // PortableTextBlock[]
}

export function SpacesSection({ spaces, contentComplement }: SpacesSectionProps) {
  // Utiliser les données Sanity si disponibles, sinon fallback sur données statiques
  const displaySpaces = React.useMemo(() => {
    if (spaces && spaces.length > 0) {
      return spaces.map(space => ({
        id: space._id,
        title: space.title,
        description: space.description?.[0]?.children?.[0]?.text || '', // Extract text from PortableText
        imageUrl: space.image?.asset 
          ? imageBuilder.image(space.image.asset).width(800).quality(85).format('webp').url()
          : '/paralax.webp'
      }))
    }
    return linkedOtherSpaces
  }, [spaces])

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
          {/* Affichage des espaces venant de la query du champ linkedOtherSpaces ligne 40 du Shema de home.ts de sanity. Voir les instructions ci-dessus. ligne 7 */}
					{displaySpaces.map((space, index) => {
						const isEven = index % 2 === 0

						return (
							<article key={space.id} className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start'>
								{/* Image - occupe 1/3, position change selon pair/impair */}
								<div className={`order-1 lg:col-span-1 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
									<div className='relative aspect-video rounded-lg overflow-hidden shadow-lg'>
										<Image
											src={space.imageUrl}
											alt={space.title}
											fill
											className='object-cover hover:scale-105 transition-transform duration-500'
										/>
									</div>
								</div>

								{/* Contenu - occupe 2/3, position change selon pair/impair */}
								<div className={`order-2 lg:col-span-2 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
									<div className='space-y-4'>
										<h3 className='font-bold mb-4'>{space.title}</h3>
										<p className='leading-relaxed'>{space.description}</p>
									</div>
								</div>
							</article>
						)
					})}
				</div>
				{/* Informations complementaires venant de la query du champ contentComplement ligne 58 du Shema de home.ts de sanity pour rendre le rich-text */}
				{contentComplement && <PortableText value={contentComplement} />}
			</div>
		</section>
	)
}
