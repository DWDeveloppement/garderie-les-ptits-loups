import { type Rule, type SchemaTypeDefinition } from 'sanity'

export const schedulePage: SchemaTypeDefinition = {
	name: 'schedulePage',
	title: 'Horaires & Tarifs',
	type: 'document',
	fields: [
		{
			name: 'title',
			title: 'Titre',
			type: 'string',
			initialValue: 'Horaires & Tarifs',
			validation: (Rule: Rule) => Rule.required(),
		},
		{
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: {
				source: 'title',
				maxLength: 96,
			},
			initialValue: { current: 'horaires-tarifs' },
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
			name: 'hours',
			title: 'Horaires',
			type: 'object',
			fields: [
				{
					name: 'title',
					title: 'Titre de la section',
					type: 'string',
					initialValue: 'Nos horaires',
				},
				{
					name: 'description',
					title: 'Description',
					type: 'text',
					rows: 3,
				},
				{
					name: 'schedule',
					title: 'Planning',
					type: 'array',
					of: [
						{
							type: 'object',
							fields: [
								{
									name: 'day',
									title: 'Jour',
									type: 'string',
									options: {
										list: [
											{ title: 'Lundi', value: 'monday' },
											{ title: 'Mardi', value: 'tuesday' },
											{ title: 'Mercredi', value: 'wednesday' },
											{ title: 'Jeudi', value: 'thursday' },
											{ title: 'Vendredi', value: 'friday' },
											{ title: 'Samedi', value: 'saturday' },
											{ title: 'Dimanche', value: 'sunday' },
										],
									},
									validation: (Rule: Rule) => Rule.required(),
								},
								{
									name: 'openTime',
									title: "Heure d'ouverture",
									type: 'string',
									validation: (Rule: Rule) => Rule.required(),
								},
								{
									name: 'closeTime',
									title: 'Heure de fermeture',
									type: 'string',
									validation: (Rule: Rule) => Rule.required(),
								},
								{
									name: 'closed',
									title: 'Fermé',
									type: 'boolean',
									initialValue: false,
								},
							],
						},
					],
				},
			],
		},
		{
			name: 'pricing',
			title: 'Tarifs',
			type: 'object',
			fields: [
				{
					name: 'title',
					title: 'Titre de la section',
					type: 'string',
					initialValue: 'Nos tarifs',
				},
				{
					name: 'description',
					title: 'Description',
					type: 'text',
					rows: 3,
				},
				{
					name: 'sections',
					title: 'Sections de tarifs',
					type: 'array',
					of: [
						{
							type: 'object',
							fields: [
								{
									name: 'title',
									title: 'Titre de la section',
									type: 'string',
									validation: (Rule: Rule) => Rule.required(),
								},
								{
									name: 'ageRange',
									title: "Tranche d'âge",
									type: 'string',
									validation: (Rule: Rule) => Rule.required(),
								},
								{
									name: 'prices',
									title: 'Tarifs',
									type: 'array',
									of: [
										{
											type: 'object',
											fields: [
												{
													name: 'description',
													title: 'Description',
													type: 'string',
													validation: (Rule: Rule) => Rule.required(),
												},
												{
													name: 'price',
													title: 'Prix',
													type: 'number',
													validation: (Rule: Rule) => Rule.required().min(0),
												},
											],
										},
									],
								},
							],
						},
					],
				},
			],
		},
		{
			name: 'subsidies',
			title: 'Subventions',
			type: 'object',
			fields: [
				{
					name: 'title',
					title: 'Titre de la section',
					type: 'string',
					initialValue: 'Subventions communales',
				},
				{
					name: 'description',
					title: 'Description',
					type: 'text',
					rows: 3,
				},
				{
					name: 'table',
					title: 'Tableau des subventions',
					type: 'array',
					of: [
						{
							type: 'object',
							fields: [
								{
									name: 'incomeRange',
									title: 'Tranche de revenus',
									type: 'string',
									validation: (Rule: Rule) => Rule.required(),
								},
								{
									name: 'subsidy',
									title: 'Subvention',
									type: 'number',
									validation: (Rule: Rule) => Rule.required().min(0),
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
					initialValue: "Horaires & Tarifs - Garderie Les P'tits Loups",
					validation: (Rule: Rule) => Rule.max(60),
				},
				{
					name: 'metaDescription',
					title: 'Meta Description',
					type: 'text',
					rows: 3,
					initialValue: "Découvrez nos horaires, tarifs et subventions pour la garderie Les P'tits Loups.",
					validation: (Rule: Rule) => Rule.max(160),
				},
				{
					name: 'keywords',
					title: 'Mots-clés',
					type: 'array',
					of: [{ type: 'string' }],
					initialValue: ['horaires', 'tarifs', 'subventions', 'garderie', 'crèche'],
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
