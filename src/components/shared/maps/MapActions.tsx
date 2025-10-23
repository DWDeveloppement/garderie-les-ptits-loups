'use client'

import { useMapLocation } from '@/hooks/components/useMaps'
import type { MapLocation } from '@/types/map'
import { Copy, MapPin, Navigation } from 'lucide-react'

type MapActionsProps = {
	location: MapLocation
	className?: string
}

export function MapActions({ location, className = '' }: MapActionsProps) {
	const { urls, copyAddress } = useMapLocation(location)

	return (
		<div className={`flex flex-wrap gap-2 justify-center ${className}`}>
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
	)
}
