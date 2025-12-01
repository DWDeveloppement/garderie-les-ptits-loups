'use client'

import { Icon } from '@/components/icons/Icon'
import { Button } from '@/components/ui/button'
import { useMapLocation } from '@/hooks'
import type { MapLocation } from '@/types/map'
import { useState } from 'react'

type MapActionsProps = {
	location: MapLocation
	className?: string
}

export function MapActions({ location, className = '' }: MapActionsProps) {
	const { urls, copyAddress } = useMapLocation(location)
	const [isCopied, setIsCopied] = useState(false)

	const handleCopyAddress = async () => {
		await copyAddress()
		setIsCopied(true)
		setTimeout(() => setIsCopied(false), 2000)
	}

	return (
		<div className={`flex flex-wrap gap-2 justify-center ${className}`}>
			<Button
				asLink
				href={urls.appleMaps}
				variant='default'
				ariaLabel="Ouvrir l'itinéraire dans Apple Plans"
				external
				className='inline-flex items-center gap-2'>
				<Icon name='send' />
				Apple Plans
			</Button>

			<Button
				asLink
				href={urls.googleMaps}
				variant='default'
				ariaLabel="Ouvrir l'itinéraire dans Google Maps"
				external
				className='inline-flex items-center gap-2'>
				<Icon name='mapPin' />
				Google Maps
			</Button>
			<Button onClick={handleCopyAddress} variant='default' ariaLabel="Copier l'adresse" className='inline-flex items-center gap-2'>
				{isCopied ? <Icon name='success' /> : <Icon name='copy' />}
				{isCopied ? 'Copié !' : 'Copier'}
			</Button>
		</div>
	)
}
