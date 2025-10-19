// Composant Hero réutilisable
import { type Rule, type SchemaTypeDefinition } from 'sanity'

export const heroHome: SchemaTypeDefinition = {
	name: 'heroHome',
	title: 'Hero Home',
	type: 'object',
	fields: [
		{
			name: 'title',
			title: 'Titre de bienvenue',
			type: 'string',
			initialValue: 'Bienvenue chez',
			validation: (Rule: Rule) => Rule.required().max(100),
		},
		{
			name: 'garderieName',
			title: 'Nom de la garderie',
			type: 'string',
			initialValue: "Les P'tits Loups",
			validation: (Rule: Rule) => Rule.required().max(100),
		},
		{
			name: 'logo',
			title: 'Logo',
			type: 'basicImage',
		},
		{
			name: 'description',
			title: 'Description',
			type: 'text',
			rows: 4,
		},
		{
			name: 'buttonText',
			title: 'Texte du bouton',
			type: 'string',
			initialValue: 'Nous contacter',
			validation: (Rule: Rule) => Rule.required().max(100),
		},
		{
			name: 'buttonLink',
			title: 'Lien du bouton',
			type: 'string',
			initialValue: '/contact',
			validation: (Rule: Rule) => Rule.required().max(100),
		},
	],
}

export const hero: SchemaTypeDefinition = {
	name: 'hero',
	title: 'Hero',
	type: 'object',
	fields: [
		{
			name: 'image',
			title: 'Image',
			type: 'basicImage',
		},
		// Small description pour un texte d'introduction dans un composant card.
		{
			name: 'description',
			title: "Texte d'introduction des pages.",
			type: 'text',
			rows: 4,
		},
	],
}
