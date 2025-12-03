# 📱 Navigation Mobile - Documentation

## 📋 Vue d'ensemble

Système de navigation mobile moderne avec barre inférieure et bouton "Back to top" pour la Garderie Les P'tits Loups.

## 🏗️ Architecture

### Composants créés
- **`BottomBar`** : Barre inférieure avec 3 actions principales
- **`BackToTop`** : Bouton flottant pour retour en haut
- **`BottomBarWithAutoHide`** : Version avec masquage automatique au scroll
- **`MobileNavigation`** : Composant principal qui combine tout

### Hooks utilitaires
- **`useScroll`** : Contient `useScrollDirection` et `useScrollToTop`

## 🎯 Fonctionnalités

### Barre inférieure mobile
- **3 actions principales** :
  - 📞 **Appeler** : Lien direct vers le téléphone
  - ✉️ **Écrire** : Lien direct vers l'email
  - 🗺️ **Itinéraire** : Directions intelligentes (iOS/Android/Desktop)

### Bouton "Back to top"
- **Apparition contextuelle** : Seulement après 300px de scroll
- **Direction intelligente** : Visible uniquement lors du scroll vers le haut
- **Animation fluide** : Scroll smooth vers le haut
- **Position fixe** : En bas à droite, au-dessus de la barre

### Comportement intelligent
- **Auto-hide** : La barre se cache en scroll down, réapparaît en scroll up
- **Direction intelligente** : Le bouton "Back to top" n'apparaît qu'en scroll vers le haut
- **Responsive** : Visible uniquement sur mobile (< 768px), masquée sur desktop
- **Détection d'écran** : Utilise `useWindowSize` pour détecter la taille d'écran
- **Accessibilité** : ARIA labels, focus visible, cibles tactiles ≥ 44px

## 🎨 Design

### Palette de couleurs
- **Orange** : Couleur principale (bordures, backgrounds)
- **Purple** : Couleur d'accent (hover, focus, bouton "Back to top")
- **Transparence** : Backdrop blur pour un effet moderne

### Interactions
- **Hover** : Changement de couleur vers purple
- **Active** : Scale 98% pour feedback tactile
- **Focus** : Ring purple pour accessibilité

## ⚙️ Configuration

### Intégration dans le layout
```tsx
// src/app/layout.tsx
import { MobileNavigation } from "@/components/ui/MobileNavigation"

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <Header />
        <main className="pb-20 md:pb-0">{children}</main>
        <Footer />
        <MobileNavigation />
      </body>
    </html>
  )
}
```

### Personnalisation
```tsx
<MobileNavigation 
  location={customLocation}
  phoneNumber="+41 21 123 45 67"
  email="contact@garderie.ch"
  autoHide={true}
  showBackToTop={true}
/>
```

## 📱 Comportement mobile

### Barre inférieure
- **Position** : Fixe en bas de l'écran (mobile uniquement)
- **Largeur** : Centrée, max-width screen-sm
- **Padding** : pb-20 sur le main pour éviter le chevauchement
- **Z-index** : 40 (au-dessus du contenu, sous les modales)
- **Responsive** : Masquée automatiquement sur desktop (≥ 768px)

### Bouton "Back to top"
- **Position** : Fixe, bottom-20 right-4
- **Z-index** : 50 (au-dessus de tout)
- **Seuil** : Apparaît après 300px de scroll
- **Direction** : Visible seulement en scroll vers le haut
- **Animation** : Transition smooth

### Auto-hide
- **Seuil** : 8px de différence pour déclencher
- **Animation** : translate-y-full (sort de l'écran)
- **Durée** : 300ms de transition

## ♿ Accessibilité

### Standards respectés
- **Cibles tactiles** : ≥ 44×44px
- **Contraste** : ≥ 4.5:1 pour le texte
- **Focus visible** : Ring purple sur focus
- **ARIA labels** : Descriptions claires pour chaque action
- **Navigation clavier** : Compatible Tab/Enter

### Lecteurs d'écran
- **aria-label** : "Actions principales" pour la barre
- **Descriptions** : "Appeler Garderie Les P'tits Loups", etc.
- **États** : Annonce des changements d'état

## 🔧 Personnalisation avancée

### Modifier les actions
```tsx
// Dans BottomBar.tsx, ajouter une nouvelle action
<li className="flex-1">
  <a href="/contact" className="...">
    <MessageCircle className="h-6 w-6" />
    <span>Chat</span>
  </a>
</li>
```

### Changer le seuil de scroll
```tsx
// Dans useScroll.ts
const { visible, scrollToTop } = useScrollToTop(500) // 500px au lieu de 300px
```

### Désactiver l'auto-hide
```tsx
<MobileNavigation autoHide={false} />
```

## 📊 Performance

### Optimisations
- **Event listeners** : Passive pour le scroll
- **Throttling** : Seuil de 8px pour éviter les calculs excessifs
- **Cleanup** : Suppression des listeners au unmount
- **CSS** : will-change-transform pour les animations

### Bundle size
- **Hooks** : ~1.5KB (useScroll consolidé)
- **Composants** : ~5KB (BottomBar + BackToTop)
- **Total** : ~6.5KB (très léger)

## 🧪 Test

### Scénarios de test
1. **Scroll vers le bas** : La barre doit disparaître
2. **Scroll vers le haut** : La barre doit réapparaître
3. **Scroll > 300px** : Le bouton "Back to top" doit apparaître
4. **Clic sur "Back to top"** : Scroll smooth vers le haut
5. **Actions de la barre** : Téléphone, email, itinéraire fonctionnent

### Tests d'accessibilité
- **Navigation clavier** : Tab entre les éléments
- **Lecteur d'écran** : Annonces correctes
- **Contraste** : Vérification des ratios
- **Cibles tactiles** : Taille suffisante sur mobile

## 🚀 Déploiement

### Variables d'environnement
Aucune variable requise - tout est configuré en dur avec des valeurs par défaut.

### Compatibilité
- **Navigateurs** : Tous les navigateurs modernes
- **Mobile** : iOS Safari, Chrome Mobile, etc.
- **Desktop** : Barre masquée automatiquement (≥ 768px)
- **Responsive** : Détection automatique via `useWindowSize`

---

**🎉 La navigation mobile est prête !** Elle s'intègre automatiquement dans le layout principal et offre une expérience utilisateur moderne et accessible.
