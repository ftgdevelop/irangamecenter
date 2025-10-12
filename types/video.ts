import "video.js";

declare module "video.js" {
  interface Player {
    pause(): void;
    play(): Promise<void> | undefined;
    dispose(): void;
    hlsQualitySelector?: (options?: {
      displayCurrentQuality?: boolean;
    }) => void;
  }
}
