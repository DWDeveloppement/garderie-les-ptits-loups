# Procédure de transfert du projet Sanity

> Étapes pour transférer le projet au client et configurer les accès

---

## 📋 Checklist avant transfert

- [ ] Compte client Sanity créé
- [ ] Contenu vérifié et à jour
- [ ] Variables d'environnement documentées
- [ ] Webhook Vercel configuré (si applicable)

---

## Étape 1 : Création du compte client

### Le client doit :

1. Aller sur [sanity.io/login](https://www.sanity.io/login)
2. Cliquer sur **"Sign up"**
3. Choisir une méthode de connexion :
   - **GitHub** (recommandé si le client a un compte)
   - **Google**
   - **Email/Password**
4. Confirmer l'email si nécessaire

### Informations à récupérer :

- **Email du compte client** : **********\_\_\_\_**********

---

## Étape 2 : Transfert du projet

### Propriétaire actuel (vous) :

1. Connectez-vous sur [sanity.io/manage](https://www.sanity.io/manage)
2. Sélectionnez le projet **garderie-les-ptits-loups**
3. Allez dans **Settings** → **Project details**
4. Scrollez jusqu'à **"Transfer project"**
5. Entrez l'email du compte client
6. Confirmez le transfert

### Nouveau propriétaire (client) :

1. Le client reçoit une notification/email
2. Se connecte sur [sanity.io/manage](https://www.sanity.io/manage)
3. Accepte le transfert dans **Notifications** ou via le lien email

---

## Étape 3 : Invitation du développeur

### Le client doit :

1. Aller sur [sanity.io/manage](https://www.sanity.io/manage)
2. Sélectionner le projet transféré
3. Aller dans **Members**
4. Cliquer sur **"Invite member"**
5. Entrer l'email du développeur
6. Choisir le rôle : **Administrator**
7. Envoyer l'invitation

### Rôles disponibles :

| Rôle              | Droits                                     |
| ----------------- | ------------------------------------------ |
| **Administrator** | Accès complet (settings, membres, contenu) |
| **Editor**        | Édition du contenu uniquement              |
| **Viewer**        | Lecture seule                              |

---

## Étape 4 : Vérification post-transfert

### Vérifier :

- [ ] Le client peut se connecter au Studio
- [ ] Le client peut publier du contenu
- [ ] Le site se met à jour après publication
- [ ] Les tokens API fonctionnent toujours

### Informations projet (inchangées) :

```
Project ID: [VOTRE_PROJECT_ID]
Dataset: production
Studio URL: https://garderie-les-ptits-loups.sanity.studio
```

---

## Étape 5 : Déployer le Studio

### Depuis le terminal du projet :

```bash
# Se connecter avec le compte qui a accès au projet
npx sanity login

# Déployer le Studio
npx sanity deploy
```

### Choisir un hostname :

- Suggestion : `garderie-les-ptits-loups`
- URL finale : `https://garderie-les-ptits-loups.sanity.studio`

---

## 🔧 Configuration Vercel (Webhook)

Pour que le site se mette à jour automatiquement après publication :

### 1. Créer un Deploy Hook sur Vercel

1. Dashboard Vercel → Projet
2. **Settings** → **Git** → **Deploy Hooks**
3. Créer un hook :
   - Name: `sanity-publish`
   - Branch: `main`
4. Copier l'URL générée

### 2. Configurer le Webhook sur Sanity

1. [sanity.io/manage](https://www.sanity.io/manage) → Projet
2. **API** → **Webhooks** → **Create webhook**
3. Configuration :
   - **Name** : `Vercel Deploy`
   - **URL** : [URL du Deploy Hook Vercel]
   - **Dataset** : `production`
   - **Trigger on** : `Create`, `Update`, `Delete`
   - **Filter** : _(laisser vide pour tout)_
4. Sauvegarder

---

## 📝 Récapitulatif pour le client

Après le transfert, envoyer au client :

1. ✅ Lien vers le Studio : `https://garderie-les-ptits-loups.sanity.studio`
2. ✅ Guide d'utilisation : `docs/CLIENT_GUIDE_SANITY.md`
3. ✅ Identifiants de connexion (rappel de la méthode choisie)

---

## ⚠️ Points d'attention

- **Facturation** : Après transfert, la facturation passe sur le compte du client
- **Plan gratuit** : Sanity offre un plan gratuit généreux (3 users, 500k API requests/mois)
- **Tokens** : Les tokens API existants restent valides après le transfert
