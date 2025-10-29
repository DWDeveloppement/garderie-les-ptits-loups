import { type Rule, type SchemaTypeDefinition } from 'sanity'
import { ReadOnlySlug } from '../../components/ReadOnlySlug'
import { hero, paralaxImage, seo } from '../components'

export const contactPage: SchemaTypeDefinition = {
	name: 'contactPage',
	title: 'Contact',
	type: 'document',
	fields: [
		{
			name: 'title',
			title: 'Titre',
			type: 'string',
			initialValue: 'Contact',
			validation: (Rule: Rule) => Rule.required(),
		},
		// === CONTENU DE LA PAGE ===
		{
			name: 'sectionHero',
			title: 'Section Hero',
			type: hero.name,
		},
		// Informations de contact centralisées (réutilisables dans footer, map, etc.)
		{
			name: 'contactInfo',
			title: 'Informations de Contact',
			type: 'object',
			description: "Informations centralisées réutilisables dans toute l'application (footer, map, etc.)",
			options: {
				collapsible: false,
			},
			fields: [
				{
					name: 'name',
					title: 'Nom de la garderie',
					type: 'string',
					initialValue: "Garderie Les P'tits Loups",
					validation: (Rule: Rule) => Rule.required(),
				},
				{
					name: 'description',
					title: 'Description',
					type: 'text',
					rows: 3,
					description: 'Description de la garderie qui sera affichée dans le footer',
					validation: (Rule: Rule) => Rule.required(),
				},
				{
					name: 'address',
					title: 'Adresse',
					type: 'string',
					placeholder: 'Rue de la Paix 123',
					validation: (Rule: Rule) => Rule.required(),
				},
				{
					name: 'postalCode',
					title: 'Code postal',
					type: 'string',
					placeholder: '1000',
					validation: (Rule: Rule) => Rule.required(),
				},
				{
					name: 'city',
					title: 'Ville',
					type: 'string',
					placeholder: 'Lausanne',
					validation: (Rule: Rule) => Rule.required(),
				},
				{
					name: 'country',
					title: 'Pays',
					type: 'string',
					initialValue: 'Suisse',
					validation: (Rule: Rule) => Rule.required(),
				},
				{
					name: 'phone',
					title: 'Téléphone',
					type: 'string',
					placeholder: '+41 21 XXX XX XX',
					validation: (Rule: Rule) => Rule.required(),
				},
				{
					name: 'email',
					title: 'Email',
					type: 'string',
					placeholder: 'contact@leptitsloups.ch',
					validation: (Rule: Rule) => Rule.required().email(),
				},
				{
					name: 'openingHours',
					title: "Horaires d'accueil",
					type: 'text',
					rows: 3,
					placeholder: 'Lundi - Vendredi: 8h00 - 18h00',
					description: "Horaires d'ouverture/d'accueil (différent des horaires de garde)",
					validation: (Rule: Rule) => Rule.required(),
				},
				// Coordonnées GPS pour la carte
				{
					name: 'latitude',
					title: 'Latitude (pour la carte)',
					type: 'number',
					initialValue: 46.541742,
					validation: (Rule: Rule) => Rule.required().min(-90).max(90),
					description: 'Coordonnée GPS latitude (ex: 46.541742)',
				},
				{
					name: 'longitude',
					title: 'Longitude (pour la carte)',
					type: 'number',
					initialValue: 6.636635,
					validation: (Rule: Rule) => Rule.required().min(-180).max(180),
					description: 'Coordonnée GPS longitude (ex: 6.636635)',
				},
				{
					name: 'zoom',
					title: 'Niveau de zoom (carte)',
					type: 'number',
					initialValue: 15,
					validation: (Rule: Rule) => Rule.min(1).max(20),
					description: 'Niveau de zoom pour la carte (1-20, recommandé: 15)',
				},
			],
		},
		// Image Parallaxe
		{
			name: 'parallax',
			title: 'Image Parallaxe',
			type: paralaxImage.name,
		},
		// === SEO & CONFIGURATION ===
		{
			name: 'seo',
			title: 'SEO',
			type: seo.name,
			options: {
				collapsible: true,
				collapsed: true,
			},
		},
		// Configuration développeur (slug, paramètres techniques)
		{
			name: 'devConfig',
			title: '⚙️ Configuration développeur',
			type: 'object',
			description: "Paramètres techniques - Uniquement à l'usage du développeur",
			options: {
				collapsible: true,
				collapsed: true,
			},
			fields: [
				{
					name: 'slug',
					title: 'Slug (URL de la page)',
					type: 'slug',
					initialValue: { current: 'contact' },
					validation: (Rule: Rule) => Rule.required(),
					components: {
						input: ReadOnlySlug,
					},
				},
			],
		},
	],
	preview: {
		select: {
			title: 'title',
			media: 'sectionHero.image',
		},
	},
}
