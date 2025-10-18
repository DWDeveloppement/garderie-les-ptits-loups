import { HeroGlobal } from "@/components/shared"
import type { SanityImage } from "@/types/sanity/sectorPage"

type HeroContactSectionProps = {
  title?: string
  description?: string
  image?: SanityImage
}

export function HeroContactSection({
  title = 'Contactez-nous',
  description = 'Nous sommes à votre entière disposition pour répondre à toutes vos questions.',
  image
}: HeroContactSectionProps) {
  return (
    <HeroGlobal 
      title={title} 
      description={description} 
      image={image} 
    />
  )
}
