#!/usr/bin/env node

/**
 * Script de nettoyage des médias inutilisés
 * Identifie et supprime les images qui ne sont référencées nulle part
 */

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import readline from 'readline'

dotenv.config()

const client = createClient({
	projectId: process.env.SANITY_STUDIO_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
	dataset: process.env.SANITY_STUDIO_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
	apiVersion: '2023-01-01',
	useCdn: false,
	token: process.env.SANITY_API_TOKEN, // Token avec permissions de suppression
})

async function findUnusedMedia() {
	console.log('🔍 Recherche des médias inutilisés...')
	
	try {
		// Récupérer tous les assets
		const assets = await client.fetch(`
			*[_type == "assets"] {
				_id,
				title,
				asset {
					_id,
					url
				}
			}
		`)

		console.log(`📊 ${assets.length} assets trouvés`)

		const unusedAssets = []
		let processed = 0

		for (const asset of assets) {
			processed++
			process.stdout.write(`\r⏳ Vérification ${processed}/${assets.length}...`)

			// Vérifier si l'asset est référencé quelque part
			const references = await client.fetch(`
				*[references("${asset._id}")] {
					_type,
					_id
				}
			`)

			if (references.length === 0) {
				unusedAssets.push(asset)
			}
		}

		console.log(`\n✅ Analyse terminée`)
		console.log(`🗑️  ${unusedAssets.length} assets inutilisés trouvés`)

		if (unusedAssets.length > 0) {
			console.log('\n📋 Assets inutilisés:')
			unusedAssets.forEach((asset, index) => {
				console.log(`${index + 1}. ${asset.title || 'Sans titre'} (${asset._id})`)
			})

			// Demander confirmation avant suppression
			const rl = readline.createInterface({
				input: process.stdin,
				output: process.stdout
			})

			const answer = await new Promise((resolve) => {
				rl.question('\n❓ Voulez-vous supprimer ces assets inutilisés ? (y/N): ', resolve)
			})

			rl.close()

			if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
				console.log('\n🗑️  Suppression en cours...')
				
				for (let i = 0; i < unusedAssets.length; i++) {
					const asset = unusedAssets[i]
					process.stdout.write(`\r⏳ Suppression ${i + 1}/${unusedAssets.length}...`)
					
					try {
						await client.delete(asset._id)
					} catch (error) {
						console.error(`\n❌ Erreur lors de la suppression de ${asset._id}:`, error.message)
					}
				}
				
				console.log(`\n✅ ${unusedAssets.length} assets supprimés`)
			} else {
				console.log('❌ Suppression annulée')
			}
		} else {
			console.log('🎉 Aucun asset inutilisé trouvé !')
		}

	} catch (error) {
		console.error('❌ Erreur:', error.message)
		process.exit(1)
	}
}

// Exécuter le script
if (import.meta.url === `file://${process.argv[1]}`) {
	findUnusedMedia()
		.then(() => {
			console.log('\n🏁 Script terminé')
			process.exit(0)
		})
		.catch((error) => {
			console.error('💥 Erreur fatale:', error)
			process.exit(1)
		})
}

export { findUnusedMedia }