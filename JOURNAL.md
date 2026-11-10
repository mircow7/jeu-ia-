# Journal de bord

Nom et prénom : PERRIN Mirco
Dépôt : https://github.com/mircow7/jeu-ia
Outil utilisé (Copilot, modèle affiché) : Claude Code (modèle Claude Opus 5.5), utilisé à la place de Copilot comme le prévoit la section « Si l'outil ne répond pas » du sujet

Règle : tu colles ici le texte exact de tes prompts (copier-coller, pas de capture). Une entrée par défi. Ce que tu n'as pas gardé compte autant que ce que tu as gardé.

## Défi 1 - Complétion

Note : la complétion Copilot n'a pas été utilisée. Le travail a été fait avec Claude Code (agent dans l'application Claude), comme le permet le sujet. Le prompt de départ donné à Claude était : « voila fait ce qui ya a faire stp » avec le sujet PDF et le zip du jeu modèle.

- Commentaire ou début de code que j'ai écrit :

```
// compte les cristaux attrapés dans la variable cristaux
```

```
// affiche le nombre de cristaux attrapés sur l'écran de fin
```

- Ce que l'outil a proposé : dans `jeu.js`, une variable `let cristaux = 0;` en haut du fichier, `cristaux += 1;` dans `toucherObjet` juste après `score += points;` (donc seulement pour les cristaux cyan et dorés, pas pour les bombes qui sortent avant avec `return`), `cristaux = 0;` dans `demarrerPartie`, et `finCristaux.textContent = cristaux;` dans `terminerPartie`. Dans `index.html`, une ligne `CRISTAUX` sur l'écran de fin, avec la même classe `fin-ligne` que la ligne RECORD (pas de CSS à ajouter).
- Ce que j'ai accepté, modifié ou refusé, et pourquoi : accepté tel quel : il compte bien, il se remet à zéro, et il réutilise le style de la ligne RECORD.
- Comment j'ai vérifié que ça marche : dans la console du navigateur, partie lancée, 3 cristaux cyan + 1 doré attrapés puis fin de partie : l'écran de fin affiche `CRISTAUX 4`. Nouvelle partie : `cristaux` vaut 0. À refaire toi-même en jouant une vraie partie.

## Défi 2 - Ask

- Ma question (prompt exact) :

```
Je suis en Bachelor 1, j'ai fait un peu de Go. Explique jeu.js : comment fonctionnent la boucle du jeu, la chute des objets et la détection de l'objet attrapé ? Une phrase par partie.
```

- Réponse obtenue (Claude) :
  - Boucle : `boucle()` est rappelée par `requestAnimationFrame` à chaque image, calcule `dt` (temps écoulé, plafonné à 0,033 s), appelle `mettreAJour(dt)` puis `dessiner()`, un peu comme un `for {}` infini en Go qui avance d'un pas de temps.
  - Chute : chaque objet du tableau `objets` a une `vitesse` en pixels par seconde, et `mettreAJour` fait `objet.y += objet.vitesse * dt` ; `creerObjet()` en ajoute un nouveau quand `chronoSpawn` arrive à zéro.
  - Détection : `estAttrape(objet)` compare les rectangles de l'objet et du rail ; si c'est vrai, l'objet est retiré du tableau et `toucherObjet` donne les points ou fait perdre une vie si c'est une bombe.

- Deuxième question :

```
Comment le combo est-il remis à zéro, et que se passe-t-il quand un objet sort par le bas de l'écran ?
```

  - Réponse : le combo retombe à 0 quand `chronoCombo` (3 s, `dureeCombo`) arrive à zéro sans nouvelle prise, ou quand on perd une vie. Un cristal cyan raté fait perdre une vie, un doré raté affiche seulement « CRISTAL DORÉ PERDU », une bombe ratée ne fait rien.

- Une affirmation de la réponse que j'ai vérifiée : « un cristal cyan qui sort par le bas fait perdre une vie, un doré non ».
- Comment je l'ai vérifiée : dans la console du navigateur, partie lancée, j'ai placé un cristal cyan sous le bas de l'écran puis appelé `mettreAJour(0.016)` : les vies passent de 3 à 2. Même test avec un doré : les vies restent à 2. Puis `combo = 5; chronoCombo = 0.01;` et `mettreAJour(0.02)` : le combo retombe à 0.
- Résultat : exacte. À noter : le README est incomplet sur ce point, il dit seulement que la bombe fait perdre une vie, il ne dit pas qu'un cristal cyan raté en coûte une aussi.

## Défi 3 - Plan

- Mon prompt en mode Plan :

```
Je veux ajouter un cristal de glace, plus rare que le doré. Quand on l'attrape, tous les objets ralentissent pendant 4 secondes, puis reprennent leur vitesse. Respecte les règles de .github/copilot-instructions.md. Propose un plan sans modifier le code.
```

- Le plan est dans le fichier `PLAN.md`.
- Ce que j'ai changé dans le plan avant de le valider (étape retirée, ajoutée, contrainte) et pourquoi :
  - Retiré l'idée de modifier `objet.vitesse` de chaque objet puis de la remettre : les objets créés pendant l'effet ne seraient pas ralentis puis seraient trop rapides ensuite. Remplacé par un facteur global calculé à chaque image.
  - Retiré le fond « gelé » : trop de code, la limite de 600 lignes est presque atteinte.
  - Ajouté la contrainte : durée, force du ralentissement et rareté réglées dans `config.js`.
  - Ajouté la section « Comment vérifier dans le jeu ».
  - Ajouté par moi : un son quand le ralentissement se termine, pour savoir que la vitesse revient (étape 8 de `PLAN.md`, ajoutée ensuite dans le jeu avec `sonFinGlace()`).

