import { type Rule, type SchemaTypeDefinition } from 'sanity'

export const contact: SchemaTypeDefinition = {
	name: 'contact',
	title: 'Contact',
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
			name: 'address',
			title: 'Adresse',
			type: 'object',
			fields: [
				{
					name: 'street',
					title: 'Rue',
					type: 'string',
					validation: (Rule: Rule) => Rule.required(),
				},
				{
					name: 'city',
					title: 'Ville',
					type: 'string',
					validation: (Rule: Rule) => Rule.required(),
				},
				{
					name: 'postalCode',
					title: 'Code postal',
					type: 'string',
					validation: (Rule: Rule) => Rule.required(),
				},
				{
					name: 'country',
					title: 'Pays',
					type: 'string',
					initialValue: 'Suisse',
				},
			],
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
			name: 'mapImage',
			title: 'Image de la carte',
			type: 'image',
			options: {
				hotspot: true,
			},
		},
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'phone',
		},
	},
}
