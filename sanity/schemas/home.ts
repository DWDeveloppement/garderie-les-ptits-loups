import { type Rule, type SchemaTypeDefinition } from 'sanity'

export const home: SchemaTypeDefinition = {
	name: 'home',
	title: "Page d'accueil",
	type: 'document',
	fields: [
		{
			name: 'title',
			title: 'Titre',
			type: 'string',
			validation: (Rule: Rule) => Rule.required().max(100),
		},
		// Tab Contenu de Page (ouvert par défaut)
		{
			name: 'content',
			title: 'Contenu de Page',
			type: 'object',
			options: {
				collapsible: false,
				collapsed: false,
			},
			fields: [
				{
					name: 'sectionHero',
					title: 'Section Hero',
					type: 'object',
					options: {
						collapsible: true,
						collapsed: true,
					},
					fields: [
						{
							name: 'title',
							title: 'Titre principal',
							type: 'text',
							rows: 3,
							description: 'Titre principal de la page (peut inclure le nom de la garderie)',
							validation: (Rule: Rule) => Rule.required().max(200),
						},
						{
							name: 'subtitle',
							title: 'Sous-titre',
							type: 'string',
							validation: (Rule: Rule) => Rule.max(200),
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
				},
				{
					name: 'sectionStructure',
					title: 'Section La Structure',
					type: 'object',
					options: {
						collapsible: true,
						collapsed: false,
					},
					fields: [
						{
							name: 'title',
							title: 'Titre de la section',
							type: 'string',
							validation: (Rule: Rule) => Rule.required(),
						},
						{
							name: 'subtitle',
							title: 'Sous-titre',
							type: 'string',
							validation: (Rule: Rule) => Rule.max(200),
						},
						{
							// Bloc relationnel à une description formulée dans sectors.ts :Cartes des secteurs (format card)
							name: 'sectors',
							title: 'Cartes des secteurs (format card)',
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
				},
			],
		},

		// Tab SEO (fermé par défaut)
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
					title: 'Titre SEO (meta title)',
					type: 'string',
					description: 'Titre qui apparaît dans les résultats de recherche (max 60 caractères)',
					validation: (Rule: Rule) => Rule.max(60),
				},
				{
					name: 'metaDescription',
					title: 'Description SEO (meta description)',
					type: 'text',
					rows: 3,
					description: 'Description qui apparaît dans les résultats de recherche (max 160 caractères)',
					validation: (Rule: Rule) => Rule.max(160),
				},
				{
					name: 'keywords',
					title: 'Mots-clés',
					type: 'array',
					of: [{ type: 'string' }],
					description: 'Mots-clés pour le référencement',
				},
				{
					name: 'ogTitle',
					title: 'Titre Open Graph',
					type: 'string',
					description: 'Titre pour les réseaux sociaux (Facebook, LinkedIn, etc.)',
					validation: (Rule: Rule) => Rule.max(60),
				},
				{
					name: 'ogDescription',
					title: 'Description Open Graph',
					type: 'text',
					rows: 2,
					description: 'Description pour les réseaux sociaux',
					validation: (Rule: Rule) => Rule.max(160),
				},
				{
					name: 'ogImage',
					title: 'Image Open Graph',
					type: 'image',
					description: 'Image qui apparaît lors du partage sur les réseaux sociaux (1200x630px recommandé)',
					options: {
						hotspot: true,
					},
				},
				{
					name: 'twitterCard',
					title: 'Type de carte Twitter',
					type: 'string',
					options: {
						list: [
							{ title: 'Résumé', value: 'summary' },
							{ title: 'Résumé avec grande image', value: 'summary_large_image' },
						],
					},
					initialValue: 'summary_large_image',
				},
			],
		},
	],
	preview: {
		select: {
			title: 'sectionHero.title',
			subtitle: 'sectionHero.subtitle',
			media: 'sectionHero.heroImage',
		},
	},
}
