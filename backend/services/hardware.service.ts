import { Injectable } from "@nestjs/common";
import { HardwareProfile } from "../models/HardwareProfile";

@Injectable()
export class HardwareService {
  async createOrUpdate(profileData: {
    userId: number;
    cpu: string;
    gpu: string;
    ram: number;
    vram: number;
    resolution: string;
  }) {
    const existing = await HardwareProfile.findOne({
      where: { userId: profileData.userId },
    });
    if (existing) {
      await existing.update(profileData);
      return existing;
    }
    return HardwareProfile.create(profileData);
  }

  async findByUser(userId: number) {
    return HardwareProfile.findOne({ where: { userId } });
  }
}
