#!/usr/bin/env node

/**
 * Script d'audit complet de tous les composants pour l'accessibilité
 * Usage: node scripts/tests/audit-all-components.mjs
 */

import { readFileSync, readdirSync, statSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Patterns de recherche pour les problèmes d'accessibilité
const accessibilityPatterns = {
  // Boutons sans labels
  buttonsWithoutLabels: [
    /<Button[^>]*size=['"]icon['"][^>]*>(?!.*aria-label)[^<]*<\/Button>/g,
    /<Button[^>]*size=['"]icon['"][^>]*>(?!.*aria-label)[^<]*\/>/g,
    /<button[^>]*>(?!.*aria-label)(?!.*>.*<)[^<]*<\/button>/g
  ],
  
  // Images sans alt
  imagesWithoutAlt: [
    /<img[^>]*(?!alt=)[^>]*>/g,
    /<Image[^>]*(?!alt=)[^>]*>/g
  ],
  
  // Liens sans texte
  linksWithoutText: [
    /<a[^>]*>(?!.*>.*<)[^<]*<\/a>/g,
    /<Link[^>]*>(?!.*>.*<)[^<]*<\/Link>/g
  ],
  
  // Formulaires sans labels (détection améliorée pour aria-label sur plusieurs lignes)
  formsWithoutLabels: [
    /<input(?![^>]*aria-label)(?![^>]*aria-labelledby)(?![^>]*id=)[^>]*>/g,
    /<textarea(?![^>]*aria-label)(?![^>]*aria-labelledby)(?![^>]*id=)[^>]*>/g,
    /<select(?![^>]*aria-label)(?![^>]*aria-labelledby)(?![^>]*id=)[^>]*>/g
  ],
  
  // Éléments interactifs sans rôles
  interactiveWithoutRoles: [
    /<div[^>]*onClick[^>]*(?!role=)[^>]*>/g,
    /<span[^>]*onClick[^>]*(?!role=)[^>]*>/g
  ]
}

function scanDirectory(dirPath, extensions = ['.tsx', '.ts', '.jsx', '.js']) {
  const results = []
  
  try {
    const items = readdirSync(dirPath)
    
    for (const item of items) {
      const fullPath = join(dirPath, item)
      const stat = statSync(fullPath)
      
      if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
        results.push(...scanDirectory(fullPath, extensions))
      } else if (stat.isFile() && extensions.some(ext => item.endsWith(ext))) {
        results.push(fullPath)
      }
    }
  } catch (error) {
    console.warn(`⚠️  Impossible de scanner ${dirPath}: ${error.message}`)
  }
  
  return results
}

function analyzeFile(filePath) {
  try {
    const content = readFileSync(filePath, 'utf8')
    const issues = []
    
    // Détection améliorée pour les formulaires avec aria-label sur plusieurs lignes
    const formElements = [
      { tag: 'input', pattern: /<input[^>]*>/g },
      { tag: 'textarea', pattern: /<textarea[^>]*>/g },
      { tag: 'select', pattern: /<select[^>]*>/g }
    ]
    
    formElements.forEach(({ tag, pattern }) => {
      const matches = content.match(pattern)
      if (matches) {
        matches.forEach(match => {
          // Vérifier si l'élément a un aria-label ou aria-labelledby dans les lignes suivantes
          const matchIndex = content.indexOf(match)
          const linesAfter = content.substring(matchIndex, matchIndex + 1000) // 1000 caractères après
          const hasAriaLabel = linesAfter.includes('aria-label') || linesAfter.includes('aria-labelledby')
          const hasId = match.includes('id=')
          
          if (!hasAriaLabel && !hasId) {
            const lineNumber = content.substring(0, matchIndex).split('\n').length
            issues.push({
              category: 'formsWithoutLabels',
              match,
              lineNumber,
              file: filePath.replace(process.cwd(), '')
            })
          }
        })
      }
    })

    // Détection améliorée pour les images avec alt sur plusieurs lignes
    const imageElements = [
      { tag: 'img', pattern: /<img[^>]*>/g },
      { tag: 'Image', pattern: /<Image[^>]*>/g }
    ]
    
    imageElements.forEach(({ tag, pattern }) => {
      const matches = content.match(pattern)
      if (matches) {
        matches.forEach(match => {
          // Vérifier si l'image a un alt dans les lignes suivantes
          const matchIndex = content.indexOf(match)
          const linesAfter = content.substring(matchIndex, matchIndex + 500) // 500 caractères après
          const hasAlt = linesAfter.includes('alt=') || linesAfter.includes('alt:')
          
          if (!hasAlt) {
            const lineNumber = content.substring(0, matchIndex).split('\n').length
            issues.push({
              category: 'imagesWithoutAlt',
              match,
              lineNumber,
              file: filePath.replace(process.cwd(), '')
            })
          }
        })
      }
    })

    // Détection améliorée pour les liens avec texte sur plusieurs lignes
    const linkElements = [
      { tag: 'a', pattern: /<a[^>]*>/g },
      { tag: 'Link', pattern: /<Link[^>]*>/g }
    ]
    
    linkElements.forEach(({ tag, pattern }) => {
      const matches = content.match(pattern)
      if (matches) {
        matches.forEach(match => {
          // Vérifier si le lien a du texte visible dans les lignes suivantes
          const matchIndex = content.indexOf(match)
          const linesAfter = content.substring(matchIndex, matchIndex + 1000) // 1000 caractères après
          
          // Chercher du texte entre les balises d'ouverture et fermeture
          const closingTag = tag === 'a' ? '</a>' : '</Link>'
          const closingIndex = content.indexOf(closingTag, matchIndex)
          
          if (closingIndex > matchIndex) {
            const linkContent = content.substring(matchIndex, closingIndex)
            // Vérifier s'il y a du texte visible ou un aria-label
            const hasVisibleText = linkContent.match(/>[^<]+</) && 
              linkContent.replace(/<[^>]*>/g, '').replace(/\s+/g, '').length > 0
            const hasAriaLabel = linkContent.includes('aria-label=')
            
            if (!hasVisibleText && !hasAriaLabel) {
              const lineNumber = content.substring(0, matchIndex).split('\n').length
              issues.push({
                category: 'linksWithoutText',
                match,
                lineNumber,
                file: filePath.replace(process.cwd(), '')
              })
            }
          }
        })
      }
    })
    
    // Autres patterns (boutons, etc.)
    Object.entries(accessibilityPatterns).forEach(([category, patterns]) => {
      if (category === 'formsWithoutLabels' || category === 'imagesWithoutAlt' || category === 'linksWithoutText') return // Déjà traités ci-dessus
      
      patterns.forEach(pattern => {
        const matches = content.match(pattern)
        if (matches) {
          matches.forEach(match => {
            const lineNumber = content.substring(0, content.indexOf(match)).split('\n').length
            issues.push({
              category,
              match,
              lineNumber,
              file: filePath.replace(process.cwd(), '')
            })
          })
        }
      })
    })
    
    return issues
  } catch (error) {
    console.warn(`⚠️  Impossible de lire ${filePath}: ${error.message}`)
    return []
  }
}

function auditAllComponents() {
  console.log('🔍 Audit complet de l\'accessibilité - Tous les composants\n')
  
  // Dossiers à scanner
  const scanPaths = [
    'src/components',
    'src/app',
    'src/pages'
  ]
  
  let allFiles = []
  scanPaths.forEach(path => {
    const fullPath = join(process.cwd(), path)
    allFiles.push(...scanDirectory(fullPath))
  })
  
  console.log(`📊 Fichiers scannés: ${allFiles.length}`)
  console.log()
  
  // Analyser tous les fichiers
  const allIssues = []
  allFiles.forEach(filePath => {
    const issues = analyzeFile(filePath)
    allIssues.push(...issues)
  })
  
  // Grouper les problèmes par catégorie
  const issuesByCategory = {}
  allIssues.forEach(issue => {
    if (!issuesByCategory[issue.category]) {
      issuesByCategory[issue.category] = []
    }
    issuesByCategory[issue.category].push(issue)
  })
  
  // Afficher les résultats
  console.log('📋 Résultats de l\'audit:\n')
  
  Object.entries(issuesByCategory).forEach(([category, issues]) => {
    const categoryNames = {
      buttonsWithoutLabels: 'Boutons sans labels accessibles',
      imagesWithoutAlt: 'Images sans attribut alt',
      linksWithoutText: 'Liens sans texte',
      formsWithoutLabels: 'Formulaires sans labels',
      interactiveWithoutRoles: 'Éléments interactifs sans rôles'
    }
    
    console.log(`❌ ${categoryNames[category] || category}: ${issues.length} problème(s)`)
    
    // Grouper par fichier
    const issuesByFile = {}
    issues.forEach(issue => {
      if (!issuesByFile[issue.file]) {
        issuesByFile[issue.file] = []
      }
      issuesByFile[issue.file].push(issue)
    })
    
    Object.entries(issuesByFile).forEach(([file, fileIssues]) => {
      console.log(`   📁 ${file}:`)
      fileIssues.forEach(issue => {
        console.log(`      Ligne ${issue.lineNumber}: ${issue.match.substring(0, 100)}...`)
      })
    })
    console.log()
  })
  
  // Résumé
  const totalIssues = allIssues.length
  console.log('📊 Résumé de l\'audit:')
  console.log(`   🔍 Fichiers analysés: ${allFiles.length}`)
  console.log(`   ❌ Problèmes trouvés: ${totalIssues}`)
  console.log(`   📁 Fichiers avec problèmes: ${new Set(allIssues.map(i => i.file)).size}`)
  console.log()
  
  if (totalIssues === 0) {
    console.log('🎉 Aucun problème d\'accessibilité détecté !')
  } else {
    console.log('🔧 Actions recommandées:')
    console.log('   1. Corriger les boutons sans labels (aria-label)')
    console.log('   2. Ajouter des attributs alt aux images')
    console.log('   3. Ajouter du texte aux liens')
    console.log('   4. Ajouter des labels aux formulaires')
    console.log('   5. Ajouter des rôles aux éléments interactifs')
  }
  
  console.log('\n🎯 Prochaines étapes:')
  console.log('   1. Corriger les problèmes identifiés')
  console.log('   2. Relancer Lighthouse')
  console.log('   3. Tester avec des lecteurs d\'écran')
  console.log('   4. Valider la navigation clavier')
}

// Exécution
auditAllComponents()
