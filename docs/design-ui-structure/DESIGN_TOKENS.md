# Système de Design Tokens - Shadcn UI

## Architecture des Tokens

Ce système de tokens mappe les couleurs Radix vers les conventions Shadcn UI pour créer un thème cohérent et maintenable.

## Hiérarchie des Couleurs

### 🟣 PRIMARY (Purple)
**Usage** : Actions principales, liens, éléments interactifs primaires

- `--primary` → `--purple-9` : Couleur solide principale
- `--primary-foreground` → `--contrast-text` : Texte sur fond primary
- `--primary-hover` → `--purple-10` : État hover
- `--primary-subtle` → `--purple-4` : Fond subtil (surface variant)
- `--primary-border` → `--purple-8` : Bordure (outline variant)

**Échelle Radix utilisée** :
```
purple-1, purple-2  → Backgrounds
purple-3, purple-4  → Interactive components (hover, surface)
purple-5, purple-6  → Enhanced contrast
purple-7, purple-8  → Borders & separators
purple-9, purple-10 → Solid colors (main, hover)
purple-11, purple-12 → Text colors (accessible)
```

### 🟠 SECONDARY (Orange)
**Usage** : Actions secondaires, accents, call-to-actions alternatifs

- `--secondary` → `--orange-9` : Couleur solide secondaire
- `--secondary-foreground` → `--contrast-text` : Texte sur fond secondary
- `--secondary-hover` → `--orange-10` : État hover
- `--secondary-subtle` → `--orange-4` : Fond subtil (surface variant)
- `--secondary-border` → `--orange-8` : Bordure (outline variant)

### 🔴 DESTRUCTIVE (Red)
**Usage** : Actions destructives, erreurs, alertes critiques

- `--destructive` → `--red-9` : Couleur d'erreur principale
- `--destructive-subtle` → `--red-4` : Fond subtil pour les erreurs
- `--destructive-border` → `--red-8` : Bordure pour les alertes d'erreur

### 🟢 SUCCESS (Green)
**Usage** : Confirmations, succès, états positifs

- `--success` → `--green-9` : Couleur de succès
- `--success-subtle` → `--green-4` : Fond subtil pour succès
- `--success-border` → `--green-8` : Bordure pour confirmations

### 🟡 WARNING (Amber)
**Usage** : Avertissements, attention requise

- `--warning` → `--amber-9` : Couleur d'avertissement
- `--warning-subtle` → `--amber-4` : Fond subtil pour warnings
- `--warning-border` → `--amber-8` : Bordure pour avertissements

### 🔵 INFO (Blue)
**Usage** : Informations, notes, conseils

- `--info` → `--blue-9` : Couleur d'information
- `--info-subtle` → `--blue-4` : Fond subtil pour infos
- `--info-border` → `--blue-8` : Bordure pour notes

## Variants de Composants

### Solid Variant
Fond plein avec la couleur principale, texte en contraste

**Classes CSS** :
```css
/* Primary Solid */
bg-primary text-primary-foreground hover:bg-primary-hover

/* Secondary Solid */
bg-secondary text-secondary-foreground hover:bg-secondary-hover
```

### Surface Variant
Fond subtil avec bordure, texte en couleur accessible

**Classes CSS** :
```css
/* Primary Surface */
bg-primary-subtle text-purple-11 border border-primary-border hover:bg-primary-subtle-hover

/* Secondary Surface */
bg-secondary-subtle text-orange-11 border border-secondary-border hover:bg-secondary-subtle-hover
```

### Outline Variant
Fond transparent, bordure visible, texte en couleur

**Classes CSS** :
```css
/* Primary Outline */
bg-transparent text-purple-11 border border-primary-border hover:bg-primary-subtle

/* Secondary Outline */
bg-transparent text-orange-11 border border-secondary-border hover:bg-secondary-subtle
```

### Ghost Variant
Fond transparent, pas de bordure, hover subtil

**Classes CSS** :
```css
/* Ghost Primary */
bg-transparent text-purple-11 hover:bg-purple-4

/* Ghost Secondary */
bg-transparent text-orange-11 hover:bg-orange-4
```

## Backgrounds & Surfaces

```css
--background       → purple-2   /* Fond principal de l'app */
--card             → purple-1   /* Fond des cartes */
--muted            → purple-3   /* Zones de contenu secondaire */
--accent           → purple-4   /* Badges, highlights */
--surface          → purple-surface /* Avec transparence */
--surface-secondary → orange-surface /* Surface secondaire */
```

## Borders & Inputs

```css
--border → purple-8  /* Bordures par défaut */
--input  → purple-8  /* Bordures des inputs */
--ring   → purple-9  /* Focus ring */
```

## Utilisation dans les Composants

### Exemple : Button Component

```tsx
// Solid Primary
<Button className="bg-primary text-primary-foreground hover:bg-primary-hover">
  Click me
</Button>

// Surface Primary
<Button className="bg-primary-subtle text-purple-11 border border-primary-border hover:bg-primary-subtle-hover">
  Click me
</Button>

// Outline Primary
<Button className="bg-transparent text-purple-11 border border-primary-border hover:bg-primary-subtle">
  Click me
</Button>

// Ghost Primary
<Button className="bg-transparent text-purple-11 hover:bg-purple-4">
  Click me
</Button>
```

### Exemple : Alert Component

```tsx
// Success Alert
<Alert className="bg-success-subtle text-green-11 border border-success-border">
  <AlertDescription>Operation successful!</AlertDescription>
</Alert>

// Error Alert
<Alert className="bg-destructive-subtle text-red-11 border border-destructive-border">
  <AlertDescription>An error occurred</AlertDescription>
</Alert>
```

## Convention de Nommage

Tous les tokens suivent la convention Shadcn :
- `--{role}` : Couleur principale du rôle
- `--{role}-foreground` : Texte sur ce fond
- `--{role}-hover` : État hover
- `--{role}-subtle` : Fond subtil (surface)
- `--{role}-border` : Bordure (outline)

## Tailwind CSS v4 Compatibility

Ce système est compatible avec Tailwind CSS v4 grâce à :
1. La directive `@theme colors` dans palette.css
2. Les tokens mappés en variables CSS natives
3. L'utilisation de `hsl()` / `oklch()` pour les couleurs modernes

## Prochaines Étapes

1. ✅ Tokens de base mappés
2. ⏳ Création des composants Shadcn avec variants
3. ⏳ Documentation d'utilisation par composant
4. ⏳ Storybook / Playground pour tester les variants
