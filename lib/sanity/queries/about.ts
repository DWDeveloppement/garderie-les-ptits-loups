import { groq } from 'next-sanity'
import { sanityFetch } from '../client'
import { BASIC_IMAGE_QUERY } from '../helpers/imageProps'

/**
 * Query pour la page À propos
 */
export const ABOUT_QUERY = groq`
  *[_type == "aboutPage" && _id == "aboutPage"][0] {
    title,
    
    // Hero
    sectionHero {
      image ${BASIC_IMAGE_QUERY},
      description
    },
    
    // Introduction (rich-text avec images)
    introduction,
    
    // Parallax 1
    parallaxOne {
      image ${BASIC_IMAGE_QUERY}
    },
    
    // Histoire
    history,
    
    // Parallax 2
    parallaxTwo {
      image ${BASIC_IMAGE_QUERY}
    },
    
    // Pédagogie
    pedagogy,
    
    // SEO
    seo {
      metaTitle,
      metaDescription,
      keywords,
      shareImage ${BASIC_IMAGE_QUERY}
    }
  }
`

export async function fetchAbout() {
	return sanityFetch(ABOUT_QUERY, {}, { tag: 'about-page' })
}
