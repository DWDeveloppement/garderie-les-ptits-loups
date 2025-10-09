import { groq } from 'next-sanity'
import { client } from '../client'
import { BASIC_IMAGE_QUERY, GALLERY_IMAGE_QUERY } from '../helpers/imageProps'

// Query pour récupérer un secteur avec toutes ses données
export const qSectorPage = groq`*[_type == "sectorPage" && _id == $sectorId][0]{
	_id,
	title,
	slug,
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

export async function fetchSectorPage(sectorId: string) {
	return client.fetch(qSectorPage, { sectorId })
}

// Queries pour les 4 secteurs fixes
export const fetchNurserie = () => fetchSectorPage('nurserie')
export const fetchTrotteurs = () => fetchSectorPage('trotteurs')
export const fetchGrands = () => fetchSectorPage('grands')
export const fetchAutresEspaces = () => fetchSectorPage('autres-espaces')
