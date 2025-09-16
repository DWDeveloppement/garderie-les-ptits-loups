'use client'

import { useMapLocation } from '@/hooks/useMaps'
import type { StaticMapProps } from '@/types/map'
import { Copy, MapPin, Navigation } from 'lucide-react'
import Image from 'next/image'

export function StaticMap({ 
  location, 
  className = '', 
  height = 'auto',  
  ratio = '1920/1080'
}: StaticMapProps) {
  const { urls, copyAddress } = useMapLocation(location)

  return (
		<div className={`space-y-4 w-full max-w-4xl mx-auto ${className}`}>
			{/* Carte statique */}
			<div className='relative rounded-lg overflow-hidden border border-orange-6'>
				<Image
					src='/carte.webp'
					alt={`Carte de ${location.name}`}
					width={1920}
					height={1080}
					className='w-full h-auto object-cover'
					style={{
						height: typeof height === 'number' ? `${height}px` : height,
						aspectRatio: typeof ratio === 'string' ? ratio : '1920/1080',
					}}
					priority
				/>

				{/* Pin personnalisé sur la carte */}
				<div className='absolute top-[45%] left-[52%] transform -translate-x-1/2 -translate-y-1/2'>
					<div className='relative'>
						{/* Pin SVG personnalisé */}
						<svg width='32' height='40' viewBox='0 0 32 40' className='drop-shadow-lg sm:w-8 sm:h-10 w-6 h-8' aria-hidden='true'>
							<path
								d='M16 0C7.163 0 0 7.163 0 16c0 16 16 24 16 24s16-8 16-24c0-8.837-7.163-16-16-16z'
								fill='#8B5CF6'
								stroke='#ffffff'
								strokeWidth='2'
							/>
							<circle cx='16' cy='16' r='8' fill='#ffffff' />
							<circle cx='16' cy='16' r='4' fill='#8B5CF6' />
						</svg>
					</div>
				</div>

				{/* Overlay avec informations */}
				<div className='absolute top-2 left-2 sm:top-4 sm:left-4 bg-orange-1/95 backdrop-blur-sm rounded-lg p-2 sm:p-3 shadow-lg'>
					<div className='flex items-start gap-2'>
						<MapPin className='size-4 text-purple-9 mt-0.5 flex-shrink-0' />
						<div className='text-xs sm:text-sm'>
							<div className='font-medium text-purple-9'>{location.name}</div>
							<div className='text-purple-7'>{location.address}</div>
							<div className='text-purple-7'>
								{location.postalCode} {location.city}
							</div>
						</div>
					</div>
				</div>
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
