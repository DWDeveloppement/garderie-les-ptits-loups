'use client'
//Suivant la complexité du useMobile pour la détection de mobile, soit on fait le conditional rendering dans ce fichier directement soit par le TablePricingResponsive.tsx
import { MapPin } from 'lucide-react'

export function SubventionsSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* En-tête de section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-purple-12 mb-4">
            Subventions & Aide Financière
          </h2>
          <p className="text-lg text-orange-10 max-w-2xl mx-auto">
            Des solutions financières existent pour vous aider à offrir à votre enfant 
            un accueil de qualité. Découvrez les aides disponibles.
          </p>
        </div>

        {/* Subvention Mont-sur-Lausanne */}
        <div className="bg-gradient-to-br from-purple-2 to-purple-4 rounded-xl p-8 shadow-lg mb-12">
          <div className="flex items-center mb-6">
            <div className="flex items-center justify-center w-12 h-12 bg-purple-9 rounded-lg mr-4">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-purple-12">Subvention Communale</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            TablePriceResponsive component
            <div>
              <h4 className="text-lg font-semibold text-purple-11 mb-4">Mont-sur-Lausanne</h4>
              <div className="space-y-4">
                <div className="bg-white/50 rounded-lg p-4">
                  <h5 className="font-medium text-purple-11 mb-2">Conditions d&apos;éligibilité</h5>
                  <ul className="text-purple-10 text-sm space-y-1">
                    <li>• Résidence principale à Mont-sur-Lausanne</li>
                    <li>• Enfant âgé de 3 mois à 6 ans</li>
                    <li>• Parents actifs professionnellement</li>
                    <li>• Revenus dans les limites fixées</li>
                  </ul>
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <h5 className="font-medium text-purple-11 mb-2">Montant de l&apos;aide</h5>
                  <p className="text-purple-10 text-sm">
                    Jusqu&apos;à <strong>CHF 15 par jour</strong> selon les revenus et la composition familiale.
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-purple-11 mb-4">Procédure</h4>
              <div className="space-y-4">
                <div className="bg-white/50 rounded-lg p-4">
                  <h5 className="font-medium text-purple-11 mb-2">1. Demande</h5>
                  <p className="text-purple-10 text-sm">
                    Remplir le formulaire de demande disponible sur le site de la commune.
                  </p>
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <h5 className="font-medium text-purple-11 mb-2">2. Documents</h5>
                  <p className="text-purple-10 text-sm">
                    Attestation de domicile, fiches de salaire, contrat de garde.
                  </p>
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <h5 className="font-medium text-purple-11 mb-2">3. Décision</h5>
                  <p className="text-purple-10 text-sm">
                    Réponse sous 30 jours ouvrables.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
