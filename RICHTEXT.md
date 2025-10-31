# Travaux Rich Text – Plan Global

## Travaux côté rendu frontend

- **RichTextRenderer**

  - [X] Extraire la logique de rendu des lists vers un composant dédié (`RichTextList`)
  - [X] Intégrer`RichTextQuote` /`RichTextQuoteSpecial` selon`_type` ou`markDef`
  - [X] Intégrer les feedback via la Card générique (`RichTextFeedbackCard`) et variants/icônes
  - [ ] Factoriser une fonction utilitaire pour gérer`strong` /`em` (réutilisable dans paragraphes, listes, quotes)
  - [ ] Support futur des images rich-text (figure + classes position/size, pas  prioritaire)
- **Paragraphes**

  - [X] Gérer tag`{variant:primary}` →`text-purple-10`
  - [ ] Prévoir support futurs variants (muted, secondary, etc.)
- **RichTextQuote**

  - [X] Variants CVA (`default` purple,`secondary` orange) – standard
  - [ ] Ajouter rendu des`strong` /`em` à l’intérieur du texte
  - [ ] Prévoir hook pour détecter un tag manuel (`{variant:secondary}`) en attendant le field Sanity

  **Exemples de syntaxe dans le rich-text:**

  ```md
  // rich-text quote normal:
    select quote et écrivez normalement et le quote sort en purple.
  ```

// Syntaxe exemples à saisir dans Sanity (Portable Text)

1. **Citation standard (purple par défaut)**

   - Sélectionner « Quote » dans l’éditeur, écrire simplement votre texte :
     ```md
     Garder un esprit curieux.
     {cite}Antoine
     ```
2. **Citation standard orange**

   - Ajouter le tag`{variant:secondary}` au début de la première ligne :
     ```md
     {variant:secondary}Gardez votre calme.
     {cite}Marie
     ```
3. **Citation spéciale (carte purple)**

   - Ajouter le tag`{style:special}` avant le texte :
     ```md
     {style:special}Rêver grand, agir petit.
     {cite}L’équipe
     ```
4. **Citation spéciale orange**

   - Combiner les deux tags, l’ordre n’a pas d’importance :
     ```md
     {style:special}{variant:secondary}{cite}Capucine
     Tout est possible avec un sourire.
     ```
5. **Citation multi-paragraphes**

   - Utiliser des retours à la ligne,`RichTextRenderer` rendra des`<br>` ; ajouter`{cite}` pour la signature :
     ```md
     Garder un esprit curieux.
     Soyez bon.
     {cite}Murielle
     ```

> ℹ️ Ces tags sont une solution provisoire : ils sont parsés côté frontend. Dès que le bloc `quoteEnhanced` sera ajouté dans Sanity, on n’aura plus besoin de les taper manuellement.

- **RichTextQuoteSpecial**

  - [X] S’appuie sur la Card générique (`primary`/`secondary`) encapsulée dans `<blockquote>`
  - [ ] Ajouter rendu`strong` /`em`
- **RichTextFeedbackCard** (Card générique partagée quotes spéciales / feedback)

  - [X] Variants palette (`primary`,`secondary`,`success`,`info`,`warning`,`destructive`)
  - [X] Icône optionnelle (`IconName` ou JSX) avec fallback par variant
  - [X] Support tailles (`sm`,`md`,`lg`) avec défaut`md`
- **Blocs Feedback (temporaire via Quote)**

  - [X] Parsing`{type:feedback}` +`{variant:…}` +`{size:…}` +`{title:…}`
  - [ ] Migrer vers bloc Sanity dédié (feedbackCard) quand disponible
- **RichTextTitle**

  - [X] Créer le composant (`tag`,`variant`,`className`,`children`)
  - [ ] Gérer variations supplémentaires si besoin (ex: alignements, décorations)

  **Usage exemple dans Rich Text (Sanity)**

  ```md
  // Pour un titre h2 standard :
  Sélectionner Heading 2 et écrire :
  Notre histoire

  // Pour forcer l’orange (écrire le tag au tout début de la première ligne) :
  {variant:secondary}Notre histoire
  ```

  > ℹ️ Les tags `{variant:...}` sont nettoyés côté rendu. Évitez `{cite}` dans un titre : ce tag est réservé aux citations et sera supprimé automatiquement.
  >
- **Paragraphes**

  ```md
  Ceci est un paragraphe standard (orange via globals.css)

  {variant:primary}Ce paragraphe ressort en violet (option ponctuelle)
  ```
- **RichTextList** (prototype à finaliser)

  - [X] Nettoyer la logique (retirer code mort, structurer`listVariants`)
  - [ ] Support du rendu marks (`strong`/`em`) pour chaque item
  - [X] Support des variants (default / primary)
