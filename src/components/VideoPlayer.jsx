import React, { useEffect, useRef, useState } from "react";
import shaka from "shaka-player";
import "shaka-player/dist/controls.css";
import "./VideoPlayer.css";
import PlayerHeader from "./PlayerHeader";
import LiveIndicator from "./LiveIndicator";
import PlayerControls from "./PlayerControls";
import PlaylistMenu from "./PlaylistMenu";

const PLAYLIST = [
  {
    titre: "Live Test (DASH-IF)",
    sousTitre: "Flux en direct de test DASH-IF",
    url: "https://livesim.dashif.org/livesim/testpic_2s/Manifest.mpd",
    live: true,
  },
  {
    titre: "Captain Luck (Angel One)",
    sousTitre: "Bande-annonce",
    url: "https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd",
    live: false,
  },
  {
    titre: "Big Buck Bunny",
    sousTitre: "Démonstration DASH",
    url: "https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps.mpd",
    live: false,
  },
  {
    titre: "sintel",
    sousTitre: "Film Tears of Steel",
    url: "https://storage.googleapis.com/shaka-demo-assets/sintel/dash.mpd",
    live: false,
  },
  {
    titre: "Tears of Steel",
    sousTitre: "Film de démo DASH",
    url: "https://example.com/new-stream.mpd",
    live: false,
  },
  
  {
    titre: "Drama (HLS)",
    sousTitre: "Demo HLS - ShakaPlayer",
    url: "https://storage.googleapis.com/shaka-demo-assets/angel-one-hls/hls.m3u8",
    live: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Clap_cinema_film.svg/320px-Clap_cinema_film.svg.png",
  },
];

