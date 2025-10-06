// Schema pour les prix et subventions
// 5 documents séparés : 4 accordéons + 1 tableau de subventions
// Interface conditionnelle selon le type de document

import { SchemaTypeDefinition, type Rule } from 'sanity'

// Document principal pour les prix
export const prices: SchemaTypeDefinition = {
	name: 'prices',
	title: 'Prix et Tarifs',
	type: 'document',
	fields: [
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
			validation: (Rule: Rule) => Rule.required(),
		},
		{
			name: 'accordionItems',
			title: 'AccordionItems',
			type: 'array',
			hidden: ({ document }) => document?.documentType !== 'accordion',
			of: [{ type: 'accordionItem' }],
			validation: (Rule: Rule) => Rule.required().min(1),
		},
		{
			name: 'tableContent',
			title: 'Contenu du tableau',
			type: 'object',
			hidden: ({ document }) => document?.documentType !== 'table',
			fields: [
				{
					name: 'subsidyItems',
					title: 'Items de subvention',
					type: 'array',
					of: [{ type: 'subsidyItem' }],
					validation: (Rule: Rule) => Rule.required().min(1),
				},
			],
		},
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'documentType',
			frequentationType: 'frequentationType',
		},
		prepare(selection) {
			const { title, subtitle, frequentationType } = selection

			// Labels pour les types de fréquentation
			const frequentationLabels: { [key: string]: string } = {
				'monthly-nursery': 'Tarifs mensuels (Nurserie)',
				'daily-nursery': 'Tarifs journaliers (Nurserie)',
				'monthly-trotteurs-grands': 'Tarifs mensuels (Trotteurs & Grands)',
				'daily-trotteurs-grands': 'Tarifs journaliers (Trotteurs & Grands)',
			}

			// Labels pour les types de document
			const typeLabels: { [key: string]: string } = {
				accordion: 'Tarifs mensuels',
				table: 'Subventions',
			}

			// Utiliser le label de fréquentation comme titre principal si disponible
			let mainTitle = frequentationType && frequentationLabels[frequentationType] ? frequentationLabels[frequentationType] : title

			// Pour les documents de type "table" (subventions), utiliser un titre par défaut
			if (subtitle === 'table' && !mainTitle) {
				mainTitle = 'Subventions'
			}

			return {
				title: mainTitle,
				subtitle: typeLabels[subtitle] || subtitle,
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
			name: 'priceContent',
			title: 'AccordionContent',
			type: 'array',
			of: [{ type: 'block' }, { type: 'code' }],
			validation: (Rule: Rule) => Rule.required().min(1),
		},
	],
	preview: {
		select: {
			title: 'accordionTitle',
			subtitle: 'priceContent',
		},
		prepare(selection) {
			const { title, subtitle } = selection
			const hasContent = subtitle && subtitle.length > 0
			return {
				title: title,
				subtitle: hasContent ? 'Contenu riche' : 'Aucun contenu',
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
			type: 'number',
			validation: (Rule: Rule) => Rule.required().min(0),
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
			type: 'number',
			validation: (Rule: Rule) => Rule.required().min(0),
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
