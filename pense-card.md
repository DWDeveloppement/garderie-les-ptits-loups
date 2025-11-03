# Pensées et idées d'améliorations pour Card de Shadcn

## 1. Contexte & objectifs

- Offrir la même flexibilité que Radix (`asChild`) tout en conservant l'API Shadcn.
- Permettre l'usage direct de balises sémantiques (`<article>`, `<header>`, `<footer>`, etc.) sans wrappers superflus.
- Respecter les conventions DRY : une seule card stylée utilisée partout (quotes spéciales, feedback, prix, etc.).

## 2. Analyse composant par composant (Radix vs Shadcn)

| Élément | Radix | Shadcn actuel | Manque identifié |
| --- | --- | --- | --- |
| `Card` | n/a | `<div class="rounded-lg border ...">` | Pas d'`asChild`, markup figé |
| `CardHeader` | n/a | `<div class="flex flex-col space-y-1.5 p-6">` | Impossible d'utiliser `<header>` |
| `CardTitle` | n/a | `<h3 class="font-semibold ...">` | Balise imposée |
| `CardDescription` | n/a | `<p class="text-sm ...">` | Balise imposée |
| `CardContent` | n/a | `<div class="p-6 pt-0">` | Pas de `section`, `article`, etc. |
| `CardFooter` | n/a | `<div class="flex items-center ...">` | Idem |

## 3. Avantages / inconvénients d'introduire `asChild`

**Avantages**

- Sémantique libre (choix de la balise). 
- Réutilisabilité maximale (rich-text, pricing, etc.).
- Alignement avec notre design system générique.

**Inconvénients**

- Maintenance d'un fork Shadcn (diffs à suivre). 
- Mise en œuvre initiale (gestion `Slot`, `ref`, props). 
- Discipline côté équipe (vérifier accessibilité & styling lors de l'usage d'`asChild`).

## 4. Schéma de développement proposé

1. Introduire `Slot` (`@radix-ui/react-slot`) dans chaque sous-composant.  
2. Ajouter la prop `asChild?: boolean`.  
3. Déterminer dynamiquement l'élément rendu (`Slot` vs balise par défaut).  
4. Conserver les classes Tailwind existantes.  
5. Mettre à jour la documentation interne (quand utiliser `asChild`, exemples, pièges).  
6. Vérifier les usages existants (pages, exemples UI) pour éviter les régressions.

## 5. Tests & QA

- Stories/unités : `<Card>` standard, `<Card asChild>`, `CardHeader asChild`, etc.
- Accessibilité : vérifier la cohérence heading/titles, focus, aria. 
- Intégration : valider les pages prix, rich text, feedback card.

## 6. Structure de fichiers envisagée

### Arborescence cible (inspirée d'un `npx shadcn init` personnalisé)

```
src/
  components/
    ui/
      card/
        Card.tsx            # Composant racine (gestion asChild + base classes)
        CardHeader.tsx      # Header, support asChild
        CardTitle.tsx       # Title, support asChild
        CardDescription.tsx # Description, support asChild
        CardContent.tsx     # Content wrapper
        CardFooter.tsx      # Footer wrapper
        __tests__/
          Card.test.tsx
        index.ts            # Barrel export (Card, CardHeader, ...)
    shared/
      ...
  styles/
    components/
      card.css              # Facultatif (utilisation Tailwind/cva)
  types/
    ui/
      card.ts               # Types spécifiques (CardProps, VariantProps)
```

### Fichiers clés

- **`Card.tsx`** :  
  - Import `Slot`.  
  - Déstructurer `{ asChild, className, ...props }`.  
  - `const Comp = asChild ? Slot : "div"`.  
  - `return <Comp ref={ref} className={cn(baseClasses, className)} {...props} />`.

- **Sous-composants (`CardHeader`, `CardContent`, etc.)** : même pattern (classe CSS + fallback `div`).

- **`card.css` / classes Tailwind** :  
  - Si utilisation CVA : définir `cardVariants` (variants/size).  
  - Sinon maintenir Tailwind inline, mais réfléchir à isoler les styles partagés.

- **`card.ts` (types)** :  
  - Définir `CardProps`, `CardHeaderProps`, etc.  
  - Exporter les types aux composants pour homogénéité.

### Séparation des responsabilités

| Préoccupation | Lieu | Description |
| --- | --- | --- |
| JSX & `Slot` | `Card*.tsx` | Gestion du markup, `asChild`, refs |
| Styles & variantes | `card.css` ou CVA inline | Palette, spacing, responsive |
| Typage | `types/ui/card.ts` | Props, union types pour variants/sizes |
| Tests | `components/ui/card/__tests__` | Stories/tests de rendu et interactions |

## 7. Idées complémentaires (brainstorm samedi)

- Étendre le pattern à d'autres composants Shadcn critiques (ex. `Accordion`, `Badge`).
- Documenter un “guide asChild” pour l’équipe (best practices, cas à éviter).
- Vérifier l’impact sur l’arbre CSS (quelles classes Tailwind peut-on factoriser dans `card.css`).
- Discuter d’un possible layer “design tokens” avant de lancer la refonte.