'use client'

import { Calendar, Clock, Users } from 'lucide-react'

export function HorairesSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* En-tête de section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-purple-12 mb-4">
            Nos Horaires d&apos;Ouverture
          </h2>
          <p className="text-lg text-orange-10 max-w-2xl mx-auto">
            Nous accueillons vos enfants dans un environnement sécurisé et bienveillant, 
            avec des horaires adaptés aux besoins des familles.
          </p>
        </div>

        {/* Grille des horaires */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Horaires principaux */}
          <div className="bg-gradient-to-br from-purple-2 to-purple-4 rounded-xl p-8 shadow-lg">
            <div className="flex items-center mb-6">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-9 rounded-lg mr-4">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-purple-12">Horaires Principaux</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-purple-6">
                <span className="font-medium text-purple-11">Lundi - Vendredi</span>
                <span className="text-purple-10 font-semibold">07h00 - 18h00</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-purple-6">
                <span className="font-medium text-purple-11">Samedi</span>
                <span className="text-purple-10 font-semibold">Sur demande</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="font-medium text-purple-11">Dimanche</span>
                <span className="text-purple-10 font-semibold">Fermé</span>
              </div>
            </div>
          </div>

          {/* Groupes d'âge */}
          <div className="bg-gradient-to-br from-orange-2 to-orange-4 rounded-xl p-8 shadow-lg">
            <div className="flex items-center mb-6">
              <div className="flex items-center justify-center w-12 h-12 bg-orange-9 rounded-lg mr-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-orange-12">Groupes d&apos;Âge</h3>
            </div>
            <div className="space-y-4">
              <div className="py-2">
                <h4 className="font-semibold text-orange-11 mb-1">La Nurserie</h4>
                <p className="text-orange-10 text-sm">3 mois - 18 mois</p>
              </div>
              <div className="py-2">
                <h4 className="font-semibold text-orange-11 mb-1">Les Trotteurs</h4>
                <p className="text-orange-10 text-sm">18 mois - 3 ans</p>
              </div>
              <div className="py-2">
                <h4 className="font-semibold text-orange-11 mb-1">Les Grands</h4>
                <p className="text-orange-10 text-sm">3 ans - 6 ans</p>
              </div>
            </div>
          </div>

          {/* Informations pratiques */}
          <div className="bg-gradient-to-br from-purple-3 to-orange-2 rounded-xl p-8 shadow-lg md:col-span-2 lg:col-span-1">
            <div className="flex items-center mb-6">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-9 rounded-lg mr-4">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-purple-12">Informations</h3>
            </div>
            <div className="space-y-4">
              <div className="py-2">
                <h4 className="font-semibold text-purple-11 mb-1">Fermetures</h4>
                <p className="text-purple-10 text-sm">Jours fériés et vacances scolaires</p>
              </div>
              <div className="py-2">
                <h4 className="font-semibold text-purple-11 mb-1">Flexibilité</h4>
                <p className="text-purple-10 text-sm">Horaires adaptés selon vos besoins</p>
              </div>
              <div className="py-2">
                <h4 className="font-semibold text-purple-11 mb-1">Réservation</h4>
                <p className="text-purple-10 text-sm">Inscription possible toute l&apos;année</p>
              </div>
            </div>
          </div>
        </div>

        {/* Note importante */}
        <div className="mt-12 bg-orange-1 rounded-lg p-6 border-l-4 border-orange-9">
          <p className="text-orange-11">
            <strong>Note importante :</strong> Les horaires peuvent être adaptés selon les besoins 
            spécifiques de votre famille. N&apos;hésitez pas à nous contacter pour discuter d&apos;un 
            aménagement personnalisé.
          </p>
        </div>
      </div>
    </section>
  )
}
