import React from "react";
import Button from "./Button";

export default function LiveIndicator({ isLive, isAtLiveEdge, goToLiveEdge }) {
  if (!isLive) return null;
  return (
    <>
      <span
        className={
          "lecteur-live" + (isAtLiveEdge ? "" : " lecteur-live-retard")
        }
      >
        {isAtLiveEdge ? "EN DIRECT" : "EN RETARD"}
      </span>
      {!isAtLiveEdge && (
        <Button onClick={goToLiveEdge} variant="live">
          Revenir au direct
        </Button>
      )}
    </>
  );
}
