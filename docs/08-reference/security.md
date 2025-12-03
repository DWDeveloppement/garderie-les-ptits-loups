# 🔒 Sécurité du Formulaire de Contact

## 📋 Vue d'Ensemble

Le formulaire de contact utilise **3 couches de sécurité** pour protéger contre les bots, les spams et les abus :

1. 🛡️ **Google reCAPTCHA v2** - Vérification humaine visible
2. 🍯 **Champ Honeypot** - Piège invisible pour les bots
3. ✅ **Validation Double** - Client + Serveur

---

## 🛡️ Couche 1 : Google reCAPTCHA v2

### Principe

reCAPTCHA v2 affiche une case à cocher **"Je ne suis pas un robot"** visible par l'utilisateur. Après validation, un token est généré et vérifié côté serveur.

### Pourquoi reCAPTCHA v2 (et pas v3) ?

| Aspect | reCAPTCHA v2 | reCAPTCHA v3 |
|--------|--------------|--------------|
| **Visibilité** | ✅ Case à cocher visible | ❌ Invisible |
| **Transparence** | ✅ L'utilisateur sait qu'il est vérifié | ❌ Processus caché |
| **Accessibilité** | ✅ Compatible lecteurs d'écran | ⚠️ Problématique |
| **Fiabilité** | ✅ Validation manuelle claire | ⚠️ Score imprévisible |
| **UX** | ✅ Interaction claire | ❌ Peut bloquer sans explication |
| **RGPD** | ✅ Consentement explicite | ⚠️ Tracking invisible |

### Configuration

```bash
# Variables d'environnement requises
RECAPTCHA_SITE_KEY="your_site_key"      # Clé publique
RECAPTCHA_SECRET_KEY="your_secret_key"  # Clé privée
```

### Obtenir les Clés

1. Aller sur [google.com/recaptcha/admin](https://www.google.com/recaptcha/admin)
2. **Créer un site** :
   - **Label** : `Garderie Les P'tits Loups`
   - **Type** : reCAPTCHA v2 ("Je ne suis pas un robot" Checkbox)
   - **Domaines** :
     - `localhost` (développement)
     - `garderie-les-ptits-loups.vercel.app`
     - `votre-domaine.com`
3. Récupérer **Site Key** et **Secret Key**

### Clés de Test (Développement)

Google fournit des clés de test qui acceptent toujours la validation :

```bash
RECAPTCHA_SITE_KEY="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
RECAPTCHA_SECRET_KEY="6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe"
```

⚠️ **Attention** : Remplacer par de vraies clés en production !

### Fonctionnement

#### Côté Client

```typescript
// 1. Charger le script reCAPTCHA
useEffect(() => {
  const script = document.createElement('script')
  script.src = `https://www.google.com/recaptcha/api.js`
  script.async = true
  script.defer = true
  document.body.appendChild(script)
}, [])

// 2. Afficher la case à cocher
<div className="g-recaptcha" data-sitekey={siteKey}></div>

// 3. Récupérer le token après validation
const token = grecaptcha.getResponse()
```

#### Côté Serveur

```typescript
// Vérifier le token avec Google
const verifyResponse = await fetch(
  'https://www.google.com/recaptcha/api/siteverify',
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      secret: process.env.RECAPTCHA_SECRET_KEY,
      response: token,
    }),
  }
)

const verifyData = await verifyResponse.json()

if (!verifyData.success) {
  return NextResponse.json(
    { success: false, error: 'Validation reCAPTCHA échouée' },
    { status: 400 }
  )
}
```

### Accessibilité

```tsx
{/* Annonce vocale pour lecteurs d'écran */}
<div
  role="status"
  aria-live="polite"
  className="sr-only"
>
  Un système de protection anti-spam va apparaître
</div>

{/* reCAPTCHA avec aria-label */}
<div 
  className="g-recaptcha" 
  data-sitekey={siteKey}
  aria-label="Vérification anti-spam reCAPTCHA"
></div>
```

**Compatibilité :**
- ✅ NVDA (Windows)
- ✅ JAWS (Windows)
- ✅ VoiceOver (macOS/iOS)
- ✅ Navigation clavier (Tab/Enter)

---

## 🍯 Couche 2 : Champ Honeypot

### Principe

Le champ honeypot est un champ **invisible** aux humains mais **visible** aux bots. Si un bot le remplit, la soumission est automatiquement rejetée.

### Pourquoi le Honeypot ?

- ✅ **Efficace** : Bloque 90%+ des bots simples
- ✅ **Invisible** : Aucun impact sur l'UX
- ✅ **Léger** : Pas de dépendance externe
- ✅ **Complémentaire** : Renforce reCAPTCHA v2

### Implémentation

```tsx
{/* Champ Honeypot - Anti-bot invisible */}
<div className="sr-only" aria-hidden="true">
  <Form.Field name="website">
    <Form.Label htmlFor="website">
      Site web (ne pas remplir)
    </Form.Label>
    <Form.Control asChild>
      <input
        id="website"
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={formData.website || ''}
        onChange={(e) => handleInputChange('website', e.target.value)}
        style={{ 
          position: 'absolute',
          left: '-9999px',
          width: '1px',
          height: '1px',
          opacity: 0,
          pointerEvents: 'none'
        }}
      />
    </Form.Control>
  </Form.Field>
