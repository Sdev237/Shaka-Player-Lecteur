import React, { useState, useEffect } from "react";
import "./HomePage.css";
import VideoPlayer from "./VideoPlayer";
import Navigation from "./Navigation";

const PLAYLIST = [
  {
    titre: "Live Test (DASH-IF)",
    sousTitre: "Flux en direct de test DASH-IF",
    url: "https://livesim.dashif.org/livesim/testpic_2s/Manifest.mpd",
    live: true,
    imageUrl:
      "https://storage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg",
  },
  {
    titre: "Captain Luck (Angel One)",
    sousTitre: "Bande-annonce",
    url: "https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd",
    live: false,
    imageUrl:
      "https://storage.googleapis.com/gtv-videos-bucket/sample/images/TearsOfSteel.jpg",
  },
  {
    titre: "Big Buck Bunny",
    sousTitre: "Démonstration DASH",
    url: "https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps.mpd",
    live: false,
    imageUrl:
      "https://storage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg",
  },
  {
    titre: "Sintel",
    sousTitre: "Film de démo DASH",
    url: "https://storage.googleapis.com/shaka-demo-assets/sintel/dash.mpd",
    live: false,
    imageUrl:
    "https://storage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg",
  },

  {
    titre: "Envivio Live",
    sousTitre: "Flux live multi-bitrate",
    url: "https://wowzaec2demo.streamlock.net/live/bigbuckbunny/manifest_mpm4sav_mvtime.mpd",
    live: true,
    imageUrl:
      "https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg",
  },
  {
    titre: "Tears of Steel",
    sousTitre: "Film d'animation DASH",
    url: "https://bitmovin-a.akamaihd.net/content/sintel/sintel.mpd",
    live: false,
    imageUrl:
      "https://storage.googleapis.com/gtv-videos-bucket/sample/images/TearsOfSteel.jpg",
  },
  {
    titre: "Elephants Dream",
    sousTitre: "Premier film open source",
    url: "https://download.tsi.telecom-paristech.fr/gpac/DASH_CONFORMANCE/ElephantsDream/elephants_dream_480p.mpd",
    live: false,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Elephants_Dream_s1_proog.jpg/320px-Elephants_Dream_s1_proog.jpg",
  },
  {
    titre: "Art Demo",
    sousTitre: "Démo artistique en DASH",
    url: "https://bitmovin-a.akamaihd.net/content/art-of-motion_drm/mpds/11331.mpd",
    live: false,
    imageUrl: "https://i.imgur.com/3fJ1P48.jpeg",
  },
  {
    titre: "NASA TV UHD",
    sousTitre: "Flux live UHD (si supporté)",
    url: "https://demo.unified-streaming.com/k8s/features/stable/video/nasa.mpd",
    live: true,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/320px-NASA_logo.svg.png",
  },
];

