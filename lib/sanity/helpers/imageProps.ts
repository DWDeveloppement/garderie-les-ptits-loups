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
			}
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
