'use client'

import type { DynamicMapProps, MapLocation, StaticMapProps } from '@/types/map'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

// Hook pour la gestion des directions et adresses
export function useMapLocation(location: MapLocation) {
	// Génération des URLs pour les différentes plateformes
	const urls = useMemo(() => {
		const encodedLabel = encodeURIComponent(location.name)
		const fullAddress = `${location.address}, ${location.postalCode} ${location.city}${location.country ? `, ${location.country}` : ''}`

		return {
			appleMaps: `https://maps.apple.com/?daddr=${location.lat},${location.lng}&q=${encodedLabel}&dirflg=d`,
			googleMaps: `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}&destination_place_id=&travelmode=driving`,
			googleMapsIOS: `comgooglemaps://?daddr=${location.lat},${location.lng}&directionsmode=driving`,
			fullAddress,
		}
	}, [location])

	// Gestionnaire intelligent pour ouvrir les directions
	const openSmartDirections = useCallback(() => {
		const ua = navigator.userAgent || ''
		const isIOS = /iPad|iPhone|iPod/.test(ua)
		const isAndroid = /Android/.test(ua)

		if (isIOS) {
			// Tente l'app Google Maps si installée, sinon Apple Plans
			const timeout = setTimeout(() => {
				window.location.href = urls.appleMaps
			}, 350)
			window.location.href = urls.googleMapsIOS
			// Sécurité : clear si l'utilisateur part sur l'app Google
			setTimeout(() => clearTimeout(timeout), 2000)
		} else if (isAndroid) {
			// Google Maps quasi universel sur Android
			window.location.href = urls.googleMaps
		} else {
			// Desktop / autres
			window.open(urls.googleMaps, '_blank', 'noopener,noreferrer')
		}
	}, [urls])

	// Copier l'adresse dans le presse-papiers
	const copyAddress = useCallback(async () => {
		try {
			await navigator.clipboard.writeText(urls.fullAddress)
		} catch (error) {
			console.warn("Impossible de copier l'adresse:", error)
		}
	}, [urls.fullAddress])

	return {
		urls,
		openSmartDirections,
		copyAddress,
	}
}

// Hook pour les cartes statiques (OpenStreetMap uniquement)
export function useStaticMap({ location, zoom = 15 }: StaticMapProps) {
	// Génération de l'URL pour OpenStreetMap Static API
	const mapUrl = useMemo(() => {
		// Utilisation de OpenStreetMap Static API (gratuite)
		const baseUrl = 'https://staticmap.openstreetmap.de/staticmap.php'
		const params = new URLSearchParams({
			center: `${location.lat},${location.lng}`,
			zoom: zoom.toString(),
			size: '600x400',
			format: 'png',
			markers: `${location.lat},${location.lng},red-pushpin`,
		})

		return `${baseUrl}?${params.toString()}`
	}, [location, zoom])

	// URL de fallback avec tuile OpenStreetMap directe
	const fallbackUrl = useMemo(() => {
		const baseUrl = 'https://tile.openstreetmap.org'
		const z = Math.min(zoom, 18)
		const x = Math.floor(((location.lng + 180) / 360) * Math.pow(2, z))
		const y = Math.floor(
			((1 - Math.log(Math.tan((location.lat * Math.PI) / 180) + 1 / Math.cos((location.lat * Math.PI) / 180)) / Math.PI) / 2) *
				Math.pow(2, z)
		)

		return `${baseUrl}/${z}/${x}/${y}.png`
	}, [location, zoom])

	return {
		mapUrl,
		fallbackUrl,
		alt: `Carte statique de ${location.name}`,
	}
}

// Hook pour les cartes dynamiques
export function useDynamicMap({
	location,
	zoom = 15,
	showMarker = true,
	showControls = true,
	interactive = true,
	zIndex = 1,
}: DynamicMapProps) {
	const mapRef = useRef<HTMLDivElement>(null)
	const [isLoaded, setIsLoaded] = useState(false)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		let map: L.Map | null = null
		let marker: L.Marker | null = null

		const initializeMap = async () => {
			try {
				// Chargement dynamique de Leaflet
				const L = await import('leaflet')

				// Import des styles CSS de Leaflet (dynamique)
				// @ts-expect-error - Import CSS dynamique
				await import('leaflet/dist/leaflet.css')

				if (!mapRef.current) return

				// Initialisation de la carte
				map = L.map(mapRef.current, {
					center: [location.lat, location.lng],
					zoom: zoom,
					zoomControl: showControls,
					dragging: interactive,
					touchZoom: interactive,
					doubleClickZoom: interactive,
					scrollWheelZoom: interactive,
					boxZoom: interactive,
					keyboard: interactive,
				})

				// Contrôle du z-index de la carte
				if (map.getPane) {
					const mapPane = map.getPane('mapPane')
					if (mapPane) {
						mapPane.style.zIndex = zIndex.toString()
					}
				}

				// Ajout des tuiles OpenStreetMap
				L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
					attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
					maxZoom: 19,
				}).addTo(map)

				// Ajout du marqueur si demandé
				if (showMarker) {
					// Configuration de l'icône par défaut de Leaflet
					const defaultIcon = L.icon({
						iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
						iconSize: [25, 41],
						iconAnchor: [12, 41],
						popupAnchor: [1, -34],
						shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
						shadowSize: [41, 41],
					})

					marker = L.marker([location.lat, location.lng], { icon: defaultIcon }).addTo(map).bindPopup(`
              <div style="text-align: center;">
                <strong>${location.name}</strong><br>
                ${location.address}<br>
                ${location.postalCode} ${location.city}
              </div>
            `)
					// Utilisation du marqueur pour éviter l'avertissement
					console.log('Marqueur créé:', marker)
				}

				setIsLoaded(true)
			} catch (err) {
				console.error('Erreur lors du chargement de la carte:', err)
				setError('Impossible de charger la carte')
			}
		}

		initializeMap()

		// Nettoyage
		return () => {
			if (map) {
				map.remove()
			}
		}
	}, [location, zoom, showMarker, showControls, interactive, zIndex])

	return {
		mapRef,
		isLoaded,
		error,
	}
}
