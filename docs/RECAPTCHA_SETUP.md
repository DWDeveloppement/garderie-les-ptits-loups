# Configuration Google reCAPTCHA v2

## 🛡️ Protection Anti-Spam

Le formulaire de contact est maintenant protégé par Google reCAPTCHA v2 avec case à cocher visible.

## 📋 Configuration Requise

### 1. Variables d'Environnement

Ajoutez ces variables à votre fichier `.env.local` :

```bash
# Google reCAPTCHA v2
RECAPTCHA_SITE_KEY=votre_site_key_ici
RECAPTCHA_SECRET_KEY=votre_secret_key_ici
```
>**Important** : Vercel refuse le préfixe `NEXT_PUBLIC_` pour les variables d'environnement. La clé est récupérée côté client via une API route sécurisée.
### 2. Obtenir les Clés reCAPTCHA

1. **Aller sur** : https://www.google.com/recaptcha/admin
2. **Créer un nouveau site** :
   - **Label** : Garderie Les P'tits Loups
   - **Type** : reCAPTCHA v2 ("Je ne suis pas un robot" Checkbox)
   - **Domaines** : 
     - `localhost` (pour le développement)
     - `garderie-les-ptits-loups.vercel.app` (pour la production)
     - `garderie-les-ptits-loups-git-main-pataco80s-projects.vercel.app` (pour la production)
3. **Récupérer les clés** :
   - **Site Key** → `RECAPTCHA_SITE_KEY`
   - **Secret Key** → `RECAPTCHA_SECRET_KEY`

### 3. Clés de Test (Développement)

Pour le développement, vous pouvez utiliser les clés de test de Google :

```bash
RECAPTCHA_SITE_KEY=6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI
RECAPTCHA_SECRET_KEY=6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe
```

⚠️ **Attention** : Ces clés de test acceptent toujours la validation.

## 🔧 Fonctionnement

### Côté Client
- **reCAPTCHA v2** affiche une case à cocher visible
- **Case "Je ne suis pas un robot"** à cocher par l'utilisateur
- **Défi visuel** possible (sélection d'images, etc.)
- **Token généré** après validation réussie
- **Interface claire** et accessible

### Côté Serveur
- **Validation du token** avec Google
- **Vérification binaire** : succès/échec
- **Rejet** si token invalide ou expiré
- **Pas de score** : validation manuelle par l'utilisateur

## 🎯 Avantages reCAPTCHA v2

| Aspect | reCAPTCHA v2 | reCAPTCHA v3 |
|--------|--------------|--------------|
| **Visibilité** | ✅ Case à cocher visible | ❌ Invisible |
| **Transparence** | ✅ L'utilisateur sait qu'il est vérifié | ❌ Processus caché |
| **Accessibilité** | ✅ Compatible lecteurs d'écran | ⚠️ Peut être problématique |
| **Fiabilité** | ✅ Validation manuelle claire | ⚠️ Score parfois imprévisible |
| **UX** | ✅ Interaction claire | ❌ Peut bloquer sans explication |

## 🧪 Test

### Mode Développement
- Utilisez les clés de test
- Case à cocher toujours acceptée
- Logs détaillés dans la console
- Interface visible pour les tests

### Mode Production
- Utilisez vos vraies clés
- Validation stricte du token
- Protection anti-spam active
- Défis visuels possibles

## 🚨 Dépannage

### Erreur "reCAPTCHA non configuré"
- Vérifiez `RECAPTCHA_SITE_KEY`
- Vérifiez la connexion internet
- Vérifiez les domaines autorisés

### Erreur "Token reCAPTCHA invalide"
- Vérifiez `RECAPTCHA_SECRET_KEY`
- Vérifiez que la case est bien cochée
- Vérifiez les logs serveur

### Case à cocher ne s'affiche pas
- Vérifiez `RECAPTCHA_SITE_KEY`
- Vérifiez les domaines autorisés
- Vérifiez la console pour les erreurs
- Vérifiez l'API `/api/recaptcha-config`

## 📈 Monitoring

Les logs incluent :
- ✅ Token généré avec succès
- 🔍 Case à cocher cochée
- ❌ Échecs de validation
- ⚠️ Clés manquantes
- 🎯 Défis visuels résolus

## 🔒 Sécurité

- **Secret Key** : Jamais exposée côté client
- **Site Key** : Publique, mais limitée aux domaines autorisés
- **Validation manuelle** : L'utilisateur doit prouver qu'il est humain
- **Protection visible** : Transparence totale du processus

## ♿ Accessibilité

- **Annonce vocale** : "Un système de protection anti-spam va apparaître"
- **Navigation clavier** : Compatible avec Tab/Enter
- **Labels ARIA** : `aria-label` et `aria-live="polite"`
- **Lecteurs d'écran** : Compatible avec NVDA, JAWS, VoiceOver
- **Contraste** : Respecte les standards d'accessibilité
