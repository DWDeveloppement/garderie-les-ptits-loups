import { PricesTypesProps } from '@/types/queries/prices'

// On exporte tous les prix pour un appel de data de sanity
export const allPrices: PricesTypesProps = {
	nursery: [
		{
			titlePrices: 'Prix au mois',
			mothPrices: [
				{
					accordionItem: 'Journée complète',
					accordionContent: [
						{
							prestation: '1 jour / semaine',
							price: 540,
						},
						{
							prestation: '2 jours / semaine',
							price: 1080,
						},
						{
							prestation: '3 jours / semaine',
							price: 1620,
						},
						{
							prestation: '4 jours / semaine',
							price: 2160,
						},
						{
							prestation: '5 jours / semaine',
							price: 2700,
						},
					],
				},
			],
		},
		{
			titlePrices: 'Prix au jour',
			daysPrices: [
				{
					accordionItem: 'journée',
					accordionContent: [
						{
							prestation: '1 jour / semaine',
							price: 135,
						},
					],
				},
				{
					accordionItem: 'matinée',
					accordionContent: [
						{
							prestation: 'de 7h.00 à 11h.15 (sans repas)',
							price: 80,
						},
						{
							prestation: 'de 7h.00 à 12h.30 (repas inclus)',
							price: 85,
						},
						{
							prestation: 'de 7h.00 à 14h.30 (repas et sieste inclus)',
							price: 85,
						},
					],
				},
				{
					accordionItem: 'Après-midi',
					accordionContent: [
						{
							prestation: 'de 14h.30 à 18h.00 (sans repas)',
							price: 80,
						},
						{
							prestation: 'de 14h.30 à 18h.00 (repas inclus)',
							price: 85,
						},
						{
							prestation: 'de 14h.30 à 18h.00 (repas et sieste inclus)',
							price: 85,
						},
					],
				},
			],
		},
	],
	trotteursGrands: [
		{
			titlePrices: 'Prix au mois',
			mothPrices: [
				{
					accordionItem: 'Journée complète',
					accordionContent: [
						{
							prestation: '1 jour / semaine',
							price: 540,
						},
						{
							prestation: '2 jours / semaine',
							price: 1080,
						},
						{
							prestation: '3 jours / semaine',
							price: 1620,
						},
						{
							prestation: '4 jours / semaine',
							price: 2160,
						},
						{
							prestation: '5 jours / semaine',
							price: 2700,
						},
					],
				},
			],
		},
		{
			titlePrices: 'Prix au jour',
			daysPrices: [
				{
					accordionItem: 'journée',
					accordionContent: [
						{
							prestation: '1 jour / semaine',
							price: 135,
						},
					],
				},
				{
					accordionItem: 'matinée',
					accordionContent: [
						{
							prestation: 'de 7h.00 à 11h.15 (sans repas)',
							price: 80,
						},
						{
							prestation: 'de 7h.00 à 12h.30 (repas inclus)',
							price: 85,
						},
						{
							prestation: 'de 7h.00 à 14h.30 (repas et sieste inclus)',
							price: 85,
						},
					],
				},
				{
					accordionItem: 'Après-midi',
					accordionContent: [
						{
							prestation: 'de 14h.30 à 18h.00 (sans repas)',
							price: 80,
						},
						{
							prestation: 'de 14h.30 à 18h.00 (repas inclus)',
							price: 85,
						},
						{
							prestation: 'de 14h.30 à 18h.00 (repas et sieste inclus)',
							price: 85,
						},
					],
				},
			],
		},
	],
	subsides: {
		titleSubsides: 'subsides communales',
		subsidesContent: [
			{
				label: 'de 3000 fr à 4000 fr...',
				reduction: 25.12, //float
			},
			{
				label: 'de 4000 fr à 5000 fr...',
				reduction: 25.12, //float
			},
			{
				label: 'de 5000 fr à 6000 fr...',
				reduction: 25.12, //float
			},
			//...
		],
	},
}
