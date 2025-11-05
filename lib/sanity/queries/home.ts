import type { HomePageData } from '@/types/queries'
import { groq } from 'next-sanity'
import { sanityFetch } from '../client'
import { BASIC_IMAGE_QUERY, BASIC_IMAGE_QUERY_LIGHT } from '../helpers/imageProps'

/**
 * Query pour la page d'accueil
 * Populate tous les secteurs et espaces liés en 1 requête
 */
export const HOME_QUERY = groq`
  *[_type == "home" && _id == "home"][0] {
    // Hero Home (version détaillée)
    sectionHero {
      title,
      garderieName,
      logo ${BASIC_IMAGE_QUERY},
      description,
      buttonText,
      buttonLink
    },
    
    // Secteurs liés (optimisé : image supprimée)
    // Note: Filtre schéma exclut "autres-espaces" (_id != "autres-espaces"), permet l'ajout de nouveaux secteurs
    // La limitation [0...10] permet jusqu'à 10 secteurs (flexible pour l'avenir)
    "linkedSectors": linkedSectors[0...5]-> {
      _id,
      title,
      ageRange,
      "slug": devConfig.slug.current,
      sectionHero {
        description
      }
    },
    
    // Autres espaces liés (optimisé : sector supprimé)
    // Note: Filtre schéma limite déjà à 3 espaces (sector == "other": jardin, cuisine, bricolage)
    // La limitation [0...3] est une sécurité supplémentaire
    "linkedOtherSpaces": linkedOtherSpaces[0...3]-> {
      _id,
      title,
      image ${BASIC_IMAGE_QUERY_LIGHT},
      description
    },
    
    // Contenu complémentaire
    contentComplement,
    
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

/**
 * Query pour récupérer tous les témoignages
 */
export const TESTIMONIALS_QUERY = groq`
  *[_type == "testimonials"] | order(_createdAt desc) {
    _id,
    title,
    information,
    signature
  }
`

export async function fetchHome(): Promise<HomePageData> {
	return sanityFetch<HomePageData>(HOME_QUERY, {}, { tag: 'home-page' })
}

export async function fetchTestimonials() {
	return sanityFetch<
		Array<{
			_id: string
			title: string
			information: string
			signature: string
		}>
	>(TESTIMONIALS_QUERY, {}, { tag: 'testimonials' })
}
