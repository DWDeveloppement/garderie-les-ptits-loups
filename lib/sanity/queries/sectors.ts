import type { SectorPageData } from '@/types/sanity/sectorPage'
import { groq } from 'next-sanity'
import { sanityFetch } from '../client'
import { BASIC_IMAGE_QUERY, GALLERY_IMAGE_QUERY } from '../helpers/imageProps'

// Query pour récupérer un secteur avec toutes ses données
export const SECTOR_PAGE_QUERY = groq`*[_type == "sectorPage" && _id == $sectorId][0]{
	_id,
	title,
	"slug": devConfig.slug.current,
	sectionHero{
		image${BASIC_IMAGE_QUERY},
		description
	},
	linkedSpaces[]->{
		_id,
		title,
		image${BASIC_IMAGE_QUERY},
		description
	},
	parallax{
		image${BASIC_IMAGE_QUERY}
	},
	content,
	gallery[]${GALLERY_IMAGE_QUERY},
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
