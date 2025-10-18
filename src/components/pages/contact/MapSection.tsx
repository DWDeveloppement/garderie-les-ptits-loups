'use client'

import { DynamicMap, StaticMap } from '@/components/shared/maps'
import type { MapLocation } from '@/types/map'

// Configuration par défaut pour la garderie
const DEFAULT_LOCATION: MapLocation = {
	name: "Garderie Les P'tits Loups",
	address: '123 Rue de la Paix',
	postalCode: '1000',
	city: 'Lausanne',
	country: 'Suisse',
	lat: 46.541742,
  lng: 6.636635, 
}

type MapSectionProps = {
  location?: MapLocation
  mapType?: 'static' | 'dynamic'
  className?: string
}

export function MapSection({ 
  location = DEFAULT_LOCATION, 
  mapType = 'dynamic',
  className = '' 
}: MapSectionProps) {
  return (
		<section aria-labelledby='contact-location' className={`flex flex-col gap-4 py-16 px-4 sm:px-6 lg:px-8 ${className}`}>
			<h2 id='contact-location' className='text-5xl font-bold text-purple-9'>
				Localisation
			</h2>

			{mapType === 'static' ? (
				<StaticMap location={location} height={400} zoom={15} mapType='roadmap' style='default' />
			) : (
				<DynamicMap location={location} height={400} zoom={17} showMarker={true} showControls={true} interactive={true} zIndex={1} />
			)}
		</section>
	)
}
