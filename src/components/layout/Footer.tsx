import { Partners } from "@/components/shared"
import { Clock, Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-purple-12 text-orange-1">
      <Partners />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo et Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              
              <span className="font-bold">Les P&apos;tits Loups</span>
            </div>
            <p className="text-orange-4 mb-4 leading-relaxed">
              Une garderie familiale où chaque enfant est unique et précieux. 
              Nous accompagnons votre enfant dans ses premiers pas vers l&apos;autonomie 
              et l&apos;épanouissement personnel.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-orange-4 hover:text-purple-surface transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a 
                href="#" 
                className="text-orange-4 hover:text-purple-surface transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-purple-surface mt-0.5 flex-shrink-0" />
                <div className="text-orange-4">
                  <p>Rue de la Garderie 15</p>
                  <p>1000 Lausanne</p>
                  <p>Suisse</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-purple-surface flex-shrink-0" />
                <a 
                  href="tel:+41211234567" 
                  className="text-orange-4 hover:text-orange-2 transition-colors"
                >
                  +41 21 123 45 67
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-purple-surface flex-shrink-0" />
                <a 
                  href="mailto:info@garderielesptitsloups.ch" 
                  className="text-orange-4 hover:text-orange-2 transition-colors"
                >
                  info@garderielesptitsloups.ch
                </a>
              </div>
            </div>
          </div>

          {/* Horaires */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-orange-2">Horaires</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-purple-surface mt-0.5 flex-shrink-0" />
                <div className="text-orange-4">
                  <p className="font-medium text-orange-3">Lundi - Vendredi</p>
                  <p>07h00 - 18h00</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="h-5 w-5 flex-shrink-0"></div>
                <div className="text-orange-4">
                  <p className="font-medium text-orange-3">Samedi</p>
                  <p>Sur demande</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="h-5 w-5 flex-shrink-0"></div>
                <div className="text-orange-4">
                  <p className="font-medium text-orange-3">Dimanche</p>
                  <p>Fermé</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ligne de séparation */}
        <div className="border-t border-orange-10 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-orange-4 text-sm">
              &copy; 2024 Garderie Les P&apos;tits Loups. Tous droits réservés.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a 
                href="#" 
                className="text-orange-4 hover:text-orange-2 text-sm transition-colors"
              >
                Mentions légales
              </a>
              <a 
                href="#" 
                className="text-orange-4 hover:text-orange-2 text-sm transition-colors"
              >
                Politique de confidentialité
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
