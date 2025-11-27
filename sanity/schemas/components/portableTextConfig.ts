// Configuration réutilisable pour les blocs Portable Text
// Barre d'outils complète : styles, formatage, listes, blockquotes personnalisés

import { defineArrayMember, defineField, type Rule } from 'sanity'

// ============================================================================
// STYLES - Select avec titres et paragraphe
// ============================================================================
const textStyles = [
	{ title: 'Paragraphe', value: 'normal' },
	{ title: 'Titre 1', value: 'h1' },
	{ title: 'Titre 2', value: 'h2' },
	{ title: 'Titre 3', value: 'h3' },
	{ title: 'Titre 4', value: 'h4' },
	{ title: 'Titre 5', value: 'h5' },
	{ title: 'Titre 6', value: 'h6' },
]

// ============================================================================
// DECORATORS - Boutons Bold/Italic/Underline
// ============================================================================
const textDecorators = [
	{ title: 'Gras', value: 'strong' },
	{ title: 'Italique', value: 'em' },
	{ title: 'Souligné', value: 'underline' },
]

// ============================================================================
// LISTS - Boutons pour listes à puces et numérotées
// ============================================================================
const listTypes = [
	{ title: 'Liste à puces', value: 'bullet' },
	{ title: 'Liste numérotée', value: 'number' },
]

// ============================================================================
// ANNOTATIONS - Liens
// ============================================================================
const linkAnnotation = {
	name: 'link',
	type: 'object',
	title: 'Lien',
	fields: [
		{
			name: 'href',
			type: 'url',
			title: 'URL',
			validation: (rule: Rule) =>
				rule.uri({
					allowRelative: true,
					scheme: ['http', 'https', 'mailto', 'tel'],
				}),
		},
		{
			name: 'blank',
			type: 'boolean',
			title: 'Ouvrir dans un nouvel onglet',
			initialValue: false,
		},
	],
}

// ============================================================================
// BLOCKQUOTES PERSONNALISÉS - Types de blocs spéciaux
// ============================================================================

/**
 * Blockquote Primary - Citation standard avec style principal
 */
export const blockquotePrimary = defineField({
	name: 'blockquotePrimary',
	type: 'object',
	title: 'Citation Primary',
	icon: () => '💬',
	fields: [
		defineField({
			name: 'text',
			type: 'text',
			title: 'Texte de la citation',
			rows: 3,
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'author',
			type: 'string',
			title: 'Auteur (optionnel)',
		}),
	],
	preview: {
		select: { text: 'text', author: 'author' },
		prepare: ({ text, author }) => ({
			title: text ? `${text.substring(0, 50)}...` : 'Citation Primary',
			subtitle: author ? `— ${author}` : 'Citation Primary',
		}),
	},
})

/**
 * Blockquote Secondary - Citation avec style secondaire
 */
export const blockquoteSecondary = defineField({
	name: 'blockquoteSecondary',
	type: 'object',
	title: 'Citation Secondary',
	icon: () => '📝',
	fields: [
		defineField({
			name: 'text',
			type: 'text',
			title: 'Texte de la citation',
			rows: 3,
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'author',
			type: 'string',
			title: 'Auteur (optionnel)',
		}),
	],
	preview: {
		select: { text: 'text', author: 'author' },
		prepare: ({ text, author }) => ({
			title: text ? `${text.substring(0, 50)}...` : 'Citation Secondary',
			subtitle: author ? `— ${author}` : 'Citation Secondary',
		}),
	},
})

/**
 * Blockquote Special Primary - Citation mise en avant (style primary)
 */
export const blockquoteSpecialPrimary = defineField({
	name: 'blockquoteSpecialPrimary',
	type: 'object',
	title: 'Citation Spéciale Primary',
	icon: () => '⭐',
	fields: [
		defineField({
			name: 'text',
			type: 'text',
			title: 'Texte de la citation',
			rows: 3,
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'author',
			type: 'string',
			title: 'Auteur (optionnel)',
		}),
		defineField({
			name: 'highlight',
			type: 'boolean',
			title: 'Mettre en évidence',
			initialValue: true,
		}),
	],
	preview: {
		select: { text: 'text', author: 'author' },
		prepare: ({ text, author }) => ({
			title: text ? `${text.substring(0, 50)}...` : 'Citation Spéciale Primary',
			subtitle: author ? `⭐ ${author}` : 'Citation Spéciale Primary',
		}),
	},
})