</div>
```

### Caractéristiques

| Propriété | Valeur | But |
|-----------|--------|-----|
| `className="sr-only"` | Screen reader only | Caché visuellement |
| `aria-hidden="true"` | Masqué | Ignoré par lecteurs d'écran |
| `tabIndex={-1}` | Pas dans l'ordre de tabulation | Non accessible au clavier |
| `position: absolute` | Hors du flux | Invisible |
| `left: '-9999px'` | Hors écran | Hors de la vue |
| `opacity: 0` | Transparent | Invisible |
| `pointerEvents: 'none'` | Non cliquable | Non interactif |

### Validation

#### Côté Client

```typescript
// Si le champ honeypot est rempli → probablement un bot
if (data.website && data.website.trim().length > 0) {
  errors.push({ 
    field: 'website', 
    message: 'Suspicion de bot détectée' 
  })
  return { valid: false, errors }
}
```

#### Côté Serveur

```typescript
// Validation finale côté serveur
const { website } = await request.json()

if (website && website.trim().length > 0) {
  console.warn('🚨 Suspicion de bot - champ honeypot rempli:', website)
  
  return NextResponse.json(
    {
      success: false,
      error: 'Suspicion de bot détectée',
      details: 'Le formulaire semble être soumis par un bot',
    },
    { status: 400 }
  )
}
```

### Types de Bots Bloqués

- ✅ **Bots simples** : Scripts automatisés basiques
- ✅ **Scrapers** : Outils de collecte de données
- ✅ **Spam bots** : Envoi de messages non sollicités
- ⚠️ **Bots avancés** : Peuvent contourner (détectent les champs cachés)

---

## ✅ Couche 3 : Validation Double

### Principe

Validation **côté client** (UX rapide) **ET** côté serveur (sécurité).

### Côté Client

```typescript
// Validation immédiate pour l'UX
function validateForm(data: FormData) {
  const errors: ValidationError[] = []
  
  // 1. Champs requis
  if (!data.name?.trim()) {
    errors.push({ field: 'name', message: 'Le nom est requis' })
  }
  
  if (!data.email?.trim()) {
    errors.push({ field: 'email', message: 'L\'email est requis' })
  }
  
  // 2. Format email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (data.email && !emailRegex.test(data.email)) {
    errors.push({ field: 'email', message: 'Email invalide' })
  }
  
  // 3. Honeypot
  if (data.website?.trim()) {
    errors.push({ field: 'website', message: 'Suspicion de bot' })
  }
  
  return { valid: errors.length === 0, errors }
}
```

### Côté Serveur

```typescript
// app/api/contact/route.ts
export async function POST(request: Request) {
  const { name, email, message, website, recaptchaToken } = await request.json()
  
  // 1. Validation des champs
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json(
      { success: false, error: 'Champs manquants' },
      { status: 400 }
    )
  }
  
  // 2. Honeypot
  if (website?.trim()) {
    console.warn('🚨 Bot détecté - honeypot rempli')
    return NextResponse.json(
      { success: false, error: 'Suspicion de bot' },
      { status: 400 }
    )
  }
  
  // 3. reCAPTCHA
  const verifyResponse = await fetch(
    'https://www.google.com/recaptcha/api/siteverify',
    {
      method: 'POST',
      body: new URLSearchParams({
        secret: process.env.RECAPTCHA_SECRET_KEY!,
        response: recaptchaToken,
      }),
    }
  )
  
  const verifyData = await verifyResponse.json()
  
  if (!verifyData.success) {
    console.warn('🚨 reCAPTCHA échoué:', verifyData['error-codes'])
    return NextResponse.json(
      { success: false, error: 'Validation reCAPTCHA échouée' },
      { status: 400 }
    )
  }
  
  // 4. Envoi de l'email si tout est OK
  // ...
}
```

---

## 📊 Monitoring & Logs

### Logs de Sécurité

```typescript
// Exemples de logs générés
console.log('✅ reCAPTCHA validé avec succès')
console.log('✅ Honeypot vide - utilisateur humain')
console.log('✅ Validation double réussie')

