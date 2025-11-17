#!/usr/bin/env node

/**
 * Script de test d'accessibilité simplifié pour les boutons
 * Usage: node scripts/test-accessibility-simple.mjs
 */

import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Tests d'accessibilité à effectuer
const accessibilityTests = [
  {
    name: 'Contraste des couleurs',
    description: 'Vérifier le contraste des boutons sur fond blanc',
    steps: [
      'Ouvrir /example dans le navigateur',
      'Vérifier le contraste du bouton Primary (purple-9)',
      'Vérifier le contraste du bouton Secondary (orange-9)',
      'Vérifier le contraste du bouton Destructive (red-9)',
      'Vérifier le contraste du bouton Outline (purple-7)',
      'Vérifier le contraste du bouton Ghost (purple-11)',
      'Vérifier le contraste du bouton Link (purple-9)'
    ],
    criteria: 'Ratio de contraste minimum 4.5:1 (AA)'
  },
  {
    name: 'Navigation clavier',
    description: 'Tester la navigation clavier entre les boutons',
    steps: [
      'Ouvrir /example dans le navigateur',
      'Appuyer sur Tab pour naviguer entre les boutons',
      'Vérifier que le focus est visible (ring de focus)',
      'Appuyer sur Enter pour activer un bouton',
      'Appuyer sur Space pour activer un bouton',
      'Vérifier que les boutons disabled ne sont pas activables',
      'Vérifier que les boutons loading ne sont pas activables'
    ],
    criteria: 'Navigation clavier complète et focus visible'
  },
  {
    name: 'États des boutons',
    description: 'Tester tous les états des boutons',
    steps: [
      'Ouvrir /example dans le navigateur',
      'Tester l\'état normal (clic fonctionne)',
      'Tester l\'état disabled (clic ne fonctionne pas)',
      'Tester l\'état loading (clic ne fonctionne pas)',
      'Tester l\'état success (couleur verte)',
      'Tester l\'état error (couleur rouge)',
      'Tester l\'état warning (couleur amber)',
      'Tester l\'état info (couleur bleue)'
    ],
    criteria: 'Tous les états fonctionnent correctement'
  },
  {
    name: 'Tailles des boutons',
    description: 'Vérifier les tailles des boutons',
    steps: [
      'Ouvrir /example dans le navigateur',
      'Vérifier la taille Small (h-8)',
      'Vérifier la taille Medium (h-9)',
      'Vérifier la taille Large (h-10)',
      'Vérifier la taille Extra Large (h-12)',
      'Vérifier la taille Icon (h-9 w-9)',
      'Vérifier que les touch targets sont suffisants (44px minimum)'
    ],
    criteria: 'Touch targets minimum 44px'
  },
  {
    name: 'Responsive design',
    description: 'Tester le design responsive',
    steps: [
      'Ouvrir /example dans le navigateur',
      'Tester sur mobile (320px)',
      'Tester sur tablet (768px)',
      'Tester sur desktop (1200px)',
      'Vérifier que les boutons s\'adaptent',
      'Vérifier que l\'espacement est approprié',
      'Vérifier que le texte reste lisible'
    ],
    criteria: 'Design responsive sur tous les appareils'
  }
]

// Fonction pour afficher les tests
function displayTests() {
  console.log('🧪 Tests d\'accessibilité pour les boutons\n')
  
  accessibilityTests.forEach((test, index) => {
    console.log(`${index + 1}. 🔍 ${test.name}`)
    console.log(`   ${test.description}\n`)
    
    console.log('   Étapes à suivre:')
    test.steps.forEach((step, stepIndex) => {
      console.log(`   ${stepIndex + 1}. ${step}`)
    })
    
    console.log(`\n   Critère: ${test.criteria}\n`)
    console.log('   ' + '─'.repeat(50) + '\n')
  })
  
  console.log('📋 Checklist de validation:')
  console.log('   [ ] Tous les tests visuels passent')
  console.log('   [ ] Navigation clavier fonctionne')
  console.log('   [ ] Contraste suffisant (4.5:1)')
  console.log('   [ ] Touch targets appropriés (44px)')
  console.log('   [ ] Design responsive')
  console.log('   [ ] Pas d\'erreurs d\'accessibilité')
  
  console.log('\n🎯 Critères de succès:')
  console.log('   ✅ Navigation clavier complète')
  console.log('   ✅ Support lecteurs d\'écran')
  console.log('   ✅ Contraste suffisant')
  console.log('   ✅ Touch targets appropriés')
  console.log('   ✅ Design responsive')
  
  console.log('\n🚀 Pour commencer:')
  console.log('   1. Ouvrir http://localhost:3000/example')
  console.log('   2. Suivre les étapes de chaque test')
  console.log('   3. Cocher les critères validés')
  console.log('   4. Noter les problèmes trouvés')
  console.log('   5. Corriger les problèmes identifiés')
}

// Fonction pour générer un rapport
function generateReport() {
  console.log('📊 Rapport de test d\'accessibilité\n')
  
  console.log('Date:', new Date().toLocaleDateString('fr-FR'))
  console.log('Page testée: /example')
  console.log('Navigateur: Chrome/Firefox/Safari')
  console.log('Appareil: Desktop/Mobile/Tablet\n')
  
  console.log('Résultats:')
  accessibilityTests.forEach((test, index) => {
    console.log(`${index + 1}. ${test.name}: [ ] Passé [ ] Échec`)
  })
  
  console.log('\nProblèmes identifiés:')
  console.log('   - [ ] Contraste insuffisant')
  console.log('   - [ ] Navigation clavier défaillante')
  console.log('   - [ ] Touch targets trop petits')
  console.log('   - [ ] Design non responsive')
  console.log('   - [ ] Autres: _______________')
  
  console.log('\nActions correctives:')
  console.log('   - [ ] Ajuster les couleurs')
  console.log('   - [ ] Améliorer la navigation')
  console.log('   - [ ] Agrandir les touch targets')
  console.log('   - [ ] Optimiser le responsive')
  console.log('   - [ ] Autres: _______________')
}

// Exécution
const args = process.argv.slice(2)
if (args.includes('--report')) {
  generateReport()
} else {
  displayTests()
}
