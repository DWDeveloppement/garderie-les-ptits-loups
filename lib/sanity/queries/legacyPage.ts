/**
 * @name getLegacyPageData
 * @description Query pour la page Mentions Légales
 */

import { type LegalPageData } from '@/sanity/types/pages'
import { client } from '../client'

const LEGACY_PAGE_QUERY = `*[_type == "legacyPage"][0]{
	title,
	content
}`

export async function getLegacyPageData(): Promise<LegalPageData | null> {
	return client.fetch(LEGACY_PAGE_QUERY)
}
