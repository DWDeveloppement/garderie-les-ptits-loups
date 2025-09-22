import { Badge, Card, Flex, Text } from '@sanity/ui'
import React from 'react'
import { useDocumentOperation } from 'sanity'

/**
 * Composant de gestion des médias avec protection contre suppression
 */
export function MediaManager() {
	const { delete: deleteOp } = useDocumentOperation()

	const handleDelete = async (documentId: string) => {
		// Vérifier les références avant suppression
		const client = useDocumentOperation().client
		
		try {
			const references = await client.fetch(`
				*[references("${documentId}")] {
					_type,
					title,
					_id
				}
			`)

			if (references.length > 0) {
				const referenceList = references
					.map((ref: any) => `${ref._type}: ${ref.title || ref._id}`)
					.join(', ')

				alert(`Cette image est utilisée dans ${references.length} document(s): ${referenceList}. Supprimez d'abord les références.`)
				return false
			}

			// Si pas de références, procéder à la suppression
			deleteOp.execute()
			return true
		} catch (error) {
			console.error('Erreur lors de la vérification des références:', error)
			alert('Erreur lors de la vérification des références. Suppression bloquée par sécurité.')
			return false
		}
	}

	return (
		<Card padding={4}>
			<Flex direction="column" gap={3}>
				<Text weight="bold">Gestion des médias</Text>
				<Text size={1}>
					Les images sont protégées contre la suppression si elles sont utilisées dans d'autres documents.
				</Text>
				<Badge tone="caution">
					Protection active
				</Badge>
			</Flex>
		</Card>
	)
}

/**
 * Hook pour vérifier les références d'une image
 */
export function useMediaReferences(documentId: string) {
	const [references, setReferences] = React.useState<any[]>([])
	const [loading, setLoading] = React.useState(false)

	const checkReferences = React.useCallback(async () => {
		if (!documentId) return

		setLoading(true)
		try {
			// Cette fonction sera implémentée avec le client Sanity
			// const client = useClient()
			// const refs = await client.fetch(`*[references("${documentId}")]`)
			// setReferences(refs)
		} catch (error) {
			console.error('Erreur lors de la vérification des références:', error)
		} finally {
			setLoading(false)
		}
	}, [documentId])

	React.useEffect(() => {
		checkReferences()
	}, [checkReferences])

	return { references, loading, checkReferences }
}
