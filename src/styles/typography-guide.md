# Guide Typographique

## 🎯 Système de font-size

### **Font de base (Body)**
- **Font**: Open Sans
- **Classe**: `text-fl-base`
- **Usage**: Corps de texte, paragraphes

### **Titres (Display)**
- **Font**: Chelsea Market
- **Classes**: `text-fl-xl font-display`, `text-fl-2xl font-display`, `text-fl-3xl font-display`, `text-fl-4xl font-display`
- **Usage**: Titres, headings

## 📐 Échelle typographique

| Classe | Taille mobile | Taille desktop | Usage | Font |
|--------|---------------|----------------|-------|------|
| `text-fl-xs` | 11.11px | 12.8px | Labels, captions | Open Sans |
| `text-fl-sm` | 13.33px | 16px | Texte secondaire | Open Sans |
| `text-fl-base` | 16px | 20px | Corps de texte | Open Sans |
| `text-fl-lg` | 19.2px | 25px | Sous-titres | Open Sans |
| `text-fl-xl` | 23.04px | 31.25px | Titres h4 | Open Sans |
| `text-fl-xl font-display` | 23.04px | 31.25px | Titres h4 | Chelsea Market |
| `text-fl-2xl` | 27.65px | 39.06px | Titres h3 | Open Sans |
| `text-fl-2xl font-display` | 27.65px | 39.06px | Titres h3 | Chelsea Market |
| `text-fl-3xl` | 33.18px | 48.83px | Titres h2 | Open Sans |
| `text-fl-3xl font-display` | 33.18px | 48.83px | Titres h2 | Chelsea Market |
| `text-fl-4xl` | 39.81px | 61.04px | Titres h1 | Open Sans |
| `text-fl-4xl font-display` | 39.81px | 61.04px | Titres h1 | Chelsea Market |

## 🎨 Usage recommandé

### **Titres principaux**
```html
<h1 class="text-fl-4xl font-bold font-display">Titre Principal</h1>
<h2 class="text-fl-3xl font-semibold font-display">Sous-titre</h2>
<h3 class="text-fl-2xl font-medium font-display">Titre de section</h3>
```

### **Corps de texte**
```html
<p class="text-fl-base">Texte courant</p>
<p class="text-fl-sm">Texte secondaire</p>
<span class="text-fl-xs">Label</span>
```

### **Combinaisons**
```html
<!-- Titre avec espacement fluide -->
<h1 class="text-fl-4xl font-bold font-display mb-fl-md">Titre</h1>

<!-- Texte avec hauteur de ligne fluide -->
<p class="text-fl-base leading-fl-6">Paragraphe</p>
```

## 🔧 Classes disponibles

### **Font-size fluides**
- `text-fl-xs`, `text-fl-sm`, `text-fl-base`, `text-fl-lg`, `text-fl-xl`, `text-fl-2xl`, `text-fl-3xl`, `text-fl-4xl`

### **Font families**
- `font-sans` (Open Sans)
- `font-display` (Chelsea Market)
- `font-mono` (Geist Mono)

### **Hauteurs de ligne fluides**
- `leading-fl-3`, `leading-fl-4`, `leading-fl-5`, `leading-fl-6`, `leading-fl-7`, `leading-fl-8`, `leading-fl-9`, `leading-fl-10`

## 📚 Références

- **Variables source** → `src/styles/fluid-variables.css`
- **Classes** → `src/styles/fluid-selected.css`
- **Configuration fonts** → `src/styles/fonts.css`