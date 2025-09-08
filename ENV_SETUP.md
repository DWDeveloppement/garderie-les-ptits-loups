# Configuration des Variables d'Environnement

## 📧 Configuration Resend (Obligatoire)

Créez un fichier `.env.local` à la racine du projet avec :

```bash
# Configuration Resend pour l'envoi d'emails
RESEND_API_KEY=re_xxxxxxxxxx
RESEND_TO_EMAIL=votre-email@gmail.com
```

### Obtenir les clés Resend :
1. Créez un compte sur [resend.com](https://resend.com)
2. Générez une API key dans le dashboard
3. Ajoutez-la comme `RESEND_API_KEY`
4. Configurez `RESEND_TO_EMAIL` avec votre adresse de réception

## 🛡️ Configuration reCAPTCHA (Optionnel)

```bash
# Configuration Google reCAPTCHA v3
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI
RECAPTCHA_SECRET_KEY=6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe
```

### Clés de Test (Développement) :
Les clés ci-dessus sont des clés de test de Google qui acceptent toujours la validation.

### Clés de Production :
1. Allez sur [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin)
2. Créez un nouveau site (reCAPTCHA v3)
3. Ajoutez vos domaines (localhost pour dev, votre-domaine.com pour prod)
4. Récupérez les clés et remplacez les clés de test

## 🚀 Déploiement Vercel

Ajoutez ces variables dans les paramètres de votre projet Vercel :

1. Allez dans **Settings** → **Environment Variables**
2. Ajoutez chaque variable avec sa valeur
3. Redéployez le projet

## ⚠️ Notes Importantes

- **RESEND_API_KEY** : Obligatoire pour l'envoi d'emails
- **RESEND_TO_EMAIL** : Obligatoire pour recevoir les emails
- **reCAPTCHA** : Optionnel, le formulaire fonctionne sans (avec warning)
- **Sécurité** : Ne commitez jamais le fichier `.env.local`
