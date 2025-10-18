// 📂 src/components/pages/sector/LinkedSpacesSection.tsx
// 👉 Section des espaces liés pour les pages secteurs

import type { LinkedSpace } from '@/types/sanity/sectorPage'
import { PortableText } from '@portabletext/react'
import { getHeroImageFillProps } from 'lib/sanity'
import Image from 'next/image'
import Link from 'next/link'

export interface LinkedSpacesSectionProps {
  linkedSpaces: LinkedSpace[]
}

export function LinkedSpacesSection({ linkedSpaces }: LinkedSpacesSectionProps) {
  if (!linkedSpaces || linkedSpaces.length === 0) return null

  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Nos Espaces</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {linkedSpaces.map((space) => (
            <Link
              key={space._id}
              href={`/espaces/${space._id}`}
              className="group relative overflow-hidden rounded-lg border-2 border-border hover:border-primary transition-all duration-300"
            >
              {space.image && (
                <div className="relative h-48 w-full bg-muted">
                  <Image
                    {...getHeroImageFillProps(space.image as never)}
                    alt={space.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {space.title}
                </h3>
                {space.description && (
                  <div className="text-muted-foreground line-clamp-2">
                    <PortableText value={space.description} />
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

