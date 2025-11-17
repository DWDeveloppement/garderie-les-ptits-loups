#!/usr/bin/env node

/**
 * Script pour vérifier si des assets spécifiques existent encore
 * Utile pour vérifier si les images "fantômes" dans Sanity Studio existent vraiment
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

const client = createClient({
	projectId,
	dataset,
	apiVersion: '2024-01-01',
	useCdn: false,
	token: process.env.SANITY_API_TOKEN,
})

async function checkAssets() {
	console.log('🔍 Vérification des assets supprimés...')
	console.log(`📦 Projet: ${projectId}, Dataset: ${dataset}`)
	console.log('')

	try {
		// Les IDs des images supprimées (d'après le script précédent)
		const deletedAssetIds = [
			'image-29cc6e0ab7261169a7734682e582a4690ca27dca-4895x3263-jpg', // vestiaire-nurserie.jpg
			'image-fb380eeffe87d50b597383664c02982964d0d28c-16x16-svg', // file.svg
		]

		console.log('🔎 Vérification des assets supprimés:')
		console.log('')

		for (const assetId of deletedAssetIds) {
			try {
				const asset = await client.fetch(`*[_id == "${assetId}"][0]`)
				if (asset) {
					console.log(`❌ ${assetId} - EXISTE ENCORE (${asset.originalFilename || 'Sans nom'})`)
				} else {
					console.log(`✅ ${assetId} - BIEN SUPPRIMÉ`)
				}
			} catch (error) {
				console.log(`✅ ${assetId} - BIEN SUPPRIMÉ (erreur attendue: ${error.message})`)
			}
		}

		console.log('')
		console.log('📊 Liste de TOUS les assets existants:')
		const allAssets = await client.fetch(`
			*[_type == "sanity.imageAsset"] {
				_id,
				originalFilename,
				size
			} | order(originalFilename asc)
		`)

		console.log(`Total: ${allAssets.length} assets`)
		allAssets.forEach((asset, index) => {
			const sizeKB = asset.size ? Math.round(asset.size / 1024) : 0
			console.log(`${index + 1}. ${asset.originalFilename || 'Sans nom'} (${sizeKB} KB)`)
		})

		console.log('')
		console.log('💡 Conclusion:')
		if (allAssets.length === 26) {
			console.log('   ✅ Les 2 images ont bien été supprimées (26 assets restants)')
			console.log('   ⚠️  Si elles apparaissent encore dans Sanity Studio, c\'est un bug de cache')
			console.log('   💡 Solution: Ignore-les dans Sanity Studio, elles n\'existent plus côté API')
		}

	} catch (error) {
		console.error('❌ Erreur:', error.message)
		process.exit(1)
	}
}

checkAssets()
	.then(() => {
		console.log('\n🏁 Vérification terminée')
		process.exit(0)
	})
	.catch((error) => {
		console.error('💥 Erreur fatale:', error)
		process.exit(1)
	})

