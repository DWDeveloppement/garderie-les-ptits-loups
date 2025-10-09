// Composant Image de base (utilisé par tous les autres types d'images)
import { type Rule, type SchemaTypeDefinition } from 'sanity'

export const basicImage: SchemaTypeDefinition = {
	name: 'basicImage',
	title: 'Image',
	type: 'image',
	options: {
		hotspot: true,
		metadata: ['blurhash', 'lqip', 'palette'], // Performance: placeholder
	},
	fields: [
		{
			name: 'alt',
			title: 'Texte alternatif',
			type: 'string',
			validation: (Rule: Rule) => Rule.required().max(125),
			description: "Description de l'image pour SEO et accessibilité",
		},
		// Switch principal pour afficher les options avancées
		{
			name: 'enableOptions',
			title: 'Afficher les options avancées',
			type: 'boolean',
			initialValue: false,
			description: 'Active les options de crédit et d\'infobulle',
		},
		// Crédit de l'image (visible seulement si options activées)
		{
			name: 'credit',
			title: 'Crédit',
			type: 'string',
			description: "Crédit de l'image",
			initialValue: "Garderie Les P'tits Loups",
			hidden: ({ parent }) => !parent?.enableOptions,
		},
		// Switch pour activer l'infobulle (visible seulement si options activées)
		// Frontend: si enableCustomTooltip = false → pas d'infobulle
		// Frontend: si enableCustomTooltip = true && tooltipText vide → utilise alt
		// Frontend: si enableCustomTooltip = true && tooltipText rempli → utilise tooltipText
		{
			name: 'enableCustomTooltip',
			title: 'Activer une infobulle au survol',
			type: 'boolean',
			initialValue: false,
			description: "Active l'affichage d'une infobulle au survol de l'image",
			hidden: ({ parent }) => !parent?.enableOptions,
		},
		// Texte de l'infobulle (visible seulement si options ET tooltip activés)
		{
			name: 'tooltipText',
			title: "Texte de l'infobulle",
			type: 'string',
			hidden: ({ parent }) => !parent?.enableOptions || !parent?.enableCustomTooltip,
			description: 'Texte personnalisé au survol (si vide, le frontend utilisera le texte alternatif)',
		},
	],
}
