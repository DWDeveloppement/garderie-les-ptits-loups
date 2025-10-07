import { type Rule, type SchemaTypeDefinition } from 'sanity'

export const contactPage: SchemaTypeDefinition = {
	name: 'contactPage',
	title: 'Contact',
	type: 'document',
	fields: [
		{
			name: 'title',
			title: 'Titre',
			type: 'string',
			initialValue: 'Contact',
			validation: (Rule: Rule) => Rule.required(),
		},
	{
		name: 'slug',
		title: 'Slug (non modifiable)',
		type: 'slug',
		readOnly: true,
		initialValue: { current: 'contact' },
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
			name: 'contactInfo',
			title: 'Informations de Contact',
			type: 'object',
			fields: [
				{
					name: 'address',
					title: 'Adresse',
					type: 'string',
					validation: (Rule: Rule) => Rule.required(),
				},
				{
					name: 'phone',
					title: 'Téléphone',
					type: 'string',
					validation: (Rule: Rule) => Rule.required(),
				},
				{
					name: 'email',
					title: 'Email',
					type: 'string',
					validation: (Rule: Rule) => Rule.required().email(),
				},
				{
					name: 'hours',
					title: 'Horaires',
					type: 'text',
					rows: 3,
					validation: (Rule: Rule) => Rule.required(),
				},
			],
		},
		{
			name: 'map',
			title: 'Carte',
			type: 'object',
			fields: [
				{
					name: 'latitude',
					title: 'Latitude',
					type: 'number',
					validation: (Rule: Rule) => Rule.required(),
				},
				{
					name: 'longitude',
					title: 'Longitude',
					type: 'number',
					validation: (Rule: Rule) => Rule.required(),
				},
				{
					name: 'zoom',
					title: 'Zoom',
					type: 'number',
					initialValue: 15,
					validation: (Rule: Rule) => Rule.min(1).max(20),
				},
			],
		},
		{
			name: 'form',
			title: 'Formulaire de Contact',
			type: 'object',
			fields: [
				{
					name: 'title',
					title: 'Titre du formulaire',
					type: 'string',
					initialValue: 'Nous contacter',
				},
				{
					name: 'description',
					title: 'Description',
					type: 'text',
					rows: 2,
				},
				{
					name: 'fields',
					title: 'Champs du formulaire',
					type: 'array',
					of: [
						{
							type: 'object',
							fields: [
								{
									name: 'name',
									title: 'Nom du champ',
									type: 'string',
									validation: (Rule: Rule) => Rule.required(),
								},
								{
									name: 'type',
									title: 'Type',
									type: 'string',
									options: {
										list: [
											{ title: 'Texte', value: 'text' },
											{ title: 'Email', value: 'email' },
											{ title: 'Téléphone', value: 'tel' },
											{ title: 'Message', value: 'textarea' },
										],
									},
									validation: (Rule: Rule) => Rule.required(),
								},
								{
									name: 'required',
									title: 'Obligatoire',
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
					initialValue: "Contact - Garderie Les P'tits Loups",
					validation: (Rule: Rule) => Rule.max(60),
				},
				{
					name: 'metaDescription',
					title: 'Meta Description',
					type: 'text',
					rows: 3,
					initialValue: "Contactez-nous pour plus d'informations sur notre garderie et nos services.",
					validation: (Rule: Rule) => Rule.max(160),
				},
				{
					name: 'keywords',
					title: 'Mots-clés',
					type: 'array',
					of: [{ type: 'string' }],
					initialValue: ['contact', 'adresse', 'téléphone', 'email', 'horaires'],
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
