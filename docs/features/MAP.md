# 🗺️ Composants de Carte - Documentation

## 📋 Vue d'ensemble

Deux composants de carte modulaires et réutilisables ont été créés pour le projet :

- **`StaticMap`** : Carte statique avec image locale (WebP personnalisée)
- **`DynamicMap`** : Carte interactive avec Leaflet + OpenStreetMap

## 🏗️ Architecture

### Séparation Logique/UX
- **Hooks** : Contiennent toute la logique métier (`useMaps.ts` avec 3 fonctions exportées)
- **Composants** : Se concentrent uniquement sur l'affichage et l'interaction utilisateur
- **Types** : Définitions TypeScript centralisées dans `src/types/map.ts`

### Structure des fichiers
```
src/
├── types/
│   └── map.ts                 # Types TypeScript
├── hooks/
│   └── useMaps.ts             # Tous les hooks de cartes (3 fonctions exportées)
├── components/
│   ├── ui/
│   │   ├── StaticMap.tsx      # Composant carte statique
│   │   └── DynamicMap.tsx     # Composant carte dynamique
│   └── pages/contact/
│       └── MapSection.tsx     # Section de carte pour la page contact
```

## 🎯 Utilisation

### 1. StaticMap (Carte Statique)

```tsx
import { StaticMap } from '@/components/ui/StaticMap'

const location = {
  name: "Garderie Les P'tits Loups",
  address: "123 Rue de la Paix",
  postalCode: "1000",
  city: "Lausanne",
  country: "Suisse",
  lat: 46.541742,
  lng: 6.636635
}

<StaticMap 
  location={location}
  height={400}
  zoom={15}
  mapType="roadmap" // roadmap, satellite, hybrid, terrain
  style="default"   // default, light, dark
/>
```

**Avantages :**
- ✅ Pas de JavaScript côté client
- ✅ Chargement rapide
- ✅ Compatible avec le SSR
- ✅ 100% gratuit (image locale)
- ✅ Aucune clé API requise
- ✅ Pin personnalisé avec design cohérent
- ✅ Contrôle total sur l'affichage

**Inconvénients :**
- ❌ Pas d'interactivité
- ❌ Image statique (pas de zoom/déplacement)

### 2. DynamicMap (Carte Interactive)

```tsx
import { DynamicMap } from '@/components/ui/DynamicMap'

<DynamicMap 
  location={location}
  height={400}
  zoom={15}
  showMarker={true}
  showControls={true}
  interactive={true}
  zIndex={1}
/>
```

**Avantages :**
- ✅ Entièrement interactif (zoom, déplacement)
- ✅ 100% gratuit (OpenStreetMap)
- ✅ Aucune clé API requise
- ✅ Marqueur personnalisable
- ✅ Popup d'informations

**Inconvénients :**
- ❌ JavaScript côté client requis
- ❌ Taille de bundle plus importante
- ❌ Chargement asynchrone

### 3. MapSection (Section de Carte)

```tsx
import { MapSection } from '@/components/pages/contact/MapSection'

<MapSection 
  mapType="dynamic" // ou "static"
  location={location}
/>
```

**Utilisation directe dans la page contact :**
```tsx
// Dans src/app/contact/page.tsx
<MapSection /> // Utilise la configuration par défaut
```

## ⚙️ Configuration

### Variables d'environnement

**Aucune variable d'environnement requise !** 🎉

- **StaticMap** : Utilise une image locale (`/carte.webp`) avec pin personnalisé
- **DynamicMap** : Utilise OpenStreetMap (100% gratuit, sans clé API)

### Personnalisation des styles

Les composants utilisent la palette de couleurs du projet :
- **Orange** : Bordures, backgrounds, éléments neutres
- **Purple** : Accents, boutons d'action
- **Gray** : Textes, informations (Purple-1 si le gris se voit pas)

## 🔧 Fonctionnalités

### Actions disponibles
- **Apple Plans** : Ouverture native sur iOS
- **Google Maps** : Ouverture dans le navigateur/app
- **Copier l'adresse** : Copie dans le presse-papiers
- **Itinéraire intelligent** : Détection automatique de la plateforme

