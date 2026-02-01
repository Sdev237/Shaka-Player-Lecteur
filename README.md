# Démarrage – Lecteur de flux vidéo

Ce projet a été créé avec [Create React App](https://github.com/facebook/create-react-app).

## Push Git

Si la console affiche **« No configured push destination »** ou **« Aucune destination de push configurée »** :

1. Créez un dépôt sur GitHub (ou GitLab, etc.) et récupérez son URL.
2. Dans le terminal (PowerShell), exécutez **une commande à la fois** :
   ```powershell
   git remote add origin https://github.com/VOTRE_UTILISATEUR/VOTRE_REPO.git
   git push -u origin master
   ```
   Remplacez l’URL par celle de votre dépôt. Si votre branche s’appelle `main` :
   ```powershell
   git push -u origin main
   ```

**Sous PowerShell**, n’utilisez pas `&&` entre les commandes ; exécutez-les l’une après l’autre, ou utilisez `;` à la place de `&&`.

## Scripts disponibles

Dans le répertoire du projet, vous pouvez exécuter :

### `npm start`

Lance l’application en mode développement.\
Ouvrez [http://localhost:3000](http://localhost:3000) pour l’afficher dans votre navigateur.

La page se rechargera lorsque vous modifierez le code.\
Les erreurs de lint peuvent apparaître dans la console.

### `npm test`

Lance le lanceur de tests en mode interactif.\
Consultez la section [exécution des tests](https://facebook.github.io/create-react-app/docs/running-tests) pour plus d’informations.

### `npm run build`

Construit l’application pour la production dans le dossier `build`.\
Regroupe correctement React en mode production et optimise le build pour de meilleures performances.

Le build est minifié et les noms de fichiers incluent des hash.\
Votre application est prête à être déployée.

Consultez la section [déploiement](https://facebook.github.io/create-react-app/docs/deployment) pour plus d’informations.

### `npm run eject`

**Remarque : cette opération est irréversible. Une fois que vous avez fait `eject`, vous ne pouvez plus revenir en arrière !**

Si vous n’êtes pas satisfait des outils de build et des choix de configuration, vous pouvez faire `eject` à tout moment. Cette commande supprimera la dépendance de build unique de votre projet et copiera à la place tous les fichiers de configuration et les dépendances transitives (webpack, Babel, ESLint, etc.) directement dans votre projet pour que vous puissiez tout contrôler. Toutes les commandes sauf `eject` continueront de fonctionner, mais pointeront vers les scripts copiés que vous pourrez modifier. À ce stade, vous êtes livré à vous-même.

Vous n’êtes pas obligé d’utiliser `eject`. L’ensemble de fonctionnalités proposé convient aux déploiements petits et moyens, et vous n’avez pas besoin de vous sentir obligé d’utiliser cette option. Nous comprenons toutefois que cet outil ne serait pas utile si vous ne pouviez pas le personnaliser lorsque vous le souhaitez.

## En savoir plus

Vous pouvez en savoir plus dans la [documentation Create React App](https://facebook.github.io/create-react-app/docs/getting-started).

Pour apprendre React, consultez la [documentation React](https://reactjs.org/).

### Découpage du code

Cette section a été déplacée ici : [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyse de la taille du bundle

Cette section a été déplacée ici : [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Création d’une Progressive Web App

Cette section a été déplacée ici : [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Configuration avancée

Cette section a été déplacée ici : [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Déploiement

Cette section a été déplacée ici : [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` échoue à la minification

Cette section a été déplacée ici : [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
