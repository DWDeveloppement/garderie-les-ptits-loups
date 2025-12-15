# Guide d'export des images pour le web

Guide pratique basé sur l'analyse des composants du site. Focus sur la simplicité : **largeur correcte + proportions conservées**.

---

## 📊 Analyse du site

Le site utilise ces types d'images :

### 1. Hero / Parallax
- **Composants** : `HeroGlobal.tsx`, `ParalaxImage.tsx`
- **Affichage** : Pleine largeur écran (`sizes='100vw'`)
- **Priority** : true (chargement immédiat)
- **Hauteur conteneur** : 600px (Hero) à 512px (Parallax xl)

### 2. Gallery
- **Composants** : `GalleryWithLightbox.tsx`, `LightboxCustom.tsx`
- **Breakpoints Sanity** : 400, 600, 800, 1200, 1600px (auto)
- **Lightbox** : 1920px (haute résolution)
- **Lazy loading** : Oui (below the fold)

### 3. Open Graph
- **Usage** : Partage Facebook, Twitter, LinkedIn
- **Format** : 1200×630px (standard fixe)

---

## 🎯 Recommandations d'export

### Principe de base
**Exporter uniquement la largeur, conserver les proportions, laisser la hauteur s'adapter.**

### Hero / Parallax (pleine largeur)

```
Largeur max : 2400px
Hauteur : Automatique (proportions conservées)
Format : WebP
Qualité : 85-90%
Poids cible : 300-500 KB
```

**Ratios recommandés :**
- 16:9 (paysage standard) → 2400×1350px
- 21:9 (cinématique) → 2400×1028px
- 3:2 (photo) → 2400×1600px

**Pourquoi 2400px ?**
- Couvre écrans Retina (1200px × 2)
- Au-delà (4K), aucun gain visible
- Balance parfaite qualité/poids

### Gallery - Photos horizontales

```
Largeur max : 1600px
Hauteur : Automatique
Format : WebP
Qualité : 85%
Poids cible : 150-300 KB
```

**Ratio typique :** 3:2 → 1600×1067px

**Pourquoi 1600px ?**
- Sanity génère les breakpoints (400-1600px)
- Lightbox utilise 1920px max (upscale acceptable)
- Poids optimisé pour galleries multi-images

### Gallery - Photos verticales

```
Largeur max : 1200px
Hauteur : Automatique
Format : WebP
Qualité : 85%
Poids cible : 150-300 KB
```

**Ratio typique :** 2:3 → 1200×1800px

**Pourquoi 1200px et pas 2400px ?**
- Hauteur viewport mobile/desktop ≠ 3600px
- Un portrait de 2400px donnerait 3600px de haut (inutile)
- 1200px suffit largement pour l'affichage

### Gallery - Photos carrées

```
Largeur max : 1600px
Hauteur : 1600px (automatique si carré parfait)
Format : WebP
Qualité : 85%
Poids cible : 150-300 KB
```

### Open Graph / SEO

```
Largeur : 1200px (FIXE)
Hauteur : 630px (FIXE)
Format : WebP ou JPEG
Qualité : 90%
Poids cible : 150-250 KB
```

**Important :** Ne pas conserver proportions, fixer manuellement 1200×630px.

---

## ⚙️ Workflow Photoshop

### Étape 1 : Redimensionner

```
Image → Taille de l'image

☑️ Conserver les proportions (cadenas verrouillé)
   Sauf pour Open Graph (déverrouiller)

Largeur : [selon type ci-dessus]
Hauteur : Automatique (ou 630px si OG)
Résolution : 72 pixels/pouce
Mode : RVB/8 bits
```

### Étape 2 : Exporter

```
Fichier → Exporter → Enregistrer pour le web (hérité)

Format : WebP
Qualité : 85% (standard) ou 90% (hero/lightbox)
Compression : Avec perte optimisé
```

**Si WebP non disponible :**
1. Exporter en JPEG qualité 85%
2. Convertir sur https://squoosh.app/

### Étape 3 : Vérifier

```bash
# Vérifier dimensions
identify image.webp

# Vérifier poids
ls -lh image.webp

# Doit afficher :
# hero-accueil.webp: 2400×1350px, ~400 KB
# galerie-jardin.webp: 1600×1067px, ~200 KB
```

---

## 🔍 Détails techniques

### Breakpoints générés par Sanity

```typescript
// sanity/helpers/galleryTransform.ts
export const GALLERY_BREAKPOINTS = [400, 600, 800, 1200, 1600]

// Génère automatiquement :
srcSet: [
  { src: '...?w=400', width: 400 },
  { src: '...?w=600', width: 600 },
  { src: '...?w=800', width: 800 },
  { src: '...?w=1200', width: 1200 },
  { src: '...?w=1600', width: 1600 },
]

// Lightbox haute résolution
srcHigh: '...?w=1920&q=90'
```

**Conséquence :** Inutile d'exporter plus large que nécessaire.

### Sizes attribute

