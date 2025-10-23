"use client"

import { useScrollParallax } from "@/hooks/components/useScollParalax"
import type { SanityImage } from "@/types/sanity/sectorPage"
import { imageBuilder } from "lib/sanity/client"
import Image from "next/image"
import * as React from "react"

interface ParalaxImageProps {
  image?: SanityImage
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
  imageAlt = "Image de fond de la garderie",
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

  // Convertir SanityImage en URL
  const finalImageUrl = React.useMemo(() => {
    if (imageUrl) return imageUrl
    if (image?.asset) {
      return imageBuilder.image(image.asset).width(1920).quality(85).format('webp').url()
    }
    return "/paralax.webp" // Fallback
  }, [imageUrl, image])

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
          alt={image?.alt || imageAlt} 
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

      {/* Contenu textuel avec effet de flottement au scroll (optionnel) */}
      {(title || subtitle) && (
        <div className={`relative z-10 h-full flex flex-col justify-center px-4 sm:px-6 lg:px-8`}>
          <div 
            className={`max-w-4xl mx-auto ${textPositionClasses[textPosition]}`}
            style={{ 
              transform: textTransform,
              transition: 'transform 0.1s ease-out'
            }}
          >
            {title && (
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg sm:text-xl lg:text-2xl text-orange-1 max-w-2xl leading-relaxed drop-shadow-md">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Effet de profondeur avec ombre portée */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-orange-12/20 to-transparent" />
    </section>
  )
}