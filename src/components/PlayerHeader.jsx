import React from "react";

export default function PlayerHeader({ titre, sousTitre }) {
  return (
    <div className="lecteur-header">
      <span className="lecteur-retour">&#8592;</span>
      <div>
        <div className="lecteur-titre" style={{color: "bold"}}>{titre}</div>
        <div className="lecteur-sous-titre">{sousTitre}</div>
      </div>
    </div>
  );
}
