# ISR & Revalidation - Guide de dépannage

## Problème rencontré

Lorsque vous modifiez du contenu dans Sanity et que vous publiez, les changements n'apparaissent pas immédiatement sur le site Vercel en production. Il faut faire un redéploiement manuel pour voir les modifications.

## Cause du problème

### `revalidate = 0` avec Next.js 15

Dans Next.js 15, `export const revalidate = 0` ne signifie **PAS** "pas de cache". Au contraire, cela active **l'ISR on-demand le plus agressif possible**:

```typescript
export const revalidate = 0
// ❌ Cela signifie : "Cache infini jusqu'à revalidation explicite"
// Pas de cache automatique basé sur le temps
// UNIQUEMENT revalidation manuelle via revalidatePath()
```

### Le problème sur Vercel

1. **Cache Next.js** : Les pages sont générées au build et mises en cache
2. **Cache Vercel Edge Network** : Vercel ajoute une couche de cache supplémentaire
3. **Propagation lente** : Même après revalidatePath(), le cache Vercel peut prendre jusqu'à 60s pour se propager

Résultat : Le webhook Sanity appelle bien l'API `/api/revalidate`, mais le cache reste actif.

## Solution : `revalidate = 60`

```typescript
export const revalidate = 60
// ✅ Cela signifie : "Cache de 60s + revalidation on-demand"
// - Le contenu est rafraîchi automatiquement toutes les 60s
// - Le webhook Sanity peut aussi forcer la revalidation immédiatement
// - Meilleur équilibre entre performance et fraîcheur
```

### Avantages

- ✅ **Cache automatique** : Le contenu se rafraîchit même sans webhook
- ✅ **Revalidation immédiate** : Le webhook force une mise à jour instantanée
- ✅ **Performance** : Les pages restent rapides grâce au cache
- ✅ **Fiabilité** : Fonctionne même si le webhook échoue

### Configuration actuelle

Toutes les pages ont été mises à jour avec `revalidate = 60`:

- `src/app/page.tsx` (home)
- `src/app/a-propos/page.tsx`
- `src/app/contact/page.tsx`
- `src/app/tarifs/page.tsx`
- `src/app/mentions-legales/page.tsx`
- `src/app/politique-confidentialite/page.tsx`
- `src/app/la-structure/[slug]/page.tsx`

## Configuration du webhook Sanity

### URL du webhook

```
https://garderielesptitsloups-pataco80s-projects.vercel.app/api/revalidate?secret=f1e699f481c62a6399066c5b70285cf7a58806595cddb814c5b38b74f7043e8a
```

### Configuration dans Sanity Manage

1. Aller sur [Sanity Manage](https://www.sanity.io/manage)
2. Sélectionner votre projet
3. Aller dans **API** > **Webhooks**
4. Créer un nouveau webhook avec:
   - **Name**: Vercel Production Revalidation
   - **URL**: L'URL ci-dessus
   - **Dataset**: production
   - **Trigger on**: Create, Update, Delete
   - **HTTP method**: POST
   - **GROQ filter** (optionnel):
     ```groq
     _type in ["home", "aboutPage", "contactPage", "schedulePage", "legacyPage", "privatePolicyPage", "sectorPage", "spacePage", "prices", "testimonials", "partners"]
     ```

## Vérification et débogage

### 1. Tester l'endpoint localement

```bash
npm run build && npm run start
npm run test:revalidate
```

### 2. Tester l'endpoint sur Vercel

```bash
npm run debug:vercel
```

Ce script vérifie:
- ✅ Que l'endpoint `/api/revalidate` est accessible
- ✅ Que la revalidation fonctionne
- ✅ Les headers de cache
- 📊 Diagnostique les problèmes potentiels

### 3. Vérifier les logs Vercel

1. Aller sur [Vercel Dashboard](https://vercel.com/dashboard)
2. Sélectionner votre projet
3. Aller dans **Deployments** > **Functions** > **Logs**
4. Chercher les logs de `/api/revalidate`

Vous devriez voir:
```
[Revalidate] Type: home, Slug: N/A
```

### 4. Vérifier les logs du webhook Sanity

1. Aller sur [Sanity Manage](https://www.sanity.io/manage) > API > Webhooks
2. Cliquer sur votre webhook
3. Voir l'onglet **Deliveries**
4. Vérifier que les requêtes retournent `200 OK`

## Timeline attendue

Avec `revalidate = 60`:

1. **Modification dans Sanity** : 0s
2. **Publication** : 0s
3. **Webhook déclenché** : ~1-2s
4. **Next.js revalidatePath()** : ~2-3s
5. **Cache Vercel propagé** : ~5-60s
6. **Contenu visible** : 5-60s max

Si vous visitez la page juste après la publication, vous verrez l'ancienne version pendant quelques secondes, puis la nouvelle.

## Dépannage

### Le contenu ne se met pas à jour après 60s

1. Vérifier que le webhook Sanity est bien configuré
2. Vérifier les logs Vercel pour voir si `/api/revalidate` est appelé
3. Vérifier que `SANITY_REVALIDATE_SECRET` est défini dans Vercel
4. Essayer un hard refresh du navigateur (Cmd+Shift+R / Ctrl+Shift+F5)

### Le webhook retourne 401 Unauthorized

Le secret ne correspond pas. Vérifier:
1. `.env.local` : `SANITY_REVALIDATE_SECRET=...`
2. Vercel Environment Variables : `SANITY_REVALIDATE_SECRET=...`
3. URL du webhook Sanity : `?secret=...` doit correspondre

### Le webhook retourne 500 Internal Server Error

Vérifier les logs Vercel pour voir l'erreur exacte. Causes possibles:
- Erreur dans le code de `/api/revalidate/route.ts`
- Type de document non géré dans le switch/case
- Erreur de connexion à Sanity

## Alternatives

### Option 1: Cache plus court (30s)

Si 60s est trop long, vous pouvez réduire:

```typescript
export const revalidate = 30 // Cache de 30s
```

⚠️ Plus le cache est court, plus les requêtes à Sanity seront fréquentes.

### Option 2: Pas de cache (SSR pur)

Si vous voulez vraiment du SSR sans cache:

```typescript
export const dynamic = 'force-dynamic'
export const revalidate = 0
```

⚠️ Cela désactive complètement le cache. **Performance dégradée**.

### Option 3: Cache très long (3600s = 1h)

Si le contenu change rarement:

```typescript
export const revalidate = 3600 // Cache de 1h
```

✅ Excellente performance, mais contenu moins frais.

## Recommandation finale

**Garder `revalidate = 60`** est le meilleur compromis pour ce projet:

- Les pages sont rapides (cache de 60s)
- Le contenu se rafraîchit automatiquement toutes les minutes
- Le webhook Sanity force une mise à jour immédiate
- Fonctionne de manière fiable sur Vercel

## Resources

- [Next.js ISR Documentation](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration)
- [Vercel Cache Documentation](https://vercel.com/docs/edge-network/caching)
- [Sanity Webhooks Documentation](https://www.sanity.io/docs/webhooks)
