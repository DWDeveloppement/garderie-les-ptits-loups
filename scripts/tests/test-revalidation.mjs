#!/usr/bin/env node

/**
 * Script de test de revalidation ISR
 * Teste l'API /api/revalidate avec différents types de documents Sanity
 */

import { config } from 'dotenv'

// Charger les variables d'environnement
config({ path: '.env.local' })

// Couleurs pour la console
const colors = {
	reset: '\x1b[0m',
	bright: '\x1b[1m',
	green: '\x1b[32m',
	red: '\x1b[31m',
	yellow: '\x1b[33m',
	blue: '\x1b[34m',
	cyan: '\x1b[36m',
}

const log = {
	info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
	success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
	error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
	warning: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
	title: (msg) => console.log(`\n${colors.bright}${colors.cyan}${msg}${colors.reset}`),
	section: (msg) => console.log(`\n${colors.bright}━━━ ${msg} ━━━${colors.reset}`),
}

// Configuration
const BASE_URL = process.env.TEST_URL || 'http://localhost:3100'
const SECRET = process.env.SANITY_REVALIDATE_SECRET

// Types de documents à tester
const DOCUMENT_TYPES = [
	{ type: 'home', route: '/', description: 'Page d\'accueil' },
	{ type: 'aboutPage', route: '/a-propos', description: 'Page À propos' },
	{ type: 'contactPage', route: '/contact', description: 'Page Contact' },
	{ type: 'schedulePage', route: '/tarifs', description: 'Page Tarifs' },
	{ type: 'legacyPage', route: '/mentions-legales', description: 'Mentions légales' },
	{ type: 'privatePolicyPage', route: '/politique-confidentialite', description: 'Politique de confidentialité' },
	{ type: 'sectorPage', route: '/la-structure/nurserie', description: 'Page Secteur', slug: 'nurserie' },
	{ type: 'prices', route: '/tarifs', description: 'Tarifs (données)' },
	{ type: 'testimonials', route: '/', description: 'Témoignages (home)' },
	{ type: 'partners', route: '/', description: 'Partenaires (footer)' },
]

/**
 * Test de l'endpoint GET /api/revalidate
 */
async function testEndpointHealth() {
	log.section('Test 1: Santé de l\'endpoint')

	try {
		const response = await fetch(`${BASE_URL}/api/revalidate?secret=${SECRET}`)
		const data = await response.json()

		if (response.ok && data.status === 'ok') {
			log.success(`Endpoint accessible (${response.status} OK)`)
			log.info(`Message: "${data.message}"`)
			return true
		} else {
			log.error(`Endpoint non accessible (${response.status})`)
			log.error(`Response: ${JSON.stringify(data)}`)
			return false
		}
	} catch (error) {
		log.error(`Erreur de connexion: ${error.message}`)
		log.warning(`Le serveur est-il démarré ? (${BASE_URL})`)
		return false
	}
}

/**
 * Test de revalidation pour un type de document
 */
