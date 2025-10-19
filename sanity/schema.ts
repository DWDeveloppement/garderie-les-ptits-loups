import { type SchemaTypeDefinition } from 'sanity'

// Import des schémas de base
import { aboutPage, contactPage, home, schedulePage, sectorPage, spacePage, testimonials } from './schemas'
// Import des composants réutilisables
import { basicImage, galleryImage, hero, heroHome, heroImage, paralaxImage, seo, seoImage } from './schemas/components'
// Import des schémas de prix
import { accordionItem, priceItem, prices, subsidyItem } from './schemas/prices'

// Définition du type code pour les blocs de code
const codeBlock: SchemaTypeDefinition = {
	name: 'code',
	title: 'Code',
	type: 'object',
	fields: [
		{
			name: 'code',
			title: 'Code',
			type: 'text',
			rows: 10,
		},
		{
			name: 'language',
			title: 'Langage',
			type: 'string',
			options: {
				list: [
					{ title: 'Plain Text', value: 'text' },
					{ title: 'JavaScript', value: 'javascript' },
					{ title: 'TypeScript', value: 'typescript' },
					{ title: 'HTML', value: 'html' },
					{ title: 'CSS', value: 'css' },
					{ title: 'JSON', value: 'json' },
				],
			},
			initialValue: 'text',
		},
	],
	preview: {
		select: {
			title: 'code',
			subtitle: 'language',
		},
		prepare(selection) {
			const { title, subtitle } = selection
			const preview = title ? title.substring(0, 50) + (title.length > 50 ? '...' : '') : 'Code vide'
			return {
				title: preview,
				subtitle: subtitle || 'text',
			}
		},
	},
}

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [
		// Type code personnalisé
		codeBlock,
		// Composants images (base et spécialisés)
		basicImage,
		heroImage,
		galleryImage,
		seoImage, // Legacy - À terme, remplacer par basicImage partout
		// Composants réutilisables
		seo,
		hero,
		heroHome,
		paralaxImage,
		// Pages Fixes
		home,
		aboutPage,
		contactPage,
		schedulePage,
		// Pages Secteurs (fixes)
		sectorPage,
		// Pages Espaces (fixes)
		spacePage,
		// Prix et Tarifs
		prices,
		accordionItem,
		priceItem,
		subsidyItem,
		// Témoignages
		testimonials,
	],
}
