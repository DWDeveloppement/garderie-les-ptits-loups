/**
 * Export centralisé de toutes les queries GROQ
 * Organisation: 1 fichier par page pour maintenabilité
 */

// Pages fixes
export * from './about'
export * from './contact'
export * from './home'
export * from './schedule'

// Pages secteurs
export * from './sectors'

// Documents auxiliaires
export * from './footer'
export * from './partners'
export * from './prices'

// Queries partagées avec React Cache (pour layout)
export * from './shared'
