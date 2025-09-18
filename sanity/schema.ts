import { type SchemaTypeDefinition } from 'sanity'

// Import des schémas de base
import { about, contact, customAsset, home, schedule, sectors, spaces } from './schemas'

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [
		// Schémas de base
		home,
		about,
		contact,
		schedule,
		spaces,
		sectors,
		customAsset,
	],
}
