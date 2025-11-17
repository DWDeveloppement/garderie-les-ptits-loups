// 📂 sanity/types/index.ts
// 👉 Barrel export principal pour tous les types Sanity

export * from './core'
export * from './content'
export * from './validation'
// pages exports après content pour éviter les conflits (content/prices.ts prend priorité)
export * from './pages'

