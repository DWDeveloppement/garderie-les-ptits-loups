import { Card } from "@/components/ui/card"
import { partners } from "@/data/partners"
import * as Tooltip from '@radix-ui/react-tooltip'
import Image from "next/image"

export function Partners() {
  return (
    <Tooltip.Provider>
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-orange-2">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-orange-12 mb-4">
              Nos Partenaires
            </h2>
            <p className="text-xl text-orange-11 max-w-3xl mx-auto">
              Nous collaborons avec des institutions de confiance pour offrir 
              le meilleur accompagnement à votre enfant.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-12 md:gap-36 max-w-sm sm:max-w-3xl mx-auto">
            {partners.map((partner) => (
              <Tooltip.Root key={partner.id}>
                <Tooltip.Trigger asChild>
                  <a 
                    href={partner.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block group"
                  >
                    <Card className="rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white border-orange-6 hover:border-purple-7 overflow-hidden cursor-pointer">
                        <Image 
                          src={partner.logo} 
                          alt={partner.name} 
                          width={120} 
                          height={120} 
                          className="group-hover:scale-105 transition-transform duration-300 w-full h-full object-contain" 
                        />
                    </Card>
                  </a>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content 
                    className="bg-purple-9 text-purple-contrast px-3 py-2 rounded-md text-sm shadow-lg"
                    side="bottom" 
                    sideOffset={5}
                  >
                    {partner.tooltip}
                    <Tooltip.Arrow className="fill-purple-9" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            ))}
          </div>
        </div>
      </section>
    </Tooltip.Provider>
  );
}