async function testRevalidation(docType) {
	const payload = {
		_type: docType.type,
		...(docType.slug && { slug: { current: docType.slug } }),
	}

	try {
		const response = await fetch(`${BASE_URL}/api/revalidate?secret=${SECRET}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload),
		})

		const data = await response.json()

		if (response.ok && data.revalidated === true) {
			log.success(`${docType.type.padEnd(20)} → ${docType.route}`)
			return { type: docType.type, success: true }
		} else {
			log.error(`${docType.type.padEnd(20)} → Échec`)
			log.error(`  Response: ${JSON.stringify(data)}`)
			return { type: docType.type, success: false, error: data }
		}
	} catch (error) {
		log.error(`${docType.type.padEnd(20)} → Erreur: ${error.message}`)
		return { type: docType.type, success: false, error: error.message }
	}
}

/**
 * Test avec un secret invalide (doit échouer)
 */
async function testInvalidSecret() {
	log.section('Test 3: Sécurité (secret invalide)')

	try {
		const response = await fetch(`${BASE_URL}/api/revalidate?secret=invalid_secret`, {
			method: 'POST',
			headers: { 'Content-Type': application/json' },
			body: JSON.stringify({ _type: 'home' }),
		})

		const data = await response.json()

		if (response.status === 401 && data.message === 'Invalid secret') {
			log.success('Secret invalide correctement rejeté (401)')
			return true
		} else {
			log.error(`Sécurité compromise ! Status: ${response.status}`)
			log.error(`Response: ${JSON.stringify(data)}`)
			return false
		}
	} catch (error) {
		log.error(`Erreur lors du test de sécurité: ${error.message}`)
		return false
	}
}

/**
 * Vérifier la configuration des pages
 */
function checkPageConfiguration() {
	log.section('Test 4: Configuration ISR des pages')

	const pages = [
		{ file: 'src/app/page.tsx', route: '/' },
		{ file: 'src/app/a-propos/page.tsx', route: '/a-propos' },
		{ file: 'src/app/contact/page.tsx', route: '/contact' },
		{ file: 'src/app/tarifs/page.tsx', route: '/tarifs' },
		{ file: 'src/app/mentions-legales/page.tsx', route: '/mentions-legales' },
		{ file: 'src/app/politique-confidentialite/page.tsx', route: '/politique-confidentialite' },
		{ file: 'src/app/la-structure/[slug]/page.tsx', route: '/la-structure/[slug]' },
	]

	let allConfigured = true

	// Check via lecture de fichiers (synchrone pour simplicité)
	const fs = await import('fs')
	pages.forEach((page) => {
		try {
			const content = fs.readFileSync(page.file, 'utf-8')
			if (content.includes('export const revalidate = 0')) {
				log.success(`${page.route.padEnd(30)} → ISR on-demand`)
			} else {
				log.error(`${page.route.padEnd(30)} → ISR non configuré`)
				allConfigured = false
			}
		} catch (error) {
			log.error(`${page.route.padEnd(30)} → Fichier introuvable`)
			allConfigured = false
		}
	})

	return allConfigured
}

/**
 * Fonction principale
 */
async function main() {
	console.clear()
	log.title('🧪 TEST DE REVALIDATION ISR - Garderie Les P\'tits Loups')
	log.info(`URL de test: ${BASE_URL}`)
	log.info(`Secret configuré: ${SECRET ? '✓ Oui' : '✗ Non'}`)

	if (!SECRET) {
		log.error('SANITY_REVALIDATE_SECRET non défini dans .env.local')
		process.exit(1)
	}

	// Test 1: Santé de l'endpoint
	const healthOk = await testEndpointHealth()
	if (!healthOk) {
		log.error('\nImpossible de continuer sans un endpoint fonctionnel.')
		log.warning('Démarrez le serveur avec: npm run build && npm run start')
		process.exit(1)
	}

	// Test 2: Revalidation de chaque type de document
	log.section('Test 2: Revalidation par type de document')
	const results = []
	for (const docType of DOCUMENT_TYPES) {
		const result = await testRevalidation(docType)
		results.push(result)
	}

	// Test 3: Sécurité
	const securityOk = await testInvalidSecret()

	// Test 4: Configuration des pages
	const configOk = await checkPageConfiguration()

	// Résumé
	log.title('\n📊 Résumé des Tests')
	const successCount = results.filter((r) => r.success).length
	const totalCount = results.length

	console.log(`\n${colors.bright}Revalidations:${colors.reset} ${successCount}/${totalCount} réussies`)
	console.log(`${colors.bright}Sécurité:${colors.reset} ${securityOk ? '✓' : '✗'}`)
	console.log(`${colors.bright}Configuration:${colors.reset} ${configOk ? '✓' : '✗'}`)

	// Prochaines étapes
	log.title('\n📝 Prochaines Étapes')
	console.log('1. Configurer le webhook Sanity en production')
	console.log(`   URL: ${BASE_URL.replace('localhost:3100', 'votre-domaine.com')}/api/revalidate?secret=${SECRET}`)
	console.log('   Dataset: production')
	console.log('   Trigger: Create, Update, Delete')
	console.log('   Filter: _type in ["home", "aboutPage", "contactPage", "schedulePage", "sectorPage", "spacePage", "prices", "testimonials", "partners"]')
	console.log('\n2. Tester en production :')
	console.log('   - Modifier un document dans Sanity Studio')
	console.log('   - Publier les changements')
	console.log('   - Vérifier que la page se met à jour (~1-2s)')

	// Code de sortie
	const allOk = successCount === totalCount && securityOk && configOk
	if (allOk) {
		log.title('\n✅ Tous les tests sont passés avec succès !')
		process.exit(0)
	} else {
		log.title('\n❌ Certains tests ont échoué')
		process.exit(1)
	}
}

// Exécution
main().catch((error) => {
	log.error(`Erreur fatale: ${error.message}`)
	console.error(error)
	process.exit(1)
})
