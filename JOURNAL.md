# Journal de bord

Nom et prénom : À COMPLÉTER
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
- Ce que j'ai accepté, modifié ou refusé, et pourquoi : À COMPLÉTER (relis le diff du commit « defi 1 » et dis ce que tu en penses).
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
  - À COMPLÉTER : relis `PLAN.md` et ajoute ou retire toi-même au moins une chose (c'est ce qui est noté : « PLAN.md modifié par vous »).

## Défi 4 - Agent

- Mon prompt en mode Agent :

```
(colle-le ici)
```

- Fichiers que l'agent a modifiés :
- Ce que j'ai relu dans les changements avant d'accepter :
- Ce que j'ai refusé, corrigé ou fait refaire :
- Mon jeu après l'agent (une phrase) :

## Défi 5 - Pull request et revue

- Lien de ma pull request :
- Commentaire de la revue Copilot que j'ai traité (le texte) :
- Ma décision (corrigé ou refusé) et pourquoi :
- Lien de mon jeu publié :

## Bilan (3 lignes maximum)

- Ce que l'assistant a fait mieux ou plus vite que moi :
- Ce qu'il a mal fait ou ce que j'ai dû corriger :
- Ce que je ne lui laisserais pas faire :
