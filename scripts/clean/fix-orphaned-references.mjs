#!/usr/bin/env node

/**
 * Script pour trouver et nettoyer les références orphelines
 * (documents qui référencent des assets qui n'existent plus)
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

async function findOrphanedReferences() {
	console.log('🔍 Recherche des références orphelines...')
	console.log(`📦 Projet: ${projectId}, Dataset: ${dataset}`)
	console.log('')

	try {
		// Récupérer tous les assets existants
		const existingAssets = await client.fetch(`
			*[_type == "sanity.imageAsset"] {
				_id
			}
		`)

		const existingAssetIds = new Set(existingAssets.map((a) => a._id))
		console.log(`📊 ${existingAssetIds.size} assets existants trouvés`)

		// Trouver tous les documents qui ont des références d'images
		const documentsWithImages = await client.fetch(`
			*[defined(asset) || defined(image) || defined(logo) || defined(photos)] {
				_type,
				_id,
				title,
				"imageRefs": [
					asset._ref,
					image.asset._ref,
					logo.asset._ref,
					sectionHero.logo.asset._ref,
					parallax.image.asset._ref
				]
			}
		`)

		console.log(`📄 ${documentsWithImages.length} documents avec images trouvés`)

		const orphanedRefs = []

		for (const doc of documentsWithImages) {
			const refs = doc.imageRefs.filter(Boolean)
			for (const ref of refs) {
				if (ref && !existingAssetIds.has(ref)) {
					orphanedRefs.push({
						documentId: doc._id,
						documentType: doc._type,
						documentTitle: doc.title || 'Sans titre',
						orphanedAssetId: ref,
					})
				}
			}
		}

		if (orphanedRefs.length > 0) {
			console.log(`\n⚠️  ${orphanedRefs.length} références orphelines trouvées:`)
			orphanedRefs.forEach((ref, index) => {
				console.log(
					`${index + 1}. Document "${ref.documentTitle}" (${ref.documentType}) référence un asset supprimé: ${ref.orphanedAssetId}`
				)
			})

			console.log('\n💡 Solutions:')
			console.log('   1. Ouvre ces documents dans Sanity Studio')
			console.log('   2. Supprime ou remplace les images orphelines')
			console.log('   3. Publie les modifications')
			console.log('\n💡 Pour nettoyer le cache de Sanity Studio:')
			console.log('   1. Ferme complètement Sanity Studio (Ctrl+C)')
			console.log('   2. Supprime le dossier .sanity dans node_modules (optionnel)')
			console.log('   3. Relance: npm run sanity')
		} else {
			console.log('\n✅ Aucune référence orpheline trouvée !')
			console.log('\n💡 Le problème vient probablement du cache de Sanity Studio.')
			console.log('   Solution:')
			console.log('   1. Ferme complètement Sanity Studio (Ctrl+C dans le terminal)')
			console.log('   2. Vide le cache du navigateur (Cmd+Shift+R sur Mac, Ctrl+Shift+R sur Windows)')
			console.log('   3. Relance: npm run sanity')
		}
	} catch (error) {
		console.error('❌ Erreur:', error.message)
		process.exit(1)
	}
}

findOrphanedReferences()
	.then(() => {
		console.log('\n🏁 Vérification terminée')
		process.exit(0)
	})
	.catch((error) => {
		console.error('💥 Erreur fatale:', error)
		process.exit(1)
	})
