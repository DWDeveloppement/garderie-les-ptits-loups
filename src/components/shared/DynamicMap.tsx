'use client'

import { useDynamicMap, useMapLocation } from '@/hooks/useMaps'
import type { DynamicMapProps } from '@/types/map'
import { Copy, Loader2, MapPin, Navigation } from 'lucide-react'

export function DynamicMap({ 
  location, 
  className = '', 
  height = 'auto', 
  width = '100%',
  zoom = 17,
  showMarker = true,
  showControls = true,
  interactive = true,
  zIndex = 1,
  ratio = '16/9'
}: DynamicMapProps) {
  const { mapRef, isLoaded, error } = useDynamicMap({ 
    location, 
    zoom, 
    showMarker, 
    showControls, 
    interactive,
    zIndex,
    ratio
  })
  const { urls, openSmartDirections, copyAddress } = useMapLocation(location)

  return (
		<div className={`space-y-4 w-full max-w-4xl mx-auto ${className}`}>
			{/* Carte dynamique */}
			{/* Je dois forcer le padding à 0 pour éviter les problèmes de layout pour le composant Card. Il sera utilisé plus tard pour le contenu de la carte sur le site, pas de solution dans le composant ui card.tsx problèmatique. */}
			<div className='relative rounded-lg overflow-hidden border border-orange-6 p-0'>
				<div
					ref={mapRef}
					className='w-full bg-orange-2'
					style={{
						height: typeof height === 'number' ? `${height}px` : height,
						width: typeof width === 'number' ? `${width}px` : width,
						aspectRatio: ratio,
					}}
				/>

				{/* État de chargement */}
				{!isLoaded && !error && (
					<div className='absolute inset-0 flex items-center justify-center bg-orange-2/80 backdrop-blur-sm'>
						<div className='flex flex-col items-center gap-2 text-orange-11'>
							<Loader2 className='size-6 animate-spin' />
							<span className='text-sm'>Chargement de la carte...</span>
						</div>
					</div>
				)}

				{/* État d'erreur */}
				{error && (
					<div className='absolute inset-0 flex items-center justify-center bg-orange-2/80 backdrop-blur-sm'>
						<div className='flex flex-col items-center gap-2 text-orange-11 text-center p-4'>
							<MapPin className='size-6' />
							<span className='text-sm font-medium'>Impossible de charger la carte</span>
							<span className='text-xs opacity-75'>{error}</span>
						</div>
					</div>
				)}

				{/* Overlay avec informations */}
				{isLoaded && (
					<div className='absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg'>
						<div className='flex items-start gap-2'>
							<MapPin className='size-4 text-purple-9 mt-0.5 flex-shrink-0' />
							<div className='text-sm'>
								<div className='font-medium text-gray-9'>{location.name}</div>
								<div className='text-gray-7'>{location.address}</div>
								<div className='text-gray-7'>
									{location.postalCode} {location.city}
								</div>
							</div>
						</div>
					</div>
				)}
			</div>

			{/* Actions */}
			<div className='flex flex-wrap gap-2 justify-center'>
				<a
					href={urls.appleMaps}
					target='_blank'
					rel='noopener noreferrer'
					className='inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium bg-purple-9 hover:bg-purple-10 text-white transition-colors'
					aria-label="Ouvrir l'itinéraire dans Apple Plans">
					<Navigation className='size-4' aria-hidden />
					Apple Plans
				</a>

				<a
					href={urls.googleMaps}
					target='_blank'
					rel='noopener noreferrer'
					className='inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium bg-purple-9 hover:bg-purple-10 text-white transition-colors'
					aria-label="Ouvrir l'itinéraire dans Google Maps">
					<MapPin className='size-4' aria-hidden />
					Google Maps
				</a>

				<button
					type='button'
					onClick={copyAddress}
					className='inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium bg-purple-9 hover:bg-purple-10 text-white transition-colors'
					aria-label="Copier l'adresse">
					<Copy className='size-4' aria-hidden />
					Copier
				</button>
			</div>
		</div>
	)
}
