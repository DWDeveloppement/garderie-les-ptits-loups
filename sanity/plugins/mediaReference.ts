import { type Rule } from 'sanity'

/**
 * Système de protection contre la suppression d'images utilisées
 * Vérifie les références avant suppression
 */

export const validateMediaReference = (Rule: Rule) => {
	return Rule.custom(async (value, context) => {
		if (!value) return true

		const { document, getClient } = context
		const client = getClient({ apiVersion: '2023-01-01' })

		// Si c'est une suppression (document._deletedAt existe)
		if (document._deletedAt) {
			try {
				// Chercher toutes les références à cette image
				const references = await client.fetch(`
					*[references("${document._id}")] {
						_type,
						title,
						_id
					}
				`)

				if (references.length > 0) {
					const referenceList = references.map((ref: any) => `${ref._type}: ${ref.title || ref._id}`).join(', ')

					return {
						message: `Cette image est utilisée dans ${references.length} document(s): ${referenceList}. Supprimez d'abord les références.`,
						level: 'error',
					}
				}
			} catch (error) {
				console.error('Erreur lors de la vérification des références:', error)
				return {
					message: 'Erreur lors de la vérification des références. Suppression bloquée par sécurité.',
					level: 'error',
				}
			}
		}

		return true
	})
}

/**
 * Validation pour s'assurer qu'une image a bien ses métadonnées SEO
 */
export const validateImageSEO = (Rule: Rule) => {
	return Rule.custom((value, context) => {
		if (!value) return true

		const { asset, alt, title } = value

		if (!asset) {
			return "L'image est obligatoire"
		}

		if (!alt || alt.trim().length === 0) {
			return "Le texte alternatif est obligatoire pour l'accessibilité et le SEO"
		}

		if (!title || title.trim().length === 0) {
			return "Le titre est obligatoire pour l'organisation"
		}

		return true
	})
}

/**
 * Hook pour afficher un avertissement avant suppression
 */
export const useMediaDeletionWarning = () => {
	return {
		onDelete: async (documentId: string, client: any) => {
			try {
				const references = await client.fetch(`
					*[references("${documentId}")] {
						_type,
						title,
						_id
					}
				`)

				if (references.length > 0) {
					const referenceList = references.map((ref: any) => `${ref._type}: ${ref.title || ref._id}`).join(', ')

					return {
						canDelete: false,
						message: `Cette image est utilisée dans ${references.length} document(s): ${referenceList}. Supprimez d'abord les références.`,
						references,
					}
				}

				return { canDelete: true }
			} catch (error) {
				console.error('Erreur lors de la vérification des références:', error)
				return {
					canDelete: false,
					message: 'Erreur lors de la vérification des références. Suppression bloquée par sécurité.',
				}
			}
		},
	}
}
