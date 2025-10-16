# Configuration des Webhooks Sanity → Vercel

## 🎯 Objectif

Permettre au client de publier du contenu dans Sanity Studio et que le site se rebuild **automatiquement** sur Vercel.

---

## 📋 Prérequis

- Projet déployé sur Vercel
- Accès au dashboard Vercel
- Accès au dashboard Sanity (manage.sanity.io)

---

## 🔧 Étape 1 : Obtenir le Deploy Hook de Vercel

### Sur Vercel :

1. Va sur [vercel.com/dashboard](https://vercel.com/dashboard)
2. Sélectionne ton projet **"garderie-les-ptits-loups"**
3. Va dans **Settings** → **Git**
4. Scroll jusqu'à **Deploy Hooks**
5. Clique sur **Create Hook**
6. Configuration :
   ```
   Name: Sanity Publish
   Git Branch: main (ou ta branche de production)
   ```
7. Clique sur **Create Hook**
8. **COPIE L'URL** générée (elle ressemble à ça) :
   ```
   https://api.vercel.com/v1/integrations/deploy/prj_XXXXX/YYYYY
   ```

---

## 🔧 Étape 2 : Configurer la variable d'environnement

### Sur Vercel (Production) :

1. Dans le même projet Vercel
2. Va dans **Settings** → **Environment Variables**
3. Clique sur **Add New**
4. Configuration :
   ```
   Name: SANITY_STUDIO_VERCEL_DEPLOY_HOOK
   Value: [Colle l'URL du Deploy Hook]
   Environments: ☑ Production
   ```
5. Clique sur **Save**

### En local (Développement) :

1. Crée/édite le fichier `.env.local` à la racine du projet
2. Ajoute :
   ```bash
   SANITY_STUDIO_VERCEL_DEPLOY_HOOK=https://api.vercel.com/v1/integrations/deploy/...
   ```
3. **NE PAS** committer ce fichier (déjà dans `.gitignore`)

---

## 🔧 Étape 3 : Configurer le Webhook dans Sanity

### Sur Sanity Manage Dashboard :

1. Va sur [sanity.io/manage](https://www.sanity.io/manage)
2. Sélectionne le projet **"garderie-les-ptits-loups"**
3. Va dans **API** → **Webhooks**
4. Clique sur **Add webhook**
5. Configuration :

   ```
   Name: Vercel Production Deploy
   URL: [Colle l'URL du Deploy Hook de Vercel]
   Dataset: production
   Trigger on: ☑ Create  ☑ Update  ☑ Delete
   Filter (GROQ): Copie ce code ↓
   ```

   ```groq
   _type in ["home", "aboutPage", "contactPage", "schedulePage", "sectorPage", "spacePage", "prices", "testimonials"]
   ```

   ```
   Projection (optionnel): Copie ce code ↓
   ```

   ```groq
   {
     _type,
     _id,
     title,
     "publishedAt": _updatedAt
   }
   ```

   ```
   HTTP method: POST
   HTTP headers: (laisse vide)
   API version: v2021-06-07 (ou la plus récente)
   Secret: (laisse vide pour l'instant)
   ```

6. Clique sur **Save**

---

## ✅ Étape 4 : Tester le Webhook

### Test 1 : Via Sanity Studio

1. Ouvre Sanity Studio (localhost:3333 ou ton URL de prod)
2. Édite n'importe quelle page (ex: Page d'accueil)
3. Fais une petite modification (change un texte)
4. Clique sur **Publish** 🟢
5. Va sur Vercel Dashboard → Deployments
6. Tu devrais voir un nouveau deployment se lancer ! 🚀

### Test 2 : Via Dashboard Sanity

1. Sur [sanity.io/manage](https://www.sanity.io/manage)
2. Va dans **API** → **Webhooks**
3. Clique sur ton webhook "Vercel Production Deploy"
4. Clique sur **Test webhook**
5. Vérifie dans Vercel que le deployment se lance

---

## 📊 Vérification des Logs

### Sur Sanity :
- API → Webhooks → [Ton webhook] → **Logs**
- Tu verras tous les déclenchements et leur statut (200 = OK)

### Sur Vercel :
- Deployments → Chaque rebuild listera "Triggered by Deploy Hook"

---

## 🎯 Workflow Client Final

```
1. Client ouvre Sanity Studio
2. Client édite du contenu
3. Client clique sur "Publish" 🟢
   ↓
   [Webhook déclenché automatiquement]
   ↓
4. Vercel rebuild le site (~30-60 sec)
   ↓
5. Site mis à jour ! ✅
```

**Le client n'a RIEN à faire de plus !** 🎉

---

## 🚨 Troubleshooting

### Webhook ne se déclenche pas :

1. Vérifie que `SANITY_STUDIO_VERCEL_DEPLOY_HOOK` est bien défini dans Vercel
2. Vérifie l'URL du webhook dans Sanity (manage.sanity.io)
3. Regarde les logs webhook dans Sanity
4. Vérifie que le filtre GROQ est correct

### Rebuild trop fréquents :

- Affine le filtre GROQ pour exclure certains types
- Change `Trigger on` pour uniquement `Update`

### Variables d'environnement :

```bash
# Vérifier en local
echo $SANITY_STUDIO_VERCEL_DEPLOY_HOOK

# Vérifier sur Vercel
Vercel Dashboard → Settings → Environment Variables
```

---

## 📝 Notes

- **Sécurité** : L'URL du Deploy Hook est sensible, ne la partage pas publiquement
- **Performance** : Le rebuild prend ~30-60 secondes selon la taille du site
- **Coût** : Les rebuilds sont inclus dans le quota Vercel (généreux)
- **Fréquence** : Le client peut publier autant qu'il veut, Vercel gère

---

## 🔒 Sécurité

### Rôles Sanity :

```
Client (Éditeur) :
├─ Accès : Sanity Studio uniquement
├─ Rôle : Editor
└─ Peut : Éditer et publier du contenu

Développeur (Toi) :
├─ Accès : Code source + Sanity Manage + Vercel
├─ Rôle : Administrator
└─ Peut : Configuration technique (webhooks, API, etc.)
```

**Le client ne peut PAS modifier/supprimer les webhooks** (configuration via code) ✅

---

## 📚 Ressources

- [Sanity Webhooks Documentation](https://www.sanity.io/docs/webhooks)
- [Vercel Deploy Hooks](https://vercel.com/docs/git/deploy-hooks)
- [GROQ Query Language](https://www.sanity.io/docs/groq)

