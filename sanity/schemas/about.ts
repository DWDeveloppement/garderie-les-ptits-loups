import { type Rule, type SchemaTypeDefinition } from 'sanity'

export const about: SchemaTypeDefinition = {
	name: 'about',
	title: 'À propos',
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
			title: 'Description principale',
			type: 'text',
			rows: 6,
			validation: (Rule: Rule) => Rule.required(),
		},
		{
			name: 'mission',
			title: 'Notre mission',
			type: 'text',
			rows: 4,
		},
		{
			name: 'values',
			title: 'Nos valeurs',
			type: 'array',
			of: [
				{
					type: 'object',
					name: 'value',
					fields: [
						{
							name: 'title',
							title: 'Titre',
							type: 'string',
							validation: (Rule: Rule) => Rule.required(),
						},
						{
							name: 'description',
							title: 'Description',
							type: 'text',
							rows: 2,
						},
						{
							name: 'icon',
							title: 'Icône',
							type: 'string',
							options: {
								list: [
									{ title: 'Cœur', value: 'heart' },
									{ title: 'Étoile', value: 'star' },
									{ title: 'Main', value: 'hand' },
									{ title: 'Maison', value: 'home' },
								],
							},
						},
					],
					preview: {
						select: {
							title: 'title',
							subtitle: 'description',
						},
					},
				},
			],
		},
		{
			name: 'team',
			title: 'Notre équipe',
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
							title: 'Poste',
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
						{
							name: 'bio',
							title: 'Biographie',
							type: 'text',
							rows: 3,
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
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'subtitle',
			media: 'heroImage',
		},
	},
}
