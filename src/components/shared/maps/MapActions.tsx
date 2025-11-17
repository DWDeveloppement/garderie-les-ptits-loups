'use client'

import { Icon } from '@/components/icons/Icon'
import { Button } from '@/components/ui/button'
import { useMapLocation } from '@/hooks/useMaps'
import type { MapLocation } from '@/types/map'

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
				variant="default"
				ariaLabel="Ouvrir l'itinéraire dans Apple Plans"
				external
				className='inline-flex items-center gap-2'>
				<Icon name="send"/>
				Apple Plans
			</Button>

			<Button
				asLink
				href={urls.googleMaps}
				variant="default"
				ariaLabel="Ouvrir l'itinéraire dans Google Maps"
				external
				className='inline-flex items-center gap-2'>
				<Icon name="mapPin"/>
				Google Maps
			</Button>

			<Button
				onClick={copyAddress}
				variant="default"
				ariaLabel="Copier l'adresse"
				className='inline-flex items-center gap-2'>
				<Icon name="copy"  />
				Copier
			</Button>
		</div>
	)
}
