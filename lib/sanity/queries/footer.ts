import type { SanityContactInfo } from '@/types/queries'
import { groq } from 'next-sanity'
import { sanityFetch } from '../client'

/**
 * Query spécifique pour le Footer
 * Récupère uniquement les informations de contact nécessaires
 */
export const FOOTER_QUERY = groq`
  *[_type == "contactPage" && _id == "contactPage"][0] {
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
  }
`

export async function fetchFooterData(): Promise<{ contactInfo?: SanityContactInfo & { description: string } }> {
	return sanityFetch<{ contactInfo?: SanityContactInfo & { description: string } }>(FOOTER_QUERY, {}, { tag: 'footer' })
}
