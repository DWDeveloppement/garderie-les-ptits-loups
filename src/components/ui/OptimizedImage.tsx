/**
 * Composant OptimizedImage pour l'affichage optimisé des images JSON
 * Utilise Next.js Image pour l'optimisation automatique
 * Utilise les composants Radix UI (aspect-ratio) et tailwindcss.
 */

import * as AspectRatio from '@radix-ui/react-aspect-ratio'
import Image from 'next/image'

// Types pour les images JSON
type JsonImage = {
  imageUrl: string
  imageAlt: string
  caption?: string
  credit?: string
}

type ImageUsage = 'hero' | 'gallery' | 'section' | 'thumbnail' | 'article' | 'other'

type OptimizedImageProps = {
  image: JsonImage
  usage: ImageUsage
  alt?: string
  caption?: string
  credit?: string
  className?: string
  priority?: boolean
  showCaption?: boolean
  showCredit?: boolean
}

export function OptimizedImage({
  image,
  usage,
  alt,
  caption,
  credit,
  className = '',
  priority = false,
  showCaption = false,
  showCredit = false
}: OptimizedImageProps) {
  // Utiliser l'alt text fourni ou celui de l'image
  const altText = alt || image.imageAlt || ''
  
  // Configuration des dimensions selon l'usage
  const getImageConfig = (usage: ImageUsage) => {
    const configs = {
      hero: { width: 1200, height: 600, aspectRatio: 2 },
      gallery: { width: 800, height: 600, aspectRatio: 4/3 },
      section: { width: 600, height: 400, aspectRatio: 3/2 },
      thumbnail: { width: 300, height: 200, aspectRatio: 3/2 },
      article: { width: 500, height: 300, aspectRatio: 5/3 },
      other: { width: 400, height: 300, aspectRatio: 4/3 }
    }
    return configs[usage] || configs.other
  }
  
  const config = getImageConfig(usage)
  
  // Utiliser la légende fournie ou celle de l'image
  const imageCaption = caption || image.caption || ''
  
  // Utiliser le crédit fourni ou celui de l'image
  const imageCredit = credit || image.credit || ''
  
  return (
    <figure className={`optimized-image optimized-image--${usage} ${className}`}>
      <AspectRatio.Root ratio={config.aspectRatio}>
        <Image
          src={image.imageUrl}
          alt={altText}
          width={config.width}
          height={config.height}
          priority={priority}
          fill
          className="object-cover"
        />
      </AspectRatio.Root>
      
      {/* Légende */}
      {showCaption && imageCaption && (
        <figcaption className="optimized-image__caption">
          {imageCaption}
        </figcaption>
      )}
      
      {/* Crédit */}
      {showCredit && imageCredit && (
        <div className="optimized-image__credit">
          <small>© {imageCredit}</small>
        </div>
      )}
    </figure>
  )
}

/**
 * Composant HeroImage spécialisé
 */
export function HeroImage({
  image,
  alt,
  caption,
  credit,
  className = ''
}: Omit<OptimizedImageProps, 'usage' | 'priority'>) {
  return (
    <OptimizedImage
      image={image}
      usage="hero"
      alt={alt}
      caption={caption}
      credit={credit}
      className={className}
      priority={true}
      showCaption={true}
      showCredit={true}
    />
  )
}

/**
 * Composant GalleryImage spécialisé
 */
export function GalleryImage({
  image,
  alt,
  caption,
  credit,
  className = ''
}: Omit<OptimizedImageProps, 'usage' | 'priority'>) {
  return (
    <OptimizedImage
      image={image}
      usage="gallery"
      alt={alt}
      caption={caption}
      credit={credit}
      className={className}
      priority={false}
      showCaption={true}
      showCredit={true}
    />
  )
}

/**
 * Composant ThumbnailImage spécialisé
 */
export function ThumbnailImage({
  image,
  alt,
  className = ''
}: Omit<OptimizedImageProps, 'usage' | 'priority' | 'caption' | 'credit' | 'showCaption' | 'showCredit'>) {
  return (
    <OptimizedImage
      image={image}
      usage="thumbnail"
      alt={alt}
      className={className}
      priority={false}
      showCaption={false}
      showCredit={false}
    />
  )
}

/**
 * Composant ArticleImage spécialisé
 */
export function ArticleImage({
  image,
  alt,
  caption,
  credit,
  className = ''
}: Omit<OptimizedImageProps, 'usage' | 'priority'>) {
  return (
    <OptimizedImage
      image={image}
      usage="article"
      alt={alt}
      caption={caption}
      credit={credit}
      className={className}
      priority={false}
      showCaption={true}
      showCredit={true}
    />
  )
}

/**
 * Composant SectionImage spécialisé
 */
export function SectionImage({
  image,
  alt,
  caption,
  credit,
  className = ''
}: Omit<OptimizedImageProps, 'usage' | 'priority'>) {
  return (
    <OptimizedImage
      image={image}
      usage="section"
      alt={alt}
      caption={caption}
      credit={credit}
      className={className}
      priority={false}
      showCaption={true}
      showCredit={true}
    />
  )
}
