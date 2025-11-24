'use client'

import { Icon } from '@/components/icons/Icon'
import { Button } from '@/ui/button'
import { useMapLocation } from '@/hooks/useMaps'
import type { MapLocation } from '@/types/frontend/map'

type MapActionsProps = {
	location: MapLocation
	className?: string
}

export function MapActions({ location, className = '' }: MapActionsProps) {
	const { urls, copyAddress } = useMapLocation(location)

	return (
		<div className={`flex flex-wrap gap-2 justify-center ${className}`}>
			<Button
				mode="link"
				href={urls.appleMaps}
				variant="primary"
				aria-label="Ouvrir l'itinéraire dans Apple Plans"
				className='inline-flex items-center gap-2'>
				<Icon name='send' />
				Apple Plans
			</Button>

			<Button
				mode="link"
				href={urls.googleMaps}
				variant="primary"
				aria-label="Ouvrir l'itinéraire dans Google Maps"
				className='inline-flex items-center gap-2'>
				<Icon name='mapPin' />
				Google Maps
			</Button>

			<Button onClick={copyAddress} variant="primary" aria-label="Copier l'adresse" className='inline-flex items-center gap-2'>
				<Icon name='copy' />
				Copier
			</Button>
		</div>
	)
}
