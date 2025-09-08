import { HeroGlobal } from "@/components/HeroGlobal"

type HeroAboutSectionProps = {
  title?: string
  description?: string
  imageUrl?: string
}

export function HeroAboutSection({ 
  title = "Bienvenue à la Garderie Les P'tits Loups",
  description = "Structure privée accueillant des enfants de 2 mois jusqu'à l'entrée à l'école. Notre équipe pédagogique propose des activités variées adaptées à chaque âge.",
  imageUrl = "/jardin.webp"
}: HeroAboutSectionProps) {
  return (
    <HeroGlobal 
      title={title}
      description={description}
      imageUrl={imageUrl}
    />
  )
}
