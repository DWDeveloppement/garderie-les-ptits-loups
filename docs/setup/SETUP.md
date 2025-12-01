# ⚙️ Configuration Initiale - Garderie Les P'tits Loups

## 📋 Vue d'Ensemble

Guide complet pour configurer l'environnement de développement et les services externes (Sanity, Resend, reCAPTCHA) pour le site de la garderie.

---

## 🔑 Variables d'Environnement

### Fichier `.env.local`

Créez un fichier `.env.local` à la racine du projet avec toutes les variables nécessaires :

```bash
# ============================================================================
# SANITY CMS
# ============================================================================

# Configuration publique (exposée au client)
NEXT_PUBLIC_SANITY_PROJECT_ID="your_project_id"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2024-01-01"

# Configuration Studio
SANITY_STUDIO_PROJECT_ID="your_project_id"
SANITY_STUDIO_DATASET="production"
NEXT_PUBLIC_SANITY_STUDIO_URL="http://localhost:3333"

# Token API (pour scripts et mutations côté serveur)
SANITY_API_TOKEN="your_api_token"

# Secret pour la revalidation via webhook Sanity
SANITY_REVALIDATE_SECRET="your_revalidate_secret"

# ============================================================================
# RESEND (Email)
# ============================================================================

RESEND_API_KEY="re_xxxxxxxxxxxx"
RESEND_TO_EMAIL="contact@garderie.com"
RESEND_FROM_EMAIL="onboarding@resend.dev"

# ============================================================================
# GOOGLE reCAPTCHA v2 (ACTIF)
# ============================================================================

RECAPTCHA_SITE_KEY="your_site_key"
RECAPTCHA_SECRET_KEY="your_secret_key"
```

> **📝 Note** : Toutes les variables sont centralisées dans `.env.local` pour simplifier la configuration.

---

## 🗄️ Configuration Sanity CMS

### 1. Créer un Projet Sanity

```bash
# Installer Sanity CLI (si pas déjà fait)
npm install -g @sanity/cli

# Se connecter à Sanity
sanity login

# Créer un nouveau projet (ou utiliser un existant)
sanity init
```

### 2. Récupérer les Identifiants

Après la création du projet :

1. **Project ID** : Disponible dans le dashboard Sanity ou dans `sanity.config.ts`
2. **Dataset** : Par défaut `production`
3. **API Version** : Format `YYYY-MM-DD`, utiliser `2024-01-01`

### 3. Créer un Token API

Pour les scripts et les mutations côté serveur :

