# Comparaison des systèmes de Line-Height

## 📊 Vue d'ensemble

Ce document compare le système de `leading` (line-height) personnalisé avec les utilitaires Tailwind CSS par défaut.

---

## 1️⃣ Système Fluid (Personnalisé)

### Structure

**Ratios contextuels :**

```css
--ratio-sm: 1.2   /* Petit texte (xs, sm) */
--ratio-base: 1.4 /* Texte courant (base, lg) */
--ratio-lg: 1.6   /* Grands titres (xl, 2xl, 3xl, 4xl) */
```

**Variables CSS :**

```css
/* Exemple pour leading-fl-5 */
--fl-leading-5: calc(var(--fl-lh-0) * var(--zoom-factor, 1))
--fl-lh-0: calc(var(--size-0) * var(--ratio-base))  /* 16px * 1.4 = 22.4px */
```

**Classes disponibles :**

- `leading-fl-3` → Ratio 1.2 (petit texte)
- `leading-fl-4` → Ratio 1.2 (petit texte)
- `leading-fl-5` → Ratio 1.4 (texte normal) ✅ **Par défaut body**
- `leading-fl-6` → Ratio 1.4 (texte normal)
- `leading-fl-7` → Ratio 1.6 (titres)
- `leading-fl-8` → Ratio 1.6 (titres)
- `leading-fl-9` → Ratio 1.6 (titres)
- `leading-fl-10` → Ratio 1.6 (titres)

**Valeurs calculées (min → max):**

- `leading-fl-3`: ~13.33px → ~15.36px (ratio 1.2)
- `leading-fl-4`: ~16px → ~19.2px (ratio 1.2)
- `leading-fl-5`: ~22.4px → ~28px (ratio 1.4) ✅
- `leading-fl-6`: ~26.88px → ~35px (ratio 1.4)
- `leading-fl-7`: ~36.86px → ~50px (ratio 1.6)
- `leading-fl-8`: ~44.24px → ~62.5px (ratio 1.6)
- `leading-fl-9`: ~53.09px → ~78.125px (ratio 1.6)
- `leading-fl-10`: ~63.70px → ~97.66px (ratio 1.6)

### Caractéristiques

✅ **Avantages :**

1. **Fluide et responsive** : S'adapte automatiquement à la taille d'écran
2. **Ratios contextuels** : Adaptés selon le type de contenu (texte petit/normal/titre)
3. **Cohérence typographique** : Aligné avec le système de typographie fluide
4. **Zoom factor** : Support du facteur de zoom pour l'accessibilité
5. **Intégration native** : Déjà intégré dans `.text-fl-*` (taille + leading)

❌ **Inconvénients :**

1. **Complexité** : Plus de variables CSS à maintenir
2. **Taille du CSS** : Plus de classes générées (impact sur le bundle)
3. **Courbe d'apprentissage** : Nécessite de comprendre le système de ratios
4. **Pas de valeurs fixes** : Impossible d'avoir une valeur exacte (ex: 1.5)
5. **Dépendance** : Requiert les variables `--size-*` et `--ratio-*`

---

## 2️⃣ Système Tailwind CSS (Par défaut)

### Structure

**Valeurs fixes :**

```css
leading-none:    line-height: 1
leading-tight:   line-height: 1.25
leading-snug:    line-height: 1.375
leading-normal:  line-height: 1.5      ✅ Par défaut
leading-relaxed: line-height: 1.625
leading-loose:   line-height: 2
```

**Classes numériques (v3.4+) :**

```css
leading-3:  line-height: 0.75rem    /* 12px */
leading-4:  line-height: 1rem        /* 16px */
leading-5:  line-height: 1.25rem     /* 20px */
leading-6:  line-height: 1.5rem      /* 24px */
leading-7:  line-height: 1.75rem    /* 28px */
leading-8:  line-height: 2rem        /* 32px */
leading-9:  line-height: 2.25rem    /* 36px */
leading-10: line-height: 2.5rem     /* 40px */
```

### Utilisation actuelle dans le projet

