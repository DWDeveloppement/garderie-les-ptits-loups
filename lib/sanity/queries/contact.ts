import { groq } from 'next-sanity'
import { sanityFetch } from '../client'
import { BASIC_IMAGE_QUERY } from '../helpers/imageProps'

/**
 * Query pour la page Contact
 * ContactInfo centralisé pour réutilisation (footer, map, etc.)
 */
export const CONTACT_QUERY = groq`
  *[_type == "contactPage" && _id == "contactPage"][0] {
    title,
    
    // Hero
    sectionHero {
      image ${BASIC_IMAGE_QUERY},
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
    
    // Parallax
    parallax {
      image ${BASIC_IMAGE_QUERY}
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

export async function fetchContact() {
	return sanityFetch(CONTACT_QUERY, {}, { tag: 'contact-page' })
}
