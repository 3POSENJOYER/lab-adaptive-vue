export type Platform = "Steam" | "Epic" | "GOG";

export interface Game {
  id: number;
  title: string;
  platform: Platform;
  performanceScore: number;
  expectedFps: number;
  cover: string;
}
