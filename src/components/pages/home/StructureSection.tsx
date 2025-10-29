import { IconName } from '@/components/icons'
import { Icon } from "@/components/icons/Icon"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { structures } from "@/data/structures"
import type { LinkedSector } from "@/types/queries"
import { getSectorIconByTitle } from "@/utils/sectorIcons"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
interface StructureSectionProps {
  sectors?: LinkedSector[]
}

export function StructureSection({ sectors }: StructureSectionProps) {
  // Utiliser les données Sanity si disponibles, sinon fallback sur données statiques
  const displaySectors = sectors && sectors.length > 0 
    ? sectors.map(sector => ({
        id: sector.slug || sector._id, // Utiliser _id comme fallback si slug est null
        title: sector.title,
        ageRange: sector.ageRange,
        description: sector.sectionHero.description,
        icon: getSectorIconByTitle(sector.title),
      }))
    : structures

  return (
    <section id="structure" className="py-16 px-4 sm:px-6 lg:px-8 gradient-section-a">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-bold mb-4">
            Notre Structure
          </h2>
          <p className="max-w-3xl mx-auto">
            Des espaces adaptés à chaque étape du développement de votre enfant, 
            avec un encadrement professionnel et bienveillant.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {displaySectors.map((structure) => {
            return (
							<article key={structure.id} className='group'>
								<Link href={`/${structure.id}`} className='flex h-full' aria-label={`Voir les détails de ${structure.title}`}>
									<Card className='py-6 flex flex-col justify-start items-center h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer'>
										<CardHeader className='flex flex-col justify-start items-center gap-4 w-full'>
											<Avatar className="w-24 h-24 group-hover:scale-105 transition-all duration-300">
												<AvatarFallback className="text-purple-9 bg-transparent">
													<Icon name={structure.icon as IconName} size="avatar" />
												</AvatarFallback>
											</Avatar>
											<CardTitle className='group-hover:transition-colors'>
												<h3>{structure.title}</h3>
											</CardTitle>
                      <CardDescription className='mb-2 font-medium'>
                        <p className="text-2xl font-bold text-orange-11">{structure.ageRange}</p>
                      </CardDescription>
										</CardHeader>

										<CardContent className='px-6 space-y-4 flex-1'>
											<p className='leading-relaxed'>{structure.description}</p>
										</CardContent>

										{/* Indicateur visuel que c'est cliquable */}
										<CardFooter className='w-full h-16 flex justify-center items-end'>
											<Button size="lg" className='flex group-hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer'>
												<span>Voir le secteur</span>
												<ArrowRight className='h-4 w-4 ml-2 transition-transform group-hover:translate-x-1' />
											</Button>
										</CardFooter>
									</Card>
								</Link>
							</article>
						)
          })}
        </div>
      </div>
    </section>
  );
}
