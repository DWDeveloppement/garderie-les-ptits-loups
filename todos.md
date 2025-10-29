- Corriger le bug de rendu des images - Appliquer le stash et corriger les composants problématiques

- Supprimer tous les console.log des composants (cause erreur hydratation)
Simplifier les props Next.js Image - garder seulement src, alt, fill, className, priority

- Supprimer le fichier imageOptimization.ts qui a tout cassé avec ses props complexes
- Corriger HeroGlobal.tsx - enlever SanityImage complexe, garder imageUrl simple

- Corriger ParalaxImage.tsx - enlever SanityImage complexe, garder imageUrl simple

- Tester que toutes les images s'affichent correctement après corrections

- Appliquer le lazy loading et skeletons (parties qui marchent du stash)
- Squash les commits pour nettoyer l'historique une fois tout corrigé