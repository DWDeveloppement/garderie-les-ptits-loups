import { spaces } from "@/data/spaces"
import Image from "next/image"

export function SpacesSection() {
  return (
    <section id="espaces" className="py-16 px-4 sm:px-6 lg:px-8 bg-orange-bg-light">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-orange-12 mb-4">
            Nos autres espaces
          </h2>
          <p className="text-xl text-orange-11 max-w-3xl mx-auto">
            Des environnements spécialement conçus pour stimuler l&apos;éveil, 
            la créativité et le bien-être de votre enfant.
          </p>
        </div>

        <div className="flex flex-col gap-16">
          {spaces.map((space, index) => {
            const isEven = index % 2 === 0
            
            return (
              <article
                key={space.id}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start"
              >
                {/* Image - occupe 1/3, position change selon pair/impair */}
                <div className={`order-1 lg:col-span-1 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
                    <Image 
                      src={space.imageUrl} 
                      alt={space.title} 
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                </div>

                {/* Contenu - occupe 2/3, position change selon pair/impair */}
                <div className={`order-2 lg:col-span-2 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="space-y-4">
                    <h3 className="text-2xl lg:text-3xl font-bold text-orange-12 mb-4">
                      {space.title}
                    </h3>
                    <p className="text-lg text-orange-11 leading-relaxed">
                      {space.description}
                    </p>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  );
}
