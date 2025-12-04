# ♿ Accessibility Testing Plan

**Date de création :** 17 octobre 2024
**Dernière mise à jour :** 2025-12-03
**Standard :** WCAG 2.1 Level AA

---

## 🎯 Objectifs

- ✅ Navigation clavier complète
- ✅ Screen reader compatible
- ✅ Focus management
- ✅ ARIA labels appropriés
- ✅ Contrast ratios conformes
- ✅ Touch targets accessibles

---

## ⌨️ Keyboard Navigation

### **Gallery**

| Touche | Action attendue | Statut |
|--------|-----------------|--------|
| `Tab` | Focus sur première image | À tester |
| `Shift+Tab` | Focus arrière | À tester |
| `Enter` / `Space` | Ouvrir lightbox | À tester |
| `Arrow Keys` | Naviguer entre images (optionnel) | À implémenter |

**Code actuel :**
```tsx
<button
  type="button"
  aria-label={`Ouvrir ${alt} en grand`}
  onClick={...}
>
  <Image ... />
</button>
```

✅ **Sémantique correcte** (button, pas div)  
✅ **ARIA label** présent

### **Lightbox**

| Touche | Action attendue | Statut |
|--------|-----------------|--------|
| `←` | Image précédente | ✅ Built-in |
| `→` | Image suivante | ✅ Built-in |
| `Esc` | Fermer lightbox | ✅ Built-in |
| `Home` | Première image | ✅ Built-in |
| `End` | Dernière image | ✅ Built-in |
| `Tab` | Naviguer boutons | ✅ Built-in |

**Fourni par :** `yet-another-react-lightbox`  
**Statut :** ✅ **Fully accessible**

### **DevJsonViewer**

| Touche | Action attendue | Statut |
|--------|-----------------|--------|
| `Tab` | Focus boutons Copy/Show | ✅ |
| `Enter` | Activer bouton | ✅ |
| `Esc` | Fermer panel (optionnel) | - |

---

## 🔊 Screen Reader Support

### **Gallery Images**

```tsx
<button aria-label="Ouvrir Entrée Nurserie en grand">
  <Image alt="Entrée Nurserie" ... />
</button>
```

**Annonce attendue :**
> "Bouton, Ouvrir Entrée Nurserie en grand"

**Tests :**
- [ ] NVDA (Windows)
- [ ] JAWS (Windows)
- [ ] VoiceOver (macOS/iOS)
- [ ] TalkBack (Android)

### **Lightbox**

```tsx
<Lightbox
  role="dialog"
  aria-modal="true"
  aria-label="Galerie d'images"
>
```

**Fourni par :** yet-another-react-lightbox (auto)

**Annonce attendue :**
> "Dialog, Galerie d'images, Image 1 sur 10"

### **Navigation Buttons**

```tsx
<button aria-label="Image précédente">
  <Icon name="chevronLeft" aria-hidden />
</button>
```

✅ **Icon décoratif** (`aria-hidden`)  
✅ **Label explicite** sur le bouton

---

## 🎨 Contrast Ratios

### **Textes**

| Élément | Fond | Texte | Ratio | WCAG AA |
|---------|------|-------|-------|---------|
| Hero title | Gradient noir/transparent | Blanc | > 7:1 | ✅ |
| Hero description | Gradient | Blanc | > 4.5:1 | ✅ |
| Caption lightbox | Noir 90% | Blanc | 15:1 | ✅ |
| Card title | Background | Foreground | À vérifier | - |

**Target WCAG AA :**
- Texte normal : > 4.5:1
- Texte large : > 3:1

### **Boutons**

| Bouton | État | Contrast | Statut |
|--------|------|----------|--------|
| Gallery item | Default | Border visible | ✅ |
| Gallery item | Hover | Shadow visible | ✅ |
| Gallery item | Focus | Ring 2px primary | ✅ |
| Lightbox prev/next | Ghost | White/Black 50% | À vérifier |
| Lightbox close | Ghost | White/Black 50% | À vérifier |

---

## 👆 Touch Targets

### **Minimum size : 44x44px** (WCAG 2.1)

| Élément | Size actuel | Statut |
|---------|-------------|--------|
| Gallery image button | Variable (image size) | ✅ > 44px |
| Lightbox prev | 48px (size-12, lg) | ✅ |
| Lightbox next | 48px | ✅ |
| Lightbox close | 40px (size-10, md) | ⚠️ Limite (augmenter à lg?) |
| DevJsonViewer buttons | Auto | À vérifier |

