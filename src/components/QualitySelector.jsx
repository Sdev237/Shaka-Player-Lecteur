import React, { useState, useEffect } from "react";

const QualitySelector = ({ player, onQualityChange }) => {
  const [qualities, setQualities] = useState([]);
  const [currentQuality, setCurrentQuality] = useState("auto");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!player) return;

    const updateQualities = () => {
      const tracks = player.getVariantTracks();
      const qualityOptions = tracks.map((track) => ({
        id: track.id,
        height: track.height,
        bandwidth: track.bandwidth,
      }));
      setQualities(qualityOptions);
    };

    player.addEventListener("adaptation", updateQualities);
    updateQualities();

    return () => {
      player.removeEventListener("adaptation", updateQualities);
    };
  }, [player]);

  const handleQualityChange = (qualityId) => {
    setCurrentQuality(qualityId);
    onQualityChange(qualityId);
    setIsOpen(false);
  };

  const getQualityLabel = (quality) => {
    if (quality === "auto") return "Auto";
    const option = qualities.find((q) => q.id === parseInt(quality));
    if (!option) return "Auto";
    return `${option.height}p (${Math.round(option.bandwidth / 1000)}kbps)`;
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-gray-700 hover:bg-gray-600 text-white rounded-full text-xs sm:text-sm font-medium transition-colors"
      >
        <span>Qualité</span>
        <svg
          className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 sm:mt-2 w-36 sm:w-48 bg-gray-800 rounded-lg shadow-xl py-1 z-10">
          <button
            onClick={() => handleQualityChange("auto")}
            className={`w-full px-3 sm:px-4 py-1.5 sm:py-2 text-left text-xs sm:text-sm hover:bg-gray-700 transition-colors ${
              currentQuality === "auto" ? "text-blue-400" : "text-white"
            }`}
          >
            Auto
          </button>
          {qualities.map((quality) => (
            <button
              key={quality.id}
              onClick={() => handleQualityChange(quality.id.toString())}
              className={`w-full px-3 sm:px-4 py-1.5 sm:py-2 text-left text-xs sm:text-sm hover:bg-gray-700 transition-colors ${
                currentQuality === quality.id.toString()
                  ? "text-blue-400"
                  : "text-white"
              }`}
            >
              {quality.height}p ({Math.round(quality.bandwidth / 1000)}kbps)
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default QualitySelector;
