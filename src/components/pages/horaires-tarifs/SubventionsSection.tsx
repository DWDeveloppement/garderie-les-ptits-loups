'use client'

import { FileText, MapPin, Phone } from 'lucide-react'

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

        {/* Autres aides financières */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Aide cantonale */}
          <div className="bg-gradient-to-br from-orange-2 to-orange-4 rounded-xl p-8 shadow-lg">
            <div className="flex items-center mb-6">
              <div className="flex items-center justify-center w-12 h-12 bg-orange-9 rounded-lg mr-4">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-orange-12">Aide Cantonale</h3>
            </div>
            <div className="space-y-4">
              <div className="py-2">
                <h4 className="font-semibold text-orange-11 mb-1">Subvention cantonale</h4>
                <p className="text-orange-10 text-sm">Aide financière du canton de Vaud</p>
              </div>
              <div className="py-2">
                <h4 className="font-semibold text-orange-11 mb-1">Conditions</h4>
                <p className="text-orange-10 text-sm">Revenus modestes, famille monoparentale</p>
              </div>
              <div className="py-2">
                <h4 className="font-semibold text-orange-11 mb-1">Montant</h4>
                <p className="text-orange-10 text-sm">Variable selon la situation</p>
              </div>
            </div>
          </div>

          {/* Déductions fiscales */}
          <div className="bg-gradient-to-br from-purple-3 to-orange-2 rounded-xl p-8 shadow-lg">
            <div className="flex items-center mb-6">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-9 rounded-lg mr-4">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-purple-12">Déductions Fiscales</h3>
            </div>
            <div className="space-y-4">
              <div className="py-2">
                <h4 className="font-semibold text-purple-11 mb-1">Déduction garde</h4>
                <p className="text-purple-10 text-sm">Jusqu&apos;à CHF 10&apos;100 par enfant</p>
              </div>
              <div className="py-2">
                <h4 className="font-semibold text-purple-11 mb-1">Conditions</h4>
                <p className="text-purple-10 text-sm">Activité professionnelle des parents</p>
              </div>
              <div className="py-2">
                <h4 className="font-semibold text-purple-11 mb-1">Documentation</h4>
                <p className="text-purple-10 text-sm">Attestation de frais de garde</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact pour informations */}
        <div className="bg-orange-1 rounded-xl p-8 border border-orange-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-purple-12 mb-4">
              Besoin d&apos;aide pour vos démarches ?
            </h3>
            <p className="text-orange-10 mb-6 max-w-2xl mx-auto">
              Notre équipe est là pour vous accompagner dans vos démarches administratives 
              et vous aider à optimiser les aides financières disponibles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+41211234567"
                className="inline-flex items-center justify-center px-6 py-3 bg-purple-9 text-white rounded-lg hover:bg-purple-10 transition-colors"
              >
                <Phone className="w-5 h-5 mr-2" />
                Appeler maintenant
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-purple-9 border border-purple-9 rounded-lg hover:bg-purple-1 transition-colors"
              >
                <FileText className="w-5 h-5 mr-2" />
                Demander un rendez-vous
              </a>
            </div>
          </div>
        </div>

        {/* Note importante */}
        <div className="mt-12 bg-purple-2 rounded-lg p-6 border-l-4 border-purple-9">
          <p className="text-purple-11">
            <strong>Important :</strong> Les conditions et montants des subventions peuvent évoluer. 
            Nous vous recommandons de vérifier les informations les plus récentes auprès des 
            services compétents et de nous contacter pour toute question.
          </p>
        </div>
      </div>
    </section>
  )
}
