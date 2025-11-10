# Guide Typographique

> **Note :** Migration vers Tailwind CSS standard effectuée. Le système Fluid sera réintégré en CI/CD.

## 🎯 Système de font-size

### **Font de base (Body)**

- **Font**: Open Sans
- **Classe**: `text-base`
- **Usage**: Corps de texte, paragraphes

### **Titres (Display)**

- **Font**: Chelsea Market
- **Classes**: `text-xl font-display`, `text-2xl font-display`, `text-3xl font-display`, `text-4xl font-display`
- **Usage**: Titres, headings

## 📐 Échelle typographique Tailwind

| Classe                  | Taille fixe | Usage            | Font           |
| ----------------------- | ----------- | ---------------- | -------------- |
| `text-xs`               | 12px        | Labels, captions | Open Sans      |
| `text-sm`               | 14px        | Texte secondaire | Open Sans      |
| `text-base`             | 16px        | Corps de texte   | Open Sans      |
| `text-lg`               | 18px        | Sous-titres      | Open Sans      |
| `text-xl`               | 20px        | Titres h4        | Open Sans      |
| `text-xl font-display`  | 20px        | Titres h4        | Chelsea Market |
| `text-2xl`              | 24px        | Titres h3        | Open Sans      |
| `text-2xl font-display` | 24px        | Titres h3        | Chelsea Market |
| `text-3xl`              | 30px        | Titres h2        | Open Sans      |
| `text-3xl font-display` | 30px        | Titres h2        | Chelsea Market |
| `text-4xl`              | 36px        | Titres h1        | Open Sans      |
| `text-4xl font-display` | 36px        | Titres h1        | Chelsea Market |

## 🎨 Usage recommandé

### **Titres principaux**

```html
<h1 class="text-4xl font-bold font-display">Titre Principal</h1>
<h2 class="text-3xl font-semibold font-display">Sous-titre</h2>
<h3 class="text-2xl font-medium font-display">Titre de section</h3>
```

### **Corps de texte**

```html
<p class="text-base">Texte courant</p>
<p class="text-sm">Texte secondaire</p>
<span class="text-xs">Label</span>
```

### **Combinaisons**

```html
<!-- Titre avec espacement -->
<h1 class="text-4xl font-bold font-display mb-6">Titre</h1>

<!-- Texte avec hauteur de ligne -->
<p class="text-base leading-normal">Paragraphe</p>
<p class="text-base leading-relaxed">Paragraphe aéré</p>
```

## 🔧 Classes disponibles

### **Font-size (Tailwind standard)**

- `text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`, `text-3xl`, `text-4xl`

### **Font families**

- `font-sans` (Open Sans)
- `font-display` (Chelsea Market)
- `font-mono` (Geist Mono)

### **Hauteurs de ligne (Tailwind standard)**

- `leading-tight` (1.25)
- `leading-normal` (1.5) - Par défaut
- `leading-relaxed` (1.625)
- `leading-loose` (2)

## 📚 Références

- **Configuration fonts** → `src/styles/fonts.css`
- **Système Fluid (désactivé)** → `src/styles/fluid/` (réintégration prévue en CI/CD)
- **Documentation migration** → `docs/FLUID-TO-TAILWIND-MIGRATION.md`
