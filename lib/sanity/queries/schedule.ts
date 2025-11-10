import type { SchedulePageData } from '@/types/queries'
import { groq } from 'next-sanity'
import { sanityFetch } from '../client'
import { BASIC_IMAGE_QUERY, BASIC_IMAGE_QUERY_LIGHT } from '../helpers/imageProps'

/**
 * Query pour la page Tarifs
 * Populate tous les documents prix référencés (array de références)
 */
export const SCHEDULE_QUERY = groq`
  *[_type == "schedulePage" && _id == "schedulePage"][0] {
    title,
    
    // Hero (version allégée : priority sur HeroGlobal, pas besoin de lqip/blurhash)
    sectionHero {
      image ${BASIC_IMAGE_QUERY_LIGHT},
      description
    },
    
    // Parallax (version allégée, below-the-fold)
    parallax {
      image ${BASIC_IMAGE_QUERY_LIGHT}
    },
    
    // Section Subventions (optimisée : seulement title et body, pas de jointure)
    // Note: Les données du tableau viennent de fetchSubsidies() (query séparée)
    "subsidiesTable": {
      "title": subsidiesTable.title,
      "informationImportantSubsidies": subsidiesTable.informationImportantSubsidies
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

export async function fetchSchedule(): Promise<SchedulePageData> {
	return sanityFetch<SchedulePageData>(SCHEDULE_QUERY, {}, { tag: 'schedule-page' })
}
