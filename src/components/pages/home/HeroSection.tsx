import { Button } from "@/components/ui/button"
import type { SanityImage } from "@/types/sanity/sectorPage"
import { imageBuilder } from "lib/sanity/client"
import Image from "next/image"
import Link from "next/link"
import * as React from "react"

interface HeroSectionProps {
  title?: string
  garderieName?: string
  description?: string
  logo?: SanityImage
  buttonText?: string
  buttonLink?: string
}

export function HeroSection({ 
  title = "Bienvenue chez",
  garderieName = "Les P'tits Loups",
  description = "Un environnement chaleureux et sécurisé où votre enfant peut grandir, apprendre et s'épanouir avec joie dans notre garderie familiale.",
  logo,
  buttonText = "Nous contacter",
  buttonLink = "/contact"
}: HeroSectionProps) {
  // Convertir SanityImage en URL pour le logo (si fourni)
  const logoUrl = React.useMemo(() => {
    if (logo?.asset) {
      return imageBuilder.image(logo.asset).width(800).quality(90).format('webp').url()
    }
    return "/logo-les-ptits-loups.webp" // Fallback
  }, [logo])

  return (
    <section className="w-full relative min-h-[80vh] px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16 bg-gradient-to-br from-orange-2 to-purple-1 flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-12 items-center">
          
          {/* Contenu Gauche - Texte et Boutons */}
          <div className="flex flex-col flex-wrap items-center space-y-6 w-full md:max-w-[60%]">
            <h1 className="text-3xl lg:text-5xl font-bold text-orange-12 leading-tight">
              {title}<br />
              <span className="text-purple-9">{garderieName}</span>
            </h1>
            
            <p className="text-lg lg:text-xl text-orange-11 leading-relaxed">
              {description}
            </p>
            
              <Button size="4" asChild className="bg-purple-9 hover:bg-purple-10 text-purple-contrast">
                <Link href={buttonLink || "/contact"}>
                  {buttonText}
                </Link>
              </Button>

          </div>

          {/* Logo Droite */}
          <div className="flex justify-center lg:justify-end">
            <Image
              src={logoUrl}
              alt={logo?.alt || `Logo Garderie ${garderieName}`}
              width={851}
              height={376}
              className="w-80 h-80 lg:w-96 lg:h-96 object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
