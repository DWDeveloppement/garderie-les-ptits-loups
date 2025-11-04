import { type Rule, type SchemaTypeDefinition } from 'sanity'
import { ReadOnlySlug } from '../../components/ReadOnlySlug'
import { heroHome, paralaxImage, seo } from '../components'

// Désactivé: page fixe gérée dans le code Next
export const home: SchemaTypeDefinition = {
	name: 'home',
	title: "Page d'accueil",
	type: 'document',
	fields: [
		// === CONTENU DE LA PAGE ===
		{
			name: 'sectionHero',
			title: 'Section Hero',
			type: heroHome.name,
		},
		// Relation vers les 3 pages secteurs principales (La Structure)
		// Format card affiché dans la section "La Structure" du frontend
		// Pointe vers: La Nurserie, Les Trotteurs, Les Grands (pas "Les Autres Espaces")
		{
			name: 'linkedSectors',
			title: 'Secteurs liés (Nurserie, Trotteurs, Grands)',
			type: 'array',
			of: [
				{
					type: 'reference',
					to: [{ type: 'sectorPage' }],
					options: {
						filter: '_id in ["nurserie", "trotteurs", "grands"]',
						disableNew: true,
					},
				},
			],
			description: 'Liens vers les pages de secteurs (La Nurserie, Les Trotteurs, Les Grands)',
		},

		// ===== SECTIONS AUTRES ESPACES =====
		// Introduction à la section "Nos Autres Espaces"
		{
			name: 'introductionOtherSpaces',
			title: 'Introduction à la section "Nos Autres Espaces"',
			type: 'text',
			rows: 4,
			description: 'Introduction à la section "Nos Autres Espaces"',
		},
		// Relation vers les "autres espaces" uniquement (jardin, cuisine, bricolage)
		// Format liste d'articles dans la section "Nos Autres Espaces" du frontend
		// Filtre: inclut uniquement les espaces avec sector = "other"
		{
			name: 'linkedOtherSpaces',
			title: 'Autres Espaces (Jardin, Cuisine, Bricolage)',
			type: 'array',
			of: [
				{
					type: 'reference',
					to: [{ type: 'spacePage' }],
					options: {
						filter: 'sector == "other"',
						disableNew: true,
					},
				},
			],
			description: 'Liens vers les espaces "autres" (Le Jardin, La Cuisine, L\'armoire à bricolages)',
		},

		// Champ de contenu de page en rich-text
		{
			name: 'contentComplement',
			title: 'Contenu complémentaire',
			type: 'array',
			of: [{ type: 'block' }],
			description: 'Contenu complémentaire de la page',
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
					initialValue: { current: '/' },
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
