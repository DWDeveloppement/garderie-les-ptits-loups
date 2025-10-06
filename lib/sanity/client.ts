import { createClient } from 'next-sanity'

// ============================================================================
// CLIENT SANITY - Configuration centralisée
// ============================================================================

const baseConfig = {
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID || 'your-project-id',
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_STUDIO_DATASET || 'production',
	useCdn: process.env.NODE_ENV === 'production',
	apiVersion: '2024-01-01',
} as const

export const client = createClient(
	process.env.SANITY_API_TOKEN
		? {
				...baseConfig,
				token: process.env.SANITY_API_TOKEN,
				perspective: 'published',
			}
		: { ...baseConfig }
)

// ============================================================================
// CONFIGURATION DE CACHE
// ============================================================================

// Cache côté client pour éviter les requêtes répétées
const cache = new Map<string, { data: unknown; timestamp: number }>()
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

export async function cachedFetch(query: string, params?: Record<string, unknown>, ttl = CACHE_TTL) {
	const cacheKey = `${query}:${JSON.stringify(params || {})}`
	const cached = cache.get(cacheKey)

	// Vérifier si le cache est valide
	if (cached && Date.now() - cached.timestamp < ttl) {
		return cached.data
	}

	// Récupérer les données depuis Sanity
	const data = await client.fetch(query, params)

	// Mettre en cache
	cache.set(cacheKey, {
		data,
		timestamp: Date.now(),
	})

	return data
}

// ============================================================================
// FONCTIONS UTILITAIRES
// ============================================================================

export function clearCache() {
	cache.clear()
}

export function getCacheSize() {
	return cache.size
}

// ============================================================================
// CONFIGURATION D'ENVIRONNEMENT
// ============================================================================

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
	throw new Error('NEXT_PUBLIC_SANITY_PROJECT_ID is required')
}

if (!process.env.NEXT_PUBLIC_SANITY_DATASET) {
	throw new Error('NEXT_PUBLIC_SANITY_DATASET is required')
}

// ============================================================================
// EXPORTS
// ============================================================================

export { client as sanityClient }
export default client
