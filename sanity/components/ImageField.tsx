import { type Rule } from 'sanity'

/**
 * Composant d'image field réutilisable
 * Permet de sélectionner une image depuis la médiathèque
 * et de définir le contexte d'usage pour les dimensions de sortie
 */

export const imageField = {
	type: 'object',
	name: 'imageField',
	title: 'Image',
	fields: [
		{
			name: 'asset',
			title: 'Image',
			type: 'reference',
			to: [{ type: 'assets' }],
			description: 'Sélectionnez une image depuis la médiathèque',
			validation: (Rule: Rule) => Rule.required().error("L'image est obligatoire"),
		},
		{
			name: 'usage',
			title: 'Contexte d\'usage',
			type: 'string',
			description: 'Définit les dimensions de sortie de l\'image',
			options: {
				list: [
					{ title: 'Hero (1920x1080)', value: 'hero' },
					{ title: 'Galerie (1200x800)', value: 'gallery' },
					{ title: 'Section (960x640)', value: 'section' },
					{ title: 'Miniature (400x300)', value: 'thumbnail' },
					{ title: 'Article (800x600)', value: 'article' },
					{ title: 'Autre (1000x1000)', value: 'other' },
				],
				layout: 'radio',
			},
			validation: (Rule: Rule) => Rule.required().error("Le contexte d'usage est obligatoire"),
		},
		{
			name: 'caption',
			title: 'Légende',
			type: 'string',
			description: 'Légende optionnelle de l\'image',
			validation: (Rule: Rule) => Rule.max(200),
		},
		{
			name: 'credit',
			title: 'Crédit photo',
			type: 'string',
			description: 'Photographe ou source de l\'image',
			validation: (Rule: Rule) => Rule.max(100),
		},
	],
	preview: {
		select: {
			title: 'asset.title',
			media: 'asset.asset',
			usage: 'usage',
		},
		prepare(selection) {
			const { title, media, usage } = selection
			const usageLabels = {
				hero: 'Hero (1920x1080)',
				gallery: 'Galerie (1200x800)',
				section: 'Section (960x640)',
				thumbnail: 'Miniature (400x300)',
				article: 'Article (800x600)',
				other: 'Autre (1000x1000)',
			}
			return {
				title: title || 'Sans titre',
				subtitle: usageLabels[usage as keyof typeof usageLabels] || 'Usage non défini',
				media,
			}
		},
	},
}
