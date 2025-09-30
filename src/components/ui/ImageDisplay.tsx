import Image from 'next/image'

/**
 * Composant d'affichage d'image simple basé sur JSON
 * Utilise Next.js Image pour l'optimisation automatique
 */

type ImageDisplayProps = {
	src: string
	alt: string
	width?: number
	height?: number
	className?: string
	priority?: boolean
	loading?: 'lazy' | 'eager'
	fill?: boolean
	sizes?: string
}

export function ImageDisplay({ 
	src, 
	alt, 
	width, 
	height, 
	className = '', 
	priority = false,
	loading = 'lazy',
	fill = false,
	sizes = '(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw'
}: ImageDisplayProps) {
	if (fill) {
		return (
			<Image
				src={src}
				alt={alt}
				fill
				className={className}
				priority={priority}
				loading={loading}
				sizes={sizes}
			/>
		)
	}

	return (
		<Image
			src={src}
			alt={alt}
			width={width || 800}
			height={height || 600}
			className={className}
			priority={priority}
			loading={loading}
			sizes={sizes}
		/>
	)
}

/**
 * Composants spécialisés par contexte d'usage
 */

export function HeroImage(props: Omit<ImageDisplayProps, 'priority'>) {
	return <ImageDisplay {...props} priority />
}

export function GalleryImage(props: ImageDisplayProps) {
	return <ImageDisplay {...props} />
}

export function SectionImage(props: ImageDisplayProps) {
	return <ImageDisplay {...props} />
}

export function ThumbnailImage(props: ImageDisplayProps) {
	return <ImageDisplay {...props} width={150} height={150} />
}

export function ArticleImage(props: ImageDisplayProps) {
	return <ImageDisplay {...props} />
}
