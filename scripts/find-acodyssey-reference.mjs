#!/usr/bin/env node

/**
 * Script pour trouver où ACOdyssey_Megaris est référencé
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

async function findReference() {
	console.log('🔍 Recherche des références à ACOdyssey_Megaris...')
	console.log(`📦 Projet: ${projectId}, Dataset: ${dataset}`)
	console.log('')

	try {
		const assetId = 'image-a1323e957b00a05797e2fe019437f905f42b6248-1135x964-png'

		// Trouver tous les documents qui référencent cet asset
		const references = await client.fetch(`
			*[references("${assetId}")] {
				_type,
				_id,
				title,
				"isDraft": _id match "drafts.*",
				// Chercher dans tous les champs possibles
				"hasImage": defined(image),
				"hasAsset": defined(asset),
				"hasLogo": defined(logo),
				"hasSectionHero": defined(sectionHero),
				"hasParallax": defined(parallax)
			}
		`)

		if (references.length === 0) {
			console.log("✅ Aucune référence trouvée - l'asset peut être supprimé")
		} else {
			console.log(`⚠️  ${references.length} document(s) référencent cet asset:\n`)

			for (const ref of references) {
				console.log(`📄 ${ref.title || 'Sans titre'} (${ref._type})`)
				console.log(`   ID: ${ref._id}`)
				console.log(`   Status: ${ref.isDraft ? 'DRAFT' : 'PUBLIÉ'}`)

				// Récupérer le document complet pour voir où l'image est utilisée
				const fullDoc = await client.fetch(`*[_id == "${ref._id}"][0]`)

				// Chercher dans les champs image
				if (fullDoc.image?.asset?._ref === assetId) {
					console.log(`   📍 Utilisé dans: image`)
				}
				if (fullDoc.asset?._ref === assetId) {
					console.log(`   📍 Utilisé dans: asset`)
				}
				if (fullDoc.logo?.asset?._ref === assetId) {
					console.log(`   📍 Utilisé dans: logo`)
				}
				if (fullDoc.sectionHero?.logo?.asset?._ref === assetId) {
					console.log(`   📍 Utilisé dans: sectionHero.logo`)
				}
				if (fullDoc.parallax?.image?.asset?._ref === assetId) {
					console.log(`   📍 Utilisé dans: parallax.image`)
				}

				// Chercher dans les sections
				if (fullDoc.sections) {
					for (let i = 0; i < fullDoc.sections.length; i++) {
						const section = fullDoc.sections[i]
						if (section.image?.asset?._ref === assetId || section.logo?.asset?._ref === assetId) {
							console.log(`   📍 Utilisé dans: sections[${i}].${section.image ? 'image' : 'logo'}`)
						}
					}
				}

				console.log('')
			}

			console.log('💡 Pour supprimer cet asset:')
			console.log('   1. Ouvre le(s) document(s) dans Sanity Studio')
			console.log("   2. Supprime ou remplace l'image ACOdyssey_Megaris")
			console.log('   3. Publie les modifications')
			console.log('   4. Relance: npm run cleanup:media')
		}
	} catch (error) {
		console.error('❌ Erreur:', error.message)
		process.exit(1)
	}
}

findReference()
	.then(() => {
		console.log('\n🏁 Recherche terminée')
		process.exit(0)
	})
	.catch((error) => {
		console.error('💥 Erreur fatale:', error)
		process.exit(1)
	})
