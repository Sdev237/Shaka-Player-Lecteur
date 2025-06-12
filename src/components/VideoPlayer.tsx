import React, { useState, useEffect } from "react";
import { useShaka } from "../hooks/useShaka";
import { VideoSource, videoSources } from "../data/videoSources";
import Controls from "./Controls";
import QualitySelector from "./QualitySelector";

interface VideoPlayerProps {
  onError?: (error: Error) => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ onError }) => {
  const [currentSource, setCurrentSource] = useState<VideoSource>(
    videoSources[0]
  );
  const [showAd, setShowAd] = useState(true);
  const [adTimeRemaining, setAdTimeRemaining] = useState(5);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPiP, setIsPiP] = useState(false);

  const { player, videoRef, isPlaying, error, stats } = useShaka({
    manifestUri: currentSource.manifestUri,
    isLive: currentSource.isLive,
    onPlayerReady: (player) => {
      console.log("Player prêt");
    },
  });

  // Gérer la publicité pré-roll
  useEffect(() => {
    if (showAd && videoRef.current) {
      const timer = setInterval(() => {
        setAdTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setShowAd(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [showAd]);

  // Gérer les erreurs
  useEffect(() => {
    if (error && onError) {
      onError(error);
    }
  }, [error, onError]);

  // Gérer le mode plein écran
  const toggleFullscreen = async () => {
    if (!videoRef.current) return;

    try {
      if (!isFullscreen) {
        await videoRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
      setIsFullscreen(!isFullscreen);
    } catch (error) {
      console.error("Erreur lors du changement de mode plein écran:", error);
    }
  };

  // Gérer le mode Picture-in-Picture
  const togglePiP = async () => {
    if (!videoRef.current) return;

    try {
      if (!isPiP) {
        await videoRef.current.requestPictureInPicture();
      } else {
        await document.exitPictureInPicture();
      }
      setIsPiP(!isPiP);
    } catch (error) {
      console.error("Erreur lors du changement de mode PiP:", error);
    }
  };

  // Changer de source vidéo
  const handleSourceChange = (sourceId: string) => {
    const newSource = videoSources.find((s) => s.id === sourceId);
    if (newSource) {
      setCurrentSource(newSource);
      setShowAd(true);
      setAdTimeRemaining(5);
    }
  };

  return (
    <div className="relative w-full max-w-[95vw] mx-auto bg-gray-900 rounded-xl shadow-2xl overflow-hidden">
      {/* Sélecteur de source */}
      <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-10">
        <select
          value={currentSource.id}
          onChange={(e) => handleSourceChange(e.target.value)}
          className="bg-gray-800 text-white px-3 py-1.5 rounded-lg text-sm border border-gray-700 focus:outline-none focus:border-blue-500"
        >
          {videoSources.map((source) => (
            <option key={source.id} value={source.id}>
              {source.title}
            </option>
          ))}
        </select>
      </div>

      {/* Conteneur principal du lecteur */}
      <div className="relative aspect-video bg-black">
        <video
          ref={videoRef}
          className="w-full h-full object-contain"
          poster={currentSource.poster}
          controls={false}
          playsInline
        />

        {/* Overlay de la publicité */}
        {showAd && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 text-white">
            <div className="text-2xl font-bold mb-4">Publicité</div>
            <div className="text-xl">{adTimeRemaining}s</div>
            {adTimeRemaining <= 3 && (
              <button
                onClick={() => setShowAd(false)}
                className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-full text-sm font-medium transition-colors"
              >
                Passer la publicité
              </button>
            )}
          </div>
        )}

        {/* Overlay des statistiques */}
        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-black/75 backdrop-blur-sm text-white p-2 sm:p-3 rounded-lg text-xs sm:text-sm font-mono space-y-1 shadow-lg">
          <div className="flex items-center space-x-2">
            <span className="text-blue-400">Bitrate:</span>
            <span>{Math.round(stats.bandwidth / 1000)}kbps</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-red-400">Frames drop:</span>
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
                currentSource.isLive ? "bg-red-600" : "bg-blue-600"
              }`}
            >
              {currentSource.isLive ? "LIVE" : "VOD"}
            </span>
          </div>
        </div>

        {/* Overlay de chargement */}
        {!isPlaying && !showAd && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>

      {/* Contrôles */}
      <div className="bg-gray-800/95 backdrop-blur-sm">
        <Controls
          player={player}
          videoRef={videoRef}
          isLive={currentSource.isLive}
          isPlaying={isPlaying}
          onFullscreen={toggleFullscreen}
          onPiP={togglePiP}
          isFullscreen={isFullscreen}
          isPiP={isPiP}
        />
      </div>
    </div>
  );
};
