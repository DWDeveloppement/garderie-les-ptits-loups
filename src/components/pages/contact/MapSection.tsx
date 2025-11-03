'use client'

import { DynamicMap, StaticMap } from '@/components/shared/maps'
import { MapActions } from '@/components/shared/maps/MapActions'
import { MAP_INFO_DEFAULT } from '@/constants/map_info_default'
import { useDynamicMap } from '@/hooks/useMaps'
import type { MapLocation } from '@/types/map'
import { useCallback, useEffect, useRef, useState } from 'react'

type MapSectionProps = {
  location?: MapLocation
  className?: string
}

export function MapSection({ location = MAP_INFO_DEFAULT, className = '' }: MapSectionProps) {
  const [showStatic, setShowStatic] = useState(false)
  const mapRef = useRef<HTMLDivElement>(null)

  // Callback stable pour gérer les erreurs
  const handleError = useCallback(() => {
    setShowStatic(true)
  }, [])

  // Hook pour la carte dynamique - toute la logique ici
  const { isLoaded, error } = useDynamicMap({
    location,
    ref: mapRef,
    zoom: 17,
    showMarker: true,
    showControls: true,
    interactive: true,
    zIndex: 1,
    onError: handleError,
  })

  // Gestion du fallback vers la carte statique avec timeout
  useEffect(() => {
    // Si déjà chargé ou erreur, pas besoin de timeout
    if (isLoaded || error) {
      return
    }

    // Timeout pour basculer vers la carte statique si la dynamique ne charge pas
    const timeout = setTimeout(() => {
      if (!isLoaded && !error) {
        console.warn('Carte dynamique ne charge pas après timeout, basculement vers la carte statique')
        setShowStatic(true)
      }
    }, 2000) // 4 secondes de timeout

    return () => {
      clearTimeout(timeout)
    }
  }, [isLoaded, error])

  // Si erreur de chargement, basculer vers statique immédiatement
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
          ref={mapRef}
          isLoaded={isLoaded}
          error={error}
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
