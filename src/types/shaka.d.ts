declare module "shaka-player" {
  export interface IPlayer {
    attach(videoElement: HTMLVideoElement): Promise<void>;
    load(manifestUri: string): Promise<void>;
    destroy(): Promise<void>;
    configure(config: any): void;
    getVariantTracks(): Array<{
      id: number;
      height: number;
      bandwidth: number;
      language: string;
      label: string;
    }>;
    selectVariantTrack(track: any): void;
    getStats(): {
      estimatedBandwidth: number;
      droppedFrames: number;
      buffered: number;
    };
  }

  export interface IPlayerStatic {
    new (): IPlayer;
    isBrowserSupported(): boolean;
    polyfill: {
      installAll(): Promise<void>;
    };
  }

  const shaka: IPlayerStatic;
  export default shaka;
}
