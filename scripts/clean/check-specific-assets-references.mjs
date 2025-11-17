#!/usr/bin/env node

/**
 * Script pour vérifier si des assets spécifiques sont référencés
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

async function checkAssetReferences() {
	console.log('🔍 Vérification des références pour les 3 premiers assets...')
	console.log(`📦 Projet: ${projectId}, Dataset: ${dataset}`)
	console.log('')

	try {
		// Récupérer les assets spécifiques mentionnés
		const assets = await client.fetch(`
			*[_type == "sanity.imageAsset" && originalFilename match "3DF24511*" || originalFilename match "*ACOdyssey*"] {
				_id,
				originalFilename,
				size
			} | order(originalFilename asc)
		`)

		console.log(`📊 ${assets.length} assets à vérifier:\n`)

		for (const asset of assets) {
			const sizeKB = asset.size ? Math.round(asset.size / 1024) : 0
			console.log(`🔎 Vérification: ${asset.originalFilename || 'Sans nom'} (${sizeKB} KB)`)
			console.log(`   ID: ${asset._id}`)

			// Chercher toutes les références possibles (publiées et drafts)
			const references = await client.fetch(`
				*[references("${asset._id}")] {
					_type,
					_id,
					title,
					"isDraft": _id match "drafts.*"
				}
			`)

			if (references.length > 0) {
				console.log(`   ⚠️  Référencé dans ${references.length} document(s):`)
				references.forEach((ref) => {
					console.log(`      - ${ref.title || 'Sans titre'} (${ref._type}) ${ref.isDraft ? '[DRAFT]' : '[PUBLIÉ]'}`)
				})
			} else {
				console.log(`   ✅ NON RÉFÉRENCÉ - Peut être supprimé`)
			}
			console.log('')
		}

		// Proposer la suppression si non référencés
		const unusedAssets = []
		for (const asset of assets) {
			const references = await client.fetch(`*[references("${asset._id}")]`)
			if (references.length === 0) {
				unusedAssets.push(asset)
			}
		}

		if (unusedAssets.length > 0) {
			console.log(`\n🗑️  ${unusedAssets.length} asset(s) peuvent être supprimés:`)
			unusedAssets.forEach((asset) => {
				const sizeKB = asset.size ? Math.round(asset.size / 1024) : 0
				console.log(`   - ${asset.originalFilename || 'Sans nom'} (${sizeKB} KB)`)
			})

			if (process.env.SANITY_API_TOKEN) {
				const readline = (await import('readline')).default
				const rl = readline.createInterface({
					input: process.stdin,
					output: process.stdout,
				})

				const answer = await new Promise((resolve) => {
					rl.question('\n❓ Voulez-vous supprimer ces assets ? (y/N): ', resolve)
				})

				rl.close()

				if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
					console.log('\n🗑️  Suppression en cours...')
					let deleted = 0
					let errors = 0

					for (const asset of unusedAssets) {
						try {
							await client.delete(asset._id)
							console.log(`   ✅ Supprimé: ${asset.originalFilename || asset._id}`)
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
				console.log('\n⚠️  SANITY_API_TOKEN non défini - impossible de supprimer')
			}
		}
	} catch (error) {
		console.error('❌ Erreur:', error.message)
		process.exit(1)
	}
}

checkAssetReferences()
	.then(() => {
		console.log('\n🏁 Vérification terminée')
		process.exit(0)
	})
	.catch((error) => {
		console.error('💥 Erreur fatale:', error)
		process.exit(1)
	})
