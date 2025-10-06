// Composant Spaces réutilisable
import { type SchemaTypeDefinition } from 'sanity'

export const spacesComponent: SchemaTypeDefinition = {
	name: 'spacesComponent',
	title: 'Spaces',
	type: 'object',
	fields: [
		{
			name: 'title',
			title: 'Titre de la section',
			type: 'string',
		},
		{
			name: 'description',
			title: 'Description',
			type: 'text',
			rows: 3,
		},
		{
			name: 'spaces',
			title: 'Espaces',
			type: 'array',
			of: [
				{
					type: 'reference',
					to: [{ type: 'spaces' }],
				},
			],
		},
	],
}
