#!/usr/bin/env node

/**
 * Script pour nettoyer le cache de Sanity Studio
 * Résout les problèmes d'affichage d'images supprimées
 */

import { rmSync, existsSync } from 'fs'
import { join } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const projectRoot = join(__dirname, '..')

console.log('🧹 Nettoyage du cache de Sanity Studio...')
console.log('')

const cachePaths = [
	join(projectRoot, 'node_modules', '.sanity'),
	join(projectRoot, '.sanity'),
	join(projectRoot, '.next', 'cache'),
]

let cleaned = 0

for (const cachePath of cachePaths) {
	if (existsSync(cachePath)) {
		try {
			rmSync(cachePath, { recursive: true, force: true })
			console.log(`✅ Supprimé: ${cachePath}`)
			cleaned++
		} catch (error) {
			console.error(`❌ Erreur lors de la suppression de ${cachePath}:`, error.message)
		}
	} else {
		console.log(`ℹ️  Non trouvé (déjà propre): ${cachePath}`)
	}
}

console.log('')
if (cleaned > 0) {
	console.log(`✅ ${cleaned} cache(s) nettoyé(s)`)
	console.log('')
	console.log('💡 Prochaines étapes:')
	console.log('   1. Ferme complètement Sanity Studio (Ctrl+C)')
	console.log('   2. Dans le navigateur: Cmd+Shift+R (Mac) ou Ctrl+Shift+R (Windows)')
	console.log('   3. Relance: npm run sanity')
} else {
	console.log('✅ Aucun cache à nettoyer')
	console.log('')
	console.log('💡 Si le problème persiste:')
	console.log('   1. Ferme complètement Sanity Studio')
	console.log('   2. Vide le cache du navigateur (DevTools → Application → Clear storage)')
	console.log('   3. Relance: npm run sanity')
}

console.log('')
console.log('🏁 Nettoyage terminé')

