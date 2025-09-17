import { type Rule, type SchemaTypeDefinition } from 'sanity'

export const schedule: SchemaTypeDefinition = {
	name: 'schedule',
	title: 'Horaires & Tarifs',
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
			name: 'openingHours',
			title: "Horaires d'ouverture",
			type: 'array',
			of: [
				{
					type: 'object',
					name: 'schedule',
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
					preview: {
						select: {
							title: 'day',
							subtitle: 'openTime',
						},
					},
				},
			],
		},
		{
			name: 'pricing',
			title: 'Tarifs',
			type: 'array',
			of: [
				{
					type: 'object',
					name: 'priceGroup',
					fields: [
						{
							name: 'title',
							title: 'Titre du groupe',
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
							name: 'prices',
							title: 'Tarifs',
							type: 'array',
							of: [
								{
									type: 'object',
									name: 'price',
									fields: [
										{
											name: 'service',
											title: 'Service',
											type: 'string',
											validation: (Rule: Rule) => Rule.required(),
										},
										{
											name: 'amount',
											title: 'Montant (CHF)',
											type: 'number',
											validation: (Rule: Rule) => Rule.required().min(0),
										},
										{
											name: 'period',
											title: 'Période',
											type: 'string',
											options: {
												list: [
													{ title: 'Par jour', value: 'day' },
													{ title: 'Par semaine', value: 'week' },
													{ title: 'Par mois', value: 'month' },
												],
											},
										},
									],
									preview: {
										select: {
											title: 'service',
											subtitle: 'amount',
										},
									},
								},
							],
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
			name: 'subsidies',
			title: 'Subventions',
			type: 'object',
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
					rows: 3,
				},
				{
					name: 'subsidyRates',
					title: 'Taux de subvention',
					type: 'array',
					of: [
						{
							type: 'object',
							name: 'rate',
							fields: [
								{
									name: 'incomeRange',
									title: 'Tranche de revenus',
									type: 'string',
									validation: (Rule: Rule) => Rule.required(),
								},
								{
									name: 'reduction',
									title: 'Réduction (CHF/jour)',
									type: 'number',
									validation: (Rule: Rule) => Rule.required().min(0),
								},
							],
							preview: {
								select: {
									title: 'incomeRange',
									subtitle: 'reduction',
								},
							},
						},
					],
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
