import { HeroGlobal } from "@/components/shared"
import type { SanityImage } from "@/types/sanity/sectorPage"

type HeroAboutSectionProps = {
  title?: string
  description?: string
  image?: SanityImage
}

export function HeroAboutSection({ 
  title = "Bienvenue à la Garderie Les P'tits Loups",
  description = "Structure privée accueillant des enfants de 2 mois jusqu'à l'entrée à l'école.",
  image
}: HeroAboutSectionProps) {
  return (
    <HeroGlobal 
      title={title}
      description={description}
      image={image}
    />
  )
}
