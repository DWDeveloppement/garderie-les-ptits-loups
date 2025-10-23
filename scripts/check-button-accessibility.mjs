#!/usr/bin/env node

/**
 * Script pour vérifier l'accessibilité des boutons
 * Usage: node scripts/check-button-accessibility.mjs
 */

import { readFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

function checkButtonAccessibility() {
  console.log('🔍 Vérification de l\'accessibilité des boutons\n')
  
  try {
    // Lire le fichier example/page.tsx
    const examplePage = readFileSync(join(__dirname, '../src/app/example/page.tsx'), 'utf8')
    
    // Rechercher tous les boutons
    const buttonMatches = examplePage.match(/<Button[^>]*>/g) || []
    
    console.log(`📊 Statistiques:`)
    console.log(`   Total des boutons trouvés: ${buttonMatches.length}`)
    console.log()
    
    // Analyser chaque bouton
    const buttonAnalysis = buttonMatches.map((button, index) => {
      const hasAriaLabel = button.includes('aria-label=')
      const hasTextContent = button.includes('>') && !button.includes('/>')
      const hasIconOnly = button.includes('size=\'icon\'')
      
      return {
        index: index + 1,
        button,
        hasAriaLabel,
        hasTextContent,
        hasIconOnly,
        isAccessible: hasAriaLabel || (hasTextContent && !hasIconOnly)
      }
    })
    
    // Boutons problématiques
    const problematicButtons = buttonAnalysis.filter(btn => !btn.isAccessible)
    const iconButtons = buttonAnalysis.filter(btn => btn.hasIconOnly)
    const accessibleButtons = buttonAnalysis.filter(btn => btn.isAccessible)
    
    console.log('✅ Boutons accessibles:')
    accessibleButtons.forEach(btn => {
      const method = btn.hasAriaLabel ? 'aria-label' : 'texte visible'
      console.log(`   ${btn.index}. ${method}`)
    })
    console.log()
    
    if (problematicButtons.length > 0) {
      console.log('❌ Boutons problématiques:')
      problematicButtons.forEach(btn => {
        console.log(`   ${btn.index}. ${btn.button}`)
        console.log(`      Problème: ${btn.hasIconOnly ? 'Bouton icon sans aria-label' : 'Bouton sans contenu accessible'}`)
        console.log(`      Solution: Ajouter aria-label="Description du bouton"`)
        console.log()
      })
    } else {
      console.log('🎉 Tous les boutons sont accessibles !')
    }
    
    console.log('📋 Résumé:')
    console.log(`   ✅ Boutons accessibles: ${accessibleButtons.length}`)
    console.log(`   ❌ Boutons problématiques: ${problematicButtons.length}`)
    console.log(`   🔘 Boutons icon: ${iconButtons.length}`)
    console.log()
    
    if (problematicButtons.length === 0) {
      console.log('🎯 Prochaine étape:')
      console.log('   1. Tester avec Lighthouse')
      console.log('   2. Vérifier la navigation clavier')
      console.log('   3. Tester avec un lecteur d\'écran')
    } else {
      console.log('🔧 Actions à effectuer:')
      console.log('   1. Ajouter aria-label aux boutons icon')
      console.log('   2. Ajouter du texte visible aux boutons sans contenu')
      console.log('   3. Relancer ce script pour vérifier')
    }
    
  } catch (error) {
    console.error('❌ Erreur lors de la vérification:', error.message)
  }
}

// Exécution
checkButtonAccessibility()
