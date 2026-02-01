import React from "react";
import VideoPlayer from "./components/VideoPlayer";
import ShakaPlayerComponent from "./components/ShakaPlayerComponent"

function App() {
  return (
    <main className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Lecteur de flux vidéo</h1>
          <p className="text-gray-400">
            Lecteur vidéo moderne avec support DRM, DASH/HLS, et streaming en
            direct
          </p>
        </header>

        <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          <VideoPlayer />
          {/* <ShakaPlayerComponent /> */}
        </div>

        <footer className="mt-8 text-center text-gray-400 text-sm">
          <p>Propulsé par Shaka Player et React</p>
          <p className="mt-2">
            Support DRM (Widevine/ClearKey) • DASH/HLS • Live & VOD • Sélection
            de qualité
          </p>
        </footer>
      </div>
    </main>
  );
}

export default App;
