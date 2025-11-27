// Exemple de schéma pour une page de contenu
import { type Rule, type SchemaTypeDefinition } from 'sanity'
import { portableTextWithBlockquotes } from '../components/portableTextConfig'

export const exemplePage: SchemaTypeDefinition = {
	name: 'exemplePage',
	title: 'Exemple de page de contenu',
	type: 'document',
	fields: [
		{
			name: 'title',
			title: 'Titre',
			type: 'string',
			initialValue: 'Exemple de page de contenu',
			validation: (Rule: Rule) => Rule.required(),
		},
		{
			name: 'content',
			title: 'Contenu',
			type: 'array',
			of: portableTextWithBlockquotes,
			validation: (Rule: Rule) => Rule.required(),
		},
	],
}
