# Affichage structure des prix.

Si je me souvient bien, le sanity se présente avec des sidebar
Sidebar numéro 1: pages 
- Home
- About
- Tarifs
- ...

clique sur Tarifs -> Ouverture de la Sidebar pour les types de tarifs (slug)
dedans nous aurons 2 choix possibles:
1. 3 items, Nurserie, Trotteurs et Grands Subventions
composition des 2 premiers items
- 2 gros blocs avec un label pour dire si c'est au mois et l'autre pour dire si c'est quotidien
- chaque bloc aura un boutton "add item" qui permet de mettre un label avec la prestation ex: "journée complête" et juste en dessous un tableau pour représenter Nombre de jours par semaine et prix.
**Important car hésitation**:
> 1. Soit un input pour la prestation et en dessous un rich text qui fait certes simple, mais le client pourrait potentiellement casser le tableau rich text si il le manipule mal
> 2. Pour ne pas faire de rich text, mettre dans le bloc, un boutton add item qui afficherai 2 inputs 1 label pour 1j/sem et l'autre pour le prix et a chaque add item, cela crée une row dans le tableau. Mais dans ce cas là, il faudrait que le premier boutton add item (prestation: journée complete, matin, etc... soit remplacé par "add prestation" pour pas avoir 2 fois un add item sinon confusion)
> 3. 2 Blocs fixes dans un fieldset pour dire le titre "Prix au mois" et à l'intérieur un bloc fixe pour chaque prestation (correspondra au trigger de l'accordéon) et dans chaqun un "add item" pour chaque row du tableau.

Objectif, alier structure et sécurité de saisie pour éviter les erreurs par le client. (j'veux pas un tel. toute les semaines pour dire j'ai un problème).