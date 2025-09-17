// ============================================================================
// TYPES POUR LES TARIFS ET SUBVENTIONS
// ============================================================================

export type PriceItem = {
	description: string
	price: number
}

export type PricingBlock = {
	label: string
	items: PriceItem[]
}

export type PricingSection = {
	label: string
	journeeComplete?: PricingBlock
	matinRepas?: PricingBlock
	matinSansRepas?: PricingBlock
	apresMidiRepas?: PricingBlock
	apresMidiSansRepas?: PricingBlock
	matinee?: PricingBlock
	apresMidi?: PricingBlock
}

export type PriceDocument = {
	_id: string
	_type: 'priceDocument'
	title: string
	prixAuMois: PricingSection
	prixAuJour: PricingSection
}

export type SubsidyItem = {
	incomeRange: string
	reductionDaily: number
}

export type SubsidiesDocument = {
	_id: string
	_type: 'subsidiesDocument'
	title: string
	labelIncomeRange: string
	labelReduction: string
	items: SubsidyItem[]
}

// ============================================================================
// TYPES POUR LE CONTENU GÉNÉRAL
// ============================================================================

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

// ============================================================================
// TYPES POUR LA VALIDATION SANITY
// ============================================================================

export type SanityValidationRule = {
	required: () => SanityValidationRule
	min: (value: number) => SanityValidationRule
	max: (value: number) => SanityValidationRule
	custom: (fn: (value: unknown) => string | true) => SanityValidationRule
}

// ============================================================================
// TYPES POUR LES RÉPONSES DES REQUÊTES
// ============================================================================

export type QueryResponse<T> = T[]

export type SingleQueryResponse<T> = T | null
