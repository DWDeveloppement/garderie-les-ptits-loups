# 🐛 Composants de Debug

Ce dossier contient des composants utiles pour le développement et le debugging.

## 📊 QueriesLog.tsx

Composant de logging pour les queries Sanity CMS. Affiche les résultats des queries dans un panneau flottant en bas à droite.

### 🚀 Utilisation

#### 1. Import simple
```tsx
import { QueriesLogWrapper } from '@/components/debug/QueriesLog'

export default function MyPage() {
  return (
    <QueriesLogWrapper isEnabled={true}>
      {/* Votre contenu */}
    </QueriesLogWrapper>
  )
}
```

#### 2. Avec le hook useSanityQueries
```tsx
import { useSanityQueries } from '@/hooks/useSanityQueries'

export function MyComponent() {
  const { getPrices, getSubsidies } = useSanityQueries()
  
  const handleClick = async () => {
    await getPrices() // Automatiquement loggé
    await getSubsidies() // Automatiquement loggé
  }
  
  return <button onClick={handleClick}>Test</button>
}
```

#### 3. Logging manuel
```tsx
import { useQueriesLog } from '@/components/debug/QueriesLog'

export function MyComponent() {
  const { logQuery } = useQueriesLog()
  
  const handleClick = async () => {
    const startTime = Date.now()
    try {
      const data = await someApiCall()
      logQuery('myApiCall', data, Date.now() - startTime)
    } catch (error) {
      logQuery('myApiCall', null, Date.now() - startTime, error.message)
    }
  }
  
  return <button onClick={handleClick}>Test</button>
}
```

### ⚙️ Configuration

#### Désactiver le logging
```tsx
// Pour désactiver complètement
<QueriesLogWrapper isEnabled={false}>
  {/* Votre contenu */}
</QueriesLogWrapper>

// Ou simplement commenter l'import
// import { QueriesLogWrapper } from '@/components/debug/QueriesLog'
```

#### Personnaliser l'affichage
```tsx
<QueriesLog 
  queries={queries} 
  isEnabled={true}
  className="bottom-8 right-8" // Position personnalisée
/>
```

### 🎯 Fonctionnalités

- ✅ **Logging automatique** des queries Sanity
- ✅ **Affichage des erreurs** avec stack trace
- ✅ **Mesure du temps** d'exécution
- ✅ **Copie JSON** en un clic
- ✅ **Historique** des 10 dernières queries
- ✅ **Interface compacte** et non-intrusive
- ✅ **Désactivation facile** pour la production

### 🗂️ Structure des logs

Chaque query loggée contient :
- **Nom** de la query
- **Données** retournées (JSON)
- **Timestamp** d'exécution
- **Durée** en millisecondes
- **Erreur** (si applicable)

### 🚀 Exemples d'utilisation

#### Page de test
```tsx
// src/app/test-sanity/page.tsx
import { TestSanityClient } from './TestSanityClient'

export default function TestSanityPage() {
  return (
    <div>
      <h1>Test Sanity CMS</h1>
      <TestSanityClient />
    </div>
  )
}
```

#### Page avec données Sanity
```tsx
// src/app/horaires-tarifs/page-with-sanity.tsx
import { HorairesTarifsClient } from './HorairesTarifsClient'

export default function HorairesTarifsPage() {
  return (
    <div>
      <HorairesTarifsClient />
    </div>
  )
}
```

### 🔧 Pour la production

1. **Désactiver le logging** :
   ```tsx
   <QueriesLogWrapper isEnabled={false}>
   ```

2. **Ou supprimer l'import** :
   ```tsx
   // import { QueriesLogWrapper } from '@/components/debug/QueriesLog'
   ```

3. **Ou utiliser une variable d'environnement** :
   ```tsx
   <QueriesLogWrapper isEnabled={process.env.NODE_ENV === 'development'}>
   ```

### 📝 Notes

- Le composant est **non-intrusif** et n'affecte pas le rendu principal
- Les logs sont **stockés en mémoire** et se perdent au rechargement
- **Performance** : Le logging ajoute ~1-2ms par query
- **Sécurité** : Les données sensibles ne sont pas exposées côté client
