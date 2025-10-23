# Fonts Configuration

## 🎨 Fonts utilisées

### **Font principale (Texte de base)**
- **Font**: Open Sans
- **Fallback**: Arial, sans-serif
- **Usage**: Corps de texte, paragraphes, contenu général
- **Classes**: `font-sans`

### **Font Display (Titres)**
- **Font**: Chelsea Market
- **Fallback**: cursive
- **Usage**: Titres, headings, éléments d'affichage
- **Classes**: `font-display`

### **Font Monospace (Code)**
- **Font**: Geist Mono
- **Fallback**: ui-monospace, 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace
- **Usage**: Code, techniques, monospace
- **Classes**: `font-mono`

## 📐 Classes disponibles

```html
<!-- Font principale -->
<p class="font-sans">Texte en Open Sans</p>

<!-- Font Display -->
<h1 class="font-display">Titre en Chelsea Market</h1>

<!-- Font Monospace -->
<code class="font-mono">Code en Geist Mono</code>
```

## 🔧 Configuration

### **Google Fonts import**
```html
<link 
  href="https://fonts.googleapis.com/css2?family=Chelsea+Market&family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap" 
  rel="stylesheet" 
/>
```

### **Variables CSS**
```css
:root {
  --font-sans: 'Open Sans', Arial, sans-serif;
  --font-display: 'Chelsea Market', cursive;
  --font-mono: var(--font-geist-mono), ui-monospace, 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
}
```

## 🎯 Usage recommandé

- **Titres h1, h2, h3** → `font-display` (Chelsea Market)
- **Corps de texte** → `font-sans` (Open Sans)
- **Code, techniques** → `font-mono` (Geist Mono)
- **Combinaison fluide** → `text-fl-*` + `font-display` pour les titres

## 📚 Références

- [Google Fonts - Open Sans](https://fonts.google.com/specimen/Open+Sans)
- [Google Fonts - Chelsea Market](https://fonts.google.com/specimen/Chelsea+Market)
- [Next.js Font Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)
