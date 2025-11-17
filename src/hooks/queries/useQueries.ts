import { PriceDocument, SubsidiesDocument } from '@/sanity/types/content/prices'
import { useEffect, useState } from 'react'

// Types pour les données JSON
interface PartnersData {
	id: number
	name: string
	website: string
	tooltip: string
	logo: string
}

interface StructuresData {
	id: string
	title: string
	ageRange: string
	description: string
	icon: string
	features: string[]
	color: string
}

interface SpacesData {
	id: string
	title: string
	imageUrl: string
	imageAlt: string
	sector: string
	description: string
	color: string
}

interface TestimonialsData {
	id: number
	name: string
	role: string
	content: string
	rating: number
}

// Hook principal pour les queries
export const useQueries = () => {
	const [partners, setPartners] = useState<PartnersData[]>([])
	const [structures, setStructures] = useState<StructuresData[]>([])
	const [spaces, setSpaces] = useState<SpacesData[]>([])
	const [testimonials, setTestimonials] = useState<TestimonialsData[]>([])
	const [prices, setPrices] = useState<PriceDocument[]>([])
	const [subsidies, setSubsidies] = useState<SubsidiesDocument | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const loadData = async () => {
			try {
				setLoading(true)

				// Charger les données JSON
				const [partnersRes, structuresRes, spacesRes, testimonialsRes, pricesRes] = await Promise.all([
					fetch('/src/data/response-queries/partners.json').then((res) => res.json()),
					fetch('/src/data/response-queries/structures.json').then((res) => res.json()),
					fetch('/src/data/response-queries/spaces.json').then((res) => res.json()),
					fetch('/src/data/response-queries/testimonials.json').then((res) => res.json()),
					fetch('/src/data/response-queries/horaires-tarifs.json').then((res) => res.json()),
				])

				setPartners(partnersRes.partners)
				setStructures(structuresRes.structures)
				setSpaces(spacesRes.spaces)
				setTestimonials(testimonialsRes.testimonials)

				// Extraire les données de prix
				const priceData = [pricesRes.nurserieData, pricesRes.trotteursGrandsData]
				setPrices(priceData)
				setSubsidies(pricesRes.subventionsData)

				setError(null)
			} catch (err) {
				setError('Erreur lors du chargement des données')
				console.error('Erreur useQueries:', err)
			} finally {
				setLoading(false)
			}
		}

		loadData()
	}, [])

	return {
		partners,
		structures,
		spaces,
		testimonials,
		prices,
		subsidies,
		loading,
		error,
	}
}

// Hooks spécialisés pour chaque type de données
export const usePartners = () => {
	const { partners, loading, error } = useQueries()
	return { partners, loading, error }
}

export const useStructures = () => {
	const { structures, loading, error } = useQueries()
	return { structures, loading, error }
}

export const useSpaces = () => {
	const { spaces, loading, error } = useQueries()
	return { spaces, loading, error }
}

export const useTestimonials = () => {
	const { testimonials, loading, error } = useQueries()
	return { testimonials, loading, error }
}

export const usePrices = () => {
	const { prices, subsidies, loading, error } = useQueries()
	return { prices, subsidies, loading, error }
}
