// 📂 sanity/types/pages/sanityImage.ts
// 👉 Types pour les images parallaxe depuis Sanity

import type { SanityImage } from '../core/image'

/* Les parallaxes sont les parallaxes de la garderie doivent être typées ici. */

export type ParalaxImageProps = {
	id: string
	image: SanityImage
}

