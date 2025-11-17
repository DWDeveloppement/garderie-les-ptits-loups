/**
 * Script de test de performance pour les requêtes Sanity
 * Exécute toutes les requêtes et génère un rapport JSON
 */

import { existsSync, mkdirSync, unlinkSync, writeFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const projectRoot = join(__dirname, '../../')

// Charger les variables d'environnement
import { config } from 'dotenv'
config({ path: join(projectRoot, '.env.local') })

// Import dynamique des fonctions fetch (ESM)
const {
	fetchHome,
	fetchTestimonials,
	fetchAbout,
	fetchContact,
	fetchSchedule,
	getLayoutData,
	fetchMonthlyNursery,
	fetchDailyNursery,
	fetchMonthlyTG,
	fetchDailyTG,
	fetchSubsidies,
	fetchNurserie,
	fetchTrotteurs,
	fetchGrands,
	fetchAutresEspaces,
} = await import('../../lib/sanity/queries/index.ts')

// Import des fonctions de mesure
const { generatePerformanceReport, resetMeasurements, generateAlerts } = await import('../../lib/performance/measure.ts')
// Note: setThresholds est disponible si vous voulez personnaliser les seuils
// const { setThresholds } = await import('../../lib/performance/measure.ts')

/**
 * Liste de toutes les requêtes à tester
 */
const queries = [
	{ name: 'Home Page', fn: fetchHome },
	{ name: 'Testimonials', fn: fetchTestimonials },
	{ name: 'About Page', fn: fetchAbout },
	{ name: 'Contact Page', fn: fetchContact },
	{ name: 'Schedule Page', fn: fetchSchedule },
	{ name: 'Layout Data (Footer + Partners)', fn: getLayoutData },
	{ name: 'Prices - Monthly Nursery', fn: fetchMonthlyNursery },
	{ name: 'Prices - Daily Nursery', fn: fetchDailyNursery },
	{ name: 'Prices - Monthly TG', fn: fetchMonthlyTG },
	{ name: 'Prices - Daily TG', fn: fetchDailyTG },
	{ name: 'Prices - Subsidies', fn: fetchSubsidies },
	{ name: 'Sector - Nurserie', fn: fetchNurserie },
	{ name: 'Sector - Trotteurs', fn: fetchTrotteurs },
	{ name: 'Sector - Grands', fn: fetchGrands },
	{ name: 'Sector - Autres Espaces', fn: fetchAutresEspaces },
]

/**
 * Génère un rapport Markdown formaté
 */
function generateMarkdownReport(report, alerts) {
	const timestamp = new Date(report.generatedAt).toLocaleString('fr-FR', {
		dateStyle: 'full',
		timeStyle: 'long',
	})

	let md = `# 📊 Rapport de Performance\n\n`
	md += `**Généré le :** ${timestamp}\n\n`
	md += `---\n\n`

	// Résumé
	md += `## 📈 Résumé\n\n`
	md += `| Métrique | Valeur |\n`
	md += `|----------|--------|\n`
	md += `| Total requêtes | ${report.summary.count} |\n`
	md += `| Requêtes Sanity | ${report.summary.sanityQueries} |\n`
	md += `| Temps total Sanity | **${report.summary.sanityTotal}ms** |\n`
	md += `| Temps total général | **${report.summary.total}ms** |\n`
	md += `| Temps moyen par requête | **${Math.round(report.summary.sanityTotal / report.summary.sanityQueries)}ms** |\n\n`

	// Alertes
	if (report.summary.alerts && report.summary.alerts.total > 0) {
		md += `## ⚠️ Alertes\n\n`
		md += `| Niveau | Nombre |\n`
		md += `|--------|--------|\n`
		md += `| ⚠️ Warning | ${report.summary.alerts.warning} |\n`
		md += `| 🔴 Error | ${report.summary.alerts.error} |\n`
		md += `| 🚨 Critical | ${report.summary.alerts.critical} |\n`
		md += `| **Total** | **${report.summary.alerts.total}** |\n\n`

		if (alerts.length > 0) {
			md += `### Détails des alertes\n\n`
			md += `| Requête | Durée | Seuil | Niveau |\n`
			md += `|---------|-------|-------|--------|\n`

			alerts.forEach((alert) => {
				const queryName = alert.measure.label.replace('Sanity Query: ', '')
				const icon = alert.level === 'critical' ? '🚨' : alert.level === 'error' ? '🔴' : '⚠️'
				const badge = alert.level === 'critical' ? '`critical`' : alert.level === 'error' ? '`error`' : '`warning`'
				md += `| ${icon} ${queryName} | **${alert.measure.duration}ms** | ${alert.threshold}ms | ${badge} |\n`
			})
			md += `\n`
		}
	} else {
		md += `## ✅ Aucune alerte\n\n`
		md += `Toutes les requêtes sont dans les seuils acceptables.\n\n`
	}

	// Seuils configurés
	if (report.thresholds) {
		md += `## ⚙️ Seuils configurés\n\n`
		md += `| Niveau | Seuil |\n`
		md += `|--------|-------|\n`
		md += `| Warning | ${report.thresholds.warning}ms |\n`
		md += `| Error | ${report.thresholds.error}ms |\n`
		md += `| Critical | ${report.thresholds.critical}ms |\n\n`
	}

	// Requêtes les plus lentes
	if (report.sanityQueries.length > 0) {
		md += `## 🐌 Requêtes les plus lentes\n\n`
		md += `| Rang | Requête | Durée |\n`
		md += `|------|---------|-------|\n`

		const sorted = [...report.sanityQueries].sort((a, b) => b.duration - a.duration)
		sorted.slice(0, 10).forEach((m, i) => {
			const queryName = m.label.replace('Sanity Query: ', '')
			const isAlert = alerts.some((a) => a.measure.label === m.label)
			const alertIcon = isAlert ? '⚠️ ' : ''
			md += `| ${i + 1} | ${alertIcon}${queryName} | **${m.duration}ms** |\n`
		})
		md += `\n`
	}

	// Détails par requête
	md += `## 📋 Détails par requête\n\n`
	md += `| Requête | Durée | Statut |\n`
	md += `|---------|-------|--------|\n`

	report.sanityQueries
		.sort((a, b) => a.label.localeCompare(b.label))
		.forEach((m) => {
			const queryName = m.label.replace('Sanity Query: ', '')
			const alert = alerts.find((a) => a.measure.label === m.label)
			let status = '✅ OK'
			if (alert) {
				status = alert.level === 'critical' ? '🚨 Critical' : alert.level === 'error' ? '🔴 Error' : '⚠️ Warning'
			}
			md += `| ${queryName} | ${m.duration}ms | ${status} |\n`
		})

	md += `\n---\n\n`
	md += `*Rapport généré automatiquement par le script de test de performance*\n`

	return md
}

/**
 * Exécute toutes les requêtes et génère le rapport
 */
async function runPerformanceTest() {
	console.log('🚀 Démarrage du test de performance...\n')

	// Configurer les seuils (optionnel - peut être personnalisé)
	// setThresholds({
	//   warning: 100,
	//   error: 200,
	//   critical: 500,
	//   specific: {
	//     'home-page': { warning: 150, error: 300, critical: 600 }
	//   }
	// })

	// Réinitialiser les mesures
	resetMeasurements()

	const results = []
	const errors = []

	// Exécuter toutes les requêtes
	for (const { name, fn } of queries) {
		try {
			console.log(`⏳ Exécution: ${name}...`)
			const start = Date.now()
			await fn()
			const duration = Date.now() - start
			console.log(`✅ ${name}: ${duration}ms\n`)
			results.push({ name, success: true, duration })
		} catch (error) {
			console.error(`❌ ${name}: ERREUR\n`, error.message)
			errors.push({ name, error: error.message, stack: error.stack })
			results.push({ name, success: false, error: error.message })
		}
	}

	// Générer les alertes
	const alerts = generateAlerts()

	// Générer le rapport avec alertes
	const report = generatePerformanceReport({ includeAlerts: true })

	// Ajouter les résultats individuels
	report.results = results
	if (errors.length > 0) {
		report.errors = errors
	}

	// Créer le dossier reports s'il n'existe pas
	const reportsDir = join(projectRoot, 'reports')
	try {
		mkdirSync(reportsDir, { recursive: true })
	} catch {
		// Le dossier existe déjà
	}

	// Sauvegarder le rapport
	const reportPath = join(reportsDir, 'performance-report.json')

	// Supprimer l'ancien fichier s'il existe pour éviter les conflits
	if (existsSync(reportPath)) {
		try {
			unlinkSync(reportPath)
		} catch (err) {
			console.warn(`⚠️  Impossible de supprimer l'ancien rapport: ${err.message}`)
		}
	}

	// Écrire le nouveau rapport JSON
	writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf-8')

	// Générer et sauvegarder le rapport Markdown
	const markdownReport = generateMarkdownReport(report, alerts)
	const markdownPath = join(reportsDir, 'performance-report.md')
	if (existsSync(markdownPath)) {
		try {
			unlinkSync(markdownPath)
		} catch (err) {
			console.warn(`⚠️  Impossible de supprimer l'ancien rapport Markdown: ${err.message}`)
		}
	}
	writeFileSync(markdownPath, markdownReport, 'utf-8')

	// Afficher un résumé
	console.log('\n' + '='.repeat(60))
	console.log('📊 RAPPORT DE PERFORMANCE')
	console.log('='.repeat(60))
	console.log(`\n📈 Résumé:`)
	console.log(`   Total requêtes: ${report.summary.count}`)
	console.log(`   Requêtes Sanity: ${report.summary.sanityQueries}`)
	console.log(`   Temps total Sanity: ${report.summary.sanityTotal}ms`)
	console.log(`   Temps total général: ${report.summary.total}ms`)
	console.log(`\n✅ Succès: ${results.filter((r) => r.success).length}`)
	console.log(`❌ Erreurs: ${errors.length}`)

	// Afficher les alertes
	if (report.summary.alerts && report.summary.alerts.total > 0) {
		console.log(`\n⚠️  Alertes:`)
		console.log(`   ⚠️  Warning: ${report.summary.alerts.warning}`)
		console.log(`   🔴 Error: ${report.summary.alerts.error}`)
		console.log(`   🚨 Critical: ${report.summary.alerts.critical}`)
		console.log(`   Total: ${report.summary.alerts.total}`)

		// Afficher les détails des alertes
		if (alerts.length > 0) {
			console.log(`\n📋 Détails des alertes:`)
			alerts.forEach((alert) => {
				const icon = alert.level === 'critical' ? '🚨' : alert.level === 'error' ? '🔴' : '⚠️'
				const queryName = alert.measure.label.replace('Sanity Query: ', '')
				console.log(`   ${icon} ${queryName.padEnd(35)} ${alert.measure.duration}ms (seuil: ${alert.threshold}ms)`)
			})
		}
	} else {
		console.log(`\n✅ Aucune alerte - toutes les requêtes sont dans les seuils acceptables`)
	}

	console.log(`\n📄 Rapports sauvegardés:`)
	console.log(`   JSON: ${reportPath}`)
	console.log(`   Markdown: ${markdownPath}`)
	console.log('='.repeat(60) + '\n')

	// Afficher les requêtes les plus lentes
	if (report.sanityQueries.length > 0) {
		const sorted = [...report.sanityQueries].sort((a, b) => b.duration - a.duration)
		console.log('🐌 Requêtes les plus lentes:')
		sorted.slice(0, 5).forEach((m, i) => {
			const queryName = m.label.replace('Sanity Query: ', '')
			console.log(`   ${i + 1}. ${queryName.padEnd(40)} ${m.duration}ms`)
		})
		console.log('')
	}

	// Déterminer le code de sortie basé sur les alertes
	const exitCode = report.summary.alerts?.critical && report.summary.alerts.critical > 0 ? 1 : 0

	return { report, exitCode }
}

// Exécuter le test
runPerformanceTest()
	.then(({ exitCode }) => {
		if (exitCode === 0) {
			console.log('✨ Test terminé avec succès')
		} else {
			console.log('⚠️  Test terminé avec des alertes critiques')
		}
		process.exit(exitCode)
	})
	.catch((error) => {
		console.error('💥 Erreur fatale:', error)
		process.exit(1)
	})
