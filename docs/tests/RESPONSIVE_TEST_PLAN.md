# 📱 Responsive Testing Plan - Gallery System

**Date :** 17 octobre 2025 - 15:05  
**Dernière mise à jour :** 17 octobre 2025 - 15:05  
**Branche :** `feat/design-system-cva`

---

## 🎯 Breakpoints à tester

D'après `react-photo-album` et Tailwind CSS :

| Device | Width | Breakpoint | Layout attendu |
|--------|-------|------------|----------------|
| **Mobile S** | 320px | - | 1 colonne |
| **Mobile M** | 375px | - | 1 colonne |
| **Mobile L** | 425px | - | 1 colonne |
| **Tablet** | 768px | `md:` | 2 colonnes |
| **Laptop** | 1024px | `lg:` | 2-3 colonnes |
| **Desktop** | 1440px | `xl:` | 3-4 colonnes |
| **4K** | 2560px | `2xl:` | 4-5 colonnes |

---

## ✅ Checklist de tests

### **Gallery (Layout Rows)**

#### **Mobile (320-425px)**
- [ ] Images s'affichent en 1 rangée
- [ ] Hauteur de rangée : ~280px
- [ ] Scroll vertical fluide
- [ ] Hover effects désactivés (tactile)
- [ ] Click ouvre le lightbox
- [ ] Spacing : 16px entre images
- [ ] Pas de débordement horizontal

#### **Tablet (768-1024px)**
- [ ] Images s'affichent en 2-3 par rangée
- [ ] Hauteur uniforme par rangée
- [ ] Hover effects fonctionnent
- [ ] Transitions fluides
- [ ] Grid responsive
- [ ] Touch gestures fonctionnent

#### **Desktop (1440px+)**
- [ ] Images s'affichent en 3-4 par rangée
- [ ] Hauteur optimale (280px)
- [ ] Hover scale + shadow
- [ ] Cursor pointer au survol
- [ ] Grid aligné et centré
- [ ] Max-width container : 1280px (7xl)

---

### **Lightbox**

#### **Mobile**
- [ ] Overlay plein écran
- [ ] Image centrée et contenue
- [ ] Swipe left/right pour naviguer
- [ ] Pull down pour fermer
- [ ] Captions lisibles (2 lignes max)
- [ ] Padding adapté (4rem vertical)
- [ ] Boutons prev/next accessibles
- [ ] Bouton close visible (top-right)

#### **Tablet**
- [ ] Image bien dimensionnée
- [ ] Navigation tactile + clavier
- [ ] Captions centrées
- [ ] Transitions fluides
- [ ] Orientation portrait/landscape
- [ ] Safe area respectée

#### **Desktop**
- [ ] Image maximale mais contenue
- [ ] Navigation clavier (← → Esc)
- [ ] Hover sur boutons
- [ ] Captions en bas
- [ ] Backdrop blur (optionnel)
- [ ] Multi-monitors support

---

### **Hero Section**

#### **Mobile**
- [ ] Height : 50vh (min 400px, max 600px)
- [ ] Image cover (remplit la zone)
- [ ] Texte lisible (gradient overlay)
- [ ] Titre responsive (text-4xl → text-6xl)
- [ ] Description centrée
- [ ] Padding latéral : 1rem

#### **Tablet**
- [ ] Height : 50vh
- [ ] Titre : text-5xl
- [ ] Description : max-w-2xl
- [ ] Image bien cadrée (hotspot)

#### **Desktop**
- [ ] Height : 50vh (max 600px)
- [ ] Titre : text-6xl
- [ ] Gradient overlay visible
- [ ] Image haute résolution

---

### **Linked Spaces (Cards)**

#### **Mobile**
- [ ] Grid : 1 colonne
- [ ] Card height auto
- [ ] Image : aspect-video (16:9)
- [ ] Texte lisible
- [ ] Touch target : min 44x44px

#### **Tablet**
- [ ] Grid : 2 colonnes (md:grid-cols-2)
- [ ] Gap : 1.5rem (gap-6)
- [ ] Hover effects fonctionnent

#### **Desktop**
- [ ] Grid : 3 colonnes (lg:grid-cols-3)
- [ ] Cards alignées
- [ ] Hover : scale + border-primary
- [ ] Transitions smooth

---

### **Content Section (Portable Text)**

#### **Mobile**
- [ ] Max-width : prose (65ch)
- [ ] Font-size : 1rem (16px)
- [ ] Line-height : 1.75
- [ ] Margins adaptés
- [ ] Pas de débordement

#### **Tablet/Desktop**
- [ ] Max-width : prose-lg
- [ ] Font-size : 1.125rem (18px)
- [ ] Centré (mx-auto)
- [ ] Lisibilité optimale

---

### **DevJsonViewer**

#### **Mobile**
- [ ] Panel visible en bas
- [ ] Hauteur : max-h-[40vh]
- [ ] Scroll JSON fonctionnel
- [ ] Boutons accessibles
- [ ] Pas de débordement

#### **Desktop**
- [ ] Panel fixe en bas
- [ ] Width : full
- [ ] Toggle Show/Hide
- [ ] Copy JSON fonctionne

---

## 🛠️ Comment tester

### **1. DevTools Responsive Mode**

```
1. Ouvrir DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Sélectionner device preset
4. Tester interactions
```

### **2. Devices réels**

```
iPhone : Safari iOS
Android : Chrome Android
iPad : Safari iPadOS
Desktop : Chrome/Firefox/Safari
```

### **3. Lighthouse**

```bash
# Mobile
npm run build
npm run start
# Lighthouse → Mobile mode

# Desktop
# Lighthouse → Desktop mode
```

---

## 📊 Résultats attendus

### **Gallery**

| Device | Colonnes | Hauteur rangée | Spacing |
|--------|----------|----------------|---------|
| Mobile | 1 | auto | 16px |
| Tablet | 2-3 | 280px | 16px |
| Desktop | 3-4 | 280px | 16px |

### **Lightbox**

| Device | Padding | Caption lignes | Navigation |
|--------|---------|----------------|------------|
| Mobile | 4rem V, 1rem H | 2 | Swipe + Buttons |
| Tablet | 4rem V, 1rem H | 2 | Touch + Keyboard |
| Desktop | 4rem V, 1rem H | 2 | Keyboard + Mouse |

---

## ✅ Validation

Pour chaque breakpoint :

1. ✅ Pas de débordement horizontal
2. ✅ Images chargent correctement
3. ✅ Texte lisible
4. ✅ Boutons cliquables (min 44x44px)
5. ✅ Transitions fluides
6. ✅ Pas d'erreurs console
7. ✅ Performance acceptable

---

## 🎯 Prochains tests

Après validation responsive :
- Accessibility testing (keyboard, screen readers)
- Performance testing (Lighthouse)
- SSR/Hydration validation
- Cross-browser testing

---

**Test URL :** `http://localhost:3000/la-structure/nurserie`

**DevTools :** F12 → Toggle device toolbar (Ctrl+Shift+M)

