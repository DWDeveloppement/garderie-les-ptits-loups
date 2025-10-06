// Configuration des rôles utilisateurs
// Géré uniquement par le développeur

// Types pour les utilisateurs
export type SanityUser = {
	email?: string
	id?: string
	name?: string
	roles?: Array<{
		name: string
		title: string
	}>
}

// Types pour les pages fixes
export type FixedPage = {
	type: string
	title: string
	id: string
}

// Liste des développeurs (emails autorisés)
export const DEVELOPERS = [
	// Ajoutez votre email ici
	'votre-email@domain.com',
]

// Liste des pages fixes autorisées
export const ALLOWED_FIXED_PAGES: FixedPage[] = [
	{ type: 'home', title: "Page d'accueil", id: 'home' },
	{ type: 'aboutPage', title: 'À propos', id: 'about' },
	{ type: 'contactPage', title: 'Contact', id: 'contact' },
	{ type: 'schedulePage', title: 'Horaires & Tarifs', id: 'schedule' },
	// Vous pouvez ajouter d'autres pages ici
]

// Fonction de détection du rôle développeur
export const isDeveloper = (user: SanityUser | null): boolean => {
	if (!user?.email) return false
	return DEVELOPERS.includes(user.email)
}

// Fonction pour obtenir l'utilisateur actuel
export const getCurrentUser = (): SanityUser | null => {
	// Cette fonction sera implémentée dans sanity.config.ts
	// pour récupérer l'utilisateur connecté
	return null
}
