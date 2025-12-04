# Référence - Troubleshooting

## 📊 Vue d'ensemble

Solutions aux problèmes courants rencontrés lors du développement.

---

## 🔴 Erreurs Fréquentes

### Port 3000 Déjà Utilisé

**Erreur** :
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solution** :
```bash
npm run kill:dev
npm run dev
```

**Alternative** :
```bash
# Trouver le processus
lsof -ti:3000

# Tuer le processus
kill -9 <PID>
```

---

### Port 3333 Déjà Utilisé (Sanity)

**Erreur** :
```
Error: listen EADDRINUSE: address already in use :::3333
```

**Solution** :
```bash
npm run kill:sanity
npm run sanity
```

---

### Cache Corrompu Next.js

**Symptômes** :
- Erreurs bizarres après modification
- Hot reload ne fonctionne pas
- Build échoue sans raison

**Solution** :
```bash
npm run clean
npm run dev
```

**Si persiste** :
```bash
rm -rf .next node_modules/.cache
npm run dev
```

---

### Erreurs de Dépendances

**Erreur** :
```
npm ERR! Cannot find module 'xxx'
npm ERR! peer dependency warnings
```

**Solution** :
```bash
npm run clean:all
```

**Alternative** :
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 🔧 TypeScript

### Type Errors après Update

**Erreur** :
```
Type 'xxx' is not assignable to type 'yyy'
```

**Solution** :
```bash
# Restart TS server (VS Code)
Cmd+Shift+P → "TypeScript: Restart TS Server"

# Vérifier types
npm run typecheck
```

---

### Module Non Trouvé

**Erreur** :
```
Cannot find module '@/components/xxx'
```

**Vérifications** :
1. Vérifier `tsconfig.json` (paths)
2. Vérifier import exact
3. Restart TS server

```json
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

## 🖼️ Images

### Images Sanity Ne Chargent Pas

**Symptômes** :
- 404 sur images Sanity
- Placeholder LQIP uniquement

**Vérifications** :
1. **NEXT_PUBLIC_SANITY_PROJECT_ID** défini ?
```bash
echo $NEXT_PUBLIC_SANITY_PROJECT_ID
```

2. **Image asset existe** dans Sanity Studio ?

3. **Domain autorisé** dans `next.config.js` ?
```javascript
// next.config.js
module.exports = {
  images: {
    domains: ['cdn.sanity.io']
  }
}
```

---

### Next/Image Erreur Domain

**Erreur** :
```
Error: Invalid src prop on `next/image`, hostname "xxx" is not configured
```

**Solution** :
```javascript
// next.config.js
module.exports = {
  images: {
    domains: ['cdn.sanity.io', 'autre-domain.com']
  }
}
```

---

## 📡 API & Fetch

### Erreur CORS

**Erreur** :
```
Access to fetch at 'xxx' has been blocked by CORS policy
```

**Solution** : Utiliser API Route Next.js (pas de CORS).

```typescript
// ❌ Fetch direct (CORS)
fetch('https://external-api.com/data')

// ✅ Via API Route
fetch('/api/data')

// app/api/data/route.ts
export async function GET() {
  const data = await fetch('https://external-api.com/data')
  return Response.json(data)
}
```

---

### Sanity Fetch Timeout

**Erreur** :
```
Error: Request timeout after 30000ms
```

**Causes** :
1. Query trop lourde (populate profond)
2. Connexion lente
3. Dataset trop gros

**Solution** :
```typescript
// Optimiser query (projection)
const query = groq`
  *[_type == "post"] {
    _id,
    title,
    // ❌ Ne pas tout populate
    // author->
  }
`
```

---

## 🎨 Styles

### Tailwind Classes Ne Fonctionnent Pas

**Symptômes** :
- Classes Tailwind ignorées
- Pas de styles appliqués

**Vérifications** :
1. **Import globals.css** dans `app/layout.tsx` ?
```tsx
import '@/styles/globals.css'
```

2. **Fichier dans content** de `tailwind.config.ts` ?
```typescript
// tailwind.config.ts
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}'
  ]
}
```

3. **Restart dev server** :
```bash
npm run refresh
```

---

### Classes Dynamiques Purgées

**Problème** :
```tsx
// ❌ Ne fonctionne pas (purge)
<div className={`text-${color}-500`} />
```

**Solution** :
```tsx
// ✅ Classes complètes
const colorClasses = {
  red: 'text-red-500',
  blue: 'text-blue-500'
}

