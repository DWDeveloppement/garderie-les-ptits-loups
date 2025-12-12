// Schema pour les prix et subventions
// 5 documents séparés : 4 accordéons + 1 tableau de subventions
// Interface conditionnelle selon le type de document

import { type Rule, type SchemaTypeDefinition } from 'sanity'
import { portableTextWithBlockquotes } from './components/portableTextConfig'

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
			hidden: ({ document }: any) => (document as any)?.documentType !== 'accordion',
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
				Rule.custom((val: unknown, ctx: any) => ((ctx?.document as any)?.documentType === 'accordion' ? (val ? true : 'Requis pour les tarifs accordéon') : true)),
		},
		{
			name: 'accordionItems',
			title: 'Liste des prestations',
			type: 'array',
			hidden: ({ document }: any) => (document as any)?.documentType !== 'accordion',
			of: [{ type: 'accordionItem' }],
			validation: (Rule: Rule) =>
				Rule.custom((val: unknown, ctx: any) =>
					(ctx?.document as any)?.documentType === 'accordion' ? (Array.isArray(val) && val.length > 0 ? true : 'Au moins un item requis') : true
				),
		},
		{
			name: 'tableSubsidiesInfo',
			title: 'Information importante sur les subventions',
			type: 'array',
			of: portableTextWithBlockquotes,
			hidden: ({ document }: any) => (document as any)?.documentType !== 'table',
			validation: (Rule: Rule) =>
			  Rule.custom((val: unknown, ctx: any) => {
				const doc = ctx?.document as any
				// Si ce n'est PAS un document "table" (subventions), on ne valide pas ce champ
				if (doc?.documentType !== 'table') {
				  return true
				}
		  
				if (!val || !Array.isArray(val) || val.length === 0) {
				  return 'Information requise pour le tableau des subventions'
				}
		  
				// Si tu veux garder une limite, tu peux adapter ce check
				if (val.length > 200) {
				  return 'Maximum 200 blocs de texte'
				}
		  
				return true
			  }),
			description: 'Information importante sur les subventions',
		  },
		  {
			name: 'tableContent',
			title: 'Contenu du tableau',
			type: 'object',
			hidden: ({ document }: any) => (document as any)?.documentType !== 'table',
			fields: [
			  {
				name: 'incomeRangeTitle',
				title: 'Titre des revenus',
				type: 'string',
				validation: (Rule: Rule) =>
				  Rule.custom((val: unknown, ctx: any) => {
					const doc = ctx?.document as any
					if (doc?.documentType !== 'table') {
					  return true
					}
					return val ? true : 'Titre des revenus requis pour le tableau des subventions'
				  }),
			  },
			  {
				name: 'reductionTitle',
				title: 'Titre du montant',
				type: 'string',
				validation: (Rule: Rule) =>
				  Rule.custom((val: unknown, ctx: any) => {
					const doc = ctx?.document as any
					if (doc?.documentType !== 'table') {
					  return true
					}
					return val ? true : 'Titre du montant requis pour le tableau des subventions'
				  }),
			  },
			  {
				name: 'subsidyItems',
				title: 'Items de subvention',
				type: 'array',
				of: [{ type: 'subsidyItem' }],
				validation: (Rule: Rule) =>
				  Rule.custom((val: unknown, ctx: any) => {
					const doc = ctx?.document as any
					if (doc?.documentType !== 'table') {
					  return true
					}
					return Array.isArray(val) && val.length > 0 ? true : 'Au moins une ligne de subvention'
				  }),
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
		prepare(selection: { title?: string; documentType?: string; frequentationType?: string }) {
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
			let subtitle = (documentType && typeLabels[documentType]) || documentType || ''
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
	title: 'Prestation',
	type: 'object',
	fields: [
		{
			name: 'accordionTitle',
			title: 'Type de prestation',
			type: 'string',
			placeholder: 'Ex: "Journée Complète", "Matin avec repas", "Après-midi sans repas"',
			description: 'Nom de la prestation (sera affiché comme titre de l\'accordéon)',
			validation: (Rule: Rule) => Rule.required(),
		},
		{
			name: 'priceItems',
			title: 'Tarifs détaillés',
			type: 'array',
			description: 'Liste des prix selon la fréquence (1 jour/semaine, 2 jours/semaine, etc.)',
			of: [{ type: 'priceItem' }],
			validation: (Rule: Rule) => Rule.required().min(1),
		},
	],
	preview: {
		select: {
			title: 'accordionTitle',
			priceItems: 'priceItems',
		},
		prepare(selection: { title?: string; priceItems?: unknown[] }) {
			const { title, priceItems } = selection
			const itemCount = priceItems ? priceItems.length : 0
			return {
				title: title || 'Sans titre',
				subtitle: `${itemCount} item(s) de prix`,
			}
		},
	},
}

// Composant pour les items de prix (dans les accordéons)
export const priceItem: SchemaTypeDefinition = {
	name: 'priceItem',
	title: 'Tarif',
	type: 'object',
	fields: [
		{
			name: 'service',
			title: 'Fréquence / Description',
			type: 'string',
			placeholder: 'Ex: "1 jour / semaine" ou "de 7h.00 à 18h.00 (repas inclus)"',
			description: 'Description de la fréquence ou des horaires',
			validation: (Rule: Rule) => Rule.required(),
		},
		{
			name: 'price',
			title: 'Prix (CHF)',
			type: 'string',
			placeholder: 'Ex: "540.-" ou "123.50"',
			validation: (Rule: Rule) => Rule.required(),
			description: 'Montant en francs suisses : "540.-" (sans centimes) ou "123.50" (avec centimes)',
		},
	],
	preview: {
		select: {
			service: 'service',
			price: 'price',
		},
		prepare(selection: { service?: string; price?: string }) {
			const { service, price } = selection
			return {
				title: service || 'Sans titre',
				subtitle: price ? `${price} CHF` : '',
			}
		},
	},
}

// Composant pour les items de subvention (tableau)
export const subsidyItem: SchemaTypeDefinition = {
	name: 'subsidyItem',
	title: 'Ligne de subvention',
	type: 'object',
	fields: [
		{
			name: 'incomeRange',
			title: 'Tranche de revenus annuels',
			type: 'string',
			placeholder: 'Ex: "De CHF 60\'001 à CHF 66\'000" ou "Moins de CHF 60\'000"',
			description: 'Tranche de revenus familiaux annuels',
			validation: (Rule: Rule) => Rule.required(),
		},
		{
			name: 'subsidy',
			title: 'Subvention accordée (CHF/jour)',
			type: 'string',
			placeholder: 'Ex: "74.77" ou "45.-"',
			validation: (Rule: Rule) => Rule.required(),
			description: 'Montant de la subvention par jour : "74.77" (avec centimes) ou "45.-" (sans centimes)',
		},
	],
	preview: {
		select: {
			incomeRange: 'incomeRange',
			subsidy: 'subsidy',
		},
		prepare(selection: { incomeRange?: string; subsidy?: string }) {
			const { incomeRange, subsidy } = selection
			return {
				title: incomeRange || 'Sans titre',
				subtitle: subsidy ? `${subsidy} CHF/jour` : '',
			}
		},
	},
}
