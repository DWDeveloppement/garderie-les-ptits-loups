import { type SchemaTypeDefinition } from 'sanity'
import { type SanityValidationRule } from '../src/types/sanity'

// Schéma pour les enfants
const child = {
	name: 'child',
	title: 'Enfant',
	type: 'document',
	fields: [
		{
			name: 'firstName',
			title: 'Prénom',
			type: 'string',
			validation: (Rule: SanityValidationRule) => Rule.required(),
		},
		{
			name: 'lastName',
			title: 'Nom de famille',
			type: 'string',
			validation: (Rule: SanityValidationRule) => Rule.required(),
		},
		{
			name: 'birthDate',
			title: 'Date de naissance',
			type: 'date',
			validation: (Rule: SanityValidationRule) => Rule.required(),
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
			name: 'allergies',
			title: 'Allergies',
			type: 'text',
		},
		{
			name: 'emergencyContact',
			title: "Contact d'urgence",
			type: 'object',
			fields: [
				{
					name: 'name',
					title: 'Nom',
					type: 'string',
				},
				{
					name: 'phone',
					title: 'Téléphone',
					type: 'string',
				},
				{
					name: 'relationship',
					title: 'Lien de parenté',
					type: 'string',
				},
			],
		},
	],
}

// Schéma pour les activités
const activity = {
	name: 'activity',
	title: 'Activité',
	type: 'document',
	fields: [
		{
			name: 'title',
			title: 'Titre',
			type: 'string',
			validation: (Rule: SanityValidationRule) => Rule.required(),
		},
		{
			name: 'description',
			title: 'Description',
			type: 'text',
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
				],
			},
		},
		{
			name: 'duration',
			title: 'Durée (minutes)',
			type: 'number',
		},
		{
			name: 'materials',
			title: 'Matériel nécessaire',
			type: 'array',
			of: [{ type: 'string' }],
		},
		{
			name: 'photos',
			title: 'Photos',
			type: 'array',
			of: [{ type: 'image' }],
		},
	],
}

// Schéma pour l'équipe
const staff = {
	name: 'staff',
	title: 'Équipe',
	type: 'document',
	fields: [
		{
			name: 'firstName',
			title: 'Prénom',
			type: 'string',
			validation: (Rule: SanityValidationRule) => Rule.required(),
		},
		{
			name: 'lastName',
			title: 'Nom',
			type: 'string',
			validation: (Rule: SanityValidationRule) => Rule.required(),
		},
		{
			name: 'role',
			title: 'Poste',
			type: 'string',
			validation: (Rule: SanityValidationRule) => Rule.required(),
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
		},
		{
			name: 'qualifications',
			title: 'Qualifications',
			type: 'array',
			of: [{ type: 'string' }],
		},
	],
}

// Schéma pour les actualités
const news = {
	name: 'news',
	title: 'Actualités',
	type: 'document',
	fields: [
		{
			name: 'title',
			title: 'Titre',
			type: 'string',
			validation: (Rule: SanityValidationRule) => Rule.required(),
		},
		{
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: {
				source: 'title',
				maxLength: 96,
			},
			validation: (Rule: SanityValidationRule) => Rule.required(),
		},
		{
			name: 'excerpt',
			title: 'Extrait',
			type: 'text',
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
				},
			],
		},
		{
			name: 'publishedAt',
			title: 'Date de publication',
			type: 'datetime',
			validation: (Rule: SanityValidationRule) => Rule.required(),
		},
		{
			name: 'featured',
			title: 'Article en vedette',
			type: 'boolean',
			initialValue: false,
		},
	],
}

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [child, activity, staff, news],
}
