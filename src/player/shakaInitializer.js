import shaka from 'shaka-player';

export function initShaka(videoRef, manifestUri, onErrorEvent) {
  const player = new shaka.Player(videoRef);

  player.addEventListener('error', onErrorEvent);

  player.configure({
    drm: {
      clearKeys: {
        'key-id': 'key-value'
      },
    },
  });

  player.load(manifestUri).catch(onErrorEvent);

  return player;
}