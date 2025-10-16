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

# Token API (pour scripts et mutations côté serveur)
SANITY_API_TOKEN="your_api_token"

# ============================================================================
# RESEND (Email)
# ============================================================================

RESEND_API_KEY="re_xxxxxxxxxxxx"
RESEND_TO_EMAIL="contact@garderie.com"
RESEND_FROM_EMAIL="onboarding@resend.dev"

# ============================================================================
# GOOGLE reCAPTCHA v2
# ============================================================================

RECAPTCHA_SITE_KEY="your_site_key"
RECAPTCHA_SECRET_KEY="your_secret_key"

# ============================================================================
# REVALIDATION (optionnel - pour ISR)
# ============================================================================

REVALIDATE_SECRET="your_revalidate_secret"
```

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

## 🛡️ Configuration reCAPTCHA (Optionnel)

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
SANITY_API_TOKEN="your_api_token"

# Resend
RESEND_API_KEY="re_xxxxxxxxxxxx"
RESEND_TO_EMAIL="contact@garderie.com"
RESEND_FROM_EMAIL="onboarding@resend.dev"

# reCAPTCHA
RECAPTCHA_SITE_KEY="your_site_key"
RECAPTCHA_SECRET_KEY="your_secret_key"
```

### 3. Environnements

Configurer les variables pour :
- ✅ **Production** : Variables de production
- ✅ **Preview** : Variables de test (clés reCAPTCHA test)
- ✅ **Development** : Variables locales

### 4. Webhooks Sanity → Vercel (SSG)

Pour rebuild automatiquement le site à chaque publication Sanity :

1. **Vercel** → **Settings** → **Git** → **Deploy Hooks**
2. **Create Hook** :
   - Name: `Sanity Publish`
   - Branch: `main`
3. Copier l'URL du webhook

4. **Sanity Dashboard** → **API** → **Webhooks**
5. **Create Webhook** :
   - Name: `Vercel Rebuild`
   - URL: [URL du webhook Vercel]
   - Dataset: `production`
   - Trigger on: `Create`, `Update`, `Delete`
   - Filter: `_type in ["home", "aboutPage", "contactPage", "schedulePage", "sectorPage", "spaces", "prices"]`

---

## 🔗 Webhooks Sanity → Vercel (SSG Auto-Rebuild)

### Principe

Permettre au client de publier du contenu dans Sanity Studio et que le site se rebuild **automatiquement** sur Vercel.

**Workflow :**
```
1. Client publie dans Sanity Studio
   ↓
2. Webhook Sanity → Vercel Deploy Hook
   ↓
3. Vercel rebuild automatique (~30-60s)
   ↓
4. Site mis à jour avec nouvelles données
```

### 1. Créer un Deploy Hook Vercel

1. **Vercel Dashboard** → Sélectionner le projet
2. **Settings** → **Git** → **Deploy Hooks**
3. **Create Hook** :
   - Name: `Sanity Publish`
   - Branch: `main`
4. **Copier l'URL** générée :
   ```
   https://api.vercel.com/v1/integrations/deploy/prj_XXXXX/YYYYY
   ```

### 2. Configurer le Webhook dans Sanity

1. **Sanity Dashboard** → [sanity.io/manage](https://sanity.io/manage)
2. Sélectionner le projet
3. **API** → **Webhooks** → **Add webhook**
4. Configuration :

```yaml
Name: Vercel Production Deploy
URL: [URL du Deploy Hook Vercel]
Dataset: production
Trigger on: ☑ Create  ☑ Update  ☑ Delete
HTTP method: POST
API version: v2021-06-07
```

5. **Filter GROQ** (rebuild sélectif) :
```groq
_type in ["home", "aboutPage", "contactPage", "schedulePage", "sectorPage", "spaces", "prices", "testimonials"]
```

6. **Projection** (optionnel) :
```groq
{
  _type,
  _id,
  title,
  "publishedAt": _updatedAt
}
```

7. **Save**

### 3. Tester le Webhook

**Test dans Sanity Studio :**
1. Éditer n'importe quelle page
2. Faire une petite modification
3. Cliquer sur **Publish** 🟢
4. Vérifier Vercel Dashboard → Deployments
5. Un nouveau deployment devrait se lancer ! 🚀

**Test dans Sanity Dashboard :**
1. **API** → **Webhooks** → Sélectionner le webhook
2. **Test webhook**
3. Vérifier le statut dans les logs (200 = OK)

### 4. Vérification des Logs

**Sanity :**
- **API** → **Webhooks** → [Webhook] → **Logs**
- Voir tous les déclenchements et statuts

**Vercel :**
- **Deployments** → "Triggered by Deploy Hook"

### Troubleshooting

**Webhook ne se déclenche pas :**
- Vérifier l'URL du Deploy Hook dans Sanity
- Vérifier le filtre GROQ
- Consulter les logs webhook dans Sanity
- Vérifier que le document modifié est dans le filtre

**Rebuilds trop fréquents :**
- Affiner le filtre GROQ pour exclure certains types
- Changer `Trigger on` pour uniquement `Update`

---

## 🔧 Vérification de la Configuration

### Script de Test

```bash
# Vérifier toutes les variables
node scripts/check-env.js
```

### Checklist

```bash
✅ Sanity
  ✓ NEXT_PUBLIC_SANITY_PROJECT_ID défini
  ✓ NEXT_PUBLIC_SANITY_DATASET défini
  ✓ SANITY_API_TOKEN défini (optionnel)
  ✓ Studio accessible sur localhost:3333

✅ Resend
  ✓ RESEND_API_KEY défini
  ✓ RESEND_TO_EMAIL défini
  ✓ Test d'envoi réussi

✅ reCAPTCHA (optionnel)
  ✓ RECAPTCHA_SITE_KEY défini
  ✓ RECAPTCHA_SECRET_KEY défini
  ✓ Domaines autorisés configurés
  ✓ Case à cocher visible sur le formulaire

✅ Vercel
  ✓ Variables d'environnement configurées
  ✓ Webhook Sanity fonctionnel
  ✓ Déploiement automatique actif
```

### Tests Manuels

```bash
# 1. Tester Sanity
npm run sanity
# → Studio accessible sur http://localhost:3333

# 2. Tester le formulaire de contact
npm run dev
# → Remplir et envoyer le formulaire sur http://localhost:3000/contact

# 3. Vérifier les emails
# → Checker la boîte de réception configurée dans RESEND_TO_EMAIL
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
- ✅ **RESEND_API_KEY** : En cas de fuite
- ✅ **RECAPTCHA_SECRET_KEY** : En cas de fuite

### Permissions Minimales

Utiliser le principe du moindre privilège :
- **SANITY_API_TOKEN** : `Viewer` si lecture seule suffit
- **RESEND_API_KEY** : Limiter au domaine si possible

---

## 📚 Ressources

### Documentation Officielle
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

**1. Sanity Studio ne démarre pas**
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

**2. Emails ne partent pas**
```bash
# Vérifier la clé Resend
curl -X GET https://api.resend.com/emails \
  -H "Authorization: Bearer $RESEND_API_KEY"

# Vérifier les logs Vercel
vercel logs [deployment-url]
```

**3. reCAPTCHA ne fonctionne pas**
- Vérifier que les domaines sont autorisés
- Vérifier que les clés sont correctes
- Vérifier la console navigateur pour les erreurs
- Tester avec les clés de test

---

**Dernière mise à jour :** Octobre 2024  
**Version :** Next.js 15 + Sanity v3 + Resend + reCAPTCHA v2

