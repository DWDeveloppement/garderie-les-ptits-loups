
# Audit Lazy Components (SSG/CSR + Typage strict)

Ce rapport couvre **uniquement** les composants du dossier `src/components/lazy/` et les utilitaires liés (`src/components/shared/LazyComponent*.tsx`).  
Objectifs :
1. Vérifier l’usage **client/serveur** compatible SSG  
2. Repérer/corriger les points **TypeScript/lint**, en tenant compte du passage à `LazyComponent2` (générique `P`) et de **skeletons indépendants**

---

## 🧩 Résumé exécutif

- Tous les wrappers `lazy/*` sont marqués **`'use client'`** ✅ — parfait pour un site **SSG** avec composants interactifs.
- Ils importent encore **l’ancienne** version `LazyComponent` (avec `any`) ❌ et déclarent `props: any` ❌.
- Aucun accès direct à `window/document` dans les wrappers ✅ (bon pour SSG).
- Les **skeletons** sont importés depuis l’ancien `LazyComponent` (qui les exporte) → **à découpler** conformément à ta préférence (skeletons indépendants) ⚠️.
- Recommandation forte :  
  - **remplacer** `LazyComponent` par **`LazyComponent2`** (ou le renommer en `createLazyComponent`),  
  - **supprimer** `props: any` via une **factory** typée,  
  - **déplacer** les skeletons dans un module dédié (`components/lazy/skeletons.tsx`).

---

## 📁 Fichiers analysés

| Fichier | Statut | Commentaire |
|----------|---------|-------------|
| `shared/LazyComponent.tsx` | Ancienne version ❌ | Utilise `any`, exporte des skeletons |
| `shared/LazyComponent2.tsx` | Nouvelle version ✅ | Générique `<P extends Record<string, unknown>>`, base saine |
| `lazy/LazyHeroGlobal.tsx` | Wrapper ❌ | `props:any`, ancien import |
| `lazy/LazyParallaxSection.tsx` | Wrapper ❌ | idem |
| `lazy/LazyHeroSection.tsx` | Wrapper ❌ | idem |
| `lazy/LazyContactForm.tsx` | Wrapper ❌ | idem |
| `lazy/LazyGallery.tsx` | Wrapper ❌ | idem |

---

## 🔍 Analyse & recommandations (par fichier)

### 1️⃣ `shared/LazyComponent.tsx`
- `'use client'`, `React.lazy`, `Suspense` ✅  
- **Utilise `any`** (`ComponentType<any>`, `[key:string]:any`) ❌  
- **Mélange utilitaire + skeletons** ❌  

**Action :** déprécier ou supprimer, déplacer les skeletons dans un module séparé.

---

### 2️⃣ `shared/LazyComponent2.tsx`
- `'use client'`, `React.lazy`, `Suspense` ✅  
- Typage strict `<P extends Record<string, unknown>>` ✅  
- Compatible SSG/CSR ✅

**Action :** conserver tel quel (ou renommer en `createLazyComponent.tsx`).

---

### 3️⃣–7️⃣ Composants `lazy/*`
Tous ont le même pattern :
```tsx
'use client'
import { XYSkeleton, LazyComponent } from '@/components/shared/LazyComponent'

export function LazyXYZ(props: any) {
  return (
    <LazyComponent
      component={() => import('@/components/...')}
      fallback={<XYSkeleton />}
      {...props}
    />
  )
}
```
**Problèmes :**  
- `props:any` ❌  
- Import de l’ancien `LazyComponent` ❌  
- Skeletons dépendants ❌  

**Actions :**  
1. Remplacer l’import par :  
   ```tsx
   import { createLazyComponent } from '@/components/shared/createLazyComponent'
   import { XYSkeleton } from '@/components/lazy/skeletons'
   ```
2. Supprimer le wrapper `props:any` → remplacer par factory :  
   ```tsx
   export const LazyXYZ = createLazyComponent(
     () => import('@/components/...'),
     <XYSkeleton />
   )
   ```
3. Garder `'use client'` en tête.

---

## ⚙️ Recommandations globales

### A. Imports
**Avant :**  
```tsx
import { XSkeleton, LazyComponent } from '@/components/shared/LazyComponent'
```
**Après :**  
```tsx
import { createLazyComponent } from '@/components/shared/createLazyComponent'
import { XSkeleton } from '@/components/lazy/skeletons'
```

### B. Factory Pattern
```tsx
export const LazyHeroGlobal = createLazyComponent(
  () => import('@/components/shared/HeroGlobal').then(m => ({ default: m.HeroGlobal })),
  <HeroSkeleton />
)
```
→ zéro `any`, typage automatique, cohérence globale.

### C. SSG / Next.js
- Wrappers `lazy/*` = `use client` ✅  
- Lazy = exécution uniquement côté client ✅  
- SSG = pas de SSR bloquant ✅  
- Galleries, parallax, formulaires → tous OK côté client ✅

---

## ✅ Check-list de migration

1. Créer `src/components/lazy/skeletons.tsx` ou un dossier dédié.  
2. Renommer `LazyComponent2.tsx` → `createLazyComponent.tsx` (optionnel mais conseillé).  
3. Mettre à jour chaque wrapper `lazy/*` selon le pattern `createLazyComponent(...)`.  
4. Supprimer `LazyComponent.tsx` (ou le marquer deprecated).  
5. Vérifier que tous les imports `LazyComponent` pointent vers la version typée.

---

## 💡 Impacts

| Aspect | Résultat |
|---------|-----------|
| Typage | ✅ strict, suppression des `any` |
| Performance | ✅ inchangée (lazy runtime) |
| Skeletons | ✅ indépendants et réutilisables |
| SSG compatibilité | ✅ 100 % sûre |
| Maintenance | ✅ structure claire et scalable |
