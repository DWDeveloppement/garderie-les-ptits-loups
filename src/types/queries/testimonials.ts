/* Les testimonials sont les témoignages des parents. */

export type TestimonialsTypesProps = {
	id: number
	name: string
	title: string
	content: string
	rating: number
}

// Type pour les données JSON (identique mais pour la clarté)
export type TestimonialsData = {
	id: number
	name: string
	role: string
	content: string
	rating: number
}