console.warn('🚨 Suspicion de bot - honeypot rempli:', website)
console.warn('🚨 reCAPTCHA échoué:', verifyData['error-codes'])
console.error('❌ Erreur envoi email:', error)
```

### Métriques à Suivre

| Métrique | Objectif | Alerte si |
|----------|----------|-----------|
| **Taux de validation reCAPTCHA** | >95% | <90% |
| **Rejets honeypot** | <5% du total | >10% |
| **Taux d'envoi réussi** | >98% | <95% |
| **Temps de réponse API** | <2s | >5s |

### Dashboard Recommandé

- **Vercel Analytics** : Taux d'erreur API
- **Resend Dashboard** : Emails envoyés/rejetés
- **reCAPTCHA Admin** : Statistiques de validation
- **Logs Vercel** : Détection de patterns suspects

---

## 🔒 Bonnes Pratiques de Sécurité

### Variables d'Environnement

```bash
# ✅ FAIRE
RECAPTCHA_SECRET_KEY="..."  # Jamais exposé au client
RESEND_API_KEY="..."        # Jamais exposé au client

# ❌ NE PAS FAIRE
NEXT_PUBLIC_RECAPTCHA_SECRET_KEY="..."  # Exposé au client !
```

### Rate Limiting (Recommandé)

```typescript
// Limiter à 5 soumissions / IP / heure
import { Ratelimit } from '@upstash/ratelimit'

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(5, '1 h'),
})

const { success } = await ratelimit.limit(ipAddress)
if (!success) {
  return NextResponse.json(
    { error: 'Trop de tentatives. Réessayez plus tard.' },
    { status: 429 }
  )
}
```

### Headers de Sécurité

```typescript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
        ],
      },
    ]
  },
}
```

---

## 🧪 Tests de Sécurité

### Test Manuel

```bash
# 1. Test utilisateur normal
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Test message",
    "website": "",
    "recaptchaToken": "valid_token"
  }'
# → Devrait réussir

# 2. Test bot (honeypot rempli)
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Bot",
    "email": "bot@example.com",
    "message": "Spam",
    "website": "http://spam.com",
    "recaptchaToken": "valid_token"
  }'
# → Devrait être rejeté (400)

# 3. Test reCAPTCHA invalide
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Test",
    "website": "",
    "recaptchaToken": "invalid_token"
  }'
# → Devrait être rejeté (400)
```

### Test Automatisé

```typescript
// tests/security.test.ts
describe('Contact Form Security', () => {
  it('should reject honeypot filled', async () => {
    const res = await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Bot',
        email: 'bot@test.com',
        message: 'Spam',
        website: 'http://spam.com', // Honeypot rempli
        recaptchaToken: 'test_token',
      }),
    })
    
    expect(res.status).toBe(400)
    expect(await res.json()).toMatchObject({
      success: false,
      error: 'Suspicion de bot détectée',
    })
  })
})
```

---

## 📚 Ressources

### Documentation
- [reCAPTCHA v2 Documentation](https://developers.google.com/recaptcha/docs/display)
- [Honeypot Technique](https://en.wikipedia.org/wiki/Honeypot_(computing))
- [OWASP Form Security](https://owasp.org/www-community/vulnerabilities/Unrestricted_File_Upload)

### Outils
- [reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
- [Resend Dashboard](https://resend.com/dashboard)
- [Vercel Logs](https://vercel.com/dashboard)

---

## 🆘 Dépannage

### reCAPTCHA ne s'affiche pas

1. Vérifier `RECAPTCHA_SITE_KEY` dans `.env.local`
2. Vérifier que le domaine est autorisé dans Google reCAPTCHA Admin
3. Vérifier la console navigateur pour les erreurs
4. Tester avec les clés de test

### Honeypot bloque des vrais utilisateurs

- **Rare** : Possible si extension navigateur auto-remplissage
- **Solution** : Vérifier les logs pour patterns suspects
- **Alternative** : Renommer le champ (`url`, `homepage`, etc.)

### Trop de rejets reCAPTCHA

1. Vérifier que `RECAPTCHA_SECRET_KEY` est correcte
2. Vérifier les logs Google reCAPTCHA Admin
3. Tester avec les clés de test
4. Vérifier la connexion réseau du serveur

---

**🔒 Le formulaire est maintenant protégé par 3 couches de sécurité : reCAPTCHA v2 + Honeypot + Validation Double !**

**Dernière mise à jour :** Octobre 2024  
**Version :** reCAPTCHA v2 + Next.js 15 + TypeScript

