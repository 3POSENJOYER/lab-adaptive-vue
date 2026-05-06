import { Injectable } from "@nestjs/common";
import { Game } from "../models/Game";
import { HardwareProfile } from "../models/HardwareProfile";

@Injectable()
export class PredictionService {
  async predictFps(
    gameId: number,
    hardware:
      | HardwareProfile
      | {
          cpu: string;
          gpu: string;
          ram: number;
          vram: number;
          resolution: string;
        },
  ) {
    const game = await Game.findByPk(gameId);
    if (!game) {
      throw new Error("Game not found");
    }

    const profile = "userId" in hardware ? hardware : hardware;
    const baseFps = game.expectedFps;
    const cpuFactor = this.estimateCpuFactor(profile.cpu);
    const gpuFactor = this.estimateGpuFactor(profile.gpu);
    const ramFactor = Math.min(1, profile.ram / 16);
    const vramFactor = Math.min(1, profile.vram / 8);
    const resolutionFactor = this.estimateResolutionFactor(profile.resolution);

    const fps = Math.max(
      10,
      Math.round(
        baseFps *
          (0.5 +
            0.25 * cpuFactor +
            0.15 * gpuFactor +
            0.1 * ramFactor +
            0.05 * vramFactor) *
          resolutionFactor,
      ),
    );

    return {
      gameId,
      gameTitle: game.title,
      predictedFps: fps,
      baseFps: game.expectedFps,
      cpuFactor,
      gpuFactor,
      ramFactor,
      resolutionFactor,
    };
  }

  private estimateCpuFactor(cpu: string) {
    const normalized = cpu.toLowerCase();
    if (normalized.includes("ryzen") && normalized.includes("9")) return 1.2;
    if (normalized.includes("ryzen") && normalized.includes("7")) return 1.1;
    if (normalized.includes("ryzen") && normalized.includes("5")) return 1.0;
    if (normalized.includes("core i9")) return 1.2;
    if (normalized.includes("core i7")) return 1.1;
    if (normalized.includes("core i5")) return 1.0;
    return 0.9;
  }

  private estimateGpuFactor(gpu: string) {
    const normalized = gpu.toLowerCase();
    if (
      normalized.includes("4070") ||
      normalized.includes("3080") ||
      normalized.includes("6800")
    )
      return 1.2;
    if (
      normalized.includes("3080 ti") ||
      normalized.includes("4090") ||
      normalized.includes("6900")
    )
      return 1.25;
    if (normalized.includes("3070") || normalized.includes("6700")) return 1.1;
    if (normalized.includes("3060") || normalized.includes("6600")) return 1.0;
    if (normalized.includes("2060") || normalized.includes("5600")) return 0.9;
    return 0.8;
  }

  private estimateResolutionFactor(resolution: string) {
    const normalized = resolution.toLowerCase();
    if (normalized.includes("4k") || normalized.includes("2160")) return 0.8;
    if (normalized.includes("1440") || normalized.includes("2k")) return 0.9;
    return 1.0;
  }
}
