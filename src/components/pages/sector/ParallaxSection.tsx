// 📂 src/components/pages/sector/ParallaxSection.tsx
// 👉 Section parallaxe pour les pages secteurs

import type { SanityImage } from '@/types/sanity/sectorPage'
import { getHeroImageFillProps } from 'lib/sanity'
import Image from 'next/image'

export interface ParallaxSectionProps {
  image: SanityImage
  alt?: string
}

export function ParallaxSection({ image, alt = "Séparateur visuel" }: ParallaxSectionProps) {
  if (!image) return null

  return (
    <section className="relative w-full h-[40vh] min-h-[300px] bg-muted">
      <Image
        {...getHeroImageFillProps(image as never)}
        alt={alt}
        fill
        className="object-cover"
      />
    </section>
  )
}

