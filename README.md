# Lecteur Vidéo React

Un lecteur vidéo moderne et performant développé avec React, offrant des fonctionnalités avancées de lecture et de gestion de contenu.

## 🚀 Fonctionnalités

- Lecture de vidéos VOD et en direct
- Gestion de playlist
- Contrôles de lecture avancés
- Support des sous-titres
- Sélection de la qualité vidéo
- Sélection des pistes audio
- Indicateur de statut en direct
- Interface utilisateur moderne et responsive

## 📋 Prérequis

- Node.js (v14 ou supérieur)
- npm (v6 ou supérieur)
- Navigateur moderne (Chrome, Firefox, Safari, Edge)

## 🛠 Installation

1. Clonez le dépôt :

```bash
git clone [URL_DU_REPO]
cd lecteur-player
```

2. Installez les dépendances :

```bash
npm install
```

3. Lancez l'application en mode développement :

```bash
npm start
```

## 🧪 Tests

Le projet utilise Jest et React Testing Library pour les tests unitaires.

Pour exécuter les tests :

```bash
# Exécuter tous les tests
npm test

# Exécuter les tests avec couverture
npm test -- --coverage

# Exécuter les tests en mode watch
npm test -- --watch
```

## 📁 Structure du Projet

```
src/
├── components/
│   ├── __tests__/          # Tests unitaires
│   ├── Button.jsx          # Composant de bouton réutilisable
│   ├── LiveIndicator.jsx   # Indicateur de statut en direct
│   ├── PlaylistMenu.jsx    # Menu de gestion de playlist
│   ├── PlayerControls.jsx  # Contrôles de lecture
│   └── VideoPlayer.jsx     # Composant principal du lecteur
```

## 🎯 Composants Principaux

### VideoPlayer

Le composant principal qui gère la lecture vidéo et intègre tous les autres composants.

### PlayerControls

Gère les contrôles de lecture :

- Avancer/Reculer
- Basculement direct/VOD
- Sélection de la qualité
- Gestion des pistes audio
- Gestion des sous-titres

### PlaylistMenu

Interface de gestion de la playlist avec :

- Liste des vidéos
- Sélection active
- Navigation entre les vidéos

### LiveIndicator

Affiche le statut de lecture en direct :

- Indicateur "EN DIRECT"
- Indicateur de retard
- Bouton de retour au direct

## 🔧 Configuration

### Variables d'Environnement

Créez un fichier `.env` à la racine du projet :

```env
NODE_ENV=development
REACT_APP_API_URL=http://localhost:3000
```

### Configuration TypeScript

Le projet utilise TypeScript pour un développement plus robuste. La configuration est disponible dans `tsconfig.json`.

## 📚 Documentation

### Tests

Les tests sont organisés par composant dans le dossier `__tests__`. Chaque composant a son propre fichier de test.

### Style

Le projet utilise des classes CSS modulaires avec le préfixe `lecteur-` pour éviter les conflits de style.

## 🤝 Contribution

1. Fork le projet
2. Créez votre branche de fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👥 Auteurs

- [Votre Nom] - _Développement initial_

## 🙏 Remerciements

- [Shaka Player](https://github.com/google/shaka-player) pour la gestion de la lecture vidéo
- [React Testing Library](https://testing-library.com/) pour les outils de test
- [Jest](https://jestjs.io/) pour le framework de test
