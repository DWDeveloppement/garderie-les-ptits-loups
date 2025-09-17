import { createClient } from '@sanity/client'

// ============================================================================
// CLIENT SANITY - Configuration optimisée
// ============================================================================

export const client = createClient({
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
	useCdn: process.env.NODE_ENV === 'production',
	apiVersion: '2024-01-01',
	token: process.env.SANITY_API_TOKEN, // Pour les mutations si nécessaire
	perspective: 'published', // Utiliser seulement le contenu publié
})

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
