'use client'

import { Icon } from '@/components/icons/Icon'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useMapLocation } from '@/hooks/useMaps'
import type { MapLocation } from '@/types/map'

// Configuration par défaut pour la garderie
const DEFAULT_LOCATION: MapLocation = {
  name: "Garderie Les P'tits Loups",
  address: "123 Rue de la Paix",
  postalCode: "1000",
  city: "Lausanne",
  country: "Suisse",
  lat: 46.54218875812898,
  lng: 6.636677785727682
}

type BottomBarProps = {
  location?: MapLocation
  phoneNumber?: string
  email?: string
  className?: string
}

export function BottomBar({ 
  location = DEFAULT_LOCATION, 
  phoneNumber = "+41 21 123 45 67",
  email = "contact@garderie-ptits-loups.ch",
  className = '' 
}: BottomBarProps) {
  const { openSmartDirections } = useMapLocation(location)

  return (
		<nav
			aria-label='Actions principales'
			className={`fixed flex items-center justify-between gap-2 py-2 px-8 bottom-0 inset-x-0 z-40 bg-orange-1/95 backdrop-blur supports-[backdrop-filter]:bg-orange-2 ${className}`}>

					<Button
						variant='default'
						size='xl'
						asLink
						href={`tel:${phoneNumber}`}
						ariaLabel={`Appeler ${location.name}`}
						className='group flex flex-col items-center justify-center gap-1 rounded-xl p-4 transition-all active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-9/50'>
						<Icon name='phone' size='xl' aria-hidden />
						<span className='sr-only'>Appeler</span>
					</Button>

					<Separator orientation='vertical'/>

					<Button
						variant='default'
						size='xl'
						asLink
						href={`mailto:${email}`}
						className='group flex flex-col items-center justify-center gap-1 rounded-xl p-4 transition-all active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-9/50'
						ariaLabel={`Écrire un email à ${location.name}`}>
						<Icon name='mail' size='xl' aria-hidden />
						<span className='sr-only'>Écrire un email à {location.name}</span>
					</Button>

					<Separator orientation='vertical'/>

					<Button
						variant='default'
						size='xl'
						onClick={openSmartDirections}
						ariaLabel={`Ouvrir l'itinéraire vers ${location.name}`}
						className='group flex flex-col items-center justify-center gap-1 rounded-xl p-4 transition-all active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-9/50'>
						<Icon name='mapPin' size='xl' aria-hidden />
						<span className='sr-only'>Ouvrir l&apos;itinéraire vers {location.name}</span>
					</Button>
		</nav>
	)
}