**Classes Tailwind utilisées :**

- `leading-tight` → 1.25 (utilisé dans `HeroSection.tsx`)
- `leading-relaxed` → 1.625 (utilisé dans 9 fichiers)

**Classes Fluid utilisées :**

- `leading-fl-3` à `leading-fl-10` (définies mais utilisation limitée)

### Caractéristiques

✅ **Avantages :**

1. **Simplicité** : Valeurs fixes et prévisibles
2. **Standard** : Utilisé par toute la communauté Tailwind
3. **Performance** : Moins de calculs CSS
4. **Flexibilité** : Valeurs sémantiques (`tight`, `relaxed`) et numériques
5. **Documentation** : Bien documenté et connu

❌ **Inconvénients :**

1. **Pas responsive** : Valeurs fixes, ne s'adaptent pas à l'écran
2. **Pas de ratio contextuel** : Même ratio pour tous les types de texte
3. **Incohérence** : Ne suit pas le système de typographie fluide
4. **Pas de zoom factor** : Pas de support pour l'accessibilité (zoom)
5. **Valeurs absolues** : Les classes numériques sont en `rem` (pas de clamp)

---

## 3️⃣ Comparaison détaillée

### Ratio par type de contenu

| Type de contenu              | Fluid System | Tailwind CSS | Différence          |
| ---------------------------- | ------------ | ------------ | ------------------- |
| **Petit texte** (xs, sm)     | 1.2          | 1.5 (normal) | ✅ Fluid plus serré |
| **Texte courant** (base, lg) | 1.4          | 1.5 (normal) | ≈ Similaire         |
| **Titres** (xl, 2xl, 3xl)    | 1.6          | 1.5 (normal) | ✅ Fluid plus aéré  |
| **Display**                  | 1.2          | 1.5 (normal) | ✅ Fluid plus serré |

### Responsivité

| Critère              | Fluid System   | Tailwind CSS    |
| -------------------- | -------------- | --------------- |
| **Adaptation écran** | ✅ Oui (clamp) | ❌ Non (fixe)   |
| **Mobile → Desktop** | ✅ 16px → 20px | ❌ 16px (fixe)  |
| **Zoom factor**      | ✅ Supporté    | ❌ Non supporté |

### Performance

| Critère           | Fluid System       | Tailwind CSS    |
| ----------------- | ------------------ | --------------- |
| **Calculs CSS**   | ⚠️ Plus (calc)     | ✅ Moins (fixe) |
| **Taille du CSS** | ⚠️ Plus volumineux | ✅ Plus léger   |
| **Parsing**       | ⚠️ Plus lent       | ✅ Plus rapide  |

### Maintenabilité

| Critère                    | Fluid System         | Tailwind CSS |
| -------------------------- | -------------------- | ------------ |
| **Complexité**             | ⚠️ Plus complexe     | ✅ Simple    |
| **Documentation**          | ⚠️ Projet spécifique | ✅ Standard  |
| **Courbe d'apprentissage** | ⚠️ Plus élevée       | ✅ Faible    |

---

## 4️⃣ Analyse d'utilisation actuelle

### Classes Tailwind utilisées

```
leading-tight:   1 occurrence (HeroSection.tsx)
leading-relaxed: 9 occurrences
  - HeroSection.tsx
  - LinkedSpacesSection.tsx
  - StructureSection.tsx
  - ParalaxImage.tsx
  - RichTextRenderer.tsx
  - RichTextQuote.tsx
  - Testimonals.tsx
  - Footer.tsx
  - HeroGlobal.tsx
```

### Classes Fluid utilisées

```
leading-fl-*: 0 occurrence directe dans className
```

**Note :** Les classes `leading-fl-*` sont utilisées **implicitement** via :

- `.text-fl-xs` → `line-height: var(--fl-leading-3)`
- `.text-fl-sm` → `line-height: var(--fl-leading-4)`
- `.text-fl-base` → `line-height: var(--fl-leading-5)`
- etc.

---

## 5️⃣ Recommandations

