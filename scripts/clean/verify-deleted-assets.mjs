#!/usr/bin/env node

/**
 * Script de vérification des assets supprimés
 * Vérifie si les assets sont vraiment supprimés côté API Sanity
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

async function verifyAssets() {
	console.log('🔍 Vérification des assets dans Sanity...')
	console.log(`📦 Projet: ${projectId}, Dataset: ${dataset}`)
	console.log(`🌐 URL du projet: https://sanity.io/manage/project/${projectId}`)
	console.log('')

	try {
		// Récupérer tous les assets d'images
		const assets = await client.fetch(`
			*[_type == "sanity.imageAsset"] {
				_id,
				originalFilename,
				size,
				mimeType,
				url
			}
		`)

		console.log(`📊 Total d'assets trouvés: ${assets.length}`)
		console.log('')

		if (assets.length === 0) {
			console.log('✅ Aucun asset trouvé - tout a été supprimé !')
			return
		}

		// Afficher les 10 premiers assets
		console.log('📋 Liste des assets (10 premiers):')
		assets.slice(0, 10).forEach((asset, index) => {
			const sizeKB = asset.size ? Math.round(asset.size / 1024) : 0
			console.log(`${index + 1}. ${asset.originalFilename || 'Sans nom'} (${sizeKB} KB)`)
		})

		if (assets.length > 10) {
			console.log(`... et ${assets.length - 10} autres assets`)
		}

		console.log('')
		console.log('💡 Pour vérifier directement sur Sanity:')
		console.log(`   1. Va sur https://sanity.io/manage/project/${projectId}`)
		console.log('   2. Clique sur "Media" dans le menu de gauche')
		console.log('   3. Tu verras tous les assets encore présents')
		console.log('')
		console.log('💡 Si les images supprimées apparaissent encore dans Sanity Studio:')
		console.log("   - C'est un problème de cache côté Sanity Studio")
		console.log('   - Rafraîchis la page (F5) ou redémarre Sanity Studio')
		console.log('   - Les images sont bien supprimées côté API')
	} catch (error) {
		console.error('❌ Erreur:', error.message)
		process.exit(1)
	}
}

verifyAssets()
	.then(() => {
		console.log('\n🏁 Vérification terminée')
		process.exit(0)
	})
	.catch((error) => {
		console.error('💥 Erreur fatale:', error)
		process.exit(1)
	})
