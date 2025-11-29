/* Schema pour la page de politique de confidentialité
 * @name privatePolicyPage
 * @description Schema pour la page de politique de confidentialité
 */

import { type Rule, type SchemaTypeDefinition } from 'sanity'
import { portableTextWithBlockquotes } from '../components/portableTextConfig'

export const privatePolicyPage: SchemaTypeDefinition = {
	name: 'privatePolicyPage',
	title: 'Politique de Confidentialité',
	type: 'document',
	fields: [
		{
			name: 'title',
			title: 'Titre',
			type: 'string',
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
	preview: {
		select: {
			title: 'title',
		},
	},
} as SchemaTypeDefinition
