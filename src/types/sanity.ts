// Types pour Sanity CMS

export type SanityValidationRule = {
	required: () => SanityValidationRule
	max: (length: number) => SanityValidationRule
	min: (length: number) => SanityValidationRule
	length: (length: number) => SanityValidationRule
	maxLength: (length: number) => SanityValidationRule
	minLength: (length: number) => SanityValidationRule
	regex: (pattern: RegExp, message?: string) => SanityValidationRule
	error: (message: string) => SanityValidationRule
	warning: (message: string) => SanityValidationRule
	info: (message: string) => SanityValidationRule
	custom: (fn: (value: unknown) => string | true) => SanityValidationRule
}

export type SanityFieldDefinition = {
	title: string
	name: string
	type: string
	validation?: (Rule: SanityValidationRule) => SanityValidationRule
	options?: {
		maxLength?: number
		[key: string]: unknown
	}
	fields?: SanityFieldDefinition[]
	of?: SanityFieldDefinition[]
	[key: string]: unknown
}

export type SanityDocumentDefinition = {
	name: string
	title: string
	type: 'document'
	fields: SanityFieldDefinition[]
	[key: string]: unknown
}
