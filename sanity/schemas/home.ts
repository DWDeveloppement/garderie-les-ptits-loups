import { type Rule, type SchemaTypeDefinition } from 'sanity'

export const home: SchemaTypeDefinition = {
	name: 'home',
	title: "Page d'accueil",
	type: 'document',
	fields: [
		{
			name: 'title',
			title: 'Titre principal',
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
			validation: (Rule: Rule) => Rule.required(),
		},
		{
			name: 'description',
			title: 'Description',
			type: 'text',
			rows: 4,
			validation: (Rule: Rule) => Rule.max(500),
		},
		{
			name: 'sections',
			title: 'Sections',
			type: 'array',
			of: [
				{
					type: 'object',
					name: 'section',
					fields: [
						{
							name: 'title',
							title: 'Titre de section',
							type: 'string',
							validation: (Rule: Rule) => Rule.required(),
						},
						{
							name: 'content',
							title: 'Contenu',
							type: 'text',
							rows: 3,
						},
						{
							name: 'image',
							title: 'Image',
							type: 'image',
							options: {
								hotspot: true,
							},
						},
					],
					preview: {
						select: {
							title: 'title',
							media: 'image',
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
