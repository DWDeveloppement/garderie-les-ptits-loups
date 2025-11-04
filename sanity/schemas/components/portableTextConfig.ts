// Configuration réutilisable pour les blocs Portable Text avec support de l'alignement
// Permet d'avoir des styles d'alignement dans le menu déroulant de styles (comme h1, h2, etc.)

import { type Rule } from 'sanity'

export const portableTextBlockConfig = {
	type: 'block',
	styles: [
		{ title: 'Normal', value: 'normal' },
		{ title: 'Titre 1', value: 'h1' },
		{ title: 'Titre 2', value: 'h2' },
		{ title: 'Titre 3', value: 'h3' },
		{ title: 'Titre 4', value: 'h4' },
		{ title: 'Titre 5', value: 'h5' },
		{ title: 'Titre 6', value: 'h6' },
		{ title: 'Citation', value: 'blockquote' },
		// Styles d'alignement (apparaissent dans le menu déroulant de styles)
		{ title: 'Paragraphe - Gauche', value: 'text-left' },
		{ title: 'Paragraphe - Centre', value: 'text-center' },
		{ title: 'Paragraphe - Droite', value: 'text-right' },
		{ title: 'Paragraphe - Justifié', value: 'text-justify' },
	],
	marks: {
		decorators: [
			{ title: 'Gras', value: 'strong' },
			{ title: 'Italique', value: 'em' },
			{ title: 'Souligné', value: 'underline' },
			{ title: 'Code', value: 'code' },
		],
		annotations: [
			{
				name: 'link',
				type: 'object',
				title: 'Lien',
				fields: [
					{
						name: 'href',
						type: 'url',
						title: 'URL',
						validation: (rule: Rule) =>
							rule.uri({
								allowRelative: true,
								scheme: ['http', 'https', 'mailto', 'tel'],
							}),
					},
				],
			},
			{
				name: 'textAlign',
				type: 'object',
				title: 'Alignement du texte',
				fields: [
					{
						name: 'align',
						type: 'string',
						title: 'Alignement',
						options: {
							list: [
								{ title: 'Gauche', value: 'left' },
								{ title: 'Centre', value: 'center' },
								{ title: 'Droite', value: 'right' },
								{ title: 'Justifié', value: 'justify' },
							],
						},
						initialValue: 'left',
					},
				],
			},
		],
	},
}
