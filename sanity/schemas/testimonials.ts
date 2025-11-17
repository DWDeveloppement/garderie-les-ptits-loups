import { type Rule, type SchemaTypeDefinition } from 'sanity'

// Désactivé: page fixe gérée dans le code Next
export const testimonials: SchemaTypeDefinition = {
	name: 'testimonials',
	title: 'Témoignages',
	type: 'document',
	icon: () => '🎉',
	fields: [
		{
			name: 'title',
			title: 'Titre',
			type: 'string',
			initialValue: 'Témoignages',
			validation: (Rule: Rule) => Rule.required(),
		},
		{
			name: 'information',
			title: 'Information',
			type: 'text',
			rows: 10,
			validation: (Rule: Rule) => Rule.required(),
		},
		{
			name: 'signature',
			title: 'Signature',
			type: 'string',
			validation: (Rule: Rule) => Rule.required(),
		},
	],
	preview: {
		select: {
			title: 'title',
			signature: 'signature',
		},
		prepare(selection) {
			return {
				title: selection.title,
				subtitle: selection.signature,
			}
		},
	},
}
