/*
 * @name legacyPage
 * @description Schema pour les pages de contenu legacy
 * @description Ces pages sont utilisées pour stocker du contenu qui n'est plus utilisé dans l'application
 */

import { type Rule, type SchemaTypeDefinition } from 'sanity'
import { portableTextWithBlockquotes } from '../components/portableTextConfig'

export const legacyPage: SchemaTypeDefinition = {
	name: 'legacyPage',
	title: 'Page de contenu legacy',
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
