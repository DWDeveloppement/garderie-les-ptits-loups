// 📂 sanity/types/validation.ts
// 👉 Types pour la validation Sanity

export type SanityValidationRule = {
	required: () => SanityValidationRule
	min: (value: number) => SanityValidationRule
	max: (value: number) => SanityValidationRule
	custom: (fn: (value: unknown) => string | true) => SanityValidationRule
}

// Types pour les réponses des requêtes
export type QueryResponse<T> = T[]
export type SingleQueryResponse<T> = T | null

