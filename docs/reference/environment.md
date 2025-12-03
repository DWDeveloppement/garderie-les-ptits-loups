# Référence - Variables d'Environnement

## 📊 Vue d'ensemble

Variables d'environnement nécessaires pour le développement et la production.

**Fichier** : `.env.local` (non versionné)

---

## 🔧 Configuration Développement

### `.env.local`

```bash
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_token # Optionnel (preview mode)

# Email (Resend)
RESEND_API_KEY=re_xxxxxxxxxxxx

# reCAPTCHA v2
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6LeXXXXXXXXXXXXXXXXXXXXXXX
RECAPTCHA_SECRET_KEY=6LeXXXXXXXXXXXXXXXXXXXXXXX

# Revalidation (webhook)
REVALIDATE_SECRET=your_random_secret

# Environnement
NODE_ENV=development
```

---

## 🌐 Sanity CMS

### `NEXT_PUBLIC_SANITY_PROJECT_ID`

**Description** : ID du projet Sanity

**Obtention** :
1. Aller sur https://sanity.io/manage
2. Sélectionner le projet
3. Copier le Project ID

**Exemple** : `abc123de`

---

### `NEXT_PUBLIC_SANITY_DATASET`

**Description** : Dataset Sanity à utiliser

**Valeurs** :
- `production` : Données production
- `staging` : Données staging
- `development` : Données développement

**Défaut** : `production`

---

### `SANITY_API_TOKEN`

**Description** : Token API pour requêtes authentifiées (preview mode)

**Optionnel** : Uniquement si preview mode nécessaire

**Obtention** :
1. Sanity Dashboard → API → Tokens
2. Créer token avec permissions `read`
3. Copier le token

---

## 📧 Resend (Email)

### `RESEND_API_KEY`

**Description** : Clé API Resend pour envoi d'emails

**Obtention** :
1. Créer compte sur https://resend.com
2. Dashboard → API Keys → Create API Key
3. Copier la clé

**Format** : `re_xxxxxxxxxxxx`

**Prix** : 3 000 emails/mois gratuits

---

## 🔒 reCAPTCHA v2

### `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`

**Description** : Clé publique reCAPTCHA (client-side)

**Obtention** :
1. https://www.google.com/recaptcha/admin
2. Créer nouveau site (reCAPTCHA v2 Invisible)
3. Copier Site Key

**Format** : `6LeXXXXXXXXXXXXXXXXXXXXXXX`

---

### `RECAPTCHA_SECRET_KEY`

**Description** : Clé secrète reCAPTCHA (server-side)

**Obtention** : Même processus, copier Secret Key

**⚠️ IMPORTANT** : Ne JAMAIS exposer côté client

---

## 🔄 Revalidation

### `REVALIDATE_SECRET`

**Description** : Secret pour webhook de revalidation Next.js

**Génération** :
```bash
openssl rand -base64 32
```

**Usage** : Webhook Sanity → `https://site.com/api/revalidate?secret=xxx`

---

## 🎯 Environnement

### `NODE_ENV`

**Description** : Environnement d'exécution

**Valeurs** :
- `development` : Mode développement
- `production` : Mode production
- `test` : Mode test

**⚠️ Auto-défini** : Next.js définit automatiquement

---

## 🔐 Sécurité

### Vérifications

```bash
# ❌ Jamais commit .env.local
git add .env.local # ERREUR

# ✅ Vérifier .gitignore
cat .gitignore | grep .env.local
```

---

### `.env.example`

Template pour nouveaux développeurs (versionné).

```bash
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=

# Email
RESEND_API_KEY=

# reCAPTCHA
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=
RECAPTCHA_SECRET_KEY=

# Revalidation
REVALIDATE_SECRET=
```

---

## 🚀 Déploiement Vercel

### Configuration

**Vercel Dashboard** → **Settings** → **Environment Variables**

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123de
NEXT_PUBLIC_SANITY_DATASET=production
RESEND_API_KEY=re_xxxxxxxxxxxx
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6LeXXXXXXXXXXXXXXXXXXXXXXX
RECAPTCHA_SECRET_KEY=6LeXXXXXXXXXXXXXXXXXXXXXXX
REVALIDATE_SECRET=your_random_secret
```

**Environnements** :
- Production
- Preview
- Development

---

## 📊 Validation

### Script de Validation

**Fichier** : `scripts/check-env.js`

```javascript
const requiredEnvVars = [
  'NEXT_PUBLIC_SANITY_PROJECT_ID',
  'NEXT_PUBLIC_SANITY_DATASET',
  'RESEND_API_KEY',
  'NEXT_PUBLIC_RECAPTCHA_SITE_KEY',
  'RECAPTCHA_SECRET_KEY'
]

const missingVars = requiredEnvVars.filter((varName) => !process.env[varName])

if (missingVars.length > 0) {
  console.error('❌ Variables manquantes :')
  missingVars.forEach((varName) => console.error(`  - ${varName}`))
  process.exit(1)
}

console.log('✅ Toutes les variables sont définies')
```

**Usage** :
```bash
node scripts/check-env.js
```

---

## 🔍 Debugging

### Afficher Variables (Dev)

```typescript
// ⚠️ UNIQUEMENT EN DEV
if (process.env.NODE_ENV === 'development') {
  console.log('Sanity Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
  console.log('Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET)
  // ❌ NE JAMAIS log les secrets
}
```

---

### Vérifier Chargement

```typescript
// app/api/debug/route.ts (dev uniquement)
export async function GET() {
  if (process.env.NODE_ENV !== 'development') {
    return Response.json({ error: 'Not available' }, { status: 404 })
  }

  return Response.json({
    sanityProjectId: !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    resendKey: !!process.env.RESEND_API_KEY,
    recaptchaSite: !!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
    recaptchaSecret: !!process.env.RECAPTCHA_SECRET_KEY
  })
}
```

---

## 📚 Références

- **Next.js Environment Variables** : https://nextjs.org/docs/app/building-your-application/configuring/environment-variables
- **Vercel Environment Variables** : https://vercel.com/docs/projects/environment-variables

---

**Dernière mise à jour** : 2025-12-03
