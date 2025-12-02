// 📂 sanity/types/pages/structure.ts
// 👉 Types pour les structures depuis Sanity

/* Les structures sont basées sur les secteurs de la garderie.
Il y a 4 secteurs dans lesquelles il faudra importer les espaces. Référencées dans espaces.ts sous sector.
Ex: Nursery => les espaces de la nursery, sector: nursery.
Ex: Trotteurs => les espaces des trotteurs, sector: trotteurs.
Ex: Grands => les espaces des grands, sector: grands.
Ex: Other => les espaces de la garderie, sector: other.
*/

export type StructureTypesProps = {
	id: string
	title: string
	ageRange: string
	description: string
	icon: React.ElementType
	features: string[]
	color: string
}

// Type pour les données JSON (sans React.ElementType)
export type StructureData = {
	id: string
	title: string
	ageRange: string
	description: string
	icon: string
	features: string[]
	color: string
}

