'use client'

import { Separator } from '@/components/ui/separator'
import { useMapLocation } from '@/hooks/useMaps'
import type { MapLocation } from '@/types/map'
import { Mail, MapPin, Phone } from 'lucide-react'

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
      aria-label="Actions principales"
      className={`fixed bottom-0 inset-x-0 z-40 bg-orange-1/95 backdrop-blur supports-[backdrop-filter]:bg-orange-1/70 ${className}`}
    >
      <div className="mx-auto max-w-screen-sm px-2">
        <div className="flex items-center justify-between gap-2 py-2 text-xs">
          <a
            href={`tel:${phoneNumber}`}
            className="group flex flex-col items-center justify-center gap-1 rounded-xl p-2 transition-all active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-9/50"
            aria-label={`Appeler ${location.name}`}
          >
            <Phone className="h-6 w-6 text-orange-11 group-hover:text-purple-9 transition-colors" />
            <span className="leading-none text-orange-11 group-hover:text-purple-9 transition-colors">
              Appeler
            </span>
          </a>
          
          <Separator orientation="vertical" className="h-8 w-px bg-orange-6" />
          
          <a
            href={`mailto:${email}`}
            className="group flex flex-col items-center justify-center gap-1 rounded-xl p-2 transition-all active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-9/50"
            aria-label={`Écrire un email à ${location.name}`}
          >
            <Mail className="h-6 w-6 text-orange-11 group-hover:text-purple-9 transition-colors" />
            <span className="leading-none text-orange-11 group-hover:text-purple-9 transition-colors">
              Écrire
            </span>
          </a>
          
          <Separator orientation="vertical" className="h-8 w-px bg-orange-6" />
          
          <button
            onClick={openSmartDirections}
            className="group flex flex-col items-center justify-center gap-1 w-full rounded-xl p-2 transition-all active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-9/50"
            aria-label={`Ouvrir l'itinéraire vers ${location.name}`}
          >
            <MapPin className="h-6 w-6 text-orange-11 group-hover:text-purple-9 transition-colors" />
            <span className="leading-none text-orange-11 group-hover:text-purple-9 transition-colors">
              Itinéraire
            </span>
          </button>
        </div>
      </div>
    </nav>
  )
}
