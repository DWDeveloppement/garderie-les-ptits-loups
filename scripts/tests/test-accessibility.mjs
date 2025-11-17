#!/usr/bin/env node

/**
 * Script de test d'accessibilité manuel pour les boutons
 * Usage: node scripts/test-accessibility.mjs
 */

import { dirname } from 'path'
import { chromium } from 'playwright'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const BASE_URL = 'http://localhost:3000'

// Tests d'accessibilité à effectuer
const accessibilityTests = [
  {
    name: 'Contraste des couleurs',
    url: '/example',
    selector: '[data-testid="button-primary"]',
    tests: [
      'Vérifier le contraste du texte sur fond',
      'Vérifier le contraste des bordures',
      'Vérifier le contraste des états hover'
    ]
  },
  {
    name: 'Navigation clavier',
    url: '/example',
    selector: '[data-testid="button-group"]',
    tests: [
      'Navigation avec Tab',
      'Activation avec Enter',
      'Activation avec Space',
      'Focus visible'
    ]
  },
  {
    name: 'États des boutons',
    url: '/example',
    selector: '[data-testid="button-states"]',
    tests: [
      'État disabled',
      'État loading',
      'État success',
      'État error'
    ]
  }
]

async function runAccessibilityTests() {
  console.log('🧪 Démarrage des tests d\'accessibilité...\n')
  
  const browser = await chromium.launch({ headless: false })
  const context = await browser.newContext()
  const page = await context.newPage()
  
  try {
    // Aller sur la page de test
    await page.goto(BASE_URL + '/example')
    await page.waitForLoadState('networkidle')
    
    console.log('✅ Page chargée avec succès')
    
    // Test 1: Contraste des couleurs
    console.log('\n🔍 Test 1: Contraste des couleurs')
    const primaryButton = await page.locator('[data-testid="button-primary"]')
    if (await primaryButton.count() > 0) {
      const contrast = await page.evaluate(() => {
        const element = document.querySelector('[data-testid="button-primary"]')
        if (!element) return null
        
        const styles = window.getComputedStyle(element)
        return {
          backgroundColor: styles.backgroundColor,
          color: styles.color,
          borderColor: styles.borderColor
        }
      })
      console.log('   Couleurs détectées:', contrast)
    }
    
    // Test 2: Navigation clavier
    console.log('\n⌨️ Test 2: Navigation clavier')
    await page.keyboard.press('Tab')
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName)
    console.log('   Élément focusé:', focusedElement)
    
    // Test 3: États des boutons
    console.log('\n🔄 Test 3: États des boutons')
    const buttons = await page.locator('button').all()
    console.log(`   ${buttons.length} boutons trouvés`)
    
    for (let i = 0; i < Math.min(buttons.length, 5); i++) {
      const button = buttons[i]
      const isDisabled = await button.isDisabled()
      const text = await button.textContent()
      console.log(`   Bouton ${i + 1}: "${text}" - Disabled: ${isDisabled}`)
    }
    
    // Test 4: Contraste automatique avec axe-core
    console.log('\n🤖 Test 4: Analyse automatique avec axe-core')
    const accessibilityResults = await page.evaluate(async () => {
      // Injecter axe-core si pas déjà présent
      if (!window.axe) {
        const script = document.createElement('script')
        script.src = 'https://unpkg.com/axe-core@4.8.2/axe.min.js'
        document.head.appendChild(script)
        await new Promise(resolve => script.onload = resolve)
      }
      
      return await window.axe.run()
    })
    
    console.log('   Violations trouvées:', accessibilityResults.violations.length)
    if (accessibilityResults.violations.length > 0) {
      console.log('   Détails des violations:')
      accessibilityResults.violations.forEach((violation, index) => {
        console.log(`     ${index + 1}. ${violation.description}`)
        console.log(`        Impact: ${violation.impact}`)
        console.log(`        Éléments: ${violation.nodes.length}`)
      })
    }
    
    // Test 5: Métriques de performance
    console.log('\n📊 Test 5: Métriques de performance')
    const metrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0]
      return {
        loadTime: navigation.loadEventEnd - navigation.loadEventStart,
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        firstPaint: performance.getEntriesByType('paint').find(entry => entry.name === 'first-paint')?.startTime,
        firstContentfulPaint: performance.getEntriesByType('paint').find(entry => entry.name === 'first-contentful-paint')?.startTime
      }
    })
    
    console.log('   Temps de chargement:', Math.round(metrics.loadTime), 'ms')
    console.log('   DOM Content Loaded:', Math.round(metrics.domContentLoaded), 'ms')
    console.log('   First Paint:', Math.round(metrics.firstPaint || 0), 'ms')
    console.log('   First Contentful Paint:', Math.round(metrics.firstContentfulPaint || 0), 'ms')
    
    console.log('\n✅ Tests d\'accessibilité terminés!')
    
  } catch (error) {
    console.error('❌ Erreur lors des tests:', error)
  } finally {
    await browser.close()
  }
}

// Fonction pour tester manuellement
async function runManualTests() {
  console.log('📋 Tests d\'accessibilité manuels à effectuer:\n')
  
  console.log('1. 🔍 Tests Visuels:')
  console.log('   - Ouvrir /example dans le navigateur')
  console.log('   - Vérifier le contraste des boutons')
  console.log('   - Tester les états hover/focus/active')
  console.log('   - Vérifier la lisibilité sur mobile\n')
  
  console.log('2. ⌨️ Tests Clavier:')
  console.log('   - Naviguer avec Tab/Shift+Tab')
  console.log('   - Activer avec Enter/Space')
  console.log('   - Vérifier le focus visible')
  console.log('   - Tester l\'ordre de navigation\n')
  
  console.log('3. 🔊 Tests Lecteurs d\'Écran:')
  console.log('   - Utiliser NVDA/JAWS/VoiceOver')
  console.log('   - Vérifier les annonces')
  console.log('   - Tester la navigation')
  console.log('   - Vérifier les états\n')
  
  console.log('4. 📱 Tests Responsive:')
  console.log('   - Tester sur mobile (320px)')
  console.log('   - Tester sur tablet (768px)')
  console.log('   - Tester sur desktop (1200px)')
  console.log('   - Vérifier les touch targets\n')
  
  console.log('5. 🎯 Critères de Succès:')
  console.log('   - Contraste AA (4.5:1) minimum')
  console.log('   - Touch targets 44px minimum')
  console.log('   - Navigation clavier complète')
  console.log('   - Support lecteurs d\'écran')
  console.log('   - Performance < 100ms')
}

// Exécution
const args = process.argv.slice(2)
if (args.includes('--manual')) {
  runManualTests()
} else {
  runAccessibilityTests()
}
