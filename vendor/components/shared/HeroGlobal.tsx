"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useScrollParallax } from "@/hooks/components/useScollParalax"
import type { SanityImage } from "@/types/sanity/sectorPage"
import { imageBuilder } from "lib/sanity/client"
import Image from "next/image"
import * as React from "react"

type HeroGlobalProps = {
  title: string
  description?: string
  /** Image URL (string) ou SanityImage (Sanity) */
  imageUrl?: string
  image?: SanityImage
  className?: string
}

export function HeroGlobal({ 
  title,
  description,
  imageUrl,
  image,
  className = ""
}: HeroGlobalProps) {
  // Convertir SanityImage en URL si fourni
  const finalImageUrl = React.useMemo(() => {
    if (imageUrl) return imageUrl
    if (image?.asset) {
      return imageBuilder.image(image.asset).width(1920).quality(85).format('webp').url()
    }
    return "/jardin.webp" // Fallback
  }, [imageUrl, image])
  const { elementRef, imageTransform, textTransform, overlayOpacity } = useScrollParallax({
    speed: 20,
    scale: 0.1,
    textSpeed: -15,
    overlayIntensity: 0.3
  })

  return (
    <section ref={elementRef} className={`relative h-96 overflow-hidden pt-20 ${className}`}>
      {/* Image de fond avec effet parallax */}
      <div 
        className="absolute inset-0 transform"
        style={{ 
          transform: imageTransform,
          transition: 'transform 0.1s ease-out'
        }}
      >
        <Image 
          src={finalImageUrl} 
          alt={image?.alt || title} 
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Overlay semi-transparent */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-orange-12/20 via-orange-12/30 to-orange-12/40"
        style={{ 
          backgroundColor: `rgba(var(--orange-12-rgb), ${overlayOpacity})`,
          transition: 'background-color 0.1s ease-out'
        }}
      />

      {/* Contenu centré */}
      <div className="relative z-10 h-full flex flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 
            className="font-bold text-white mb-6 drop-shadow-lg"
            style={{ 
              transform: textTransform,
              transition: 'transform 0.1s ease-out'
            }}
          >
            {title}
          </h1>
          
          {description && (
            <Card className="max-w-2xl mx-auto bg-white/95 backdrop-blur-sm border-orange-6 shadow-lg">
              <CardContent className="p-6">
                <p className="text-lg text-orange-11 leading-relaxed">
                  {description}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Effet de profondeur */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-orange-12/20 to-transparent" />
    </section>
  )
}
