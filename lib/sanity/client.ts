/**
 * Client Sanity avec mesure de performance
 */

import { createClient } from 'next-sanity'
import { measureSanityQuery } from '../performance/measure'

export const client = createClient({
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
	apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
	useCdn: false, // Pour SSG, pas besoin de CDN (données au build time)
	token: process.env.SANITY_API_TOKEN,
})

/**
 * Wrapper de fetch avec mesure de performance
 */
export async function sanityFetch<T>(
	query: string,
	params: Record<string, unknown> = {},
	options: { tag?: string; cache?: RequestCache } = {}
): Promise<T> {
	const queryLabel = options.tag || 'Unknown Query'

	return measureSanityQuery(queryLabel, () =>
		client.fetch<T>(query, params, {
			cache: options.cache || 'force-cache', // Cache pour SSG
			next: {
				tags: options.tag ? [options.tag] : undefined,
			},
		})
	)
}

export { groq } from 'next-sanity'
