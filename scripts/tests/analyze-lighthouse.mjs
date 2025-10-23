#!/usr/bin/env node

/**
 * Script pour analyser le rapport Lighthouse et extraire les informations d'accessibilité
 * Usage: node scripts/analyze-lighthouse.mjs
 */

import { readFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

function analyzeLighthouseReport() {
  try {
    // Lire le fichier Lighthouse
    const lighthouseData = JSON.parse(readFileSync(join(__dirname, '../lightouse.json'), 'utf8'))
    
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
    Object.entries(lighthouseData.categories).forEach(([category, data]) => {
      const score = Math.round(data.score * 100)
      const emoji = score >= 90 ? '🟢' : score >= 50 ? '🟡' : '🔴'
      console.log(`   ${emoji} ${data.title}: ${score}/100`)
    })
    console.log()
    
    // Analyse spécifique de l'accessibilité
    const accessibility = lighthouseData.categories.accessibility
    console.log('♿ Analyse d\'accessibilité:')
    console.log(`   Score: ${Math.round(accessibility.score * 100)}/100`)
    console.log(`   Description: ${accessibility.description}`)
    console.log()
    
    // Audits d'accessibilité avec violations
    console.log('🔍 Audits d\'accessibilité:')
    const accessibilityAudits = accessibility.auditRefs.filter(audit => 
      lighthouseData.audits[audit.id] && lighthouseData.audits[audit.id].score !== null
    )
    
    const passedAudits = accessibilityAudits.filter(audit => 
      lighthouseData.audits[audit.id].score === 1
    )
    
    const failedAudits = accessibilityAudits.filter(audit => 
      lighthouseData.audits[audit.id].score === 0
    )
    
    const notApplicableAudits = accessibilityAudits.filter(audit => 
      lighthouseData.audits[audit.id].score === null
    )
    
    console.log(`   ✅ Audits réussis: ${passedAudits.length}`)
    console.log(`   ❌ Audits échoués: ${failedAudits.length}`)
    console.log(`   ➖ Non applicables: ${notApplicableAudits.length}`)
    console.log()
    
    // Détails des violations
    if (failedAudits.length > 0) {
      console.log('❌ Violations d\'accessibilité détectées:')
      failedAudits.forEach(audit => {
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
      console.log('   🎉 Excellent score d\'accessibilité !')
      console.log('   ✅ Continue les tests manuels pour valider')
    } else if (accessibility.score >= 0.7) {
      console.log('   🟡 Bon score, mais des améliorations sont possibles')
      console.log('   🔧 Corriger les violations identifiées')
    } else {
      console.log('   🔴 Score d\'accessibilité faible')
      console.log('   🚨 Corriger immédiatement les violations')
    }
    
    console.log()
    console.log('📋 Prochaines étapes:')
    console.log('   1. Corriger les violations identifiées')
    console.log('   2. Effectuer des tests manuels')
    console.log('   3. Tester avec un lecteur d\'écran')
    console.log('   4. Vérifier la navigation clavier')
    console.log('   5. Relancer Lighthouse pour valider')
    
  } catch (error) {
    console.error('❌ Erreur lors de l\'analyse:', error.message)
    console.log('\n💡 Assure-toi que le fichier lightouse.json existe dans le répertoire racine')
  }
}

// Exécution
analyzeLighthouseReport()
