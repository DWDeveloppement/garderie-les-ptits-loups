// Composant SEO réutilisable
import { type SchemaTypeDefinition } from 'sanity'

export const seo: SchemaTypeDefinition = {
	name: 'seo',
	title: 'SEO',
	type: 'object',
	fields: [
		{
			name: 'metaTitle',
			title: 'Meta Title',
			type: 'string',
		},
		{
			name: 'metaDescription',
			title: 'Meta Description',
			type: 'text',
			rows: 3,
		},
		{
			name: 'keywords',
			title: 'Mots-clés',
			type: 'array',
			of: [{ type: 'string' }],
		},
	],
}
