export type MapLocation = {
	name: string
	address: string
	postalCode: string
	city: string
	country?: string
	lat: number
	lng: number
}

export type MapProps = {
	location: MapLocation
	className?: string
	height?: string | number
	width?: string | number
	ratio?: string
}

export type StaticMapProps = MapProps & {
	zoom?: number
	mapType?: 'roadmap' | 'satellite' | 'hybrid' | 'terrain' // Gardé pour compatibilité, mais non utilisé
	style?: 'default' | 'light' | 'dark' // Gardé pour compatibilité, mais non utilisé
}

export type DynamicMapProps = MapProps & {
	ref?: React.RefObject<HTMLDivElement | null>
	zoom?: number
	showMarker?: boolean
	showControls?: boolean
	interactive?: boolean
	zIndex?: number
	ratio?: string
	onError?: (error: string) => void
}
