// src/components/ShakaPlayerComponent.jsx

import React from "react";
import ShakaPlayer from "shaka-player-react";
import "shaka-player/dist/controls.css"; // styles du lecteur

const ShakaPlayerComponent = () => {
  const manifestUri = "https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd";

  return (
    <div>
      <h2>Lecture DASH avec Shaka Player</h2>
      <ShakaPlayer autoPlay src={manifestUri} />
    </div>
  );
};

export default ShakaPlayerComponent;
