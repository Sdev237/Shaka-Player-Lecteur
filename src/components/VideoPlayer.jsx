import React, { useEffect, useRef, useState } from "react";
import shaka from "shaka-player";
import Controls from "./Controls";
import { onErrorEvent } from "../player/errorHandlers";

// URLs de test plus fiables
const VOD_MANIFEST =
  "https://storage.googleapis.com/shaka-demo-assets/sintel/dash.mpd";
const LIVE_MANIFEST =
  "https://storage.googleapis.com/shaka-demo-assets/live/angel-one/dash.mpd";

function VideoPlayer() {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [isLive, setIsLive] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [stats, setStats] = useState({
    bandwidth: 0,
    droppedFrames: 0,
    buffered: 0,
  });

  useEffect(() => {
    if (!videoRef.current) return;

    const initPlayer = async () => {
      try {
        // Installer les polyfills si nécessaire
        await shaka.polyfill.installAll();

        // Vérifier si le navigateur est compatible
        if (shaka.Player.isBrowserSupported()) {
          // Créer le player sans l'attacher directement à l'élément vidéo
          const player = new shaka.Player();
          playerRef.current = player;

          // Attacher le player à l'élément vidéo
          await player.attach(videoRef.current);

          // Gestion des erreurs
          player.addEventListener("error", (event) => {
            console.error("Erreur Shaka:", event.detail);
            onErrorEvent(event);
          });

          // Statistiques
          player.addEventListener("adaptation", () => {
            const playerStats = player.getStats();
            setStats({
              bandwidth: playerStats.estimatedBandwidth || 0,
              droppedFrames: playerStats.droppedFrames || 0,
              buffered: playerStats.buffered || 0,
            });
          });

          // Configuration de base simplifiée
          const config = {
            streaming: {
              bufferingGoal: isLive ? 10 : 30,
              rebufferingGoal: isLive ? 5 : 15,
              bufferBehind: isLive ? 10 : 30,
            },
            abr: {
              enabled: true,
              defaultBandwidthEstimate: 500000,
            },
          };

          // Configuration spécifique pour le live
          if (isLive) {
            config.streaming.liveSync = {
              targetLatency: 10,
              targetLatencyTolerance: 3,
            };
          }

          // Appliquer la configuration
          player.configure(config);

          // Charger le manifest
          const manifest = isLive ? LIVE_MANIFEST : VOD_MANIFEST;
          console.log("Chargement du manifest:", manifest);

          await player.load(manifest);
          console.log("Manifest chargé avec succès");

          // Ne pas démarrer la lecture automatiquement
          // La lecture sera démarrée par l'interaction de l'utilisateur
        } else {
          console.error("Navigateur non supporté par Shaka Player");
        }
      } catch (error) {
        console.error("Erreur d'initialisation du player:", error);
      }
    };

    initPlayer();

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [isLive]);

  const handleToggleLive = () => {
    setIsLive(!isLive);
  };

  const handleQualityChange = (qualityId) => {
    if (!playerRef.current) return;

    if (qualityId === "auto") {
      playerRef.current.configure({ abr: { enabled: true } });
    } else {
      playerRef.current.configure({ abr: { enabled: false } });
      const tracks = playerRef.current.getVariantTracks();
      const track = tracks.find((t) => t.id === parseInt(qualityId));
      if (track) {
        playerRef.current.selectVariantTrack(track);
      }
    }
  };

  return (
    <div className="relative w-full max-w-[95vw] mx-auto bg-gray-900 rounded-xl shadow-2xl overflow-hidden">
      {/* Conteneur principal du lecteur */}
      <div className="relative aspect-video bg-black">
        <video
          ref={videoRef}
          className="w-full h-full object-contain"
          controls={false}
          playsInline
        />

        {/* Overlay des statistiques */}
        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-black/75 backdrop-blur-sm text-white p-2 sm:p-3 rounded-lg text-xs sm:text-sm font-mono space-y-1 shadow-lg">
          <div className="flex items-center space-x-2">
            <span className="text-blue-400">Débit :</span>
            <span>{Math.round(stats.bandwidth / 1000)}kbps</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-red-400">Images perdues :</span>
            <span>{stats.droppedFrames}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-green-400">Buffer:</span>
            <span>{stats.buffered ? stats.buffered.toFixed(1) : "0.0"}s</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-yellow-400">Mode:</span>
            <span
              className={`px-2 py-0.5 rounded text-xs font-semibold ${
                isLive ? "bg-red-600" : "bg-blue-600"
              }`}
            >
              {isLive ? "LIVE" : "VOD"}
            </span>
          </div>
        </div>

        {/* Overlay de chargement */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>

      {/* Contrôles */}
      <div className="bg-gray-800/95 backdrop-blur-sm">
        <Controls
          player={playerRef.current}
          videoRef={videoRef}
          isLive={isLive}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          onToggleLive={handleToggleLive}
          onQualityChange={handleQualityChange}
        />
      </div>
    </div>
  );
}

export default VideoPlayer;
