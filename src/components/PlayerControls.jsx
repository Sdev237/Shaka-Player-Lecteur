import React from "react";
import Button from "./Button";

export default function PlayerControls({
  avancer,
  reculer,
  handleGoLiveOrVod,
  isCurrentlyLive,
  selectedQuality,
  handleQualityChange,
  qualities,
  selectedAudio,
  handleAudioChange,
  audioTracks,
  selectedText,
  handleTextChange,
  textTracks,
  handleOpenPlaylist,
}) {
  return (
    <div className="lecteur-boutons">
      <Button onClick={reculer} children="⏪ 10s" />
      <Button onClick={avancer} children="10s ⏩" />
      <Button
        onClick={handleGoLiveOrVod}
        variant="live"
        children={isCurrentlyLive ? "Retour VOD" : "Passer en direct"}
      />
      <select
        value={selectedQuality}
        onChange={handleQualityChange}
        className="lecteur-select-qualite"
        aria-label="Sélectionner la qualité"
      >
        <option value="auto">Qualité : Auto</option>
        {qualities
          .filter(
            (q, idx, arr) => arr.findIndex((t) => t.height === q.height) === idx
          )
          .sort((a, b) => b.height - a.height)
          .map((q) => (
            <option key={q.id} value={q.id}>
              {q.height ? q.height + "p" : q.bandwidth + "bps"}
            </option>
          ))}
      </select>
      <select
        value={selectedAudio}
        onChange={handleAudioChange}
        className="lecteur-select-qualite"
        aria-label="Sélectionner la piste audio"
      >
        <option value="auto">Audio : Auto</option>
        {audioTracks
          .filter(
            (a, idx, arr) =>
              arr.findIndex((t) => t.language === a.language) === idx
          )
          .map((a) => (
            <option key={a.language} value={a.language}>
              Audio : {a.language}
            </option>
          ))}
      </select>
      <select
        value={selectedText}
        onChange={handleTextChange}
        className="lecteur-select-qualite"
        aria-label="Sélectionner les sous-titres"
      >
        <option value="off">Sous-titres : Aucun</option>
        {textTracks
          .filter(
            (t, idx, arr) =>
              arr.findIndex((tt) => tt.language === t.language) === idx
          )
          .map((t) => (
            <option key={t.language} value={t.language}>
              Sous-titres : {t.language}
            </option>
          ))}
      </select>
      <Button
        onClick={handleOpenPlaylist}
        variant="playlist"
        children="Playlist"
      />
    </div>
  );
}
