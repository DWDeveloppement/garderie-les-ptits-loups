# Features - Cartes Interactives

## 📊 Vue d'ensemble

Carte interactive avec Leaflet et OpenStreetMap, affichant l'emplacement de la garderie.

**Stack** : Leaflet · OpenStreetMap · react-leaflet · Dynamic Import

---

## 🎯 Fonctionnalités

- **Carte interactive** : Zoom, déplacement
- **Marqueur personnalisé** : Localisation de la garderie
- **Popup** : Informations au clic
- **Responsive** : Adapté mobile/desktop
- **SSR-safe** : Dynamic import (Leaflet incompatible SSR)

---

## 🗺️ Migration Google Maps → Leaflet

### Avant (Google Maps)

```tsx
// ❌ Payant après 28 000 chargements/mois
import GoogleMapReact from 'google-map-react'

<GoogleMapReact
  bootstrapURLKeys={{ key: process.env.GOOGLE_MAPS_API_KEY }}
  center={{ lat: location.lat, lng: location.lng }}
  zoom={15}
/>
```

### Après (Leaflet + OSM)

```tsx
// ✅ Gratuit, open-source
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

<MapContainer center={[location.lat, location.lng]} zoom={15}>
  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
  <Marker position={[location.lat, location.lng]}>
    <Popup>{location.name}</Popup>
  </Marker>
</MapContainer>
```

**Avantages** :
- Gratuit (pas de quota)
- Open-source
- Performant
- Customisable

---

## 🧩 Composants

### `MapSection.tsx`

**Chemin** : `src/components/pages/contact/MapSection.tsx`

```tsx
'use client'

import dynamic from 'next/dynamic'
import type { MapLocation } from '@/types/map'

// Dynamic import (Leaflet incompatible SSR)
const DynamicMap = dynamic(
  () => import('@/components/shared/Map').then((mod) => mod.DynamicMap),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-96 bg-gray-200 animate-pulse rounded-lg" />
    )
  }
)

type MapSectionProps = {
  location: MapLocation
}

export function MapSection({ location }: MapSectionProps) {
  return (
    <section className="py-16">
      <div className="container">
        <h2 className="text-3xl font-bold mb-8">Nous Trouver</h2>

        <DynamicMap
          location={location}
          zoom={15}
          showMarker
          showControls
          className="w-full h-96 rounded-lg shadow-lg"
        />

        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Adresse</h3>
            <p>{location.address}</p>
            <p>{location.postalCode} {location.city}</p>
            {location.country && <p>{location.country}</p>}
          </div>

          <div>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-9 hover:underline"
            >
              Obtenir l'itinéraire →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
```

---

### `DynamicMap.tsx`

**Chemin** : `src/components/shared/Map.tsx`

```tsx
'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import type { DynamicMapProps } from '@/types/map'

// Fix icône par défaut Leaflet (bug Next.js)
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/images/marker-icon-2x.png',
  iconUrl: '/images/marker-icon.png',
  shadowUrl: '/images/marker-shadow.png'
})

export function DynamicMap({
  location,
  zoom = 15,
  showMarker = true,
  showControls = true,
  interactive = true,
  className
}: DynamicMapProps) {
  return (
    <MapContainer
      center={[location.lat, location.lng]}
      zoom={zoom}
      scrollWheelZoom={interactive}
      dragging={interactive}
      zoomControl={showControls}
      className={className}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {showMarker && (
        <Marker position={[location.lat, location.lng]}>
          <Popup>
            <div className="text-center">
              <p className="font-semibold">{location.name}</p>
              <p className="text-sm">{location.address}</p>
              <p className="text-sm">{location.postalCode} {location.city}</p>
            </div>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  )
}
```

---

## 🎨 Configuration Leaflet

### Installation

```bash
npm install leaflet react-leaflet
npm install -D @types/leaflet
```

### CSS Import

```tsx
// app/layout.tsx ou globals.css
import 'leaflet/dist/leaflet.css'
```

---

### Fix Icône Marker

**Problème** : Icônes manquantes avec Next.js (webpack).

