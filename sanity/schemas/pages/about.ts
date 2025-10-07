import { type Rule, type SchemaTypeDefinition } from 'sanity'

// Désactivé: page fixe gérée dans le code Next
export const aboutPage: SchemaTypeDefinition = {
	name: 'aboutPage',
	title: 'À Propos',
	type: 'document',
	fields: [
		{
			name: 'title',
			title: 'Titre',
			type: 'string',
			initialValue: 'À Propos',
			validation: (Rule: Rule) => Rule.required(),
		},
		{
			name: 'slug',
			title: 'Slug (non modifiable)',
			type: 'slug',
			readOnly: true,
			initialValue: { current: 'a-propos' },
			validation: (Rule: Rule) => Rule.required(),
		},
		{
			name: 'heroImage',
			title: 'Image Hero',
			type: 'image',
			options: {
				hotspot: true,
			},
			fields: [
				{
					name: 'alt',
					title: 'Texte alternatif',
					type: 'string',
					validation: (Rule: Rule) => Rule.required(),
				},
			],
			validation: (Rule: Rule) => Rule.required(),
		},
		{
			name: 'content',
			title: 'Contenu',
			type: 'array',
			of: [
				{
					type: 'block',
				},
				{
					type: 'image',
					options: {
						hotspot: true,
					},
					fields: [
						{
							name: 'alt',
							title: 'Texte alternatif',
							type: 'string',
							validation: (Rule: Rule) => Rule.required(),
						},
					],
				},
			],
			validation: (Rule: Rule) => Rule.required(),
		},
		{
			name: 'team',
			title: 'Équipe',
			type: 'array',
			of: [
				{
					type: 'object',
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
							name: 'description',
							title: 'Description',
							type: 'text',
							rows: 3,
						},
						{
							name: 'photo',
							title: 'Photo',
							type: 'image',
							options: {
								hotspot: true,
							},
							fields: [
								{
									name: 'alt',
									title: 'Texte alternatif',
									type: 'string',
									validation: (Rule: Rule) => Rule.required(),
								},
							],
						},
					],
				},
			],
		},
		{
			name: 'seo',
			title: 'SEO',
			type: 'object',
			options: {
				collapsible: true,
				collapsed: true,
			},
			fields: [
				{
					name: 'metaTitle',
					title: 'Meta Title',
					type: 'string',
					initialValue: "À Propos - Garderie Les P'tits Loups",
					validation: (Rule: Rule) => Rule.max(60),
				},
				{
					name: 'metaDescription',
					title: 'Meta Description',
					type: 'text',
					rows: 3,
					initialValue: "Découvrez notre équipe et notre approche pédagogique pour l'épanouissement de votre enfant.",
					validation: (Rule: Rule) => Rule.max(160),
				},
				{
					name: 'keywords',
					title: 'Mots-clés',
					type: 'array',
					of: [{ type: 'string' }],
					initialValue: ['équipe', 'pédagogie', 'épanouissement', 'garderie', 'crèche'],
				},
			],
		},
	],
	preview: {
		select: {
			title: 'title',
			media: 'heroImage',
		},
	},
}
