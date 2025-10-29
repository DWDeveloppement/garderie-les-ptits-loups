"use client"

import { useScrollParallax } from "@/hooks/useScollParalax"
import Image from "next/image"

interface ParalaxImageProps {
  image?: {
    asset?: {
      url?: string
    }
    alt?: string
  }
  imageUrl?: string
  imageAlt?: string
  title?: string
  subtitle?: string
  height?: 'sm' | 'md' | 'lg' | 'xl'
  textPosition?: 'left' | 'center' | 'right'
}

export function ParalaxImage({
  image,
  imageUrl,
  imageAlt,
  title,
  subtitle,
  height = 'lg',
  textPosition = 'center'
}: ParalaxImageProps) {
  // Utilisation du hook personnalisé
  const { elementRef, imageTransform, textTransform, overlayOpacity } = useScrollParallax({
    speed: 20,
    scale: 0.1,
    textSpeed: -15,
    overlayIntensity: 0.3
  })

  // Valeurs par défaut avec fallbacks title et subtitle ne sont pas présents dans les parallaxes images.
  const finalImageUrl = image?.asset?.url || imageUrl || "/paralax.webp"
  const finalImageAlt = image?.alt || imageAlt || "Image de fond de la garderie"
  const finalTitle = title || null
  const finalSubtitle = subtitle || null

  // Classes de hauteur dynamiques
  const heightClasses = {
    sm: 'h-64',
    md: 'h-80',
    lg: 'h-96',
    xl: 'h-[32rem]'
  }

  // Classes de position du texte
  const textPositionClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end'
  }

  return (
    <section ref={elementRef} className={`relative ${heightClasses[height]} overflow-hidden`}>
      {/* Image de fond avec effet parallax au scroll */}
      <div 
        className="absolute inset-0 transform"
        style={{ 
          transform: imageTransform,
          transition: 'transform 0.1s ease-out'
        }}
      >
        <Image 
          src={finalImageUrl} 
          alt={finalImageAlt} 
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Overlay semi-transparent avec opacité dynamique */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-orange-12/20 via-orange-12/30 to-orange-12/40"
        style={{ 
          backgroundColor: `rgba(var(--orange-12-rgb), ${overlayOpacity})`,
          transition: 'background-color 0.1s ease-out'
        }}
      />

      {/* Contenu textuel avec effet de flottement au scroll */}
      <div className={`relative z-10 h-full flex flex-col justify-center px-4 sm:px-6 lg:px-8`}>
        <div 
          className={`max-w-4xl mx-auto ${textPositionClasses[textPosition]}`}
          style={{ 
            transform: textTransform,
            transition: 'transform 0.1s ease-out'
          }}
        >
          <h2 className="font-bold text-white mb-4 drop-shadow-lg">
            {finalTitle}
          </h2>
          <p className="text-orange-1 max-w-2xl leading-relaxed drop-shadow-md">
            {finalSubtitle}
          </p>
        </div>
      </div>

      {/* Effet de profondeur avec ombre portée */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-orange-12/20 to-transparent" />
    </section>
  )
}