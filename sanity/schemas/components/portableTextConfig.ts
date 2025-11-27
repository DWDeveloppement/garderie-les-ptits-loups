// Configuration réutilisable pour les blocs Portable Text
// Barre d'outils complète : styles, formatage, listes, blockquote personnalisé

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
// BLOCKQUOTE - Type unifié avec options dans la modale
// ============================================================================

/**
 * Blockquote unifié - Un seul type avec 2 booleans pour définir le style
 *
 * - isSecondary: false = Primary (violet), true = Secondary (orange)
 * - isSpecial: false = Standard (bordure gauche), true = Special (card avec icône)
 */
export const blockquote = defineField({
	name: 'blockquote',
	type: 'object',
	title: 'Citation',
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
		defineField({
			name: 'isSecondary',
			type: 'boolean',
			title: 'Style secondaire',
			description: 'Désactivé = Primary (violet) | Activé = Secondary (orange)',
			initialValue: false,
		}),
		defineField({
			name: 'isSpecial',
			type: 'boolean',
			title: 'Style spécial (carte)',
			description: 'Désactivé = Bordure simple | Activé = Carte avec icône',
			initialValue: false,
		}),
	],
	preview: {
		select: { text: 'text', author: 'author', isSecondary: 'isSecondary', isSpecial: 'isSpecial' },
		prepare: ({ text, author, isSecondary, isSpecial }) => {
			const variant = isSecondary ? 'Secondary' : 'Primary'
			const style = isSpecial ? '⭐ Spéciale' : 'Standard'
			return {
				title: text ? `${text.substring(0, 50)}...` : 'Citation',
				subtitle: author ? `${style} ${variant} — ${author}` : `${style} ${variant}`,
			}
		},
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
 * Configuration complète avec blockquote
 * Usage: defineField({ name: 'content', type: 'array', of: portableTextWithBlockquotes })
 */
export const portableTextWithBlockquotes = [portableTextBlockConfig, blockquote]

/**
 * Configuration simple (texte uniquement, sans blockquote)
 * Usage: defineField({ name: 'content', type: 'array', of: portableTextSimple })
 */
export const portableTextSimple = [portableTextBlockConfig]

// ============================================================================
// HELPER POUR CRÉER UN CHAMP PORTABLE TEXT
// ============================================================================

type PortableTextVariant = 'full' | 'simple'

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
 * // Champ avec blockquote
 * createPortableTextField({ name: 'content', title: 'Contenu', variant: 'full' })
 *
 * // Champ simple (texte seulement)
 * createPortableTextField({ name: 'description', title: 'Description', variant: 'simple' })
 */
export function createPortableTextField({ name, title, variant = 'full', required = false }: CreatePortableTextFieldOptions) {
	const variantMap: Record<PortableTextVariant, typeof portableTextWithBlockquotes> = {
		full: portableTextWithBlockquotes,
		simple: portableTextSimple,
	}

	return defineField({
		name,
		title,
		type: 'array',
		of: variantMap[variant],
		validation: required ? (rule) => rule.required() : undefined,
	})
}
