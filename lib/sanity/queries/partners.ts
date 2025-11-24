import type { Partner } from '@/types/sanity/pages/partners'
import { groq } from 'next-sanity'
import { sanityFetch } from '../client'
import { BASIC_IMAGE_QUERY } from '../helpers/imageProps'

/**
 * Query pour récupérer tous les partenaires
 * Triés par date de création (plus récents en premier)
 */
export const PARTNERS_QUERY = groq`
  *[_type == "partners"] | order(_createdAt desc) {
    _id,
    name,
    website,
    logo ${BASIC_IMAGE_QUERY}
  }
`

export async function fetchPartners(): Promise<Partner[]> {
	return sanityFetch<Partner[]>(PARTNERS_QUERY, {}, { tag: 'partners' })
}
