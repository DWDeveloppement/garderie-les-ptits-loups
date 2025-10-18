"use client"

import { useScrollParallax } from "@/hooks/useScollParalax"
import Image from "next/image"

// Props futures pour Sanity (seront ajoutées plus tard)
// interface ParalaxImageProps {
//   imageUrl?: string
//   imageAlt?: string
//   title?: string
//   subtitle?: string
//   overlayOpacity?: number
//   height?: 'sm' | 'md' | 'lg' | 'xl'
//   textPosition?: 'left' | 'center' | 'right'
// }

export function ParalaxImage() {
  // Utilisation du hook personnalisé
  const { elementRef, imageTransform, textTransform, overlayOpacity } = useScrollParallax({
    speed: 20,
    scale: 0.1,
    textSpeed: -15,
    overlayIntensity: 0.3
  })

  // Valeurs par défaut (seront remplacées par les props Sanity)
  const imageUrl = "/paralax.webp"
  const imageAlt = "Image de fond de la garderie"
  const title = "Bienvenue chez Les P'tits Loups"
  const subtitle = "Un environnement chaleureux pour l'épanouissement de votre enfant"
  const height = 'lg'
  const textPosition = 'center'

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
          src={imageUrl} 
          alt={imageAlt} 
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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            {title}
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-orange-1 max-w-2xl leading-relaxed drop-shadow-md">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Effet de profondeur avec ombre portée */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-orange-12/20 to-transparent" />
    </section>
  )
}