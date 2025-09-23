import { IMAGE_STANDARDS } from '../../sanity/config/imageStandards'
import { type SanityImage } from './image-optimization'
import { urlFor } from './image-url'

/**
 * Composant d'affichage d'image optimisée
 * Utilise les dimensions définies par le contexte d'usage
 */

type ImageDisplayProps = {
	image: SanityImage
	usage: keyof typeof IMAGE_STANDARDS
	className?: string
	priority?: boolean
	loading?: 'lazy' | 'eager'
}

export function ImageDisplay({ 
	image, 
	usage, 
	className = '', 
	priority = false,
	loading = 'lazy'
}: ImageDisplayProps) {
	// Récupérer la configuration d'image pour l'usage
	const config = IMAGE_STANDARDS[usage] || IMAGE_STANDARDS.other
	
	// Générer l'URL optimisée
	const imageUrl = urlFor(image)
		.width(config.width)
		.height(config.height)
		.quality(config.quality)
		.format(config.format)
		.url()

	// Générer le srcset responsive
	const srcset = generateSrcset(image, usage)
	
	return (
		<picture className={className}>
			<source
				srcSet={srcset}
				sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
			/>
			<img
				src={imageUrl}
				alt={image.alt || ''}
				width={config.width}
				height={config.height}
				loading={priority ? 'eager' : loading}
				decoding="async"
				className="w-full h-auto object-cover"
			/>
		</picture>
	)
}

/**
 * Génère un srcset responsive pour différentes tailles d'écran
 */
function generateSrcset(image: SanityImage, usage: keyof typeof IMAGE_STANDARDS): string {
	const config = IMAGE_STANDARDS[usage] || IMAGE_STANDARDS.other
	const breakpoints = [640, 768, 1024, 1280, 1536]
	
	return breakpoints
		.map(width => {
			const height = Math.round((width * config.height) / config.width)
			const url = urlFor(image)
				.width(width)
				.height(height)
				.quality(config.quality)
				.format(config.format)
				.url()
			return `${url} ${width}w`
		})
		.join(', ')
}

/**
 * Composants spécialisés par contexte d'usage
 */

export function HeroImage(props: Omit<ImageDisplayProps, 'usage'>) {
	return <ImageDisplay {...props} usage="hero" priority />
}

export function GalleryImage(props: Omit<ImageDisplayProps, 'usage'>) {
	return <ImageDisplay {...props} usage="gallery" />
}

export function SectionImage(props: Omit<ImageDisplayProps, 'usage'>) {
	return <ImageDisplay {...props} usage="section" />
}

export function ThumbnailImage(props: Omit<ImageDisplayProps, 'usage'>) {
	return <ImageDisplay {...props} usage="thumbnail" />
}

export function ArticleImage(props: Omit<ImageDisplayProps, 'usage'>) {
	return <ImageDisplay {...props} usage="article" />
}
