# Plan : cristal de glace

Objectif : un troisième type de cristal, « glace », plus rare que le doré. Quand on l'attrape, tous les objets qui tombent ralentissent pendant 4 secondes, puis reprennent leur vitesse normale.

Règles suivies (`.github/copilot-instructions.md`) : pas de classe, pas de module, noms en français sans accents, réglages dans `config.js`, sons en Web Audio, dessins au canvas, pas d'emoji ni de tiret long dans les textes affichés.

## Étapes

1. **`config.js`**
   - Ajouter la constante `const GLACE = "glace";` à côté de `CRISTAL`, `BOMBE`, `DORE`.
   - Ajouter la couleur `glace: "#9fe8ff"` dans `COULEURS`.
   - Ajouter dans `REGLAGES` : `hasardGlace: 0.025` (plus rare que `hasardDore: 0.05`), `dureeGlace: 4` (secondes) et `ralentiGlace: 0.35` (les objets gardent 35 % de leur vitesse).

2. **`jeu.js`, état**
   - Ajouter `let chronoGlace = 0;` dans l'état de la partie.
   - Le remettre à 0 dans `demarrerPartie`.

3. **`jeu.js`, `creerObjet`**
   - Si le tirage tombe dans la tranche juste sous celle du doré (`tirage > 1 - hasardDore - hasardGlace`), le type est `GLACE`.
   - Rayon 15.

4. **`jeu.js`, `toucherObjet`**
   - Un cristal de glace compte comme un cristal (combo, compteur `cristaux`), rapporte 20 points multipliés.
   - Il met `chronoGlace = REGLAGES.dureeGlace`, joue `sonGlace()`, fait un flash bleu clair et affiche le texte « GLACE ».

5. **`jeu.js`, `mettreAJour`**
   - Diminuer `chronoGlace` de `dt` s'il est positif.
   - Calculer un facteur `ralenti = chronoGlace > 0 ? REGLAGES.ralentiGlace : 1` et faire `objet.y += objet.vitesse * ralenti * dt`.
   - On ne modifie pas `objet.vitesse` : comme ça les objets reprennent exactement leur vitesse à la fin, et ceux qui apparaissent pendant l'effet sont ralentis aussi.
   - Un cristal de glace raté ne coûte pas de vie (comme le doré).

6. **HUD (`index.html`, `jeu.js`, `style.css`)**
   - Ajouter un petit texte `GLACE 3.2s` sous le niveau, visible seulement pendant l'effet, mis à jour dans `majHud`.

7. **`dessin.js`**
   - Dans `dessinerCristal`, choisir la couleur bleu glacé pour le type `GLACE`, et ajouter quatre petits éclats autour du losange.

8. **`audio.js`**
   - Ajouter `sonGlace()` : une suite de notes aiguës descendantes en `sine`.

9. **Vérification**
   - Vérifier que les cinq fichiers JS n'ont pas d'erreur de syntaxe (console du navigateur vide, ou `node --check`).

## Ce que j'ai changé dans le plan avant de le valider

- **Étape retirée** : la première version proposait de modifier `objet.vitesse` de chaque objet au moment de la prise (`objet.vitesse *= 0.35`) puis de la remultiplier à la fin. Retirée : un objet créé pendant l'effet ne serait pas ralenti, puis serait accéléré au-delà de sa vitesse normale au moment de la remultiplication. On garde un facteur global calculé à chaque image (étape 5).
- **Étape retirée** : la première version proposait aussi un fond d'écran « gelé » qui change toute la scène. Retirée : trop de code pour un défi de 40 minutes, alors que la limite de 600 lignes de JavaScript est déjà presque atteinte.
- **Contrainte ajoutée** : la durée (`dureeGlace`), la force du ralentissement (`ralentiGlace`) et la rareté (`hasardGlace`) sont réglées dans `config.js`, rien en dur dans `jeu.js`.
- **Contrainte ajoutée** : ne pas toucher aux règles existantes (bombe, doré, combo, niveaux).

## Comment vérifier dans le jeu

1. Mettre temporairement `hasardGlace: 0.5` dans `config.js` et recharger la page.
2. Lancer une partie (Entrée), attraper un cristal bleu clair : texte « GLACE », flash bleu, tous les objets tombent nettement plus lentement, le HUD affiche le temps restant.
3. Attendre 4 secondes : le compteur disparaît et les objets reprennent leur vitesse.
4. Rater un cristal de glace : aucune vie perdue.
5. Remettre `hasardGlace: 0.025`.
