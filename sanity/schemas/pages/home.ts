import { type Rule, type SchemaTypeDefinition } from 'sanity'
import { content, gallery, hero, imageParalax, seo, spacesComponent } from '../components'

// Désactivé: page fixe gérée dans le code Next
export const home: SchemaTypeDefinition = {
	name: 'home',
	title: "Page d'accueil",
	type: 'document',
	fields: [
		{
			name: 'title',
			title: 'Titre',
			type: 'string',
			validation: (Rule: Rule) => Rule.required().max(100),
		},
		// Tab Contenu de Page (ouvert par défaut)
		{
			name: 'content',
			title: 'Contenu de Page',
			type: 'object',
			options: {
				collapsible: false,
				collapsed: false,
			},
			fields: [
				{
					name: 'sectionHero',
					title: 'Section Hero',
					type: hero.name,
					options: {
						collapsible: true,
						collapsed: true,
					},
				},
				{
					name: 'sections',
					title: 'Sections de contenu',
					type: 'array',
					of: [
						{
							type: content.name,
						},
						{
							type: gallery.name,
						},
						{
							type: imageParalax.name,
						},
					],
				},
				{
					name: 'sectionStructure',
					title: 'Section La Structure',
					type: spacesComponent.name,
					options: {
						collapsible: true,
						collapsed: false,
					},
				},
			],
		},

		// Tab SEO (fermé par défaut)
		{
			name: 'seo',
			title: 'SEO',
			type: seo.name,
			options: {
				collapsible: true,
				collapsed: true,
			},
		},
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'sectionHero.subtitle',
			media: 'sectionHero.image',
		},
	},
}
