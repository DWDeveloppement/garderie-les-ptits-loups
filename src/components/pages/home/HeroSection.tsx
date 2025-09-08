import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="w-full relative min-h-[80vh] px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16 bg-gradient-to-br from-orange-2 to-purple-1 flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-12 items-center">
          
          {/* Contenu Gauche - Texte et Boutons */}
          <div className="space-y-6 max-w-[60%]">
            <h1 className="text-3xl lg:text-5xl font-bold text-orange-12 leading-tight">
              Bienvenue chez<br />
              <span className="text-purple-9">Les P&apos;tits Loups</span>
            </h1>
            
            <p className="text-lg lg:text-xl text-orange-11 leading-relaxed">
              Un environnement chaleureux et sécurisé où votre enfant peut grandir, 
              apprendre et s&apos;épanouir avec joie dans notre garderie familiale.
            </p>
            
              <Button size="lg" asChild className="bg-purple-9 hover:bg-purple-10 text-purple-contrast">
                <Link href="/contact">
                  Nous contacter
                </Link>
              </Button>

          </div>

          {/* Logo Droite */}
          <div className="flex justify-center lg:justify-end">
            <Image
              src="/logo-les-ptits-loups.webp"
              alt="Logo Garderie Les P'tits Loups"
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
