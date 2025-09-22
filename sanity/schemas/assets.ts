import { type Rule, type SchemaTypeDefinition } from 'sanity'
import { validateMediaReference } from '../plugins/mediaReference'

/**
 * Schéma de médiathèque centralisée
 * Upload uniquement ici, validation obligatoire pour SEO
 */

export const assets: SchemaTypeDefinition = {
	name: 'assets',
	title: 'Médiathèque',
	type: 'document',
	icon: () => '🖼️',
	fields: [
		// CHAMPS OBLIGATOIRES
		{
			name: 'asset',
			title: 'Image',
			type: 'image',
			description: 'Image principale (obligatoire)',
			options: {
				hotspot: true,
			},
			validation: (Rule: Rule) => Rule.required().error("L'image est obligatoire"),
		},
		{
			name: 'title',
			title: 'Titre',
			type: 'string',
			description: "Titre de l'image pour l'organisation (obligatoire)",
			validation: (Rule: Rule) => Rule.required().max(100).error("Le titre est obligatoire pour l'organisation"),
		},
		{
			name: 'alt',
			title: 'Texte alternatif',
			type: 'string',
			description: "Description de l'image pour l'accessibilité et le SEO (obligatoire)",
			validation: (Rule: Rule) => Rule.required().max(125).error("Le texte alternatif est obligatoire pour l'accessibilité et le SEO"),
		},
		{
			name: 'isPublic',
			title: 'Public',
			type: 'boolean',
			description: 'Ce média peut-il être utilisé publiquement ? (obligatoire)',
			initialValue: false,
			validation: (Rule: Rule) => Rule.required().error('Le statut public est obligatoire'),
		},

		// CHAMPS OPTIONNELS
		{
			name: 'description',
			title: 'Description',
			type: 'text',
			description: "Description détaillée de l'image (optionnel)",
			validation: (Rule: Rule) => Rule.max(500),
		},
		{
			name: 'tags',
			title: 'Tags',
			type: 'array',
			description: "Tags pour l'organisation et la recherche (optionnel)",
			of: [{ type: 'string' }],
			options: {
				layout: 'tags',
			},
		},
	],
	// Validation globale du document pour la protection contre suppression
	validation: validateMediaReference,
	preview: {
		select: {
			title: 'title',
			media: 'asset',
			alt: 'alt',
			isPublic: 'isPublic',
		},
		prepare(selection) {
			const { title, media, alt, isPublic } = selection
			return {
				title: title || 'Sans titre',
				subtitle: `${isPublic ? 'Public' : 'Privé'} • ${alt ? 'Alt: ' + alt.substring(0, 30) + '...' : "Pas d'alt"}`,
				media,
			}
		},
	},
}