1. Aller sur [sanity.io/manage](https://sanity.io/manage)
2. Sélectionner votre projet
3. **API** → **Tokens** → **Add API Token**
4. Choisir les permissions :
   - **Viewer** : Lecture seule
   - **Editor** : Lecture + Écriture
   - **Deploy Studio** : Pour les scripts de déploiement
5. Copier le token et l'ajouter à `SANITY_API_TOKEN`

⚠️ **Sécurité** : Ne commitez jamais ce token dans Git !

### 4. Configuration CORS

Autoriser votre domaine dans Sanity :

1. **Sanity Dashboard** → **API** → **CORS Origins**
2. Ajouter :
   - `http://localhost:3000` (développement)
   - `http://localhost:3333` (studio)
   - `https://votre-domaine.com` (production)
   - `https://votre-domaine.vercel.app` (preview Vercel)

---

## 📧 Configuration Resend (Email)

### 1. Créer un Compte Resend

1. Aller sur [resend.com](https://resend.com)
2. Créer un compte gratuit
3. Confirmer votre email

### 2. Générer une API Key

1. **Dashboard Resend** → **API Keys**
2. **Create API Key**
3. Donner un nom : `Garderie Les P'tits Loups - Production`
4. Copier la clé et l'ajouter à `RESEND_API_KEY`

### 3. Configurer les Emails

```bash
# Clé API (obligatoire)
RESEND_API_KEY="re_xxxxxxxxxxxx"

# Email de réception (où les messages seront envoyés)
RESEND_TO_EMAIL="contact@garderie.com"

# Email d'envoi (par défaut Resend, ou votre domaine vérifié)
RESEND_FROM_EMAIL="onboarding@resend.dev"
```

### 4. Domaine Personnalisé (Optionnel)

Pour envoyer depuis votre propre domaine :

1. **Resend Dashboard** → **Domains**
2. **Add Domain** : `garderie.com`
3. Ajouter les enregistrements DNS fournis
4. Attendre la vérification (quelques minutes)
5. Utiliser `contact@garderie.com` comme `RESEND_FROM_EMAIL`

### 5. Test

```bash
# Tester l'envoi d'email
curl -X POST https://api.resend.com/emails \
  -H "Authorization: Bearer $RESEND_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "from": "onboarding@resend.dev",
    "to": "contact@garderie.com",
    "subject": "Test Resend",
    "html": "<p>Email de test</p>"
  }'
```

---

## 🛡️ Configuration reCAPTCHA v2 (ACTIF)

> **⚠️ Important** : reCAPTCHA v2 est **actif** et **requis** pour le formulaire de contact. Pour plus de détails sur la sécurité, voir [SECURITY.md](./SECURITY.md).

### 1. Créer un Site reCAPTCHA

1. Aller sur [google.com/recaptcha/admin](https://www.google.com/recaptcha/admin)
2. **Créer un site** :
   - **Label** : `Garderie Les P'tits Loups`
   - **Type** : reCAPTCHA v2 ("Je ne suis pas un robot" Checkbox)
   - **Domaines** :
     - `localhost` (développement)
     - `garderie-les-ptits-loups.vercel.app` (production)
     - `votre-domaine.com` (domaine personnalisé)
3. **Accepter** les conditions
4. **Enregistrer**

### 2. Récupérer les Clés

Après création :

- **Site Key** (publique) → `RECAPTCHA_SITE_KEY`
- **Secret Key** (privée) → `RECAPTCHA_SECRET_KEY`

### 3. Clés de Test (Développement)

Pour le développement local, utilisez les clés de test Google :

```bash
# Ces clés acceptent toujours la validation
RECAPTCHA_SITE_KEY="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
RECAPTCHA_SECRET_KEY="6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe"
```

⚠️ **Production** : Remplacez par vos vraies clés avant le déploiement !

### 4. API Routes de Sécurité

Le projet utilise 3 couches de sécurité (voir [SECURITY.md](./SECURITY.md)) :

- **reCAPTCHA v2** : Protection anti-bot visible
- **Honeypot** : Champ invisible anti-bot
- **Validation Double** : Client + Serveur

API routes disponibles :

- `src/app/api/contact/route.ts` - Formulaire de contact avec validations
- `src/app/api/recaptcha-config/route.ts` - Configuration reCAPTCHA côté client
- `src/app/api/revalidate/route.ts` - Revalidation cache via webhook Sanity

---

## 🚀 Déploiement Vercel

### 1. Créer un Projet Vercel

1. Aller sur [vercel.com](https://vercel.com)
2. **New Project** → Importer depuis GitHub
3. Sélectionner le repository

### 2. Configurer les Variables d'Environnement

**Settings** → **Environment Variables** → Ajouter :

```bash
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID="your_project_id"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2024-01-01"
SANITY_STUDIO_PROJECT_ID="your_project_id"
SANITY_STUDIO_DATASET="production"
NEXT_PUBLIC_SANITY_STUDIO_URL="http://localhost:3333"
SANITY_API_TOKEN="your_api_token"
SANITY_REVALIDATE_SECRET="your_revalidate_secret"

# Resend
RESEND_API_KEY="re_xxxxxxxxxxxx"
RESEND_TO_EMAIL="contact@garderie.com"
RESEND_FROM_EMAIL="onboarding@resend.dev"

# reCAPTCHA v2
RECAPTCHA_SITE_KEY="your_site_key"
RECAPTCHA_SECRET_KEY="your_secret_key"
```

### 3. Environnements

Configurer les variables pour :

- ✅ **Production** : Variables de production
- ✅ **Preview** : Variables de test (clés reCAPTCHA test)
- ✅ **Development** : Variables locales

### 4. Webhooks Sanity → Next.js (ISR)

Le projet utilise **2 méthodes de revalidation** :

#### A. Revalidation On-Demand (Recommandé)

Revalidation ciblée via l'API `/api/revalidate` :

1. **Configurer le secret** dans Vercel :

   ```bash
   SANITY_REVALIDATE_SECRET="your_revalidate_secret"
   ```

2. **Sanity Dashboard** → **API** → **Webhooks** → **Create Webhook** :
   - Name: `Next.js Revalidation`
   - URL: `https://votre-domaine.com/api/revalidate?secret=your_revalidate_secret`
   - Dataset: `production`
   - Trigger on: `Create`, `Update`, `Delete`
   - Filter GROQ: `_type in ["home", "aboutPage", "contactPage", "schedulePage", "sectorPage", "spacePage", "prices", "testimonials", "partners"]`

3. L'API revalidera automatiquement les pages concernées selon le type de document modifié.

#### B. Deploy Hook Vercel (Fallback)

Pour un rebuild complet (plus lent, ~30-60s) :

1. **Vercel** → **Settings** → **Git** → **Deploy Hooks**
2. **Create Hook** :
   - Name: `Sanity Full Rebuild`
   - Branch: `main`
3. Copier l'URL du webhook

4. **Sanity Dashboard** → **API** → **Webhooks** → **Create Webhook** :
   - Name: `Vercel Full Rebuild`
   - URL: [URL du webhook Vercel]
   - Dataset: `production`
   - Trigger on: `Create`, `Update`, `Delete`
   - Filter GROQ: `_type in ["siteSettings", "navigation"]` (documents structurels uniquement)

---

## 🔁 Revalidation et Mise à Jour du Site

### Principe

Le site utilise **Next.js ISR (Incremental Static Regeneration)** pour mettre à jour le contenu sans rebuild complet.

**Workflow :**

```text
1. Client publie dans Sanity Studio
   ↓
2. Webhook Sanity → API /api/revalidate
   ↓
3. Next.js revalide la page concernée (~1-2s)
   ↓
4. Site mis à jour avec nouvelles données
```

### 1. Configuration de l'API Revalidate

L'API `/api/revalidate` est déjà configurée dans `src/app/api/revalidate/route.ts`.

**Types de documents supportés :**

- `home` → Revalide `/`
- `aboutPage` → Revalide `/a-propos`
- `contactPage` → Revalide `/contact`
- `schedulePage` → Revalide `/tarifs`
- `legacyPage` → Revalide `/mentions-legales`
- `privatePolicyPage` → Revalide `/politique-confidentialite`
- `sectorPage` → Revalide `/la-structure/[slug]`
- `spacePage` → Revalide les secteurs associés
- `prices` → Revalide `/tarifs`
- `testimonials` → Revalide `/` (home)
- `partners` → Revalide toutes les pages (footer)

### 2. Tester l'API Revalidate

**Test local :**

```bash
# Test GET (vérifier que l'endpoint fonctionne)
curl "http://localhost:3000/api/revalidate?secret=your_revalidate_secret"

# Test POST (simuler un webhook Sanity)
curl -X POST "http://localhost:3000/api/revalidate?secret=your_revalidate_secret" \
  -H "Content-Type: application/json" \
  -d '{"_type": "home", "slug": {"current": "home"}}'
```

**Test en production :**

```bash
curl "https://votre-domaine.com/api/revalidate?secret=your_revalidate_secret"
```

### 3. Vérification des Logs

**Sanity :**

- **API** → **Webhooks** → [Webhook] → **Logs**
- Voir tous les déclenchements et statuts (200 = OK)

**Vercel :**

- **Deployments** → **Function Logs**
- Rechercher `[Revalidate]` pour voir les revalidations

### Troubleshooting

**Webhook ne se déclenche pas :**

- Vérifier l'URL de l'API dans Sanity Dashboard
- Vérifier le secret (`SANITY_REVALIDATE_SECRET`)
- Consulter les logs webhook dans Sanity
- Vérifier que le document modifié est dans le filtre GROQ

**Revalidation échoue :**

- Vérifier les logs Vercel pour les erreurs
- Tester manuellement l'endpoint avec curl
- Vérifier que le type de document est supporté dans `route.ts`

**Page ne se met pas à jour :**

- Vider le cache du navigateur (Ctrl+F5)
- Attendre quelques secondes (revalidation peut prendre 1-2s)
- Vérifier que le bon chemin est revalidé dans les logs

---

## 🔧 Vérification de la Configuration

### Checklist Variables d'Environnement

```bash
✅ Sanity
  ✓ NEXT_PUBLIC_SANITY_PROJECT_ID défini
  ✓ NEXT_PUBLIC_SANITY_DATASET défini
  ✓ NEXT_PUBLIC_SANITY_API_VERSION défini
  ✓ SANITY_STUDIO_PROJECT_ID défini
  ✓ SANITY_STUDIO_DATASET défini
  ✓ NEXT_PUBLIC_SANITY_STUDIO_URL défini
  ✓ SANITY_API_TOKEN défini
  ✓ SANITY_REVALIDATE_SECRET défini

✅ Resend
  ✓ RESEND_API_KEY défini
  ✓ RESEND_TO_EMAIL défini
  ✓ RESEND_FROM_EMAIL défini
  ✓ Test d'envoi réussi

✅ reCAPTCHA v2 (ACTIF)
  ✓ RECAPTCHA_SITE_KEY défini
  ✓ RECAPTCHA_SECRET_KEY défini
  ✓ Domaines autorisés configurés
  ✓ Case à cocher visible sur le formulaire

✅ Vercel
  ✓ Variables d'environnement configurées
  ✓ Webhook Sanity fonctionnel
  ✓ API Revalidate active
```

### Tests Manuels

```bash
# 1. Tester Sanity Studio
npm run sanity
# → Studio accessible sur http://localhost:3333

# 2. Tester le site en développement
npm run dev
# → Site accessible sur http://localhost:3000

# 3. Tester le formulaire de contact
# → Aller sur http://localhost:3000/contact
# → Remplir et envoyer le formulaire
# → Vérifier la boîte de réception (RESEND_TO_EMAIL)

# 4. Tester la revalidation (local)
curl "http://localhost:3000/api/revalidate?secret=your_revalidate_secret"
# → Devrait retourner {"status":"ok","message":"Revalidation endpoint is working"}

# 5. Tester le build production (local)
npm run build
npm run start
# → Site accessible sur http://localhost:3100
```

### Scripts NPM Disponibles

```bash
# Développement
npm run dev              # Serveur dev Next.js (port 3000)
npm run sanity           # Sanity Studio (port 3333)
npm run refresh          # Kill + clean + dev

# Production locale
npm run build            # Build production
npm run start            # Serveur production (port 3100)
npm run review           # Kill + clean + build + start
npm run rebuild          # Kill + clean + build

# Maintenance Sanity
npm run cleanup:media           # Nettoyer médias inutilisés
npm run verify:assets           # Vérifier assets supprimés
npm run fix:orphans             # Corriger références orphelines
npm run cleanup:sanity-cache    # Nettoyer cache Sanity
npm run delete:draft-assets     # Supprimer drafts et assets

# Utilitaires
npm run kill:dev         # Libérer ports 3000 et 3333
npm run kill:prod        # Libérer port 3100
npm run kill:all         # Libérer tous les ports

# Performance
npm run perf             # Tests de performance
npm run lighthouse       # Audit Lighthouse
npm run lighthouse:analyze   # Analyser résultats Lighthouse
npm run analyze          # Bundle analyzer
```

---

## ⚠️ Sécurité & Bonnes Pratiques

### Ne JAMAIS Commiter

```gitignore
# Fichiers à ne jamais commiter
.env
.env.local
.env.production
.env.development

# Vérifier avec
git status
```

### Rotation des Clés

Changer régulièrement :

- ✅ **SANITY_API_TOKEN** : Tous les 6 mois
- ✅ **SANITY_REVALIDATE_SECRET** : Tous les 6 mois ou en cas de fuite
- ✅ **RESEND_API_KEY** : En cas de fuite
- ✅ **RECAPTCHA_SECRET_KEY** : En cas de fuite

### Permissions Minimales

Utiliser le principe du moindre privilège :

- **SANITY_API_TOKEN** : `Viewer` si lecture seule suffit, `Editor` pour les scripts de maintenance
- **RESEND_API_KEY** : Limiter au domaine si possible

### Variables Publiques vs Privées

**Variables exposées au client (NEXT*PUBLIC*\*) :**

- ✅ `NEXT_PUBLIC_SANITY_PROJECT_ID` - Identifiant projet Sanity
- ✅ `NEXT_PUBLIC_SANITY_DATASET` - Dataset Sanity
- ✅ `NEXT_PUBLIC_SANITY_API_VERSION` - Version API Sanity
- ✅ `NEXT_PUBLIC_SANITY_STUDIO_URL` - URL du studio

**Variables côté serveur uniquement :**

- 🔒 `SANITY_API_TOKEN` - Token API Sanity (lecture/écriture)
- 🔒 `SANITY_REVALIDATE_SECRET` - Secret pour revalidation
- 🔒 `RESEND_API_KEY` - Clé API Resend
- 🔒 `RECAPTCHA_SECRET_KEY` - Clé secrète reCAPTCHA

⚠️ **Attention** : Ne JAMAIS préfixer une variable sensible avec `NEXT_PUBLIC_` !

---

## 📚 Ressources

### Documentation Projet

- [README.md](../../README.md) - Documentation principale du projet
- [SECURITY.md](./SECURITY.md) - Sécurité du formulaire (reCAPTCHA + Honeypot)
- [DOMAINS.md](./DOMAINS.md) - Configuration des domaines et URLs
- [SANITY_DEPLOYMENT.md](./SANITY_DEPLOYMENT.md) - Déploiement Sanity
- [GITHUB.md](./GITHUB.md) - Gestion GitHub et organisations

### Documentation Officielle

- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Resend Documentation](https://resend.com/docs)
- [reCAPTCHA Documentation](https://developers.google.com/recaptcha)
- [Vercel Documentation](https://vercel.com/docs)

### Dashboards

- [Sanity Manage](https://sanity.io/manage)
- [Resend Dashboard](https://resend.com/dashboard)
- [reCAPTCHA Admin](https://www.google.com/recaptcha/admin)
- [Vercel Dashboard](https://vercel.com/dashboard)

---

## 🆘 Dépannage

### Problèmes Courants

#### 1. Sanity Studio ne démarre pas

```bash
# Vérifier les variables
echo $NEXT_PUBLIC_SANITY_PROJECT_ID
echo $NEXT_PUBLIC_SANITY_DATASET

# Réinstaller les dépendances
npm install

# Nettoyer le cache
rm -rf node_modules .next
npm install
```

#### 2. Emails ne partent pas

```bash
# Vérifier la clé Resend
curl -X GET https://api.resend.com/emails \
  -H "Authorization: Bearer $RESEND_API_KEY"

# Vérifier les logs Vercel
vercel logs [deployment-url]
```

#### 3. reCAPTCHA ne fonctionne pas

```bash
# Vérifier que les domaines sont autorisés dans Google reCAPTCHA Admin
# Vérifier que les clés sont correctes dans .env.local
# Vérifier la console navigateur pour les erreurs
# Tester avec les clés de test
```

#### 4. API Revalidate ne fonctionne pas

```bash
# Tester l'endpoint localement
curl "http://localhost:3000/api/revalidate?secret=your_secret"

# Vérifier les logs Vercel
vercel logs [deployment-url] --follow

# Vérifier que SANITY_REVALIDATE_SECRET est défini
echo $SANITY_REVALIDATE_SECRET

# Vérifier le webhook dans Sanity Dashboard
# → API → Webhooks → Logs
```

#### 5. Build échoue

```bash
# Nettoyer et rebuild
npm run clean
npm install
npm run build

# Vérifier les variables d'environnement
cat .env.local

# Vérifier les dépendances
npm outdated
```

---

## 🎯 Résumé

### Architecture du Projet

```md
📦 garderie-les-ptits-loups/
├── .env.local              # ⚙️ Toutes les variables d'environnement
├── next.config.ts          # ⚙️ Configuration Next.js
├── sanity.config.ts        # ⚙️ Configuration Sanity
├── package.json            # 📦 Scripts npm disponibles
├── src/
│   ├── app/
│   │   └── api/
│   │       ├── contact/route.ts          # 📧 Formulaire de contact
│   │       ├── recaptcha-config/route.ts # 🛡️ Config reCAPTCHA
│   │       └── revalidate/route.ts       # 🔁 Revalidation ISR
│   ├── components/         # 🧩 Composants React
│   ├── lib/                # 🔧 Utilitaires
│   └── styles/             # 🎨 Styles CSS
├── sanity/
│   ├── schemas/            # 📋 Schémas de contenu
│   ├── queries/            # 🔍 Requêtes GROQ
│   └── types/              # 🟦 Types TypeScript
├── scripts/
│   ├── clean/              # 🧹 Scripts de nettoyage Sanity
│   ├── tests/              # 🧪 Tests de performance
│   └── tools/              # 🔧 Utilitaires système
└── docs/                   # 📚 Documentation complète
```

### Workflow de Publication

```text
1. Éditer dans Sanity Studio (localhost:3333 ou sanity.studio)
   ↓
2. Publier le document
   ↓
3. Webhook Sanity → /api/revalidate?secret=xxx
   ↓
4. Next.js revalide la page concernée (~1-2s)
   ↓
5. Site mis à jour (pas de rebuild complet)
```

### Prochaines Étapes

1. ✅ Configurer `.env.local` avec toutes les variables
2. ✅ Tester Sanity Studio : `npm run sanity`
3. ✅ Tester le site : `npm run dev`
4. ✅ Configurer les webhooks Sanity
5. ✅ Déployer sur Vercel
6. ✅ Tester la revalidation en production

---

**Dernière mise à jour :** Décembre 2024
**Version :** Next.js 15 + Sanity v3 + Resend + reCAPTCHA v2 + ISR
