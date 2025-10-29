'use client'

import { DynamicMap, StaticMap } from '@/components/shared/maps'
import { MapActions } from '@/components/shared/maps/MapActions'
import { MAP_INFO_DEFAULT } from '@/constants/map_info_default'
import { useDynamicMap } from '@/hooks/useMaps'
import type { MapLocation } from '@/types/map'
import { useEffect, useState } from 'react'

type MapSectionProps = {
  location?: MapLocation
  className?: string
}

export function MapSection({ location = MAP_INFO_DEFAULT, className = '' }: MapSectionProps) {
  const [showStatic, setShowStatic] = useState(false)
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)

  // Hook pour la carte dynamique
  const { mapRef, isLoaded, error } = useDynamicMap({
    location,
    zoom: 17,
    showMarker: true,
    showControls: true,
    interactive: true,
    zIndex: 1,
  })

  // Gestion du fallback vers la carte statique
  useEffect(() => {
    // Timeout pour basculer vers la carte statique si la dynamique ne charge pas
    const timeout = setTimeout(() => {
      if (!isLoaded && !error) {
        console.warn('Carte dynamique ne charge pas, basculement vers la carte statique')
        setShowStatic(true)
      }
    }, 3000) // 3 secondes de timeout

    setTimeoutId(timeout)

    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [isLoaded, error])

  // Si erreur de chargement, basculer vers statique
  useEffect(() => {
    if (error) {
      console.warn('Erreur carte dynamique:', error, 'Basculement vers la carte statique')
      setShowStatic(true)
    }
  }, [error])

  return (
    <section aria-labelledby='contact-location' className={`flex flex-col gap-4 py-16 px-4 sm:px-6 lg:px-8 ${className}`}>
      <h2 id='contact-location' className='text-5xl font-bold text-purple-9'>
        Localisation
      </h2>

      {/* Carte dynamique par défaut avec fallback automatique */}
      {!showStatic ? (
        <DynamicMap 
          location={location} 
          height={400} 
          zoom={17} 
          showMarker={true} 
          showControls={true} 
          interactive={true} 
          zIndex={1}
          onError={() => setShowStatic(true)}
        />
      ) : (
        <StaticMap 
          location={location} 
          height={400} 
          zoom={15} 
          mapType='roadmap' 
          style='default' 
        />
      )}

      {/* Actions de la carte */}
      <MapActions location={location} />
    </section>
  )
}
