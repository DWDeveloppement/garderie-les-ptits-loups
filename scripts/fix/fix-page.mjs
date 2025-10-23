/**
 * Script générique pour nettoyer et recréer une page Sanity corrompue
 * Utilise l'API Sanity directement
 * 
 * Usage: node scripts/fix-page.mjs [pageName]
 * 
 * Pages disponibles:
 * - home         (Page d'accueil)
 * - about        (Page À propos)
 * - contact      (Page Contact)
 * - tarifs       (Page Tarifs)
 * 
 * Exemples:
 *   node scripts/fix-page.mjs home
 *   node scripts/fix-page.mjs contact
 *   npm run fix:page -- home
 *   npm run fix:page -- contact
 * 
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

// Configuration des pages
const PAGES_CONFIG = {
	home: {
		_id: 'home',
		_type: 'home',
		title: "Page d'accueil",
		slug: '/',
		structure: {
			sectionHero: { _type: 'hero' },
			seo: { _type: 'seo' },
			devConfig: {
				slug: { _type: 'slug', current: '/' }
			}
		}
	},
	about: {
		_id: 'aboutPage',
		_type: 'aboutPage',
		title: 'À Propos',
		slug: 'a-propos',
		structure: {
			sectionHero: { _type: 'hero' },
			seo: { _type: 'seo' },
			devConfig: {
				slug: { _type: 'slug', current: 'a-propos' }
			}
		}
	},
	contact: {
		_id: 'contactPage',
		_type: 'contactPage',
		title: 'Contact',
		slug: 'contact',
		structure: {
			sectionHero: { _type: 'hero' },
			contactInfo: {
				name: "Garderie Les P'tits Loups",
				address: '',
				postalCode: '',
				city: '',
				country: 'Suisse',
				phone: '',
				email: '',
				openingHours: '',
				latitude: 46.541742,
				longitude: 6.636635,
				zoom: 15
			},
			seo: { _type: 'seo' },
			devConfig: {
				slug: { _type: 'slug', current: 'contact' }
			}
		}
	},
	tarifs: {
		_id: 'schedulePage',
		_type: 'schedulePage',
		title: 'Tarifs',
		slug: 'tarifs',
		structure: {
			sectionHero: { _type: 'hero' },
			seo: { _type: 'seo' },
			devConfig: {
				slug: { _type: 'slug', current: 'tarifs' }
			}
		}
	}
}

// Récupérer l'argument de la ligne de commande
const pageName = process.argv[2]

if (!token) {
	console.error('❌ Erreur: SANITY_API_TOKEN non défini\n')
	console.log('📝 Obtiens un token sur: https://www.sanity.io/manage')
	console.log('   → API → Tokens → Add API token')
	console.log('   → Permissions: Editor')
	console.log('   → Crée le fichier .env.local à la racine:')
	console.log('   → SANITY_API_TOKEN=ton_token')
	process.exit(1)
}

if (!pageName || !PAGES_CONFIG[pageName]) {
	console.error('❌ Erreur: Page non spécifiée ou invalide\n')
	console.log('📝 Usage: node scripts/fix-page.mjs [pageName]\n')
	console.log('Pages disponibles:')
	Object.keys(PAGES_CONFIG).forEach(key => {
		const page = PAGES_CONFIG[key]
		console.log(`   - ${key.padEnd(10)} (${page.title})`)
	})
	console.log('\nExemple: node scripts/fix-page.mjs contact')
	process.exit(1)
}

const pageConfig = PAGES_CONFIG[pageName]

const apiUrl = `https://${projectId}.api.sanity.io/v2021-06-07/data/mutate/${dataset}`

console.log(`🔧 Nettoyage et recréation de la page: ${pageConfig.title}\n`)

async function deleteDocument(id) {
	const mutation = {
		mutations: [
			{
				delete: { id }
			}
		]
	}

	const response = await fetch(apiUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		},
		body: JSON.stringify(mutation)
	})

	return response.json()
}

async function createDocument(doc) {
	const mutation = {
		mutations: [
			{
				create: doc
			}
		]
	}

	const response = await fetch(apiUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		},
		body: JSON.stringify(mutation)
	})

	return response.json()
}

async function run() {
	try {
		// Étape 1 : Supprimer tous les documents
		console.log('🗑️  Suppression des documents existants...')
		
		// Générer tous les IDs possibles pour cette page
		const idsToDelete = [
			pageConfig._id,
			`drafts.${pageConfig._id}`,
			pageConfig.slug.replace('/', ''), // Au cas où slug utilisé comme ID
			`drafts.${pageConfig.slug.replace('/', '')}`,
		].filter(Boolean)
		
		for (const id of idsToDelete) {
			try {
				await deleteDocument(id)
				console.log(`   ✅ Supprimé (ou n'existait pas): ${id}`)
			} catch {
				console.log(`   ℹ️  Ignoré: ${id}`)
			}
		}

		console.log('')

		// Attendre un peu pour s'assurer que la suppression est propagée
		await new Promise(resolve => setTimeout(resolve, 1000))

		// Étape 2 : Créer le nouveau document
		console.log('📝 Création du nouveau document...')
		
		const newDoc = {
			_id: pageConfig._id,
			_type: pageConfig._type,
			title: pageConfig.title,
			...pageConfig.structure
		}

		const result = await createDocument(newDoc)
		
		if (result.results && result.results[0]) {
			console.log('   ✅ Document créé avec succès!')
			console.log(`   📄 ID: ${result.results[0].id}`)
			console.log('')
			console.log('✨ Recréation terminée avec succès !')
			console.log('')
			console.log('🎯 Prochaines étapes:')
			console.log('   1. Rafraîchis Sanity Studio (F5)')
			console.log(`   2. Ouvre Pages Générales → ${pageConfig.title}`)
			console.log('   3. Remplis les champs nécessaires')
			console.log('   4. Publie le document')
		} else {
			console.error('❌ Erreur lors de la création:', result)
		}

	} catch (error) {
		console.error('\n💥 Erreur:', error.message)
		process.exit(1)
	}
}

run()

