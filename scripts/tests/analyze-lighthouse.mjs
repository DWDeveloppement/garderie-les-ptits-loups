#!/usr/bin/env node

/**
 * Script pour analyser le rapport Lighthouse et extraire les informations d'accessibilité
 * Usage: node scripts/analyze-lighthouse.mjs
 */

import { existsSync, readFileSync, statSync, unlinkSync, writeFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export function analyzeLighthouseReport() {
	try {
		// Lire le fichier Lighthouse depuis reports/
		const lighthousePath = join(__dirname, '../../reports/lightouse.json')

		// Vérifier si le fichier existe
		if (!existsSync(lighthousePath)) {
			console.error('❌ Fichier Lighthouse introuvable:', lighthousePath)
			console.log('\n💡 Pour générer le fichier :')
			console.log('   1. Lancez le serveur : npm run review (ou npm run start)')
			console.log('   2. Ouvrez http://localhost:3100/ dans Chrome')
			console.log('   3. Ouvrez DevTools (F12) → Onglet Lighthouse')
			console.log('   4. Cliquez sur "Analyse"')
			console.log('   5. Exportez le rapport JSON vers reports/lightouse.json')
			process.exit(1)
		}

		// Vérifier la date de modification du fichier
		const stats = statSync(lighthousePath)
		const fileModified = new Date(stats.mtime)
		const now = new Date()
		const ageInHours = (now - fileModified) / (1000 * 60 * 60)

		if (ageInHours > 24) {
			console.warn(`⚠️  Le fichier Lighthouse est ancien (modifié il y a ${Math.round(ageInHours)} heures)`)
			console.warn("   Le rapport peut ne pas refléter l'état actuel du site.\n")
		}

		const lighthouseData = JSON.parse(readFileSync(lighthousePath, 'utf8'))
    
    console.log('🔍 Analyse du rapport Lighthouse\n')
    
    // Informations générales
    console.log('📊 Informations générales:')
    console.log(`   URL: ${lighthouseData.requestedUrl}`)
    console.log(`   Date: ${new Date(lighthouseData.fetchTime).toLocaleDateString('fr-FR')}`)
    console.log(`   Version Lighthouse: ${lighthouseData.lighthouseVersion}`)
    console.log(`   User Agent: ${lighthouseData.userAgent.split(' ')[0]}`)
    console.log()
    
    // Scores par catégorie
    console.log('📈 Scores par catégorie:')
		Object.entries(lighthouseData.categories).forEach(([, data]) => {
      const score = Math.round(data.score * 100)
      const emoji = score >= 90 ? '🟢' : score >= 50 ? '🟡' : '🔴'
      console.log(`   ${emoji} ${data.title}: ${score}/100`)
    })
    console.log()
    
    // Analyse spécifique de l'accessibilité
    const accessibility = lighthouseData.categories.accessibility
		console.log("♿ Analyse d'accessibilité:")
    console.log(`   Score: ${Math.round(accessibility.score * 100)}/100`)
    console.log(`   Description: ${accessibility.description}`)
    console.log()
    
    // Audits d'accessibilité avec violations
		console.log("🔍 Audits d'accessibilité:")
		const accessibilityAudits = accessibility.auditRefs.filter(
			(audit) => lighthouseData.audits[audit.id] && lighthouseData.audits[audit.id].score !== null
		)

		const passedAudits = accessibilityAudits.filter((audit) => lighthouseData.audits[audit.id].score === 1)

		const failedAudits = accessibilityAudits.filter((audit) => lighthouseData.audits[audit.id].score === 0)

		const notApplicableAudits = accessibilityAudits.filter((audit) => lighthouseData.audits[audit.id].score === null)
    
    console.log(`   ✅ Audits réussis: ${passedAudits.length}`)
    console.log(`   ❌ Audits échoués: ${failedAudits.length}`)
    console.log(`   ➖ Non applicables: ${notApplicableAudits.length}`)
    console.log()
    
    // Détails des violations
    if (failedAudits.length > 0) {
			console.log("❌ Violations d'accessibilité détectées:")
			failedAudits.forEach((audit) => {
        const auditData = lighthouseData.audits[audit.id]
        console.log(`   • ${auditData.title}`)
        console.log(`     ${auditData.description}`)
        if (auditData.details && auditData.details.items) {
          console.log(`     Éléments concernés: ${auditData.details.items.length}`)
        }
        console.log()
      })
    }
    
    // Recommandations
    console.log('💡 Recommandations:')
    if (accessibility.score >= 0.9) {
			console.log("   🎉 Excellent score d'accessibilité !")
      console.log('   ✅ Continue les tests manuels pour valider')
    } else if (accessibility.score >= 0.7) {
      console.log('   🟡 Bon score, mais des améliorations sont possibles')
      console.log('   🔧 Corriger les violations identifiées')
    } else {
			console.log("   🔴 Score d'accessibilité faible")
      console.log('   🚨 Corriger immédiatement les violations')
    }
    
    console.log()
    console.log('📋 Prochaines étapes:')
    console.log('   1. Corriger les violations identifiées')
    console.log('   2. Effectuer des tests manuels')
		console.log("   3. Tester avec un lecteur d'écran")
    console.log('   4. Vérifier la navigation clavier')
    console.log('   5. Relancer Lighthouse pour valider')
    
		// Générer le rapport Markdown
		const markdownReport = generateMarkdownReport(lighthouseData)
		const reportsDir = join(__dirname, '../../reports')
		const markdownPath = join(reportsDir, 'lighthouse-report.md')

		if (existsSync(markdownPath)) {
			try {
				unlinkSync(markdownPath)
			} catch (err) {
				console.warn(`⚠️  Impossible de supprimer l'ancien rapport Markdown: ${err.message}`)
			}
		}
		writeFileSync(markdownPath, markdownReport, 'utf-8')

		console.log(`\n📄 Rapport Markdown sauvegardé: ${markdownPath}`)
  } catch (error) {
		console.error("❌ Erreur lors de l'analyse:", error.message)
		console.log('\n💡 Assure-toi que le fichier reports/lightouse.json existe')
	}
}

/**
 * Génère un rapport Markdown formaté depuis les données Lighthouse
 */
function generateMarkdownReport(lighthouseData) {
	// Date de génération du rapport Markdown (maintenant)
	const generatedAt = new Date().toLocaleString('fr-FR', {
		dateStyle: 'full',
		timeStyle: 'long',
	})

	// Date d'exécution du test Lighthouse (depuis les données)
	const fetchedAt = new Date(lighthouseData.fetchTime).toLocaleString('fr-FR', {
		dateStyle: 'full',
		timeStyle: 'long',
	})

	let md = `# 🚀 Rapport Lighthouse\n\n`
	md += `**URL analysée :** ${lighthouseData.requestedUrl}\n`
	md += `**Test Lighthouse exécuté le :** ${fetchedAt}\n`
	md += `**Rapport généré le :** ${generatedAt}\n`
	md += `**Version Lighthouse :** ${lighthouseData.lighthouseVersion}\n\n`
	md += `---\n\n`

	// Scores par catégorie
	md += `## 📊 Scores par catégorie\n\n`
	md += `| Catégorie | Score | Statut |\n`
	md += `|-----------|-------|--------|\n`

	Object.entries(lighthouseData.categories).forEach(([, data]) => {
		const score = Math.round(data.score * 100)
		const emoji = score >= 90 ? '🟢' : score >= 50 ? '🟡' : '🔴'
		const status = score >= 90 ? 'Excellent' : score >= 50 ? 'Bon' : 'À améliorer'
		md += `| ${emoji} ${data.title} | **${score}/100** | ${status} |\n`
	})
	md += `\n`

	// Métriques de performance
	const perf = lighthouseData.categories.performance
	if (perf) {
		md += `## ⚡ Métriques de Performance\n\n`
		md += `| Métrique | Valeur | Score |\n`
		md += `|----------|--------|-------|\n`

		const metrics = ['first-contentful-paint', 'largest-contentful-paint', 'total-blocking-time', 'cumulative-layout-shift', 'speed-index']
		metrics.forEach((metricId) => {
			const audit = lighthouseData.audits[metricId]
			if (audit && audit.numericValue !== undefined) {
				const score = audit.score !== null ? Math.round(audit.score * 100) : 'N/A'
				const value = audit.displayValue || `${Math.round(audit.numericValue)}${audit.numericUnit || 'ms'}`
				const emoji = audit.score >= 0.75 ? '🟢' : audit.score >= 0.5 ? '🟡' : '🔴'
				md += `| ${emoji} ${audit.title} | ${value} | ${score} |\n`
			}
		})
		md += `\n`

		// Analyse détaillée du TBT
		const tbtAudit = lighthouseData.audits['total-blocking-time']
		if (tbtAudit && tbtAudit.score < 0.75) {
			md += `### 🔴 Analyse du Total Blocking Time (TBT)\n\n`
			md += `**Valeur actuelle :** ${tbtAudit.displayValue || `${Math.round(tbtAudit.numericValue)}ms`}\n`
			md += `**Score :** ${Math.round(tbtAudit.score * 100)}/100\n\n`

			// Longues tâches
			const longTasks = lighthouseData.audits['long-tasks']
			if (longTasks && longTasks.details && longTasks.details.items) {
				md += `#### 📋 Tâches longues (>50ms)\n\n`
				md += `| Source | Durée | Impact |\n`
				md += `|--------|-------|--------|\n`

				longTasks.details.items.slice(0, 10).forEach((task) => {
					const url = task.url || 'Inconnu'
					const duration = task.duration || 0
					const blockingTime = Math.max(0, duration - 50) // TBT = durée - 50ms
					const impact = blockingTime > 200 ? '🔴 Critique' : blockingTime > 100 ? '🟡 Élevé' : '🟢 Modéré'

					// Filtrer les extensions Chrome
					const isExtension = url.includes('chrome-extension://')
					const source = isExtension ? `⚠️ Extension Chrome (${url.split('/')[2]})` : url

					md += `| ${source} | ${Math.round(duration)}ms | ${impact} |\n`
				})
				md += `\n`

				// Statistiques
				const siteTasks = longTasks.details.items.filter((t) => !t.url?.includes('chrome-extension://'))
				const extensionTasks = longTasks.details.items.filter((t) => t.url?.includes('chrome-extension://'))

				if (extensionTasks.length > 0) {
					const extTotal = extensionTasks.reduce((sum, t) => sum + (t.duration || 0), 0)
					md += `⚠️ **Note :** ${extensionTasks.length} tâche(s) longue(s) proviennent d'extensions Chrome (${Math.round(extTotal)}ms). Ces tâches ne sont pas de votre responsabilité mais impactent les mesures.\n\n`
				}

				const siteTotal = siteTasks.reduce((sum, t) => sum + Math.max(0, (t.duration || 0) - 50), 0)
				md += `**TBT réel du site :** ~${Math.round(siteTotal)}ms (hors extensions)\n\n`
			}

			// Ressources qui bloquent le rendu
			const renderBlocking = lighthouseData.audits['render-blocking-insight'] || lighthouseData.audits['render-blocking-resources']
			if (renderBlocking && renderBlocking.details && renderBlocking.details.items) {
				md += `#### 🚫 Ressources qui bloquent le rendu\n\n`
				md += `| Ressource | Taille | Impact estimé |\n`
				md += `|------------|--------|---------------|\n`

				renderBlocking.details.items.slice(0, 5).forEach((item) => {
					const url = item.url || 'Inconnu'
					const size = item.totalBytes ? `${Math.round(item.totalBytes / 1024)}KB` : 'N/A'
					const wasted = item.wastedMs ? `${Math.round(item.wastedMs)}ms` : 'N/A'
					md += `| ${url.split('/').pop()} | ${size} | ${wasted} |\n`
				})
				md += `\n`

				const totalWasted = renderBlocking.details.items.reduce((sum, item) => sum + (item.wastedMs || 0), 0)
				if (totalWasted > 0) {
					md += `💡 **Économie potentielle :** ${Math.round(totalWasted)}ms en optimisant ces ressources\n\n`
				}
			}

			// Recommandations
			md += `#### 💡 Recommandations pour réduire le TBT\n\n`
			md += `1. **Optimiser le CSS** : Inline le CSS critique ou utiliser ` + '`font-display: swap`' + `\n`
			md += `2. **Code splitting** : Vérifier que Next.js fait bien le code splitting automatique\n`
			md += `3. **Déferrer le JavaScript non critique** : Utiliser ` + '`next/dynamic`' + ` pour les imports lourds\n`
			md += `4. **Optimiser les chunks** : Analyser les chunks Next.js pour identifier les dépendances lourdes\n`
			md += `5. **Éviter les extensions en production** : Les mesures en local peuvent être faussées par les extensions\n\n`
		}
	}

	// Analyse d'accessibilité
	const accessibility = lighthouseData.categories.accessibility
	if (accessibility) {
		md += `## ♿ Analyse d'Accessibilité\n\n`
		md += `**Score :** ${Math.round(accessibility.score * 100)}/100\n\n`

		const accessibilityAudits = accessibility.auditRefs.filter(
			(audit) => lighthouseData.audits[audit.id] && lighthouseData.audits[audit.id].score !== null
		)

		const passedAudits = accessibilityAudits.filter((audit) => lighthouseData.audits[audit.id].score === 1)

		const failedAudits = accessibilityAudits.filter((audit) => lighthouseData.audits[audit.id].score === 0)

		md += `| Statut | Nombre |\n`
		md += `|--------|--------|\n`
		md += `| ✅ Réussis | ${passedAudits.length} |\n`
		md += `| ❌ Échoués | ${failedAudits.length} |\n`
		md += `\n`

		if (failedAudits.length > 0) {
			md += `### ❌ Violations détectées\n\n`
			md += `| Problème | Description | Éléments |\n`
			md += `|----------|-------------|----------|\n`

			failedAudits.slice(0, 20).forEach((audit) => {
				const auditData = lighthouseData.audits[audit.id]
				const itemsCount = auditData.details?.items?.length || 0
				md += `| ${auditData.title} | ${auditData.description.substring(0, 100)}... | ${itemsCount} |\n`
			})
			md += `\n`
		}
	}

	// SEO
	const seo = lighthouseData.categories.seo
	if (seo) {
		md += `## 🔍 SEO\n\n`
		md += `**Score :** ${Math.round(seo.score * 100)}/100\n\n`

		const seoAudits = seo.auditRefs.filter((audit) => lighthouseData.audits[audit.id] && lighthouseData.audits[audit.id].score !== null)

		const failedSeo = seoAudits.filter((audit) => lighthouseData.audits[audit.id].score === 0)

		if (failedSeo.length > 0) {
			md += `### ⚠️ Problèmes SEO\n\n`
			failedSeo.slice(0, 10).forEach((audit) => {
				const auditData = lighthouseData.audits[audit.id]
				md += `- **${auditData.title}**\n`
			})
			md += `\n`
		}
	}

	// Best Practices
	const bestPractices = lighthouseData.categories['best-practices']
	if (bestPractices) {
		md += `## ✅ Bonnes Pratiques\n\n`
		md += `**Score :** ${Math.round(bestPractices.score * 100)}/100\n\n`
	}

	md += `---\n\n`
	md += `*Rapport généré automatiquement depuis Lighthouse*\n`

	return md
}

// Exécution directe (si le script est appelé directement, pas en import)
// Utilise fileURLToPath pour comparer correctement les chemins
const scriptPath = fileURLToPath(import.meta.url)
const mainPath = process.argv[1] ? fileURLToPath(`file://${process.argv[1]}`) : ''
if (scriptPath === mainPath || process.argv[1]?.includes('analyze-lighthouse')) {
analyzeLighthouseReport()
}
