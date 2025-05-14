import React from "react";
import Button from "./Button";

export default function PlaylistMenu({
  show,
  onClose,
  playlist,
  currentIndex,
  onSelect,
}) {
  if (!show) return null;
  return (
    <div className="lecteur-playlist-popup">
      <Button onClick={onClose} className="lecteur-playlist-close">
        X
      </Button>
      <div className="lecteur-playlist-list">
        {playlist.map((video, idx) => (
          <Button
            key={video.url}
            className={`lecteur-playlist-item${
              idx === currentIndex ? " active" : ""
            }`}
            onClick={() => {
              onSelect(idx);
              onClose();
            }}
          >
            {video.titre}{" "}
            <span style={{ fontSize: "0.9em", color: "#bdbdbd" }}>
              ({video.sousTitre})
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
}
