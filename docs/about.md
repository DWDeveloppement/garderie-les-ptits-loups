# Analyse de la Page "À Propos" - Garderie Les P'tits Loups

## Vue d'ensemble

La page "À Propos" présente l'histoire, la pédagogie et les valeurs de la garderie. Elle est structurée en sections basiques avec un contenu géré par Rich Text côté Sanity.
Pour l'url image, utiliser constamant l'image `jardin.webp` située dans le dossier public car elles seront toutes remplacées par les queries provenant de sanity une fois celui-ci implanté plus tard. pour l'instant, on utilise ce fichier en codage dur.

---

## Section 1: Bienvenue / Introduction

### Structure HTML

```html
<section class="hero-about">
  <div class="container">
    <h1>Titre principal</h1>
    <div class="card">
      <p>Description générale</p>
    </div>
  </div>
</section>
```

### Composants à créer

- `HeroAboutSection` - Section d'introduction avec image d'arrière-plan, titre et Card avec description
- `AboutIntroSection` - Composant spécifique de la page about (fichier existant)

### Contenu textuel

- **Titre** : "Bienvenue à la Garderie Les P'tits Loups"
- **Description** : "Structure privée accueillant des enfants de 2 mois jusqu'à l'entrée à l'école. Notre équipe pédagogique propose des activités variées adaptées à chaque âge."

**Approche** : HeroComponent réutilisable avec bgImage, titre, et bloc Card avec description.

---

## Section 2: Notre Histoire

### Structure HTML

```html
<section class="history-section">
  <div class="container">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div class="rich-text-content">
        <!-- Contenu géré par Sanity Rich Text -->
      </div>
      <div class="history-image">
        <Image src={imageUrl} alt="Histoire" />
      </div>
    </div>
  </div>
</section>
```

### Composants à créer

- `HistorySection` - Section historique simple avec 2 blocs : Rich Text + Image

### Contenu textuel

- **2006** : Fondation par Madame Piccant Amel
- **Février 2008** : Reprise par Monsieur Witzig
- **Période 2008-2016** : Mise en conformité et réinvestissement
- **2016** : Investissements majeurs et rénovations

**Approche** : Simple avec 2 blocs - un pour le Rich Text et l'autre pour l'image.

---

## Section 3: Notre Pédagogie

### 3.1 L'Équipe

### Structure HTML

```html
<section class="team-section">
  <div class="container">
    <div class="rich-text-content">
      <!-- Contenu géré par Sanity Rich Text -->
    </div>
  </div>
</section>
```

### Composants à créer

- `TeamSection` - Section équipe avec Rich Text uniquement

### Contenu textuel

- **Équipe éducative** : 6 personnes
- **Support** : 1 intendante, 1 directeur administratif, 1 directrice pédagogique
- **Stages** : Places de stage proposées tout au long de l'année
- **Valeurs de l'équipe** : Respect mutuel, communication transparente, remise en question constructive, formation continue

**Approche** : Rich Text bloc Sanity pour séparer la responsabilité du contenu. Permet de développer plus tard si besoin.

### 3.2 Les Valeurs Institutionnelles

### Structure HTML

```html
<section class="values-section">
  <div class="container">
    <div class="rich-text-content">
      <!-- Contenu géré par Sanity Rich Text avec support pour les Cards -->
    </div>
  </div>
</section>
```

### Composants à créer

- `ValuesSection` - Section des valeurs avec Rich Text

### Contenu textuel

1. **Le Respect** : Assurer le bien-vivre ensemble en respectant les autres, le matériel et soi-même.
2. **La Sécurité** : Garantir la sécurité physique, psychique et affective des enfants pour favoriser leur développement.
3. **Le Partenariat avec les familles** : Créer une relation de confiance avec les parents pour assurer une continuité entre la maison et la garderie.
4. **La Relation individualisée** : Adapter l'accompagnement aux besoins spécifiques de chaque enfant et de sa famille.
5. **La Cohérence et la Communication** : Assurer une communication efficace au sein de l'équipe pour offrir un cadre cohérent aux enfants.

**Approche** : Rich Text avec support pour les Cards dans le contenu.

### 3.3 Les Fondements Pédagogiques

### Structure HTML

```html
<section class="pedagogy-section">
  <div class="container">
    <div class="rich-text-content">
      <!-- Contenu géré par Sanity Rich Text -->
    </div>
  </div>
</section>
```

### Composants à créer

- `PedagogySection` - Section pédagogie avec Rich Text

### Contenu textuel

- **Pédagogie active** : Permet à l'enfant d'apprendre à son rythme
- **Horaire structuré** : Rituels et ateliers créatifs
- **Préparation à l'école** : Favorise l'autonomie et le développement harmonieux
- **Routines sécurisantes** : Les éducatrices instaurent des routines pour offrir un cadre sécurisant

**Approche** : Rich Text pour séparer la responsabilité du contenu.

---

## Composants Techniques Nécessaires

### Composants de Base

1. `HeroAboutSection` - Hero réutilisable avec bgImage, titre, Card
2. `AboutIntroSection` - Composant spécifique page about
3. `HistorySection` - Section avec Rich Text + Image
4. `TeamSection` - Section avec Rich Text uniquement
5. `ValuesSection` - Section avec Rich Text
6. `PedagogySection` - Section avec Rich Text uniquement

### Composant Rich Text Générique

- `RichTextRenderer` - Composant générique pour gérer le rendu des Rich Text de Sanity
- Support pour les Cards et Card spécifique aux citations dans le Rich Text
- Gestion des images, listes, titres, paragraphes
  Les blocs de citations seront utilisés avec un design spécifique comme pour cette portion de texte ci-dessous

**Arrêtez de parler moins fort! »**

**Guillaume - 4 ans**

ce trouvant en bas de la page about.

### Ordre de Développement

dans le dossier `src/components/pages/about/` créer les composants suffixés par "Section", pour le composant générique de `RichTextRenderer` il faut le mettre directement dans `src/components/`

1. `HeroAboutSection` - Section d'introduction
2. `RichTextRenderer` - Composant générique Rich Text
3. `HistorySection` - Histoire avec Rich Text + Image
4. `TeamSection` - Équipe avec Rich Text
5. `ValuesSection` - Valeurs avec Rich Text
6. `PedagogySection` - Pédagogie avec Rich Text

### Palette de Couleurs

- Utiliser`bg-orange-bg-light` pour les sections d'arrière-plan
- `text-orange-12` pour les titres
- `text-orange-11` pour le contenu
- `bg-purple-2` pour les cartes et éléments d'accent

### Responsive Design

- Grilles adaptatives pour les sections avec images
- Rich Text responsive
- Images et contenus adaptés aux différentes tailles d'écran

### Gestion Sanity

- Schémas Rich Text pour chaque section
- Support pour les images dans les Rich Text
- Support pour les Cards dans les Rich Text
- Séparation de la responsabilité du contenu côté éditeur
