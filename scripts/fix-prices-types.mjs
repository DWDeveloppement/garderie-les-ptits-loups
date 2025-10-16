/**
 * Script pour convertir tous les champs numériques en strings dans les documents prix
 * Résout l'erreur "Expected type String, got Number"
 * 
 * Usage: npm run fix:prices
 * (Nécessite SANITY_API_TOKEN dans .env.local)
 */

import dotenv from 'dotenv'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Charger explicitement .env.local
dotenv.config({ path: join(__dirname, '..', '.env.local') })

const projectId = 'rnhuu2jm'
const dataset = 'production'
const token = process.env.SANITY_API_TOKEN

if (!token) {
	console.error('❌ Erreur: SANITY_API_TOKEN non défini\n')
	console.log('📝 Configure SANITY_API_TOKEN dans .env.local')
	process.exit(1)
}

const apiUrl = `https://${projectId}.api.sanity.io/v2021-06-07/data/mutate/${dataset}`
const queryUrl = `https://${projectId}.api.sanity.io/v2021-06-07/data/query/${dataset}`

console.log('🔧 Conversion des prix Number → String...\n')

/**
 * Fonction pour convertir récursivement les nombres en strings
 */
function convertNumbersToStrings(obj) {
	if (Array.isArray(obj)) {
		return obj.map(item => convertNumbersToStrings(item))
	}
	
	if (obj && typeof obj === 'object') {
		const converted = {}
		for (const [key, value] of Object.entries(obj)) {
			// Convertir les nombres en strings
			if (typeof value === 'number') {
				// Formater avec 2 décimales si nécessaire, sinon entier
				converted[key] = value % 1 === 0 ? `${value}.-` : value.toFixed(2)
			} else {
				converted[key] = convertNumbersToStrings(value)
			}
		}
		return converted
	}
	
	return obj
}

async function fixPrices() {
	try {
		// Étape 1 : Récupérer tous les documents prix
		console.log('🔍 Recherche des documents prix...')
		
		const query = encodeURIComponent('*[_type == "prices"] { _id, _type, documentType, frequentationType, accordionItems, tableContent }')
		const response = await fetch(`${queryUrl}?query=${query}`, {
			headers: {
				'Authorization': `Bearer ${token}`
			}
		})
		
		const data = await response.json()
		const pricesDocs = data.result || []
		
		console.log(`   📊 ${pricesDocs.length} document(s) trouvé(s)\n`)

		if (pricesDocs.length === 0) {
			console.log('ℹ️  Aucun document à traiter')
			return
		}

		let fixedCount = 0

		// Étape 2 : Pour chaque document, convertir et mettre à jour
		for (const doc of pricesDocs) {
			console.log(`📝 Traitement: ${doc._id} (${doc.documentType})`)
			
			let needsUpdate = false
			const patches = []

			// Convertir accordionItems si présent
			if (doc.accordionItems && Array.isArray(doc.accordionItems)) {
				const convertedAccordion = convertNumbersToStrings(doc.accordionItems)
				
				if (JSON.stringify(convertedAccordion) !== JSON.stringify(doc.accordionItems)) {
					needsUpdate = true
					patches.push({
						set: { accordionItems: convertedAccordion }
					})
					console.log('   ✓ accordionItems converti')
				}
			}

			// Convertir tableContent si présent
			if (doc.tableContent) {
				const convertedTable = convertNumbersToStrings(doc.tableContent)
				
				if (JSON.stringify(convertedTable) !== JSON.stringify(doc.tableContent)) {
					needsUpdate = true
					patches.push({
						set: { tableContent: convertedTable }
					})
					console.log('   ✓ tableContent converti')
				}
			}

			// Mettre à jour si nécessaire
			if (needsUpdate) {
				const mutation = {
					mutations: patches.map(patch => ({
						patch: {
							id: doc._id,
							...patch
						}
					}))
				}

				await fetch(apiUrl, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`
					},
					body: JSON.stringify(mutation)
				})

				console.log(`   ✅ Document mis à jour\n`)
				fixedCount++
			} else {
				console.log(`   ℹ️  Aucune conversion nécessaire\n`)
			}
		}

		console.log('═'.repeat(60))
		console.log(`✨ Conversion terminée !`)
		console.log(`   📊 Documents traités: ${pricesDocs.length}`)
		console.log(`   ✅ Documents mis à jour: ${fixedCount}`)
		console.log('═'.repeat(60))
		
		if (fixedCount > 0) {
			console.log('\n💡 Rafraîchis Sanity Studio pour voir les changements')
		}

	} catch (error) {
		console.error('\n💥 Erreur:', error.message)
		process.exit(1)
	}
}

fixPrices()

