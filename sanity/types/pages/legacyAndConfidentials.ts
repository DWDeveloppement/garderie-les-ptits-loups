// 📂 sanity/types/pages/legacyAndConfidentials.ts
// 👉 Types pour les pages Mentions Légales et Politique de Confidentialité

import type { PortableTextBlock } from '../core/portableText'

/**
 * Type commun pour les pages légales (mentions légales et politique de confidentialité)
 * Ces pages ont la même structure : titre + contenu Portable Text
 */
export type LegalPageData = {
	title: string
	content: PortableTextBlock[]
}

// Alias pour compatibilité (deprecated - utiliser LegalPageData)
export type LegacyAndConfidentialsPageData = LegalPageData