**Recommandation :** Augmenter close button à `size: 'lg'` (48px)

---

## 🎯 Focus Management

### **Focus Visible**

Toutes les interactive elements doivent avoir un **focus ring visible**.

**Code actuel :**
```tsx
className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
```

✅ **Bonne pratique** : `focus-visible` (pas `focus`)

### **Focus Trap (Lightbox)**

Quand le lightbox est ouvert :
- ✅ Focus piégé dans le dialog
- ✅ Tab ne sort pas du lightbox
- ✅ Retour au trigger au close

**Fourni par :** yet-another-react-lightbox (auto)

### **Skip Links** (optionnel)

Pour navigation rapide :

```tsx
<a href="#main-content" className="sr-only focus:not-sr-only">
  Aller au contenu principal
</a>
```

---

## 🖼️ Images Accessibility

### **Alt Text**

```tsx
// Gallery
alt={image.alt || label || `Image ${index + 1}`}

// Hero
alt={title}  // Ex: "La Nurserie"

// Linked Spaces
alt={space.title}  // Ex: "Salle de Jeux"
```

✅ **Fallbacks** si alt manquant  
✅ **Descriptions significatives**

### **Decorative Images**

```tsx
// Icons dans boutons
<Icon name="chevronLeft" aria-hidden />
```

✅ **aria-hidden** sur icônes décoratives  
✅ **Label sur le bouton** parent

---

## 🧪 Tests Manuels

### **Checklist Keyboard**

1. [ ] Charger `/la-structure/nurserie`
2. [ ] Appuyer `Tab` plusieurs fois
3. [ ] Vérifier focus ring visible
4. [ ] Focus sur première image gallery
5. [ ] `Enter` ouvre le lightbox
6. [ ] `←` `→` navigue dans lightbox
7. [ ] `Esc` ferme le lightbox
8. [ ] Focus retourne à l'image cliquée

### **Checklist Screen Reader**

1. [ ] Activer VoiceOver (Cmd+F5 sur Mac)
2. [ ] Naviguer avec `Ctrl+Option+→`
3. [ ] Vérifier annonces appropriées
4. [ ] Tester gallery images
5. [ ] Tester lightbox
6. [ ] Vérifier landmarks (nav, main, footer)

### **Checklist Touch**

1. [ ] Touch targets > 44x44px
2. [ ] Spacing entre boutons > 8px
3. [ ] Hover states sur touch (tap)
4. [ ] Double-tap zoom désactivé (si nécessaire)

---

## 🔧 Outils de test

### **Automatiques**

```bash
# Axe DevTools
npm install -D @axe-core/react

# Lighthouse CI
npx lighthouse http://localhost:3000/la-structure/nurserie --view

# Pa11y
npm install -D pa11y
npx pa11y http://localhost:3000/la-structure/nurserie
```

### **Extensions navigateur**

- **axe DevTools** (Chrome/Firefox)
- **WAVE** (Chrome/Firefox)
- **Lighthouse** (Chrome DevTools)

### **Screen Readers**

- **VoiceOver** (macOS/iOS) : Cmd+F5
- **NVDA** (Windows) : Gratuit
- **JAWS** (Windows) : Payant
- **TalkBack** (Android) : Intégré

---

## 📋 Checklist WCAG 2.1 AA

### **Perceivable**

- [ ] 1.1.1 : Alt text sur toutes les images
- [ ] 1.3.1 : Structure sémantique (headings)
- [ ] 1.4.3 : Contrast ratio > 4.5:1
- [ ] 1.4.11 : UI components contrast > 3:1

### **Operable**

- [ ] 2.1.1 : Toutes les fonctions au clavier
- [ ] 2.1.2 : Pas de piège clavier
- [ ] 2.4.3 : Focus order logique
- [ ] 2.4.7 : Focus visible

### **Understandable**

- [ ] 3.1.1 : Langue de la page (lang="fr")
- [ ] 3.2.1 : Pas de changement au focus
- [ ] 3.3.1 : Erreurs identifiées
- [ ] 3.3.2 : Labels fournis

### **Robust**

- [ ] 4.1.1 : HTML valide
- [ ] 4.1.2 : Name, Role, Value
- [ ] 4.1.3 : Status messages

---

## 🎯 Score cible

```
Accessibility : 100/100
Keyboard : 100%
Screen Reader : 100%
Touch : 100%
WCAG 2.1 AA : Conforme
```

---

**Statut actuel :** ✅ **Bases solides** (yet-another-react-lightbox est accessible)

**Tests requis :** Validation manuelle + audits automatiques

