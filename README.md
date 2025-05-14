# Lecteur Vidéo Web avec React & Shaka Player

## Présentation

Ce projet est un lecteur vidéo web moderne développé avec React, intégrant Shaka Player pour la lecture de vidéos DASH avec gestion du DRM (Widevine) et l'affichage de publicités. L'interface est inspirée des plateformes de streaming professionnelles, avec prise en charge du mode VOD (à la demande) et du mode Live (en direct).

## Fonctionnalités principales

- **Lecture de vidéos DASH** (VOD et Live)
- **Gestion du DRM** (exemple Widevine)
- **Affichage de publicités** (Google IMA)
- **Contrôles personnalisés** : avancer/reculer de 10 secondes
- **Basculer entre VOD et Live** (bouton "Passer en direct")
- **Indicateur "EN DIRECT"** pour le mode live
- **Interface moderne et responsive**
- **En-tête personnalisable** (titre et sous-titre dynamiques)

## Technologies utilisées

- [React](https://react.dev/) (18+)
- [Shaka Player](https://github.com/shaka-project/shaka-player)
- [Google IMA SDK](https://developers.google.com/interactive-media-ads/docs/sdks/html5/)
- CSS (custom)

## Installation et lancement

1. **Cloner le projet**
   ```bash
   git clone <url-du-repo>
   cd lecteur-video-shaka
   ```
2. **Installer les dépendances**
   ```bash
   npm install
   ```
3. **Lancer l'application**
   ```bash
   npm start
   ```
4. Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## Structure du projet

```
lecteur-video-shaka/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   └── VideoPlayer.jsx
│   │   └── VideoPlayer.css
│   ├── App.jsx
│   └── index.jsx
├── package.json
└── README.md
```

## Personnalisation

- **Changer le titre/sous-titre** :
  ```jsx
  <VideoPlayer titre="Nom du film" sousTitre="Bande-annonce" />
  ```
- **Changer les URLs VOD/Live** : modifier les constantes `VOD_URL` et `LIVE_URL` dans `VideoPlayer.jsx`.

## Perspectives d'amélioration

- **Support d'autres DRM** (PlayReady, FairPlay)
- **Sélecteur de qualité vidéo (ABR)**
- **Support des sous-titres et multi-audio**
- **Gestion des playlists**
- **Mode Picture-in-Picture**
- **Mode plein écran natif amélioré**
- **Personnalisation avancée des contrôles**
- **Authentification utilisateur et gestion des droits**
- **Analytics d'audience**
- **Support HLS en plus du DASH**

## Auteur

Projet réalisé par [Votre Nom].