### Accessibilité
- **ARIA labels** : Tous les boutons et liens
- **Navigation clavier** : Compatible Tab/Enter
- **Lecteurs d'écran** : Support complet
- **Contraste** : Respect des standards WCAG

### Responsive
- **Mobile** : Un boutton est affiché sur la BottomBarWithAutoHide
- **Desktop** : Actions en ligne sous la carte
- **Tablet** : Adaptation automatique

## 🚀 Réutilisabilité

### Pour d'autres projets

1. **Copier les fichiers** :
   - `src/types/map.ts`
   - `src/hooks/useMaps.ts`
   - `src/components/shared/maps/StaticMap.tsx`
   - `src/components/shared/maps/DynamicMap.tsx`

2. **Installer les dépendances** :
   ```bash
   npm install leaflet @types/leaflet
   ```

3. **Adapter les styles** :
   - Modifier les classes Tailwind dans les composants
   - Adapter la palette de couleurs

### Exemple d'utilisation simple

```tsx
// Carte statique simple
<StaticMap location={myLocation} />

// Carte dynamique avec options
<DynamicMap 
  location={myLocation}
  showMarker={false}
  interactive={false}
/>
```

## 🐛 Dépannage

### Carte statique ne s'affiche pas
- Vérifiez que le fichier `/public/carte.webp` existe
- Vérifiez que l'image est accessible via l'URL `/carte.webp`
- Vérifiez les dimensions de l'image (recommandé: 1920x1080 ou format 16:9)

### Problèmes de positionnement du pin
- Le pin est positionné à `top: 45%, left: 52%` par défaut
- Ajustez ces valeurs dans le composant si nécessaire
- Utilisez des pourcentages pour un positionnement responsive

### Coordonnées GPS
- **Coordonnées utilisées** : 46.541742, 6.636635 (OpenStreetMap)
- **Précision** : Coordonnées Google Maps pour une localisation exacte.
- **OpenStreetMap** : Affiche correctement la position avec ces coordonnées

### Carte dynamique ne se charge pas
- Vérifiez que Leaflet est installé
- Vérifiez la console pour les erreurs JavaScript
- Assurez-vous que le composant est côté client (`'use client'`)

### Erreurs de types TypeScript
- Vérifiez que `@types/leaflet` est installé
- Vérifiez l'import des types dans `src/types/map.ts`

## 📈 Performance

### StaticMap
- **Bundle size** : ~0 KB (juste une image)
- **First Load** : Immédiat
- **Interactivité** : Aucune

### DynamicMap
- **Bundle size** : ~50 KB (Leaflet)
- **First Load** : ~200ms (chargement asynchrone)
- **Interactivité** : Complète

## 🎨 Personnalisation avancée

### Styles de carte statique
```tsx
<StaticMap 
  location={location}
  height={500} // Hauteur personnalisée
  // Note: zoom, mapType et style sont gardés pour compatibilité mais non utilisés
/>
```

### Pin personnalisé
Le pin est automatiquement ajouté sur la carte avec :
- **Couleur** : Purple (#8B5CF6) - cohérent avec la charte graphique
- **Design** : SVG vectoriel avec ombre portée
- **Position** : Positionné sur l'emplacement de la garderie (top: 45%, left: 52%)
- **Responsive** : Taille adaptée (24x32px sur mobile, 32x40px sur desktop)
- **Accessibilité** : `aria-hidden="true"` pour les lecteurs d'écran

### Configuration de la carte dynamique
```tsx
<DynamicMap 
  location={location}
  zoom={10}
  showControls={false}
  interactive={false}
  zIndex={1}
/>
```

### Contrôle du z-index
```tsx
// Z-index par défaut (1) - évite les conflits avec d'autres éléments
<DynamicMap zIndex={1} />

// Z-index élevé si nécessaire
<DynamicMap zIndex={999} />
```

---

**🎉 Les composants sont prêts à être utilisés !** 

**Avantages de la solution OpenStreetMap :**
- 🆓 **100% gratuit** - Aucune clé API requise
- 🌍 **Open source** - Données libres et communautaires
- 🚀 **Simple** - Pas de configuration complexe
- 🔒 **Privé** - Aucun tracking Google

Choisissez `StaticMap` pour la performance ou `DynamicMap` pour l'interactivité.
