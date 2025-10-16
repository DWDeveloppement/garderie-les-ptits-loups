/**
 * Helper pour transformer les images Sanity en props Next.js Image
 * Prépare les données côté serveur pour injection frontend
 */

type SanityImageAsset = {
	_id: string
	url: string
	metadata: {
		dimensions: {
			width: number
			height: number
			aspectRatio: number
		}
		lqip?: string
		blurhash?: string
	}
}

type SanityBasicImage = {
	asset: SanityImageAsset
	alt: string
	enableOptions?: boolean
	credit?: string
	enableCustomTooltip?: boolean
	tooltipText?: string
}

type SanitySeoImage = {
	asset: SanityImageAsset
	alt: string
	advancedOptions?: {
		title?: string
		credits?: string
		keywords?: string[]
	}
}

type SanityHeroImage = {
	image: SanityBasicImage
	description?: string
}

type SanityGalleryImage = {
	image: SanityBasicImage
	label: string
}

export type NextImageProps = {
	src: string
	alt: string
	width: number
	height: number
	title?: string
	credit?: string
	blurDataURL?: string
	placeholder?: 'blur' | 'empty'
}

export type NextImagePropsWithPriority = NextImageProps & {
	priority?: boolean
	quality?: number
	sizes?: string
	loading?: 'lazy' | 'eager'
}

/**
 * Convertit basicImage Sanity → props Next.js Image
 */
export function getBasicImageProps(image: SanityBasicImage): NextImageProps {
	const { asset, alt, credit, enableCustomTooltip, tooltipText } = image

	return {
		src: asset.url,
		alt: alt,
		width: asset.metadata.dimensions.width,
		height: asset.metadata.dimensions.height,
		// Logique infobulle: si activé, utilise tooltipText || alt, sinon undefined
		title: enableCustomTooltip ? tooltipText?.trim() || alt : undefined,
		credit: credit || "Garderie Les P'tits Loups",
		blurDataURL: asset.metadata?.lqip,
		placeholder: asset.metadata?.lqip ? 'blur' : 'empty',
	}
}

/**
 * Props optimisées pour images Hero (above the fold)
 */
export function getHeroImagePropsOptimized(image: SanityBasicImage): NextImagePropsWithPriority {
	const baseProps = getBasicImageProps(image)

	return {
		...baseProps,
		priority: true, // Preload (above the fold)
		quality: 90, // Haute qualité pour hero
		sizes: '100vw', // Full width
		loading: 'eager', // Chargement immédiat
	}
}

/**
 * Props optimisées pour images Gallery (below the fold)
 */
export function getGalleryImagePropsOptimized(item: SanityGalleryImage): NextImagePropsWithPriority & { label: string } {
	const baseProps = getBasicImageProps(item.image)

	return {
		...baseProps,
		label: item.label,
		priority: false, // Pas de preload
		loading: 'lazy', // Lazy loading (below fold)
		quality: 85, // Qualité légèrement réduite
		sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
	}
}

/**
 * Convertit seoImage Sanity → props Next.js Image
 */
export function getSeoImageProps(image: SanitySeoImage): NextImageProps {
	const { asset, alt, advancedOptions } = image

	return {
		src: asset.url,
		alt: alt,
		width: asset.metadata.dimensions.width,
		height: asset.metadata.dimensions.height,
		title: advancedOptions?.title || undefined,
		credit: advancedOptions?.credits || "Garderie Les P'tits Loups",
	}
}

/**
 * Convertit heroImage Sanity → props Next.js Image + description
 */
export function getHeroImageProps(heroImage: SanityHeroImage) {
	return {
		imageProps: getBasicImageProps(heroImage.image),
		description: heroImage.description || '',
	}
}

/**
 * Convertit galleryImage Sanity → props Next.js Image + label
 */
export function getGalleryImageProps(item: SanityGalleryImage) {
	return {
		imageProps: getBasicImageProps(item.image),
		label: item.label,
	}
}

/**
 * Convertit shareImage Sanity → props Next.js Image pour Open Graph et Twitter
 * Dimensions optimisées automatiquement
 */
export function getSeoShareImageProps(image: SanityBasicImage) {
	const baseProps = getBasicImageProps(image)
	return {
		openGraph: {
			...baseProps,
			width: 1200,
			height: 630, // Format recommandé Facebook, LinkedIn
		},
		twitter: {
			...baseProps,
			width: 1200,
			height: 630, // Format summary_large_image (compatible avec OG)
		},
	}
}

/**
 * Query fragment GROQ pour récupérer les métadonnées d'image
 * Inclut dimensions + LQIP pour Zero CLS
 */
export const IMAGE_QUERY_FRAGMENT = `
	asset->{
		_id,
		url,
		metadata{
			dimensions{
				width,
				height,
				aspectRatio
			},
			lqip,
			blurhash
		}
	}
`

/**
 * Query fragment pour basicImage complet
 */
export const BASIC_IMAGE_QUERY = `{
	${IMAGE_QUERY_FRAGMENT},
	alt,
	enableOptions,
	credit,
	enableCustomTooltip,
	tooltipText
}`

/**
 * Query fragment pour heroImage complet
 */
export const HERO_IMAGE_QUERY = `{
	image${BASIC_IMAGE_QUERY},
	description
}`

/**
 * Query fragment pour galleryImage complet
 */
export const GALLERY_IMAGE_QUERY = `{
	image${BASIC_IMAGE_QUERY},
	label
}`

/**
 * Query fragment pour seoImage complet (legacy)
 */
export const SEO_IMAGE_QUERY = `{
	${IMAGE_QUERY_FRAGMENT},
	alt,
	advancedOptions{
		title,
		credits,
		keywords
	}
}`
