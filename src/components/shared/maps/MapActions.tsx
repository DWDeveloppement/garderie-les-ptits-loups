'use client'

import { Button } from '@/components/ui/button'
import { useMapLocation } from '@/hooks/useMaps'
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
			<Button
				asLink
				href={urls.appleMaps}
				variant="primary"
				size="md"
				ariaLabel="Ouvrir l'itinéraire dans Apple Plans"
				external
				className='inline-flex items-center gap-2'>
				<Navigation className='size-4' aria-hidden />
				Apple Plans
			</Button>

			<Button
				asLink
				href={urls.googleMaps}
				variant="primary"
				size="md"
				ariaLabel="Ouvrir l'itinéraire dans Google Maps"
				external
				className='inline-flex items-center gap-2'>
				<MapPin className='size-4' aria-hidden />
				Google Maps
			</Button>

			<Button
				onClick={copyAddress}
				variant="primary"
				size="md"
				ariaLabel="Copier l'adresse"
				className='inline-flex items-center gap-2'>
				<Copy className='size-4' aria-hidden />
				Copier
			</Button>
		</div>
	)
}
