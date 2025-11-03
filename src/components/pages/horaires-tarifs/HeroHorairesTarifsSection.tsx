'use client'

import { HeroGlobal } from '@/components/shared'
import type { SanityImage } from "@/types/sanity/sectorPage"

type HeroHorairesTarifsSectionProps = {
  title?: string
  description?: string
  image?: SanityImage
}

export function HeroHorairesTarifsSection({
  title = 'Horaires & Tarifs',
  description = 'Découvrez nos horaires et tarifs de nos différents services de garde.',
  image
}: HeroHorairesTarifsSectionProps) {
  return (
    <HeroGlobal 
      title={title} 
      description={description} 
      imageUrl={image?.asset?.url} 
    />
  )
}
