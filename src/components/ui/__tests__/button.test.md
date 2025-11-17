# Tests d'Accessibilité - Boutons

## 🎯 Tests Manuels à Effectuer

### **1. Tests Visuels**

#### **Contraste des Couleurs**
- [ ] **Primary** - Vérifier le contraste purple-9 sur blanc
- [ ] **Secondary** - Vérifier le contraste orange-9 sur blanc  
- [ ] **Outline** - Vérifier le contraste purple-7 bordure
- [ ] **Ghost** - Vérifier le contraste purple-11 texte
- [ ] **Destructive** - Vérifier le contraste red-9 sur blanc
- [ ] **Link** - Vérifier le contraste purple-9 lien

#### **États Visuels**
- [ ] **Hover** - Changement visible au survol
- [ ] **Focus** - Ring de focus visible (2px minimum)
- [ ] **Active** - État pressé visible (scale-95)
- [ ] **Disabled** - Opacité 50% et pointer-events-none
- [ ] **Loading** - Cursor wait et disabled

### **2. Tests Clavier**

#### **Navigation**
- [ ] **Tab** - Navigation séquentielle entre boutons
- [ ] **Shift+Tab** - Navigation inverse
- [ ] **Enter** - Activation du bouton
- [ ] **Space** - Activation du bouton
- [ ] **Escape** - Pas d'effet (normal)

#### **Focus Management**
- [ ] **Focus visible** - Ring de focus visible
- [ ] **Focus order** - Ordre logique de navigation
- [ ] **Focus trap** - Pas de piège de focus

### **3. Tests Lecteurs d'Écran**

#### **Annonces**
- [ ] **Label** - Texte du bouton annoncé
- [ ] **État** - État (disabled, loading) annoncé
- [ ] **Rôle** - Rôle "button" annoncé
- [ ] **Description** - Pas de description par défaut

#### **Navigation**
- [ ] **Découverte** - Bouton trouvé par navigation
- [ ] **Activation** - Action déclenchée
- [ ] **Feedback** - Pas de retour automatique

### **4. Tests Responsive**

#### **Tailles**
- [ ] **Touch targets** - Minimum 44px (sm: 32px, md: 36px, lg: 40px, xl: 48px)
- [ ] **Espacement** - Espacement suffisant entre boutons
- [ ] **Lisibilité** - Texte lisible sur mobile

#### **Breakpoints**
- [ ] **Mobile (320px)** - Boutons adaptés
- [ ] **Tablet (768px)** - Boutons adaptés
- [ ] **Desktop (1200px)** - Boutons adaptés

## 🧪 Tests Automatisés (Futur)

### **Configuration Requise**
```bash
# Installer les dépendances de test
npm install --save-dev @testing-library/react @testing-library/jest-dom jest-axe @types/jest

# Configurer Jest
# Configurer Testing Library
# Configurer axe-core
```

### **Tests à Implémenter**
- Tests unitaires des variants
- Tests des états
- Tests d'accessibilité avec axe-core
- Tests d'interactions clavier
- Tests de contraste automatique

## 📊 Métriques d'Accessibilité

### **Contraste**
- **AA** - Ratio minimum 4.5:1
- **AAA** - Ratio minimum 7:1 (recommandé)

### **Touch Targets**
- **Minimum** - 44px x 44px
- **Recommandé** - 48px x 48px

### **Focus Indicators**
- **Visibilité** - Ring de focus visible
- **Contraste** - Contraste suffisant
- **Taille** - Ring de 2px minimum

## 🚀 Plan d'Action

### **Phase 1 : Tests Manuels**
1. Ouvrir `/example` dans le navigateur
2. Tester la navigation clavier
3. Tester avec un lecteur d'écran
4. Vérifier le contraste des couleurs
5. Tester sur différents appareils

### **Phase 2 : Tests Automatisés (Futur)**
1. Installer les dépendances de test
2. Configurer l'environnement de test
3. Écrire les tests unitaires
4. Intégrer axe-core
5. Automatiser les tests

### **Phase 3 : Optimisation**
1. Corriger les problèmes identifiés
2. Améliorer les indicateurs
3. Optimiser les annonces
4. Valider les corrections

## 📝 Rapport de Test

### **Résultats Attendus**
- ✅ **100%** - Tests manuels passent
- ✅ **AA** - Niveau d'accessibilité AA
- ✅ **0** - Erreurs d'accessibilité
- ✅ **0** - Avertissements d'accessibilité

### **Métriques de Performance**
- **Temps de chargement** - < 100ms
- **Temps de réponse** - < 16ms
- **Rendu** - 60fps

## 🎯 Critères de Succès

### **Accessibilité**
- ✅ Navigation clavier complète
- ✅ Support lecteurs d'écran
- ✅ Contraste suffisant
- ✅ Touch targets appropriés

### **Performance**
- ✅ Rendu fluide
- ✅ Pas de jank
- ✅ Chargement rapide

### **UX**
- ✅ Feedback visuel clair
- ✅ États cohérents
- ✅ Interactions intuitives
- ✅ Design responsive
