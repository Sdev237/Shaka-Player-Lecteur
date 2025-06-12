export interface VideoSource {
  id: string;
  title: string;
  manifestUri: string;
  poster: string;
  isLive: boolean;
  description: string;
}

export const videoSources: VideoSource[] = [
  {
    id: "sintel",
    title: "Sintel (VOD)",
    manifestUri:
      "https://storage.googleapis.com/shaka-demo-assets/sintel/dash.mpd",
    poster:
      "https://storage.googleapis.com/shaka-demo-assets/sintel/poster.jpg",
    isLive: false,
    description: "Film d'animation open source de la Blender Foundation",
  },
  {
    id: "angel-one",
    title: "Angel One (Live)",
    manifestUri:
      "https://storage.googleapis.com/shaka-demo-assets/live/angel-one/dash.mpd",
    poster:
      "https://storage.googleapis.com/shaka-demo-assets/live/angel-one/poster.jpg",
    isLive: true,
    description: "Stream en direct simulé",
  },
];

// Simuler une publicité pré-roll
export const preRollAd = {
  id: "pre-roll-ad",
  title: "Publicité",
  manifestUri:
    "https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd",
  duration: 5, // 5 secondes
  skipAfter: 3, // Possibilité de passer après 3 secondes
};
