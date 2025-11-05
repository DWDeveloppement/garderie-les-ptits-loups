import type { ContactPageData } from '@/types/queries'
import { groq } from 'next-sanity'
import { sanityFetch } from '../client'
import { BASIC_IMAGE_QUERY, BASIC_IMAGE_QUERY_LIGHT } from '../helpers/imageProps'

/**
 * Query pour la page Contact
 * ContactInfo centralisé pour réutilisation (footer, map, etc.)
 */
export const CONTACT_QUERY = groq`
  *[_type == "contactPage" && _id == "contactPage"][0] {
    title,
    
    // Hero (version allégée : priority sur HeroGlobal, pas besoin de lqip/blurhash)
    sectionHero {
      image ${BASIC_IMAGE_QUERY_LIGHT},
      description
    },
    
    // Informations de contact (centralisées)
    contactInfo {
      name,
      address,
      postalCode,
      city,
      country,
      phone,
      email,
      openingHours,
      latitude,
      longitude,
      zoom
    },
    
    // Parallax (version allégée, below-the-fold)
    parallax {
      image ${BASIC_IMAGE_QUERY_LIGHT}
    },
    
    // SEO
    seo {
      metaTitle,
      metaDescription,
      keywords,
      shareImage ${BASIC_IMAGE_QUERY}
    }
  }
`

export async function fetchContact(): Promise<ContactPageData> {
	return sanityFetch<ContactPageData>(CONTACT_QUERY, {}, { tag: 'contact-page' })
}
