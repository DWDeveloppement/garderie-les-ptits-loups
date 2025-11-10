#!/usr/bin/env node

/**
 * Script pour générer automatiquement un rapport Lighthouse
 * Usage: node scripts/tests/run-lighthouse.mjs [url]
 *
 * Prérequis:
 * - npm install -g lighthouse (ou npm install --save-dev lighthouse)
 * - Serveur en cours d'exécution sur http://localhost:3100/
 */

import { execSync } from 'child_process'
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const DEFAULT_URL = 'http://localhost:3100/'
const REPORTS_DIR = join(__dirname, '../../reports')
const OUTPUT_FILE = join(REPORTS_DIR, 'lightouse.json')

/**
 * Vérifie si Lighthouse CLI est installé
 */
function checkLighthouseInstalled() {
	try {
		execSync('lighthouse --version', { stdio: 'ignore' })
		return true
	} catch {
		return false
	}
}

/**
 * Vérifie si le serveur est accessible
 */
function checkServerAccessible(url) {
	try {
		const response = execSync(`curl -s -o /dev/null -w "%{http_code}" ${url}`, { encoding: 'utf8' })
		return response.trim() === '200'
	} catch {
		return false
	}
}

/**
 * Génère le rapport Lighthouse
 */
async function generateLighthouseReport(url = DEFAULT_URL) {
	console.log('🚀 Génération du rapport Lighthouse\n')

	// Vérifier si Lighthouse CLI est installé
	if (!checkLighthouseInstalled()) {
		console.error("❌ Lighthouse CLI n'est pas installé")
		console.log('\n💡 Pour installer Lighthouse CLI :')
		console.log('   npm install -g lighthouse')
		console.log('   ou')
		console.log('   npm install --save-dev lighthouse')
		console.log('\n   Puis ajoutez lighthouse dans votre PATH')
		process.exit(1)
	}

	// Vérifier si le serveur est accessible
	if (!checkServerAccessible(url)) {
		console.error(`❌ Serveur non accessible : ${url}`)
		console.log("\n💡 Assurez-vous que le serveur est en cours d'exécution :")
		console.log('   npm run review (ou npm run start)')
		process.exit(1)
	}

	// Créer le dossier reports s'il n'existe pas
	if (!existsSync(REPORTS_DIR)) {
		mkdirSync(REPORTS_DIR, { recursive: true })
	}

	// Sauvegarder l'ancien fichier s'il existe
	if (existsSync(OUTPUT_FILE)) {
		const stats = statSync(OUTPUT_FILE)
		const backupName = `lightouse.backup.${Date.now()}.json`
		const backupPath = join(REPORTS_DIR, backupName)
		try {
			writeFileSync(backupPath, readFileSync(OUTPUT_FILE, 'utf8'))
			console.log(`📦 Ancien rapport sauvegardé : ${backupName}\n`)
		} catch (err) {
			console.warn(`⚠️  Impossible de sauvegarder l'ancien rapport : ${err.message}\n`)
		}
	}

	// Générer le rapport Lighthouse
	console.log(`📊 Analyse de ${url}...`)
	console.log('   Cela peut prendre 30-60 secondes...\n')

	try {
		// Commande Lighthouse avec options
		const lighthouseCmd = `lighthouse ${url} --output=json --output-path=${OUTPUT_FILE} --chrome-flags="--headless --no-sandbox" --quiet`

		execSync(lighthouseCmd, {
			stdio: 'inherit',
			cwd: process.cwd(),
		})

		// Vérifier que le fichier a été créé
		if (!existsSync(OUTPUT_FILE)) {
			throw new Error("Le fichier Lighthouse n'a pas été généré")
		}

		const stats = statSync(OUTPUT_FILE)
		const fileSize = (stats.size / 1024).toFixed(2)

		console.log(`\n✅ Rapport Lighthouse généré avec succès`)
		console.log(`   Fichier : ${OUTPUT_FILE}`)
		console.log(`   Taille : ${fileSize} KB`)
		console.log(`   Date : ${new Date(stats.mtime).toLocaleString('fr-FR')}\n`)

		// Lancer l'analyse automatiquement
		console.log("📋 Lancement de l'analyse...\n")
		const { analyzeLighthouseReport } = await import('./analyze-lighthouse.mjs')
		analyzeLighthouseReport()
	} catch (error) {
		console.error('\n❌ Erreur lors de la génération du rapport Lighthouse')
		console.error(`   ${error.message}`)
		console.log('\n💡 Vérifiez que :')
		console.log('   1. Lighthouse CLI est correctement installé')
		console.log('   2. Le serveur est accessible sur', url)
		console.log('   3. Chrome/Chromium est installé')
		process.exit(1)
	}
}

// Exécution
const url = process.argv[2] || DEFAULT_URL
generateLighthouseReport(url).catch((error) => {
	console.error('❌ Erreur fatale:', error)
	process.exit(1)
})