const VideoPlayer = ({ initialVideo }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [isLive, setIsLive] = useState(false);
  const [qualities, setQualities] = useState([]);
  const [selectedQuality, setSelectedQuality] = useState("auto");
  const [textTracks, setTextTracks] = useState([]);
  const [selectedText, setSelectedText] = useState("off");
  const [audioTracks, setAudioTracks] = useState([]);
  const [selectedAudio, setSelectedAudio] = useState("auto");
  const [isAtLiveEdge, setIsAtLiveEdge] = useState(true);
  const [showPlaylist, setShowPlaylist] = useState(false);

  // Utiliser la vidéo initiale si fournie
  const [currentIndex, setCurrentIndex] = useState(() => {
    if (initialVideo) {
      const index = PLAYLIST.findIndex((v) => v.url === initialVideo.url);
      return index !== -1 ? index : 0;
    }
    const firstVodIndex = PLAYLIST.findIndex((v) => !v.live);
    return firstVodIndex !== -1 ? firstVodIndex : 0;
  });

  const currentVideo = PLAYLIST[currentIndex];
  const isCurrentlyLive = currentVideo.live;

  // Séparer la playlist VOD de la playlist totale
  const VOD_PLAYLIST = PLAYLIST.filter((v) => !v.live);

  useEffect(() => {
    // Détruire l'ancienne instance avant d'en créer une nouvelle
    if (playerRef.current) {
      playerRef.current.destroy();
      playerRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.removeEventListener("timeupdate", handleLiveEdgeCheck);
    }
    const initPlayer = async (
      url = currentVideo.url,
      live = currentVideo.live
    ) => {
      if (!videoRef.current) return;
      const player = new shaka.Player(videoRef.current);
      playerRef.current = player;
      const drmConfig = {
        servers: {
          "com.widevine.alpha": "https://license.widevine.com/getlicense",
        },
      };
      player.configure("drm", drmConfig);
      const adConfig = {
        adTagUrl:
          "https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/single_preroll_skippable&sz=640x480&ciu_szs=300x250%2C728x90&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=",
      };
      player.configure("ad", adConfig);
      if (typeof player.addEventListener === "function") {
        player.addEventListener("adaptation", () => {
          const tracks = player.getVariantTracks();
          setQualities(tracks);
          setAudioTracks(
            player
              .getVariantTracks()
              .filter(
                (t, i, arr) =>
                  arr.findIndex((tt) => tt.language === t.language) === i
              )
          );
          setTextTracks(player.getTextTracks());
        });
      }
      try {
        await player.load(url);
        setIsLive(live);
        const tracks = player.getVariantTracks();
        setQualities(tracks);
        setAudioTracks(
          player
            .getVariantTracks()
            .filter(
              (t, i, arr) =>
                arr.findIndex((tt) => tt.language === t.language) === i
            )
        );
        setTextTracks(player.getTextTracks());
        if (videoRef.current) {
          videoRef.current.play().catch(() => {});
        }
        // Gestion du live edge
        if (live) {
          setIsAtLiveEdge(true);
          videoRef.current.addEventListener("timeupdate", handleLiveEdgeCheck);
        }
      } catch (error) {
        console.error("Erreur lors du chargement de la vidéo:", error);
      }
      // Passage à la vidéo suivante à la fin
      if (videoRef.current) {
        videoRef.current.onended = () => {
          if (currentIndex < PLAYLIST.length - 1) {
            setCurrentIndex(currentIndex + 1);
          }
        };
      }
    };
    initPlayer();
    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
      if (videoRef.current) {
        videoRef.current.removeEventListener("timeupdate", handleLiveEdgeCheck);
      }
    };
  }, [currentIndex]);

  // Fonction pour vérifier si on est à la pointe du live
  const handleLiveEdgeCheck = () => {
    if (!videoRef.current || !playerRef.current || !playerRef.current.isLive())
      return;
    const liveEdge = playerRef.current.seekRange().end;
    const current = videoRef.current.currentTime;
    // Si on est à moins de 2 secondes de la fin du buffer, on est "en direct"
    setIsAtLiveEdge(liveEdge - current < 2);
  };

  // En mode live, désactiver le seek
  useEffect(() => {
    if (isCurrentlyLive && videoRef.current) {
      videoRef.current.addEventListener("seeking", preventSeekLive);
      return () => {
        if (videoRef.current) {
          videoRef.current.removeEventListener("seeking", preventSeekLive);
        }
      };
    }
  }, [isCurrentlyLive]);

  const preventSeekLive = (e) => {
    if (!playerRef.current || !playerRef.current.isLive()) return;
    const liveEdge = playerRef.current.seekRange().end;
    // Si l'utilisateur tente de reculer, on le remet à la pointe
    if (videoRef.current.currentTime < liveEdge - 2) {
      videoRef.current.currentTime = liveEdge;
    }
  };

  // Bouton revenir au direct
  const goToLiveEdge = () => {
    if (playerRef.current && videoRef.current && playerRef.current.isLive()) {
      const liveEdge = playerRef.current.seekRange().end;
      videoRef.current.currentTime = liveEdge;
      setIsAtLiveEdge(true);
    }
  };

  const avancer = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 10;
    }
  };
  const reculer = () => {
    if (videoRef.current) {
      videoRef.current.currentTime -= 10;
    }
  };
  const handleQualityChange = (e) => {
    const value = e.target.value;
    setSelectedQuality(value);
    if (playerRef.current) {
      if (value === "auto") {
        playerRef.current.configure({ abr: { enabled: true } });
      } else {
        playerRef.current.configure({ abr: { enabled: false } });
        const track = qualities.find((q) => q.id.toString() === value);
        if (track) {
          playerRef.current.selectVariantTrack(track, /* clearBuffer= */ true);
        }
      }
    }
  };
  const handleTextChange = (e) => {
    const value = e.target.value;
    setSelectedText(value);
    if (playerRef.current) {
      if (value === "off") {
        playerRef.current.setTextTrackVisibility(false);
      } else {
        playerRef.current.setTextTrackVisibility(true);
        const track = textTracks.find((t) => t.language === value);
        if (track) {
          playerRef.current.selectTextLanguage(track.language);
        }
      }
    }
  };
  const handleAudioChange = (e) => {
    const value = e.target.value;
    setSelectedAudio(value);
    if (playerRef.current) {
      if (value === "auto") {
        playerRef.current.configure({ abr: { enabled: true } });
      } else {
        playerRef.current.configure({ abr: { enabled: false } });
        const track = audioTracks.find((t) => t.language === value);
        if (track) {
          playerRef.current.selectAudioLanguage(track.language);
        }
      }
    }
  };
  const handleSelectVideo = (idx) => {
    setCurrentIndex(idx);
  };
  const handleGoLiveOrVod = () => {
    if (isCurrentlyLive) {
      // Retour au premier flux VOD
      const firstVodIndex = PLAYLIST.findIndex((v) => !v.live);
      if (firstVodIndex !== -1) {
        setCurrentIndex(firstVodIndex);
      }
    } else {
      // Aller au premier flux live
      const liveIndex = PLAYLIST.findIndex((v) => v.live);
      if (liveIndex !== -1) {
        setCurrentIndex(liveIndex);
        if (
          liveIndex === currentIndex &&
          videoRef.current &&
          playerRef.current
        ) {
          playerRef.current.load(PLAYLIST[liveIndex].url).then(() => {
            setIsLive(true);
            videoRef.current.play().catch(() => {});
          });
        }
      }
    }
  };
  const handleOpenPlaylist = () => setShowPlaylist(true);
  const handleClosePlaylist = () => setShowPlaylist(false);

  const handleBack = () => {
    // Nettoyer les ressources
    if (playerRef.current) {
      playerRef.current.destroy();
    }
    // Retourner à la page d'accueil
    window.location.href = "/";
  };

  return (
    <div className="lecteur-container">
      <PlayerHeader
        titre={currentVideo.titre}
        sousTitre={currentVideo.sousTitre}
        onBack={handleBack}
      />
      <div className="lecteur-video-wrapper">
        <video
          ref={videoRef}
          key={currentIndex}
          controls
          className="lecteur-video"
          data-testid="video-player"
        />
        <LiveIndicator
          isLive={isLive}
          isAtLiveEdge={isAtLiveEdge}
          goToLiveEdge={goToLiveEdge}
        />
      </div>
      <PlayerControls
        avancer={avancer}
        reculer={reculer}
        handleGoLiveOrVod={handleGoLiveOrVod}
        isCurrentlyLive={isCurrentlyLive}
        selectedQuality={selectedQuality}
        handleQualityChange={handleQualityChange}
        qualities={qualities}
        selectedAudio={selectedAudio}
        handleAudioChange={handleAudioChange}
        audioTracks={audioTracks}
        selectedText={selectedText}
        handleTextChange={handleTextChange}
        textTracks={textTracks}
        handleOpenPlaylist={handleOpenPlaylist}
      />
      <PlaylistMenu
        show={showPlaylist}
        onClose={handleClosePlaylist}
        playlist={VOD_PLAYLIST}
        currentIndex={VOD_PLAYLIST.findIndex((v) => v.url === currentVideo.url)}
        onSelect={(idx) => {
          const realIdx = PLAYLIST.findIndex(
            (v) => v.url === VOD_PLAYLIST[idx].url
          );
          handleSelectVideo(realIdx);
        }}
      />
    </div>
  );
};

export default VideoPlayer;
