import { type Rule, type SchemaTypeDefinition } from 'sanity'

export const spaces: SchemaTypeDefinition = {
	name: 'spaces',
	title: 'Espaces',
	type: 'document',
	fields: [
		{
			name: 'title',
			title: 'Titre',
			type: 'string',
			validation: (Rule: Rule) => Rule.required().max(100),
		},
		{
			name: 'subtitle',
			title: 'Sous-titre',
			type: 'string',
			validation: (Rule: Rule) => Rule.max(200),
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
			name: 'description',
			title: 'Description générale',
			type: 'text',
			rows: 4,
			validation: (Rule: Rule) => Rule.required(),
		},
		{
			name: 'spaces',
			title: 'Espaces',
			type: 'array',
			of: [
				{
					type: 'object',
					name: 'space',
					fields: [
						{
							name: 'name',
							title: "Nom de l'espace",
							type: 'string',
							validation: (Rule: Rule) => Rule.required(),
						},
						{
							name: 'description',
							title: 'Description',
							type: 'text',
							rows: 3,
							validation: (Rule: Rule) => Rule.required(),
						},
						{
							name: 'capacity',
							title: 'Capacité',
							type: 'number',
							validation: (Rule: Rule) => Rule.required().min(1),
						},
						{
							name: 'ageGroup',
							title: "Groupe d'âge",
							type: 'string',
							options: {
								list: [
									{ title: '0-1 an', value: '0-1' },
									{ title: '1-2 ans', value: '1-2' },
									{ title: '2-3 ans', value: '2-3' },
									{ title: '3+ ans', value: '3+' },
									{ title: 'Tous âges', value: 'all' },
								],
							},
						},
						{
							name: 'features',
							title: 'Équipements',
							type: 'array',
							of: [{ type: 'string' }],
						},
						{
							name: 'images',
							title: 'Images',
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
							title: 'name',
							subtitle: 'description',
							media: 'images.0',
						},
					},
				},
			],
		},
		{
			name: 'gallery',
			title: 'Galerie générale',
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
			subtitle: 'subtitle',
			media: 'heroImage',
		},
	},
}
