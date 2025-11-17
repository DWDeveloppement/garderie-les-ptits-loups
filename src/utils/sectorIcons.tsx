import type { IconName } from '@/components/icons'

/**
 * Fonction utilitaire pour obtenir l'icône correspondante selon le secteur
 */
export function getSectorIcon(sectorSlug: string): IconName {
  switch (sectorSlug.toLowerCase()) {
    case 'nurserie':
    case 'nursery':
      return 'baby'
    case 'trotteurs':
    case 'trotters':
      return 'footprints'
    case 'grands':
    case 'bigs':
      return 'smile'
    default:
      return 'home' // Icône par défaut
  }
}

/**
 * Fonction utilitaire pour obtenir l'icône selon le titre du secteur
 */
export function getSectorIconByTitle(title: string): IconName {
  const titleLower = title.toLowerCase()
  
  if (titleLower.includes('nurserie') || titleLower.includes('nursery')) {
    return 'baby'
  }
  
  if (titleLower.includes('trotteurs') || titleLower.includes('trotters')) {
    return 'footprints'
  }
  
  if (titleLower.includes('grands') || titleLower.includes('bigs')) {
    return 'smile'
  }
  
  return 'home' // Icône par défaut
}