<div className={colorClasses[color]} />
```

**Safelist** :
```typescript
// tailwind.config.ts
module.exports = {
  safelist: [
    'text-red-500',
    'text-blue-500',
    'bg-purple-9'
  ]
}
```

---

## 🔐 Environnement

### Variables Non Définies

**Erreur** :
```
TypeError: Cannot read property 'xxx' of undefined
```

**Vérifications** :
1. `.env.local` existe ?
2. Variables préfixées `NEXT_PUBLIC_` si client-side ?
3. Restart dev server après modification ?

```bash
# Vérifier
cat .env.local

# Restart
npm run refresh
```

---

### reCAPTCHA Ne Charge Pas

**Symptômes** :
- reCAPTCHA invisible
- Erreur "Invalid site key"

**Vérifications** :
1. **NEXT_PUBLIC_RECAPTCHA_SITE_KEY** défini ?
2. **Site key valide** (Google reCAPTCHA) ?
3. **Domaine autorisé** dans configuration reCAPTCHA ?

---

## 🚀 Build & Deploy

### Build Échoue

**Erreur** :
```
Type error: xxx
```

**Solution** :
```bash
# Vérifier types
npm run typecheck

# Vérifier ESLint
npm run lint

# Build local
npm run build
```

---

### Vercel Deployment Failed

**Vérifications** :
1. **Environment variables** définies sur Vercel ?
2. **Build command** correct (`npm run build`) ?
3. **Node version** compatible (package.json engines) ?

```json
// package.json
{
  "engines": {
    "node": ">=18.0.0"
  }
}
```

---

## 🗺️ Leaflet (Maps)

### Leaflet TypeError window

**Erreur** :
```
ReferenceError: window is not defined
```

**Cause** : Leaflet incompatible SSR

**Solution** : Dynamic import
```tsx
const DynamicMap = dynamic(
  () => import('@/components/shared/Map'),
  { ssr: false }
)
```

---

### Icônes Marker Manquantes

**Symptômes** : Marqueurs sans icône

**Solution** :
```tsx
import L from 'leaflet'

delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/images/marker-icon-2x.png',
  iconUrl: '/images/marker-icon.png',
  shadowUrl: '/images/marker-shadow.png'
})
```

---

## 📝 Formulaires

### React Hook Form Validation

**Problème** : Validation ne fonctionne pas

**Vérifications** :
1. **zodResolver** configuré ?
```tsx
const { register, handleSubmit } = useForm({
  resolver: zodResolver(contactSchema)
})
```

2. **register** sur inputs ?
```tsx
<Input {...register('email')} />
```

---

### reCAPTCHA Submit Bloqué

**Problème** : Formulaire ne se soumet pas

**Debug** :
```tsx
const onSubmit = async (data) => {
  const token = await executeRecaptcha()
  console.log('reCAPTCHA token:', token) // Debug

  if (!token) {
    console.error('reCAPTCHA failed')
    return
  }

  // ... submit
}
```

---

## 🛠️ Outils de Debug

### Next.js Debug Mode

```bash
NODE_OPTIONS='--inspect' npm run dev
```

**Chrome** : `chrome://inspect`

---

### React DevTools

```bash
npm install -D react-devtools
npx react-devtools
```

---

### Lighthouse Audit

```bash
npx lighthouse https://localhost:3000 --view
```

---

## 📞 Support

### Logs Vercel

```bash
vercel logs <deployment-url>
```

---

### Logs Next.js

```bash
# Terminal où npm run dev
# Logs affichés automatiquement
```

---

### Logs Sanity

```bash
# Terminal où npm run sanity
# Logs affichés automatiquement
```

---

## 📚 Références

- **Next.js Troubleshooting** : https://nextjs.org/docs/messages
- **Vercel Troubleshooting** : https://vercel.com/docs/troubleshooting

---

**Dernière mise à jour** : 2025-12-03
