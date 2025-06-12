export const shakaConfig = {
  drm: {
    clearKeys: {
      "key-id": "key-value",
    },
    servers: {
      "com.widevine.alpha": "https://license.widevine.com/getlicense",
      "com.microsoft.playready":
        "https://playready.directtaps.net/pr/svc/rightsmanager.asmx",
    },
  },
  streaming: {
    bufferingGoal: 30,
    rebufferingGoal: 15,
    bufferBehind: 30,
    alwaysStreamText: true,
    startAtSegmentBoundary: false,
    retryParameters: {
      timeout: 10000,
      maxAttempts: 3,
      baseDelay: 1000,
      backoffFactor: 2,
      fuzzFactor: 0.5,
    },
  },
  abr: {
    enabled: true,
    defaultBandwidthEstimate: 500000,
    switchInterval: 8,
    bandwidthUpgradeTarget: 0.85,
    bandwidthDowngradeTarget: 0.95,
  },
};

// Configuration spécifique pour le streaming en direct
export const liveConfig = {
  streaming: {
    bufferingGoal: 10,
    rebufferingGoal: 5,
    bufferBehind: 10,
    liveSync: {
      targetLatency: 10,
      targetLatencyTolerance: 3,
    },
  },
};

// Configuration spécifique pour la VOD
export const vodConfig = {
  streaming: {
    bufferingGoal: 30,
    rebufferingGoal: 15,
    bufferBehind: 30,
  },
};