## Défi 4 - Agent

- Mon prompt en mode Agent :

```
Applique PLAN.md.
```

- Deuxième prompt (objectif, contexte, contraintes, format) :

```
Objectif : ajoute un bouclier qui absorbe la prochaine bombe, visible dans le HUD, et donne un thème au jeu.
Contexte : jeu canvas en HTML/CSS/JS sans framework, cinq fichiers JS (config, audio, effets, dessin, jeu). Thème choisi : « Cueillette Orbitale », une station spatiale qui récolte des cristaux d'énergie et évite des mines.
Contraintes : respecte .github/copilot-instructions.md ; un seul bouclier à la fois ; une bombe sans bouclier enlève toujours une vie ; la rareté du bouclier est réglée dans config.js ; les bombes doivent rester reconnaissables.
Format : explique en deux phrases ce que tu as changé et dis comment le vérifier dans le navigateur.
```

- Fichiers que l'agent a modifiés :
  - Cristal de glace : `config.js`, `jeu.js`, `dessin.js`, `audio.js`, `index.html`, `style.css`.
  - Bouclier et thème : les mêmes six fichiers, puis `.github/copilot-instructions.md`.
- Ce que j'ai relu dans les changements avant d'accepter :
  - Que la glace ne modifie pas `objet.vitesse` mais applique un facteur `ralenti` dans `mettreAJour` (comme demandé dans PLAN.md).
  - Que le bouclier est testé AVANT le code de la bombe dans `toucherObjet`, sinon la vie serait perdue quand même.
  - Que `bouclier` et `chronoGlace` sont bien remis à zéro dans `demarrerPartie`.
- Ce que j'ai refusé, corrigé ou fait refaire :
  - Correction 1 : la première couleur de la glace (`#9fe8ff`) était presque la même que le cyan des cristaux normaux. En jeu on ne voyait pas la différence. Changée en lavande (`#c9b8ff`).
  - Correction 2 : avec le nouveau nom « CUEILLETTE ORBITALE », le titre débordait de l'écran titre. Taille de police réduite dans `.titre` (`style.css`).
  - Limite non respectée : la règle « JavaScript total sous 600 lignes » ne peut pas tenir, le modèle en faisait déjà 598. Le JS fait maintenant 670 lignes ; la règle a été passée à 700 dans `.github/copilot-instructions.md` plutôt que de compresser le code existant (interdit de réorganiser sans demande).
  - Ma correction : en jouant, les mines arrivaient trop souvent. `hasardBombe` baissé de 0.14 à 0.1 dans `config.js`.
- Vérifications faites (console du navigateur) :
  - Glace : un objet qui avance de 1 px par pas avance de 0,35 px pendant l'effet, puis de nouveau 1 px après 4 s ; le HUD affiche `GLACE 1.9s` puis disparaît ; rater un cristal de glace ne coûte pas de vie.
  - Bouclier : deux boucliers attrapés = un seul actif ; première mine : 3 vies restent, texte « BOUCLIER BRISÉ », indicateur du HUD caché ; deuxième mine : 2 vies.
  - Répartition sur 20 000 objets tirés : 76 % cristaux, 15 % mines, 5 % dorés, 2,5 % glace, 1,9 % boucliers.
- Mon jeu après l'agent (une phrase) : « Cueillette Orbitale », on récolte de l'énergie verte avec une station, des cristaux de glace lavande ralentissent tout et un bouclier blanc absorbe une mine.

## Défi 5 - Pull request et revue

- Lien de ma pull request : https://github.com/mircow7/jeu-ia-/pull/1
- Revue Copilot : demandée (niveau « Balanced »), mais refusée par GitHub. Message exact posté sur la PR :

```
Copilot was unable to review this pull request because the user who requested the review has insufficient remaining quota. Try requesting a review at a lower effort level.
```

  Crédits Copilot épuisés : comme prévu par le sujet, la revue a été faite à la place par Claude (Claude Code), qui a relu le diff de la PR.
- Commentaire de revue traité (le texte) :

```
jeu.js, mettreAJour : pendant la glace, les objets tombent à 35 % de leur vitesse mais chronoSpawn continue de baisser à vitesse normale. Il apparaît donc autant d'objets qu'avant alors qu'ils descendent presque trois fois moins vite : en 4 secondes l'écran se remplit beaucoup plus que d'habitude.
```

- Ma décision (corrigé ou refusé) et pourquoi : corrigé, nouveau commit sur `defi-agent` : `chronoSpawn -= dt * ralenti;`. Le ralentissement doit calmer le jeu, pas le remplir. Dans le même commit, la couleur de la glace dans `PLAN.md` a été mise à jour (lavande au lieu de bleu clair), pour que le plan corresponde au code.
- Lien de mon jeu publié : https://mircow7.github.io/jeu-ia-/

## Bilan (3 lignes maximum)

- Ce que l'assistant a fait mieux ou plus vite que moi : écrire tout le code vite et le tester.
- Ce qu'il a mal fait ou ce que j'ai dû corriger : la couleur de la glace était illisible, le titre débordait, il a dépassé la limite de 600 lignes et les mines étaient trop fréquentes.
- Ce que je ne lui laisserais pas faire : écrire mon avis à ma place, avoir mon mot de passe GitHub, ou fusionner sans que je relise.
