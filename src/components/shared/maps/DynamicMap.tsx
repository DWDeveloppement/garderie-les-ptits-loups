'use client'

import { MapSkeleton } from '@/components/lazy/skeletons'
import { Card, CardContent } from '@/ui/card'
import type { MapLocation } from '@/types/frontend/map'
import { MapPin } from 'lucide-react'
import { forwardRef } from 'react'

type DynamicMapProps = {
	location: MapLocation
	className?: string
	height?: string | number
	ratio?: string
	isLoaded?: boolean
	error?: string | null
}

export const DynamicMap = forwardRef<HTMLDivElement, DynamicMapProps>(function DynamicMap(
	{ location, className = '', height = 400, ratio = '16/9', isLoaded = false, error = null },
	ref
) {
	return (
		<Card className={`p-0 max-w-full md:max-w-none ${className}`}>
			{/* Carte dynamique - CardContent pour éviter les problèmes de layout pour le composant Card. Il sera utilisé plus tard pour le contenu de la carte sur le site, pas de solution dans le composant ui card.tsx problèmatique. */}
			{/* Je dois forcer le padding à 0 pour éviter les problèmes de layout pour le composant Card. Il sera utilisé plus tard pour le contenu de la carte sur le site, pas de solution dans le composant ui card.tsx problèmatique. */}
			<CardContent
				className='relative rounded-lg overflow-hidden border border-orange-6 p-0'
				style={{
					width: '100%',
					aspectRatio: ratio,
					minHeight: typeof height === 'number' ? `${height}px` : height,
				}}>
				<div ref={ref} className='absolute inset-0 w-full h-full bg-orange-2' />

				{/* État de chargement */}
				{!isLoaded && !error && <MapSkeleton className='absolute inset-0' />}

				{/* État d'erreur */}
				{error && (
					<div className='absolute inset-0 flex items-center justify-center bg-orange-2/80 backdrop-blur-sm'>
						<div className='flex flex-col items-center gap-2 text-orange-11 text-center p-4'>
							<MapPin className='size-6' />
							<span className='text-fl-sm font-medium'>Impossible de charger la carte</span>
							<span className='text-fl-xs opacity-75'>{error}</span>
						</div>
					</div>
				)}

				{/* Overlay avec informations */}
				{isLoaded && (
					<div className='absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg'>
						<div className='flex items-start gap-2'>
							<MapPin className='size-4 text-purple-9 mt-0.5 flex-shrink-0' />
							<div className='text-fl-sm'>
								<div className='font-medium text-purple-9'>{location.name}</div>
								<div className='text-purple-7'>{location.address}</div>
								<div className='text-purple-7'>
									{location.postalCode} {location.city}
								</div>
							</div>
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	)
})
