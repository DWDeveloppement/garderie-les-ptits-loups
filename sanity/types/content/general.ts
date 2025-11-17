// 📂 sanity/types/content/general.ts
// 👉 Types pour le contenu général Sanity

export type News = {
	_id: string
	_type: 'news'
	title: string
	slug: {
		current: string
	}
	excerpt?: string
	content?: unknown
	publishedAt: string
	featured: boolean
}

export type Activity = {
	_id: string
	_type: 'activity'
	title: string
	description?: string
	ageGroup?: string
	duration?: number
	materials?: string[]
	photos?: unknown[]
}

export type Staff = {
	_id: string
	_type: 'staff'
	firstName: string
	lastName: string
	role: string
	photo?: unknown
	bio?: string
	qualifications?: string[]
}

