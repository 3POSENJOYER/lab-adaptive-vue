import { Body, Controller, Post } from "@nestjs/common";
import { PredictionService } from "../services/prediction.service";
import { HardwareProfile } from "../models/HardwareProfile";

@Controller("predict")
export class PredictionController {
  constructor(private predictionService: PredictionService) {}

  @Post("fps")
  async predictFps(
    @Body("gameId") gameId: number,
    @Body("hardware")
    hardware: {
      cpu: string;
      gpu: string;
      ram: number;
      vram: number;
      resolution: string;
    },
    @Body("userId") userId?: number,
  ) {
    const hasHardwareFormData =
      hardware &&
      typeof hardware.cpu === "string" &&
      hardware.cpu.trim() !== "" &&
      typeof hardware.gpu === "string" &&
      hardware.gpu.trim() !== "" &&
      typeof hardware.ram === "number" &&
      typeof hardware.vram === "number" &&
      typeof hardware.resolution === "string" &&
      hardware.resolution.trim() !== "";

    if (hasHardwareFormData) {
      return this.predictionService.predictFps(gameId, hardware);
    }

    if (userId) {
      const profile = await HardwareProfile.findOne({ where: { userId } });
      if (profile) {
        return this.predictionService.predictFps(gameId, profile);
      }
    }

    throw new Error("Не вдалося отримати профіль заліза для прогнозу");
  }
}
