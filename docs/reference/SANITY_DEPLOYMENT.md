# Plan de déploiement Sanity - Garderie Les P'tits Loups

## 📋 Checklist de déploiement

### ✅ 1. Nettoyer les images inutilisées

**Script disponible :** `npm run cleanup:media`

**Prérequis :**

- Variables d'environnement configurées dans `.env` :
  - `SANITY_STUDIO_PROJECT_ID` ou `NEXT_PUBLIC_SANITY_PROJECT_ID`
  - `SANITY_STUDIO_DATASET` ou `NEXT_PUBLIC_SANITY_DATASET` (défaut: `production`)
  - `SANITY_API_TOKEN` (requis pour la suppression, avec permissions `Editor` ou `Administrator`)

**Commandes :**

```bash
# Lister les images inutilisées (sans supprimer)
npm run cleanup:media

# Le script demande confirmation avant suppression
```

**Note :** Le script :

- Liste tous les assets d'images (`sanity.imageAsset`)
- Vérifie s'ils sont référencés dans les documents
- Affiche la taille totale des images inutilisées
- Demande confirmation avant suppression

---

### ✅ 2. Test du Sanity en production locale

**Objectif :** Vérifier que Sanity fonctionne correctement avec les variables de production.

**Commandes :**

```bash
# Build de production
npm run build

# Démarrer en mode production
npm run start

# Tester l'accès à Sanity Studio
npm run sanity
# Ouvrir http://localhost:3333
```

**Vérifications :**

- [ ] Les données se chargent correctement
- [ ] Les images s'affichent
- [ ] Les requêtes GROQ fonctionnent
- [ ] Pas d'erreurs dans la console
- [ ] Sanity Studio accessible et fonctionnel

---

### ✅ 3. Configuration de Sanity Studio pour publication Pré Production Vercel (branche develop)

**Objectif :** Configurer Sanity Studio pour qu'il soit accessible depuis la branche `develop` sur Vercel.

**Configuration nécessaire :**

1. **Variables d'environnement Vercel (branche develop) :**

   ```
   SANITY_STUDIO_PROJECT_ID=xxx
   SANITY_STUDIO_DATASET=production
   NEXT_PUBLIC_SANITY_PROJECT_ID=xxx
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
   SANITY_API_TOKEN=xxx (avec permissions Editor)
   ```

2. **Vérifier `sanity.config.ts` :**
   - Les variables d'environnement sont correctement configurées
   - Le projet ID et dataset correspondent

3. **Build Sanity Studio :**

   ```bash
   npm run sanity:build
   ```

4. **Déployer Sanity Studio (optionnel, si hébergement séparé) :**
   ```bash
   npm run sanity:deploy
   ```

**Note :** Sanity Studio peut être :

- Intégré dans Next.js (route `/studio`)
- Déployé séparément sur `sanity.io` (recommandé pour production)

---

### ✅ 4. Déploiement Vercel de l'application intégrale

**Prérequis :**

- [ ] Variables d'environnement configurées sur Vercel
- [ ] Branche `develop` configurée pour preview
- [ ] Branche `main` configurée pour production

**Commandes Vercel :**

```bash
# Déployer la branche develop (preview)
vercel --prod=false

# Déployer la branche main (production)
vercel --prod
```

**Vérifications post-déploiement :**

- [ ] L'application se charge correctement
- [ ] Les données Sanity s'affichent
- [ ] Les images se chargent
- [ ] Pas d'erreurs 404 ou 500
- [ ] Les performances sont correctes (Lighthouse)

---

### ✅ 5. Tests et retours

**Checklist de tests :**

#### Tests fonctionnels

- [ ] Navigation entre les pages
- [ ] Affichage des contenus Sanity
- [ ] Images et médias
- [ ] Formulaires de contact
- [ ] Liens externes

#### Tests de performance

- [ ] Lighthouse audit (Performance, Accessibilité, SEO)
- [ ] Temps de chargement
- [ ] Taille des bundles
- [ ] Optimisation des images

#### Tests de compatibilité

- [ ] Navigateurs modernes (Chrome, Firefox, Safari, Edge)
- [ ] Mobile (iOS, Android)
- [ ] Responsive design

#### Tests Sanity Studio

- [ ] Accès au studio
- [ ] Édition de contenu
- [ ] Upload d'images
- [ ] Publication de changements

---

## 🔧 Configuration des variables d'environnement

### Variables requises

**Pour Next.js (frontend) :**

```
NEXT_PUBLIC_SANITY_PROJECT_ID=xxx
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

**Pour Sanity Studio :**

```
SANITY_STUDIO_PROJECT_ID=xxx
SANITY_STUDIO_DATASET=production
```

**Pour scripts et API :**

```
SANITY_API_TOKEN=xxx
```

### Où obtenir le token Sanity

1. Aller sur https://sanity.io/manage
2. Sélectionner le projet
3. Aller dans "API" → "Tokens"
4. Créer un token avec permissions `Editor` ou `Administrator`

---

## 📝 Notes importantes

- **Dataset :** Utiliser `production` pour la production, `development` pour les tests
- **CDN :** Activé automatiquement en production pour meilleures performances
- **Cache :** Les données sont mises en cache par Next.js (revalidation possible)
- **Images :** Optimisées automatiquement par Next.js Image

---

## 🚨 En cas de problème

1. **Vérifier les variables d'environnement**
2. **Vérifier les logs Vercel**
3. **Tester en local avec `npm run build && npm run start`**
4. **Vérifier les permissions du token Sanity**
5. **Vérifier que le dataset existe et contient des données**
