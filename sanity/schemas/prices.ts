// Schema pour les prix et subventions
// 5 documents séparés : 4 accordéons + 1 tableau de subventions
// Interface conditionnelle selon le type de document

import { SchemaTypeDefinition, type Rule } from 'sanity'
import { portableTextBlockConfig } from './components/portableTextConfig'
// Document principal pour les prix
export const prices: SchemaTypeDefinition = {
	name: 'prices',
	title: 'Prix et Tarifs',
	type: 'document',
	fields: [
		{
			name: 'title',
			title: 'Titre du document',
			type: 'string',
			placeholder: 'Ex: "Tarifs au mois" ou "Prestations quotidiennes"',
			validation: (Rule: Rule) => Rule.required(),
			description: 'Titre descriptif pour identifier ce document de prix',
		},
		{
			name: 'documentType',
			title: 'Type de document',
			type: 'string',
			options: {
				list: [
					{
						title: 'Tarifs mensuels/journaliers',
						value: 'accordion',
						label: 'Interface pour gérer les tarifs mensuels et journaliers',
					},
					{
						title: 'Subventions',
						value: 'table',
						label: 'Interface tableau pour gérer les subventions',
					},
				],
			},
			validation: (Rule: Rule) => Rule.required(),
		},
		// Champs conditionnels selon le type de document
		{
			name: 'frequentationType',
			title: 'Type de fréquentation',
			type: 'string',
			hidden: ({ document }) => document?.documentType !== 'accordion',
			options: {
				list: [
					{
						title: 'Prix au mois (Nurserie)',
						value: 'monthly-nursery',
						label: 'Tarifs mensuels pour la Nurserie',
					},
					{
						title: 'Prix au jour (Nurserie)',
						value: 'daily-nursery',
						label: 'Tarifs journaliers pour la Nurserie',
					},
					{
						title: 'Prix au mois (Trotteurs & Grands)',
						value: 'monthly-trotteurs-grands',
						label: 'Tarifs mensuels pour les Trotteurs et Grands',
					},
					{
						title: 'Prix au jour (Trotteurs & Grands)',
						value: 'daily-trotteurs-grands',
						label: 'Tarifs journaliers pour les Trotteurs et Grands',
					},
				],
			},
			validation: (Rule: Rule) =>
				Rule.custom((val, ctx) => (ctx?.document?.documentType === 'accordion' ? (val ? true : 'Requis pour les tarifs accordéon') : true)),
		},
		{
			name: 'accordionItems',
			title: 'AccordionItems',
			type: 'array',
			hidden: ({ document }) => document?.documentType !== 'accordion',
			of: [{ type: 'accordionItem' }],
			validation: (Rule: Rule) =>
				Rule.custom((val, ctx) =>
					ctx?.document?.documentType === 'accordion' ? (Array.isArray(val) && val.length > 0 ? true : 'Au moins un item requis') : true
				),
		},
		{
			name: 'tableSubsidiesInfo',
			title: 'Information importante sur les subventions',
			type: 'array',
			of: [portableTextBlockConfig],
			hidden: ({ document }) => document?.documentType !== 'table',
			validation: (Rule: Rule) => Rule.required().max(200),
			description: 'Information importante sur les subventions',
		},
		{
			name: 'tableContent',
			title: 'Contenu du tableau',
			type: 'object',
			hidden: ({ document }) => document?.documentType !== 'table',
			fields: [
				{
					name: 'incomeRangeTitle',
					title: 'Titre des revenus',
					type: 'string',
					validation: (Rule: Rule) => Rule.required(),
				},
				{
					name: 'reductionTitle',
					title: 'Titre du montant',
					type: 'string',
					validation: (Rule: Rule) => Rule.required(),
				},
				{
					name: 'subsidyItems',
					title: 'Items de subvention',
					type: 'array',
					of: [{ type: 'subsidyItem' }],
					validation: (Rule: Rule) =>
						Rule.custom((val, ctx) =>
							ctx?.document?.documentType === 'table'
								? Array.isArray(val) && val.length > 0
									? true
									: 'Au moins une ligne de subvention'
								: true
						),
				},
			],
		},
	],
	preview: {
		select: {
			title: 'title',
			documentType: 'documentType',
			frequentationType: 'frequentationType',
		},
		prepare(selection) {
			const { title, documentType, frequentationType } = selection

			// Labels pour les types de fréquentation
			const frequentationLabels: { [key: string]: string } = {
				'monthly-nursery': 'Mensuel - Nurserie',
				'daily-nursery': 'Journalier - Nurserie',
				'monthly-trotteurs-grands': 'Mensuel - Trotteurs & Grands',
				'daily-trotteurs-grands': 'Journalier - Trotteurs & Grands',
			}

			// Labels pour les types de document
			const typeLabels: { [key: string]: string } = {
				accordion: 'Tarifs',
				table: 'Subventions',
			}

			// Sous-titre : Type + Fréquentation
			let subtitle = typeLabels[documentType] || documentType
			if (frequentationType && frequentationLabels[frequentationType]) {
				subtitle = frequentationLabels[frequentationType]
			}

			return {
				title: title || 'Sans titre',
				subtitle: subtitle,
			}
		},
	},
}

