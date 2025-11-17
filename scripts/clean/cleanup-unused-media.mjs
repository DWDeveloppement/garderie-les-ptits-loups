#!/usr/bin/env node

/**
 * Script de nettoyage des médias inutilisés
 * Identifie et supprime les images qui ne sont référencées nulle part
 */

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import readline from 'readline'

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
	token: process.env.SANITY_API_TOKEN, // Token avec permissions de suppression
})

async function findUnusedMedia() {
	console.log('🔍 Recherche des médias inutilisés...')
	console.log(`📦 Projet: ${projectId}, Dataset: ${dataset}`)

	if (!process.env.SANITY_API_TOKEN) {
		console.warn('⚠️  SANITY_API_TOKEN non défini. Le script ne pourra que lister les images, pas les supprimer.')
	}

	try {
		// Récupérer tous les assets d'images (type système sanity.imageAsset)
		const assets = await client.fetch(`
			*[_type == "sanity.imageAsset"] {
				_id,
				originalFilename,
				url,
				size,
				mimeType
			}
		`)

		console.log(`📊 ${assets.length} assets d'images trouvés`)

		if (assets.length === 0) {
			console.log('🎉 Aucun asset trouvé')
			return
		}

		const unusedAssets = []
		let processed = 0

		for (const asset of assets) {
			processed++
			process.stdout.write(`\r⏳ Vérification ${processed}/${assets.length}...`)

			// Vérifier si l'asset est référencé dans un champ image
			// Les images sont référencées via asset._ref dans les champs de type image
			// La requête cherche dans TOUS les documents (publiés et drafts)
			// car le client n'utilise pas de perspective spécifique
			const references = await client.fetch(`
				*[references("${asset._id}")] {
					_type,
					_id,
					title
				}
			`)

			if (references.length === 0) {
				unusedAssets.push({
					...asset,
					sizeKB: asset.size ? Math.round(asset.size / 1024) : 0,
				})
			}
		}

		console.log(`\n✅ Analyse terminée`)
		console.log(`🗑️  ${unusedAssets.length} assets inutilisés trouvés`)

		if (unusedAssets.length > 0) {
			const totalSizeKB = unusedAssets.reduce((sum, asset) => sum + asset.sizeKB, 0)
			console.log('\n📋 Assets inutilisés:')
			unusedAssets.forEach((asset, index) => {
				console.log(`${index + 1}. ${asset.originalFilename || 'Sans nom'} (${asset.sizeKB} KB) - ${asset._id}`)
			})
			console.log(`\n💾 Taille totale: ${Math.round(totalSizeKB / 1024)} MB (${totalSizeKB} KB)`)

			// Demander confirmation avant suppression
			const rl = readline.createInterface({
				input: process.stdin,
				output: process.stdout,
			})

			const answer = await new Promise((resolve) => {
				rl.question('\n❓ Voulez-vous supprimer ces assets inutilisés ? (y/N): ', resolve)
			})

			rl.close()

			if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
				if (!process.env.SANITY_API_TOKEN) {
					console.error('\n❌ Erreur: SANITY_API_TOKEN requis pour supprimer les assets')
					return
				}

				console.log('\n🗑️  Suppression en cours...')

				let deleted = 0
				let errors = 0

				for (let i = 0; i < unusedAssets.length; i++) {
					const asset = unusedAssets[i]
					process.stdout.write(`\r⏳ Suppression ${i + 1}/${unusedAssets.length}...`)

					try {
						await client.delete(asset._id)
						deleted++
					} catch (error) {
						errors++
						console.error(`\n❌ Erreur lors de la suppression de ${asset.originalFilename || asset._id}:`, error.message)
					}
				}

				console.log(`\n✅ ${deleted} assets supprimés${errors > 0 ? `, ${errors} erreurs` : ''}`)
				console.log('\n💡 Note: Si les images sont encore visibles dans Sanity Studio:')
				console.log('   1. Rafraîchis la page (F5 ou Cmd+R)')
				console.log('   2. Vérifie que les images ne sont pas dans des drafts non publiés')
				console.log('   3. Attends quelques secondes pour que le cache se mette à jour')
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

// Exécuter le script directement
findUnusedMedia()
	.then(() => {
		console.log('\n🏁 Script terminé')
		process.exit(0)
	})
	.catch((error) => {
		console.error('💥 Erreur fatale:', error)
		process.exit(1)
	})
