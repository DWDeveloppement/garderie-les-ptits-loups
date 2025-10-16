import { groq } from 'next-sanity'
import { sanityFetch } from '../client'
import { BASIC_IMAGE_QUERY } from '../helpers/imageProps'

/**
 * Query pour la page Tarifs
 * Populate tous les documents prix référencés (array de références)
 */
export const SCHEDULE_QUERY = groq`
  *[_type == "schedulePage" && _id == "schedulePage"][0] {
    title,
    
    // Hero
    sectionHero {
      image ${BASIC_IMAGE_QUERY},
      description
    },
    
    // Section Tarifs Nurserie (avec populate des références)
    "tarifsSectionNurserie": {
      "title": tarifsSectionNurserie.title,
      "tarifs": tarifsSectionNurserie.priceRefs[]-> {
        _id,
        title,
        frequentationType,
        accordionItems[] {
          accordionTitle,
          priceItems[] {
            service,
            price
          }
        }
      }
    },
    
    // Section Tarifs Trotteurs & Grands
    "tarifsSectionTG": {
      "title": tarifsSectionTG.title,
      "tarifs": tarifsSectionTG.priceRefs[]-> {
        _id,
        title,
        frequentationType,
        accordionItems[] {
          accordionTitle,
          priceItems[] {
            service,
            price
          }
        }
      }
    },
    
    // Parallax
    parallax {
      image ${BASIC_IMAGE_QUERY}
    },
    
    // Section Subventions
    "subsidiesTable": {
      "title": subsidiesTable.title,
      "body": subsidiesTable.body,
      "tableau": subsidiesTable.tableauSubsidies-> {
        _id,
        title,
        tableContent {
          subsidyItems[] {
            incomeRange,
            subsidy
          }
        }
      }
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

export async function fetchSchedule() {
	return sanityFetch(SCHEDULE_QUERY, {}, { tag: 'schedule-page' })
}
