import { type Rule, type SchemaTypeDefinition } from 'sanity'

export const sectors: SchemaTypeDefinition = {
	name: 'sectors',
	title: 'La Structure',
	type: 'document',
	fields: [
		{
			name: 'title',
			title: 'Titre du secteur',
			type: 'string',
			validation: (Rule: Rule) => Rule.required().max(100),
		},
		{
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: {
				source: 'title',
				maxLength: 96,
			},
			validation: (Rule: Rule) => Rule.required(),
		},
		{
			name: 'ageRange',
			title: "Tranche d'âge",
			type: 'string',
			description: 'Ex: 0-24 mois, 24-36 mois, etc.',
			validation: (Rule: Rule) => Rule.required(),
		},
		{
			name: 'description',
			title: 'Description',
			type: 'text',
			rows: 4,
			validation: (Rule: Rule) => Rule.required(),
		},
		{
			name: 'heroImage',
			title: 'Image hero',
			type: 'image',
			options: {
				hotspot: true,
			},
		},
		{
			name: 'content',
			title: 'Contenu détaillé',
			type: 'text',
			rows: 6,
		},
		{
			name: 'capacity',
			title: 'Capacité',
			type: 'number',
			validation: (Rule: Rule) => Rule.required().min(1),
		},
		{
			name: 'features',
			title: 'Caractéristiques',
			type: 'array',
			of: [{ type: 'string' }],
			description: 'Liste des caractéristiques du secteur',
		},
		{
			name: 'staff',
			title: 'Équipe',
			type: 'array',
			of: [
				{
					type: 'object',
					name: 'member',
					fields: [
						{
							name: 'name',
							title: 'Nom',
							type: 'string',
							validation: (Rule: Rule) => Rule.required(),
						},
						{
							name: 'role',
							title: 'Rôle',
							type: 'string',
							validation: (Rule: Rule) => Rule.required(),
						},
						{
							name: 'photo',
							title: 'Photo',
							type: 'image',
							options: {
								hotspot: true,
							},
						},
					],
					preview: {
						select: {
							title: 'name',
							subtitle: 'role',
							media: 'photo',
						},
					},
				},
			],
		},
		{
			name: 'gallery',
			title: 'Galerie',
			type: 'array',
			of: [
				{
					type: 'image',
					options: {
						hotspot: true,
					},
				},
			],
		},
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'ageRange',
			media: 'heroImage',
		},
	},
}
