# Configuration Google reCAPTCHA v3

## 🛡️ Protection Anti-Spam

Le formulaire de contact est maintenant protégé par Google reCAPTCHA v3.

## 📋 Configuration Requise

### 1. Variables d'Environnement

Ajoutez ces variables à votre fichier `.env.local` :

```bash
# Google reCAPTCHA v3
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=votre_site_key_ici
RECAPTCHA_SECRET_KEY=votre_secret_key_ici
```

### 2. Obtenir les Clés reCAPTCHA

1. **Aller sur** : https://www.google.com/recaptcha/admin
2. **Créer un nouveau site** :
   - **Label** : Garderie Les P'tits Loups
   - **Type** : reCAPTCHA v3
   - **Domaines** : 
     - `localhost` (pour le développement)
     - `votre-domaine.com` (pour la production)
3. **Récupérer les clés** :
   - **Site Key** → `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
   - **Secret Key** → `RECAPTCHA_SECRET_KEY`

### 3. Clés de Test (Développement)

Pour le développement, vous pouvez utiliser les clés de test de Google :

```bash
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI
RECAPTCHA_SECRET_KEY=6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe
```

⚠️ **Attention** : Ces clés de test acceptent toujours la validation.

## 🔧 Fonctionnement

### Côté Client
- **reCAPTCHA v3** s'exécute en arrière-plan
- **Token généré** automatiquement lors de la soumission
- **Score calculé** par Google (0.0 à 1.0)
- **Invisible** pour l'utilisateur

### Côté Serveur
- **Validation du token** avec Google
- **Score minimum** : 0.5 (configurable)
- **Rejet** si score trop faible ou token invalide

## 📊 Score reCAPTCHA

| Score | Signification | Action |
|-------|---------------|---------|
| 0.9 - 1.0 | Très probablement humain | ✅ Accepté |
| 0.7 - 0.9 | Probablement humain | ✅ Accepté |
| 0.5 - 0.7 | Suspect | ✅ Accepté (seuil actuel) |
| 0.1 - 0.5 | Probablement bot | ❌ Rejeté |
| 0.0 - 0.1 | Très probablement bot | ❌ Rejeté |

## 🧪 Test

### Mode Développement
- Utilisez les clés de test
- Toutes les soumissions sont acceptées
- Logs détaillés dans la console

### Mode Production
- Utilisez vos vraies clés
- Validation stricte du score
- Protection anti-spam active

## 🚨 Dépannage

### Erreur "reCAPTCHA non disponible"
- Vérifiez `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
- Vérifiez la connexion internet
- Vérifiez les domaines autorisés

### Erreur "Token reCAPTCHA invalide"
- Vérifiez `RECAPTCHA_SECRET_KEY`
- Vérifiez le score minimum
- Vérifiez les logs serveur

## 📈 Monitoring

Les logs incluent :
- ✅ Token généré avec succès
- 📊 Score reCAPTCHA reçu
- ❌ Échecs de validation
- ⚠️ Clés manquantes

## 🔒 Sécurité

- **Secret Key** : Jamais exposée côté client
- **Site Key** : Publique, mais limitée aux domaines autorisés
- **Score dynamique** : S'adapte au comportement
- **Protection invisible** : Aucune interaction utilisateur requise
