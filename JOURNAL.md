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
(colle-le ici)
```

- Une affirmation de la réponse que j'ai vérifiée :
- Comment je l'ai vérifiée (un changement dans le code, un test dans le jeu) :
- Résultat : exacte, fausse ou incomplète :

## Défi 3 - Plan

- Mon prompt en mode Plan :

```
(colle-le ici)
```

- Le plan est dans le fichier `PLAN.md`.
- Ce que j'ai changé dans le plan avant de le valider (étape retirée, ajoutée, contrainte) et pourquoi :

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
