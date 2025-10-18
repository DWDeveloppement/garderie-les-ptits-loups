// 📂 src/components/pages/sector/HeroSectorSection.tsx
// 👉 Hero section pour les pages secteurs

import type { SanityImage } from '@/types/sanity/sectorPage'
import { getHeroImageFillProps } from 'lib/sanity'
import Image from 'next/image'

export interface HeroSectorSectionProps {
  title: string
  description?: string
  image?: SanityImage
}

export function HeroSectorSection({ title, description, image }: HeroSectorSectionProps) {
  return (
    <section className="relative w-full h-[50vh] min-h-[400px] max-h-[600px] bg-muted">
      {image && (
        <Image
          {...getHeroImageFillProps(image as never)}
          alt={title}
          fill
          className="object-cover"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-white">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          {title}
        </h1>
        {description && (
          <p className="text-lg md:text-xl max-w-2xl">
            {description}
          </p>
        )}
      </div>
    </section>
  )
}

