/**
 * Plugin Sanity pour la gestion des références médiathèque-images
 * Protection contre suppression incorrecte et système de références
 */

import { definePlugin } from 'sanity'

/**
 * Plugin de gestion des références médias
 * Version simplifiée pour éviter les problèmes de types
 */
export const mediaReferencePlugin = definePlugin({
	name: 'media-reference',
	document: {
		actions: (prev) => {
			// Pour l'instant, on garde les actions par défaut
			// La protection sera implémentée via les validations
			return prev
		},
	},
})
