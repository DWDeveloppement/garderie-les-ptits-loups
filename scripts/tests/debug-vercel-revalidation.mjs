#!/usr/bin/env node

/**
 * Script de diagnostic de revalidation ISR sur Vercel
 * Teste si le webhook Sanity déclenche correctement la revalidation
 */

import { config } from 'dotenv'

// Charger les variables d'environnement
config({ path: '.env.local' })

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
const VERCEL_URL = 'https://garderielesptitsloups-pataco80s-projects.vercel.app'
const SECRET = process.env.SANITY_REVALIDATE_SECRET

/**
 * Test 1: Vérifier que l'endpoint est accessible sur Vercel
 */
async function testVercelEndpoint() {
	log.section('Test 1: Endpoint Vercel')

	try {
		const response = await fetch(`${VERCEL_URL}/api/revalidate?secret=${SECRET}`)
		const data = await response.json()

		if (response.ok && data.status === 'ok') {
			log.success(`Endpoint accessible (${response.status})`)
			log.info(`Message: "${data.message}"`)
			return true
		} else {
			log.error(`Endpoint non accessible (${response.status})`)
			log.error(`Response: ${JSON.stringify(data)}`)
			return false
		}
	} catch (error) {
		log.error(`Erreur de connexion: ${error.message}`)
		return false
	}
}

/**
 * Test 2: Tester la revalidation d'une page
 */
async function testPageRevalidation() {
	log.section('Test 2: Revalidation de la page d\'accueil')

	try {
		// Déclencher la revalidation
		const response = await fetch(`${VERCEL_URL}/api/revalidate?secret=${SECRET}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ _type: 'home' }),
		})

		const data = await response.json()

		if (response.ok && data.revalidated === true) {
			log.success('Revalidation déclenchée avec succès')
			log.info(`Type: ${data.type}`)
			log.info(`Timestamp: ${new Date(data.now).toISOString()}`)

			// Attendre un peu pour que le cache se rafraîchisse
			log.info('Attente de 2 secondes pour la propagation...')
			await new Promise((resolve) => setTimeout(resolve, 2000))

			return true
		} else {
			log.error('Échec de la revalidation')
			log.error(`Response: ${JSON.stringify(data)}`)
			return false
		}
	} catch (error) {
		log.error(`Erreur: ${error.message}`)
		return false
	}
}

/**
 * Test 3: Vérifier les headers de cache
 */
async function testCacheHeaders() {
	log.section('Test 3: Headers de cache')

	try {
		const response = await fetch(`${VERCEL_URL}/`, {
			method: 'HEAD',
			cache: 'no-store',
		})

		const headers = {
			'cache-control': response.headers.get('cache-control'),
			'x-vercel-cache': response.headers.get('x-vercel-cache'),
			age: response.headers.get('age'),
			'x-nextjs-cache': response.headers.get('x-nextjs-cache'),
		}

		log.info('Headers de cache de la page d\'accueil:')
		Object.entries(headers).forEach(([key, value]) => {
			if (value) {
				console.log(`  ${key}: ${value}`)
			}
		})

		// Analyser le statut du cache
		const vercelCache = response.headers.get('x-vercel-cache')
		if (vercelCache === 'HIT') {
			log.warning('La page est servie depuis le cache Vercel (HIT)')
			log.warning('La revalidation pourrait ne pas fonctionner correctement')
		} else if (vercelCache === 'MISS') {
			log.success('La page n\'est pas en cache (MISS) - bon signe')
		} else if (vercelCache === 'STALE') {
			log.info('La page est stale - devrait être revalidée')
		}

		return true
	} catch (error) {
		log.error(`Erreur: ${error.message}`)
		return false
	}
}

/**
 * Test 4: Diagnostiquer le problème de cache
 */
async function diagnoseCacheProblem() {
	log.section('Test 4: Diagnostic du problème')

	log.info('Problèmes possibles avec revalidate = 0:')
	console.log('\n1. Next.js 15 + revalidate = 0 = ISR aggressive')
	console.log('   → Le cache est maintenu jusqu\'à revalidation explicite')
	console.log('   → revalidatePath() doit être appelé pour chaque changement')

	console.log('\n2. Cache Vercel Edge Network')
	console.log('   → Vercel a son propre cache en plus de Next.js')
	console.log('   → Peut prendre jusqu\'à 60s pour se propager')

	console.log('\n3. Webhook Sanity')
	console.log('   → Vérifier que le webhook est bien configuré')
	console.log('   → URL: ' + VERCEL_URL + '/api/revalidate?secret=...')
	console.log('   → Dataset: production')
	console.log('   → HTTP method: POST')
	console.log('   → GROQ filter configuré')

	log.warning('\n💡 Solution recommandée:')
	console.log('   Changer revalidate = 0 → revalidate = 60')
	console.log('   → Cache de 60s + revalidation on-demand')
	console.log('   → Équilibre entre performance et fraîcheur')
}

/**
 * Fonction principale
 */
async function main() {
	console.clear()
	log.title('🔍 DIAGNOSTIC REVALIDATION VERCEL')
	log.info(`URL: ${VERCEL_URL}`)
	log.info(`Secret: ${SECRET ? '✓ Configuré' : '✗ Non configuré'}`)

	if (!SECRET) {
		log.error('SANITY_REVALIDATE_SECRET non défini')
		process.exit(1)
	}

	// Exécuter les tests
	const endpointOk = await testVercelEndpoint()
	if (!endpointOk) {
		log.error('\nL\'endpoint n\'est pas accessible')
		process.exit(1)
	}

	const revalidationOk = await testPageRevalidation()
	await testCacheHeaders()
	await diagnoseCacheProblem()

	// Résumé
	log.title('\n📊 Résumé')
	console.log(`Endpoint accessible: ${endpointOk ? '✓' : '✗'}`)
	console.log(`Revalidation fonctionne: ${revalidationOk ? '✓' : '✗'}`)

	log.title('\n📝 Prochaines étapes')
	console.log('1. Vérifier les logs Vercel pour voir si le webhook est reçu')
	console.log('   → Vercel Dashboard > Deployments > Functions > Logs')
	console.log('\n2. Vérifier le webhook dans Sanity')
	console.log('   → Sanity Manage > API > Webhooks')
	console.log('   → Vérifier les logs du webhook')
	console.log('\n3. Tester manuellement le webhook depuis Sanity')
	console.log('   → Publier un document et vérifier les logs')
	console.log('\n4. Si le problème persiste, modifier revalidate = 60')
	console.log('   → Plus de détails dans SETUP.md')
}

// Exécution
main().catch((error) => {
	log.error(`Erreur fatale: ${error.message}`)
	console.error(error)
	process.exit(1)
})
