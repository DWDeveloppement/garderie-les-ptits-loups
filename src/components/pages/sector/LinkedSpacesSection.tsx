// 📂 src/components/pages/sector/LinkedSpacesSection.tsx
// 👉 Section des espaces liés pour les pages secteurs

import { RichTextRenderer } from '@/components/shared'
import { Card } from '@/components/ui/card'
import type { PortableTextBlock } from '@/types/sanity/portableText'
import type { LinkedSpace } from '@/types/sanity/sectorPage'
import Image from 'next/image'

export interface LinkedSpacesSectionProps {
  linkedSpaces?: LinkedSpace[]
  content?: PortableTextBlock[]
}

export function LinkedSpacesSection({ linkedSpaces }: LinkedSpacesSectionProps) {
  if (!linkedSpaces || linkedSpaces.length === 0) return null

  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-bold mb-8 text-center">Nos Espaces</h2>
        
        <div className='flex flex-col gap-16'>
          {linkedSpaces.map((space, index) => {
            const isEven = index % 2 === 0
            const imageUrl = space.image?.asset?.url

            return (
              <article key={space._id} className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start'>
                {/* Image - occupe 1/3, position change selon pair/impair */}
                {imageUrl && (
                      <Card variant="primary" size="lg" className={`order-1 lg:col-span-1 ${isEven ? 'lg:order-2' : 'lg:order-1'} relative aspect-video rounded-lg overflow-hidden shadow-lg`}>
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
                      <h3 className='font-bold mb-4 hover:text-primary transition-colors'>{space.title}</h3>
                    {space.description && (
                      <div className='leading-relaxed'>
                        <RichTextRenderer content={space.description} />
                      </div>
                    )}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

