/**
 * Composant OptimizedImage pour l'affichage optimisé des images Sanity
 * Utilise les standards de qualité et génère automatiquement les variantes
 * Utilise les composants Radix UI (aspect-ratio) et tailwindcss.
 * Migration de aspect-ratio de radix ui vers aspect-ratio de shadcn ui plus tard.
 */

import * as AspectRatio from '@radix-ui/react-aspect-ratio'
import Image from 'next/image'
import { getImagePropsByUsage, type ImageUsage, type SanityImage } from '../../../lib/sanity/image-optimization'

type OptimizedImageProps = {
  image: SanityImage
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
  const altText = alt || image.alt || ''
  
  // Obtenir les props d'image optimisées
  const imageProps = getImagePropsByUsage(image, usage)
  
  // Utiliser la légende fournie ou celle de l'image
  const imageCaption = caption || image.caption || ''
  
  // Utiliser le crédit fourni ou celui de l'image
  const imageCredit = credit || image.credit || ''
  
  return (
    <figure className={`optimized-image optimized-image--${usage} ${className}`}>
      <AspectRatio.Root ratio={imageProps.aspectRatio}>
        <Image
          {...imageProps}
          alt={altText}
          priority={priority}
          fill
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