// Composant pour les items d'accordéon
export const accordionItem: SchemaTypeDefinition = {
	name: 'accordionItem',
	title: 'AccordionItem',
	type: 'object',
	fields: [
		{
			name: 'accordionTitle',
			title: 'AccordionTrigger',
			type: 'string',
			validation: (Rule: Rule) => Rule.required(),
		},
		{
			name: 'priceItems',
			title: 'Items de prix',
			type: 'array',
			of: [{ type: 'priceItem' }],
			validation: (Rule: Rule) => Rule.required().min(1),
		},
	],
	preview: {
		select: {
			title: 'accordionTitle',
			priceItems: 'priceItems',
		},
		prepare(selection) {
			const { title, priceItems } = selection
			const itemCount = priceItems ? priceItems.length : 0
			return {
				title: title,
				subtitle: `${itemCount} item(s) de prix`,
			}
		},
	},
}

// Composant pour les items de prix (dans les accordéons)
export const priceItem: SchemaTypeDefinition = {
	name: 'priceItem',
	title: 'Item de prix',
	type: 'object',
	fields: [
		{
			name: 'service',
			title: 'Prestation',
			type: 'string',
			validation: (Rule: Rule) => Rule.required(),
		},
		{
			name: 'price',
			title: 'Prix (CHF)',
			type: 'string',
			placeholder: 'Ex: "22.-" ou "33.25"',
			validation: (Rule: Rule) => Rule.required(),
			description: 'Format texte: "22.-" (sans centimes) ou "33.25" (avec centimes)',
		},
	],
	preview: {
		select: {
			title: 'service',
			subtitle: 'price',
		},
		prepare(selection) {
			const { title, subtitle } = selection
			return {
				title: title,
				subtitle: `${subtitle} CHF`,
			}
		},
	},
}

// Composant pour les items de subvention (tableau)
export const subsidyItem: SchemaTypeDefinition = {
	name: 'subsidyItem',
	title: 'Item de subvention',
	type: 'object',
	fields: [
		{
			name: 'incomeRange',
			title: 'Revenus annuels familiaux',
			type: 'string',
			validation: (Rule: Rule) => Rule.required(),
		},
		{
			name: 'subsidy',
			title: 'Subvention (CHF/jour)',
			type: 'string',
			placeholder: 'Ex: "45.-" ou "45.50"',
			validation: (Rule: Rule) => Rule.required(),
			description: 'Format texte: "45.-" (sans centimes) ou "45.50" (avec centimes)',
		},
	],
	preview: {
		select: {
			title: 'incomeRange',
			subtitle: 'subsidy',
		},
		prepare(selection) {
			const { title, subtitle } = selection
			return {
				title: title,
				subtitle: `${subtitle} CHF/jour`,
			}
		},
	},
}
