# Installation et Configuration du Système de Design

## 📁 Structure des Fichiers

```
src/
├── styles/
│   ├── globals.css          # Point d'entrée principal
│   ├── palette.css          # Palette de couleurs Radix (OKLCH)
│   └── shadcn-tokens.css    # Mapping vers tokens Shadcn
├── components/
│   └── ui/                  # Composants Shadcn UI
├── lib/
│   └── utils.ts             # Utilitaires (cn helper)
└── app/
    └── layout.tsx           # Layout racine
```

## 🚀 Étapes d'Installation

### 1. Copier les Fichiers de Style

Copie les fichiers suivants dans `src/styles/` :

- ✅ `palette.css` (déjà existant dans ton projet)
- ✅ `shadcn-tokens.css` (nouveau, créé)
- ✅ `globals.css` (nouveau, créé - remplace l'existant)

### 2. Configurer Tailwind

Remplace ton `tailwind.config.ts` par la nouvelle configuration :

```typescript
// tailwind.config.ts (nouveau fichier créé)
```

### 3. Installer les Dépendances

```bash
# Tailwind CSS et plugins
npm install -D tailwindcss@next @tailwindcss/typography tailwindcss-animate

# Shadcn dependencies
npm install class-variance-authority clsx tailwind-merge
npm install @radix-ui/react-accordion
npm install @radix-ui/react-alert-dialog
npm install @radix-ui/react-separator
# ... autres packages Radix selon les composants utilisés
```

### 4. Créer le Helper `cn`

Crée `src/lib/utils.ts` :

```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### 5. Mettre à Jour le Layout

Dans `src/app/layout.tsx` :

```tsx
import "@/styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
```

## 🎨 Utilisation des Tokens

### Accès Direct aux Couleurs Sémantiques

```tsx
// Backgrounds
className="bg-background"       // Fond principal (purple-2)
className="bg-card"             // Fond carte (purple-1)
className="bg-muted"            // Fond secondaire (purple-3)

// Primary (Purple)
className="bg-primary text-primary-foreground"           // Solid
className="bg-primary-subtle text-purple-11"             // Surface
className="border border-primary-border"                 // Outline
className="text-purple-11 hover:bg-purple-4"             // Ghost

// Secondary (Orange)
className="bg-secondary text-secondary-foreground"       // Solid
className="bg-secondary-subtle text-orange-11"           // Surface
className="border border-secondary-border"               // Outline
className="text-orange-11 hover:bg-orange-4"             // Ghost

// Feedback Colors
className="bg-success text-success-foreground"           // Success
className="bg-destructive text-destructive-foreground"   // Error
className="bg-warning text-warning-foreground"           // Warning
className="bg-info text-info-foreground"                 // Info
```

### Accès Direct aux Échelles Radix

Pour des cas spécifiques où tu as besoin d'accéder directement à l'échelle :

```tsx
className="bg-purple-4 text-purple-11 border border-purple-8"
className="bg-orange-3 text-orange-12"
className="bg-green-5 text-green-11"
```

## 📦 Composants Disponibles

### Prochaines Étapes - Composants à Créer

Dans l'ordre de priorité :

1. **Accordion** - Composant d'accordéon avec variants
2. **Alert** - Alertes avec feedback colors
3. **Button** - Bouton avec tous les variants (solid, surface, outline, ghost)
4. **Card** - Carte de contenu
5. **Carousel** - Carrousel d'images/contenu
6. **Navigation Menu** - Menu de navigation
7. **Separator** - Séparateur visuel
8. **Skeleton** - Loading placeholder
9. **Toast** - Notifications toast
10. **Spinner** - Indicateur de chargement
11. **Table** - Tableau de données
12. **Tooltip** - Info-bulles
13. **Dialog/Sheet** - Modal et panneau latéral pour mobile menu
14. **Form Components** (Label, Input, Textarea, etc.)

## 🎯 Variants Système

Chaque composant interactif aura ces variants :

### Color Variants
- `primary` - Couleur principale (purple)
- `secondary` - Couleur secondaire (orange)
- `success` - Feedback positif (green)
- `warning` - Avertissement (amber)
- `destructive` - Action destructive (red)
- `info` - Information (blue)

### Style Variants
- `solid` - Fond plein, texte en contraste
- `surface` - Fond subtil avec bordure
- `outline` - Transparent avec bordure
- `ghost` - Transparent, hover subtil

### Size Variants (Tailwind standard)
- `sm` - Petit
- `md` - Moyen (défaut)
- `lg` - Grand
- `xl` - Très grand

## 🔍 Exemple : Tous les Variants d'un Button

```tsx
// Primary Solid (défaut)
<Button>Click me</Button>

// Primary Surface
<Button variant="surface">Click me</Button>

// Primary Outline
<Button variant="outline">Click me</Button>

// Primary Ghost
<Button variant="ghost">Click me</Button>

// Secondary Solid
<Button color="secondary">Click me</Button>

// Secondary Ghost
<Button color="secondary" variant="ghost">Click me</Button>

// Destructive
<Button color="destructive">Delete</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
```

## 📐 Convention de Nommage

### Props des Composants

```tsx
interface ComponentProps {
  variant?: "solid" | "surface" | "outline" | "ghost";
  color?: "primary" | "secondary" | "success" | "warning" | "destructive" | "info";
  size?: "sm" | "md" | "lg" | "xl";
}
```

## ✅ Checklist d'Installation

- [ ] Copier `palette.css` dans `src/styles/`
- [ ] Copier `shadcn-tokens.css` dans `src/styles/`
- [ ] Copier `globals.css` dans `src/styles/`
- [ ] Remplacer `tailwind.config.ts`
- [ ] Installer les dépendances npm
- [ ] Créer `src/lib/utils.ts` avec le helper `cn`
- [ ] Mettre à jour `src/app/layout.tsx`
- [ ] Tester en créant un composant simple

## 🧪 Test de Validation

Crée une page de test `src/app/test/page.tsx` :

```tsx
export default function TestPage() {
  return (
    <div className="container mx-auto p-8 space-y-4">
      <h1 className="text-primary">Primary Purple Title</h1>
      <h2 className="text-secondary">Secondary Orange Title</h2>
      
      <div className="p-4 bg-primary text-primary-foreground rounded-lg">
        Primary Solid
      </div>
      
      <div className="p-4 bg-primary-subtle text-purple-11 border border-primary-border rounded-lg">
        Primary Surface
      </div>
      
      <div className="p-4 bg-secondary text-secondary-foreground rounded-lg">
        Secondary Solid
      </div>
      
      <div className="p-4 bg-success-subtle text-green-11 border border-success-border rounded-lg">
        Success Surface
      </div>
      
      <div className="p-4 bg-destructive-subtle text-red-11 border border-destructive-border rounded-lg">
        Error Surface
      </div>
    </div>
  );
}
```

Si les couleurs s'affichent correctement, le système est prêt ! 🎉

## 🚦 Prochaine Étape

On peut maintenant créer les composants Shadcn UI avec les variants définis. Commence par me dire quel composant tu veux qu'on crée en premier !
