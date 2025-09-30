/* Les partners sont les partenaires de la garderie. */

export type PartnersTypesProps = {
	id: number
	name: string
	website: string
	tooltip: string
	logo: string
}

// Type pour les données JSON (identique mais pour la clarté)
export type PartnersData = {
	id: number
	name: string
	website: string
	tooltip: string
	logo: string
}
