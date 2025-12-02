# Configuration SEO

## Problème actuel: `x-robots-tag: noindex`

Actuellement, le site affiche le header `x-robots-tag: noindex`, ce qui **bloque l'indexation par les moteurs de recherche**.

### Cause

Ce header est **ajouté automatiquement par Vercel** pour tous les déploiements sur des URLs `*.vercel.app`. C'est une protection pour éviter que les URLs de preview soient indexées par Google.

### Solution définitive: Ajouter un domaine personnalisé

Une fois que vous ajoutez votre domaine personnalisé dans Vercel, le header `noindex` sera **automatiquement supprimé**.

## Configuration du domaine personnalisé

### 1. Dans Vercel

1. Aller sur [Vercel Dashboard](https://vercel.com/dashboard)
2. Sélectionner votre projet "garderie-les-ptits-loups"
3. Aller dans **Settings** > **Domains**
4. Cliquer sur **Add Domain**
5. Entrer votre domaine: `www.garderielesptitsloups.ch` ou `garderielesptitsloups.ch`

### 2. Configuration DNS

Vercel vous donnera les enregistrements DNS à configurer chez votre registrar (Infomaniak, Hostpoint, etc.).

**Option A: Domaine apex (garderielesptitsloups.ch)**
```
Type: A
Name: @
Value: 76.76.21.21
```

**Option B: Sous-domaine www (www.garderielesptitsloups.ch - Recommandé)**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**Redirection www → non-www (ou inverse)**
```
Type: A
Name: @
Value: 76.76.21.98
```

### 3. Vérification

Après configuration DNS (propagation 5min - 48h):
- Vercel détectera automatiquement le domaine
- Le certificat SSL sera généré automatiquement
- Le header `x-robots-tag: noindex` sera supprimé

## Fichiers SEO créés

### 1. `/src/app/robots.ts`

Génère automatiquement le fichier `robots.txt` en fonction du domaine:

**Liste des domaines de production autorisés:**
- `www.garderielesptitsloups.ch`
- `garderielesptitsloups.ch`
- Vous pouvez ajouter d'autres alias dans le code

**Comportement:**

```txt
# Sur *.vercel.app ou domaine non listé (preview/staging)
User-agent: *
Disallow: /

# Sur domaine de production autorisé
User-agent: *
Allow: /
Disallow: /api/
Disallow: /sanity/
Disallow: /_next/
Sitemap: https://www.garderielesptitsloups.ch/sitemap.xml
```

**Ajouter un nouvel alias:**

Si vous ajoutez un alias dans Vercel (ex: `garderie.example.com`), ajoutez-le dans `src/app/robots.ts`:

```typescript
const productionDomains = [
  'www.garderielesptitsloups.ch',
  'garderielesptitsloups.ch',
  'garderie.example.com', // Nouvel alias
]
```

### 2. `/src/app/sitemap.ts`

Génère automatiquement le fichier `sitemap.xml` avec:
- Page d'accueil (/)
- Page À propos (/a-propos)
- Page Contact (/contact)
- Page Tarifs (/tarifs)
- Pages secteurs (/la-structure/nurserie, /trotteurs, /grands, /autres-espaces)
- Mentions légales et politique de confidentialité

### 3. `/src/app/layout.tsx`

Metadata SEO globales:
- Titre par défaut avec template
- Description
- Keywords
- Open Graph (Facebook, LinkedIn)
- Twitter Card
- Robots: index, follow
- MetadataBase pour URLs absolues

### 4. Metadata par page

Chaque page a ses propres metadata SEO via:
- `export const metadata = { ... }` (pages statiques)
- `export async function generateMetadata()` (pages dynamiques avec données Sanity)

## Configuration Google Search Console

Une fois le domaine personnalisé configuré:

### 1. Ajouter le site dans Google Search Console

1. Aller sur [Google Search Console](https://search.google.com/search-console)
2. Ajouter une propriété avec votre domaine: `https://www.garderielesptitsloups.ch`
3. Vérifier le domaine via:
   - **Enregistrement DNS TXT** (recommandé)
   - Ou fichier HTML sur le serveur
   - Ou balise meta dans `<head>` (ajouter dans `layout.tsx`)

### 2. Soumettre le sitemap

1. Dans Google Search Console > **Sitemaps**
2. Ajouter l'URL: `https://www.garderielesptitsloups.ch/sitemap.xml`
3. Google commencera l'indexation (peut prendre quelques jours)

### 3. Demander l'indexation

Pour accélérer le processus:
1. Dans Google Search Console > **Inspection d'URL**
2. Entrer chaque URL importante
3. Cliquer sur **Demander l'indexation**

## Variables d'environnement importantes

### Development
```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Preview (Vercel develop branch)
```bash
NEXT_PUBLIC_SITE_URL=https://garderie-les-ptits-loups-git-develop-pataco80s-projects.vercel.app
```

### Production (après configuration domaine)
```bash
NEXT_PUBLIC_SITE_URL=https://www.garderielesptitsloups.ch
```

⚠️ **Important**: Mettre à jour cette variable dans Vercel après avoir configuré le domaine personnalisé.

## Vérification de l'indexation

### 1. Vérifier le header x-robots-tag

```bash
curl -I https://www.garderielesptitsloups.ch/
```

Après configuration du domaine, vous ne devriez **plus voir** `x-robots-tag: noindex`.

### 2. Vérifier robots.txt

```bash
curl https://www.garderielesptitsloups.ch/robots.txt
```

Devrait afficher:
```txt
User-agent: *
Allow: /
Disallow: /api/
...
```

### 3. Vérifier le sitemap

```bash
curl https://www.garderielesptitsloups.ch/sitemap.xml
```

Devrait afficher un XML avec toutes les URLs.

### 4. Tester l'indexation Google

Après quelques jours:
```
site:www.garderielesptitsloups.ch
```

Dans Google Search, cette requête affichera toutes les pages indexées.

## Optimisations SEO supplémentaires

### 1. Schema.org / JSON-LD

Ajouter des données structurées pour:
- Organization (informations sur la garderie)
- LocalBusiness (horaires, adresse, téléphone)
- BreadcrumbList (navigation)

### 2. Images optimisées

- ✅ Utilisation de Next/Image avec lazy loading
- ✅ Formats WebP et AVIF
- ⚠️ Ajouter des attributs `alt` descriptifs partout
- ⚠️ Optimiser la taille des images dans Sanity

### 3. Performance

- ✅ ISR avec cache de 60s
- ✅ Fonts optimisées avec `next/font`
- ✅ CSS critique inline
- ⚠️ Vérifier le score Lighthouse (npm run lighthouse)

### 4. Contenu

- ⚠️ Ajouter plus de contenu texte unique sur chaque page
- ⚠️ Utiliser des balises H1, H2, H3 sémantiques
- ⚠️ Ajouter des liens internes entre les pages
- ⚠️ Créer une page FAQ si pertinent

## Checklist finale avant mise en production

- [ ] Configurer le domaine personnalisé dans Vercel
- [ ] Vérifier que `x-robots-tag: noindex` est supprimé
- [ ] Mettre à jour `NEXT_PUBLIC_SITE_URL` dans Vercel
- [ ] Ajouter le site dans Google Search Console
- [ ] Soumettre le sitemap.xml
- [ ] Demander l'indexation des pages principales
- [ ] Ajouter le code de vérification Google Analytics (si souhaité)
- [ ] Tester avec Google Rich Results Test
- [ ] Vérifier le score Lighthouse (>90 recommandé)

## Resources

- [Vercel Custom Domains](https://vercel.com/docs/projects/domains)
- [Next.js Metadata](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Google Search Console](https://search.google.com/search-console)
- [Schema.org](https://schema.org/)
