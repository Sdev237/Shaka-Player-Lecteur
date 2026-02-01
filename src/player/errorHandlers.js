export function onErrorEvent(event) {
  console.error("Événement d'erreur Shaka :", event);

  if (event && event.detail && event.detail.severity === "CRITICAL") {
    alert(
      "Erreur critique du lecteur vidéo. Veuillez recharger la page ou réessayer plus tard."
    );
  }
}
