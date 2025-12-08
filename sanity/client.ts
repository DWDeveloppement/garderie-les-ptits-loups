/**
 * Client Sanity avec mesure de performance
 */

import imageUrlBuilder from '@sanity/image-url'
import { createClient } from 'next-sanity'
import { measureSanityQuery } from '../lib/performance/measure'

export const client = createClient({
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
	apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
	// Activer CDN en production pour meilleures performances (cache côté Sanity)
	// Désactiver en développement pour avoir les dernières données
	useCdn: process.env.NODE_ENV === 'production',
	token: process.env.SANITY_API_TOKEN,
	// Désactiver Stega (VisualEditing) en production pour réduire le bundle
	// Stega est uniquement nécessaire pour l'édition visuelle en mode preview
	stega:
		process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_SANITY_STUDIO_URL
			? {
					studioUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL,
				}
			: false,
	perspective: 'published', // Utiliser uniquement les données publiées (pas les drafts)
})

/**
 * Image URL Builder pour générer des URLs optimisées
 */
export const imageBuilder = imageUrlBuilder(client)

/**
 * Wrapper de fetch avec mesure de performance
 *
 * @param query - Query GROQ à exécuter
 * @param params - Paramètres de la query
 * @param options - Options de cache et tags
 *
 * Cache Strategy (Next.js 15):
 * - Le cache est géré automatiquement par Next.js via `export const revalidate` des pages
 * - Les tags permettent une revalidation granulaire via `revalidateTag()`
 * - Pas de `force-cache` explicite pour éviter les conflits avec ISR
 */
export async function sanityFetch<T = unknown>(
	query: string,
	params: Record<string, unknown> = {},
	options: { tag?: string } = {}
): Promise<T> {
	const queryLabel = options.tag || 'Unknown Query'

	return measureSanityQuery(queryLabel, () =>
		client.fetch<T>(query, params, {
			// Laisser Next.js gérer le cache automatiquement
			// Le revalidate est défini au niveau des pages (export const revalidate = 60)
			next: {
				tags: options.tag ? [options.tag] : undefined,
			},
		})
	)
}

export { groq } from 'next-sanity'

