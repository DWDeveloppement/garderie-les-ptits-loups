import { type Rule, type SchemaTypeDefinition } from 'sanity'

export const spacePage: SchemaTypeDefinition = {
	name: 'spacePage',
	title: 'Page Espace',
	type: 'document',
	fields: [
		{
			name: 'title',
			title: 'Titre',
			type: 'string',
			// Calculé automatiquement depuis l'_id du document
			initialValue: (doc: { _id?: string }) => {
				if (!doc._id) return undefined
				const id = doc._id.toLowerCase()
				// Nurserie (avec "Space" à la fin)
				if (id.includes('nurseryplaygroundspace')) return 'Salle de jeux'
				if (id.includes('nurseryrestspace')) return 'Espace Repos'
				if (id.includes('nurserycarespace')) return 'Espace Soins'
				// Trotteurs (avec "Space" à la fin)
				if (id.includes('trotteursplaygroundspace')) return 'Salle de jeux'
				if (id.includes('trotteursrestspace')) return 'Espace Repos'
				if (id.includes('trotteurscarespace')) return 'Espace soins'
				// Grands (avec "Space" à la fin)
				if (id.includes('grandsplaygroundspace')) return 'Espace jeux'
				if (id.includes('grandsrestspace')) return 'Espace repos'
				if (id.includes('grandscarespace')) return 'Espace soins'
				// Autres espaces (avec "Space" à la fin)
				if (id.includes('gardenspace')) return 'Le Jardin'
				if (id.includes('kitchenspace')) return 'La Cuisine'
				if (id.includes('bricolagespace')) return "L'armoire à bricolages"
				return undefined
			},
			validation: (Rule: Rule) => Rule.required().max(100),
		},
		// Secteur (auto-calculé depuis l'_id, mais modifiable)
		{
			name: 'sector',
			title: 'Secteur',
			type: 'string',
			// Calculé depuis l'_id: nursery, trotteurs, grands, other
			initialValue: (doc: { _id?: string }) => {
				if (!doc._id) return undefined
				const id = doc._id.toLowerCase()
				// Vérifier dans l'ordre (du plus spécifique au plus général)
				if (id.includes('nursery')) return 'nursery'
				if (id.includes('trotteurs')) return 'trotteurs'
				if (id.includes('grands')) return 'grands'
				if (id.includes('garden') || id.includes('kitchen') || id.includes('bricolage')) return 'other'
				return 'other' // Par défaut
			},
			validation: (Rule: Rule) => Rule.required(),
			options: {
				list: [
					{ title: 'Nurserie', value: 'nursery' },
					{ title: 'Trotteurs', value: 'trotteurs' },
					{ title: 'Grands', value: 'grands' },
					{ title: 'Autres Espaces', value: 'other' },
				],
			},
			description: "Secteur d'appartenance de cet espace (modifiable si besoin)",
		},
		// Pas de slug: ce sont des relations, pas des pages de navigation
		// Image principale
		{
			name: 'image',
			title: 'Image',
			type: 'basicImage',
			validation: (Rule: Rule) => Rule.required(),
		},
		// Description en rich-text
		{
			name: 'description',
			title: 'Description',
			type: 'array',
			of: [{ type: 'block' }],
			validation: (Rule: Rule) => Rule.required(),
		},
	],
	preview: {
		select: {
			title: 'title',
			sector: 'sector',
			media: 'image',
		},
		prepare(selection) {
			const { title, sector, media } = selection
			// Mapping des codes secteurs vers les labels français
			const sectorLabels: Record<string, string> = {
				nursery: 'Nurserie',
				trotteurs: 'Trotteurs',
				grands: 'Grands',
				other: 'Autres Espaces',
			}
			return {
				title: title || 'Sans titre',
				subtitle: sectorLabels[sector] || sector || 'Secteur non défini',
				media,
			}
		},
	},
}