- **Listes**

  ```md
  - Item par défaut (orange)
  - {variant:primary}Item violet (toute la liste passe en violet)
  - Item suivant

  1. Liste ordonnée par défaut
  2. {variant:primary}Liste ordonnée violet
  ```
- **Feedback / Info Cards (temp)**

  ```md
  {type:feedback}{variant:success}{size:lg}{icon:success}{title:Succès}
  Ce bloc quote devient une carte feedback verte.
  Retour à la ligne = nouveau paragraphe dans la carte.

  {type:feedback}{variant:warning}
  Sans titre ni size → fallback primary/md (orange)
  ```

> ⚠️ En attendant les blocs « feedbackCard » de Sanity, utiliser le style Quote + ces tags en première ligne (dans l’ordre de préférence). Les retours à la ligne restent supportés. `icon` est optionnel (valeurs dispo : `info`, `success`, `warning`, `destructive`, `primary`, `secondary`, `error`, etc. — voir registry). Après publication, vérifier le rendu via DevJsonViewer. Migration prévue vers un bloc structuré dès que disponible.

- **Types utilitaires (`richText.ts`)**

  - [ ] Clarifier/typer les nouvelles structures (quoteEnhenced, infoCard, list regroupée)
  - [ ] S’assurer que les types reflètent les blocs Sanity (include listItem, markDefs)
- **Futurs composants**

  - [ ]`RichTextImage` (position left/right/center/inline, size sm/md/lg/full, légende)

  > ⚠️ Les blocks enaned, devrons retourner des menu pour gérer certains aspects internes comme pour le layout du block rich-text par défaut afin de gérer des headings, listes, des button Toggle Group Shadcn UI (bold, italic, underline, lists, link) afin de gérer le texte selectioné dans des composants de style quote ou feedback.
  >

## Travaux côté Sanity

**Schémas**

- Ajouter un bloc`quoteEnhanced` (fields: text, author, variant select [default, secondary, special-default, special-secondary])
- Ajouter un bloc`feedbackCard` (title, content, variant, icon optionnel, size)
- [ ] Créer un AlertDialog Shadcn UI (layout commun pour éditer les blocs enrichis)
- [ ] Documenter la convention temporaire`{variant:secondary}` si utilisée avant le schéma (optionnel)

**Queries GROQ**

* [ ] Projeter`quoteEnhanced` dans`ABOUT_QUERY` (text, author, variant)
* [ ] Projeter`feedbackCard` (title, content, variant, icon, size)

**Studio UX**

* [ ] Ajouter descriptions/preview icon pour les blocs custom dans Portable Text

- [ ] Vérifier que les options par défaut sont cohérentes (quote variant = default)

> ⚠️ Les blocks enaned, devrons retourner des menu pour gérer certains aspects internes comme pour le layout du block rich-text par défaut afin de gérer des headings, listes, des button Toggle Group Shadcn UI (bold, italic, underline, lists, link) afin de gérer le texte selectioné dans des composants de style quote ou feedback.

### Stratégie de développement Sanity

| Priorité | Élément | Étapes clés | Estimation |
|----------|---------|-------------|------------|
| P1 | `quoteEnhanced` | Schéma + preview Studio, projection GROQ, types TS, rendu frontend | ~1,5 j |
| P1 | `feedbackCard` (unique pour feedback/info) | Schéma (variant/icon/size), preview, GROQ + migration tags → bloc | ~2 j |
| P2 | UX Studio (AlertDialog + toolbar) | Modale Shadcn UI pour configurer les blocs, binding Portable Text | ~2 j |
| P3 | Documentation & migration contenu | Nettoyage tags `{variant:...}`, MAJ doc, QA DevJsonViewer | ~1 j |
| P3 | Tests & automatisation | Scénarios manuels, checklist QA, MAJ DevJsonViewer | ~0,5 j |

> L’ajout des images Rich Text sera traité après la mise en production (pipeline CI/CD).


## Tests à effectuer

- **Page À propos**
  - [ ] Vérifier rendu des quotes (default + secondary) dans Pedagogy
  - [ ] Vérifier rendu des listes avec bold/italic dans Pedagogy
  - [ ] Tester`quoteEnhanced` (après schema) et`infoCard` si ajoutés
  - [ ] Tester les images rich-text (History collapse) après integration finale
- **Sanity Studio**
  - [ ] Saisie d’un bloc quote variant default + secondary, publication, preview
  - [ ] Saisie d’une infoCard (si implémentée) et validation front
- **Automatisation**
  - [ ] Ajouter tests visuels manuels (screenshots) ou check-lists QA
  - [ ] Mettre à jour le DevJsonViewer pour vérifier la projection des nouveaux champs
