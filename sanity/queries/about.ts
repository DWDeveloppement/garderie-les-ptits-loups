import type { AboutPageData } from '@/sanity/types/pages/about'
import { groq } from 'next-sanity'
import { sanityFetch } from '../client'
import { BASIC_IMAGE_QUERY, BASIC_IMAGE_QUERY_LIGHT } from '../helpers/imageProps'

/**
 * Query pour la page À propos
 */
export const ABOUT_QUERY = groq`
  *[_type == "aboutPage" && _id == "aboutPage"][0] {
    title,
    
    // Hero (version allégée : priority sur HeroGlobal, pas besoin de lqip/blurhash)
    sectionHero {
      image ${BASIC_IMAGE_QUERY_LIGHT},
      description
    },
    
    // Introduction (rich-text avec images)
    introduction[] {
      ...,
      _type == "basicImage" => {
        ...,
        "asset": asset->{
          url,
          metadata { dimensions }
        }
      }
    },
    
    // Parallax 1 (version allégée, below-the-fold)
    parallaxOne {
      image ${BASIC_IMAGE_QUERY_LIGHT}
    },
    
    // Histoire (collapse: contenu + image simple)
    historyCollapse {
      content[] {
        ...,
        _type == "basicImage" => {
          ...,
          "asset": asset->{ url, metadata { dimensions } }
        }
      },
      historyImage {
        alt,
        "url": asset->url,
        "width": asset->metadata.dimensions.width,
        "height": asset->metadata.dimensions.height
      }
    },
    
    // Parallax 2 (version allégée, below-the-fold)
    parallaxTwo {
      image ${BASIC_IMAGE_QUERY_LIGHT}
    },
    
    // Pédagogie
    pedagogy[] {
      ...,
      _type == "basicImage" => {
        ...,
        "asset": asset->{
          url,
          metadata { dimensions }
        }
      }
    },

    // Équipe (rich-text simple)
    team,

    // Valeurs (rich-text simple)
    values,
    
    // SEO
    seo {
      metaTitle,
      metaDescription,
      keywords,
      shareImage ${BASIC_IMAGE_QUERY}
    }
  }
`

export async function fetchAbout(): Promise<AboutPageData> {
	return sanityFetch<AboutPageData>(ABOUT_QUERY, {}, { tag: 'about-page' })
}
