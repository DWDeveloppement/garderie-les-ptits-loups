/**
 * Validation et gestion des références pour les champs image
 * Vérification de l'existence des médias référencés
 */

import { Rule } from 'sanity'

/**
 * Validation pour vérifier qu'un média référencé existe
 */
export const validateMediaReference = (Rule: Rule) =>
	Rule.custom(async (value, context) => {
		if (!value?.asset?._ref) {
			return true // Pas de référence, pas de validation nécessaire
		}

		try {
			const client = context.getClient({ apiVersion: '2023-01-01' })
			const mediaId = value.asset._ref.replace('image-', '').replace('file-', '')

			const media = await client.fetch(
				`
        *[_id == $mediaId][0] {
          _id,
          _type,
          title
        }
      `,
				{ mediaId }
			)

			if (!media) {
				return "Le média référencé n'existe plus. Veuillez sélectionner un autre média."
			}

			return true
		} catch (error) {
			console.error('Erreur lors de la validation du média:', error)
			return 'Erreur lors de la vérification du média référencé.'
		}
	})

/**
 * Validation pour vérifier qu'un média n'est pas utilisé ailleurs avant suppression
 */
export const validateMediaNotReferenced = (Rule: Rule) =>
	Rule.custom(async (value, context) => {
		if (!value?.asset?._ref) {
			return true
		}

		try {
			const client = context.getClient({ apiVersion: '2023-01-01' })
			const mediaId = value.asset._ref.replace('image-', '').replace('file-', '')

			// Vérifier si le média est référencé dans d'autres documents
			const references = await client.fetch(
				`
        *[references($mediaId) && _id != $currentId] {
          _type,
          _id,
          title
        }
      `,
				{ mediaId, currentId: context.document?._id }
			)

			if (references.length > 0) {
				const referenceList = references.map((ref) => `${ref.title || ref._id} (${ref._type})`).join(', ')

				return `Ce média est utilisé dans d'autres documents : ${referenceList}. Supprimez d'abord ces références.`
			}

			return true
		} catch (error) {
			console.error('Erreur lors de la vérification des références:', error)
			return 'Erreur lors de la vérification des références du média.'
		}
	})

/**
 * Validation pour s'assurer qu'un média a un alt text
 */
export const validateAltText = (Rule: Rule) =>
	Rule.custom((value, context) => {
		if (!value?.asset?._ref) {
			return true
		}

		const altText = value.alt || ''

		if (!altText || altText.trim().length === 0) {
			return "Le texte alternatif est obligatoire pour l'accessibilité"
		}

		if (altText.length > 125) {
			return 'Le texte alternatif ne doit pas dépasser 125 caractères'
		}

		return true
	})

/**
 * Validation pour vérifier la cohérence des métadonnées
 */
export const validateMetadataConsistency = (Rule: Rule) =>
	Rule.custom((value, context) => {
		if (!value?.asset?._ref) {
			return true
		}

		const { alt, caption, credit } = value

		// Vérifier que si caption existe, alt aussi
		if (caption && !alt) {
			return 'Si une légende est fournie, le texte alternatif est obligatoire'
		}

		// Vérifier que credit n'est pas trop long
		if (credit && credit.length > 100) {
			return 'Le crédit photo ne doit pas dépasser 100 caractères'
		}

		return true
	})
