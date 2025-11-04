// 📂 src/components/pages/sector/HeroSectorSection.tsx
// 👉 Hero section pour les pages secteurs (wrapper de HeroGlobal)

import { HeroGlobal } from '@/components/shared'
import type { SanityImage } from '@/types/sanity/sectorPage'

export type HeroSectorSectionProps = {
	title: string
	description?: string
	image?: SanityImage
}

/**
 * Hero Section pour les pages secteurs
 * Utilise HeroGlobal pour la cohérence du design
 */
export function HeroSectorSection({ title, description, image }: HeroSectorSectionProps) {
	return <HeroGlobal title={title} description={description} imageUrl={image?.asset?.url} />
}
