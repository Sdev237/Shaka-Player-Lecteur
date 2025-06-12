import { useEffect, useRef, useState } from "react";
import shaka from "shaka-player";
import { shakaConfig, liveConfig, vodConfig } from "../player/config";
import { onErrorEvent } from "../player/errorHandlers";

interface UseShakaProps {
  manifestUri: string;
  isLive?: boolean;
  onPlayerReady?: (player: shaka.IPlayer) => void;
}

interface UseShakaReturn {
  player: shaka.IPlayer | null;
  videoRef: React.RefObject<HTMLVideoElement>;
  isPlaying: boolean;
  error: Error | null;
  stats: {
    bandwidth: number;
    droppedFrames: number;
    buffered: number;
  };
}

export function useShaka({
  manifestUri,
  isLive = false,
  onPlayerReady,
}: UseShakaProps): UseShakaReturn {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<shaka.IPlayer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<Error | null>(null);
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
        if (!shaka.Player.isBrowserSupported()) {
          throw new Error("Navigateur non supporté par Shaka Player");
        }

        // Créer et configurer le player
        const player = new shaka.Player();
        playerRef.current = player;

        // Attacher le player à l'élément vidéo
        await player.attach(videoRef.current);

        // Gestion des erreurs
        player.addEventListener("error", (event) => {
          console.error("Erreur Shaka:", event.detail);
          onErrorEvent(event);
          setError(new Error(event.detail.message));
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

        // Appliquer la configuration
        const config = {
          ...shakaConfig,
          ...(isLive ? liveConfig : vodConfig),
        };
        player.configure(config);

        // Charger le manifest
        await player.load(manifestUri);
        console.log("Manifest chargé avec succès");

        // Notifier que le player est prêt
        onPlayerReady?.(player);
      } catch (err) {
        console.error("Erreur d'initialisation du player:", err);
        setError(err instanceof Error ? err : new Error("Erreur inconnue"));
      }
    };

    initPlayer();

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [manifestUri, isLive, onPlayerReady]);

  return {
    player: playerRef.current,
    videoRef,
    isPlaying,
    error,
    stats,
  };
}
