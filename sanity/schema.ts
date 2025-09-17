import { type SchemaTypeDefinition } from 'sanity'
import { type SanityValidationRule } from '../src/types/sanity'

// Import des schémas de base
import { about, contact, home, schedule, sectors, spaces } from './schemas'

// ============================================================================
// SCHÉMAS POUR LES TARIFS ET SUBVENTIONS
// ============================================================================

// Schéma pour les éléments de prix
const priceItem = {
	name: 'priceItem',
	title: 'Élément de prix',
	type: 'object',
	fields: [
		{
			name: 'description',
			title: 'Description',
			type: 'string',
			validation: (Rule: SanityValidationRule) => Rule.required(),
		},
		{
			name: 'price',
			title: 'Prix (CHF)',
			type: 'number',
			validation: (Rule: SanityValidationRule) => Rule.required().min(0),
		},
	],
}

// Schéma pour les blocs de prix (journée complète, matinée, etc.)
const pricingBlock = {
	name: 'pricingBlock',
	title: 'Bloc de tarification',
	type: 'object',
	fields: [
		{
			name: 'label',
			title: 'Libellé',
			type: 'string',
			validation: (Rule: SanityValidationRule) => Rule.required(),
		},
		{
			name: 'items',
			title: 'Éléments de prix',
			type: 'array',
			of: [{ type: 'priceItem' }],
			validation: (Rule: SanityValidationRule) => Rule.required().min(1),
		},
	],
}

// Schéma pour les sections de prix (mensuel/journalier)
const pricingSection = {
	name: 'pricingSection',
	title: 'Section de tarification',
	type: 'object',
	fields: [
		{
			name: 'label',
			title: 'Libellé',
			type: 'string',
			validation: (Rule: SanityValidationRule) => Rule.required(),
		},
		{
			name: 'journeeComplete',
			title: 'Journée complète',
			type: 'pricingBlock',
		},
		{
			name: 'matinRepas',
			title: 'Matin avec repas',
			type: 'pricingBlock',
		},
		{
			name: 'matinSansRepas',
			title: 'Matin sans repas',
			type: 'pricingBlock',
		},
		{
			name: 'apresMidiRepas',
			title: 'Après-midi avec repas',
			type: 'pricingBlock',
		},
		{
			name: 'apresMidiSansRepas',
			title: 'Après-midi sans repas',
			type: 'pricingBlock',
		},
		{
			name: 'matinee',
			title: 'Matinée',
			type: 'pricingBlock',
		},
		{
			name: 'apresMidi',
			title: 'Après-midi',
			type: 'pricingBlock',
		},
	],
}

// Schéma pour les documents de prix
const priceDocument = {
	name: 'priceDocument',
	title: 'Document de tarifs',
	type: 'document',
	fields: [
		{
			name: 'title',
			title: 'Titre',
			type: 'string',
			validation: (Rule: SanityValidationRule) => Rule.required(),
		},
		{
			name: 'prixAuMois',
			title: 'Prix au mois',
			type: 'pricingSection',
		},
		{
			name: 'prixAuJour',
			title: 'Prix au jour',
			type: 'pricingSection',
		},
	],
}

// Schéma pour les éléments de subvention
const subsidyItem = {
	name: 'subsidyItem',
	title: 'Élément de subvention',
	type: 'object',
	fields: [
		{
			name: 'incomeRange',
			title: 'Tranche de revenus',
			type: 'string',
			validation: (Rule: SanityValidationRule) => Rule.required(),
		},
		{
			name: 'reductionDaily',
			title: 'Réduction journalière (CHF)',
			type: 'number',
			validation: (Rule: SanityValidationRule) => Rule.required().min(0),
		},
	],
}

// Schéma pour les documents de subventions
const subsidiesDocument = {
	name: 'subsidiesDocument',
	title: 'Document de subventions',
	type: 'document',
	fields: [
		{
			name: 'title',
			title: 'Titre',
			type: 'string',
			validation: (Rule: SanityValidationRule) => Rule.required(),
		},
		{
			name: 'labelIncomeRange',
			title: 'Libellé tranche de revenus',
			type: 'string',
			validation: (Rule: SanityValidationRule) => Rule.required(),
		},
		{
			name: 'labelReduction',
			title: 'Libellé réduction',
			type: 'string',
			validation: (Rule: SanityValidationRule) => Rule.required(),
		},
		{
			name: 'items',
			title: 'Éléments de subvention',
			type: 'array',
			of: [{ type: 'subsidyItem' }],
			validation: (Rule: SanityValidationRule) => Rule.required().min(1),
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
	types: [
		// Schémas de base
		home,
		about,
		contact,
		schedule,
		spaces,
		sectors,
		// Types de base pour les tarifs
		priceItem,
		pricingBlock,
		pricingSection,
		subsidyItem,
		// Documents principaux
		priceDocument,
		subsidiesDocument,
		// Contenu général
		activity,
		staff,
		news,
	],
}