const HomePage = () => {
  const [featuredContent, setFeaturedContent] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [currentCategory, setCurrentCategory] = useState("accueil");

  // Sélectionner les contenus pour la bannière
  const bannerContents = PLAYLIST.filter((item) => !item.live).slice(0, 5);

  useEffect(() => {
    // Mettre à jour le contenu en vedette toutes les 10 secondes
    const bannerInterval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) =>
        prevIndex === bannerContents.length - 1 ? 0 : prevIndex + 1
      );
    }, 20000);

    return () => clearInterval(bannerInterval);
  }, []);

  useEffect(() => {
    // Mettre à jour le contenu en vedette quand l'index change
    const currentBanner = bannerContents[currentBannerIndex];
    setFeaturedContent({
      title: currentBanner.titre,
      description: currentBanner.sousTitre,
      imageUrl: currentBanner.imageUrl,
      videoUrl: currentBanner.url,
    });
  }, [currentBannerIndex]);

  useEffect(() => {
    // Organiser le contenu en catégories
    setCategories([
      {
        title: "Contenu en Direct",
        items: PLAYLIST.filter((item) => item.live),
      },
      {
        title: "Films Populaires",
        items: PLAYLIST.filter((item) => !item.live),
      },
      {
        title: "Films d'Animation",
        items: PLAYLIST.filter(
          (item) =>
            !item.live &&
            (item.titre.includes("Bunny") || item.titre.includes("Sintel"))
        ),
      },
      {
        title: "Bandes-annonces",
        items: PLAYLIST.filter(
          (item) => !item.live && item.titre.includes("Captain")
        ),
      },
    ]);
  }, []);

  const handleSearch = (query) => {
    if (!query.trim()) {
      setSearchResults(null);
      return;
    }

    const results = PLAYLIST.filter(
      (item) =>
        item.titre.toLowerCase().includes(query.toLowerCase()) ||
        item.sousTitre.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults({
      title: "Résultats de recherche",
      items: results,
    });
  };

  const handlePlay = (video) => {
    setCurrentVideo(video);
    setIsPlaying(true);
  };

  const handleClosePlayer = () => {
    setIsPlaying(false);
    setCurrentVideo(null);
  };

  const handleCategoryChange = (category) => {
    setCurrentCategory(category);
    // Réinitialiser la recherche lors du changement de catégorie
    setSearchResults(null); 

    // Filtrer le contenu selon la catégorie
    let filteredContent;
    switch (category) {
      case "series":
        filteredContent = PLAYLIST.filter(
          (item) => !item.live && item.titre.includes("Saison")
        );
        break;
      case "films":
        filteredContent = PLAYLIST.filter(
          (item) => !item.live && !item.titre.includes("Saison")
        );
        break;
      case "nouveautes":
        // Filtrer les contenus récents (exemple)
        filteredContent = PLAYLIST.slice(-5);
        break;
      case "mylist":
        // Simuler une liste personnelle (à implémenter avec un backend)
        filteredContent = PLAYLIST.filter(
          (item) => item.titre.includes("Dream") || item.titre.includes("Art")
        );
        break;
      default:
        filteredContent = PLAYLIST;
    }

    // Mettre à jour les catégories
    setCategories([
      {
        title:
          category === "accueil" ? "Contenu en Direct" : "Contenu Populaire",
        items: filteredContent.filter((item) => item.live),
      },
      {
        title: category === "accueil" ? "Films Populaires" : "Recommandations",
        items: filteredContent.filter((item) => !item.live),
      },
    ]);
  };

  if (isPlaying && currentVideo) {
    return (
      <div className="video-player-container">
        <button className="back-button" onClick={handleClosePlayer}>
          ← Retour à l'accueil
        </button>
        <VideoPlayer
          initialVideo={{
            titre: currentVideo.titre,
            sousTitre: currentVideo.sousTitre,
            url: currentVideo.url,
            live: currentVideo.live,
          }}
        />
      </div>
    );
  }

  return (
    <div className="home-page">
      <Navigation
        onSearch={handleSearch}
        onCategoryChange={handleCategoryChange}
      />

      {searchResults ? (
        <div className="content-categories">
          <div className="category">
            <h2 className="category-title">{searchResults.title}</h2>
            <div className="category-items">
              {searchResults.items.map((item, index) => (
                <div
                  key={index}
                  className="content-item"
                  onClick={() => handlePlay(item)}
                >
                  <div className="content-item-image">
                    <img src={item.imageUrl} alt={item.titre} />
                    {item.live && <span className="live-badge">EN DIRECT</span>}
                    <div className="content-item-overlay">
                      <button className="play-button-small">▶</button>
                    </div>
                  </div>
                  <h3>{item.titre}</h3>
                  <p className="content-item-subtitle">{item.sousTitre}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Bannière principale avec animation */}
          <div
            className="featured-content"
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.8)), url(${featuredContent?.imageUrl})`,
            }}
          >
            <div className="featured-content-info">
              <h1>{featuredContent?.title}</h1>
              <p>{featuredContent?.description}</p>
              <div className="featured-buttons">
                <button
                  className="play-button"
                  onClick={() =>
                    handlePlay({
                      titre: featuredContent.title,
                      sousTitre: featuredContent.description,
                      url: featuredContent.videoUrl,
                      live: false,
                    })
                  }
                >
                  ▶ Lecture
                </button>
                <button className="more-info-button">ℹ Plus d'infos</button>
              </div>
            </div>
            {/* Indicateurs de progression */}
            <div className="banner-indicators">
              {bannerContents.map((_, index) => (
                <div
                  key={index}
                  className={`banner-indicator ${
                    index === currentBannerIndex ? "active" : ""
                  }`}
                  onClick={() => setCurrentBannerIndex(index)}
                />
              ))}
            </div>
          </div>

          {/* Catégories de contenu */}
          <div className="content-categories">
            {categories.map((category, index) => (
              <div key={index} className="category">
                <h2 className="category-title">{category.title}</h2>
                <div className="category-items">
                  {category.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="content-item"
                      onClick={() => handlePlay(item)}
                    >
                      <div className="content-item-image">
                        <img src={item.imageUrl} alt={item.titre} />
                        {item.live && (
                          <span className="live-badge">EN DIRECT</span>
                        )}
                        <div className="content-item-overlay">
                          <button className="play-button-small">▶</button>
                        </div>
                      </div>
                      <h3>{item.titre}</h3>
                      <p className="content-item-subtitle">{item.sousTitre}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
