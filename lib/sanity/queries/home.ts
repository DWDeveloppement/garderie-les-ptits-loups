import type { HomePageData } from '@/types/queries'
import { groq } from 'next-sanity'
import { sanityFetch } from '../client'
import { BASIC_IMAGE_QUERY } from '../helpers/imageProps'

/**
 * Query pour la page d'accueil
 * Populate tous les secteurs et espaces liés en 1 requête
 */
export const HOME_QUERY = groq`
  *[_type == "home" && _id == "home"][0] {
    title,
    
    // Hero Home (version détaillée)
    sectionHero {
      title,
      garderieName,
      logo ${BASIC_IMAGE_QUERY},
      description,
      buttonText,
      buttonLink
    },
    
    // Secteurs liés (populate avec ->)
    "linkedSectors": linkedSectors[]-> {
      _id,
      title,
      ageRange,
      "slug": devConfig.slug.current,
      sectionHero {
        image ${BASIC_IMAGE_QUERY},
        description
      }
    },
    
    // Autres espaces liés
    "linkedOtherSpaces": linkedOtherSpaces[]-> {
      _id,
      title,
      sector,
      image ${BASIC_IMAGE_QUERY},
      description
    },
    
    // Contenu complémentaire
    contentComplement,
    
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

export async function fetchHome(): Promise<HomePageData> {
	return sanityFetch<HomePageData>(HOME_QUERY, {}, { tag: 'home-page' })
}
