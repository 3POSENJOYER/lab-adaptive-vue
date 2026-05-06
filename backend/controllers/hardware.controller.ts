import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { HardwareService } from "../services/hardware.service";

@Controller("hardware")
export class HardwareController {
  constructor(private hardwareService: HardwareService) {}

  @Post()
  async saveHardware(
    @Body("userId") userId: number,
    @Body("cpu") cpu: string,
    @Body("gpu") gpu: string,
    @Body("ram") ram: number,
    @Body("vram") vram: number,
    @Body("resolution") resolution: string,
  ) {
    return this.hardwareService.createOrUpdate({
      userId,
      cpu,
      gpu,
      ram,
      vram,
      resolution,
    });
  }

  @Get(":userId")
  async getHardware(@Param("userId") userId: string) {
    return this.hardwareService.findByUser(+userId);
  }
}
