/**
 * Queries partagées avec React Cache
 * Permet de partager les données entre composants pendant un seul rendu
 * Utile pour Footer et Partners qui sont dans le layout (appelés sur toutes les pages)
 */

import type { Partner, SanityContactInfo } from '@/types/queries'
import { groq } from 'next-sanity'
import { cache } from 'react'
import { sanityFetch } from '../client'
import { BASIC_IMAGE_QUERY_LIGHT } from '../helpers/imageProps'

/**
 * Query unifiée pour Footer + Partners
 * Récupère les deux en une seule requête pour réduire les round-trips réseau
 * Tags séparés pour maintenir la granularité du cache
 */
export const LAYOUT_DATA_QUERY = groq`
{
  "footer": *[_type == "contactPage" && _id == "contactPage"][0] {
    contactInfo {
      name,
      description,
      address,
      postalCode,
      city,
      country,
      phone,
      email,
      openingHours
    }
  },
  "partners": *[_type == "partners"] | order(_createdAt desc) {
    _id,
    name,
    website,
    logo ${BASIC_IMAGE_QUERY_LIGHT}
  }
}
`

/**
 * Type pour les données de layout unifiées
 */
export type LayoutData = {
	footer: {
		contactInfo?: SanityContactInfo & { description: string }
	}
	partners: Partner[]
}

/**
 * Récupère Footer + Partners en une seule requête
 * Tag unifié pour le cache (les deux sont toujours utilisés ensemble)
 * Note: On pourrait utiliser plusieurs tags si Next.js le supporte, mais pour l'instant un tag unifié suffit
 */
async function fetchLayoutData(): Promise<LayoutData> {
	return sanityFetch<LayoutData>(LAYOUT_DATA_QUERY, {}, { tag: 'layout-data' })
}

/**
 * Cache React pour les données de layout (Footer + Partners)
 * Partage le résultat entre tous les composants qui appellent getLayoutData() pendant un seul rendu
 *
 * @example
 * ```tsx
 * const { footer, partners } = await getLayoutData()
 * ```
 */
export const getLayoutData = cache(fetchLayoutData)

/**
 * @deprecated Utiliser getLayoutData() à la place
 * Conservé pour compatibilité si besoin
 */
export const getFooterData = cache(async () => {
	const data = await getLayoutData()
	return { contactInfo: data.footer.contactInfo }
})

/**
 * @deprecated Utiliser getLayoutData() à la place
 * Conservé pour compatibilité si besoin
 */
export const getPartners = cache(async () => {
	const data = await getLayoutData()
	return data.partners
})
