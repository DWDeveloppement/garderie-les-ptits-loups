#!/usr/bin/env node

/**
 * Script pour supprimer un draft et les assets associés
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

async function deleteDraftAndAssets() {
	console.log('🔍 Recherche du draft "La Nurserie"...')
	console.log(`📦 Projet: ${projectId}, Dataset: ${dataset}`)
	console.log('')

	try {
		// Trouver le draft "La Nurserie"
		const drafts = await client.fetch(`
			*[_type == "sectors" && title == "La Nurserie" && _id match "drafts.*"] {
				_id,
				title
			}
		`)

		if (drafts.length === 0) {
			console.log('⚠️  Aucun draft "La Nurserie" trouvé')
		} else {
			console.log(`📄 ${drafts.length} draft(s) trouvé(s)\n`)

			for (const draft of drafts) {
				console.log(`🗑️  Suppression du draft: ${draft.title} (${draft._id})`)
				try {
					await client.delete(draft._id)
					console.log(`   ✅ Draft supprimé\n`)
				} catch (error) {
					console.error(`   ❌ Erreur: ${error.message}\n`)
				}
			}
		}

		// Attendre un peu pour que la suppression soit propagée
		await new Promise((resolve) => setTimeout(resolve, 1000))

		// Maintenant vérifier et supprimer les 3 assets
		const assetsToDelete = [
			'image-aca556a850681155f4cf056fb4c60b13dde972be-474x461-jpg', // 3DF24511-D27E-4880-84C1-0B28B058CB5F.jpeg
			'image-a1323e957b00a05797e2fe019437f905f42b6248-1135x964-png', // ACOdyssey_Megaris_Optimisation.png
			'image-0fd46fc0eaa9eb383657297833718c3af9397720-1087x964-png', // ACOdyssey_Phocis_Optimisation.png
		]

		console.log('🔍 Vérification des assets après suppression du draft...\n')

		const unusedAssets = []
		for (const assetId of assetsToDelete) {
			const references = await client.fetch(`*[references("${assetId}")]`)
			if (references.length === 0) {
				const asset = await client.fetch(`*[_id == "${assetId}"][0]`)
				if (asset) {
					unusedAssets.push(asset)
				}
			} else {
				console.log(`⚠️  ${assetId} est encore référencé dans ${references.length} document(s)`)
			}
		}

		if (unusedAssets.length > 0) {
			console.log(`\n🗑️  ${unusedAssets.length} asset(s) peuvent être supprimés:\n`)

			const readline = (await import('readline')).default
			const rl = readline.createInterface({
				input: process.stdin,
				output: process.stdout,
			})

			const answer = await new Promise((resolve) => {
				rl.question('❓ Voulez-vous supprimer ces assets ? (y/N): ', resolve)
			})

			rl.close()

			if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
				console.log('\n🗑️  Suppression en cours...\n')
				let deleted = 0
				let errors = 0

				for (const asset of unusedAssets) {
					try {
						await client.delete(asset._id)
						const sizeKB = asset.size ? Math.round(asset.size / 1024) : 0
						console.log(`   ✅ Supprimé: ${asset.originalFilename || asset._id} (${sizeKB} KB)`)
						deleted++
					} catch (error) {
						console.error(`   ❌ Erreur: ${asset.originalFilename || asset._id} - ${error.message}`)
						errors++
					}
				}

				console.log(`\n✅ ${deleted} asset(s) supprimé(s)${errors > 0 ? `, ${errors} erreur(s)` : ''}`)
			} else {
				console.log('❌ Suppression annulée')
			}
		} else {
			console.log('⚠️  Aucun asset à supprimer (tous encore référencés)')
		}
	} catch (error) {
		console.error('❌ Erreur:', error.message)
		process.exit(1)
	}
}

deleteDraftAndAssets()
	.then(() => {
		console.log('\n🏁 Script terminé')
		process.exit(0)
	})
	.catch((error) => {
		console.error('💥 Erreur fatale:', error)
		process.exit(1)
	})
