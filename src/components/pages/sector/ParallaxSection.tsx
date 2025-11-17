// 📂 src/components/pages/sector/ParallaxSection.tsx
// 👉 Section parallaxe pour les pages secteurs (wrapper de ParalaxImage)

import { ParalaxImage } from '@/components/shared'
import type { SanityImage } from '@/sanity/types/core/image'

export type ParallaxSectionProps = {
	image: SanityImage
	alt?: string
}

export function ParallaxSection({ image, alt }: ParallaxSectionProps) {
	if (!image) return null

	return <ParalaxImage image={image} imageAlt={alt} height='md' />
}
