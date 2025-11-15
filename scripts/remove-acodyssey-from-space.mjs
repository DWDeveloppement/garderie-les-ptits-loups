#!/usr/bin/env node

/**
 * Script pour supprimer la référence ACOdyssey_Megaris du document "La salle de jeux"
 */

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config()

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.SANITY_STUDIO_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

if (!projectId) {
	console.error('❌ Erreur: SANITY_STUDIO_PROJECT_ID ou NEXT_PUBLIC_SANITY_PROJECT_ID doit être défini dans .env')
	process.exit(1)
}

if (!process.env.SANITY_API_TOKEN) {
	console.error('❌ Erreur: SANITY_API_TOKEN requis')
	process.exit(1)
}

const client = createClient({
	projectId,
	dataset,
	apiVersion: '2024-01-01',
	useCdn: false,
	token: process.env.SANITY_API_TOKEN,
})

async function removeReference() {
	console.log('🔍 Suppression de la référence ACOdyssey_Megaris...')
	console.log(`📦 Projet: ${projectId}, Dataset: ${dataset}`)
	console.log('')

	try {
		const documentId = 'pnurseryPlaygroundSpace'
		const assetId = 'image-a1323e957b00a05797e2fe019437f905f42b6248-1135x964-png'

		// Récupérer le document
		const doc = await client.fetch(`*[_id == "${documentId}"][0]`)

		if (!doc) {
			console.error(`❌ Document ${documentId} non trouvé`)
			process.exit(1)
		}

		console.log(`📄 Document trouvé: ${doc.title || 'Sans titre'}`)
		console.log(`   ID: ${doc._id}`)
		console.log('')

		// Vérifier si l'image est bien référencée
		if (doc.image?.asset?._ref === assetId) {
			console.log('🗑️  Suppression de la référence image...')

			// Supprimer la référence image
			await client.patch(documentId).unset(['image']).commit()

			console.log('   ✅ Référence supprimée')
		} else {
			console.log("⚠️  L'image n'est pas référencée dans le champ image")
			console.log('   Structure du document:', JSON.stringify(doc.image, null, 2))
		}

		// Attendre un peu pour que la modification soit propagée
		await new Promise((resolve) => setTimeout(resolve, 1000))

		// Vérifier que l'asset n'est plus référencé
		const references = await client.fetch(`*[references("${assetId}")]`)

		if (references.length === 0) {
			console.log("\n✅ L'asset n'est plus référencé - peut être supprimé")
			console.log('   Relance: npm run cleanup:media')
		} else {
			console.log(`\n⚠️  L'asset est encore référencé dans ${references.length} document(s)`)
		}
	} catch (error) {
		console.error('❌ Erreur:', error.message)
		process.exit(1)
	}
}

removeReference()
	.then(() => {
		console.log('\n🏁 Script terminé')
		process.exit(0)
	})
	.catch((error) => {
		console.error('💥 Erreur fatale:', error)
		process.exit(1)
	})
