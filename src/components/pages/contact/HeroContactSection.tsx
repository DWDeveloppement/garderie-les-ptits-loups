import { HeroGlobal } from "@/components/HeroGlobal"

type HeroAboutSectionProps = {
  title?: string
  description?: string
  imageUrl?: string
}

export function HeroContactSection({
	title = 'Contactez-nous',
	description = 'Nous sommes à votre entière disposition pour répondre à toutes vos questions.',
	imageUrl = '/jardin.webp',
}: HeroAboutSectionProps) {
	return <HeroGlobal title={title} description={description} imageUrl={imageUrl} />
}
