/* Les espaces sont les espaces de la garderie. */

export type SpacesTypesProps = {
	id: string
	title: string
	imageUrl: string
	imageAlt: string
	sector: string
	description: string
	color: string
}

// Type pour les données JSON (identique mais pour la clarté)
export type SpacesData = {
	id: string
	title: string
	imageUrl: string
	imageAlt: string
	sector: string
	description: string
	color: string
}
