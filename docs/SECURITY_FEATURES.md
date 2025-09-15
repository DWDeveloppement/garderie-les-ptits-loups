# 🔒 Fonctionnalités de Sécurité - Formulaire de Contact

## 📋 Vue d'ensemble

Le formulaire de contact utilise plusieurs couches de sécurité pour protéger contre les bots et les spams :

1. **reCAPTCHA v2** - Vérification humaine visible
2. **Champ Honeypot** - Piège invisible pour les bots
3. **Validation côté client et serveur** - Double vérification

## 🍯 Champ Honeypot

### Principe
Le champ honeypot est un champ invisible aux utilisateurs humains mais visible aux bots. Si un bot le remplit, la soumission est rejetée.

### Implémentation

#### Côté Client
```tsx
{/* Champ Honeypot - Anti-bot invisible */}
<div className="sr-only" aria-hidden="true">
  <Form.Field name="website">
    <Form.Label htmlFor="website">Site web (ne pas remplir)</Form.Label>
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

#### Caractéristiques
- **Invisible** : `sr-only`, `opacity: 0`, `position: absolute`
- **Non interactif** : `tabIndex={-1}`, `pointerEvents: 'none'`
- **Hors écran** : `left: '-9999px'`
- **Accessible** : `aria-hidden="true"` pour les lecteurs d'écran

### Validation

#### Côté Client
```typescript
// Validation du champ honeypot (anti-bot)
if (data.website && data.website.trim().length > 0) {
  // Si le champ honeypot est rempli, c'est probablement un bot
  errors.push({ field: 'website', message: 'Suspicion de bot détectée' })
}
```

#### Côté Serveur
```typescript
// Validation du champ honeypot (anti-bot)
if (website && website.trim().length > 0) {
  console.warn('Suspicion de bot détectée - champ honeypot rempli:', website)
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

## 🛡️ Couches de Sécurité

### 1. reCAPTCHA v2
- **Visible** : Case à cocher "Je ne suis pas un robot"
- **Validation** : Vérification côté serveur avec Google
- **Expiration** : Gestion des tokens expirés

### 2. Champ Honeypot
- **Invisible** : Complètement caché aux utilisateurs
- **Détection** : Rejette automatiquement les soumissions suspectes
- **Logging** : Enregistre les tentatives de bot

### 3. Validation Double
- **Client** : Validation immédiate pour l'UX
- **Serveur** : Validation finale pour la sécurité
- **Cohérence** : Même logique des deux côtés

## 🎯 Avantages

### Pour les Utilisateurs
- ✅ **Transparent** : Aucun impact sur l'expérience utilisateur
- ✅ **Rapide** : Validation instantanée
- ✅ **Accessible** : Compatible avec les lecteurs d'écran

### Pour la Sécurité
- ✅ **Efficace** : Bloque la plupart des bots simples
- ✅ **Discret** : Les bots ne savent pas qu'ils sont détectés
- ✅ **Complémentaire** : Renforce reCAPTCHA v2

### Pour les Développeurs
- ✅ **Simple** : Facile à implémenter et maintenir
- ✅ **Léger** : Aucun impact sur les performances
- ✅ **Flexible** : Peut être adapté selon les besoins

## 📊 Efficacité

### Types de Bots Bloqués
- **Bots simples** : Scripts automatisés basiques
- **Scrapers** : Outils de collecte de données
- **Spam bots** : Envoi de messages non sollicités

### Limites
- **Bots avancés** : Peuvent contourner le honeypot
- **Humains malveillants** : Ne protège pas contre les humains
- **Attaques ciblées** : Nécessite des mesures supplémentaires

## 🔧 Configuration

### Variables d'Environnement
```bash
# reCAPTCHA v2
RECAPTCHA_SITE_KEY=votre_clé_publique
RECAPTCHA_SECRET_KEY=votre_clé_secrète

# Resend (email)
RESEND_API_KEY=votre_clé_resend
RESEND_TO_EMAIL=contact@garderie.com
```

### Personnalisation
Le champ honeypot peut être personnalisé :
- **Nom du champ** : `website`, `url`, `homepage`, etc.
- **Label** : Texte d'appât pour les bots
- **Position** : N'importe où dans le formulaire

## 🚀 Déploiement

### Vérifications
1. **Champ invisible** : Vérifier que le champ n'est pas visible
2. **Validation** : Tester avec un bot simple
3. **Logs** : Surveiller les tentatives de bot
4. **Performance** : Aucun impact sur les temps de chargement

### Monitoring
- **Logs serveur** : Surveiller les rejets de honeypot
- **Métriques** : Taux de rejet des soumissions
- **Alertes** : Notifications en cas de pic d'activité suspecte

---

**🔒 Le formulaire est maintenant protégé par une double couche de sécurité : reCAPTCHA v2 + Champ Honeypot !**
