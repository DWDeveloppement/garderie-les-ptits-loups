// components/ContactDirections.tsx
"use client"
import { Copy, MapPin, Navigation } from 'lucide-react'
import * as React from 'react'

type Props = {
	label?: string
	addressText?: string // affiché sous l'adresse (optionnel)
	lat?: number
	lng?: number
}

const DEFAULT_LABEL = "Garderie Les P'tits Loups"
const DEFAULT_LAT = 46.54218875812898
const DEFAULT_LNG = 6.636677785727682

export default function ContactDirections({ label = DEFAULT_LABEL, addressText = '—', lat = DEFAULT_LAT, lng = DEFAULT_LNG }: Props) {
	const encodedLabel = encodeURIComponent(label)

	// Liens directs universels (ouvrent l'app si dispo, sinon le web)
	const appleMapsDir = `https://maps.apple.com/?daddr=${lat},${lng}&q=${encodedLabel}&dirflg=d`
	const googleMapsDir = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&destination_place_id=&travelmode=driving`

	// Schéma natif Google Maps iOS (si installé)
	const gmapsIOS = `comgooglemaps://?daddr=${lat},${lng}&directionsmode=driving`

	// Click handler “intelligent”
	const openSmartDirections = React.useCallback(() => {
		const ua = navigator.userAgent || ''
		const isIOS = /iPad|iPhone|iPod/.test(ua)
		const isAndroid = /Android/.test(ua)

		if (isIOS) {
			// Tente l’app Google Maps si installée, sinon Apple Plans
			const t = setTimeout(() => {
				window.location.href = appleMapsDir
			}, 350)
			window.location.href = gmapsIOS
			// sécurité : clear si l’utilisateur part sur l’app Google
			setTimeout(() => clearTimeout(t), 2000)
		} else if (isAndroid) {
			// Google Maps quasi universel sur Android
			window.location.href = googleMapsDir
		} else {
			// Desktop / autres
			window.open(googleMapsDir, '_blank', 'noopener,noreferrer')
		}
	}, [appleMapsDir, googleMapsDir, gmapsIOS])

	const copyAddress = async () => {
		try {
			await navigator.clipboard.writeText(`${label}${addressText ? `, ${addressText}` : ''}`)
		} catch {}
	}

	return (
		<section aria-labelledby='contact-location' className='relative'>
			{/* Section adresse */}
			<h2 id='contact-location' className='sr-only'>
				Localisation
			</h2>

			<address className='not-italic grid gap-2 rounded-2xl border p-4'>
				<div className='flex items-start gap-3'>
					<MapPin className='size-5 shrink-0 mt-0.5' aria-hidden />
					<div className='grid'>
						<span className='font-medium'>{label}</span>
						{addressText && <span className='text-sm opacity-80'>{addressText}</span>}
					</div>
				</div>

				{/* Liens directs sous l’adresse */}
				<div className='mt-1 flex flex-wrap gap-2'>
					<a
						href={appleMapsDir}
						target='_blank'
						rel='noopener noreferrer'
						className='inline-flex items-center gap-2 rounded-xl border px-3 py-2'
						aria-label="Ouvrir l'itinéraire dans Apple Plans">
						<Navigation className='size-4' aria-hidden />
						Ouvrir dans Plans
					</a>
					<a
						href={googleMapsDir}
						target='_blank'
						rel='noopener noreferrer'
						className='inline-flex items-center gap-2 rounded-xl border px-3 py-2'
						aria-label="Ouvrir l'itinéraire dans Google Maps">
						<MapPin className='size-4' aria-hidden />
						Ouvrir dans Google Maps
					</a>
					<button
						type='button'
						onClick={copyAddress}
						className='inline-flex items-center gap-2 rounded-xl border px-3 py-2'
						aria-label='Copier l’adresse'>
						<Copy className='size-4' aria-hidden />
						Copier l’adresse
					</button>
				</div>
			</address>

			{/* Bottom bar mobile (Radix non requis ; primitives compatibles) */}
			<div className='fixed inset-x-0 bottom-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/70 md:hidden'>
				<div className='mx-auto flex max-w-screen-sm items-center justify-between gap-3 p-3'>
					<span className='truncate text-sm opacity-80'>{label}</span>
					<button
						type='button'
						onClick={openSmartDirections}
						className='inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-base font-medium shadow border'
						aria-label='Itinéraire'>
						<Navigation className='size-4' aria-hidden />
						Itinéraire
					</button>
				</div>
			</div>
		</section>
	)
}
