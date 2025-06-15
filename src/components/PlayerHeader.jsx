import React, { useState, useEffect } from "react";

export default function PlayerHeader({ titre, sousTitre, onBack }) {
  const [isVisible, setIsVisible] = useState(true);
  // @ts-ignore
  const [mouseTimeout, setMouseTimeout] = useState(null);

  // Effet pour cacher l'en-tête après 3 secondes au lancement
  useEffect(() => {
    const initialTimeout = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(initialTimeout);
  }, []); // S'exécute une seule fois au montage

  [mouseTimeout]);

  return (
    <div className={`lecteur-header ${isVisible ? "visible" : "hidden"}`}>
      <button
        className="lecteur-retour"
        onClick={onBack}
        aria-label="Retour à l'accueil"
      >
        <span >&#8592;</span>Retour à l'accueil
      </button>
      <div>
        <div className="lecteur-titre">{titre}</div>
        <div className="lecteur-sous-titre">{sousTitre}</div>
      </div>
    </div>
  );
}