**Solution** : Copier icônes dans `public/images/` et configurer.

```tsx
import L from 'leaflet'

delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/images/marker-icon-2x.png',
  iconUrl: '/images/marker-icon.png',
  shadowUrl: '/images/marker-shadow.png'
})
```

**Fichiers** :
- `public/images/marker-icon.png`
- `public/images/marker-icon-2x.png`
- `public/images/marker-shadow.png`

---

## 🔧 Hooks Personnalisés

### `useMaps.ts`

**Chemin** : `src/hooks/components/useMaps.ts`

```tsx
import { useState, useEffect } from 'react'
import type { MapLocation } from '@/types/map'

export function useMapLocation(contactInfo: SanityContactInfo): MapLocation {
  return {
    name: contactInfo.name,
    address: contactInfo.address,
    postalCode: contactInfo.postalCode,
    city: contactInfo.city,
    country: contactInfo.country,
    lat: contactInfo.latitude,
    lng: contactInfo.longitude
  }
}

export function useDynamicMap() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return { isClient }
}
```

---

## 📐 Types

**Fichier** : `src/types/map.ts`

```typescript
export type MapLocation = {
  name: string
  address: string
  postalCode: string
  city: string
  country?: string
  lat: number
  lng: number
}

export type DynamicMapProps = {
  location: MapLocation
  className?: string
  zoom?: number
  showMarker?: boolean
  showControls?: boolean
  interactive?: boolean
  zIndex?: number
  onError?: (error: string) => void
}

export type StaticMapProps = MapProps & {
  zoom?: number
  mapType?: 'roadmap' | 'satellite' | 'hybrid' | 'terrain' // Legacy (non utilisé)
  style?: 'default' | 'light' | 'dark' // Legacy (non utilisé)
}
```

**Note** : `mapType` et `style` conservés pour compatibilité (migration Google Maps).

---

## 🎨 Customisation

### Marqueur Personnalisé

```tsx
import L from 'leaflet'

const customIcon = L.icon({
  iconUrl: '/images/custom-marker.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
})

<Marker position={[lat, lng]} icon={customIcon}>
  <Popup>Garderie Les P'tits Loups</Popup>
</Marker>
```

---

### Style de Carte

**OpenStreetMap** (par défaut) :
```tsx
<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
```

**CartoDB (light)** :
```tsx
<TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
```

**CartoDB (dark)** :
```tsx
<TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
```

---

### Contrôles Personnalisés

```tsx
import { ZoomControl } from 'react-leaflet'

<MapContainer zoomControl={false}>
  <ZoomControl position="topright" />
</MapContainer>
```

---

## 🚀 Performance

### Dynamic Import

**Problème** : Leaflet incompatible SSR (window requis).

**Solution** : Dynamic import avec `ssr: false`.

```tsx
const DynamicMap = dynamic(
  () => import('@/components/shared/Map').then((mod) => mod.DynamicMap),
  { ssr: false }
)
```

---

### Lazy Loading

Charger la carte uniquement quand visible (Intersection Observer).

```tsx
import { useInView } from 'react-intersection-observer'

export function MapSection({ location }: MapSectionProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <div ref={ref}>
      {inView && <DynamicMap location={location} />}
    </div>
  )
}
```

---

## 🎯 Accessibilité

### ARIA Labels

```tsx
<MapContainer
  aria-label="Carte interactive montrant l'emplacement de la garderie"
  role="application"
>
  {/* ... */}
</MapContainer>
```

---

### Lien Alternatif

```tsx
<a
  href={`https://www.google.com/maps?q=${location.lat},${location.lng}`}
  target="_blank"
  rel="noopener noreferrer"
  className="sr-only focus:not-sr-only"
>
  Ouvrir dans Google Maps
</a>
```

---

## 📚 Références

- **Leaflet** : https://leafletjs.com/
- **react-leaflet** : https://react-leaflet.js.org/
- **OpenStreetMap** : https://www.openstreetmap.org/

---

**Dernière mise à jour** : 2025-12-03
**Version** : 1.0.0