/**
 * Blockquote Special Secondary - Citation mise en avant (style secondary)
 */
export const blockquoteSpecialSecondary = defineField({
	name: 'blockquoteSpecialSecondary',
	type: 'object',
	title: 'Citation Spéciale Secondary',
	icon: () => '✨',
	fields: [
		defineField({
			name: 'text',
			type: 'text',
			title: 'Texte de la citation',
			rows: 3,
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'author',
			type: 'string',
			title: 'Auteur (optionnel)',
		}),
		defineField({
			name: 'highlight',
			type: 'boolean',
			title: 'Mettre en évidence',
			initialValue: true,
		}),
	],
	preview: {
		select: { text: 'text', author: 'author' },
		prepare: ({ text, author }) => ({
			title: text ? `${text.substring(0, 50)}...` : 'Citation Spéciale Secondary',
			subtitle: author ? `✨ ${author}` : 'Citation Spéciale Secondary',
		}),
	},
})

// ============================================================================
// CONFIGURATION BLOC PRINCIPAL
// ============================================================================

/**
 * Configuration du bloc de texte standard
 * Inclut : styles (titres/paragraphe), decorators (bold/italic/underline), listes, liens
 */
export const portableTextBlockConfig = defineArrayMember({
	type: 'block',
	styles: textStyles,
	lists: listTypes,
	marks: {
		decorators: textDecorators,
		annotations: [linkAnnotation],
	},
})

// ============================================================================
// CONFIGURATIONS PRÊTES À L'EMPLOI
// ============================================================================

/**
 * Configuration complète avec tous les blockquotes
 * Usage: defineField({ name: 'content', type: 'array', of: portableTextWithBlockquotes })
 */
export const portableTextWithBlockquotes = [
	portableTextBlockConfig,
	blockquotePrimary,
	blockquoteSecondary,
	blockquoteSpecialPrimary,
	blockquoteSpecialSecondary,
]

/**
 * Configuration simple (texte uniquement, sans blockquotes)
 * Usage: defineField({ name: 'content', type: 'array', of: portableTextSimple })
 */
export const portableTextSimple = [portableTextBlockConfig]

/**
 * Configuration avec blockquotes basiques uniquement
 * Usage: defineField({ name: 'content', type: 'array', of: portableTextWithBasicQuotes })
 */
export const portableTextWithBasicQuotes = [portableTextBlockConfig, blockquotePrimary, blockquoteSecondary]

// ============================================================================
// HELPER POUR CRÉER UN CHAMP PORTABLE TEXT
// ============================================================================

type PortableTextVariant = 'full' | 'simple' | 'basic-quotes'

interface CreatePortableTextFieldOptions {
	name: string
	title: string
	variant?: PortableTextVariant
	required?: boolean
}

/**
 * Helper pour créer un champ Portable Text avec la configuration souhaitée
 *
 * @example
 * // Champ avec toutes les options
 * createPortableTextField({ name: 'content', title: 'Contenu', variant: 'full' })
 *
 * // Champ simple (texte seulement)
 * createPortableTextField({ name: 'description', title: 'Description', variant: 'simple' })
 */
export function createPortableTextField({ name, title, variant = 'full', required = false }: CreatePortableTextFieldOptions) {
	const variantMap: Record<PortableTextVariant, typeof portableTextWithBlockquotes> = {
		full: portableTextWithBlockquotes,
		simple: portableTextSimple,
		'basic-quotes': portableTextWithBasicQuotes,
	}

	return defineField({
		name,
		title,
		type: 'array',
		of: variantMap[variant],
		validation: required ? (rule) => rule.required() : undefined,
	})
}
