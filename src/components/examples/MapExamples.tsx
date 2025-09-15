'use client'

import { DynamicMap } from '@/components/shared/DynamicMap'
import { StaticMap } from '@/components/shared/StaticMap'
import type { MapLocation } from '@/types/map'

// Exemple de localisation pour la démonstration
const exampleLocation: MapLocation = {
  name: "Garderie Les P'tits Loups",
  address: "123 Rue de la Paix",
  postalCode: "1000",
  city: "Lausanne",
  country: "Suisse",
  lat: 46.54218875812898,
  lng: 6.636677785727682
}

export function MapExamples() {
  return (
    <div className="space-y-12 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-12">
        Exemples de Composants de Carte
      </h1>
      
      {/* Carte Statique */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-11">
          Carte Statique (StaticMap)
        </h2>
        <p className="text-gray-9">
          Carte statique avec image. Idéale pour les performances et le SEO.
        </p>
        <StaticMap 
          location={exampleLocation}
          height={300}
          zoom={15}
          mapType="roadmap"
          style="default"
        />
      </section>

      {/* Carte Dynamique */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-11">
          Carte Dynamique (DynamicMap)
        </h2>
        <p className="text-gray-9">
          Carte interactive avec Leaflet. Idéale pour l&apos;expérience utilisateur.
        </p>
        <DynamicMap 
          location={exampleLocation}
          height={300}
          zoom={15}
          showMarker={true}
          showControls={true}
          interactive={true}
        />
      </section>

      {/* Comparaison des styles */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-11">
          Comparaison des Styles (StaticMap)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <h3 className="font-medium text-gray-10">Style par défaut</h3>
            <StaticMap 
              location={exampleLocation}
              height={200}
              zoom={15}
              style="default"
            />
          </div>
          <div className="space-y-2">
            <h3 className="font-medium text-gray-10">Style clair</h3>
            <StaticMap 
              location={exampleLocation}
              height={200}
              zoom={15}
              style="light"
            />
          </div>
          <div className="space-y-2">
            <h3 className="font-medium text-gray-10">Style sombre</h3>
            <StaticMap 
              location={exampleLocation}
              height={200}
              zoom={15}
              style="dark"
            />
          </div>
        </div>
      </section>

      {/* Comparaison des types de carte */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-11">
          Comparaison des Types de Carte (StaticMap)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h3 className="font-medium text-gray-10">Vue routière</h3>
            <StaticMap 
              location={exampleLocation}
              height={200}
              zoom={15}
              mapType="roadmap"
            />
          </div>
          <div className="space-y-2">
            <h3 className="font-medium text-gray-10">Vue satellite</h3>
            <StaticMap 
              location={exampleLocation}
              height={200}
              zoom={15}
              mapType="satellite"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
