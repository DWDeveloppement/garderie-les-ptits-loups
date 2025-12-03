# 🌐 Configuration des Domaines et URLs

## 📋 Vue d'ensemble

Ce document liste tous les domaines et URLs utilisés par le projet dans les différents environnements.

---

## 🔧 Environnements

### **Local Development**
```
Frontend : http://localhost:3000
Sanity Studio : http://localhost:3333
```

### **Vercel Preview (Dev)**
```
Frontend : https://<branch>-<project>.vercel.app
Example : https://feat-design-system-garderie-les-ptits-loups.vercel.app
```

### **Production**
```
Frontend : https://www.garderielesptitsloups.ch
Sanity Studio : https://garderie-les-ptits-loups.sanity.studio
```

---

## 🖼️ Images & CDN

### **Sanity CDN**
```
Base URL : https://cdn.sanity.io
Images : https://cdn.sanity.io/images/{projectId}/{dataset}/{imageId}-{dimensions}.{ext}
```

**Configuration Next.js :**
```ts
// next.config.ts
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'cdn.sanity.io',
      pathname: '/images/**'
    }
  ]
}
```

---

## 🔐 Variables d'environnement

### **Fichier : `.env.local`** (à créer si absent)

```bash
# ============================================================================
# SANITY
# ============================================================================
NEXT_PUBLIC_SANITY_PROJECT_ID=rnhuu2jm
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=<token-lecture-seule>

# ============================================================================
# SITE URLs
# ============================================================================
# Local
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Vercel Preview (auto-détecté)
# NEXT_PUBLIC_SITE_URL=https://feat-xxx.vercel.app

# Production
# NEXT_PUBLIC_SITE_URL=https://www.garderielesptitsloups.ch

# ============================================================================
# RESEND (Email)
# ============================================================================
RESEND_API_KEY=<your-resend-api-key>
NEXT_PUBLIC_CONTACT_EMAIL=info@garderielesptitsloups.ch

# ============================================================================
# RECAPTCHA
# ============================================================================
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=<your-site-key>
RECAPTCHA_SECRET_KEY=<your-secret-key>
```

---

## 📍 Domaines par feature

### **1. Images Sanity**
- ✅ Configuré dans `next.config.ts`
- ✅ `remotePatterns` : `cdn.sanity.io`
- ✅ Formats : WebP, AVIF

### **2. Sanity Studio**
- 🔗 Dev : `http://localhost:3333`
- 🔗 Production : `https://garderie-les-ptits-loups.sanity.studio`

### **3. API Endpoints**
```
Contact Form : /api/contact
reCAPTCHA Config : /api/recaptcha-config
```

### **4. External Services**

#### **Resend (Email)**
```
API : https://api.resend.com
Docs : https://resend.com/docs
```

#### **Google reCAPTCHA**
```
API : https://www.google.com/recaptcha/api/siteverify
Admin : https://www.google.com/recaptcha/admin
```

#### **Vercel**
```
Dashboard : https://vercel.com/ricardodovale/garderie-les-ptits-loups
Deployments : https://vercel.com/ricardodovale/garderie-les-ptits-loups/deployments
Settings : https://vercel.com/ricardodovale/garderie-les-ptits-loups/settings
```

---

## 🚀 Configuration Vercel

### **Environment Variables**

Dans **Vercel Dashboard → Settings → Environment Variables**, ajouter :

#### **Production**
```
NEXT_PUBLIC_SITE_URL=https://www.garderielesptitsloups.ch
NEXT_PUBLIC_SANITY_PROJECT_ID=rnhuu2jm
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=<token-lecture>
RESEND_API_KEY=<key>
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=<key>
RECAPTCHA_SECRET_KEY=<key>
```

#### **Preview (Branches)**
```
NEXT_PUBLIC_SITE_URL=https://$VERCEL_URL
# Autres variables : idem production
```

### **Custom Domains**

Dans **Vercel Dashboard → Settings → Domains** :

1. Ajouter `www.garderielesptitsloups.ch`
2. Configurer les DNS chez le registrar :
   ```
   Type  : CNAME
   Name  : www
   Value : cname.vercel-dns.com
   ```

---