### Option 1 : Garder les deux systèmes (Hybride) ✅ Recommandé

**Stratégie :**

- **Fluid** pour les tailles de texte (`.text-fl-*` avec leading intégré)
- **Tailwind** pour les ajustements fins (`leading-relaxed`, `leading-tight`)

**Avantages :**

- Flexibilité maximale
- Cohérence pour les textes standards
- Ajustements fins possibles

**Inconvénients :**

- Deux systèmes à maintenir
- Risque de confusion

### Option 2 : Migrer vers Fluid uniquement

**Stratégie :**

- Remplacer `leading-relaxed` par `leading-fl-6` (ratio 1.4, proche de 1.625)
- Remplacer `leading-tight` par `leading-fl-4` (ratio 1.2, proche de 1.25)

**Avantages :**

- Cohérence totale avec le système fluide
- Responsive automatique
- Support du zoom factor

**Inconvénients :**

- Migration nécessaire (9 fichiers)
- Perte de flexibilité (valeurs fixes)
- Valeurs légèrement différentes

### Option 3 : Migrer vers Tailwind uniquement

**Stratégie :**

- Supprimer le système Fluid
- Utiliser uniquement `leading-*` de Tailwind

**Avantages :**

- Simplicité
- Standard
- Performance

**Inconvénients :**

- Perte de la responsivité fluide
- Incohérence avec le système de typographie
- Pas de support du zoom factor

---

## 6️⃣ Comparaison des ratios

### Valeurs calculées (texte base = 16px)

| Classe         | Fluid (ratio 1.4) | Tailwind `leading-normal` | Différence |
| -------------- | ----------------- | ------------------------- | ---------- |
| `text-fl-base` | 22.4px            | 24px                      | -1.6px     |
| `text-fl-lg`   | 26.88px           | 28.8px                    | -1.92px    |
| `text-fl-xl`   | 50px (ratio 1.6)  | 36.48px                   | +13.52px   |

### Valeurs calculées (texte base = 20px)

| Classe         | Fluid (ratio 1.4)  | Tailwind `leading-normal` | Différence |
| -------------- | ------------------ | ------------------------- | ---------- |
| `text-fl-base` | 28px               | 30px                      | -2px       |
| `text-fl-lg`   | 35px               | 37.5px                    | -2.5px     |
| `text-fl-xl`   | 62.5px (ratio 1.6) | 46.875px                  | +15.625px  |

**Conclusion :** Les ratios Fluid sont **plus serrés** pour le texte normal mais **plus aérés** pour les titres.

---

## 7️⃣ Questions pour décision

1. **Voulez-vous garder la responsivité fluide ?**
   - Oui → Fluid System
   - Non → Tailwind CSS

2. **Voulez-vous des ratios contextuels ?**
   - Oui → Fluid System (1.2/1.4/1.6)
   - Non → Tailwind CSS (1.5 fixe)

3. **Voulez-vous supporter le zoom factor ?**
   - Oui → Fluid System
   - Non → Tailwind CSS

4. **Priorité performance ou fonctionnalité ?**
   - Performance → Tailwind CSS
   - Fonctionnalité → Fluid System

5. **Voulez-vous une cohérence totale ?**
   - Oui → Fluid System uniquement
   - Non → Hybride (recommandé)

---

## 8️⃣ Prochaines étapes suggérées

1. **Analyser l'impact** : Tester les valeurs Fluid vs Tailwind sur le rendu visuel
2. **Décider de la stratégie** : Hybride, Fluid uniquement, ou Tailwind uniquement
3. **Migration si nécessaire** : Remplacer `leading-relaxed` par `leading-fl-6` (si migration Fluid)
4. **Documentation** : Documenter le choix dans le guide typographique
5. **Optimisation CSS** : Inclure dans le script de nettoyage CSS si Fluid choisi

---

## 📚 Références

- **Fluid System** : `src/styles/fluid/typography.css`
- **Tailwind CSS** : https://tailwindcss.com/docs/line-height
- **Utopia.fyi** : https://utopia.fyi/type/calculator
