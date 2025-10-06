import { type SchemaTypeDefinition } from 'sanity'

// Import des schémas de base
import { aboutPage, contactPage, home, schedulePage, sectors, spaces } from './schemas'
// Import des composants réutilisables
import { content, gallery, hero, imageParalax, seo, spacesComponent } from './schemas/components'
// Import des schémas de prix
import { priceItem, prices, subsidyItem } from './schemas/prices'

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [
		// Composants réutilisables
		seo,
		hero,
		gallery,
		content,
		spacesComponent,
		imageParalax,
		// Pages Fixes
		home,
		aboutPage,
		contactPage,
		schedulePage,
		// Sectors
		sectors,
		// Spaces
		spaces,
		// Prix et Tarifs
		prices,
		priceItem,
		subsidyItem,
		// Mediatheque (à ajouter)
	],
}