## 🔗 CORS & Security Headers

### **Configuration actuelle** (next.config.ts)

```ts
headers: [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'  // Préchargement DNS pour Sanity CDN
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'  // Protection contre clickjacking
  }
]
```

### **Headers recommandés pour production**

```ts
// À ajouter dans next.config.ts → headers()
{
  key: 'X-Content-Type-Options',
  value: 'nosniff'
},
{
  key: 'Referrer-Policy',
  value: 'origin-when-cross-origin'
},
{
  key: 'Permissions-Policy',
  value: 'camera=(), microphone=(), geolocation=()'
}
```

---

## 🧪 Tests de domaines

### **Local**
```bash
# Vérifier que localhost:3000 fonctionne
curl http://localhost:3000

# Vérifier Sanity CDN
curl -I https://cdn.sanity.io/images/rnhuu2jm/production/test.jpg
```

### **Vercel Preview**
```bash
# Après deploy de la branche
curl https://feat-design-system-<project>.vercel.app

# Vérifier les images Sanity
open https://feat-design-system-<project>.vercel.app/la-structure/nurserie
```

### **Production**
```bash
# Vérifier le site
curl https://www.garderielesptitsloups.ch

# Vérifier HTTPS
curl -I https://www.garderielesptitsloups.ch
```

---

## 📊 Checklist de configuration

### **Next.js** ✅
- [x] `next.config.ts` configuré
- [x] `remotePatterns` pour Sanity CDN
- [x] Headers de sécurité
- [x] Formats images (WebP, AVIF)

### **Vercel**
- [ ] Environment variables définies
- [ ] Custom domain configuré
- [ ] DNS pointé vers Vercel
- [ ] HTTPS activé (auto)
- [ ] Webhooks Sanity → Vercel configurés

### **Sanity**
- [ ] CORS configuré dans Sanity Dashboard
- [ ] Domaines autorisés :
  - `http://localhost:3000`
  - `https://*.vercel.app`
  - `https://www.garderielesptitsloups.ch`
- [ ] Token API généré
- [ ] Webhook vers Vercel configuré

### **DNS**
- [ ] CNAME pour `www.garderielesptitsloups.ch`
- [ ] Vérifier propagation DNS
- [ ] HTTPS actif

---

## 🛠️ Commandes utiles

### **Vérifier les images Sanity**
```bash
# URL d'une image
echo "https://cdn.sanity.io/images/rnhuu2jm/production/<imageId>.jpg"

# Test de chargement
curl -I https://cdn.sanity.io/images/rnhuu2jm/production/<imageId>.jpg
```

### **Tester les domaines**
```bash
# Local
npm run dev  # http://localhost:3000

# Build local
npm run build && npm run start  # http://localhost:3000

# Vercel CLI
vercel dev  # Simulation Vercel en local
vercel --prod  # Deploy en production
```

---

## 📚 Ressources

### **Next.js**
- [Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [next.config.ts](https://nextjs.org/docs/app/api-reference/next-config-js)
- [Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)

### **Vercel**
- [Custom Domains](https://vercel.com/docs/concepts/projects/custom-domains)
- [Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Deploy Hooks](https://vercel.com/docs/concepts/git/deploy-hooks)

### **Sanity**
- [CORS Settings](https://www.sanity.io/docs/cors)
- [CDN](https://www.sanity.io/docs/image-urls)
- [Webhooks](https://www.sanity.io/docs/webhooks)

---

## 🎯 Résumé

### **URLs du projet**

| Environnement | Frontend | Sanity Studio |
|---------------|----------|---------------|
| **Local** | `http://localhost:3000` | `http://localhost:3333` |
| **Vercel Dev** | `https://*.vercel.app` | `https://*.sanity.studio` |
| **Production** | `https://www.garderielesptitsloups.ch` | `https://garderie-les-ptits-loups.sanity.studio` |

### **CDN & APIs**

| Service | URL |
|---------|-----|
| **Sanity CDN** | `https://cdn.sanity.io` |
| **Resend API** | `https://api.resend.com` |
| **reCAPTCHA** | `https://www.google.com/recaptcha/api` |

---

✅ **Tous les domaines et URLs sont documentés et configurés !**

