import type { SectorPageData } from '@/types/sanity/sectorPage'
import { groq } from 'next-sanity'
import { sanityFetch } from '../client'
import { BASIC_IMAGE_QUERY, BASIC_IMAGE_QUERY_LIGHT, GALLERY_IMAGE_QUERY_LIGHT } from '../helpers/imageProps'

// Query pour récupérer un secteur avec toutes ses données
export const SECTOR_PAGE_QUERY = groq`*[_type == "sectorPage" && _id == $sectorId][0]{
	_id,
	title,
	"slug": devConfig.slug.current,
	// Hero (version allégée : priority sur HeroGlobal, pas besoin de lqip/blurhash)
	sectionHero{
		image${BASIC_IMAGE_QUERY_LIGHT},
		description
	},
	linkedSpaces[]->{
		_id,
		title,
		image${BASIC_IMAGE_QUERY_LIGHT},
		description
	},
	// Parallax (version allégée, below-the-fold)
	parallax{
		image${BASIC_IMAGE_QUERY_LIGHT}
	},
	content,
	gallery[]${GALLERY_IMAGE_QUERY_LIGHT},
	seo{
		metaTitle,
		metaDescription,
		keywords,
		shareImage${BASIC_IMAGE_QUERY}
	}
}`

export async function fetchSectorPage(sectorId: string): Promise<SectorPageData> {
	return sanityFetch<SectorPageData>(SECTOR_PAGE_QUERY, { sectorId }, { tag: `sector-${sectorId}` })
}

// Queries pour les 4 secteurs fixes
export const fetchNurserie = () => fetchSectorPage('nurserie')
export const fetchTrotteurs = () => fetchSectorPage('trotteurs')
export const fetchGrands = () => fetchSectorPage('grands')
export const fetchAutresEspaces = () => fetchSectorPage('autres-espaces')
