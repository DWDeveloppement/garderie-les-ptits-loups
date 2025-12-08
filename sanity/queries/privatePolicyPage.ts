/**
 * @name getPrivatePolicyPageData
 * @description Query pour la page Politique de Confidentialité
 */

import { type LegalPageData } from '@/sanity/types/pages'
import { sanityFetch } from '../client'

const PRIVATE_POLICY_PAGE_QUERY = `*[_type == "privatePolicyPage"][0]{
	title,
	content
}`

export async function getPrivatePolicyPageData(): Promise<LegalPageData | null> {
	return sanityFetch<LegalPageData | null>(
		PRIVATE_POLICY_PAGE_QUERY,
		{},
		{ tag: 'private-policy-page' }
	)
}
