import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { structures } from "@/data/structures"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function StructureSection() {
  return (
    <section id="structure" className="py-16 px-4 sm:px-6 lg:px-8 bg-purple-2">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-orange-12 mb-4">
            Notre Structure
          </h2>
          <p className="text-xl text-orange-11 max-w-3xl mx-auto">
            Des espaces adaptés à chaque étape du développement de votre enfant, 
            avec un encadrement professionnel et bienveillant.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {structures.map((structure) => {
            const IconComponent = structure.icon;
            return (
							<article key={structure.id} className='group'>
								<Link href={`/${structure.id}`} className='block h-full' aria-label={`Voir les détails de ${structure.title}`}>
									<Card className='pb-8 flex flex-col justify-start h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white border-orange-6 hover:border-purple-7 cursor-pointer'>
										<CardHeader className='text-center'>
											<div className='flex justify-center mb-4'>
												<IconComponent className='h-24 w-24 text-purple-9 group-hover:text-purple-10 transition-colors' />
											</div>
											<CardTitle className='text-purple-10 text-2xl group-hover:text-purple-9 transition-colors'>
												{structure.title}
											</CardTitle>
											<CardDescription className='text-purple-9 font-medium text-lg'>{structure.ageRange}</CardDescription>
										</CardHeader>

										<CardContent className='space-y-4 flex-1'>
											<p className='text-orange-11 leading-relaxed'>{structure.description}</p>
										</CardContent>

										{/* Indicateur visuel que c'est cliquable */}
										<CardFooter className=' inline-flex items-center justify-center transition-all duration-300 w-[85%] mx-auto h-12 px-6 py-3 rounded-lg font-medium shadow-sm hover:shadow-md bg-purple-9 group-hover:bg-purple-10 text-purple-contrast border border-purple-6 group-hover:text-purple-contrast group-hover:border-purple-10 group-hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-9 focus:ring-offset-2 cursor-pointer'>
											<span>Voir le secteur</span>
											<ArrowRight className='h-4 w-4 ml-2 transition-transform group-hover:translate-x-1' />
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