```typescript
// Hero/Parallax
sizes='100vw'  // Pleine largeur toujours

// Gallery
sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
// Mobile : 100% / Tablet : 50% / Desktop : 33%
```

### Quality settings

```typescript
// Hero (above the fold)
quality: 90  // Haute qualité, première impression

// Gallery (below the fold)
quality: 85  // Optimisé, lazy loaded

// Lightbox
quality: 90  // Vue détaillée
```

---

## 📐 Pourquoi ces dimensions ?

### Limites écrans réels

| Écran | Résolution | Largeur CSS | Besoin réel |
|-------|-----------|-------------|-------------|
| Mobile | 750×1334 | 375px | 750px (2×) |
| Tablet | 1536×2048 | 768px | 1536px (2×) |
| Desktop HD | 1920×1080 | 1920px | 1920px |
| Desktop Retina | 2880×1800 | 1440px | 2880px |

**Conclusion :** 2400px couvre tous les cas avec marge.

### Viewport height considerations

```
Mobile portrait : ~667-900px de haut
Desktop : ~768-1080px de haut

Une image portrait 2400px de large en 2:3
→ 3600px de haut
→ Jamais visible en entier, scroll forcé
→ Fichier lourd inutilement

Solution : 1200px suffit (1800px de haut max)
```

---

## 💾 Impact performance

### Avant optimisation

```
Hero 4K (3840×2160px) JPEG 100% : ~3.5 MB
Gallery 20 images similaires : ~70 MB total
Temps chargement 3G : ~45 secondes
```

### Après optimisation

```
Hero 2400×1350px WebP 85% : ~400 KB
Gallery 20 images optimisées : ~4 MB total
Temps chargement 3G : ~2-3 secondes
```

**Gain : 90-95% de réduction**

---

## 🎨 Ratios d'aspect par usage

### Hero / Parallax

| Ratio | Dimensions | Usage |
|-------|-----------|--------|
| 16:9 | 2400×1350 | Paysages, vues larges |
| 21:9 | 2400×1028 | Effet cinématique |
| 3:2 | 2400×1600 | Photo standard |

### Gallery

| Orientation | Ratio | Dimensions | Usage |
|------------|-------|-----------|--------|
| Horizontal | 3:2 | 1600×1067 | Activités, groupes |
| Horizontal | 16:9 | 1600×900 | Vues panoramiques |
| Vertical | 2:3 | 1200×1800 | Portraits |
| Vertical | 4:5 | 1200×1500 | Instagram-style |
| Carré | 1:1 | 1600×1600 | Détails, objets |

**Les ratios sont libres** - le layout galerie s'adapte automatiquement.

---

## ✅ Checklist export

### Avant export
- [ ] Image redimensionnée (pas d'export 4K puis resize)
- [ ] Calques aplatis
- [ ] Métadonnées EXIF nettoyées
- [ ] Mode RVB (pas CMJN)

### Export
- [ ] Largeur correcte selon type
- [ ] Proportions conservées (sauf OG)
- [ ] Résolution 72 dpi
- [ ] Format WebP
- [ ] Qualité 85-90%

### Vérification
- [ ] Poids fichier acceptable
  - Hero : < 500 KB
  - Gallery : < 300 KB
  - OG : < 250 KB
- [ ] Dimensions correctes
- [ ] Qualité visuelle OK

---

## 🛠️ Outils complémentaires

### Conversion WebP
- **Squoosh** : https://squoosh.app/ (en ligne, gratuit)
- **ImageOptim** : https://imageoptim.com/ (Mac)
- **XnConvert** : https://www.xnview.com/ (Win/Mac/Linux)

### Batch processing
```bash
# Convertir toutes les images d'un dossier
for img in *.jpg; do
  cwebp -q 85 "$img" -o "${img%.jpg}.webp"
done
```

### Vérification
```bash
# Dimensions + poids
for img in *.webp; do
  echo "$img: $(identify -format '%wx%h' "$img") $(ls -lh "$img" | awk '{print $5}')"
done
```

---

## 📚 Références techniques

- **Composants analysés** :
  - `src/components/shared/HeroGlobal.tsx`
  - `src/components/shared/ParalaxImage.tsx`
  - `src/components/gallery/GalleryWithLightbox.tsx`
  - `sanity/helpers/galleryTransform.ts`
  - `sanity/helpers/imageProps.ts`

- **Breakpoints** : 400, 600, 800, 1200, 1600px (galeries)
- **Lightbox** : 1920px (haute résolution)
- **Sizes** : 100vw (hero) / responsive (gallery)

---

## 💡 Résumé en 3 points

1. **Largeur uniquement** : Exporter la bonne largeur, hauteur automatique
2. **2400px max** : Hero/Parallax - **1600px** horizontal - **1200px** vertical
3. **WebP 85%** : Format moderne, qualité optimale, poids réduit

**Guide client simplifié :** `/docs/client/GUIDE_EXPORT_IMAGES.md`
